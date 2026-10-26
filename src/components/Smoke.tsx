import { useEffect, useRef, useState } from 'react';

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Domain-warped fbm noise drifting upward, tinted with the brand gradient.
// The cursor swirls the smoke around it; fast movement stirs it harder.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uStir;
uniform float uDark;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);

  // swirl around the cursor
  vec2 d = p - m;
  float r = length(d);
  float swirl = exp(-r * r * 9.0) * (0.5 + uStir * 2.0);
  float s = sin(swirl), c = cos(swirl);
  p = m + mat2(c, -s, s, c) * d;

  p *= vec2(1.6, 1.1); // stretch vertically so strands read as rising
  float t = uTime * 0.035;
  vec2 q = vec2(fbm(p + vec2(0.0, -t * 2.0)), fbm(p + vec2(5.2, 1.3) - vec2(0.0, t * 1.5)));
  vec2 w = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.6), fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 0.5));
  float f = fbm(p + 3.0 * w - vec2(0.0, t * 3.0));

  // thin wisps: ridges of a warped field, gated by a sparse cloud mask
  float ridge = 1.0 - abs(fbm(p * 1.3 + 2.5 * w - vec2(0.0, t * 2.5)) * 2.0 - 1.0);
  float wisp = pow(ridge, 7.0);
  float body = smoothstep(0.5, 0.85, f);
  float dens = body * 0.45 + wisp * smoothstep(0.35, 0.7, f) * 0.9;
  dens += exp(-r * r * 30.0) * 0.12 * uStir;

  // keep it to the right side and lower area, clear of the headline
  dens *= mix(0.2, 1.0, smoothstep(0.25, 0.85, uv.x));
  dens *= smoothstep(0.0, 0.3, uv.y) * (1.0 - 0.6 * smoothstep(0.55, 1.0, uv.y));

  vec3 violet = vec3(0.486, 0.227, 0.929);
  vec3 sky = vec3(0.055, 0.647, 0.914);
  vec3 mist = mix(vec3(0.78, 0.74, 1.0), vec3(0.45, 0.38, 0.85), 1.0 - uDark);
  vec3 col = mix(violet, sky, clamp(q.y * 1.6 - 0.3, 0.0, 1.0));
  col = mix(col, mist, wisp * 0.7); // wisp edges catch light

  float a = clamp(dens * mix(0.4, 0.5, uDark), 0.0, 1.0);
  gl_FragColor = vec4(col * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
  return sh;
}

export default function Smoke({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false });
    if (!gl) return setFailed(true);

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
    } catch {
      return setFailed(true);
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes'), uTime = u('uTime'), uMouse = u('uMouse'), uStir = u('uStir'), uDark = u('uDark');

    // smoke is soft, so render below native resolution
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 2) * 0.5;
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0.7, y: 0.55, tx: 0.7, ty: 0.55, active: false, stir: 0, last: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      mouse.active = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      if (!mouse.active) return;
      const now = performance.now();
      const dt = Math.max(16, now - mouse.last);
      mouse.last = now;
      mouse.stir = Math.min(1, mouse.stir + (Math.hypot(x - mouse.tx, y - mouse.ty) / dt) * 40);
      mouse.tx = x;
      mouse.ty = y;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);

    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      raf = 0;
      const t = (now - t0) / 1000;
      if (!mouse.active) {
        // idle drift so the smoke always has a gentle eddy
        mouse.tx = 0.65 + Math.sin(t * 0.21) * 0.2;
        mouse.ty = 0.55 + Math.cos(t * 0.17) * 0.2;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.stir *= 0.96;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 20 : t + 20);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uStir, mouse.stir);
      gl.uniform1f(uDark, document.documentElement.classList.contains('dark') ? 1 : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (visible && !document.hidden && !reduced) start();
    };
    function start() {
      if (!raf) raf = requestAnimationFrame(frame);
    }
    const onVis = () => !document.hidden && start();
    document.addEventListener('visibilitychange', onVis);
    // redraw the static frame when the theme flips under reduced motion
    const mo = new MutationObserver(start);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  if (failed) {
    return (
      <>
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-blob rounded-full bg-violet-brand/30 blur-3xl dark:bg-violet-brand/25" />
        <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 animate-blob rounded-full bg-sky-brand/25 blur-3xl [animation-delay:-5s]" />
      </>
    );
  }
  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
