'use client';
/* Pause an autoplaying demo only while the visitor is actually using it.
 *
 * Pausing on mouseenter misfires: when the page scrolls under a resting
 * cursor the browser fires enter events, so the demo froze for people who
 * were only reading. Here the pause starts on real pointer movement (or a
 * click / keyboard focus) inside the element and lifts by itself after the
 * pointer has been still for IDLE_MS, or as soon as it leaves.
 */
import { useEffect, useRef, useState } from 'react';

const IDLE_MS = 2500;

export default function useIntentPause() {
  const [paused, setPaused] = useState(false);
  const idle = useRef(null);
  useEffect(() => () => clearTimeout(idle.current), []);

  const hold = () => {
    setPaused(true);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setPaused(false), IDLE_MS);
  };
  const release = () => {
    clearTimeout(idle.current);
    setPaused(false);
  };

  const bind = {
    onPointerMove: (e) => {
      // Touch and pen "moves" are taps or scroll gestures, not hovering.
      if (e.pointerType !== 'mouse' || (e.movementX === 0 && e.movementY === 0)) return;
      hold();
    },
    onPointerDown: hold,
    onPointerLeave: release,
    onFocus: hold,
    onBlur: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) release(); },
  };
  return [paused, bind];
}
