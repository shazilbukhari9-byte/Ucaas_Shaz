'use client';
/* Live fluid backdrop for the closing CTA: a WebGL domain-warped noise field
   in the brand oranges that keeps flowing on its own. When the pointer moves
   over the card the fluid reacts — it twists into a vortex around the cursor,
   ripples outward and brightens where you are — and settles back when the
   pointer leaves. Faster pointer movement stirs it harder.

   Pauses while off-screen, draws one still frame under reduced motion, and if
   WebGL is unavailable the static SVG marbling underneath stays visible. */
import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uStir;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
  return v;
}
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.y;
  vec2 m = uMouse / uRes.y;
  float t = uTime;

  // Pointer interaction: a vortex that twists the field around the cursor,
  // plus an outward ripple. Both fade with distance and with uHover.
  vec2 d = uv - m;
  float dist = length(d);
  float fall = exp(-dist * dist * 7.0);
  uv = m + rot(uHover * (1.6 + uStir * 2.4) * fall) * d;
  uv += normalize(d + 1e-4) * sin(dist * 28.0 - t * 5.0) * 0.012 * uHover * exp(-dist * 3.5);

  // Domain-warped fbm: slow, silky, marbled.
  vec2 p = uv * 0.85;
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.05)), fbm(p + vec2(5.2, 1.3) - t * 0.04));
  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.07),
                fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.06));
  float f = fbm(p + 3.4 * r);

  // Marble bands through the brand palette: deep ink and plum, then the
  // theme's light oranges (#f8b27a → #fcd0a8 → #fff1e3) — soft peach
  // rather than burnt orange.
  float band = 0.5 + 0.5 * sin(f * 6.0 + length(r) * 3.0 - t * 0.25);
  vec3 ink = vec3(0.07, 0.012, 0.18);
  vec3 plum = vec3(0.27, 0.05, 0.27);
  vec3 ember = vec3(0.97, 0.70, 0.48);
  vec3 flame = vec3(0.99, 0.82, 0.66);
  vec3 peach = vec3(1.0, 0.95, 0.89);
  vec3 col = mix(ink, plum, smoothstep(0.08, 0.32, f));
  col = mix(col, ember, smoothstep(0.32, 0.52, f));
  col = mix(col, flame, smoothstep(0.46, 0.68, f) * (0.35 + 0.65 * band));
  col = mix(col, peach, smoothstep(0.72, 1.0, band) * smoothstep(0.5, 0.74, f) * 0.75);

  // A warm glow where the pointer is.
  col += vec3(1.0, 0.78, 0.58) * fall * uHover * 0.18;

  // Gentle vignette.
  vec2 s = gl_FragCoord.xy / uRes - 0.5;
  col *= 1.0 - dot(s, s) * 0.35;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function CtaFluidCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return undefined;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return undefined;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uHover = gl.getUniformLocation(prog, 'uHover');
    const uStir = gl.getUniformLocation(prog, 'uStir');

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, on: false, hover: 0, stir: 0, lastX: 0, lastY: 0 };
    let w = 1, h = 1, scale = 1, raf = 0, visible = true;
    const t0 = performance.now();

    const size = () => {
      const r = host.getBoundingClientRect();
      // Render below full DPR: the field is soft, and this keeps it cheap.
      scale = Math.min(window.devicePixelRatio || 1, 1.25);
      w = Math.max(1, Math.round(r.width * scale));
      h = Math.max(1, Math.round(r.height * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      if (!ptr.on) { ptr.x = ptr.tx = w * 0.75; ptr.y = ptr.ty = h * 0.5; }
    };

    const draw = (now) => {
      const t = still ? 12 : (now - t0) / 1000;
      ptr.x += (ptr.tx - ptr.x) * 0.12;
      ptr.y += (ptr.ty - ptr.y) * 0.12;
      ptr.hover += ((ptr.on ? 1 : 0) - ptr.hover) * 0.06;
      ptr.stir *= 0.94;
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, ptr.x, ptr.y);
      gl.uniform1f(uHover, ptr.hover);
      gl.uniform1f(uStir, Math.min(ptr.stir, 1));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.classList.add('is-ready');
      raf = visible && !still ? requestAnimationFrame(draw) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(draw); };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) * scale;
      const y = (r.bottom - e.clientY) * scale; // GL y is bottom-up
      if (!ptr.on) { ptr.x = x; ptr.y = y; ptr.lastX = x; ptr.lastY = y; }
      ptr.stir += Math.hypot(x - ptr.lastX, y - ptr.lastY) / 120;
      ptr.lastX = x; ptr.lastY = y;
      ptr.tx = x; ptr.ty = y; ptr.on = true;
      if (still) requestAnimationFrame(draw);
    };
    const onLeave = () => { ptr.on = false; if (still) requestAnimationFrame(draw); };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    const ro = new ResizeObserver(() => { size(); if (still) requestAnimationFrame(draw); });

    size();
    io.observe(host);
    ro.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="lp-cta-canvas" aria-hidden="true" />;
}
