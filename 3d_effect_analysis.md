# 3D Effect — As-Built Technical Record
## Portfolio: Mohamed Gedan | Astro + React + Three.js

---

## Core Principle

> The 3D effect is not geometry. It is a choreographed illusion:  
> **camera motion + depth layering + scroll mapping + GPU rendering.**

Scrolling moves a virtual camera through a 3D world. It does not scroll the DOM.

---

## Current Implementation State

| File | Role | Status |
|------|------|--------|
| `src/components/MainScene.jsx` | Three.js WebGL scene (R3F) | Active |
| `src/components/SmoothScroll.jsx` | Lenis smooth scroll wrapper | Active |
| `src/components/ParticleSphere.jsx` | Canvas 2D fallback (legacy) | Kept, not mounted |
| `src/layouts/Layout.astro` | Mounts MainScene + SmoothScroll | Active |

---

## Part 1 — Installation

### Step 1.1 — Install dependencies

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing lenis
```

Installed versions (verified):

| Package | Version |
|---------|---------|
| `three` | 0.184.0 |
| `@react-three/fiber` | 9.6.1 |
| `@react-three/postprocessing` | 3.0.4 |
| `postprocessing` | 6.39.1 |
| `lenis` | 1.3.23 |

### Step 1.2 — Verify installation

```bash
node -e "require('three'); console.log('ok')"
node -e "require('@react-three/fiber'); console.log('ok')"
node -e "require('lenis'); console.log('ok')"
```

---

## Part 2 — Architecture

### Layer model (z-axis, runtime)

```
z-index: 100   nav bar (position: fixed)
z-index: 10    section content (text, cards)
z-index: 0     MainScene canvas (position: fixed, pointer-events: none)
               └── Three.js WebGL renders here
body           background: #0b1326
```

### Astro integration pattern

```astro
---
import MainScene    from '../components/MainScene';
import SmoothScroll from '../components/SmoothScroll';
---
<body>
  <SmoothScroll client:only="react" />
  <MainScene    client:only="react" />
  <slot />
</body>
```

`client:only="react"` prevents SSR — these components use `window` and `document`.  
Astro renders the page immediately; the 3D scene hydrates after load without blocking paint.

---

## Part 3 — Scene Construction (MainScene.jsx)

### Step 3.1 — Module-level state (no re-render overhead)

```javascript
let scrollProgress = 0;   // 0 → 1 as user scrolls
let targetMouseX   = 0;   // normalised -1 → 1
let targetMouseY   = 0;
```

State lives outside React so event handlers write to it and the R3F animation loop reads it — all without triggering re-renders.

### Step 3.2 — Camera Setup

Camera is defined on the `<Canvas>` element:

```jsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
  gl={{ antialias: true, alpha: true }}
  dpr={[1, 2]}
  style={{ background: 'transparent' }}
>
```

| Param | Value | Reason |
|-------|-------|--------|
| `position.z` | 5 | Starts 5 units in front of origin |
| `fov` | 75° | Wide enough to feel immersive |
| `alpha: true` | — | Transparent canvas — dark page shows through |
| `dpr={[1,2]}` | — | Pixel ratio clamped; prevents mobile overload |

### Step 3.3 — Camera Controller (mouse + scroll)

```jsx
function CameraController() {
  const { camera } = useThree();
  const mx = useRef(0);
  const my = useRef(0);

  useFrame(() => {
    // Lerp toward mouse target (smoothing factor 0.04)
    mx.current += (targetMouseX - mx.current) * 0.04;
    my.current += (targetMouseY - my.current) * 0.04;

    camera.rotation.y = mx.current * 0.08;  // horizontal look
    camera.rotation.x = my.current * 0.05;  // vertical look

    // Scroll drives camera forward: z = 5 at top, z = -7 at bottom
    const targetZ = 5 - scrollProgress * 12;
    camera.position.z += (targetZ - camera.position.z) * 0.055;
  });

  return null;
}
```

Runs inside R3F's `useFrame` — executes every animation frame (60 fps), not in the React render cycle.

### Step 3.4 — Lighting

```jsx
<ambientLight intensity={0.3} />
<directionalLight position={[4, 6, 5]}   intensity={1.2} color="#c0c1ff" />
<directionalLight position={[-4, -3, -6]} intensity={0.4} color="#ffb783" />
<pointLight position={[0, 0, 2]} intensity={0.6} color="#c0c1ff" distance={25} />
```

Two directional lights with opposing colors (primary lavender + tertiary orange) create the chromatic depth impression. The point light near origin keeps the center visible.

### Step 3.5 — GPU Particle Field

```jsx
function ParticleField({ count }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 90;  // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 90;  // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 90;  // z
    }
    return arr;
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#c0c1ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
```

Key decisions:
- `Float32Array` → `BufferGeometry` → uploaded to GPU once, not rebuilt per frame
- `AdditiveBlending` makes overlapping dots add up to brighter areas (stars effect)
- `depthWrite: false` prevents z-fighting with floating objects
- `sizeAttenuation: true` makes distant dots smaller (perspective scaling)

### Step 3.6 — Floating Objects at Depth Layers

Depth positioning creates parallax when the camera moves:

```
Foreground   z = -3    icosahedron   (lavender)
Mid-right    z = -8    octahedron    (soft purple)
Mid-left     z = -11   torus knot    (orange)
Deep-left    z = -22   icosahedron   (lavender, large)
Deep-right   z = -30   torus         (orange glow)
```

Each object has independent phase offset so they never move in sync:

```jsx
function FloatingObject({ position, color, emissive, speed, rotY, rotX, children }) {
  const baseY = position[1];
  const phase = useRef(Math.random() * Math.PI * 2);  // random start

  useFrame((_, delta) => {
    phase.current += delta * speed;
    ref.current.position.y  = baseY + Math.sin(phase.current) * 0.55;
    ref.current.rotation.y += delta * rotY;
    ref.current.rotation.x += delta * rotX;
  });
  // ...
}
```

Material uses `wireframe + AdditiveBlending + emissive` so Bloom picks it up:

```jsx
<meshStandardMaterial
  color={color}
  emissive={emissive}
  emissiveIntensity={0.5}
  wireframe
  transparent
  opacity={0.55}
  blending={THREE.AdditiveBlending}
  depthWrite={false}
/>
```

### Step 3.7 — Post-Processing (Bloom)

```jsx
<EffectComposer>
  <Bloom
    luminanceThreshold={0.05}
    luminanceSmoothing={0.85}
    intensity={1.4}
    mipmapBlur
  />
</EffectComposer>
```

Bloom works by extracting pixels above `luminanceThreshold` and spreading their glow outward. Because the floating objects use `emissive + AdditiveBlending`, they naturally exceed the threshold — their wireframe edges bloom into soft halos.

`mipmapBlur` uses GPU mipmaps for the blur pass, which is faster and smoother than a naive Gaussian.

---

## Part 4 — Smooth Scroll (SmoothScroll.jsx)

```javascript
const lenis = new Lenis({
  duration:    1.2,
  easing:      t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

Lenis intercepts the native scroll and replaces it with a damped version using an exponential easing curve. All existing `window.scroll` listeners and `IntersectionObserver` elements continue to work — Lenis fires standard scroll events internally.

Cleanup on unmount:

```javascript
return () => {
  cancelAnimationFrame(id);
  lenis.destroy();
};
```

---

## Part 5 — Event Wiring (MainScene.jsx root)

```javascript
// Mouse → targetMouseX/Y (normalised -1 to 1)
const onMouse = e => {
  targetMouseX =  (e.clientX / window.innerWidth  - 0.5) * 2;
  targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
};

// Scroll → scrollProgress (0 to 1)
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = max > 0 ? window.scrollY / max : 0;
};

window.addEventListener('mousemove', onMouse,  { passive: true });
window.addEventListener('scroll',    onScroll, { passive: true });
```

Both listeners are `passive: true` — they never call `preventDefault`, so the browser never blocks scroll on them.

---

## Part 6 — Responsive Strategy

```javascript
// In MainScene root component (runs client-side only)
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const particleCount = isMobile ? 600 : 2500;
```

| Breakpoint | Particles | Objects | Post-FX |
|------------|-----------|---------|---------|
| Desktop ≥ 768px | 2500 | 5 floating | Bloom on |
| Mobile < 768px | 600 | 5 floating | Bloom on |

On very low-end devices, the browser's WebGL implementation will drop frames — but this degrades gracefully since the canvas is `pointer-events: none` and the page content remains fully functional below it.

---

## Part 7 — CSS Layering (no changes needed to global.css)

The existing CSS already provides the correct stacking context:

```css
/* nav stays on top */
nav { position: fixed; z-index: 100; }

/* section content already has z-index: 10 where needed */
/* MainScene canvas sits at z-index: 0 via inline style */
```

Canvas wrapper in `MainScene.jsx`:

```jsx
<div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
  <Canvas ... />
</div>
```

Sections come after the canvas in DOM order → painted on top at the same z-level. The fixed nav at z-index 100 is always above both.

---

## Part 8 — Build Verification

```bash
npx astro build
# Expected output:
# ✓ Completed
# 1 page(s) built
# Complete!
```

Known warning (expected — Three.js is large):

```
Some chunks are larger than 500 kB after minification.
```

This is acceptable for a portfolio. Mitigation if needed: add `build.rollupOptions.output.manualChunks` in `astro.config.mjs` to split Three.js into its own chunk with a longer cache lifetime.

---

## Part 9 — Acceptance Checklist

### Functional

- [x] Smooth scroll via Lenis (exponential easing, 1.2s duration)
- [x] Camera rotates toward mouse position in real time
- [x] Camera flies forward through scene as user scrolls (z: 5 → -7)
- [x] 5 floating wireframe objects at z depths −3, −8, −11, −22, −30
- [x] 2500-point GPU particle cloud (600 on mobile)
- [x] Bloom post-processing on emissive wireframe objects
- [x] Scene transparent — dark page background shows through
- [x] All DOM content (text, cards, nav) renders above the canvas

### Performance

- [x] Canvas is `pointer-events: none` — zero click interference
- [x] Both event listeners are `passive: true` — scroll never blocked
- [x] Positions generated once via `useMemo` — no per-frame allocation
- [x] `dpr={[1,2]}` — caps pixel ratio for high-DPI mobile screens
- [x] `client:only="react"` — scene loads after page paint, not before

### Quality

- [x] Build passes with zero errors (`npx astro build`)
- [x] All existing sections, nav, contact, footer unaffected
- [x] Cleanup: RAF cancelled + Lenis destroyed on component unmount
- [x] No unused imports

---

## Part 10 — File Summary

```
src/
├── components/
│   ├── MainScene.jsx        ← Three.js WebGL scene (camera, particles, objects, bloom)
│   ├── SmoothScroll.jsx     ← Lenis RAF loop
│   └── ParticleSphere.jsx   ← Canvas 2D legacy (kept, not mounted)
│
└── layouts/
    └── Layout.astro         ← Mounts SmoothScroll + MainScene as client:only islands
```

To run locally:

```bash
npm run dev
# Open http://localhost:4321
# Move mouse → camera tilts
# Scroll → camera flies through scene
# Wireframe objects float and bloom
```
