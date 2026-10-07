'use client';
/* Toll-free page sections (TollFreePage.jsx):
   - VanityTranslator: a word turns into keypad digits letter by letter,
                       the matching key lighting on a glass keypad;
   - UsageChart:       a month of inbound minutes against the allowance,
                       with the 80 / 90 / 100% alerts;
   - Placements:       where a toll-free number shows up — website header,
                       radio spot, help page, billboard vs. TV.
   Each steps on its own and pauses only while the visitor is actively
   using it (useIntentPause). Fixed heights, so nothing moves the page.
   Sample numbers, names and counts only. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';
import { toDigits } from './TollFreeMock';

function useMotion() {
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  return [paused || still, still, bind];
}

/* ── Vanity: word → number ─────────────────────────────────────────────── */
const KEYS = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'], ['*', ''], ['0', '+'], ['#', '']];
const WORDS = [['800', 'GO-NORTH'], ['888', 'PLUMBER'], ['833', 'TAXICAB'], ['877', 'HOMEFIX']];
const LETTER_MS = 420;
const HOLD_MS = 2200;

export function VanityTranslator({ data }) {
  const [w, setW] = useState(0);
  const [k, setK] = useState(0); // letters converted so far
  const [stop, still, bind] = useMotion();
  const [prefix, word] = WORDS[w];
  const letters = word.replace(/[^A-Z]/g, '').slice(0, 7).split('');
  const digits = toDigits(letters.join('')).split('');

  useEffect(() => { if (still) setK(letters.length); }, [still, letters.length]);
  useEffect(() => {
    if (stop) return undefined;
    const t = setTimeout(() => {
      if (k < letters.length) setK(k + 1);
      else { setK(0); setW((x) => (x + 1) % WORDS.length); }
    }, k < letters.length ? LETTER_MS : HOLD_MS);
    return () => clearTimeout(t);
  }, [k, stop, letters.length]);

  const lit = k > 0 && k <= letters.length ? digits[k - 1] : null;
  const pick = (i) => { setW(i); setK(0); };
  const pretty = `${digits.slice(0, 3).join('')}-${digits.slice(3).join('')}`;

  return (
    <section className="lp-section lp-section--theme tvt-sec">
      <div className="lp-wrap tvt">
        <div className="tvt-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <div className="tvt-words" role="group" aria-label="Example words">
            {WORDS.map(([p, x], i) => (
              <button type="button" key={x} className={i === w ? 'is-on' : undefined} onClick={() => pick(i)} aria-pressed={i === w}>
                1-{p}-{x}
              </button>
            ))}
          </div>
        </div>

        <div className="tvt-stage reveal reveal-delay-1" aria-hidden="true" {...bind}>
          <div className="tvt-card">
            <span className="tvt-k">Your vanity number</span>
            <div className="tvt-line">
              <span className="tvt-pre">1-{prefix}-</span>
              {letters.map((c, i) => (
                <span key={`${word}-${i}`} className={`tvt-tile${i < k ? ' is-done' : ''}${i === k - 1 ? ' is-now' : ''}`}>
                  <b>{c}</b><em>{digits[i]}</em>
                </span>
              ))}
            </div>
            <div className="tvt-result">
              <span>Dials as</span>
              <b className={k >= letters.length ? 'is-done' : undefined}>1 ({prefix}) {k >= letters.length ? pretty : '•••-••••'}</b>
            </div>
          </div>
          <div className="tvt-pad">
            {KEYS.map(([d, l]) => (
              <span key={d} className={`tvt-key${lit === d ? ' is-lit' : ''}${digits.includes(d) ? ' is-used' : ''}`}>
                <b>{d}</b>{l && <em>{l}</em>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Inbound minutes: a month against the allowance ───────────────────── */
const ALLOW = 5000;
const DAYS = 30;
// Weekdays busier than weekends; ends the month at ~94% of the allowance.
const CUM = (() => {
  let t = 0;
  return Array.from({ length: DAYS }, (_, i) => { t += (i % 7 < 5 ? 185 : 85); return t; });
})();
const ALERTS = [80, 90, 100].map((p) => ({ p, day: CUM.findIndex((v) => v >= (ALLOW * p) / 100) + 1 }));
const DAY_MS = 260;
const END_HOLD_MS = 2400;
const W = 600;
const H = 220;
const X = (d) => 20 + ((d - 1) / (DAYS - 1)) * (W - 40);
const Y = (m) => H - 20 - (m / (ALLOW * 1.08)) * (H - 40);

export function UsageChart({ data }) {
  const [day, setDay] = useState(1);
  const [stop, still, bind] = useMotion();
  useEffect(() => { if (still) setDay(DAYS); }, [still]);
  useEffect(() => {
    if (stop) return undefined;
    const t = setTimeout(() => setDay((d) => (d >= DAYS ? 1 : d + 1)), day >= DAYS ? END_HOLD_MS : DAY_MS);
    return () => clearTimeout(t);
  }, [day, stop]);

  const used = CUM[day - 1];
  const pct = Math.round((used / ALLOW) * 100);
  const projected = Math.round((used / day) * DAYS);
  const path = CUM.slice(0, day).map((v, i) => `${i ? 'L' : 'M'}${X(i + 1).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  const area = `${path} L${X(day).toFixed(1)} ${H - 20} L${X(1)} ${H - 20} Z`;

  return (
    <section className="lp-section tuc-sec">
      <div className="lp-wrap tuc">
        <div className="tuc-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="tuc-points">
            {data.points.map((p) => <li key={p}><i className="ri-check-line" aria-hidden="true"></i>{p}</li>)}
          </ul>
        </div>

        <div className="tuc-panel reveal reveal-delay-1" aria-hidden="true" {...bind}>
          <div className="tuc-top">
            <span className="tuc-title"><i className="ri-phone-line"></i>Inbound toll-free · June</span>
            <span className="tuc-day">Day {day} of {DAYS}</span>
          </div>
          <div className="tuc-stats">
            <span><em>Used</em><b>{used.toLocaleString('en-US')}</b><small>{pct}% of {ALLOW.toLocaleString('en-US')} min</small></span>
            <span><em>Remaining</em><b>{Math.max(0, ALLOW - used).toLocaleString('en-US')}</b><small>minutes this month</small></span>
            <span><em>Projected</em><b>{Math.round((projected / ALLOW) * 100)}%</b><small>by the 30th</small></span>
          </div>
          <svg className="tuc-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="tuc-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ea580c" stopOpacity=".28" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[80, 90, 100].map((p) => (
              <g key={p} className={`tuc-th${p === 100 ? ' is-max' : ''}`}>
                <line x1="20" x2={W - 20} y1={Y((ALLOW * p) / 100)} y2={Y((ALLOW * p) / 100)} />
                <text x={W - 22} y={Y((ALLOW * p) / 100) - 5} textAnchor="end">{p === 100 ? 'Allowance' : `${p}%`}</text>
              </g>
            ))}
            <path d={area} fill="url(#tuc-fill)" />
            <path d={path} className="tuc-line" />
            <circle cx={X(day)} cy={Y(used)} r="5" className="tuc-dot" />
          </svg>
          <div className="tuc-alerts">
            {ALERTS.map(({ p, day: d }) => {
              const sent = d > 0 && day >= d;
              return (
                <span key={p} className={`tuc-alert${sent ? ' is-sent' : ''}`}>
                  <i className={sent ? 'ri-notification-3-fill' : 'ri-notification-3-line'}></i>
                  <b>{p}% alert</b>
                  <em>{d <= 0 ? 'Not reached' : sent ? `Sent · day ${d}` : 'Waiting'}</em>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Use cases: where the number shows up ──────────────────────────────── */
const BILLBOARD = 'https://images.unsplash.com/photo-1511497584788-876760111969?fm=jpg&q=72&w=1400&auto=format&fit=crop';
const PLACE = { 'Help page': 'help', 'Radio spot': 'radio', 'Website header': 'web', 'Billboard vs. TV': 'board' };

function Scene({ kind, a }) {
  if (kind === 'web') {
    return (
      <div className="tpl-browser">
        <div className="tpl-chrome"><i></i><i></i><i></i><span>brightfield.example</span></div>
        <div className="tpl-nav"><b>BrightField</b><span>Services</span><span>Pricing</span><span>About</span><span className="tpl-callbtn"><i className="ri-phone-fill"></i>Call free {a.number}</span></div>
        <div className="tpl-hero"><span className="tpl-h"></span><span className="tpl-h tpl-h--s"></span><span className="tpl-p"></span><span className="tpl-p tpl-p--s"></span></div>
      </div>
    );
  }
  if (kind === 'radio') {
    return (
      <div className="tpl-radio">
        <div className="tpl-r-top">
          <span className="tpl-r-art"><i className="ri-radio-2-fill"></i></span>
          <span className="tpl-r-meta"><em>Now playing · 98.4 FM Morning Drive</em><b>BrightField — 30-second spot</b></span>
          <span className="tpl-r-live"><i></i>On air</span>
        </div>
        <span className="tpl-r-wave">{Array.from({ length: 48 }, (_, i) => <i key={i} className={i < 38 ? 'on' : undefined} style={{ '--h': `${28 + Math.round(Math.abs(Math.sin(i * 0.55)) * 62)}%` }}></i>)}</span>
        <span className="tpl-r-times"><b>0:24</b><em>0:30</em></span>
        <blockquote className="tpl-r-quote"><i className="ri-double-quotes-l"></i>…so whatever the job, call free on <b>{a.number}</b>. That’s {a.number}.</blockquote>
        <div className="tpl-r-ctrls"><i className="ri-replay-10-line"></i><span className="tpl-r-play"><i className="ri-pause-fill"></i></span><i className="ri-forward-10-line"></i></div>
      </div>
    );
  }
  if (kind === 'help') {
    return (
      <div className="tpl-browser">
        <div className="tpl-chrome"><i></i><i></i><i></i><span>help.brightfield.example</span></div>
        <div className="tpl-help">
          <b>Still need help?</b>
          <p>Our team is here every day, 8 am – 8 pm.</p>
          <span className="tpl-helpcard"><i className="ri-customer-service-2-line"></i><span><em>Call free</em><b>{a.number}</b></span></span>
          <span className="tpl-helprow"><i className="ri-chat-3-line"></i>Or text us on the same number</span>
        </div>
      </div>
    );
  }
  return (
    <div className="tpl-board" style={{ backgroundImage: `url(${BILLBOARD})` }}>
      {/* A roadside billboard: lamp bar, framed ad, two posts. */}
      <div className="tpl-bb">
        <span className="tpl-bb-lamps"><i></i><i></i><i></i></span>
        <div className="tpl-bb-ad">
          <span className="tpl-bb-brand"><i className="ri-leaf-fill"></i>BrightField</span>
          <b className="tpl-bb-head">Leaks fixed today.</b>
          <span className="tpl-bb-call"><em>Call free</em><b>{a.number}</b></span>
        </div>
        <span className="tpl-bb-posts"><i></i><i></i></span>
      </div>
      {/* Each channel gets its own number, so calls are counted per source. */}
      <div className="tpl-calls">
        <span className="tpl-calls-h"><b>Calls by source</b><em>This week</em></span>
        {[['ri-road-map-line', 'Billboard', a.number, 128], ['ri-tv-2-line', 'TV spot', '1 (833) 561-0091', 96]].map(([ic, n, num, c]) => (
          <span className="tpl-calls-row" key={n}>
            <i className={ic}></i>
            <span className="tpl-calls-t"><b>{n}</b><em>{num}</em></span>
            <span className="tpl-calls-bar"><i style={{ width: `${(c / 128) * 100}%` }}></i></span>
            <b className="tpl-calls-n">{c}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Placements({ page }) {
  const items = page.audience.filter((a) => PLACE[a.where]);
  const [i, setI] = useState(0);
  const [stop, , bind] = useMotion();
  useEffect(() => {
    if (stop) return undefined;
    const t = setTimeout(() => setI((x) => (x + 1) % items.length), 3000);
    return () => clearTimeout(t);
  }, [i, stop, items.length]);
  const a = items[i];

  return (
    <section className="lp-section tpl-sec">
      <div className="lp-wrap">
        <div className="tpl-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="tpl reveal" {...bind}>
          <ul className="tpl-list">
            {items.map((x, k) => (
              <li key={x.title}>
                <button type="button" className={k === i ? 'is-on' : undefined} onClick={() => setI(k)} aria-pressed={k === i}>
                  <span className="tpl-ic"><i className={x.icon} aria-hidden="true"></i></span>
                  <span className="tpl-t"><b>{x.title}</b><em>{x.text}</em></span>
                  <span className="tpl-where">{x.where}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="tpl-stage" aria-hidden="true">
            <div className="tpl-scene" key={a.title}><Scene kind={PLACE[a.where]} a={a} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
