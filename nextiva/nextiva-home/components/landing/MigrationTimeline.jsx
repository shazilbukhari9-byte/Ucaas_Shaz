'use client';
/* Day-by-day migration timeline (stepsStyle: 'timeline'). Once it scrolls
   into view it plays through the days: the rail fills up to the current day,
   past days turn solid, the current day pulses and its card lifts. Hovering
   or focusing a day jumps to it and holds there. */
import { useEffect, useRef, useState } from 'react';

export default function MigrationTimeline({ steps }) {
  const ref = useRef(null);
  const [active, setActive] = useState(-1);
  const [held, setHeld] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || held) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) { setActive(steps.length - 1); return undefined; }
    if (active < 0) {
      const t = setTimeout(() => setActive(0), 250);
      return () => clearTimeout(t);
    }
    // Hold on the last day a little longer before replaying.
    const wait = active === steps.length - 1 ? 3600 : 1900;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), wait);
    return () => clearTimeout(t);
  }, [seen, held, active, steps.length]);

  const frac = steps.length > 1 ? Math.max(active, 0) / (steps.length - 1) : 0;
  const hold = (i) => { setHeld(true); setActive(i); };

  return (
    <div
      ref={ref}
      className={`lp-timeline-wrap${active >= 0 ? ' is-playing' : ''}`}
      style={{ '--tl-frac': frac }}
      onMouseLeave={() => setHeld(false)}
    >
      <span className="lp-tl-track" aria-hidden="true"><span className="lp-tl-fill"></span></span>
      <ol className="lp-timeline">
      {steps.map((s, i) => {
        const state = i < active ? ' is-done' : i === active ? ' is-active' : '';
        return (
          <li
            className={`lp-tl-step${state}`}
            key={s.title}
            tabIndex={0}
            aria-current={i === active ? 'step' : undefined}
            onMouseEnter={() => hold(i)}
            onFocus={() => hold(i)}
            onBlur={() => setHeld(false)}
          >
            <div className="lp-tl-marker">
              <span className="lp-tl-day">{s.day}</span>
              <span className="lp-tl-dot"><i className={s.icon || 'ri-check-line'} aria-hidden="true"></i></span>
            </div>
            <div className="lp-tl-card">
              <span className="lp-tl-label">{s.label}</span>
              <h3 className="lp-card-title">{s.title}</h3>
              <div className="lp-card-text">{s.text}</div>
              <span className="lp-tl-progress" aria-hidden="true"></span>
            </div>
          </li>
        );
      })}
      </ol>
    </div>
  );
}
