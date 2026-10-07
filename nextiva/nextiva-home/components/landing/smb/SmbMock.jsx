'use client';
/* Working hero mockup for the SMB Owner-Operators page: a small shop's AI
   front desk. Set yourself busy or at the desk, then simulate a call: when
   you're busy the AI answers at once; at the desk it rings you first and the
   AI picks up after three rings (or answer it yourself). Each call shows what
   the AI did — booked, rescheduled or answered a question — texts the
   confirmation and adds it to today's log. */
import { useEffect, useRef, useState } from 'react';

const CALLERS = [
  { who: 'Lauren O.', said: '“Can I book a cleaning for Saturday?”', kind: 'Booked', result: 'Sat 11:00 · Cleaning', lang: 'EN' },
  { who: 'Diego R.', said: '“¿Tienen cita el miércoles por la tarde?”', kind: 'Booked', result: 'Wed 16:30 · in Spanish', lang: 'ES' },
  { who: 'Sam K.', said: '“What are your hours — and is there parking?”', kind: 'Answered', result: 'Hours + parking info', lang: 'EN' },
  { who: 'Priya N.', said: '“Can I move my Friday appointment?”', kind: 'Rescheduled', result: 'Fri → Mon 10:00', lang: 'EN' },
];
const RING_MS = 700;

export default function SmbMock({ page }) {
  const [busy, setBusy] = useState(true);
  const [next, setNext] = useState(0);
  const [call, setCall] = useState(null); // { c, phase: 'ring' | 'ai' | 'you' | 'done', rings }
  const [log, setLog] = useState([]);
  const timers = useRef([]);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clear(), []);

  const finish = (c, by) => {
    setCall({ c, phase: 'done', by });
    setLog((l) => [{ ...c, by, id: `${c.who}-${l.length}` }, ...l].slice(0, 4));
  };
  const aiTakes = (c) => {
    setCall({ c, phase: 'ai' });
    later(() => finish(c, 'AI'), 1500);
  };

  const simulate = () => {
    if (call && call.phase !== 'done') return;
    clear();
    const c = CALLERS[next % CALLERS.length];
    setNext((n) => n + 1);
    if (busy) { aiTakes(c); return; }
    setCall({ c, phase: 'ring', rings: 1 });
    later(() => setCall((x) => (x && x.phase === 'ring' ? { ...x, rings: 2 } : x)), RING_MS);
    later(() => setCall((x) => (x && x.phase === 'ring' ? { ...x, rings: 3 } : x)), RING_MS * 2);
    later(() => aiTakes(c), RING_MS * 3);
  };
  const answerMyself = () => {
    if (!call || call.phase !== 'ring') return;
    clear();
    setCall({ ...call, phase: 'you' });
    later(() => finish(call.c, 'You'), 1200);
  };

  // First call comes in by itself so the desk isn't empty on load.
  useEffect(() => { later(() => simulate(), 1400); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const booked = log.filter((x) => x.kind !== 'Answered').length;
  const c = call?.c;

  return (
    <div className="sbm" role="region" aria-label="Interactive AI front desk for a small business">
      <div className="sbm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="sbm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Maple &amp; Co.
        </span>
        <span className="sbm-open"><i aria-hidden="true"></i>Open</span>
      </div>

      <div className="sbm-me" role="group" aria-label="Your status">
        <span>You are</span>
        <button type="button" className={busy ? 'is-on' : ''} aria-pressed={busy} onClick={() => setBusy(true)}><i className="ri-scissors-cut-line" aria-hidden="true"></i>With a customer</button>
        <button type="button" className={!busy ? 'is-on' : ''} aria-pressed={!busy} onClick={() => setBusy(false)}><i className="ri-store-2-line" aria-hidden="true"></i>At the desk</button>
      </div>

      <div className={`sbm-call${call ? ` sbm-call--${call.phase}` : ''}`} aria-live="polite">
        {!call && <p className="sbm-idle"><i className="ri-phone-line" aria-hidden="true"></i>Waiting for the next call…</p>}
        {call && (
          <>
            <div className="sbm-call-top">
              <span className="sbm-av">{c.who.split(' ').map((p) => p[0]).join('')}</span>
              <span className="sbm-who"><b>{c.who}</b><em>{c.said}</em></span>
              <span className="sbm-lang">{c.lang}</span>
            </div>
            <div className="sbm-state">
              {call.phase === 'ring' && <><i className="ri-phone-fill sbm-ring" aria-hidden="true"></i>Ringing you · ring {call.rings} of 3 — AI takes over after 3<button type="button" onClick={answerMyself}>Answer</button></>}
              {call.phase === 'ai' && <><i className="ri-mic-ai-line" aria-hidden="true"></i>AI answered · asking your questions…</>}
              {call.phase === 'you' && <><i className="ri-user-voice-line" aria-hidden="true"></i>You picked up · logging the call…</>}
              {call.phase === 'done' && (
                <>
                  <span className={`sbm-kind sbm-kind--${c.kind.toLowerCase()}`}>{c.kind}</span>
                  <b>{c.result}</b>
                  <em><i className="ri-message-2-line" aria-hidden="true"></i>{c.kind === 'Answered' ? 'Answer texted' : 'Confirmation texted'} · by {call.by}</em>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="sbm-today">
        <div className="sbm-today-top">
          <span>Today</span>
          <b>{log.length} answered · {booked} booked</b>
        </div>
        <ol className="sbm-log">
          {log.length === 0 && <li className="sbm-log-empty">No calls yet today.</li>}
          {log.map((x) => (
            <li key={x.id}>
              <span className={`sbm-dot sbm-dot--${x.kind.toLowerCase()}`} aria-hidden="true"></span>
              <b>{x.who}</b><span>{x.result}</span><em>{x.by}</em>
            </li>
          ))}
        </ol>
      </div>

      <button type="button" className="sbm-sim" onClick={simulate} disabled={!!call && call.phase !== 'done'}>
        <i className="ri-phone-line" aria-hidden="true"></i>Simulate a call
      </button>
    </div>
  );
}
