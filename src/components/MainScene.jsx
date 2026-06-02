import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Module-level mouse + scroll state — avoids React re-render per frame
let scrollProgress = 0;
let targetMouseX   = 0;
let targetMouseY   = 0;

// ── Camera Controller ─────────────────────────────────────────────────────────
// Oscillating Z (in-out breathing) + sinusoidal X sway (zigzag) + mouse look
function CameraController() {
  const { camera } = useThree();
  const mx = useRef(0);
  const my = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Smooth mouse lag
    mx.current += (targetMouseX - mx.current) * 0.04;
    my.current += (targetMouseY - my.current) * 0.04;
    camera.rotation.y = mx.current * 0.08;
    camera.rotation.x = my.current * 0.05;

    // In-out: breathe ±2.5 units (~18 s period), scroll adds a mild push forward
    const breathe    = Math.sin(t * 0.35) * 2.5;
    const targetZ    = 5 - scrollProgress * 5 + breathe;
    camera.position.z += (targetZ - camera.position.z) * 0.04;

    // Zigzag: sway ±1.2 units left-right (~28 s period)
    const swayX = Math.sin(t * 0.22) * 1.2;
    camera.position.x += (swayX - camera.position.x) * 0.02;
  });

  return null;
}

// ── GPU Particle Field ────────────────────────────────────────────────────────
// Random star field — uploaded to GPU once, slowly drifts
function ParticleField({ count }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 90;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 90;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 90;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.008;
    ref.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#58A6FF"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Dotted Ball ───────────────────────────────────────────────────────────────
// 900 fibonacci dots on a small sphere — slow rotation + sinusoidal bob
function DottedBall() {
  const ref   = useRef();
  const phase = useRef(Math.random() * Math.PI * 2);

  const positions = useMemo(() => {
    const count  = 900;
    const radius = 0.9;                            // smaller ball
    const arr    = new Float32Array(count * 3);
    const phi    = Math.PI * (3 - Math.sqrt(5));   // golden angle
    for (let i = 0; i < count; i++) {
      const y     = 1 - (i / (count - 1)) * 2;
      const r     = Math.sqrt(1 - y * y);
      const theta = phi * i;
      arr[i * 3]     = Math.cos(theta) * r * radius;
      arr[i * 3 + 1] = y * radius;
      arr[i * 3 + 2] = Math.sin(theta) * r * radius;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    phase.current          += delta * 0.45;
    ref.current.position.y  = Math.sin(phase.current) * 0.45;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.07;
  });

  return (
    <points ref={ref} position={[5, 0, -3]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#58A6FF"
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Scene Graph ───────────────────────────────────────────────────────────────
function Scene({ particleCount }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]}   intensity={1.2} color="#58A6FF" />
      <directionalLight position={[-4, -3, -6]} intensity={0.5} color="#00D4FF" />
      <pointLight position={[0, 0, 2]} intensity={0.7} color="#58A6FF" distance={25} />

      <CameraController />
      <ParticleField count={particleCount} />
      <DottedBall />

      <EffectComposer>
        <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.85} intensity={1.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

// ── Root Island ───────────────────────────────────────────────────────────────
export default function MainScene() {
  const isMobile      = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 600 : 2500;

  useEffect(() => {
    const onMouse = e => {
      targetMouseX =  (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? window.scrollY / max : 0;
    };

    window.addEventListener('mousemove', onMouse,  { passive: true });
    window.addEventListener('scroll',    onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll',    onScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Scene particleCount={particleCount} />
      </Canvas>
    </div>
  );
}
