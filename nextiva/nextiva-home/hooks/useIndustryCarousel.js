'use client';

import { useEffect } from 'react';

/** Makes a scroll container draggable with the mouse, suppressing the drag-click. */
function makeDraggable(track, cleanups) {
  let down = false;
  let dragged = false;
  let originX = 0;
  let originScroll = 0;

  const on = (type, fn, opts) => {
    track.addEventListener(type, fn, opts);
    cleanups.push(() => track.removeEventListener(type, fn, opts));
  };

  on('mousedown', (event) => {
    down = true;
    dragged = false;
    originX = event.pageX - track.offsetLeft;
    originScroll = track.scrollLeft;
  });
  on('mouseleave', () => {
    down = false;
    track.classList.remove('dragging');
  });
  on('mouseup', () => {
    down = false;
    track.classList.remove('dragging');
  });
  on('mousemove', (event) => {
    if (!down) return;
    if (!dragged) {
      dragged = true;
      track.classList.add('dragging');
    }
    event.preventDefault();
    track.scrollLeft = originScroll - (event.pageX - track.offsetLeft - originX) * 1.5;
  });
  on(
    'click',
    (event) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
    },
    true
  );
}

/**
 * Wires a horizontal card rail: prev/next buttons that step one card at a time,
 * disabled states at either end, and mouse dragging.
 */
function wireRail(track, prev, next, cardSelector, cleanups) {
  const step = () => {
    const card = track.querySelector(cardSelector);
    return card ? card.offsetWidth + 16 : 336;
  };

  const on = (el, type, fn) => {
    if (!el) return;
    el.addEventListener(type, fn);
    cleanups.push(() => el.removeEventListener(type, fn));
  };

  on(prev, 'click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  on(next, 'click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

  const syncButtons = () => {
    if (prev) prev.disabled = track.scrollLeft <= 0;
    if (next) next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 10;
  };
  on(track, 'scroll', syncButtons);
  syncButtons();

  makeDraggable(track, cleanups);
}

export default function useIndustryCarousel(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups = [];

    root.querySelectorAll('.industry-proof-carousel').forEach((track) => {
      const prevId = track.dataset.prevBtn;
      const nextId = track.dataset.nextBtn;
      wireRail(
        track,
        prevId ? document.getElementById(prevId) : null,
        nextId ? document.getElementById(nextId) : null,
        '.industry-proof-card',
        cleanups
      );
    });

    root.querySelectorAll('.platform-stats-section').forEach((section) => {
      const track = section.querySelector('.platform-stats-carousel');
      if (!track) return;
      wireRail(
        track,
        section.querySelector('.platform-stats-nav-btn[data-dir="prev"]'),
        section.querySelector('.platform-stats-nav-btn[data-dir="next"]'),
        '.platform-stat-card',
        cleanups
      );
    });

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
