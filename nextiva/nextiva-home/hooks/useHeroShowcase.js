'use client';

import { useEffect } from 'react';

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Animates `el`'s text content from its current value to `to`. */
function countTo(el, to, duration, format = (n) => String(n)) {
  const from = parseInt(String(el.textContent).replace(/[^0-9]/g, ''), 10) || 0;
  const start = performance.now();
  let frame;
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = format(Math.round(from + (to - from) * easeOutQuart(progress)));
    if (progress < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

/**
 * Hero showcase behaviour that sits outside the call panel: the review counter,
 * the live "AI Resolutions" tiles, and their Today / 30 Days toggle.
 *
 * The call transcript and the chat thread are real components — see
 * components/hero/CallPanel.jsx and components/hero/HeroChatThread.jsx.
 */
export default function useHeroShowcase(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const disposers = [];

    // --- review count ---------------------------------------------------------
    const rating = root.querySelector('.rating-number');
    if (rating) {
      const target = parseInt(rating.textContent.replace(/[^0-9]/g, ''), 10) || 20000;
      const start = performance.now();
      let frame;
      const step = (now) => {
        const progress = Math.min((now - start) / 2000, 1);
        rating.textContent = Math.round(easeInOutCubic(progress) * target).toLocaleString('en-US');
        if (progress < 1) frame = requestAnimationFrame(step);
        else rating.textContent = target.toLocaleString('en-US');
      };
      frame = requestAnimationFrame(step);
      disposers.push(() => cancelAnimationFrame(frame));
    }

    // --- live stat tiles ------------------------------------------------------
    const tiles = {
      calls: root.querySelector('#statCalls'),
      appointments: root.querySelector('#statAppointments'),
      questions: root.querySelector('#statQuestions'),
      sentiment: root.querySelector('#statSentiment'),
    };

    if (tiles.calls) {
      // Read off the markup rather than repeating the figures here. They were
      // hardcoded as well as sitting in data-today, so editing the copy moved
      // the labels but left the old numbers counting up underneath them — and
      // the Today/30 Days toggle, which already reads the dataset, disagreed
      // with the opening animation.
      const readTile = (el, fallback) => {
        const value = parseInt(el?.dataset.today, 10);
        return Number.isFinite(value) ? value : fallback;
      };
      const values = {
        calls: readTile(tiles.calls, 0),
        appointments: readTile(tiles.appointments, 0),
        questions: readTile(tiles.questions, 0),
        sentiment: readTile(tiles.sentiment, 0),
      };
      const start = performance.now();
      let frame;
      let ticker;

      const bump = (el, value) => {
        el.style.transform = 'scale(1.1)';
        el.style.color = '#3b82f6';
        el.textContent = value;
        setTimeout(() => {
          el.style.transform = 'scale(1)';
          el.style.color = '#1a1a1a';
        }, 300);
      };

      const step = (now) => {
        const progress = Math.min((now - start) / 2500, 1);
        const eased = easeOutQuart(progress);
        tiles.calls.textContent = Math.round(eased * values.calls);
        tiles.appointments.textContent = Math.round(eased * values.appointments);
        tiles.questions.textContent = Math.round(eased * values.questions);
        tiles.sentiment.textContent = Math.round(eased * values.sentiment);
        if (progress < 1) {
          frame = requestAnimationFrame(step);
          return;
        }
        // Then drift upward the way a live dashboard would.
        ticker = setInterval(() => {
          const roll = Math.random();
          if (roll < 0.3) bump(tiles.calls, ++values.calls);
          else if (roll < 0.5) bump(tiles.questions, ++values.questions);
          else if (roll < 0.6) bump(tiles.appointments, ++values.appointments);
        }, 4000);
      };

      frame = requestAnimationFrame(step);
      disposers.push(() => {
        cancelAnimationFrame(frame);
        clearInterval(ticker);
      });
    }

    // --- Today / 30 Days toggle ----------------------------------------------
    const toggle = root.querySelector('#statsTimeToggle');
    if (toggle && tiles.calls) {
      const label = toggle.querySelector('.stats-time-label');
      const onClick = () => {
        const period = toggle.dataset.period === 'today' ? 'monthly' : 'today';
        toggle.dataset.period = period;
        if (label) label.textContent = period === 'today' ? 'Today' : '30 Days';
        Object.values(tiles).forEach((el) => {
          if (!el) return;
          const next = parseInt(el.dataset[period], 10);
          if (Number.isFinite(next)) disposers.push(countTo(el, next, 800));
        });
      };
      toggle.addEventListener('click', onClick);
      disposers.push(() => toggle.removeEventListener('click', onClick));
    }

    // --- dashboard fit ---------------------------------------------------------
    // The app window is authored at a fixed 1080px. Scale it down when the
    // showcase column is narrower so the Customer Info panel never gets cut off.
    const appWindow = root.querySelector('.hero-showcase .desktop-app-window');
    if (appWindow) {
      const DESIGN_WIDTH = 1080;
      const fitApp = () => {
        const column = appWindow.closest('.hero-showcase');
        if (!column) return;
        const available = column.clientWidth;
        if (!available) return;
        const scale = Math.min(1, available / DESIGN_WIDTH);
        appWindow.style.setProperty('--hero-app-scale', scale.toFixed(4));
        // The window is only shrunk visually, so its layout box stays full
        // height. Publish the drawn height so the column can size to it
        // instead of reserving the unscaled 720px.
        column.style.setProperty('--hero-app-h', `${Math.round(appWindow.offsetHeight * scale)}px`);
      };
      fitApp();
      const appObserver = new ResizeObserver(fitApp);
      const column = appWindow.closest('.hero-showcase');
      if (column) appObserver.observe(column);
      window.addEventListener('resize', fitApp);
      disposers.push(() => {
        appObserver.disconnect();
        window.removeEventListener('resize', fitApp);
      });
    }

    return () => disposers.forEach((fn) => fn());
  }, [rootRef]);
}
