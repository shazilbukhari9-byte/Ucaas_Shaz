'use client';

import { useEffect } from 'react';

/**
 * The three showcase cards each run the same pattern: when the card scrolls
 * into view an overlay activates and a list of items advances one at a time,
 * marking earlier items complete, then loops.
 */
const SEQUENCES = [
  { cardId: 'aiEmployeeCard', overlay: '.ai-scan-overlay', items: '.task-dial-item', startDelay: 800, interval: 1500, restDelay: 800, reducedIndex: 2 },
  { cardId: 'teamFocusCard', overlay: '.team-benefits-overlay', items: '.benefit-item', startDelay: 600, interval: 1800, restDelay: 1000, reducedIndex: 1 },
  // This one only fades its overlay in and out — there is no item sequence.
  { cardId: 'unifiedPlatformCard', overlay: '.constellation-overlay', items: null },
];

function runSequence(root, config) {
  const card = root.querySelector(`#${config.cardId}`);
  if (!card) return () => {};

  const overlay = card.querySelector(config.overlay);
  if (!overlay) return () => {};
  const items = config.items ? card.querySelectorAll(config.items) : [];
  if (config.items && !items.length) return () => {};

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let running = false;
  let interval = null;
  let startTimer = null;
  let restTimer = null;
  let cursor = 0;

  const reset = () => {
    items.forEach((el) => el.classList.remove('active', 'completed'));
    cursor = 0;
  };

  const advance = () => {
    if (!running) return;
    items.forEach((el, index) => {
      el.classList.toggle('completed', index < cursor);
      el.classList.toggle('active', index === cursor);
    });
    cursor += 1;
    if (cursor > items.length) {
      restTimer = setTimeout(() => running && reset(), config.restDelay);
    }
  };

  const start = () => {
    if (running) return;
    running = true;
    cursor = 0;
    overlay.classList.add('active');
    if (!items.length) return;
    if (reducedMotion) {
      items[config.reducedIndex]?.classList.add('active');
      return;
    }
    startTimer = setTimeout(() => {
      if (!running) return;
      advance();
      interval = setInterval(advance, config.interval);
    }, config.startDelay);
  };

  const stop = () => {
    if (!running) return;
    running = false;
    clearInterval(interval);
    clearTimeout(startTimer);
    clearTimeout(restTimer);
    interval = null;
    overlay.classList.remove('active');
    reset();
  };

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => (entry.isIntersecting ? start() : stop())),
    { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
  );
  observer.observe(card);

  const onVisibility = () => {
    if (document.hidden) return stop();
    const box = card.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) start();
  };
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    stop();
  };
}

export default function useSplitShowcase(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stops = SEQUENCES.map((config) => runSequence(root, config));
    return () => stops.forEach((fn) => fn());
  }, [rootRef]);
}
