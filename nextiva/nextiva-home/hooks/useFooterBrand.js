'use client';

import { useEffect } from 'react';

/**
 * Footer: reveals the oversized wordmark and its overlays once they scroll into
 * view, and stamps the current year into the copyright line.
 */
export default function useFooterBrand(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observers = [];
    const timers = [];

    root.querySelectorAll('.footer-giant-brand').forEach((brand) => {
      const targets = [
        brand.querySelector('.footer-giant-text'),
        brand.querySelector('.footer-overlay-left'),
        brand.querySelector('.footer-overlay-right'),
      ].filter(Boolean);

      const observer = new IntersectionObserver(
        (entries, self) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            targets.forEach((el) => el.classList.add('footer-revealed'));
            self.unobserve(entry.target);
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(brand);
      observers.push(observer);
    });

    // First-visit reveal for the footer panel. One class on the shell drives
    // the whole staggered entrance in CSS (36-footer-cinematic.css) — the
    // brand column, each link column, the legal row and the wordmark all key
    // off `.is-revealed` with their own delays.
    //
    // One-shot by design: `unobserve` fires as soon as it lands, so scrolling
    // back up and down again does not replay it. A footer entrance that
    // re-runs every time it re-enters view stops reading as an arrival and
    // starts reading as a glitch.
    // Fail-safe ordering: the hidden pre-state is gated behind `has-reveal`,
    // which only JS ever adds. With no JS, a dead observer or an error higher
    // up, the class is absent and the footer is simply visible — rather than
    // stuck at opacity 0 forever, which is what gating on `:not(.is-revealed)`
    // alone would do.
    const shell = root.querySelector('.ucaas-footer-shell');
    if (shell) {
      const box = shell.getBoundingClientRect();
      const alreadyInView = box.top < window.innerHeight && box.bottom > 0;

      if (alreadyInView) {
        // Mounted with the footer already on screen — usually a reload with
        // the scroll position restored to the bottom. Arm the pre-state, then
        // flip on a short timer so the browser paints the "before" frame and
        // the transition actually runs. Resolving both classes together would
        // skip straight to the finished state, which is why a reload at the
        // footer previously showed no animation at all.
        //
        // A timer rather than double-rAF on purpose: rAF is throttled to a
        // standstill in a background tab, which would strand this mid-state.
        shell.classList.add('has-reveal');
        const kick = setTimeout(() => shell.classList.add('is-revealed'), 60);
        timers.push(kick);
      } else {
        shell.classList.add('has-reveal');
        const revealObserver = new IntersectionObserver(
          (entries, self) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              shell.classList.add('is-revealed');
              self.unobserve(entry.target);
            });
          },
          { threshold: 0.12 }
        );
        revealObserver.observe(shell);
        observers.push(revealObserver);
      }
    }

    const year = String(new Date().getFullYear());
    const yearEl = root.querySelector('#copyrightYear');
    if (yearEl) yearEl.textContent = year;
    root.querySelectorAll('[data-copyright-year]').forEach((el) => {
      el.textContent = year;
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      timers.forEach(clearTimeout);
    };
  }, [rootRef]);
}
