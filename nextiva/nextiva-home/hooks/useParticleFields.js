'use client';

import { useEffect } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;
/* useScrollPerf marks <html> while the page scrolls; fields skip spawning then
   so new motes never land on scroll frames. */
const isScrolling = () => document.documentElement.classList.contains('is-scrolling');
const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Shared lifecycle for every field: run only while the container is on screen
 * and the tab is visible. `start`/`stop` are the field's own spawn controls.
 */
function observeField(container, start, stop) {
  let onScreen = false;

  const observer = new IntersectionObserver(
    (entries) => {
      onScreen = entries[0]?.isIntersecting ?? false;
      if (document.hidden || !onScreen) stop();
      else start();
    },
    { threshold: 0.1 }
  );
  observer.observe(container);

  const onVisibility = () => {
    if (document.hidden) stop();
    else if (onScreen) start();
  };
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    stop();
  };
}

/**
 * Drifting motes — the effect over the hero and the mid-page band. Each mote is
 * a `.particle` span animated with the Web Animations API and removed when it
 * finishes.
 */
function floatingField(container) {
  let timers = [];
  let running = false;
  let size = null;

  const measure = () => {
    const box = container.getBoundingClientRect();
    size = { width: box.width, height: box.height };
  };
  const onResize = () => running && measure();
  window.addEventListener('resize', onResize);

  const spawn = () => {
    if (isScrolling()) return;
    if (!size) measure();
    const mote = document.createElement('span');
    mote.className = 'particle';
    mote.style.left = `${rand(0, size.width)}px`;
    mote.style.top = `${rand(0, size.height)}px`;

    const width = rand(2, 4);
    mote.style.width = `${width}px`;
    mote.style.height = `${width * 1.5}px`;

    // Roughly a third are bright and glowing; the rest are deep blue.
    const bright = Math.random() < 0.3;
    const r = bright ? Math.round(180 + 75 * Math.random()) : Math.round(20 * Math.random());
    const g = bright ? Math.round(200 + 55 * Math.random()) : Math.round(90 + 30 * Math.random());
    const b = bright ? 255 : Math.round(230 + 25 * Math.random());
    mote.style.background = `rgba(${r}, ${g}, ${b}, 1)`;
    if (bright) mote.style.boxShadow = '0 0 6px rgba(255, 255, 255, 0.8)';

    container.appendChild(mote);

    mote.animate(
      [
        { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)', opacity: 1 },
        {
          transform: `translate3d(${rand(60, 180)}px, ${rand(-120, -40)}px, 0) rotate(${rand(-360, 360)}deg) scale(${rand(0.6, 1.2)})`,
          opacity: 0.3,
        },
      ],
      { duration: rand(2500, 4000), easing: 'linear', fill: 'forwards' }
    ).onfinish = () => mote.remove();
  };

  const start = () => {
    if (running || prefersReducedMotion()) return;
    measure();
    running = true;
    timers.push(
      setInterval(() => {
        const batch = Math.round(rand(0.7 * 5, 1.3 * 5));
        for (let i = 0; i < batch; i++) spawn();
      }, 200)
    );
  };

  const stop = () => {
    timers.forEach(clearInterval);
    timers = [];
    running = false;
    size = null;
    container.querySelectorAll('.particle').forEach((el) => el.remove());
  };

  const detach = observeField(container, start, stop);
  return () => {
    window.removeEventListener('resize', onResize);
    detach();
  };
}

/**
 * Falling snow — white flakes drifting down across the hero, each swaying
 * sideways on the way. Same `.particle`-style lifecycle as `floatingField`:
 * a `.snowflake` span per flake, animated with the Web Animations API and
 * removed on finish.
 */
function snowField(container) {
  let timer = null;
  let running = false;
  let size = null;

  const measure = () => {
    const box = container.getBoundingClientRect();
    size = { width: box.width, height: box.height };
  };
  const onResize = () => running && measure();
  window.addEventListener('resize', onResize);

  // `seeded` flakes start partway down so the hero isn't empty on load.
  const spawn = (seeded = false) => {
    if (!seeded && isScrolling()) return;
    if (!size) measure();
    const flake = document.createElement('span');
    flake.className = 'snowflake';

    const width = rand(2, 6);
    const startX = rand(0, size.width);
    const startY = seeded ? rand(0, size.height) : rand(-40, -10);
    const fall = size.height - startY + 40;
    const sway = rand(30, 90) * (Math.random() < 0.5 ? -1 : 1);
    const opacity = rand(0.45, 0.95);

    flake.style.width = `${width}px`;
    flake.style.height = `${width}px`;
    flake.style.left = `${startX}px`;
    flake.style.top = `${startY}px`;
    flake.style.opacity = opacity;

    container.appendChild(flake);

    flake.animate(
      [
        { transform: 'translate3d(0, 0, 0)', opacity: 0 },
        { transform: `translate3d(${sway * 0.5}px, ${fall * 0.25}px, 0)`, opacity, offset: 0.25 },
        { transform: `translate3d(${sway}px, ${fall * 0.75}px, 0)`, opacity, offset: 0.75 },
        { transform: `translate3d(${sway * 0.7}px, ${fall}px, 0)`, opacity: 0 },
      ],
      // Bigger flakes read as closer, so they fall faster.
      { duration: (fall / rand(45, 90)) * 1000, easing: 'linear', fill: 'forwards' }
    ).onfinish = () => flake.remove();
  };

  const start = () => {
    if (running || prefersReducedMotion()) return;
    measure();
    running = true;
    for (let i = 0; i < 45; i++) spawn(true);
    timer = setInterval(() => {
      const batch = Math.round(rand(2, 4));
      for (let i = 0; i < batch; i++) spawn();
    }, 320);
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
    running = false;
    size = null;
    container.querySelectorAll('.snowflake').forEach((el) => el.remove());
  };

  const detach = observeField(container, start, stop);
  return () => {
    window.removeEventListener('resize', onResize);
    detach();
  };
}

/**
 * Warm embers. `variant` picks the two presets the theme ships: `enterprise`
 * drifts right from the left edge, `founder` drifts left from the right edge
 * and seeds a staggered burst on start.
 */
function dustField(container, variant) {
  const preset =
    variant === 'founder'
      ? { xFrom: 0.5, xTo: 1, yFrom: 0.4, size: [2, 4], hue: [5, 35], sat: [95, 100], light: [55, 70],
          opacity: [0.7, 1], glow: 5, driftX: [-280, -100], driftY: [-220, -80], life: [1800, 4000],
          interval: 180, burst: 10 }
      : { xFrom: 0, xTo: 0.7, yFrom: 0.1, size: [2, 5], hue: [15, 45], sat: [90, 100], light: [55, 75],
          opacity: [0.6, 1], glow: 3, driftX: [100, 280], driftY: [-200, -80], life: [1500, 3500],
          interval: 150, burst: 0 };

  // `.dust-particles--calm` keeps the preset's direction and palette but takes
  // the aggression out of it: motes arrive far less often, travel about half
  // the distance, and sit dimmer and smaller - but keep enough pace to read as
  // movement rather than a static speckle. Used where
  // the field is behind body copy and should read as barely-there atmosphere
  // rather than an effect competing with the text.
  if (container.classList.contains('dust-particles--calm')) {
    const ease = ([lo, hi], f) => [lo * f, hi * f];
    Object.assign(preset, {
      size: [1.5, 3.2],
      opacity: [0.3, 0.6],
      glow: 2,
      driftX: ease(preset.driftX, 0.55),
      driftY: ease(preset.driftY, 0.55),
      life: [3200, 5600],
      // Density is set here, independently of speed: the field settles at
      // roughly (avg batch / interval) * avg life motes, so batch 2-4 every
      // 600ms over a 4.4s life holds about twenty per card. Speed lives in
      // driftX/driftY and life, so the two can be tuned without fighting.
      batch: [2, 4],
      interval: 600,
      burst: 0,
    });
  }

  // `.dust-particles--lively` is the opposite modifier: same direction and
  // palette, but motes arrive thick and travel fast. The founder preset spawns
  // one per tick via the burst path, which caps it around sixteen; switching to
  // the batch path with a short interval is what actually raises the count.
  // Settles near (avg batch / interval) * avg life = (1.5 / .15) * 2.2 = ~22,
  // against ~16 before, at roughly double the speed.
  if (container.classList.contains('dust-particles--lively')) {
    const scale = ([lo, hi], f) => [lo * f, hi * f];
    Object.assign(preset, {
      size: [2, 5],
      opacity: [0.75, 1],
      glow: 6,
      driftX: scale(preset.driftX, 1.4),
      driftY: scale(preset.driftY, 1.4),
      life: [1400, 3000],
      batch: [1, 2],
      interval: 150,
      burst: 0,
    });
  }

  let timer = null;
  let running = false;
  let pending = [];
  // Measured on start and resize, not per mote: reading layout on every spawn
  // forced a synchronous layout several times a second, mid-scroll included.
  let box = null;
  const measure = () => { box = container.getBoundingClientRect(); };
  const onResize = () => running && measure();
  window.addEventListener('resize', onResize);

  const spawn = () => {
    if (isScrolling()) return;
    if (!box) measure();
    const mote = document.createElement('span');
    mote.className = 'dust-particle';
    mote.style.left = `${rand(preset.xFrom * box.width, preset.xTo * box.width)}px`;
    mote.style.top = `${rand(preset.yFrom * box.height, box.height)}px`;

    const size = rand(...preset.size);
    mote.style.width = `${size}px`;
    mote.style.height = `${size}px`;

    const hue = rand(...preset.hue);
    const sat = rand(...preset.sat);
    const light = rand(...preset.light);
    mote.style.background = `hsl(${hue}, ${sat}%, ${light}%)`;
    mote.style.boxShadow = `0 0 ${size + preset.glow}px hsla(${hue}, ${sat}%, ${light}%, ${variant === 'founder' ? 0.9 : 0.8})`;

    const life = rand(...preset.life);
    mote.style.setProperty('--drift-x', `${rand(...preset.driftX)}px`);
    mote.style.setProperty('--drift-y', `${rand(...preset.driftY)}px`);
    mote.style.setProperty('--duration', `${life}ms`);
    mote.style.setProperty('--max-opacity', rand(...preset.opacity));

    container.appendChild(mote);
    pending.push(setTimeout(() => mote.remove(), life));
  };

  const start = () => {
    if (running || prefersReducedMotion()) return;
    running = true;
    measure();
    for (let i = 0; i < preset.burst; i++) pending.push(setTimeout(spawn, 120 * i));
    timer = setInterval(() => {
      if (preset.burst) return spawn();
      const batch = Math.floor(rand(...(preset.batch || [2, 5])));
      for (let i = 0; i < batch; i++) spawn();
    }, preset.interval);
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
    running = false;
    pending.forEach(clearTimeout);
    pending = [];
    // Those timeouts were what removed the motes, so clearing them alone left
    // every live mote orphaned in the DOM. Scrolling the field out and back
    // then stacked a fresh population on top of the frozen one - the field
    // read at double density and grew over a long session. Clear them here so
    // the count is determined by the preset, not by scroll history.
    container.querySelectorAll('.dust-particle').forEach((mote) => mote.remove());
    box = null;
  };

  const detach = observeField(container, start, stop);
  return () => {
    window.removeEventListener('resize', onResize);
    detach();
  };
}

/**
 * Starts every particle field on the page. Mirrors how the theme wired these
 * up: by id first, then any remaining containers matched by class.
 */
export default function useParticleFields() {
  useEffect(() => {
    // Attach every field once on mount.
    const stops = [];
    const claimed = new Set();

    const attach = (el, fn) => {
      if (!el || claimed.has(el)) return;
      claimed.add(el);
      stops.push(fn(el));
    };

    // Any field opts into snow with a class; everything else drifts. The hero
    // keeps its original `.hero-particles--snow` spelling, and `.particles--snow`
    // is the general one — the choice used to be hard-wired to the hero element,
    // so no other section could ask for snow.
    const wantsSnow = (el) =>
      el?.classList.contains('hero-particles--snow') || el?.classList.contains('particles--snow');
    const fieldFor = (el) => (wantsSnow(el) ? snowField : floatingField);

    const hero = document.getElementById('heroFloatingParticles');
    attach(hero, fieldFor(hero));
    const spotlight = document.getElementById('floatingParticles');
    attach(spotlight, fieldFor(spotlight));
    document.querySelectorAll('.floating-particles').forEach((el) => attach(el, fieldFor(el)));

    attach(document.getElementById('dustParticlesEnterprise'), (el) => dustField(el, 'enterprise'));
    attach(document.getElementById('dustParticlesFounder'), (el) => dustField(el, 'founder'));
    document
      .querySelectorAll('.dust-particles--founder')
      .forEach((el) => attach(el, (node) => dustField(node, 'founder')));
    document
      .querySelectorAll('.dust-particles:not(.dust-particles--founder):not(.dust-particles--blue)')
      .forEach((el) => attach(el, (node) => dustField(node, 'enterprise')));

    return () => stops.forEach((fn) => fn && fn());
  }, []);
}
