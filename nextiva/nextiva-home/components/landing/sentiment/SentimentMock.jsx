'use client';
/* Working hero mockup for the AI Sentiment page: a call's sentiment drawn
   live. The line plays across the call with the customer's words pinned to
   it; when the score falls to the threshold the call is auto-routed to a
   senior agent. Drag the threshold to see when routing fires — or doesn't. */
import { useEffect, useState } from 'react';

// [minute, score, quote?, label?]
const PTS = [
  [0, 22], [0.6, 8], [1.2, -42, 'I’ve been on hold for twenty minutes…', 'Frustrated'],
  [1.8, -61], [2.2, -78, 'Just cancel my account.', 'At risk'], [2.7, -52], [3.2, -12],
  [3.8, 18, 'OK — that’s actually fair.', 'Recovering'], [4.6, 44], [5.4, 71, 'Thanks, that worked!', 'Happy close'], [6, 66],
];
const W = 460;
const H = 150;
const PAD = 8;
const X = (m) => Math.round(PAD + (m / 6) * (W - PAD * 2));
const Y = (v) => Math.round(PAD + ((100 - v) / 200) * (H - PAD * 2));
const DURATION = 9000;
const TICK = 100;

const mmss = (m) => {
  const s = Math.round(m * 60);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};
const tone = (v) => (v <= -40 ? 'bad' : v < 10 ? 'mid' : 'good');

export default function SentimentMock({ page }) {
  const [t, setT] = useState(0); // 0..1 progress through the call
  const [th, setTh] = useState(-60);

  useEffect(() => {
    if (t >= 1) return undefined;
    const id = setTimeout(() => setT((x) => Math.min(1, Math.round((x + TICK / DURATION) * 1000) / 1000)), TICK);
    return () => clearTimeout(id);
  }, [t]);

  const now = t * 6;
  // Points up to now, plus an interpolated head point.
  const seen = PTS.filter((p) => p[0] <= now);
  const next = PTS.find((p) => p[0] > now);
  const last = seen[seen.length - 1];
  let headV = last[1];
  if (next && t < 1) {
    const f = (now - last[0]) / (next[0] - last[0]);
    headV = Math.round(last[1] + (next[1] - last[1]) * f);
  }
  const line = [...seen.map((p) => [X(p[0]), Y(p[1])]), ...(next && t < 1 ? [[X(now), Y(headV)]] : [])];
  const d = line.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
  const area = line.length > 1 ? `${d} L${line[line.length - 1][0]} ${Y(-100)} L${line[0][0]} ${Y(-100)} Z` : '';

  const breach = PTS.find((p) => p[1] <= th);
  const routed = breach && breach[0] <= now;
  const quotes = PTS.filter((p) => p[2] && p[0] <= now);
  const low = Math.min(...seen.map((p) => p[1]), headV);

  return (
    <div className="sem" role="region" aria-label="Live sentiment on a call">
      <div className="sem-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="sem-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Live sentiment · Billing
        </span>
        <span className={`sem-now sem-now--${tone(headV)}`}>Now {headV > 0 ? '+' : ''}{headV}</span>
      </div>

      <div className="sem-chart">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sem-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8b5cf6" stopOpacity=".28" />
              <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line className="sem-zero" x1={PAD} x2={W - PAD} y1={Y(0)} y2={Y(0)} />
          <rect className="sem-danger" x={PAD} width={W - PAD * 2} y={Y(th)} height={Y(-100) - Y(th)} />
          <line className="sem-th" x1={PAD} x2={W - PAD} y1={Y(th)} y2={Y(th)} />
          {area && <path className="sem-area" d={area} />}
          {d && <path className="sem-line" d={d} />}
          {quotes.map((p) => <circle key={p[0]} className={`sem-pin sem-pin--${tone(p[1])}`} cx={X(p[0])} cy={Y(p[1])} r="4" />)}
          {routed && <line className="sem-route" x1={X(breach[0])} x2={X(breach[0])} y1={PAD} y2={H - PAD} />}
          {t < 1 && <circle className="sem-head-dot" cx={X(now)} cy={Y(headV)} r="4.5" />}
        </svg>
        <span className="sem-axis sem-axis--top">+100</span>
        <span className="sem-axis sem-axis--mid">0</span>
        <span className="sem-axis sem-axis--th" style={{ top: `${Math.round((Y(th) / H) * 100)}%` }}>{th}</span>
      </div>

      <ol className="sem-quotes" aria-live="polite">
        {quotes.slice(-2).map((p) => (
          <li key={p[0]} className={`sem-q sem-q--${tone(p[1])}`}>
            <em>{mmss(p[0])} · {p[3]}</em>
            <span>“{p[2]}”</span>
            <b>{p[1] > 0 ? '+' : ''}{p[1]}</b>
          </li>
        ))}
        {quotes.length === 0 && <li className="sem-q sem-q--wait"><span>Listening… scoring every sentence as it’s spoken.</span></li>}
      </ol>

      <div className={`sem-route-bar${routed ? ' is-on' : ''}`} aria-live="polite">
        <i className={routed ? 'ri-route-fill' : 'ri-shield-check-line'} aria-hidden="true"></i>
        {routed
          ? <span><b>Auto-routed → Senior agent</b> at {mmss(breach[0])} · score {breach[1]}</span>
          : <span>{breach ? `Watching · routes if score hits ${th}` : `No routing — lowest point (${low}) stayed above ${th}`}</span>}
      </div>

      <div className="sem-ctrl">
        <label>
          <span>Route at</span>
          <input type="range" min="-90" max="-30" step="5" value={th} onChange={(e) => setTh(Number(e.target.value))} aria-label="Routing threshold" />
          <b>{th}</b>
        </label>
        <button type="button" onClick={() => setT(0)}><i className="ri-restart-line" aria-hidden="true"></i>Replay</button>
      </div>
    </div>
  );
}
