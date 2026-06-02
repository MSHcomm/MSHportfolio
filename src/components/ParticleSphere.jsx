import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;

// Fibonacci sphere lattice — uniform distribution of N points on a sphere
function fibonacciSphere(count, radius) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([r * Math.cos(theta) * radius, y * radius, r * Math.sin(theta) * radius]);
  }
  return pts;
}

// 3D rotation helpers
function applyRotY(pt, a) {
  const cos = Math.cos(a), sin = Math.sin(a);
  return [pt[0] * cos + pt[2] * sin, pt[1], -pt[0] * sin + pt[2] * cos];
}

function applyRotX(pt, a) {
  const cos = Math.cos(a), sin = Math.sin(a);
  return [pt[0], pt[1] * cos - pt[2] * sin, pt[1] * sin + pt[2] * cos];
}

export default function ParticleSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Sphere config ──────────────────────────────────────────────
    const SPHERE_N = 240;
    let SPHERE_R = Math.min(window.innerWidth * 0.12, 140);
    const FOV = 480;
    let BASE = fibonacciSphere(SPHERE_N, SPHERE_R);

    // ── Viewport ───────────────────────────────────────────────────
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // ── Background constellation dots ──────────────────────────────
    const BG_N = 90;
    const makeBg = () => Array.from({ length: BG_N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.1 + 0.35,
      a: Math.random() * 0.30 + 0.07,
      pf: Math.random() * 0.012 + 0.004,
    }));
    let bg = makeBg();

    // ── State ──────────────────────────────────────────────────────
    let rX = 0.25, rY = 0;
    let tRX = 0.25, tRY = 0;
    let mx = W / 2, my = H / 2;
    let scrollY = 0;
    let raf;
    let t = 0;

    // ── Event listeners ────────────────────────────────────────────
    const onMouse = e => {
      mx = e.clientX;
      my = e.clientY;
      tRY = (e.clientX / W - 0.5) * 1.4;
      tRX = 0.25 + (e.clientY / H - 0.5) * 0.6;
    };

    const onScroll = () => { scrollY = window.scrollY; };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      SPHERE_R = Math.min(W * 0.12, 140);
      BASE = fibonacciSphere(SPHERE_N, SPHERE_R);
      bg = makeBg();
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // ── Main draw loop ─────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.006;

      // Smooth rotation lerp toward mouse target
      rY += (tRY - rY) * 0.04;
      rX += (tRX - rX) * 0.04;

      // Ball travels across the viewport as user scrolls
      // At scroll 0   → right side (75%)
      // At scroll 50% → left side (25%)
      // At scroll 100%→ right side again
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);
      const sp = scrollY / maxScroll;
      const bx = W * 0.5 + Math.sin(sp * TAU) * W * 0.26;
      const by = H * 0.42 + Math.sin(t * 0.35) * 28; // gentle float

      // ── 1. Background constellation ──────────────────────────────
      // Move dots
      bg.forEach(p => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
      });

      // Connection lines between nearby dots
      ctx.lineWidth = 0.35;
      for (let i = 0; i < BG_N; i++) {
        for (let j = i + 1; j < BG_N; j++) {
          const dx = bg[i].x - bg[j].x;
          const dy = bg[i].y - bg[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) { // 120^2
            const alpha = (1 - Math.sqrt(d2) / 120) * 0.10;
            ctx.strokeStyle = `rgba(192,193,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(bg[i].x, bg[i].y);
            ctx.lineTo(bg[j].x, bg[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots with mouse parallax
      bg.forEach(p => {
        const px = p.x + (mx / W - 0.5) * -50 * p.pf * 12;
        const py = p.y + (my / H - 0.5) * -50 * p.pf * 12;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, TAU);
        ctx.fillStyle = `rgba(192,193,255,${p.a})`;
        ctx.fill();
      });

      // ── 2. Sphere ambient glow ───────────────────────────────────
      const glowR = SPHERE_R * 1.6;
      const glow = ctx.createRadialGradient(bx, by, 0, bx, by, glowR);
      glow.addColorStop(0, 'rgba(192,193,255,0.055)');
      glow.addColorStop(0.5, 'rgba(192,193,255,0.02)');
      glow.addColorStop(1, 'rgba(192,193,255,0)');
      ctx.beginPath();
      ctx.arc(bx, by, glowR, 0, TAU);
      ctx.fillStyle = glow;
      ctx.fill();

      // ── 3. Sphere dots ───────────────────────────────────────────
      // Apply rotation: first Y-axis (auto-spin + mouse), then X-axis (mouse tilt)
      const rotated = BASE.map(pt => applyRotX(applyRotY(pt, rY + t), rX));

      // Back-to-front sort for correct painter's order
      rotated.sort((a, b) => a[2] - b[2]);

      rotated.forEach(([x, y, z]) => {
        const scale = FOV / (FOV + z + SPHERE_R);
        const sx = bx + x * scale;
        const sy = by + y * scale;

        // 0 = back face, 1 = front face
        const depth = (z + SPHERE_R) / (SPHERE_R * 2);
        const dotR = (0.7 + depth * 2.4) * scale;
        const alpha = 0.08 + depth * 0.88;

        // Glowing halo on foreground dots
        if (depth > 0.68) {
          const haloR = dotR * 3.5;
          const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, haloR);
          halo.addColorStop(0, `rgba(192,193,255,${alpha * 0.45})`);
          halo.addColorStop(1, 'rgba(192,193,255,0)');
          ctx.beginPath();
          ctx.arc(sx, sy, haloR, 0, TAU);
          ctx.fillStyle = halo;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(dotR, 0.3), 0, TAU);
        ctx.fillStyle = `rgba(192,193,255,${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
