'use client';
/* "Compliance built in" section (page.compliance), laid out as a policy
   console: a centred heading; one wide card with a status bar on top, the
   policy controls on the left (retention options, the recording's lifecycle
   under that policy, consent and legal-hold switches) and a filterable live
   audit log on the right that records every change you make; the three
   selling points run underneath. */
import { useEffect, useRef, useState } from 'react';

const RETENTION = [
  { id: '30d', label: '30 days', note: 'Short-term QA and coaching' },
  { id: '1y', label: '1 year', note: 'A full year of history for most teams' },
  { id: '3y', label: '3 years', note: 'Common for financial and sales records' },
  { id: '7y', label: '7 years', note: 'Long-term regulated record keeping' },
];

const ROUTINE = [
  { who: 'MA', name: 'maria@acme', kind: 'Playback', text: 'Played REC-24817 · 01:02–01:31' },
  { who: 'SY', name: 'system', kind: 'Redact', text: 'Redacted 2 card details · REC-24822' },
  { who: 'JL', name: 'jordan@acme', kind: 'Export', text: 'Exported REC-24790 · audio + transcript' },
  { who: 'SY', name: 'system', kind: 'Redact', text: 'Redacted 1 SSN · REC-24826' },
  { who: 'PK', name: 'priya@acme', kind: 'Playback', text: 'Played REC-24811 · 00:14–00:52' },
];
const FILTERS = ['All', 'Playback', 'Redact', 'Export', 'Policy'];

let seq = 0;
const entry = (e) => ({ ...e, id: ++seq, at: Date.now() });

function ago(e, now) {
  // Before mount (and on the server) use the fixed label so the HTML matches.
  if (now == null) return e.label;
  const s = Math.max(0, Math.round((now - e.at) / 1000));
  if (s < 10) return 'just now';
  if (s < 60) return `${s}s ago`;
  return `${Math.round(s / 60)} min ago`;
}

export default function ComplianceAudit({ data }) {
  const [ret, setRet] = useState('1y');
  const [consent, setConsent] = useState(true);
  const [hold, setHold] = useState(false);
  const [filter, setFilter] = useState('All');
  const [now, setNow] = useState(null);
  const [log, setLog] = useState(() => {
    const base = Date.now();
    return ROUTINE.slice(0, 4).map((e, i) => ({
      ...entry(e), at: base - (i + 1) * 95_000, label: `${Math.round(((i + 1) * 95) / 60)} min ago`,
    }));
  });
  const r = useRef(4);

  const add = (e) => setLog((cur) => [entry(e), ...cur].slice(0, 8));

  useEffect(() => {
    setNow(Date.now());
    const tick = setInterval(() => setNow(Date.now()), 5000);
    let feed;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      feed = setInterval(() => { add(ROUTINE[r.current % ROUTINE.length]); r.current += 1; }, 7000);
    }
    return () => { clearInterval(tick); clearInterval(feed); };
  }, []);

  const pickRet = (x) => {
    if (x.id === ret) return;
    setRet(x.id);
    add({ who: 'YO', name: 'you', kind: 'Policy', text: `Retention set to ${x.label} · Support queue` });
  };
  const toggleConsent = () => {
    setConsent(!consent);
    add({ who: 'YO', name: 'you', kind: 'Policy', text: `Consent prompts ${consent ? 'paused' : 'enabled'} · all regions` });
  };
  const toggleHold = () => {
    setHold(!hold);
    add({ who: 'YO', name: 'you', kind: 'Policy', text: `Legal hold ${hold ? 'released' : 'placed'} · REC-24817` });
  };

  const cur = RETENTION.find((x) => x.id === ret);
  const shown = (filter === 'All' ? log : log.filter((e) => e.kind === filter || (filter === 'Policy' && e.kind === 'Hold'))).slice(0, 5);
  const ok = consent;

  return (
    <section className="lp-section lp-section--theme cpx-sec">
      <div className="lp-wrap">
        <div className="cpx-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="cpx reveal reveal-delay-1" role="region" aria-label="Recording policy demo">
          <div className="cpx-bar">
            <span className="cpx-bar-title">
              <span className="cpx-bar-ic"><i className="ri-shield-check-fill" aria-hidden="true"></i></span>
              <span><b>Recording policy</b><em>Support queue · 24 agents</em></span>
            </span>
            <span className={`cpx-status${ok ? '' : ' is-warn'}`}>
              <i className={ok ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'} aria-hidden="true"></i>
              {ok ? 'Compliant' : 'Consent prompts off'}
            </span>
          </div>

          <div className="cpx-body">
            <div className="cpx-policy">
              <div className="cpx-label"><b>Retention period</b><span>How long recordings are kept</span></div>
              <div className="cpx-ret" role="radiogroup" aria-label="Retention period">
                {RETENTION.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    role="radio"
                    aria-checked={ret === x.id}
                    className={`cpx-ret-opt${ret === x.id ? ' is-on' : ''}`}
                    onClick={() => pickRet(x)}
                  >
                    <span className="cpx-radio" aria-hidden="true"></span>
                    <span className="cpx-ret-txt"><b>{x.label}</b><em>{x.note}</em></span>
                  </button>
                ))}
              </div>

              <div className="cpx-life" aria-label="Recording lifecycle">
                <span className="cpx-life-step is-done"><i className="ri-record-circle-line" aria-hidden="true"></i>Recorded</span>
                <span className="cpx-life-line" aria-hidden="true"></span>
                <span className="cpx-life-step is-done"><i className="ri-eye-off-line" aria-hidden="true"></i>Redacted</span>
                <span className="cpx-life-line" aria-hidden="true"></span>
                <span className="cpx-life-step is-now"><i className="ri-archive-line" aria-hidden="true"></i>Kept {cur.label}</span>
                <span className="cpx-life-line" aria-hidden="true"></span>
                <span className={`cpx-life-step${hold ? ' is-hold' : ''}`}>
                  <i className={hold ? 'ri-lock-2-line' : 'ri-delete-bin-6-line'} aria-hidden="true"></i>
                  {hold ? 'On hold' : 'Auto-deleted'}
                </span>
              </div>

              <div className="cpx-switches">
                <button type="button" role="switch" aria-checked={consent} className={`cpx-switch${consent ? ' is-on' : ''}`} onClick={toggleConsent}>
                  <span className="cpx-switch-ic"><i className="ri-chat-voice-line" aria-hidden="true"></i></span>
                  <span className="cpx-switch-txt"><b>Consent prompts</b><em>Played by caller’s state</em></span>
                  <i className="cpx-toggle" aria-hidden="true"></i>
                </button>
                <button type="button" role="switch" aria-checked={hold} className={`cpx-switch${hold ? ' is-on' : ''}`} onClick={toggleHold}>
                  <span className="cpx-switch-ic"><i className="ri-scales-3-line" aria-hidden="true"></i></span>
                  <span className="cpx-switch-txt"><b>Legal hold</b><em>REC-24817</em></span>
                  <i className="cpx-toggle" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div className="cpx-log">
              <div className="cpx-log-head">
                <b>Audit log</b>
                <span className="cpx-live"><i aria-hidden="true"></i>Live</span>
              </div>
              <div className="cpx-filters" role="tablist" aria-label="Filter audit log">
                {FILTERS.map((f) => (
                  <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? 'is-on' : ''} onClick={() => setFilter(f)}>{f}</button>
                ))}
              </div>
              <ul className="cpx-entries" aria-live="polite">
                {shown.length ? shown.map((e) => (
                  <li key={e.id} className={`cpx-entry cpx-entry--${e.kind.toLowerCase()}`}>
                    <span className="cpx-av">{e.who}</span>
                    <span className="cpx-entry-txt">
                      <b>{e.text}</b>
                      <em>{e.name} · {ago(e, now)}</em>
                    </span>
                    <span className="cpx-kind">{e.kind}</span>
                  </li>
                )) : <li className="cpx-empty">No {filter.toLowerCase()} events yet — change a setting to add one.</li>}
              </ul>
              <div className="cpx-log-foot">
                <span><i className="ri-lock-line" aria-hidden="true"></i>Tamper-evident</span>
                <span><i className="ri-download-2-line" aria-hidden="true"></i>Export for audits</span>
              </div>
            </div>
          </div>
        </div>

        <ul className="cpx-points reveal reveal-delay-2">
          {data.points.map((p) => (
            <li key={p.text}><span><i className={p.icon} aria-hidden="true"></i></span>{p.text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
