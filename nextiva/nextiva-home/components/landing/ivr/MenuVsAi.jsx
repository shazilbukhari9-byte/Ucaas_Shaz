'use client';
/* "Or skip the menu": the same caller with the same question, played out
   side by side — a classic key-press menu and AI routing by speech. Both
   transcripts play line by line (starts when scrolled into view, Replay to
   run it again); the tallies under each are counted from the script itself. */
import { useEffect, useRef, useState } from 'react';

const MENU = [
  { who: 'sys', text: 'Thanks for calling Northside Dental. For appointments press 1, billing 2, insurance 3, or 0 for reception.' },
  { who: 'caller', text: 'Rescheduling is… appointments? Or reception?', key: '1' },
  { who: 'sys', text: 'Appointments. To book a new visit press 1, to cancel press 2, for opening hours press 3.' },
  { who: 'caller', text: 'None of those is “move my visit”.', key: '0' },
  { who: 'sys', text: 'Please hold for reception. You are caller number four.' },
];
const AI = [
  { who: 'sys', text: 'Thanks for calling Northside Dental — how can I help?' },
  { who: 'caller', text: 'I need to move my cleaning on Thursday to next week.' },
  { who: 'sys', text: 'Sure — that’s the booking desk. Putting you through to Lena now.' },
];

const SIDES = [
  { id: 'menu', label: 'Classic menu', badge: 'Option A', icon: 'ri-keyboard-box-line', lines: MENU, result: 'Queued for reception', ok: false },
  { id: 'ai', label: 'AI routing', badge: 'Option B', icon: 'ri-robot-2-line', lines: AI, result: 'Booking desk, first try', ok: true },
];

const STEP_MS = 1100;

export default function MenuVsAi({ data }) {
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const max = Math.max(MENU.length, AI.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setRun(1); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) { started.current = true; setRun(1); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return undefined;
    setShown(0);
    const ids = [];
    for (let i = 1; i <= max; i += 1) ids.push(setTimeout(() => setShown(i), i * STEP_MS));
    return () => ids.forEach(clearTimeout);
  }, [run, max]);

  const done = shown >= max;

  return (
    <section className="lp-section lp-section--theme aa-vs-sec" ref={ref}>
      <div className="lp-wrap">
        <div className="aa-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="aa-vs reveal reveal-delay-1">
          {SIDES.map((s) => {
            const visible = s.lines.slice(0, shown);
            const finished = shown >= s.lines.length;
            const presses = visible.filter((l) => l.key).length;
            return (
              <article key={s.id} className={`aa-vs-card aa-vs-card--${s.id}`}>
                <header className="aa-vs-top">
                  <span className="aa-vs-ic"><i className={s.icon} aria-hidden="true"></i></span>
                  <span className="aa-vs-name"><em>{s.badge}</em><b>{s.label}</b></span>
                  {finished && <span className={`aa-vs-result${s.ok ? ' is-ok' : ''}`}><i className={s.ok ? 'ri-check-line' : 'ri-time-line'} aria-hidden="true"></i>{s.result}</span>}
                </header>
                <ol className="aa-vs-lines" aria-live="polite">
                  {visible.map((l) => (
                    <li key={l.text} className={`aa-vs-line aa-vs-line--${l.who}`}>
                      <span className="aa-vs-av" title={l.who === 'sys' ? (s.id === 'ai' ? 'AI' : 'IVR') : 'Caller'}>
                        {l.who === 'sys' ? <i className={s.id === 'ai' ? 'ri-robot-2-line' : 'ri-voiceprint-line'} aria-hidden="true"></i> : 'C'}
                      </span>
                      <div className="aa-vs-msg">
                        <p>{l.text}</p>
                        {l.key && <span className="aa-vs-key"><i className="ri-keyboard-box-line" aria-hidden="true"></i>Pressed {l.key}</span>}
                      </div>
                    </li>
                  ))}
                  {!finished && run > 0 && <li className="aa-vs-wait" aria-hidden="true"><i></i><i></i><i></i></li>}
                </ol>
                <dl className="aa-vs-tally">
                  <div><dt>{presses}</dt><dd>key presses</dd></div>
                  <div><dt>{visible.length}</dt><dd>turns</dd></div>
                  <div className="aa-vs-out"><dt>{finished ? (s.ok ? 'Right team' : 'Wrong queue') : '—'}</dt><dd>outcome</dd></div>
                </dl>
              </article>
            );
          })}
        </div>
        <div className="aa-vs-foot">
          <span>Example calls — your own menu and prompts will differ.</span>
          <button type="button" onClick={() => { started.current = true; setRun((r) => r + 1); }} disabled={run > 0 && !done}>
            <i className={run ? 'ri-restart-line' : 'ri-play-fill'} aria-hidden="true"></i>{run ? 'Replay' : 'Play both calls'}
          </button>
        </div>
      </div>
    </section>
  );
}
