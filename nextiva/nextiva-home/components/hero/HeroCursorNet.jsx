'use client';
/* Cursor constellation for the home hero: a few nodes drift in the side
   gutters, joined by faint lines, and the pointer becomes a ringed dot that
   draws a line to the nearest nodes. Pointer-fine screens only; it sits still
   under prefers-reduced-motion and pauses while the hero is off-screen. */
import { useEffect, useRef } from 'react';

const INK = '15, 23, 42';
const ACCENT = '249, 115, 22';
const LINK = 260;    // node ↔ node mesh distance
const REACH = 300;   // cursor ↔ node distance
const PULL = 2;      // cursor links to this many nearest nodes
const TOP = 100;     // clear of the nav bar

// Anchor points as fractions of the hero: left and right gutters, so the
// mesh frames the headline instead of crossing it.
const ANCHORS = [
  [0.06, 0.2], [0.15, 0.1], [0.11, 0.42], [0.04, 0.64], [0.17, 0.78],
  [0.94, 0.18], [0.84, 0.1], [0.9, 0.44], [0.96, 0.66], [0.83, 0.8],
  [0.3, 0.06], [0.7, 0.06],
];

export default function HeroCursorNet() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, t0 = performance.now();
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, on: false, a: 0 };
    const nodes = ANCHORS.map(([fx, fy], i) => ({
      fx, fy, x: 0, y: 0, glow: 0,
      ph: i * 1.7, sp: 0.00018 + (i % 4) * 0.00006, amp: 10 + (i % 3) * 6,
    }));

    const size = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now) => {
      const t = still ? 0 : now - t0;
      ctx.clearRect(0, 0, w, h);
      // Only the top band of the hero (above the product mock) gets the mesh.
      const band = Math.min(h, Math.max(520, window.innerHeight * 0.95));

      for (const n of nodes) {
        n.x = n.fx * w + Math.cos(t * n.sp + n.ph) * n.amp;
        // Start below the overlaid nav bar.
        n.y = TOP + n.fy * (band - TOP) + Math.sin(t * n.sp * 1.3 + n.ph) * n.amp;
      }

      ptr.x += (ptr.tx - ptr.x) * 0.22;
      ptr.y += (ptr.ty - ptr.y) * 0.22;
      ptr.a += ((ptr.on ? 1 : 0) - ptr.a) * 0.12;

      // Nearest nodes to the cursor.
      const near = ptr.a > 0.01
        ? nodes.map((n) => ({ n, d: Math.hypot(n.x - ptr.x, n.y - ptr.y) }))
            .filter((o) => o.d < REACH).sort((a, b) => a.d - b.d).slice(0, PULL)
        : [];
      for (const n of nodes) {
        const hit = near.some((o) => o.n === n);
        n.glow += ((hit ? 1 : 0) - n.glow) * 0.15;
      }

      // Mesh.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK) continue;
          ctx.strokeStyle = `rgba(${INK}, ${(1 - d / LINK) * 0.11})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // Cursor links.
      for (const { n, d } of near) {
        const k = (1 - d / REACH) * ptr.a;
        const g = ctx.createLinearGradient(ptr.x, ptr.y, n.x, n.y);
        g.addColorStop(0, `rgba(${ACCENT}, ${0.75 * k})`);
        g.addColorStop(1, `rgba(${ACCENT}, ${0.25 * k})`);
        ctx.strokeStyle = g; ctx.lineWidth = 1.25;
        ctx.beginPath(); ctx.moveTo(ptr.x, ptr.y); ctx.lineTo(n.x, n.y); ctx.stroke();
      }

      // Nodes.
      for (const n of nodes) {
        if (n.glow > 0.02) {
          ctx.fillStyle = `rgba(${ACCENT}, ${0.14 * n.glow})`;
          ctx.beginPath(); ctx.arc(n.x, n.y, 3 + 6 * n.glow, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = n.glow > 0.02
          ? `rgba(${ACCENT}, ${0.35 + 0.55 * n.glow})`
          : `rgba(${INK}, 0.22)`;
        ctx.beginPath(); ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      // Cursor dot with ring.
      if (ptr.a > 0.01) {
        ctx.fillStyle = `rgba(${ACCENT}, ${0.1 * ptr.a})`;
        ctx.beginPath(); ctx.arc(ptr.x, ptr.y, 16, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.45 * ptr.a})`; ctx.lineWidth = 1.25;
        ctx.beginPath(); ctx.arc(ptr.x, ptr.y, 16, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = `rgba(${ACCENT}, ${0.95 * ptr.a})`;
        ctx.beginPath(); ctx.arc(ptr.x, ptr.y, 5, 0, Math.PI * 2); ctx.fill();
      }

      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const start = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top;
      if (!ptr.on) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
      ptr.on = true;
      start();
    };
    const onLeave = () => { ptr.on = false; };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) start();
    });
    const ro = new ResizeObserver(size);

    size();
    io.observe(host); ro.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-cursor-net" aria-hidden="true" />;
}
