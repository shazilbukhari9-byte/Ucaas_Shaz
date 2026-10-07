'use client';

import { useEffect } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';

/** Other components lock or unlock page scrolling (e.g. the mobile menu) by
    dispatching this event with `detail: true | false`. */
export const SCROLL_LOCK_EVENT = 'ucaas:scroll-lock';

/* Reload lands at the top instead of being yanked back down: the browser
   restores the old scroll offset only once enough layout exists, so a reload
   deep in the page paints the hero first and then jumps. This runs when the
   client bundle is evaluated — before hydration and before the load-time
   restore — so it replaces the old inline <script> in the root layout, which
   React flags ("Encountered a script tag while rendering"). */
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

/**
 * Site-wide smooth scrolling with Locomotive Scroll v5 (built on Lenis).
 *
 * - Loaded in the browser only: the library touches `window` on import.
 * - Skipped entirely for visitors who ask for reduced motion, so they keep
 *   native scrolling.
 * - Touch devices keep native scrolling (Lenis' default): momentum scrolling
 *   on phones already feels right, and smoothing it adds lag.
 * - `anchors` makes in-page #links glide instead of jump.
 * - Elements that must scroll on their own (the mobile menu list) opt out
 *   with `data-lenis-prevent`.
 * - `data-scroll` attributes from the Locomotive docs work on any element.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let instance = null;
    let cancelled = false;

    // Locomotive's own stop() only pauses its animation loop; wheel input
    // would keep queuing and land all at once on start(). Stopping Lenis
    // itself ignores input while locked (and adds `lenis-stopped`).
    const onLock = (event) => {
      const lenis = instance?.lenisInstance;
      if (!lenis) return;
      if (event.detail) lenis.stop();
      else lenis.start();
    };
    window.addEventListener(SCROLL_LOCK_EVENT, onLock);

    import('locomotive-scroll').then(({ default: LocomotiveScroll }) => {
      if (cancelled) return;
      instance = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
          anchors: true,
        },
      });
      // Handy for debugging and for blocks that want to call scrollTo().
      window.__locomotiveScroll = instance;
    });

    return () => {
      cancelled = true;
      window.removeEventListener(SCROLL_LOCK_EVENT, onLock);
      instance?.destroy();
      if (window.__locomotiveScroll === instance) delete window.__locomotiveScroll;
    };
  }, []);

  return null;
}
