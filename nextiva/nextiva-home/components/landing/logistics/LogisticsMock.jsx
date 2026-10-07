'use client';
/* Working hero mockup for the Logistics page: a dispatch network. A driver
   calls in and the call cascades — HQ dispatcher, then the depot hunt group,
   then the regional pool, then the AI receptionist. Answer at any tier to
   stop the cascade, or let it run and the AI captures the issue, books a
   callback and texts the driver. Nobody hits voicemail. */
import { useEffect, useRef, useState } from 'react';

const TIERS = [
  { id: 'hq', name: 'Memphis HQ', sub: 'Primary dispatcher', ring: 5, icon: 'ri-building-2-line' },
  { id: 'dal', name: 'Dallas depot', sub: 'Hunt group · longest-idle', ring: 8, icon: 'ri-map-pin-2-line' },
  { id: 'east', name: 'Eastern region', sub: 'Regional pool', ring: 12, icon: 'ri-group-line' },
  { id: 'ai', name: 'AI receptionist', sub: 'Never voicemail', ring: 0, icon: 'ri-robot-2-line' },
];
const CALLS = [
  { id: 'DR-218', from: 'I-40 · mile 212', issue: 'Trailer 4471 — flat tire', next: 'Callback with Dallas booked · tow ETA texted' },
  { id: 'DR-305', from: 'Atlanta DC · door 9', issue: 'Dock delay — 40 min wait', next: 'Appointment moved · customer notified by SMS' },
  { id: 'DR-142', from: 'US-60 · Phoenix', issue: 'Road closure — needs reroute', next: 'Reroute sent to driver · ETA updated in TMS' },
];
const SPEED = 0.55; // ring-seconds per 100 ms tick — the whole cascade plays in a few seconds
const starts = TIERS.reduce((acc, t, i) => [...acc, i ? acc[i - 1] + TIERS[i - 1].ring : 0], []);
const AI_AT = starts[3];

export default function LogisticsMock({ page }) {
  const [ci, setCi] = useState(0);
  const [t, setT] = useState(0);
  const [by, setBy] = useState(null); // tier id that answered
  const [today, setToday] = useState(146);
  const timer = useRef(null);
  useEffect(() => () => clearInterval(timer.current), []);

  const call = CALLS[ci % CALLS.length];
  const reached = starts.filter((s) => t >= s).length - 1; // last tier the call has reached
  const cur = by ? TIERS.findIndex((x) => x.id === by) : Math.min(3, reached);

  const start = () => {
    clearInterval(timer.current);
    setBy(null);
    setT(0);
    timer.current = setInterval(() => setT((v) => {
      const n = v + SPEED;
      if (n >= AI_AT) { clearInterval(timer.current); return AI_AT; }
      return n;
    }), 100);
  };
  // Nobody picked up: the AI takes the call.
  useEffect(() => {
    if (t >= AI_AT && !by) { setBy('ai'); setToday((x) => x + 1); }
  }, [t, by]);
  const answer = () => {
    if (by || cur > 2) return;
    clearInterval(timer.current);
    setBy(TIERS[cur].id);
    setToday((x) => x + 1);
  };
  useEffect(() => { const k = setTimeout(start, ci === 0 ? 1000 : 250); return () => clearTimeout(k); }, [ci]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="lgm" role="region" aria-label="Interactive dispatch call cascade">
      <div className="lgm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="lgm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Redstone Haul
        </span>
        <span className="lgm-up"><i aria-hidden="true"></i>All depots live</span>
      </div>

      <div className="lgm-caller" key={ci}>
        <span className="lgm-av"><i className="ri-steering-2-line" aria-hidden="true"></i></span>
        <span className="lgm-who"><b>{call.id} calling dispatch</b><em>{call.from}</em></span>
        {!by ? <span className="lgm-ring"><i className="ri-phone-fill" aria-hidden="true"></i>Ringing</span> : <span className="lgm-ok"><i className="ri-check-line" aria-hidden="true"></i>Answered</span>}
      </div>

      <ol className="lgm-tiers" aria-live="polite">
        {TIERS.map((x, i) => {
          const st = by ? (x.id === by ? 'on' : i < cur ? 'skip' : 'idle') : i < cur ? 'skip' : i === cur ? 'ring' : 'idle';
          const pct = x.ring ? Math.max(0, Math.min(100, ((t - starts[i]) / x.ring) * 100)) : 0;
          return (
            <li key={x.id} className={`lgm-tier lgm-tier--${st}${x.id === 'ai' ? ' lgm-tier--ai' : ''}`}>
              <span className="lgm-tier-ic"><i className={x.icon} aria-hidden="true"></i></span>
              <span className="lgm-tier-txt"><b>{x.name}</b><em>{x.sub}</em></span>
              <span className="lgm-tier-r">
                {st === 'on' ? (x.id === 'ai' ? 'Picked up' : 'Answered') : st === 'skip' ? 'No answer' : x.ring ? `${x.ring}s` : 'Backstop'}
              </span>
              {x.ring > 0 && <span className="lgm-tier-bar" aria-hidden="true"><i style={{ width: `${st === 'skip' ? 100 : st === 'ring' ? pct : 0}%` }}></i></span>}
            </li>
          );
        })}
      </ol>

      <div className="lgm-foot">
        {!by && <><span>Answer as <b>{TIERS[cur].name}</b>?</span><button type="button" onClick={answer} disabled={cur > 2}>Answer</button></>}
        {by === 'ai' && <span className="lgm-ai"><i className="ri-sparkling-2-fill" aria-hidden="true"></i><b>{call.issue}</b> · {call.next}</span>}
        {by && by !== 'ai' && <span className="lgm-ai lgm-ai--p"><i className="ri-user-voice-line" aria-hidden="true"></i><b>{TIERS.find((x) => x.id === by).name}</b> took it · {call.issue}</span>}
        {by && <button type="button" onClick={() => setCi((n) => n + 1)}>Next call<i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>}
      </div>

      <div className="lgm-stats">
        <span><b>0</b>to voicemail</span>
        <span><b>{today}</b>calls today</span>
        <span><b>5</b>depots</span>
      </div>
    </div>
  );
}
