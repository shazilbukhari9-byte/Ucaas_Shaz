'use client';

import { useEffect } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

/**
 * The highlight cards' two decorative effects.
 *
 * The sparkle stars exist in the markup but are stacked at 0,0 until they are
 * scattered here. The blue dust is spawned entirely from script — the CSS
 * animates `.dust-particle`, nothing renders it — so the field stays empty
 * until this runs, and pauses whenever the section is offscreen or the tab is
 * hidden rather than burning frames in the background.
 */
export default function useHighlightCards(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll('.sparkle-stars .sparkle-star').forEach((star) => {
      star.style.top = `${Math.random() * 40}%`;
      star.style.left = `${Math.random() * 100}%`;
    });

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const observers = [];
    const stops = [];

    root.querySelectorAll('.dust-particles--blue').forEach((field) => {
      let timer = null;
      let running = false;
      let onScreen = false;

      const spawn = () => {
        const box = field.getBoundingClientRect();
        const particle = document.createElement('span');
        particle.className = 'dust-particle';

        particle.style.left = `${rand(0, box.width * 0.7)}px`;
        particle.style.top = `${rand(box.height * 0.1, box.height)}px`;

        const size = rand(2, 5);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const hue = rand(200, 220);
        const sat = rand(80, 100);
        const light = rand(55, 75);
        particle.style.background = `hsl(${hue}, ${sat}%, ${light}%)`;
        particle.style.boxShadow = `0 0 ${size + 3}px hsla(${hue}, ${sat}%, ${light}%, 0.8)`;

        const life = rand(1500, 3500);
        particle.style.setProperty('--drift-x', `${rand(100, 280)}px`);
        particle.style.setProperty('--drift-y', `${rand(-200, -80)}px`);
        particle.style.setProperty('--duration', `${life}ms`);
        particle.style.setProperty('--max-opacity', rand(0.6, 1));

        field.appendChild(particle);
        setTimeout(() => particle.remove(), life);
      };

      const start = () => {
        if (running || reduced) return;
        running = true;
        timer = setInterval(() => {
          const burst = Math.floor(rand(2, 5));
          for (let i = 0; i < burst; i++) spawn();
        }, 150);
      };
      const stop = () => {
        if (timer) clearInterval(timer);
        timer = null;
        running = false;
      };
      stops.push(stop);

      const observer = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0]?.isIntersecting ?? false;
          if (document.hidden || !onScreen) stop();
          else start();
        },
        { threshold: 0.1 }
      );
      observer.observe(field);
      observers.push(observer);

      const onVisibility = () => {
        if (document.hidden) stop();
        else if (onScreen) start();
      };
      document.addEventListener('visibilitychange', onVisibility);
      stops.push(() => document.removeEventListener('visibilitychange', onVisibility));
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      stops.forEach((fn) => fn());
    };
  }, [rootRef]);
}
