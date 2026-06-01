import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Module-level mouse + scroll state — avoids React re-render per frame
let scrollProgress = 0;
let targetMouseX   = 0;
let targetMouseY   = 0;

// ── Camera Controller ─────────────────────────────────────────────────────────
// §4.1 mouse → camera rotation  |  §4.2 scroll → camera Z (fly-through)
function CameraController() {
  const { camera } = useThree();
  const mx = useRef(0);
  const my = useRef(0);

  useFrame(() => {
    mx.current += (targetMouseX - mx.current) * 0.04;
    my.current += (targetMouseY - my.current) * 0.04;

    camera.rotation.y = mx.current * 0.08;
    camera.rotation.x = my.current * 0.05;

    const targetZ = 5 - scrollProgress * 12;
    camera.position.z += (targetZ - camera.position.z) * 0.055;
  });

  return null;
}

// ── GPU Particle Field ────────────────────────────────────────────────────────
// Float32Array → BufferGeometry → THREE.Points (GPU rendered, uploaded once)
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
        size={0.07}
        color="#58A6FF"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Floating Object ───────────────────────────────────────────────────────────
// Depth layers via Z position | sinusoidal Y + continuous rotation
function FloatingObject({ position, color, emissive, speed, rotY, rotX, children }) {
  const ref   = useRef();
  const baseY = position[1];
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (!ref.current) return;
    phase.current += delta * speed;
    ref.current.position.y  = baseY + Math.sin(phase.current) * 0.55;
    ref.current.rotation.y += delta * rotY;
    ref.current.rotation.x += delta * rotX;
  });

  return (
    <mesh ref={ref} position={position}>
      {children}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.55}
        wireframe
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
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

      {/* z: -3 (foreground) → -30 (deep background) — parallax depth layers */}
      <FloatingObject position={[3.5, 0.5, -3]}    color="#58A6FF" emissive="#58A6FF" speed={0.50} rotY={0.22} rotX={0.10}>
        <icosahedronGeometry args={[1.4, 1]} />
      </FloatingObject>

      <FloatingObject position={[-4, -0.5, -11]}   color="#F0883E" emissive="#F0883E" speed={0.35} rotY={0.16} rotX={0.07}>
        <torusKnotGeometry args={[0.9, 0.28, 100, 16]} />
      </FloatingObject>

      <FloatingObject position={[1.5, 2.5, -8]}    color="#00D4FF" emissive="#00D4FF" speed={0.60} rotY={0.28} rotX={0.14}>
        <octahedronGeometry args={[1.1]} />
      </FloatingObject>

      <FloatingObject position={[-2.5, -1.5, -22]} color="#58A6FF" emissive="#58A6FF" speed={0.28} rotY={0.13} rotX={0.06}>
        <icosahedronGeometry args={[1.8, 1]} />
      </FloatingObject>

      <FloatingObject position={[4.5, 1, -30]}     color="#00D4FF" emissive="#F0883E" speed={0.40} rotY={0.19} rotX={0.09}>
        <torusGeometry args={[1.3, 0.38, 16, 60]} />
      </FloatingObject>

      <EffectComposer>
        <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.85} intensity={1.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

// ── Root Island ───────────────────────────────────────────────────────────────
// client:only="react" — fixed canvas behind all UI, pointer-events none
export default function MainScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
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
