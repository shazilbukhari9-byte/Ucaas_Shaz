'use client';
/* Interactive sections for the Remote & Hybrid Teams page:
   - DayTimeline: one person's day on one number — step through the stops
     (or play them) and see which device took the call and why.
   - PresenceBoard: pick a teammate, then message or call them; what happens
     depends on their presence (focus, meeting, off-hours, available). */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

/* ── Statement: one number, every place ─────────────────────────────────
   The four places as labelled cards hung on one line through a "one
   number" badge, the statement beneath with each place's words marked.
   Every PLACE_MS the next place lights up — its card and its words. */
const PLACES = [
  { icon: 'ri-home-4-line', label: 'Home', match: 'home' },
  { icon: 'ri-cup-line', label: 'Coworking', match: 'coworking spaces' },
  { icon: 'ri-plane-line', label: 'Airport gate', match: 'airport gates' },
  { icon: 'ri-building-2-line', label: 'Client site', match: 'client sites' },
];
const PLACE_MS = 3000;

function markPlaces(text, on) {
  const parts = [];
  let rest = text;
  let key = 0;
  while (rest) {
    let hit = null;
    PLACES.forEach((p, n) => {
      const at = rest.indexOf(p.match);
      if (at >= 0 && (!hit || at < hit.at)) hit = { at, n, len: p.match.length };
    });
    if (!hit) { parts.push(rest); break; }
    if (hit.at) parts.push(rest.slice(0, hit.at));
    parts.push(<mark key={key += 1} className={hit.n === on ? 'is-on' : ''}>{rest.slice(hit.at, hit.at + hit.len)}</mark>);
    rest = rest.slice(hit.at + hit.len);
  }
  return parts;
}

export function Statement({ text }) {
  const [on, setOn] = useState(0);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  const playing = !paused && !still;
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setOn((n) => (n + 1) % PLACES.length), PLACE_MS);
    return () => clearTimeout(t);
  }, [playing, on]);

  return (
    <section className="lp-section rt-st-sec">
      <div className="lp-wrap">
        <div className="rt-st reveal" {...bind}>
          <div className="rt-st-map">
            {PLACES.slice(0, 2).map((p, n) => (
              <button key={p.label} type="button" className={`rt-st-place${n === on ? ' is-on' : ''}`} onClick={() => setOn(n)} aria-pressed={n === on}>
                <i className={p.icon} aria-hidden="true"></i><b>{p.label}</b><em><i className="ri-check-line" aria-hidden="true"></i>Same line</em>
              </button>
            ))}
            <span className="rt-st-hub" aria-hidden="true">
              <i className="ri-phone-fill"></i><b>One number</b><em>every place</em>
            </span>
            {PLACES.slice(2).map((p, k) => {
              const n = k + 2;
              return (
                <button key={p.label} type="button" className={`rt-st-place${n === on ? ' is-on' : ''}`} onClick={() => setOn(n)} aria-pressed={n === on}>
                  <i className={p.icon} aria-hidden="true"></i><b>{p.label}</b><em><i className="ri-check-line" aria-hidden="true"></i>Same line</em>
                </button>
              );
            })}
          </div>
          <p>{markPlaces(text, on)}</p>
        </div>
      </div>
    </section>
  );
}

/* ── One day, one number ──────────────────────────────────────────────── */
export function DayTimeline({ data }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stops = data.stops;

  useEffect(() => {
    if (!playing) return undefined;
    if (i >= stops.length - 1) { setPlaying(false); return undefined; }
    const id = setTimeout(() => setI((x) => x + 1), 1800);
    return () => clearTimeout(id);
  }, [playing, i, stops.length]);

  const s = stops[i];
  const prev = i > 0 ? stops[i - 1] : null;
  const play = () => { setI(0); setPlaying(true); };

  return (
    <section className="lp-section rt-day-sec">
      <div className="lp-wrap">
        <div className="rt-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="rt-day reveal reveal-delay-1">
          <div className="rt-day-top">
            <span className="rt-day-who"><span className="rt-av">MO</span><b>Maya O.</b><em>+1 (415) 555-0123 · {stops.length} device hops</em></span>
            <button type="button" className="rt-play" onClick={play} disabled={playing}>
              <i className={playing ? 'ri-loader-4-line' : 'ri-play-fill'} aria-hidden="true"></i>{playing ? 'Playing…' : 'Play the day'}
            </button>
          </div>

          <ol className="rt-track" role="tablist" aria-label="Stops in the day">
            {stops.map((x, k) => (
              <li key={x.time}>
                <button type="button" role="tab" aria-selected={i === k} className={`rt-stop${i === k ? ' is-on' : ''}${k < i ? ' is-done' : ''}`} onClick={() => { setPlaying(false); setI(k); }}>
                  <span className="rt-stop-dot"><i className={x.icon} aria-hidden="true"></i></span>
                  <b>{x.time}</b>
                  <em>{x.place}</em>
                </button>
              </li>
            ))}
          </ol>

          <div className="rt-scene" key={i} role="tabpanel">
            <div className="rt-scene-dev">
              <i className={s.icon} aria-hidden="true"></i>
              <b>{s.device}</b>
              <span className="rt-scene-live"><i aria-hidden="true"></i>On call</span>
            </div>
            <div className="rt-scene-copy">
              <span className="rt-scene-k">{s.time} · {s.place}</span>
              <h3 className="rt-scene-title">{s.what}</h3>
              <p className="rt-scene-text">{s.note}</p>
              <span className="rt-scene-flip">
                {prev ? <><i className="ri-swap-line" aria-hidden="true"></i>{prev.device} → {s.device} · under a second</> : <><i className="ri-phone-line" aria-hidden="true"></i>Picked up on {s.device}</>}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Presence board ───────────────────────────────────────────────────── */
const TEAM = [
  { id: 'mo', init: 'MO', name: 'Maya O.', role: 'Support lead', status: 'call', label: 'On a call', detail: 'With Karen B. · 04:12' },
  { id: 'jp', init: 'JP', name: 'Jordan P.', role: 'Account exec', status: 'meeting', label: 'In a meeting', detail: 'Customer review · 30 min left' },
  { id: 'at', init: 'AT', name: 'Aiko T.', role: 'Engineer', status: 'available', label: 'Available', detail: 'Free until 15:00' },
  { id: 'pk', init: 'PK', name: 'Priya K.', role: 'Product manager', status: 'dnd', label: 'Focus time', detail: 'Do not disturb until 14:00' },
  { id: 'tv', init: 'TV', name: 'Tomas V.', role: 'Designer', status: 'off', label: 'Off hours', detail: 'Lisbon · back Monday 09:00' },
];
const OUTCOME = {
  call: { msg: 'Message delivered quietly — Maya sees it when the call ends.', call: 'She’s on another call. You’ll get a ping the moment she’s free.' },
  meeting: { msg: 'Delivered silently; it’ll pop up after the meeting.', call: 'Jordan is in a meeting — want a callback in 30 minutes?' },
  available: { msg: 'Delivered — Aiko is typing…', call: 'Ringing Aiko on her laptop and phone…' },
  dnd: { msg: 'Held until 14:00 so Priya’s focus block isn’t broken.', call: 'Calls are held during focus time. Mark it urgent to break through.' },
  off: { msg: 'Queued for Monday 09:00 Lisbon time.', call: 'Tomas is off hours — the call goes to voicemail with a transcript.' },
};

export function PresenceBoard({ data }) {
  const [sel, setSel] = useState('pk');
  const [act, setAct] = useState(null);
  const p = TEAM.find((x) => x.id === sel);

  return (
    <section className="lp-section lp-section--theme rt-pr-sec">
      <div className="lp-wrap rt-pr">
        <div className="rt-pr-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="rt-pr-points">
            <li><i className="ri-calendar-check-line" aria-hidden="true"></i>Reads calls, meetings, focus blocks and working hours</li>
            <li><i className="ri-discuss-line" aria-hidden="true"></i>Team chat and HD video in the same app</li>
            <li><i className="ri-user-line" aria-hidden="true"></i>One login and one identity on every device</li>
          </ul>
        </div>
        <div className="rt-board reveal reveal-delay-1">
          <span className="rt-board-k"><i className="ri-team-line" aria-hidden="true"></i>Team presence · live</span>
          <ul className="rt-people">
            {TEAM.map((x) => (
              <li key={x.id}>
                <button type="button" className={`rt-person rt-person--${x.status}${sel === x.id ? ' is-on' : ''}`} onClick={() => { setSel(x.id); setAct(null); }} aria-pressed={sel === x.id}>
                  <span className="rt-person-av">{x.init}<i aria-hidden="true"></i></span>
                  <span className="rt-person-txt"><b>{x.name}</b><em>{x.role}</em></span>
                  <span className="rt-person-st"><b>{x.label}</b><em>{x.detail}</em></span>
                </button>
              </li>
            ))}
          </ul>
          <div className="rt-reach">
            <span>Reach {p.name.split(' ')[0]}</span>
            <button type="button" className={act === 'msg' ? 'is-on' : ''} onClick={() => setAct('msg')}><i className="ri-chat-3-line" aria-hidden="true"></i>Message</button>
            <button type="button" className={act === 'call' ? 'is-on' : ''} onClick={() => setAct('call')}><i className="ri-phone-line" aria-hidden="true"></i>Call</button>
          </div>
          <p className={`rt-outcome rt-outcome--${p.status}`} aria-live="polite">
            {act ? OUTCOME[p.status][act] : 'Pick Message or Call to see what happens.'}
          </p>
        </div>
      </div>
    </section>
  );
}
