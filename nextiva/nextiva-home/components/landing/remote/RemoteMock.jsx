'use client';
/* Working hero mockup for the Remote & Hybrid Teams page: one business
   number on five devices. An incoming call rings them all; answer on any
   device, then tap another device to flip the live call to it — the timer
   keeps running and each hop is logged. End the call to see the summary. */
import { useEffect, useRef, useState } from 'react';

const DEVICES = [
  { id: 'phone', label: 'iPhone', icon: 'ri-smartphone-line' },
  { id: 'mac', label: 'MacBook', icon: 'ri-macbook-line' },
  { id: 'ipad', label: 'iPad', icon: 'ri-tablet-line' },
  { id: 'win', label: 'Windows', icon: 'ri-windows-line' },
  { id: 'web', label: 'Browser', icon: 'ri-global-line' },
];
const FLIP_MS = 450;
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const label = (id) => DEVICES.find((d) => d.id === id).label;

export default function RemoteMock({ page }) {
  const [state, setState] = useState('ringing'); // ringing | live | flipping | ended
  const [on, setOn] = useState(null);
  const [target, setTarget] = useState(null);
  const [secs, setSecs] = useState(0);
  const [hops, setHops] = useState([]);
  const [flips, setFlips] = useState(0); // total flips; the log only keeps the last few
  const timers = useRef([]);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const live = state === 'live' || state === 'flipping';
  useEffect(() => {
    if (!live) return undefined;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [live]);

  const answer = (id) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setOn(id); setState('live'); setFlips(0); setHops([{ id: 'a', text: `Answered on ${label(id)}` }]);
  };

  // If nobody answers, the iPhone picks up after a moment so the demo moves.
  useEffect(() => {
    if (state !== 'ringing') return undefined;
    const id = setTimeout(() => answer('phone'), 2600);
    return () => clearTimeout(id);
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (id) => {
    if (state === 'ringing') return answer(id);
    if (state !== 'live' || id === on) return undefined;
    setTarget(id); setState('flipping');
    later(() => {
      setHops((h) => [...h.slice(-2), { id: `${Date.now()}`, text: `${label(on)} → ${label(id)} · 0.4s` }]);
      setFlips((n) => n + 1);
      setOn(id); setTarget(null); setState('live');
    }, FLIP_MS);
    return undefined;
  };

  const end = () => { setState('ended'); setTarget(null); };
  const restart = () => { setState('ringing'); setOn(null); setSecs(0); setHops([]); setFlips(0); };

  return (
    <div className="rmm" role="region" aria-label="One number on every device — interactive demo">
      <div className="rmm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="rmm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          +1 (415) 555-0123
        </span>
        <span className="rmm-same">Same number · 5 devices</span>
      </div>

      <div className={`rmm-call rmm-call--${state}`} aria-live="polite">
        <span className="rmm-av">KB</span>
        <span className="rmm-who">
          <b>Karen Brooks</b>
          <em>
            {state === 'ringing' && 'Incoming · ringing every device'}
            {state === 'live' && `On call · ${label(on)}`}
            {state === 'flipping' && `Flipping to ${label(target)}…`}
            {state === 'ended' && `Call ended · ${flips} device ${flips === 1 ? 'hop' : 'hops'}`}
          </em>
        </span>
        <span className="rmm-time">{state === 'ringing' ? <i className="ri-phone-fill rmm-ring" aria-hidden="true"></i> : mmss(secs)}</span>
      </div>

      <div className="rmm-devs" role="group" aria-label="Devices">
        {DEVICES.map((d) => {
          const isOn = live && on === d.id;
          const isTarget = state === 'flipping' && target === d.id;
          const ringing = state === 'ringing';
          return (
            <button
              key={d.id}
              type="button"
              className={`rmm-dev${isOn ? ' is-on' : ''}${isTarget ? ' is-target' : ''}${ringing ? ' is-ringing' : ''}`}
              onClick={() => tap(d.id)}
              disabled={state === 'ended' || state === 'flipping'}
              aria-pressed={isOn}
            >
              <i className={d.icon} aria-hidden="true"></i>
              <b>{d.label}</b>
              <em>{ringing ? 'Ringing' : isOn ? 'On call' : isTarget ? 'Flipping…' : state === 'ended' ? 'Signed in' : 'Tap to flip'}</em>
            </button>
          );
        })}
      </div>

      <div className="rmm-foot">
        <ol className="rmm-hops" aria-label="Device hops">
          {hops.length === 0 && <li className="rmm-hop-wait">Answer on any device — or wait, the iPhone will pick up.</li>}
          {hops.map((h) => <li key={h.id}><i className="ri-swap-line" aria-hidden="true"></i>{h.text}</li>)}
        </ol>
        {live && <button type="button" className="rmm-end" onClick={end}><i className="ri-phone-fill" aria-hidden="true"></i>End</button>}
        {state === 'ended' && <button type="button" className="rmm-again" onClick={restart}><i className="ri-restart-line" aria-hidden="true"></i>Call again</button>}
      </div>
    </div>
  );
}
