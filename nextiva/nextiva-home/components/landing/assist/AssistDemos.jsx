'use client';
/* Interactive sections for the AI Agent Assist page:
   - RampDemo: an illustrative ramp curve for a new hire, with and without
     Agent Assist; drag the week to compare.
   - WhisperTypes: the five kinds of whisper, each with a short live feed.
   - ChatAssist: a customer message on a chosen channel; pick a tone and the
     suggested reply changes; Insert drops it into the compose box. */
import { useState } from 'react';

/* ── Ramp ─────────────────────────────────────────────────────────────── */
// Illustrative 0..100 "share of senior level" by week (no real data).
const WITHOUT = [30, 36, 42, 48, 54, 59, 64, 69, 73, 77, 81, 84, 87];
const WITH = [62, 70, 77, 82, 86, 89, 91, 93, 94, 95, 96, 97, 97];
const W = 520;
const H = 200;
const px = (i) => Math.round(30 + (i / 12) * (W - 50));
const py = (v) => Math.round(H - 26 - (v / 100) * (H - 50));
const path = (arr) => arr.map((v, i) => `${i ? 'L' : 'M'}${px(i)} ${py(v)}`).join(' ');

export function RampDemo({ data }) {
  const [wk, setWk] = useState(2);
  const [on, setOn] = useState(true);
  const a = WITHOUT[wk];
  const b = WITH[wk];
  const gap = (v) => (v >= 90 ? 'at senior level' : v >= 75 ? 'close to senior level' : v >= 55 ? 'getting there' : 'still ramping');

  return (
    <section className="lp-section ag-ramp-sec">
      <div className="lp-wrap ag-ramp">
        <div className="ag-ramp-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <div className="ag-ramp-read" aria-live="polite">
            <span className="ag-ramp-wk">Week {wk}</span>
            <span className="ag-ramp-row"><i className="ag-dot ag-dot--off"></i>Without Assist · <b>{gap(a)}</b></span>
            {on && <span className="ag-ramp-row"><i className="ag-dot ag-dot--on"></i>With Agent Assist · <b>{gap(b)}</b></span>}
          </div>
        </div>
        <div className="ag-ramp-card reveal reveal-delay-1">
          <div className="ag-ramp-top">
            <span>New-hire ramp</span>
            <label className="ag-ramp-tg"><input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} /><em aria-hidden="true"></em>Show with Assist</label>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <line className="ag-senior" x1="30" x2={W - 20} y1={py(95)} y2={py(95)} />
            <text className="ag-senior-t" x={W - 22} y={py(95) - 6}>Senior level</text>
            <path className="ag-curve ag-curve--off" d={path(WITHOUT)} />
            {on && <path className="ag-curve ag-curve--on" d={path(WITH)} />}
            <line className="ag-wk" x1={px(wk)} x2={px(wk)} y1="16" y2={H - 26} />
            <circle className="ag-pt ag-pt--off" cx={px(wk)} cy={py(a)} r="5" />
            {on && <circle className="ag-pt ag-pt--on" cx={px(wk)} cy={py(b)} r="5" />}
            {[0, 4, 8, 12].map((i) => <text key={i} className="ag-axis" x={px(i)} y={H - 8}>wk {i}</text>)}
          </svg>
          <label className="ag-ramp-slider">
            <span>Drag through the first three months</span>
            <input type="range" min="0" max="12" step="1" value={wk} onChange={(e) => setWk(Number(e.target.value))} aria-label="Week" />
          </label>
          <span className="ag-ramp-note">Illustrative curve — not measured results.</span>
        </div>
      </div>
    </section>
  );
}

/* ── Whisper types ────────────────────────────────────────────────────── */
export function WhisperTypes({ data }) {
  const [on, setOn] = useState(data.types[0].id);
  const t = data.types.find((x) => x.id === on);
  const ages = ['Just now', '6s ago', '14s ago'];
  return (
    <section className="lp-section lp-section--theme ag-wh-sec">
      <div className="lp-wrap">
        <div className="ag-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="ag-wh reveal reveal-delay-1">
          <div className="ag-wh-list" role="tablist" aria-label="Whisper types">
            {data.types.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={on === x.id} className={`ag-wh-tab lp-tone--${x.tone}${on === x.id ? ' is-on' : ''}`} onClick={() => setOn(x.id)}>
                <span className="ag-wh-ic"><i className={x.icon} aria-hidden="true"></i></span>
                <b>{x.label}</b>
              </button>
            ))}
          </div>
          <div className={`ag-wh-panel lp-tone--${t.tone}`} role="tabpanel" key={t.id}>
            <h3 className="ag-wh-title">{t.title}</h3>
            <p className="ag-wh-text">{t.text}</p>
            <div className="ag-ear">
              <span className="ag-ear-k"><i className="ri-headphone-fill" aria-hidden="true"></i>In the agent’s ear</span>
              {t.feed.map((f, i) => (
                <div key={f} className="ag-ear-row" style={{ animationDelay: `${i * 0.12}s` }}>
                  <em>{ages[i]}</em><span>“{f}”</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="ag-wh-foot reveal"><i className="ri-translate-2" aria-hidden="true"></i>Whispers work in 32 languages — English, Spanish, French, Mandarin, Hindi, Portuguese, Japanese, Tagalog and more.</p>
      </div>
    </section>
  );
}

/* ── Chat assist ──────────────────────────────────────────────────────── */
const CHATS = [
  { id: 'wa', label: 'WhatsApp', icon: 'ri-whatsapp-fill', name: 'Marco D.', msg: 'Hey — the package says delivered but it’s not at my door??', kb: 'KB-204 · Carrier scan disputes',
    reply: { warm: 'I’m so sorry that happened — let me check the carrier scan for you right now.', formal: 'Apologies for the inconvenience. I will review the carrier scan record immediately.', brief: 'Sorry about that — checking the carrier scan now.' } },
  { id: 'ig', label: 'Instagram', icon: 'ri-instagram-fill', name: 'lena.makes', msg: 'Do you ship to Canada? Can’t find it anywhere on the site.', kb: 'KB-061 · International shipping',
    reply: { warm: 'Great question — yes, we ship to Canada! Delivery usually takes 5–7 business days.', formal: 'Yes, we ship to Canada. Standard delivery takes 5–7 business days.', brief: 'Yes! 5–7 business days to Canada.' } },
  { id: 'web', label: 'Web chat', icon: 'ri-chat-3-fill', name: 'Visitor · pricing page', msg: 'how do i cancel. this is too expensive', kb: 'KB-012 · Plan changes & cancellation',
    reply: { warm: 'I understand — before you go, can I show you a smaller plan that might fit better?', formal: 'I can help with that. Would you like to review lower-cost plan options first?', brief: 'I can help — want to see cheaper plans first?' } },
];
const TONES = [['warm', 'Warm'], ['formal', 'Formal'], ['brief', 'Brief']];

export function ChatAssist({ data }) {
  const [ch, setCh] = useState('wa');
  const [tone, setTone] = useState('warm');
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState(false);
  const c = CHATS.find((x) => x.id === ch);
  const pick = (id) => { setCh(id); setDraft(''); setSent(false); };

  return (
    <section className="lp-section ag-chat-sec">
      <div className="lp-wrap ag-chat">
        <div className="ag-chat-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="ag-chat-points">
            <li><i className="ri-magic-line" aria-hidden="true"></i>Suggested replies in the compose box</li>
            <li><i className="ri-emotion-line" aria-hidden="true"></i>Tone nudges — warm, formal or brief</li>
            <li><i className="ri-attachment-2" aria-hidden="true"></i>Help articles attached automatically</li>
          </ul>
        </div>
        <div className="ag-inbox reveal reveal-delay-1">
          <div className="ag-inbox-tabs" role="group" aria-label="Channel">
            {CHATS.map((x) => (
              <button key={x.id} type="button" className={ch === x.id ? 'is-on' : ''} aria-pressed={ch === x.id} onClick={() => pick(x.id)}>
                <i className={x.icon} aria-hidden="true"></i>{x.label}
              </button>
            ))}
          </div>
          <div className="ag-inbox-thread" key={ch}>
            <span className="ag-inbox-who"><i className={c.icon} aria-hidden="true"></i>{c.name}</span>
            <p className="ag-bub ag-bub--in">{c.msg}</p>
            {sent && <p className="ag-bub ag-bub--out">{draft}</p>}
          </div>
          {!sent && (
            <div className="ag-sugg">
              <div className="ag-sugg-top">
                <span><i className="ri-sparkling-2-fill" aria-hidden="true"></i>Suggestion</span>
                <div className="ag-tones" role="group" aria-label="Tone">
                  {TONES.map(([k, l]) => <button key={k} type="button" className={tone === k ? 'is-on' : ''} aria-pressed={tone === k} onClick={() => setTone(k)}>{l}</button>)}
                </div>
              </div>
              <p className="ag-sugg-text">{c.reply[tone]}</p>
              <div className="ag-sugg-foot">
                <span className="ag-kb"><i className="ri-article-line" aria-hidden="true"></i>{c.kb}</span>
                <button type="button" onClick={() => setDraft(c.reply[tone])}>Insert</button>
              </div>
            </div>
          )}
          <div className="ag-compose">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a reply…" aria-label="Reply" disabled={sent} />
            {sent
              ? <button type="button" onClick={() => pick(ch)}><i className="ri-restart-line" aria-hidden="true"></i></button>
              : <button type="button" onClick={() => draft.trim() && setSent(true)} disabled={!draft.trim()} aria-label="Send"><i className="ri-send-plane-2-fill" aria-hidden="true"></i></button>}
          </div>
        </div>
      </div>
    </section>
  );
}
