'use client';

import { useEffect } from 'react';
import { enableDragScroll } from './dragScroll';

const STEP = 236; // one card plus its gap, as in the original bundle

/**
 * The platform showcase's stat carousel: drag to scroll, or use the prev/next
 * buttons that sit on the surrounding section.
 *
 * The `.reveal` handling that shipped in the same bundle is not repeated here —
 * hooks/useRevealOnScroll covers the whole page.
 */
export default function useProductShowcase(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups = [];

    root.querySelectorAll('.platform-stats-carousel').forEach((track) => {
      cleanups.push(enableDragScroll(track));

      const section = track.closest('.platform-stats-section');
      if (!section) return;

      const scrollBy = (delta) => () => track.scrollBy({ left: delta, behavior: 'smooth' });
      const prev = section.querySelector('[data-direction="prev"]');
      const next = section.querySelector('[data-direction="next"]');

      if (prev) {
        const onPrev = scrollBy(-STEP);
        prev.addEventListener('click', onPrev);
        cleanups.push(() => prev.removeEventListener('click', onPrev));
      }
      if (next) {
        const onNext = scrollBy(STEP);
        next.addEventListener('click', onNext);
        cleanups.push(() => next.removeEventListener('click', onNext));
      }
    });

    // --- stat tiles count up on entry ---------------------------------------
    // Same behaviour as the home dashboard: the figures climb from zero when
    // the panel reaches the screen, so the card reads as live rather than as
    // a screenshot. Values that are not a plain leading number are skipped.
    const statsHost = root.querySelector('.stats-grid');
    const stats = [...(statsHost ? statsHost.querySelectorAll('.stat-value') : [])]
      .map((el) => {
        const m = /^([\d.,]+)(.*)$/.exec(el.textContent.trim());
        if (!m) return null;
        return {
          el,
          target: parseFloat(m[1].replace(/,/g, '')),
          suffix: m[2],
          decimals: (m[1].split('.')[1] || '').length,
        };
      })
      .filter(Boolean);

    if (statsHost && stats.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let frame;
      const statsObserver = new IntersectionObserver(
        (entries, self) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            self.disconnect();
            const start = performance.now();
            const step = (now) => {
              const t = Math.min((now - start) / 1600, 1);
              const eased = 1 - Math.pow(1 - t, 4);
              stats.forEach(({ el, target, suffix, decimals }) => {
                el.textContent = (target * eased).toFixed(decimals) + suffix;
              });
              if (t < 1) frame = requestAnimationFrame(step);
            };
            frame = requestAnimationFrame(step);
          });
        },
        { threshold: 0.4 }
      );
      statsObserver.observe(statsHost);
      cleanups.push(() => {
        statsObserver.disconnect();
        cancelAnimationFrame(frame);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
