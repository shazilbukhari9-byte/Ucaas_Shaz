'use client';
/* Working hero mockup for the Financial Services page: a compliance desk
   watching a live advisor call. The transcript streams in, the required
   disclosures tick off as they're said and a card number is redacted the
   moment it's spoken. When a disclosure is still missing, the desk flags it
   — prompt the advisor (or wait) and the call closes compliant, archived
   and written to the audit log. */
import { useEffect, useRef, useState } from 'react';

const CALLS = [
  {
    advisor: 'Dana K.', client: 'R. Alvarez', kind: 'Wealth review',
    lines: [
      { who: 'A', text: 'Before we start — this call is recorded for quality and compliance.', checks: 'rec' },
      { who: 'C', text: 'Sure — my card is ', card: '4111 2222 3333 4417' },
      { who: 'A', text: 'Thanks. Our advisory fee is 0.8% a year, billed quarterly.', checks: 'fee' },
    ],
    fix: { who: 'A', text: 'And remember, investments can lose value, including the amount you put in.', checks: 'risk' },
    need: [{ id: 'rec', label: 'Recording notice' }, { id: 'fee', label: 'Fee disclosure' }, { id: 'risk', label: 'Risk disclosure' }],
  },
  {
    advisor: 'Malik J.', client: 'S. Okoye', kind: 'Mortgage quote',
    lines: [
      { who: 'A', text: 'Quick note: this call is recorded for quality and compliance.', checks: 'rec' },
      { who: 'A', text: 'The rate I can offer today is 6.1% fixed for 30 years.', checks: 'rate' },
      { who: 'C', text: 'Great. Use my account ', card: '0012 4458 9930' },
    ],
    fix: { who: 'A', text: 'That rate is an estimate until underwriting — final terms are in your written disclosure.', checks: 'terms' },
    need: [{ id: 'rec', label: 'Recording notice' }, { id: 'rate', label: 'Rate stated' }, { id: 'terms', label: 'Terms disclosure' }],
  },
];
const STEP_MS = 1300;

const mask = (n) => n.replace(/\d(?=(?:\s?\d){4})/g, '•');

export default function FinanceMock({ page }) {
  const [ci, setCi] = useState(0);
  const [shown, setShown] = useState(0); // transcript lines shown
  const [fixed, setFixed] = useState(false);
  const [stats, setStats] = useState({ calls: 183, redactions: 41 });
  const timers = useRef([]);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clear(), []);

  const call = CALLS[ci % CALLS.length];
  const lines = fixed ? [...call.lines, call.fix] : call.lines.slice(0, shown);
  const done = new Set(lines.map((l) => l.checks).filter(Boolean));
  const allIn = shown >= call.lines.length;
  const missing = allIn && !fixed;

  const start = () => {
    clear();
    setShown(0);
    setFixed(false);
    call.lines.forEach((l, i) => later(() => {
      setShown(i + 1);
      if (l.card) setStats((s) => ({ ...s, redactions: s.redactions + 1 }));
    }, 600 + i * STEP_MS));
    later(() => promptAdvisor(), 600 + call.lines.length * STEP_MS + 5200);
  };
  const promptAdvisor = () => {
    clear();
    setShown(call.lines.length);
    setFixed(true);
    setStats((s) => ({ ...s, calls: s.calls + 1 }));
  };
  const nextCall = () => setCi((i) => i + 1);

  // Restart the script whenever the call changes (and on first load).
  useEffect(() => { start(); }, [ci]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fnm" role="region" aria-label="Interactive compliance desk monitoring a live call">
      <div className="fnm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="fnm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Compliance desk
        </span>
        <span className="fnm-stir"><i className="ri-shield-check-fill" aria-hidden="true"></i>STIR · A</span>
      </div>

      <div className="fnm-stats" aria-live="polite">
        <span><b>{stats.calls}</b>Calls today</span>
        <span><b>0</b>Missed disclosures</span>
        <span><b>{stats.redactions}</b>Redactions</span>
      </div>

      <div className={`fnm-call${missing ? ' is-alert' : ''}${fixed ? ' is-ok' : ''}`}>
        <div className="fnm-call-top">
          <span className="fnm-live"><i aria-hidden="true"></i>{fixed ? 'Ended' : 'Live'}</span>
          <b>{call.advisor}</b><em>with {call.client} · {call.kind}</em>
        </div>

        <ol className="fnm-tx" aria-live="polite">
          {lines.map((l, i) => (
            <li key={`${ci}-${i}`} className={`fnm-line fnm-line--${l.who === 'A' ? 'a' : 'c'}`}>
              <span>{l.who === 'A' ? 'Advisor' : 'Client'}</span>
              <p>{l.text}{l.card && <mark title="Redacted automatically">{mask(l.card)}<i className="ri-eye-off-line" aria-hidden="true"></i></mark>}</p>
            </li>
          ))}
          {!lines.length && <li className="fnm-wait">Connecting…</li>}
        </ol>

        <div className="fnm-checks" role="list" aria-label="Required disclosures">
          {call.need.map((n) => (
            <span key={n.id} role="listitem" className={done.has(n.id) ? 'is-done' : missing && !done.has(n.id) ? 'is-miss' : ''}>
              <i className={done.has(n.id) ? 'ri-checkbox-circle-fill' : missing ? 'ri-error-warning-fill' : 'ri-time-line'} aria-hidden="true"></i>{n.label}
            </span>
          ))}
        </div>

        {missing && (
          <div className="fnm-alert" role="alert">
            <span><i className="ri-alarm-warning-fill" aria-hidden="true"></i><b>{call.need.find((n) => !done.has(n.id)).label}</b> not said yet</span>
            <button type="button" onClick={promptAdvisor}>Prompt advisor</button>
          </div>
        )}
        {fixed && (
          <div className="fnm-ok">
            <span><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>Compliant · archived 7 yrs · audit logged</span>
            <button type="button" onClick={nextCall}>Next call<i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
          </div>
        )}
      </div>
    </div>
  );
}
