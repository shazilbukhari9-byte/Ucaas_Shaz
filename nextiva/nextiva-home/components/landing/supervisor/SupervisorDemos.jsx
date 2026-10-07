'use client';
/* Interactive sections for the Supervisor Tools page:
   - ModesDemo: pick monitor / whisper / barge and the audio-path diagram
     shows who hears whom; pick a state to see the barge disclosure.
   - RadarDemo: live calls plotted by urgency; filter by the signal that
     raised them, select a dot for its details, and a ranking ticker. */
import { useEffect, useState } from 'react';

/* ── Three modes ──────────────────────────────────────────────────────── */
const MODES = [
  { id: 'monitor', label: 'Monitor', icon: 'ri-headphone-line', title: 'Silent listen', text: 'Hear the call as it happens. Neither the agent nor the customer knows — ideal for QA, shadowing and triage.', hears: { agent: false, cust: false } },
  { id: 'whisper', label: 'Whisper', icon: 'ri-user-voice-line', title: 'Coach in their ear', text: 'Talk straight into the agent’s headset. The customer hears nothing — prompt the offer, the disclosure or the save.', hears: { agent: true, cust: false } },
  { id: 'barge', label: 'Barge', icon: 'ri-group-line', title: 'Join as a third party', text: 'Everyone hears you. The disclosure for the caller’s state plays first, and the join is written to the audit log.', hears: { agent: true, cust: true } },
];
const STATES = [
  { id: 'CA', label: 'California', rule: 'Two-party consent', notice: '“This call is being monitored. A supervisor has joined.” — plays to all parties before you speak.' },
  { id: 'NY', label: 'New York', rule: 'One-party consent', notice: '“A supervisor has joined the call.” — short courtesy notice.' },
  { id: 'TX', label: 'Texas', rule: 'One-party consent', notice: '“A supervisor has joined the call.” — short courtesy notice.' },
  { id: 'EU', label: 'Custom region', rule: 'Your own rule', notice: 'Upload your own notice per region or queue.' },
];

export function ModesDemo({ data }) {
  const [m, setM] = useState('whisper');
  const [st, setSt] = useState('CA');
  const mode = MODES.find((x) => x.id === m);
  const state = STATES.find((x) => x.id === st);
  const toAgent = mode.hears.agent;
  const toCust = mode.hears.cust;

  return (
    <section className="lp-section sv-mode-sec">
      <div className="lp-wrap">
        <div className="sv-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="sv-mode reveal reveal-delay-1">
          <div className="sv-mode-tabs" role="tablist" aria-label="Supervisor mode">
            {MODES.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={m === x.id} className={`sv-mode-tab${m === x.id ? ' is-on' : ''}`} onClick={() => setM(x.id)}>
                <span className="sv-mode-ic"><i className={x.icon} aria-hidden="true"></i></span>
                <span className="sv-mode-txt"><em>{x.label}</em><b>{x.title}</b></span>
              </button>
            ))}
          </div>

          <div className="sv-mode-body" role="tabpanel">
            <svg className={`sv-path sv-path--${m}`} viewBox="0 0 360 230" aria-hidden="true">
              <defs>
                <marker id="sv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" /></marker>
              </defs>
              {/* agent <-> customer, always */}
              <line className="sv-ln sv-ln--base" x1="80" y1="180" x2="280" y2="180" markerStart="url(#sv-arrow)" markerEnd="url(#sv-arrow)" />
              {/* supervisor always listens to both */}
              <line className="sv-ln sv-ln--listen" x1="92" y1="160" x2="168" y2="70" markerEnd="url(#sv-arrow)" />
              <line className="sv-ln sv-ln--listen" x1="268" y1="160" x2="192" y2="70" markerEnd="url(#sv-arrow)" />
              {/* supervisor speaks */}
              <line className={`sv-ln sv-ln--talk${toAgent ? ' is-on' : ''}`} x1="160" y1="62" x2="84" y2="150" markerEnd="url(#sv-arrow)" />
              <line className={`sv-ln sv-ln--talk${toCust ? ' is-on' : ''}`} x1="200" y1="62" x2="276" y2="150" markerEnd="url(#sv-arrow)" />
              <g className="sv-node sv-node--sup"><circle cx="180" cy="44" r="28" /><text x="180" y="49">SUP</text></g>
              <g className="sv-node"><circle cx="70" cy="180" r="28" /><text x="70" y="185">AGENT</text></g>
              <g className="sv-node"><circle cx="290" cy="180" r="28" /><text x="290" y="185">CALLER</text></g>
            </svg>

            <div className="sv-mode-info" key={m}>
              <h3 className="sv-mode-title">{mode.title}</h3>
              <p className="sv-mode-text">{mode.text}</p>
              <ul className="sv-hears">
                <li className="is-on"><i className="ri-headphone-fill" aria-hidden="true"></i>Supervisor hears both</li>
                <li className={toAgent ? 'is-on' : ''}><i className={toAgent ? 'ri-volume-up-fill' : 'ri-volume-mute-fill'} aria-hidden="true"></i>Agent {toAgent ? 'hears' : 'doesn’t hear'} you</li>
                <li className={toCust ? 'is-on' : ''}><i className={toCust ? 'ri-volume-up-fill' : 'ri-volume-mute-fill'} aria-hidden="true"></i>Caller {toCust ? 'hears' : 'doesn’t hear'} you</li>
              </ul>
            </div>
          </div>

          <div className="sv-states">
            <span className="sv-states-k"><i className="ri-scales-3-line" aria-hidden="true"></i>Disclosure rules</span>
            <div className="sv-states-tabs" role="group" aria-label="Caller state">
              {STATES.map((x) => (
                <button key={x.id} type="button" className={st === x.id ? 'is-on' : ''} aria-pressed={st === x.id} onClick={() => setSt(x.id)}>{x.label}</button>
              ))}
            </div>
            <p className="sv-states-out"><b>{state.rule}.</b> {m === 'barge' ? state.notice : 'No notice needed while you’re not heard — it plays automatically if you barge.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Attention radar ──────────────────────────────────────────────────── */
const SIGNALS = ['Sentiment drop', 'Missed disclosure', 'SLA risk', 'Raised voice', 'Price push-back', 'Long silence'];
const DOTS = [
  { id: 1, agent: 'Marisol R.', topic: 'Refund escalation', urg: 0.18, ang: 35, sig: 'Sentiment drop', tone: 'rose' },
  { id: 2, agent: 'Devon K.', topic: 'Renewal pricing', urg: 0.32, ang: 150, sig: 'Price push-back', tone: 'amber' },
  { id: 3, agent: 'Priya S.', topic: 'Account change', urg: 0.4, ang: 255, sig: 'Missed disclosure', tone: 'rose' },
  { id: 4, agent: 'Leo M.', topic: 'Billing question', urg: 0.58, ang: 300, sig: 'Long silence', tone: 'amber' },
  { id: 5, agent: 'Hana W.', topic: 'Delivery delay', urg: 0.64, ang: 95, sig: 'Raised voice', tone: 'amber' },
  { id: 6, agent: 'Omar B.', topic: 'Priority support', urg: 0.72, ang: 205, sig: 'SLA risk', tone: 'blue' },
  { id: 7, agent: 'Aiko T.', topic: 'Onboarding', urg: 0.86, ang: 0, sig: 'Sentiment drop', tone: 'green' },
];
const TICKER = [
  { text: '#5 → #1 · sentiment fell sharply', tag: 'Risk', tone: 'rose' },
  { text: '#2 → #4 · sentiment recovered', tag: 'Calm', tone: 'green' },
  { text: 'New at #3 · disclosure missed', tag: 'Flag', tone: 'amber' },
  { text: '#1 → #6 · supervisor joined · resolved', tag: 'Saved', tone: 'blue' },
  { text: 'New at #4 · 9s of silence', tag: 'Flag', tone: 'amber' },
];
const R = 120;
const pos = (d) => {
  const rad = (d.ang * Math.PI) / 180;
  const r = 16 + d.urg * (R - 22);
  return { x: Math.round(140 + Math.cos(rad) * r), y: Math.round(140 + Math.sin(rad) * r) };
};

export function RadarDemo({ data }) {
  const [sig, setSig] = useState(null);
  const [sel, setSel] = useState(1);
  const [n, setN] = useState(3);
  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 3200);
    return () => clearInterval(id);
  }, []);
  const shown = DOTS.filter((d) => !sig || d.sig === sig);
  const cur = DOTS.find((d) => d.id === sel);
  const feed = Array.from({ length: 4 }, (_, k) => TICKER[(n - k + TICKER.length * 10) % TICKER.length]);

  return (
    <section className="lp-section lp-section--theme sv-rad-sec">
      <div className="lp-wrap">
        <div className="sv-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="sv-rad reveal reveal-delay-1">
          <div className="sv-rad-plot">
            <svg viewBox="0 0 280 280" aria-label="Attention radar">
              {[1, 0.66, 0.33].map((f) => <circle key={f} className="sv-ring" cx="140" cy="140" r={Math.round(R * f)} />)}
              <line className="sv-axis" x1="140" y1="20" x2="140" y2="260" />
              <line className="sv-axis" x1="20" y1="140" x2="260" y2="140" />
              <g className="sv-sweep"><path d="M140 140 L140 20 A120 120 0 0 1 225 55 Z" /></g>
              <circle className="sv-core" cx="140" cy="140" r="6" />
              {DOTS.map((d) => {
                const p = pos(d);
                const on = shown.includes(d);
                return (
                  <g key={d.id} className={`sv-dot sv-dot--${d.tone}${on ? '' : ' is-dim'}${sel === d.id ? ' is-sel' : ''}`} onClick={() => setSel(d.id)} role="button" tabIndex={0} aria-label={`${d.agent}, ${d.sig}`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSel(d.id); }}>
                    <circle cx={p.x} cy={p.y} r={sel === d.id ? 9 : 7} />
                    <text x={p.x} y={p.y + 3}>{d.id}</text>
                  </g>
                );
              })}
            </svg>
            <span className="sv-rad-k"><i></i>closer to centre = more urgent</span>
          </div>

          <div className="sv-rad-side">
            <div className="sv-sigs" role="group" aria-label="Filter by signal">
              <button type="button" className={!sig ? 'is-on' : ''} onClick={() => setSig(null)}>All signals</button>
              {SIGNALS.map((s) => <button key={s} type="button" className={sig === s ? 'is-on' : ''} aria-pressed={sig === s} onClick={() => setSig(sig === s ? null : s)}>{s}</button>)}
            </div>
            <div className={`sv-rad-card sv-rad-card--${cur.tone}`} key={cur.id}>
              <span className="sv-rad-rank">#{cur.id}</span>
              <span className="sv-rad-who"><b>{cur.agent}</b><em>{cur.topic}</em></span>
              <span className="sv-rad-sig">{cur.sig}</span>
            </div>
            <div className="sv-tick">
              <span className="sv-tick-k"><i></i>Live ranking</span>
              <ol aria-live="polite">
                {feed.map((t, k) => (
                  <li key={`${n}-${k}`} className={k === 0 ? 'is-new' : ''}>
                    <span>{t.text}</span><em className={`sv-tick-tag sv-tick-tag--${t.tone}`}>{t.tag}</em>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
