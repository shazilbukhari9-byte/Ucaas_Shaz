'use client';
/* Interactive sections for the Conversation Intelligence page:
   - Layers: one short call; switch on transcript, sentiment, summary,
     action items and objection tags to see what it becomes.
   - Objections: themes counted over a chosen period; pick one for quotes.
   - ExportSync: pick a destination to see the record it receives. */
import { useState } from 'react';

/* ── Layers ───────────────────────────────────────────────────────────── */
const CALL = [
  { who: 'Rep', t: '00:04', text: 'Thanks for making time — where are you with the rollout?', s: 30 },
  { who: 'Customer', t: '00:11', text: 'Honestly, implementation time worries us. We can’t lose a month.', s: -38, tag: 'Implementation' },
  { who: 'Rep', t: '00:19', text: 'Most teams are live in about two weeks with both systems running.', s: 20 },
  { who: 'Customer', t: '00:27', text: 'Okay. And the per-seat price — is there an annual option?', s: -12, tag: 'Pricing' },
  { who: 'Rep', t: '00:35', text: 'Yes — I’ll send the annual quote today, and we can book the kickoff.', s: 46 },
  { who: 'Customer', t: '00:42', text: 'Great, that works. Let’s do Thursday.', s: 64 },
];
const LAYERS = [
  { id: 'tr', label: 'Transcript', icon: 'ri-file-text-line' },
  { id: 'se', label: 'Sentiment', icon: 'ri-emotion-line' },
  { id: 'ob', label: 'Objections', icon: 'ri-price-tag-3-line' },
  { id: 'su', label: 'Summary', icon: 'ri-sparkling-2-line' },
  { id: 'ac', label: 'Action items', icon: 'ri-task-line' },
];

export function Layers({ data }) {
  const [on, setOn] = useState({ tr: true, se: true, ob: true, su: false, ac: false });
  const toggle = (id) => setOn((o) => ({ ...o, [id]: !o[id] }));
  const count = Object.values(on).filter(Boolean).length;

  return (
    <section className="lp-section cvi-lay-sec">
      <div className="lp-wrap">
        <div className="cvi-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="cvi-lay reveal reveal-delay-1">
          <div className="cvi-lay-switches" role="group" aria-label="Layers">
            <span className="cvi-lay-k">{count} of 5 layers on</span>
            {LAYERS.map((l, i) => (
              <button key={l.id} type="button" className={`cvi-lay-sw${on[l.id] ? ' is-on' : ''}`} aria-pressed={on[l.id]} onClick={() => toggle(l.id)}>
                <span className="cvi-lay-n">{String(i + 1).padStart(2, '0')}</span>
                <i className={l.icon} aria-hidden="true"></i>{l.label}
                <em aria-hidden="true"></em>
              </button>
            ))}
          </div>

          <div className="cvi-call">
            <div className="cvi-call-head"><b>Discovery · Northwind Logistics</b><em>0:48 · 2 speakers · EN</em></div>
            {on.su && (
              <div className="cvi-sum">
                <span><i className="ri-sparkling-2-fill" aria-hidden="true"></i>Summary</span>
                <p>Customer worried about rollout time and per-seat price; agreed to an annual quote and a Thursday kickoff.</p>
              </div>
            )}
            <ol className={`cvi-lines${on.tr ? '' : ' is-hidden'}`}>
              {CALL.map((l) => (
                <li key={l.t} className={`cvi-line cvi-line--${l.who === 'Rep' ? 'rep' : 'cus'}`}>
                  {on.se && <span className={`cvi-sent ${l.s <= -20 ? 'is-neg' : l.s < 20 ? 'is-mid' : 'is-pos'}`} title={`Sentiment ${l.s}`}><i style={{ height: `${Math.round(Math.abs(l.s) / 1.6) + 12}%` }}></i></span>}
                  <span className="cvi-line-meta"><b>{l.who}</b><em>{l.t}</em></span>
                  <p>{l.text}{on.ob && l.tag && <mark className="cvi-tag">{l.tag}</mark>}</p>
                </li>
              ))}
            </ol>
            {!on.tr && <p className="cvi-hint">Transcript hidden — switch it on to read the call.</p>}
            {on.ac && (
              <ul className="cvi-acts">
                <li><i className="ri-checkbox-blank-circle-line" aria-hidden="true"></i>Send annual quote<b>Rep · today</b></li>
                <li><i className="ri-checkbox-blank-circle-line" aria-hidden="true"></i>Book kickoff for Thursday<b>Rep</b></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Objection mining ─────────────────────────────────────────────────── */
const THEMES = [
  { id: 'price', label: 'Pricing structure', base: 142, trend: 'up', quotes: ['Per-seat pricing is hard to justify for part-time staff.', 'Is there a discount if we commit annually?'] },
  { id: 'impl', label: 'Implementation time', base: 98, trend: 'flat', quotes: ['We can’t have the team offline for a month.', 'Who does the setup — us or you?'] },
  { id: 'intg', label: 'Integration depth', base: 71, trend: 'up', quotes: ['How deep does the HubSpot sync go?', 'Does it write call notes back to Salesforce?'] },
  { id: 'sec', label: 'Security review', base: 54, trend: 'down', quotes: ['We need data residency details first.', 'Can you share the pen-test summary?'] },
  { id: 'term', label: 'Contract length', base: 41, trend: 'flat', quotes: ['Three years is too long for us right now.', 'Can we start month-to-month?'] },
];
const PERIODS = [['7', 'Last 7 days', 0.24], ['30', 'Last 30 days', 1], ['90', 'Last 90 days', 2.8]];

export function Objections({ data }) {
  const [per, setPer] = useState('30');
  const [sel, setSel] = useState('price');
  const f = PERIODS.find((p) => p[0] === per)[2];
  const rows = THEMES.map((t) => ({ ...t, n: Math.round(t.base * f) }));
  const max = Math.max(...rows.map((r) => r.n));
  const cur = rows.find((r) => r.id === sel);

  return (
    <section className="lp-section lp-section--theme cvi-ob-sec">
      <div className="lp-wrap">
        <div className="cvi-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="cvi-ob reveal reveal-delay-1">
          <div className="cvi-ob-chart">
            <div className="cvi-ob-top">
              <span><i className="ri-bubble-chart-line" aria-hidden="true"></i>Top objections · auto-clustered</span>
              <div className="cvi-ob-per" role="group" aria-label="Period">
                {PERIODS.map(([k, l]) => <button key={k} type="button" className={per === k ? 'is-on' : ''} aria-pressed={per === k} onClick={() => setPer(k)}>{l}</button>)}
              </div>
            </div>
            <ol className="cvi-ob-bars">
              {rows.map((r, i) => (
                <li key={r.id}>
                  <button type="button" className={`cvi-ob-bar${sel === r.id ? ' is-on' : ''}`} onClick={() => setSel(r.id)} aria-pressed={sel === r.id}>
                    <span className="cvi-ob-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="cvi-ob-label">{r.label}</span>
                    <span className="cvi-ob-track"><i style={{ width: `${Math.round((r.n / max) * 100)}%` }}></i></span>
                    <b>{r.n}</b>
                  </button>
                </li>
              ))}
            </ol>
            <span className="cvi-ob-note">Example data</span>
          </div>
          <div className="cvi-ob-detail" key={sel} aria-live="polite">
            <span className="cvi-ob-k">{cur.label}</span>
            <b>{cur.n}<em>mentions</em></b>
            <span className={`cvi-ob-trend cvi-ob-trend--${cur.trend}`}>
              <i className={cur.trend === 'up' ? 'ri-arrow-right-up-line' : cur.trend === 'down' ? 'ri-arrow-right-down-line' : 'ri-arrow-right-line'} aria-hidden="true"></i>
              {cur.trend === 'up' ? 'Rising' : cur.trend === 'down' ? 'Falling' : 'Steady'} vs previous period
            </span>
            <span className="cvi-ob-qk">What customers said</span>
            {cur.quotes.map((q) => <p key={q} className="cvi-ob-q">“{q}”</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Export & sync ────────────────────────────────────────────────────── */
const DESTS = [
  { id: 'hs', label: 'HubSpot', icon: 'ri-contacts-book-3-line', note: 'Synced to the contact timeline', lines: [['summary', '“Concerned about rollout time; wants annual quote.”'], ['next_step', '“Send annual quote · Thursday kickoff”'], ['sentiment', '+46 (improving)'], ['objections', '[Implementation, Pricing]']] },
  { id: 'sf', label: 'Salesforce', icon: 'ri-cloud-line', note: 'Activity on the opportunity', lines: [['Subject', 'Discovery · Northwind Logistics'], ['Description', 'AI summary + action items'], ['Call_Sentiment__c', '46'], ['Objections__c', 'Implementation; Pricing']] },
  { id: 'csv', label: 'CSV export', icon: 'ri-file-excel-2-line', note: 'All plans', lines: [['call_id', 'C-08214'], ['duration', '00:48'], ['sentiment_avg', '18'], ['top_objection', 'Implementation']] },
  { id: 'wh', label: 'Data warehouse', icon: 'ri-database-2-line', note: 'Live sync · Enterprise', lines: [['table', 'conversations'], ['rows / day', 'streamed continuously'], ['schema', 'calls · utterances · tags'], ['destinations', 'Snowflake, BigQuery, Redshift']] },
];

export function ExportSync({ data }) {
  const [d, setD] = useState('hs');
  const cur = DESTS.find((x) => x.id === d);
  return (
    <section className="lp-section cvi-ex-sec">
      <div className="lp-wrap cvi-ex">
        <div className="cvi-ex-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <div className="cvi-ex-dests" role="tablist" aria-label="Destination">
            {DESTS.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={d === x.id} className={d === x.id ? 'is-on' : ''} onClick={() => setD(x.id)}>
                <i className={x.icon} aria-hidden="true"></i><span><b>{x.label}</b><em>{x.note}</em></span>
              </button>
            ))}
          </div>
        </div>
        <div className="cvi-ex-rec reveal reveal-delay-1" key={d}>
          <div className="cvi-ex-rec-top"><i className={cur.icon} aria-hidden="true"></i>{cur.label}<em>record received</em></div>
          <dl>
            {cur.lines.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <span className="cvi-ex-ok"><i className="ri-check-double-line" aria-hidden="true"></i>Synced automatically after the call</span>
        </div>
      </div>
    </section>
  );
}
