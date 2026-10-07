'use client';
/* Working hero mockup for the AI Agent Assist page: an agent's screen on a
   retention call. The customer threatens to switch; whispers appear for the
   agent (empathy, objection, next-best). "Use" turns a whisper into what the
   agent says, the customer responds and sentiment moves — until the account
   is saved. If nobody clicks, it plays itself; Replay starts over. */
import { useEffect, useRef, useState } from 'react';

const WHISPERS = {
  emp: { kind: 'Empathy', tone: 'rose', icon: 'ri-heart-pulse-line', tip: 'Acknowledge first — try “I hear you”.', say: 'I hear you — switching is a big decision, so let’s make sure it’s worth it.', mood: 55 },
  obj: { kind: 'Objection', tone: 'violet', icon: 'ri-shield-flash-line', tip: 'Reframe on value — time saved in month one.', say: 'Most teams win back hours per rep in the first month. Want me to show you how?', mood: 63, reply: 'Okay… what would it take to try that?', unlocks: 'nba' },
  nba: { kind: 'Next-best', tone: 'amber', icon: 'ri-lightbulb-flash-line', tip: 'Offer the 14-day trial — no card needed.', say: 'Let’s start a 14-day trial today — no card needed.', mood: 82, reply: 'Deal — set it up.', ends: true },
};
const START = { who: 'c', text: 'Honestly, I’m about to switch — your competitor is half the price.' };
const AUTO_MS = 3400;
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function AssistMock({ page }) {
  const [lines, setLines] = useState([START]);
  const [cards, setCards] = useState(['emp', 'obj']);
  const [used, setUsed] = useState([]);
  const [mood, setMood] = useState(42);
  const [done, setDone] = useState(false);
  const [secs, setSecs] = useState(198);
  const timers = useRef([]);
  const listRef = useRef(null);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (done) return undefined;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [done]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const use = (id) => {
    const w = WHISPERS[id];
    if (!w || used.includes(id)) return;
    setUsed((u) => [...u, id]);
    setCards((c) => c.filter((x) => x !== id));
    setLines((l) => [...l, { who: 'a', text: w.say, from: w.kind }]);
    setMood(w.mood);
    if (w.reply) {
      timers.current.push(setTimeout(() => {
        setLines((l) => [...l, { who: 'c', text: w.reply }]);
        if (w.unlocks) setCards((c) => [...c, w.unlocks]);
        if (w.ends) setDone(true);
      }, 1100));
    }
  };

  // Plays itself when idle: uses the first open whisper every few seconds.
  useEffect(() => {
    if (done || cards.length === 0) return undefined;
    const id = setTimeout(() => use(cards[0]), AUTO_MS);
    return () => clearTimeout(id);
  }, [cards, done]); // eslint-disable-line react-hooks/exhaustive-deps

  const replay = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLines([START]); setCards(['emp', 'obj']); setUsed([]); setMood(42); setDone(false); setSecs(198);
  };
  const moodTone = mood < 50 ? 'warn' : mood < 70 ? 'mid' : 'good';

  return (
    <div className="asm" role="region" aria-label="Interactive agent assist demo">
      <div className="asm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="asm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Agent desktop
        </span>
        <span className="asm-time">{done ? 'Saved' : mmss(secs)}</span>
      </div>

      <div className="asm-cust">
        <span className="asm-av">SM</span>
        <span className="asm-who"><b>Sarah Mitchell</b><em>Enterprise · matched in CRM · renewal in 12 days</em></span>
        <span className={`asm-mood asm-mood--${moodTone}`} title="Live sentiment"><i aria-hidden="true"></i>{mood}</span>
      </div>

      <div className="asm-body">
        <ol className="asm-lines" ref={listRef} aria-live="polite">
          {lines.map((l, i) => (
            <li key={`${i}-${l.text}`} className={`asm-line asm-line--${l.who}`}>
              <span className="asm-line-who">{l.who === 'c' ? 'Sarah' : 'You'}{l.from && <em>via {l.from}</em>}</span>
              <p>{l.text}</p>
            </li>
          ))}
          {done && <li className="asm-done"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>Account saved · trial started</li>}
        </ol>

        <div className="asm-wh">
          <span className="asm-wh-k"><i className="ri-sparkling-2-fill" aria-hidden="true"></i>Whispers · only you see these</span>
          {cards.map((id) => {
            const w = WHISPERS[id];
            return (
              <div key={id} className={`asm-card asm-card--${w.tone}`}>
                <span className="asm-card-kind"><i className={w.icon} aria-hidden="true"></i>{w.kind}</span>
                <p>{w.tip}</p>
                <button type="button" onClick={() => use(id)}>Use</button>
              </div>
            );
          })}
          {cards.length === 0 && !done && <span className="asm-wh-wait">Listening for the next moment…</span>}
          {done && <button type="button" className="asm-replay" onClick={replay}><i className="ri-restart-line" aria-hidden="true"></i>Replay call</button>}
        </div>
      </div>
    </div>
  );
}
