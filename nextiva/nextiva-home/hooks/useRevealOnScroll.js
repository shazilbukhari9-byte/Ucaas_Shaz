'use client';

import { useEffect } from 'react';

const PAUSABLE = [
  '.design-v2 .section-hero',
  '.design-v2 .section-logo-trust-bar',
  '.design-v2 .section-tabbed-trust-showcase',
].join(', ');

/**
 * Page-wide scroll effects.
 *
 * 1. `.reveal` elements gain `revealed` as they enter the viewport (immediately
 *    when the visitor prefers reduced motion).
 * 2. Heavy CSS animations are paused while their section is offscreen or the
 *    tab is hidden, via the `animations-paused` class the stylesheets look for.
 */
export default function useRevealOnScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealObserver = reduced
      ? null
      : new IntersectionObserver(
          /* Applied straight away rather than inside requestAnimationFrame:
             rAF does not run while the page is hidden (background tab, or a
             browser that is not compositing), which left every `.reveal`
             element stuck at opacity 0 until the tab was focused. */
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px 20px 0px' }
        );

    /* Collect targets on every sweep rather than once. A single pass at mount
       can miss elements that are not in the DOM yet — streamed markup, or a
       Fast Refresh that remounts this hook before the blocks re-render — and
       anything missed stays at opacity 0 forever, which is what happened to
       the testimonial cards. Sweeps are idempotent: already-revealed nodes are
       filtered out and re-observing a node is a no-op. */
    const sweep = () => {
      const targets = document.querySelectorAll('.reveal:not(.revealed)');
      if (reduced) {
        targets.forEach((el) => el.classList.add('revealed'));
        return;
      }
      targets.forEach((el) => revealObserver.observe(el));
    };

    sweep();
    const sweepFrame = requestAnimationFrame(sweep);
    window.addEventListener('load', sweep);

    /* Nodes can also appear long after mount — a tab panel rendering, or a hot
       reload swapping a block out without remounting this hook. Watch the tree
       so those get observed too, instead of sitting at opacity 0 forever. */
    const treeObserver = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.classList?.contains('reveal') || node.querySelector?.('.reveal')) {
            sweep();
            return;
          }
        }
      }
    });
    treeObserver.observe(document.body, { childList: true, subtree: true });

    // --- animation pausing ---------------------------------------------------
    const sections = document.querySelectorAll(PAUSABLE);
    sections.forEach((el) => el.classList.add('animations-paused'));

    const pauseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('animations-paused', !entry.isIntersecting);
        });
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0 }
    );
    sections.forEach((el) => pauseObserver.observe(el));

    const onVisibility = () => {
      sections.forEach((el) => {
        if (document.hidden) {
          el.classList.add('animations-paused');
          return;
        }
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight + 100 && box.bottom > -100) {
          el.classList.remove('animations-paused');
        }
      });
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(sweepFrame);
      window.removeEventListener('load', sweep);
      treeObserver.disconnect();
      revealObserver?.disconnect();
      pauseObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
}
