'use client';
/* Interactive sections for the AI Sentiment page:
   - ChannelScorer: a sample message per channel with its score, plus a box
     to type your own (a small word-list scorer for the demo — the real model
     reads context, not keywords).
   - Heatmap: sentiment by agent and hour; select a cell for its details. */
import { useState } from 'react';

/* ── Channel scorer ───────────────────────────────────────────────────── */
const CHANNELS = [
  { id: 'voice', label: 'Voice', icon: 'ri-phone-fill', from: 'Caller · 02:14', text: 'I’ve been on hold for twenty minutes and I still don’t have my refund.', score: -58 },
  { id: 'chat', label: 'Chat', icon: 'ri-chat-3-fill', from: 'Website chat', text: 'Okay, that makes sense — thanks for walking me through it.', score: 42 },
  { id: 'sms', label: 'SMS', icon: 'ri-message-2-fill', from: '+1 (415) 555-0182', text: 'Delivery was late again. Third time this month.', score: -46 },
  { id: 'wa', label: 'WhatsApp', icon: 'ri-whatsapp-fill', from: 'WhatsApp', text: 'Perfect, it works now! You guys are great 🙌', score: 78 },
  { id: 'ig', label: 'Instagram', icon: 'ri-instagram-fill', from: 'Instagram DM', text: 'Is anyone actually reading these?? Ordered two weeks ago.', score: -52 },
  { id: 'email', label: 'Email', icon: 'ri-mail-fill', from: 'Email · billing@', text: 'Could you confirm the new invoice date? No rush.', score: 6 },
];
const WORDS = {
  cancel: -40, hold: -15, waiting: -15, wait: -10, angry: -40, frustrated: -35, frustrating: -35, terrible: -45, awful: -45, worst: -50,
  refund: -12, never: -15, still: -10, ridiculous: -40, disappointed: -35, wrong: -20, broken: -25, late: -15, problem: -15, issue: -10,
  useless: -45, rude: -40, unacceptable: -45, again: -8, hate: -50,
  thanks: 30, thank: 30, great: 35, perfect: 40, love: 40, awesome: 40, fair: 20, good: 20, helpful: 30, resolved: 30, works: 20,
  worked: 25, happy: 35, appreciate: 30, amazing: 40, excellent: 40, quick: 15, easy: 20, sorted: 25,
};
const EMOJI = { '😡': -40, '😠': -35, '😤': -25, '🙄': -20, '😊': 25, '🙏': 20, '🙌': 25, '❤️': 30, '👍': 20 };

function scoreText(text) {
  let s = 0;
  const t = text.toLowerCase();
  (t.match(/[a-z']+/g) || []).forEach((w) => { s += WORDS[w] || 0; });
  Object.entries(EMOJI).forEach(([e, v]) => { if (text.includes(e)) s += v; });
  if (/\?\?|!!/.test(text)) s -= 10;
  return Math.max(-100, Math.min(100, s));
}
const label = (v) => (v <= -50 ? 'At risk' : v <= -20 ? 'Frustrated' : v < 20 ? 'Neutral' : v < 55 ? 'Positive' : 'Delighted');
const tone = (v) => (v <= -20 ? 'bad' : v < 20 ? 'mid' : 'good');

export function ChannelScorer({ data }) {
  const [ch, setCh] = useState('voice');
  const [own, setOwn] = useState('');
  const c = CHANNELS.find((x) => x.id === ch);
  const typing = own.trim().length > 0;
  const v = typing ? scoreText(own) : c.score;

  return (
    <section className="lp-section se-ch-sec">
      <div className="lp-wrap">
        <div className="se-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="se-ch reveal reveal-delay-1">
          <div className="se-ch-tabs" role="tablist" aria-label="Channel">
            {CHANNELS.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={!typing && ch === x.id} className={!typing && ch === x.id ? 'is-on' : ''} onClick={() => { setOwn(''); setCh(x.id); }}>
                <i className={x.icon} aria-hidden="true"></i>{x.label}
              </button>
            ))}
          </div>
          <div className="se-ch-body">
            <div className={`se-ch-msg se-ch-msg--${typing ? 'own' : c.id}`} key={typing ? 'own' : c.id}>
              <span className="se-ch-from"><i className={typing ? 'ri-edit-line' : c.icon} aria-hidden="true"></i>{typing ? 'Your message' : c.from}</span>
              <p>{typing ? own : c.text}</p>
            </div>
            <div className={`se-gauge se-gauge--${tone(v)}`} aria-live="polite">
              <div className="se-gauge-top"><b>{v > 0 ? '+' : ''}{v}</b><span>{label(v)}</span></div>
              <div className="se-gauge-bar"><i style={{ left: `${(v + 100) / 2}%` }}></i></div>
              <div className="se-gauge-scale"><span>−100</span><span>0</span><span>+100</span></div>
            </div>
          </div>
          <label className="se-ch-try">
            <i className="ri-keyboard-line" aria-hidden="true"></i>
            <input value={own} onChange={(e) => setOwn(e.target.value.slice(0, 160))} placeholder="Type a customer message to score it…" aria-label="Type a message to score" />
          </label>
          <p className="se-ch-note">Demo scorer uses a word list. The real model reads context, sarcasm and tone of voice.</p>
        </div>
      </div>
    </section>
  );
}

/* ── Heatmap ──────────────────────────────────────────────────────────── */
const AGENTS = ['Marisol R.', 'Devon K.', 'Aiko T.', 'Priya S.', 'Leo M.', 'Hana W.'];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const REASONS = ['long hold times', 'billing confusion', 'delivery delays', 'quick resolutions', 'friendly hand-offs', 'refund wait'];
// Deterministic example scores (−100..100) so server and client agree.
const cell = (a, h) => {
  const base = [18, -6, 32, 10, -14, 24][a];
  const dip = h === 12 || h === 13 ? -34 : h === 16 ? -18 : 0;
  const wob = [6, -4, 9, -2, 4, -8, 3, 7, -5][HOURS.indexOf(h)] * ((a % 3) - 1);
  return Math.max(-90, Math.min(90, base + dip + wob));
};
const shade = (v) => (v <= -30 ? 'n3' : v <= -10 ? 'n2' : v < 10 ? 'z' : v < 30 ? 'p2' : 'p3');

export function Heatmap({ data }) {
  const [sel, setSel] = useState([1, 12]);
  const v = cell(sel[0], sel[1]);
  const conv = 8 + ((sel[0] * 7 + sel[1] * 3) % 17);
  const reason = v < 0 ? REASONS[(sel[0] + sel[1]) % 3 === 0 ? 0 : (sel[0] + sel[1]) % 3 === 1 ? 1 : 5] : REASONS[3 + ((sel[0] + sel[1]) % 2)];

  return (
    <section className="lp-section lp-section--theme se-heat-sec">
      <div className="lp-wrap">
        <div className="se-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="se-heat reveal reveal-delay-1">
          <div className="se-grid" role="grid" aria-label="Sentiment by agent and hour">
            <span className="se-grid-corner">Agent · hour</span>
            {HOURS.map((h) => <span key={h} className="se-grid-h">{h > 12 ? `${h - 12}p` : `${h}${h === 12 ? 'p' : 'a'}`}</span>)}
            {AGENTS.map((a, ai) => (
              <div key={a} className="se-grid-row" role="row">
                <span className="se-grid-agent">{a}</span>
                {HOURS.map((h) => {
                  const val = cell(ai, h);
                  const on = sel[0] === ai && sel[1] === h;
                  return (
                    <button key={h} type="button" role="gridcell" className={`se-cell se-cell--${shade(val)}${on ? ' is-on' : ''}`} onClick={() => setSel([ai, h])} aria-label={`${a}, ${h}:00, score ${val}`} aria-selected={on}>
                      <span>{val > 0 ? '+' : ''}{val}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className={`se-heat-detail se-heat-detail--${tone(v)}`} aria-live="polite">
            <span className="se-heat-k">{AGENTS[sel[0]]} · {sel[1]}:00–{sel[1] + 1}:00</span>
            <b>{v > 0 ? '+' : ''}{v}</b>
            <span className="se-heat-l">{label(v)} · {conv} conversations</span>
            <p>Most mentioned: <strong>{reason}</strong></p>
            <span className="se-heat-tip"><i className="ri-lightbulb-flash-line" aria-hidden="true"></i>{v < 0 ? 'Lunchtime dips show up across the team — a staffing pattern, not one agent.' : 'Strong hour — worth sharing as a coaching example.'}</span>
          </div>
          <div className="se-legend" aria-hidden="true"><span>At risk</span><i className="se-cell--n3"></i><i className="se-cell--n2"></i><i className="se-cell--z"></i><i className="se-cell--p2"></i><i className="se-cell--p3"></i><span>Delighted</span><em>Example data</em></div>
        </div>
      </div>
    </section>
  );
}
