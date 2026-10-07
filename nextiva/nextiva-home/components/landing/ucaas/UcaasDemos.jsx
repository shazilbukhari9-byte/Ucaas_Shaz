'use client';
/* Interactive sections for the UCaaS overview:
   - WhyUnify: the same customer story as separate tools vs one platform.
   - Catalog: every feature once, grouped by category.
   - GlobalTeam: drag the clock; offices open and close and calls route to
     whoever is working (follow the sun).
   - ScaleSlider: drag team size; channels and controls switch on as you grow. */
import { useEffect, useRef, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

/* ── Why unify ────────────────────────────────────────────────────────── */
const SPLIT = [
  { app: 'Phone app', icon: 'ri-phone-line', at: '09:12', line: 'Missed call · +44 20…', note: 'No idea who this is' },
  { app: 'Texting tool', icon: 'ri-message-2-line', at: '09:14', line: '“Can you text the pricing?”', note: 'Different agent' },
  { app: 'Video app', icon: 'ri-vidicon-line', at: '10:00', line: 'Meeting · 18 min', note: 'Notes in someone’s inbox' },
];
// The same story on one platform, card for card against SPLIT: channel,
// what happened, and what the team now knows (green, not a question).
const ONE = [
  { icon: 'ri-phone-fill', tone: 'blue', ch: 'Voice', at: '09:12', line: 'Missed call → voicemail', note: 'Transcribed into the thread' },
  { icon: 'ri-message-2-fill', tone: 'teal', ch: 'SMS', at: '09:14', line: 'Pricing sent by text', note: 'Delivered · read' },
  { icon: 'ri-vidicon-fill', tone: 'violet', ch: 'Video', at: '10:00', line: 'Video call · 18 min', note: 'AI summary attached' },
  { icon: 'ri-discuss-fill', tone: 'amber', ch: 'Team chat', at: '10:21', line: 'Handed to Diego', note: 'Full context, no re-asking' },
];

export function WhyUnify({ data }) {
  const [unified, setUnified] = useState(true);
  return (
    <section className="lp-section uc-why-sec">
      <div className="lp-wrap">
        <div className="uc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="uc-why reveal reveal-delay-1">
          <div className="uc-why-toggle" role="group" aria-label="Compare">
            <button type="button" className={!unified ? 'is-on' : ''} aria-pressed={!unified} onClick={() => setUnified(false)}>Separate tools</button>
            <button type="button" className={unified ? 'is-on' : ''} aria-pressed={unified} onClick={() => setUnified(true)}>One platform</button>
          </div>

          {unified ? (
            <div className="uc-why-one" key="one">
              <div className="uc-why-one-head">
                <span className="uc-why-av">SC</span>
                <span className="uc-why-who"><b>Sarah Chen</b><small>Same contact on every channel</small></span>
                <em><i className="ri-links-line" aria-hidden="true"></i>1 thread · 4 channels</em>
              </div>
              <ol className="uc-why-flow">
                {ONE.map((x, n) => (
                  <li key={x.line} className={`uc-why-card lp-tone--${x.tone}`} style={{ '--i': n }}>
                    <span className="uc-why-dot" aria-hidden="true"><i className={x.icon}></i></span>
                    <span className="uc-why-card-top">{x.ch}<time>{x.at}</time></span>
                    <span className="uc-why-card-line">{x.line}</span>
                    <span className="uc-why-card-note"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{x.note}</span>
                  </li>
                ))}
              </ol>
              <div className="uc-why-one-foot"><i className="ri-shield-check-line" aria-hidden="true"></i>One history, one owner — whoever picks up sees everything that came before.</div>
            </div>
          ) : (
            <div className="uc-why-split" key="split">
              <div className="uc-why-split-head">
                <span className="uc-why-av uc-why-av--unknown"><i className="ri-question-mark" aria-hidden="true"></i></span>
                <span className="uc-why-who"><b>Unknown caller</b><small>A new record in every app</small></span>
                <em><i className="ri-link-unlink" aria-hidden="true"></i>3 apps · 3 histories</em>
              </div>
              <div className="uc-why-split-flow">
                {SPLIT.map((x, n) => (
                  <div key={x.app} className="uc-why-app" style={{ '--i': n }}>
                    <span className="uc-why-app-dot" aria-hidden="true"><i className={x.icon}></i></span>
                    <span className="uc-why-app-top">{x.app}<time>{x.at}</time></span>
                    <span className="uc-why-app-line">{x.line}</span>
                    <span className="uc-why-app-note"><i className="ri-question-line" aria-hidden="true"></i>{x.note}</span>
                  </div>
                ))}
              </div>
              <div className="uc-why-split-foot"><i className="ri-error-warning-line" aria-hidden="true"></i>Nothing connects — the customer repeats themselves at every step.</div>
            </div>
          )}
        </div>

        <div className="uc-pillars">
          {data.pillars.map((p, i) => (
            <article key={p.title} className={`uc-pillar reveal reveal-delay-${i + 1}`}>
              <span className="uc-pillar-ic"><i className={p.icon} aria-hidden="true"></i></span>
              <h3 className="uc-pillar-title">{p.title}</h3>
              <p className="uc-pillar-text">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Feature catalog ──────────────────────────────────────────────────── */
// Steps through the categories on its own every CAT_MS; a tap jumps there
// and the tour carries on. Pauses only while the visitor is using it.
const CAT_MS = 3000;
// A nature photo behind the catalog frame, one per category (Unsplash, free
// licence, from the Unsplash CDN); they cross-fade as the category changes.
const CAT_SCENES = {
  voice: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=72&w=2000&auto=format&fit=crop',
  msg: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?fm=jpg&q=72&w=2000&auto=format&fit=crop',
  collab: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?fm=jpg&q=72&w=2000&auto=format&fit=crop',
  ai: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?fm=jpg&q=72&w=2000&auto=format&fit=crop',
  api: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?fm=jpg&q=72&w=2000&auto=format&fit=crop',
};

export function Catalog({ data }) {
  const [on, setOn] = useState(data.groups[0].id);
  const g = data.groups.find((x) => x.id === on);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  const playing = !paused && !still;
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => {
      const i = data.groups.findIndex((x) => x.id === on);
      setOn(data.groups[(i + 1) % data.groups.length].id);
    }, CAT_MS);
    return () => clearTimeout(t);
  }, [playing, on, data.groups]);
  // Phones: the rail is a sideways strip of chips; keep the chosen one
  // centred. Only the strip scrolls, never the page.
  const railRef = useRef(null);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    const btn = rail.querySelector('.is-on');
    if (!btn) return;
    const box = rail.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    rail.scrollTo({ left: Math.max(0, rail.scrollLeft + (r.left - box.left) - (box.width - r.width) / 2), behavior: 'smooth' });
  }, [on]);
  return (
    <section className="lp-section lp-section--theme uc-cat-sec">
      <div className="lp-wrap">
        <div className="uc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="uc-cat reveal reveal-delay-1" {...bind}>
          <span className="uc-cat-bg" aria-hidden="true">
            {data.groups.map((x) => (
              <i key={x.id} className={on === x.id ? 'is-on' : ''} style={CAT_SCENES[x.id] ? { backgroundImage: `url(${CAT_SCENES[x.id]})` } : undefined}></i>
            ))}
          </span>
          <div className="uc-cat-rail" ref={railRef} role="tablist" aria-label="Feature categories">
            {data.groups.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={on === x.id} className={`uc-cat-tab lp-tone--${x.tone}${on === x.id ? ' is-on' : ''}`} onClick={() => setOn(x.id)}>
                <span className="uc-cat-ic"><i className={x.icon} aria-hidden="true"></i></span>
                <span className="uc-cat-label">{x.label}</span>
                <em>{x.items.length}</em>
                {on === x.id && playing && <span className="uc-cat-progress" aria-hidden="true"></span>}
              </button>
            ))}
          </div>
          <div className={`uc-cat-panel lp-tone--${g.tone}`} role="tabpanel" key={g.id}>
            <i className={`${g.icon} uc-cat-mark`} aria-hidden="true"></i>
            <div className="uc-cat-panel-head">
              <span className="uc-cat-ic"><i className={g.icon} aria-hidden="true"></i></span>
              <b>{g.label}</b>
              <em>{g.items.length} features</em>
              {g.blurb && <p className="uc-cat-blurb">{g.blurb}</p>}
              <span className="uc-cat-meta">
                <span><b>{g.items.length}</b> features included</span>
              </span>
            </div>
            <ul className="uc-cat-list">
              {g.items.map((it, n) => (
                <li key={it.t} style={{ '--i': n }}>
                  <i className="ri-check-line" aria-hidden="true"></i>
                  <span>{it.t}</span>
                  {it.href && <a href={it.href} aria-label={`Learn more: ${it.t}`}>Learn more <i className="ri-arrow-right-up-line" aria-hidden="true"></i></a>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Global team, follow the sun ──────────────────────────────────────────
   A follow-the-sun board on one shared UTC timeline: an hour ruler shaded
   night → day → night, each office's working hours drawn where they fall in
   UTC, and a single "now" line through every row — an office is taking calls
   when the line crosses its band. The clock runs by itself (an hour every
   HOUR_MS); clicking the ruler jumps the clock there. */
// Fixed offsets keep this stable on server and client (no live clock).
const OFFICES = [
  { city: 'Toronto', code: 'CA', off: -4, team: 6 },
  { city: 'London', code: 'GB', off: 1, team: 8 },
  { city: 'Lagos', code: 'NG', off: 1, team: 5 },
  { city: 'Dubai', code: 'AE', off: 4, team: 4 },
  { city: 'Manila', code: 'PH', off: 8, team: 9 },
];
const OPEN = 9;
const CLOSE = 18;
const HOUR_MS = 1500;
const fmt = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`;
const wrap = (h) => ((h % 24) + 24) % 24;
// An office's open window in UTC, split in two when it crosses midnight.
const bands = (off) => {
  const from = wrap(OPEN - off);
  const to = from + (CLOSE - OPEN);
  return to <= 24 ? [[from, to]] : [[from, 24], [0, to - 24]];
};

export function GlobalTeam({ data }) {
  const [utc, setUtc] = useState(13);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  const playing = !paused && !still;
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setUtc((h) => (h + 1) % 24), HOUR_MS);
    return () => clearTimeout(t);
  }, [playing, utc]);

  const rows = OFFICES.map((o) => {
    const local = wrap(utc + o.off);
    return { ...o, local, open: local >= OPEN && local < CLOSE };
  });
  const live = rows.filter((r) => r.open);
  const agents = live.reduce((n, r) => n + r.team, 0);
  const day = utc >= 6 && utc < 18;
  const pick = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    setUtc(Math.min(23, Math.max(0, Math.round(((e.clientX - box.left) / box.width) * 24))));
  };

  return (
    <section className="lp-section uc-glo-sec">
      <div className="lp-wrap uc-glo">
        <div className="uc-glo-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="uc-glo-points">
            {data.points.map((p) => <li key={p}><i className="ri-global-line" aria-hidden="true"></i>{p}</li>)}
          </ul>
        </div>

        <div className="uc-glo-card reveal reveal-delay-1" data-wrap={utc === 0 ? '' : undefined} {...bind} style={{ '--now': utc / 24 }}>
          <div className="uc-glo-head">
            <span className="uc-glo-title"><i className="ri-earth-line" aria-hidden="true"></i><b>Follow the sun</b><small>Support team · one console</small></span>
            <em className={day ? 'is-day' : 'is-night'}><i className={day ? 'ri-sun-line' : 'ri-moon-clear-line'} aria-hidden="true"></i>{fmt(utc)} UTC</em>
          </div>

          <div className="uc-glo-grid">
            <div className="uc-glo-ruler-row">
              <span className="uc-glo-ruler-label">Office</span>
              <button type="button" className="uc-glo-ruler" onClick={pick} aria-label="Set the clock">
                {[0, 6, 12, 18, 24].map((h) => <span key={h} style={{ left: `${(h / 24) * 100}%` }}>{String(h).padStart(2, '0')}</span>)}
              </button>
              <span className="uc-glo-ruler-label uc-glo-ruler-label--end">Status</span>
            </div>
            <ul className="uc-glo-rows">
              {rows.map((r) => (
                <li key={r.city} className={r.open ? 'is-open' : ''}>
                  <span className="uc-glo-code" aria-hidden="true">{r.code}</span>
                  <span className="uc-glo-city"><b>{r.city}</b><em>{fmt(r.local)} local · {r.team} agents</em></span>
                  <span className="uc-glo-track" aria-hidden="true">
                    {bands(r.off).map(([x, y]) => (
                      <i key={x} style={{ left: `${(x / 24) * 100}%`, width: `${((y - x) / 24) * 100}%` }}></i>
                    ))}
                    <b></b>
                  </span>
                  <span className="uc-glo-state"><i aria-hidden="true"></i>{r.open ? 'Live' : 'Closed'}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="uc-glo-route" aria-live="polite">
            <i className="ri-route-line" aria-hidden="true"></i>
            {live.length
              ? <span>Calls route to <b>{live.map((r) => r.city).join(', ')}</b></span>
              : <span>Every office is closed — calls go to the <b>AI receptionist</b></span>}
            <em>{live.length ? `${agents} agents online` : 'AI on duty'}</em>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Scale slider ─────────────────────────────────────────────────────── */
const STEPS = [5, 15, 50, 150, 500];
const STAGES = [
  { from: 0, name: 'Small team', note: 'Start with what you need today.' },
  { from: 2, name: 'Growing business', note: 'Add people, numbers and countries — no re-platforming.' },
  { from: 4, name: 'Enterprise', note: 'Controls for large, distributed teams.' },
];
const FEATS = [
  { at: 0, icon: 'ri-phone-line', t: 'Voice & numbers' },
  { at: 0, icon: 'ri-message-2-line', t: 'Business SMS' },
  { at: 1, icon: 'ri-discuss-line', t: 'Team chat' },
  { at: 1, icon: 'ri-vidicon-line', t: 'HD video' },
  { at: 2, icon: 'ri-earth-line', t: 'Numbers in new countries' },
  { at: 2, icon: 'ri-inbox-2-line', t: 'Omnichannel inbox' },
  { at: 3, icon: 'ri-git-branch-line', t: 'Multi-level IVR & queues' },
  { at: 3, icon: 'ri-contacts-book-3-line', t: 'CRM integrations' },
  { at: 4, icon: 'ri-headphone-line', t: 'Listen, whisper, barge' },
  { at: 4, icon: 'ri-shield-user-line', t: 'SSO & multi-site admin' },
];

// Steps up the team sizes on its own every SCALE_MS and wraps back to the
// smallest; dragging or tapping a size jumps there and it carries on.
const SCALE_MS = 3000;

export function ScaleSlider({ data }) {
  const [i, setI] = useState(1);
  const stage = [...STAGES].reverse().find((s) => i >= s.from);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  const playing = !paused && !still;
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setI((n) => (n + 1) % STEPS.length), SCALE_MS);
    return () => clearTimeout(t);
  }, [playing, i]);
  return (
    <section className="lp-section lp-section--theme uc-sc-sec">
      <div className="lp-wrap">
        <div className="uc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        {/* A growth staircase: the stage summary on the left, and one rising
            step per team size on the right listing what it unlocks — steps
            reached are lit, the current one is solid orange, later ones are
            locked. Steps play through on their own; tap one to jump there. */}
        <div className="uc-sc uc-sc--stairs reveal reveal-delay-1" {...bind}>
          <div className="uc-sc-side">
            <span className="uc-sc-kick">Your team today</span>
            <div className="uc-sc-size"><b key={i}>{STEPS[i]}</b><em>people</em></div>
            <b className="uc-sc-name">{stage.name}</b>
            <p className="uc-sc-note">{stage.note}</p>
            <div className="uc-sc-meter" aria-hidden="true"><span style={{ width: `${(FEATS.filter((x) => x.at <= i).length / FEATS.length) * 100}%` }}></span></div>
            <small className="uc-sc-count"><b>{FEATS.filter((x) => x.at <= i).length}</b> of {FEATS.length} capabilities switched on</small>
          </div>
          <ol className="uc-sc-stairs">
            {STEPS.map((n, k) => (
              <li key={n} className={`uc-sc-step${k <= i ? ' is-on' : ''}${k === i ? ' is-cur' : ''}`} style={{ '--k': k }}>
                <button type="button" onClick={() => setI(k)} aria-pressed={k === i} aria-label={`${n} people`}>
                  <span className="uc-sc-step-top">
                    <b>{n}</b><em>people</em>
                    <i className={k <= i ? 'ri-check-line' : 'ri-lock-line'} aria-hidden="true"></i>
                  </span>
                  <span className="uc-sc-step-feats">
                    {FEATS.filter((x) => x.at === k).map((x) => (
                      <span key={x.t}><i className={x.icon} aria-hidden="true"></i>{x.t}</span>
                    ))}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
