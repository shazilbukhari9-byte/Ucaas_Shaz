'use client';
/* Working hero mockup for the Sales Teams page: a rep's pipeline with a
   power dialer. Dial the next lead and the call goes live; when the prospect
   raises an objection, a whisper the prospect can't hear suggests what to
   say. Use it (or let the call play out) and the deal moves a stage, with
   the call logged to the CRM automatically. */
import { useEffect, useRef, useState } from 'react';

const STAGES = ['Discovery', 'Qualified', 'Proposal', 'Closing'];
const LEADS = [
  { who: 'Hannah W.', co: 'Northwind Dental', stage: 1, said: '“Honestly, your price is higher than the other quote.”', tag: 'Price objection', tip: 'Compare a full year, not the seat price — then ask what switching later would cost them.' },
  { who: 'Omar S.', co: 'Bluepeak Logistics', stage: 0, said: '“We can’t afford weeks of disruption right now.”', tag: 'Timing concern', tip: 'Explain the parallel run: nothing is switched off until their team says go.' },
  { who: 'Grace L.', co: 'Fernway Clinics', stage: 2, said: '“Will it actually write back into our CRM?”', tag: 'Integration question', tip: 'Show a logged call on a live record — notes, outcome and next step, nothing typed.' },
];
const BASE = [12, 8, 5, 3];

export default function SalesMock({ page }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | dial | live | tip | done
  const [used, setUsed] = useState(false);
  const [counts, setCounts] = useState(BASE);
  const [logged, setLogged] = useState(0);
  const timers = useRef([]);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clear(), []);

  const lead = LEADS[idx % LEADS.length];

  const finish = (withTip) => {
    clear();
    setUsed(withTip);
    setPhase('done');
    setLogged((n) => n + 1);
    setCounts((c) => c.map((v, i) => (i === lead.stage ? v - 1 : i === lead.stage + 1 ? v + 1 : v)));
  };
  const dial = () => {
    clear();
    setUsed(false);
    setPhase('dial');
    later(() => setPhase('live'), 900);
    later(() => setPhase('tip'), 2100);
    later(() => finish(false), 7000);
  };
  const nextLead = () => { setIdx((i) => i + 1); setPhase('idle'); };

  useEffect(() => { later(dial, 1200); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const busy = phase === 'dial' || phase === 'live' || phase === 'tip';

  return (
    <div className="slm" role="region" aria-label="Interactive sales pipeline with dialer and live coaching">
      <div className="slm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="slm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Pipeline
        </span>
        <span className="slm-crm"><i className="ri-refresh-line" aria-hidden="true"></i>CRM synced{logged ? ` · ${logged}` : ''}</span>
      </div>

      <div className="slm-stages" aria-label="Deals by stage">
        {STAGES.map((s, i) => (
          <span key={s} className={`slm-stage${busy || phase === 'done' ? (i === lead.stage ? ' is-from' : '') : ''}${phase === 'done' && i === lead.stage + 1 ? ' is-to' : ''}`}>
            <em>{s}</em><b>{String(counts[i]).padStart(2, '0')}</b>
          </span>
        ))}
      </div>

      <div className={`slm-call slm-call--${phase}`} aria-live="polite">
        <div className="slm-lead">
          <span className="slm-av">{lead.who.split(' ').map((w) => w[0]).join('')}</span>
          <span className="slm-who"><b>{lead.who}</b><em>{lead.co} · {STAGES[lead.stage]}</em></span>
          {phase === 'idle' && <button type="button" className="slm-dial" onClick={dial}><i className="ri-phone-fill" aria-hidden="true"></i>Dial</button>}
          {phase === 'dial' && <span className="slm-pill slm-pill--dial"><i className="ri-phone-line" aria-hidden="true"></i>Dialing…</span>}
          {(phase === 'live' || phase === 'tip') && <span className="slm-pill slm-pill--live"><i aria-hidden="true"></i>Live</span>}
          {phase === 'done' && <span className="slm-pill slm-pill--done"><i className="ri-arrow-right-up-line" aria-hidden="true"></i>{STAGES[lead.stage + 1]}</span>}
        </div>

        {phase === 'idle' && <p className="slm-hint">Power dialer ready · local caller ID · voicemail drop on</p>}
        {phase === 'dial' && <p className="slm-hint">Skipping do-not-call numbers · detecting answering machines…</p>}
        {(phase === 'live' || phase === 'tip') && <p className="slm-said">{lead.said}</p>}
        {phase === 'tip' && (
          <div className="slm-tip">
            <span className="slm-tip-top"><i className="ri-sparkling-2-fill" aria-hidden="true"></i>Whisper · {lead.tag}<em>Only you see this</em></span>
            <p>{lead.tip}</p>
            <button type="button" onClick={() => finish(true)}>Use it</button>
          </div>
        )}
        {phase === 'done' && (
          <div className="slm-done">
            <span><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{used ? 'Handled with the whisper' : 'Call wrapped'} · moved to {STAGES[lead.stage + 1]}</span>
            <span><i className="ri-file-text-line" aria-hidden="true"></i>Notes, outcome and next step logged to the CRM</span>
            <button type="button" onClick={nextLead}>Next lead<i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
          </div>
        )}
      </div>
    </div>
  );
}
