'use client';

import { useEffect } from 'react';
import { enableDragScroll, suppressDragClicks } from './dragScroll';

const FALLBACK_STEP = 336;

/**
 * The testimonial grid: a "show all" toggle that expands the card list, and a
 * stat carousel that can be dragged, stepped with its arrows, or scrolled — the
 * arrows disable at each end.
 */
export default function useSocialProofGrid(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups = [];
    const on = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    // --- show all -------------------------------------------------------------
    const cards = root.querySelector('.social-proof-grid-cards');
    root.querySelectorAll('.social-proof-grid-show-all').forEach((button) => {
      if (!cards) return;
      on(button, 'click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        cards.classList.toggle('expanded', !expanded);
        // Collapsing from the bottom of a long list would strand the viewport
        // below the section, so scroll back to its top.
        if (expanded) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // --- stat carousel --------------------------------------------------------
    const track = root.querySelector('.platform-stats-carousel');
    if (track) {
      const prev = root.querySelector('.platform-stats-prev');
      const next = root.querySelector('.platform-stats-next');
      const step = () => {
        const card = track.querySelector('.platform-stat-card');
        return card ? card.offsetWidth + 16 : FALLBACK_STEP;
      };

      if (prev) on(prev, 'click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
      if (next) on(next, 'click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

      const syncArrows = () => {
        if (prev) prev.disabled = track.scrollLeft <= 0;
        if (next) next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 10;
      };
      on(track, 'scroll', syncArrows);
      syncArrows();

      cleanups.push(enableDragScroll(track));
      cleanups.push(suppressDragClicks(track));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
