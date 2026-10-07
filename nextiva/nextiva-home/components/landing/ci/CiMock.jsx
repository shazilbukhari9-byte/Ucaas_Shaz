'use client';
/* Working hero mockup for the Conversation Intelligence page: a transcript
   archive search. Type words (every word must appear) or tap a top
   objection; filter by queue. Matching lines are highlighted and the count
   updates. The archive is a fixed sample, so results are stable. */
import { useMemo, useState } from 'react';

const CALLS = [
  { id: 'C-08214', q: 'Sales', mood: 'neg', title: 'Discovery · Northwind Logistics', who: 'Adrian K. ↔ Helena V.', at: 'Mar 12', dur: '12:47', text: 'We’d love it, but our finance lead has concerns about pricing on the per-seat model.' },
  { id: 'C-08197', q: 'Renewal', mood: 'mid', title: 'Renewal · Hartwell & Co.', who: 'Jordan M. ↔ Theo R.', at: 'Mar 11', dur: '08:22', text: 'The team is sold, but my CFO will push back on pricing if we can’t commit annually.' },
  { id: 'C-08176', q: 'Sales', mood: 'pos', title: 'Closing · Vega Health', who: 'Marisol R. ↔ Naveen P.', at: 'Mar 10', dur: '21:03', text: 'Honestly the ROI math answers the pricing question we had in the last vendor review.' },
  { id: 'C-08151', q: 'Sales', mood: 'neg', title: 'Demo · Brightline Retail', who: 'Devon K. ↔ Ana L.', at: 'Mar 9', dur: '17:30', text: 'Implementation time is our worry — we can’t have the team offline for a month.' },
  { id: 'C-08139', q: 'Support', mood: 'mid', title: 'Ticket follow-up · Orbit Labs', who: 'Priya S. ↔ Sam W.', at: 'Mar 9', dur: '06:12', text: 'Our security review needs the data residency details before we roll this out.' },
  { id: 'C-08122', q: 'Renewal', mood: 'neg', title: 'Renewal · Kestrel Foods', who: 'Jordan M. ↔ Rita G.', at: 'Mar 8', dur: '14:55', text: 'A three-year contract length is too long for us right now, can we do one year?' },
  { id: 'C-08104', q: 'Sales', mood: 'mid', title: 'Discovery · Fernway Travel', who: 'Adrian K. ↔ Omar B.', at: 'Mar 7', dur: '11:09', text: 'How deep is the HubSpot integration? That decides it for our sales ops team.' },
  { id: 'C-08093', q: 'Support', mood: 'pos', title: 'Onboarding · Lumen Software', who: 'Aiko T. ↔ Chris D.', at: 'Mar 7', dur: '09:41', text: 'Implementation was quicker than expected, the pricing was clear from day one.' },
  { id: 'C-08077', q: 'Renewal', mood: 'mid', title: 'QBR · Halcyon Media', who: 'Theo R. ↔ Mei C.', at: 'Mar 6', dur: '19:20', text: 'Security review passed; contract length and pricing are the last two items.' },
];
const QUEUES = ['All', 'Sales', 'Support', 'Renewal'];
const TOP = [['pricing', 'Pricing'], ['implementation', 'Implementation'], ['security', 'Security'], ['contract', 'Contract length']];

function highlight(text, words) {
  if (!words.length) return text;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

export default function CiMock({ page }) {
  const [query, setQuery] = useState('pricing');
  const [queue, setQueue] = useState('All');
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);

  const results = useMemo(() => CALLS.filter((c) => {
    if (queue !== 'All' && c.q !== queue) return false;
    const hay = `${c.text} ${c.title}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  }), [queue, words.join(' ')]); // eslint-disable-line react-hooks/exhaustive-deps

  const hits = results.reduce((n, c) => n + words.reduce((m, w) => m + (c.text.toLowerCase().split(w).length - 1), 0), 0);
  const counts = TOP.map(([w]) => CALLS.filter((c) => c.text.toLowerCase().includes(w)).length);

  return (
    <div className="cim" role="region" aria-label="Interactive transcript search">
      <div className="cim-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="cim-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Transcript archive
        </span>
        <span className="cim-meta">8,412 calls · Q1</span>
      </div>

      <label className="cim-search">
        <i className="ri-search-2-line" aria-hidden="true"></i>
        <input value={query} onChange={(e) => setQuery(e.target.value.slice(0, 40))} placeholder="Search every conversation…" aria-label="Search transcripts" />
        <em>0.4s</em>
      </label>

      <div className="cim-bar">
        <div className="cim-queues" role="group" aria-label="Queue">
          {QUEUES.map((q) => <button key={q} type="button" className={queue === q ? 'is-on' : ''} aria-pressed={queue === q} onClick={() => setQueue(q)}>{q}</button>)}
        </div>
        <span className="cim-count" aria-live="polite">
          {words.length ? `${hits} ${hits === 1 ? 'match' : 'matches'} · ` : ''}{results.length} {results.length === 1 ? 'call' : 'calls'}
        </span>
      </div>

      <ul className="cim-list" data-lenis-prevent>
        {results.map((c) => (
          <li key={c.id} className="cim-row">
            <div className="cim-row-top">
              <span className={`cim-mood cim-mood--${c.mood}`}>{c.mood === 'neg' ? 'Negative' : c.mood === 'pos' ? 'Positive' : 'Neutral'}</span>
              <b>{c.title}</b>
              <em>{c.dur}</em>
            </div>
            <p>“{highlight(c.text, words)}”</p>
            <span className="cim-row-meta">{c.id} · {c.who} · {c.at}</span>
          </li>
        ))}
        {results.length === 0 && <li className="cim-none">No conversations match “{query}”{queue !== 'All' ? ` in ${queue}` : ''}.</li>}
      </ul>

      <div className="cim-top">
        <span><i className="ri-bubble-chart-line" aria-hidden="true"></i>Top objections</span>
        {TOP.map(([w, l], i) => (
          <button key={w} type="button" className={query.toLowerCase() === w ? 'is-on' : ''} onClick={() => { setQuery(w); setQueue('All'); }}>
            {l}<b>{counts[i]}</b>
          </button>
        ))}
      </div>
    </div>
  );
}
