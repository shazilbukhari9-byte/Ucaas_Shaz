'use client';
/* Working hero mockup for the UCaaS overview: one customer conversation that
   moves across channels — a missed call, a text, a video call, then a team
   chat hand-off — all in one thread. It plays turn by turn; the channel
   chips jump to any turn, and presence follows along (in a meeting = chat
   notifications held). Every turn holds for STEP_MS (2s), and after the last one
   it starts over by itself — no replay button. */
import { useEffect, useRef, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

const CHANNELS = [
  { id: 'voice', label: 'Voice', icon: 'ri-phone-fill', tone: 'blue' },
  { id: 'sms', label: 'SMS', icon: 'ri-message-2-fill', tone: 'teal' },
  { id: 'video', label: 'Video', icon: 'ri-vidicon-fill', tone: 'violet' },
  { id: 'chat', label: 'Chat', icon: 'ri-discuss-fill', tone: 'amber' },
];

const TURNS = [
  {
    ch: 'voice', at: '09:12',
    items: [
      { kind: 'event', text: 'Missed call · +44 20 7946 0123' },
      { kind: 'in', text: 'Voicemail: “Missed you — could you text me the pricing?”', meta: 'Transcribed' },
    ],
    presence: 'Available',
  },
  {
    ch: 'sms', at: '09:14',
    items: [
      { kind: 'out', text: 'Hi Sarah — here’s the pricing sheet 📎', meta: 'Delivered · read' },
      { kind: 'in', text: 'Thanks! Can we go through it on a quick video call?' },
    ],
    presence: 'Available',
  },
  {
    ch: 'video', at: '10:00',
    items: [
      { kind: 'event', text: 'Video call · 18 min · recorded' },
      { kind: 'note', text: 'AI summary: wants the annual plan for 25 seats, start next month.' },
    ],
    presence: 'In a meeting · chat paused',
  },
  {
    ch: 'chat', at: '10:21',
    items: [
      { kind: 'team', who: 'You', text: '@Diego Sarah’s going annual — can you send the contract?' },
      { kind: 'team', who: 'Diego', text: 'On it. I can see the whole thread 👀' },
    ],
    presence: 'Available',
  },
];

const STEP_MS = 2000;

// Emoji in the messages are drawn as Twemoji images (CC-BY 4.0, from the
// jsDelivr CDN) so they show in full colour on every device — a system
// without a colour emoji font would otherwise render a plain outline.
const EMOJI = { '📎': '1f4ce', '👀': '1f440' };
const EMOJI_RE = new RegExp(`(${Object.keys(EMOJI).join('|')})`, 'u');
const withEmoji = (text) => text.split(EMOJI_RE).map((part, i) => (EMOJI[part]
  ? <img key={i} className="ucm-emoji" src={`https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${EMOJI[part]}.svg`} alt={part} width="18" height="18" />
  : part));

export default function UcaasMock({ page }) {
  const [turn, setTurn] = useState(0);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  const playing = !paused && !still;
  const listRef = useRef(null);

  // One timeout per turn (so a chip tap restarts the full 3s); the last turn
  // wraps back to the first.
  useEffect(() => {
    if (!playing) return undefined;
    const id = setTimeout(() => setTurn((t) => (t + 1) % TURNS.length), STEP_MS);
    return () => clearTimeout(id);
  }, [turn, playing]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [turn]);

  const jump = (id) => setTurn(TURNS.findIndex((t) => t.ch === id));
  const shown = TURNS.slice(0, turn + 1);
  const cur = TURNS[turn];
  const busy = cur.presence !== 'Available';

  return (
    <div className="ucm" {...bind} role="region" aria-label="One conversation across every channel">
      <div className="ucm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="ucm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          One thread
        </span>
        <span className="ucm-turn">Turn {turn + 1} of {TURNS.length}</span>
      </div>

      <div className="ucm-contact">
        <span className="ucm-av">SC</span>
        <span className="ucm-who"><b>Sarah Chen</b><em>London · same contact on every channel</em></span>
        <span className={`ucm-pres${busy ? ' is-busy' : ''}`} title="Your presence"><i aria-hidden="true"></i>{cur.presence}</span>
      </div>

      <div className="ucm-chips" role="group" aria-label="Jump to a channel">
        {CHANNELS.map((c, i) => {
          const idx = TURNS.findIndex((t) => t.ch === c.id);
          return (
            <button
              key={c.id}
              type="button"
              className={`ucm-chip ucm-chip--${c.tone}${idx <= turn ? ' is-done' : ''}${idx === turn ? ' is-on' : ''}`}
              onClick={() => jump(c.id)}
              aria-pressed={idx === turn}
            >
              <i className={c.icon} aria-hidden="true"></i>{c.label}
              {i < CHANNELS.length - 1 && <span className="ucm-link" aria-hidden="true"></span>}
            </button>
          );
        })}
      </div>

      <ol className="ucm-thread" ref={listRef} aria-live="polite">
        {shown.map((t, ti) => {
          const c = CHANNELS.find((x) => x.id === t.ch);
          return (
            <li key={t.ch} className={`ucm-turn-block ucm-turn-block--${c.tone}${ti === turn ? ' is-now' : ''}`}>
              <span className="ucm-sep"><i className={c.icon} aria-hidden="true"></i>{c.label} · {t.at}</span>
              {t.items.map((m) => (
                <span key={m.text} className={`ucm-msg ucm-msg--${m.kind}`}>
                  {m.who && <b>{m.who}</b>}
                  <span className="ucm-msg-text">{withEmoji(m.text)}</span>
                  {m.meta && <em>{m.meta}</em>}
                </span>
              ))}
            </li>
          );
        })}
      </ol>

      <div className="ucm-foot">
        <span className="ucm-foot-count"><i className="ri-links-line" aria-hidden="true"></i>{shown.length} of {TURNS.length} channels in one thread</span>
        <span className="ucm-crm"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>Synced to CRM</span>
      </div>
    </div>
  );
}
