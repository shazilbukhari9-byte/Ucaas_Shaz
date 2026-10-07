'use client';
/* Working hero mockup for the Retail & eCom page: a store's support desk at
   11:42 pm. A shopper writes in on one of six channels; the store order is
   pulled in beside the chat and the AI drafts the answer — tracking, a
   return label or a stock check. Send it (or wait) and it's resolved by AI;
   then take the next shopper. */
import { useEffect, useRef, useState } from 'react';

const CHANNELS = [
  { id: 'voice', icon: 'ri-phone-line', label: 'Voice' },
  { id: 'sms', icon: 'ri-message-2-line', label: 'SMS' },
  { id: 'wa', icon: 'ri-whatsapp-line', label: 'WhatsApp' },
  { id: 'ig', icon: 'ri-instagram-line', label: 'Instagram' },
  { id: 'fb', icon: 'ri-messenger-line', label: 'Facebook' },
  { id: 'chat', icon: 'ri-chat-3-line', label: 'Web chat' },
];
const SHOPPERS = [
  {
    who: 'Maya C.', ch: 'wa', ask: 'Hi! Where’s my order? It was meant to come today.',
    card: { k: 'Order #4218', lines: ['Linen shirt · M', 'Canvas tote'], status: 'Out for delivery', tone: 'go', foot: 'ETA today 4–6 pm' },
    reply: 'It’s out for delivery now — expected between 4 and 6 pm today. Here’s your tracking link.',
    kind: 'Tracking sent',
  },
  {
    who: 'Leo P.', ch: 'ig', ask: 'Can I return the jacket? It’s a bit big.',
    card: { k: 'Order #4193', lines: ['Field jacket · L'], status: 'Return eligible', tone: 'ok', foot: '18 days left in window' },
    reply: 'Of course! I’ve emailed a free return label — or swap it for a size M and we’ll ship it today.',
    kind: 'Return label sent',
  },
  {
    who: 'Ava R.', ch: 'sms', ask: 'Do you have the linen shirt in medium?',
    card: { k: 'Inventory', lines: ['Linen shirt · M — 6 left', 'Linen shirt · L — 2 left'], status: 'In stock', tone: 'go', foot: 'Ships tomorrow' },
    reply: 'Yes — 6 left in medium. I’ve added one to your cart; checkout here whenever you’re ready.',
    kind: 'Added to cart',
  },
];

export default function RetailMock({ page }) {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState('in'); // in | draft | sent
  const [resolved, setResolved] = useState(37);
  const phaseRef = useRef('in'); // read by the auto-send timer, which outlives its render
  phaseRef.current = phase;
  const timers = useRef([]);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clear(), []);

  const s = SHOPPERS[i % SHOPPERS.length];
  const ch = CHANNELS.find((c) => c.id === s.ch);

  const send = () => {
    if (phaseRef.current === 'sent') return;
    clear();
    setPhase('sent');
    setResolved((n) => n + 1);
  };
  useEffect(() => {
    clear();
    phaseRef.current = 'in';
    setPhase('in');
    later(() => setPhase('draft'), 1100);
    later(send, 6500);
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rcx" role="region" aria-label="Interactive store support desk">
      <div className="rcx-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="rcx-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          BrightLane support
        </span>
        <span className="rcx-time"><i className="ri-moon-line" aria-hidden="true"></i>11:42 pm · AI on</span>
      </div>

      <div className="rcx-chs" aria-label="Channels">
        {CHANNELS.map((c) => (
          <span key={c.id} className={c.id === s.ch ? 'is-on' : ''} title={c.label}><i className={c.icon} aria-hidden="true"></i></span>
        ))}
        <em>One queue</em>
      </div>

      <div className="rcx-body" key={i}>
        <div className="rcx-chat" aria-live="polite">
          <span className="rcx-who"><b>{s.who}</b><em><i className={ch.icon} aria-hidden="true"></i>{ch.label}</em></span>
          <p className="rcx-msg rcx-msg--in">{s.ask}</p>
          {phase === 'in' && <span className="rcx-typing"><i></i><i></i><i></i>Looking up the store…</span>}
          {phase !== 'in' && (
            <p className={`rcx-msg rcx-msg--out${phase === 'draft' ? ' is-draft' : ''}`}>
              {phase === 'draft' && <span className="rcx-draft"><i className="ri-sparkling-2-fill" aria-hidden="true"></i>AI draft</span>}
              {s.reply}
            </p>
          )}
        </div>

        <div className={`rcx-card${phase === 'in' ? ' is-loading' : ''}`}>
          <span className="rcx-card-k"><i className="ri-shopping-bag-3-line" aria-hidden="true"></i>{s.card.k}</span>
          {s.card.lines.map((l) => <span key={l} className="rcx-card-l">{l}</span>)}
          <span className={`rcx-card-st rcx-card-st--${s.card.tone}`}>{s.card.status}</span>
          <em>{s.card.foot}</em>
        </div>
      </div>

      <div className="rcx-foot">
        {phase !== 'sent' ? (
          <>
            <span><i className="ri-robot-2-line" aria-hidden="true"></i>{phase === 'draft' ? 'Draft ready' : 'Reading the order…'}</span>
            <button type="button" onClick={send} disabled={phase !== 'draft'}>Send AI reply</button>
          </>
        ) : (
          <>
            <span className="is-done"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{s.kind} · resolved by AI</span>
            <button type="button" onClick={() => setI((n) => n + 1)}>Next shopper<i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
          </>
        )}
        <b className="rcx-count" aria-live="polite">{resolved} <em>resolved tonight</em></b>
      </div>
    </div>
  );
}
