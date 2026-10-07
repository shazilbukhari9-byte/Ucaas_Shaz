'use client';
/* Interactive sections for the Sales Teams page:
   - GapDemo: the same objection answered by a new rep and a top rep; switch
     live coaching on and the new rep's reply closes the gap.
   - DialerDemo: pick a dialer mode and run a session over a short list —
     DNC numbers skipped, machines detected and voicemail dropped, so only
     real conversations reach the rep.
   - HuddleDemo: this week's objections ranked from real calls; pick one to
     see what prospects say, the play that works and the top-rep clip. */
import { useEffect, useRef, useState } from 'react';

/* ── The gap ──────────────────────────────────────────────────────────── */
const GAPS = [
  {
    id: 'price', label: 'Price', heard: '“Your price is higher than the other quote.”',
    newRep: 'I can check with my manager about a discount…',
    topRep: 'Fair — can we compare a full year, including setup and the cost of switching again later?',
    whisper: 'Don’t discount yet. Reframe to total cost over a year.',
  },
  {
    id: 'timing', label: 'Timing', heard: '“Call me back next quarter.”',
    newRep: 'Sure, I’ll put a reminder in for January.',
    topRep: 'Happy to. Before I do — what changes next quarter that makes it a better time?',
    whisper: 'Ask what changes next quarter before agreeing to wait.',
  },
  {
    id: 'rival', label: 'Competitor', heard: '“We’re already talking to another vendor.”',
    newRep: 'Oh, okay. Well, we’re really good too.',
    topRep: 'Makes sense to compare. What would they have to get right for you to choose them?',
    whisper: 'Don’t knock the rival. Ask for their decision criteria.',
  },
];

export function GapDemo({ text }) {
  const [id, setId] = useState('price');
  const [coach, setCoach] = useState(false);
  const g = GAPS.find((x) => x.id === id);
  return (
    <section className="lp-section sl-gap-sec">
      <div className="lp-wrap">
        <p className="sl-gap-text reveal">{text}</p>
        <div className="sl-gap reveal reveal-delay-1">
          <div className="sl-gap-bar">
            <div className="sl-gap-tabs" role="group" aria-label="Objection">
              {GAPS.map((x) => <button key={x.id} type="button" className={id === x.id ? 'is-on' : ''} aria-pressed={id === x.id} onClick={() => setId(x.id)}>{x.label}</button>)}
            </div>
            <button type="button" className={`sl-gap-switch${coach ? ' is-on' : ''}`} role="switch" aria-checked={coach} onClick={() => setCoach((c) => !c)}>
              <i aria-hidden="true"></i>Live coaching {coach ? 'on' : 'off'}
            </button>
          </div>
          <p className="sl-gap-heard"><span>Prospect</span>{g.heard}</p>
          <div className="sl-gap-cols" aria-live="polite">
            <div className={`sl-gap-col${coach ? ' is-coached' : ''}`}>
              <span className="sl-gap-who"><i className="ri-user-3-line" aria-hidden="true"></i>New rep · week 2</span>
              {coach && <span className="sl-gap-whisper" key={`w-${id}`}><i className="ri-sparkling-2-fill" aria-hidden="true"></i>{g.whisper}</span>}
              <p className="sl-gap-reply" key={`${id}-${coach}`}>{coach ? g.topRep : g.newRep}</p>
              <span className={`sl-gap-out${coach ? ' is-good' : ''}`}>{coach ? 'Conversation keeps moving' : 'Conversation stalls'}</span>
            </div>
            <div className="sl-gap-col sl-gap-col--top">
              <span className="sl-gap-who"><i className="ri-medal-line" aria-hidden="true"></i>Top rep · year 6</span>
              <p className="sl-gap-reply">{g.topRep}</p>
              <span className="sl-gap-out is-good">Conversation keeps moving</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Dialer session ───────────────────────────────────────────────────── */
const MODES = [
  { id: 'preview', label: 'Preview', lines: 1, ms: 900, note: 'Rep reviews each record, then dials — best for high-value accounts.' },
  { id: 'power', label: 'Power', lines: 1, ms: 600, note: 'Dials the next number the moment a call ends — no clicking between calls.' },
  { id: 'predictive', label: 'Predictive', lines: 2, ms: 450, note: 'Dials ahead of agents and connects only answered calls — best for big lists.' },
];
const LIST = [
  { who: 'J. Patel', out: 'talk' },
  { who: 'M. Rossi', out: 'dnc' },
  { who: 'A. Chen', out: 'vm' },
  { who: 'L. Okafor', out: 'none' },
  { who: 'S. Novak', out: 'talk' },
  { who: 'R. Duarte', out: 'vm' },
  { who: 'K. Lindqvist', out: 'dnc' },
  { who: 'T. Moreau', out: 'talk' },
];
const OUT = {
  talk: { label: 'Conversation', icon: 'ri-chat-voice-line' },
  dnc: { label: 'DNC · skipped', icon: 'ri-forbid-line' },
  vm: { label: 'Machine · VM dropped', icon: 'ri-voiceprint-line' },
  none: { label: 'No answer', icon: 'ri-phone-line' },
};

export function DialerDemo({ data }) {
  const [mode, setMode] = useState('power');
  const [done, setDone] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);
  const m = MODES.find((x) => x.id === mode);
  useEffect(() => () => clearInterval(timer.current), []);

  const run = () => {
    clearInterval(timer.current);
    setDone(0);
    setRunning(true);
    timer.current = setInterval(() => {
      setDone((d) => {
        const n = Math.min(LIST.length, d + m.lines);
        if (n >= LIST.length) { clearInterval(timer.current); setRunning(false); }
        return n;
      });
    }, m.ms);
  };
  const pick = (id) => { clearInterval(timer.current); setRunning(false); setDone(0); setMode(id); };

  const seen = LIST.slice(0, done);
  const tally = (k) => seen.filter((x) => x.out === k).length;

  return (
    <section className="lp-section lp-section--theme sl-dl-sec">
      <div className="lp-wrap">
        <div className="sl-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="sl-dl reveal reveal-delay-1">
          <div className="sl-dl-side">
            <span className="sl-dl-k">Dialer mode</span>
            <div className="sl-dl-modes" role="group" aria-label="Dialer mode">
              {MODES.map((x) => (
                <button key={x.id} type="button" className={mode === x.id ? 'is-on' : ''} aria-pressed={mode === x.id} onClick={() => pick(x.id)}>
                  <b>{x.label}</b><em>{x.lines > 1 ? `${x.lines} lines per agent` : '1 line per agent'}</em>
                </button>
              ))}
            </div>
            <p className="sl-dl-note">{m.note}</p>
            <button type="button" className="sl-dl-run" onClick={run} disabled={running}>
              <i className={running ? 'ri-loader-4-line' : 'ri-play-fill'} aria-hidden="true"></i>{running ? 'Dialing…' : done ? 'Run again' : 'Start session'}
            </button>
          </div>
          <div className="sl-dl-main">
            <div className="sl-dl-stats" aria-live="polite">
              <span><b>{done}</b>Dialed</span>
              <span><b>{tally('dnc')}</b>Skipped (DNC)</span>
              <span><b>{tally('vm')}</b>Voicemails dropped</span>
              <span className="is-hi"><b>{tally('talk')}</b>Conversations</span>
            </div>
            <ol className="sl-dl-list">
              {LIST.map((x, i) => {
                const st = i < done ? x.out : i < done + m.lines && running ? 'ringing' : 'queued';
                return (
                  <li key={x.who} className={`sl-dl-row sl-dl-row--${st}`}>
                    <span className="sl-dl-n">{String(i + 1).padStart(2, '0')}</span>
                    <b>{x.who}</b>
                    <span className="sl-dl-st">
                      {st === 'queued' && <><i className="ri-time-line" aria-hidden="true"></i>Queued</>}
                      {st === 'ringing' && <><i className="ri-phone-line" aria-hidden="true"></i>Ringing…</>}
                      {OUT[st] && <><i className={OUT[st].icon} aria-hidden="true"></i>{OUT[st].label}</>}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Monday huddle ────────────────────────────────────────────────────── */
const HEAT = [9, 6, 4]; // illustrative weekly mentions, for the bar lengths only

export function HuddleDemo({ data }) {
  const [i, setI] = useState(0);
  const [play, setPlay] = useState(false);
  const x = data.items[i];
  useEffect(() => {
    if (!play) return undefined;
    const t = setTimeout(() => setPlay(false), 3200);
    return () => clearTimeout(t);
  }, [play]);
  return (
    <section className="lp-section sl-hd-sec">
      <div className="lp-wrap">
        <div className="sl-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="sl-hd reveal reveal-delay-1">
          <div className="sl-hd-rank">
            <span className="sl-hd-k"><i className="ri-calendar-event-line" aria-hidden="true"></i>This week · ranked from transcribed calls</span>
            {data.items.map((o, n) => (
              <button key={o.tag} type="button" className={`sl-hd-item${n === i ? ' is-on' : ''}`} aria-pressed={n === i} onClick={() => { setI(n); setPlay(false); }}>
                <span className="sl-hd-n">#{n + 1}</span>
                <span className="sl-hd-body">
                  <b>{o.tag}</b>
                  <span className="sl-hd-bar"><i style={{ width: `${(HEAT[n] / HEAT[0]) * 100}%` }}></i></span>
                </span>
                <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
              </button>
            ))}
          </div>
          <div className="sl-hd-card" key={i} aria-live="polite">
            <span className="sl-hd-lab">What prospects say</span>
            <p className="sl-hd-heard">{x.heard}</p>
            <span className="sl-hd-lab">The play that works</span>
            <p className="sl-hd-play">{x.play}</p>
            <button type="button" className={`sl-hd-clip${play ? ' is-playing' : ''}`} onClick={() => setPlay((p) => !p)} aria-pressed={play}>
              <i className={play ? 'ri-pause-fill' : 'ri-play-fill'} aria-hidden="true"></i>
              <span className="sl-hd-wave" aria-hidden="true">{Array.from({ length: 28 }, (_, k) => <i key={k} style={{ '--h': `${30 + ((k * 37) % 70)}%`, '--d': `${(k % 7) * 0.08}s` }}></i>)}</span>
              <em>{x.clip}</em>
            </button>
            <span className="sl-hd-share"><i className="ri-slideshow-3-line" aria-hidden="true"></i>Added to Monday’s huddle deck</span>
          </div>
        </div>
      </div>
    </section>
  );
}
