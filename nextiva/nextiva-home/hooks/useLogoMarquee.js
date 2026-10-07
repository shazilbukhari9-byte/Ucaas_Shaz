'use client';

import { useEffect } from 'react';

/** Constant drift speed, so a longer set does not simply scroll faster. */
const PX_PER_SECOND = 42;

/**
 * The customer-logo marquee. The markup holds the logo set twice; the track
 * slides left by exactly one set and restarts, which is seamless because the
 * second set is then sitting where the first began.
 *
 * "One set" is measured, not estimated: the logos have different widths
 * (Taco Bell 65px, Hyundai 150px…), so the distance is the offset between the
 * first logo and the first logo of the second set — which includes every
 * width and every gap. The earlier estimate (count × first logo's width) was
 * hundreds of pixels short, so the track snapped back early and left an empty
 * stretch after the last logo.
 *
 * On screens wider than one set, extra copies are appended so the strip is
 * never seen to run out. Every copy after the first is hidden from assistive
 * tech so the logos are announced once.
 */
export default function useLogoMarquee(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const track = root.querySelector('.logo-marquee-track');
    const container = root.querySelector('.logo-marquee-container') || track?.parentElement;
    if (!track || !container) return;

    const original = Array.from(track.querySelectorAll('.logo-item'));
    const setSize = original.length / 2;
    if (!setSize) return;

    original.slice(setSize).forEach((el) => el.setAttribute('aria-hidden', 'true'));
    const firstSet = original.slice(0, setSize);
    const added = [];

    const style = document.createElement('style');
    document.head.appendChild(style);

    const build = () => {
      const logos = track.querySelectorAll('.logo-item');
      // offsetLeft ignores the running transform, so this is a stable read.
      const distance = logos[setSize].offsetLeft - logos[0].offsetLeft;
      if (!distance) return;

      // Enough copies that the visible window is always filled while the
      // track travels one set: total track ≥ window + one set. The window is
      // capped at the viewport — on phones the container stretches to the
      // track's own width, which would otherwise keep asking for more.
      const visible = Math.min(container.clientWidth, window.innerWidth);
      const needed = Math.max(2, Math.ceil((visible + distance) / distance));
      let copies = track.querySelectorAll('.logo-item').length / setSize;
      while (copies < needed) {
        firstSet.forEach((el) => {
          const clone = el.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          track.appendChild(clone);
          added.push(clone);
        });
        copies += 1;
      }

      style.textContent = `
        @keyframes marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-${distance}px, 0, 0); }
        }
      `;
      track.style.animationDuration = `${(distance / PX_PER_SECOND).toFixed(2)}s`;
    };

    build();

    // The set's width changes at breakpoints (the gap drops from 4rem to
    // 2rem) and once lazy logos finish loading, so re-measure whenever the
    // section resizes or the page finishes loading.
    let debounce;
    const rebuild = () => {
      clearTimeout(debounce);
      debounce = setTimeout(build, 150);
    };
    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(root);
    window.addEventListener('resize', rebuild);
    window.addEventListener('load', rebuild);

    return () => {
      clearTimeout(debounce);
      resizeObserver.disconnect();
      window.removeEventListener('resize', rebuild);
      window.removeEventListener('load', rebuild);
      style.remove();
      added.forEach((el) => el.remove());
      track.style.animationDuration = '';
    };
  }, [rootRef]);
}
