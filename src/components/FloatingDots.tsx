import { useEffect, useRef } from 'react';

const LINK = 120; // px; dots closer than this get a connecting line
const AREA_PER_DOT = 13000; // px² of viewport per dot
// brand violet, sky and indigo; lighter shades so they stand out on the dark theme
const COLORS = {
  dark: ['167, 139, 250', '56, 189, 248', '129, 140, 248'],
  light: ['124, 58, 237', '14, 165, 233', '81, 43, 212'],
};

type Dot = { x: number; y: number; vx: number; vy: number; r: number; depth: number; phase: number; tint: number };

const mod = (n: number, m: number) => ((n % m) + m) % m;

// Fixed behind the whole page, so the dots stay in view through every section.
// Dots drift on their own and slide at different speeds as the page scrolls.
export default function FloatingDots() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0;
    let dots: Dot[] = [];

    const seed = (): Dot => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 12; // px per second
      return {
        x: Math.random() * (w + LINK * 2),
        y: Math.random() * (h + LINK * 2),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4, // slight overall rise
        r: 0.8 + Math.random() * 1.6,
        depth: 0.08 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        tint: Math.floor(Math.random() * 3),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.max(30, Math.round((w * h) / AREA_PER_DOT)));
      dots = dots.slice(0, count);
      while (dots.length < count) dots.push(seed());
    };
    resize();

    const draw = (t: number) => {
      const colors = document.documentElement.classList.contains('dark') ? COLORS.dark : COLORS.light;
      const scroll = reduced ? 0 : window.scrollY;
      // wrap inside a margin of LINK so dots and their lines appear off-screen
      const pts = dots.map((d) => ({
        x: mod(d.x, w + LINK * 2) - LINK,
        y: mod(d.y - scroll * d.depth, h + LINK * 2) - LINK,
        d,
      }));

      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dist = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (dist > LINK) continue;
          ctx.strokeStyle = `rgba(${colors[pts[i].d.tint]}, ${(1 - dist / LINK) * 0.3})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }

      for (const { x, y, d } of pts) {
        const twinkle = 0.6 + 0.4 * Math.sin(t * 1.2 + d.phase);
        ctx.fillStyle = `rgba(${colors[d.tint]}, ${0.16 * twinkle})`; // soft glow
        ctx.beginPath();
        ctx.arc(x, y, d.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${colors[d.tint]}, ${0.95 * twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      for (const d of dots) {
        d.x += d.vx * dt;
        d.y += d.vy * dt;
      }
      draw(now / 1000);
      if (!document.hidden) start();
    };
    function start() {
      if (reduced) return draw(0);
      if (!raf) raf = requestAnimationFrame(frame);
    }
    const onVis = () => {
      last = performance.now();
      if (!document.hidden) start();
    };
    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    // redraw the static frame when the theme flips under reduced motion
    const mo = new MutationObserver(start);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    start();

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
