'use client';

import { useEffect } from 'react';

/**
 * Makes the glass AI-receptionist desk mock actually run instead of sitting
 * as a screenshot: the live-call timer ticks every second, the TODAY stats
 * count up now and then with a small pop, and the RECENT ACTIVITY feed keeps
 * receiving events — a new row slides in on top, the oldest drops off.
 *
 * Same lifecycle discipline as useParticleFields: everything pauses when the
 * card is off screen or the tab is hidden, and none of it runs at all under
 * prefers-reduced-motion (a mock that "runs" is exactly the kind of ambient
 * motion that setting asks to be spared).
 *
 * Time labels on the feed are position-based ("now", "4m", "11m") rather
 * than per-event: the content rotates through the slots and the labels stay
 * put, which is indistinguishable from real aging at a glance and avoids
 * every clock-drift edge case.
 */
const EVENTS = [
  ['ri-calendar-check-line', 'Booked a demo for Sarah Lane', 'Booked', 'agx-chip--ok'],
  ['ri-translate-2', 'Answered in French · caller routed', 'Handled', ''],
  ['ri-database-2-line', 'Call notes synced to CRM', 'Synced', ''],
  ['ri-phone-line', 'Answered an after-hours call', 'Handled', ''],
  ['ri-calendar-check-line', 'Rescheduled visit for Marco P.', 'Booked', 'agx-chip--ok'],
  ['ri-mail-send-line', 'Sent a follow-up summary', 'Synced', ''],
  ['ri-user-voice-line', 'Qualified a new inbound lead', 'Handled', ''],
];

const SLOT_TIMES = ['now', '4m', '11m'];

/* What the AI is doing on the phone call, cycled with a quick cross-fade —
   the same storytelling the old status pill did, minus its cramped layout. */
const STATUSES = [
  'AI answering the call',
  'Checking the calendar',
  'Offering Wed · 10:30',
  'AI is booking a meeting',
];

export default function useAgxLive() {
  useEffect(() => {
    const desk = document.querySelector('.agx-desk');
    if (!desk) return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const liveEm = desk.querySelector('.agx-live-txt em');
    const statEls = [...desk.querySelectorAll('.agx-stats span b')];
    const rowsBox = desk.querySelector('.agx-rows');
    const statusEl = document.querySelector('.agx-phone .agx-status');
    if (!liveEm || statEls.length < 3 || !rowsBox) return undefined;

    let timers = [];
    let running = false;
    let callSecs = 42;
    let calls = 128;
    let meetings = 34;
    let nextEvent = 3; // the first three are server-rendered

    const pop = (el) => {
      el.classList.remove('agx-pop');
      void el.offsetWidth; // restart the animation
      el.classList.add('agx-pop');
    };

    const tickTimer = () => {
      callSecs += 1;
      const m = String(Math.floor(callSecs / 60)).padStart(2, '0');
      const s = String(callSecs % 60).padStart(2, '0');
      liveEm.textContent = `Booking a demo · ${m}:${s}`;
    };

    const tickStats = () => {
      calls += 1;
      statEls[0].textContent = String(calls);
      pop(statEls[0]);
      // Every third call also lands a meeting.
      if (calls % 3 === 0) {
        meetings += 1;
        statEls[1].textContent = String(meetings);
        pop(statEls[1]);
      }
    };

    let statusIdx = 0;
    const tickStatus = () => {
      if (!statusEl) return;
      statusIdx = (statusIdx + 1) % STATUSES.length;
      const fade = statusEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' });
      fade.onfinish = () => {
        statusEl.textContent = STATUSES[statusIdx];
        statusEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, fill: 'forwards' });
      };
    };

    const relabelTimes = () => {
      [...rowsBox.children].forEach((row, i) => {
        const em = row.querySelector('em');
        if (em) em.textContent = SLOT_TIMES[i] ?? SLOT_TIMES[SLOT_TIMES.length - 1];
      });
    };

    const tickFeed = () => {
      const [icon, text, chip, chipExtra] = EVENTS[nextEvent % EVENTS.length];
      nextEvent += 1;

      const row = document.createElement('span');
      row.className = 'agx-row-in';
      const i = document.createElement('i');
      i.className = icon;
      const b = document.createElement('b');
      b.className = `agx-chip ${chipExtra}`.trim();
      b.textContent = chip;
      const em = document.createElement('em');
      row.append(i, document.createTextNode(text), b, em);

      // Drop the oldest in the same frame the new one lands, so the desk
      // never changes height.
      if (rowsBox.children.length >= 3) rowsBox.lastElementChild.remove();
      rowsBox.prepend(row);
      relabelTimes();
    };

    const start = () => {
      if (running) return;
      running = true;
      timers.push(setInterval(tickTimer, 1000));
      timers.push(setInterval(tickStats, 7000));
      timers.push(setInterval(tickFeed, 5200));
      timers.push(setInterval(tickStatus, 3400));
    };

    const stop = () => {
      timers.forEach(clearInterval);
      timers = [];
      running = false;
    };

    let onScreen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? false;
        if (document.hidden || !onScreen) stop();
        else start();
      },
      { threshold: 0.15 }
    );
    observer.observe(desk);

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
  }, []);
}
