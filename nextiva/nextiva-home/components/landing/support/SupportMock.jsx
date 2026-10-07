'use client';
/* Working hero mockup for the Support Teams page: an omnichannel inbox with
   shared memory. Pick a conversation to see the customer's history from
   every channel and the AI summary; send the suggested reply (cited from
   the knowledge base) and the ticket resolves and syncs to the helpdesk. */
import { useEffect, useRef, useState } from 'react';

const CONVOS = [
  {
    id: 'marco', who: 'Marco D.', ch: 'ri-phone-fill', chName: 'Voice', topic: 'Order #4821 · damaged item', mood: 'Frustrated',
    memory: [
      { ch: 'ri-whatsapp-line', when: 'Tue', text: 'Sent photos of a cracked lamp base' },
      { ch: 'ri-instagram-line', when: 'Wed', text: 'Asked by DM if a refund was approved' },
      { ch: 'ri-phone-line', when: 'Now', text: 'Calling to ask for a replacement' },
    ],
    summary: 'Third contact about the same damaged order. Photos already received — no need to ask again.',
    reply: 'I can see your photos from Tuesday — I’ve sent a free replacement today and emailed the tracking link.',
    source: 'Returns policy · Damaged items',
  },
  {
    id: 'ana', who: 'Ana P.', ch: 'ri-whatsapp-fill', chName: 'WhatsApp', topic: 'Change delivery address', mood: 'Neutral',
    memory: [
      { ch: 'ri-chat-3-line', when: 'Mon', text: 'Placed order #5102 via web chat' },
      { ch: 'ri-whatsapp-line', when: 'Now', text: 'Moving flats — needs a new address' },
    ],
    summary: 'Order hasn’t shipped yet, so the address can still be changed.',
    reply: 'Good news — it hasn’t shipped yet. I’ve updated the address; you’ll get a confirmation text.',
    source: 'Shipping · Address changes',
  },
  {
    id: 'lee', who: 'Lee T.', ch: 'ri-message-2-fill', chName: 'SMS', topic: 'Charged twice', mood: 'Upset',
    memory: [
      { ch: 'ri-mail-line', when: 'Fri', text: 'Emailed a bank statement screenshot' },
      { ch: 'ri-message-2-line', when: 'Now', text: 'Asking when the refund lands' },
    ],
    summary: 'Duplicate charge confirmed on Friday. Refund issued — 3–5 business days.',
    reply: 'Sorry about that — the duplicate charge was refunded Friday and should arrive within 3–5 business days.',
    source: 'Billing · Duplicate charges',
  },
];

export default function SupportMock({ page }) {
  const [id, setId] = useState('marco');
  const [typed, setTyped] = useState('');
  const [solved, setSolved] = useState([]);
  const timer = useRef(null);
  const c = CONVOS.find((x) => x.id === id);
  const isSolved = solved.includes(id);
  useEffect(() => () => clearInterval(timer.current), []);

  const pick = (x) => { clearInterval(timer.current); setTyped(''); setId(x); };
  const send = () => {
    if (isSolved || typed) return;
    let n = 0;
    timer.current = setInterval(() => {
      n += 3;
      setTyped(c.reply.slice(0, n));
      if (n >= c.reply.length) {
        clearInterval(timer.current);
        setTimeout(() => { setSolved((s) => [...s, id]); setTyped(''); }, 450);
      }
    }, 22);
  };

  return (
    <div className="stm" role="region" aria-label="Interactive omnichannel support inbox">
      <div className="stm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="stm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Inbox
        </span>
        <span className="stm-q">{CONVOS.length - solved.length} open · all channels</span>
      </div>

      <div className="stm-body">
        <ul className="stm-list" role="group" aria-label="Conversations">
          {CONVOS.map((x) => (
            <li key={x.id}>
              <button type="button" className={`${x.id === id ? 'is-on' : ''}${solved.includes(x.id) ? ' is-solved' : ''}`} aria-pressed={x.id === id} onClick={() => pick(x.id)}>
                <i className={x.ch} aria-hidden="true"></i>
                <span><b>{x.who}</b><em>{solved.includes(x.id) ? 'Resolved' : x.topic}</em></span>
              </button>
            </li>
          ))}
        </ul>

        <div className="stm-pane" key={id} aria-live="polite">
          <div className="stm-pane-top">
            <b>{c.who}</b>
            <span className={`stm-mood stm-mood--${c.mood.toLowerCase()}`}>{c.mood}</span>
            <em>{c.chName}</em>
          </div>
          <span className="stm-k"><i className="ri-history-line" aria-hidden="true"></i>Shared memory</span>
          <ol className="stm-mem">
            {c.memory.map((m) => (
              <li key={m.when}><i className={m.ch} aria-hidden="true"></i><b>{m.when}</b><span>{m.text}</span></li>
            ))}
          </ol>
          <p className="stm-sum"><i className="ri-sparkling-2-fill" aria-hidden="true"></i>{c.summary}</p>
          {isSolved ? (
            <div className="stm-done"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>Resolved on first contact · synced to helpdesk</div>
          ) : (
            <div className="stm-reply">
              <p className={typed ? 'is-typing' : ''}>{typed || c.reply}</p>
              <span className="stm-src"><i className="ri-book-open-line" aria-hidden="true"></i>{c.source}</span>
              <button type="button" onClick={send} disabled={!!typed}>{typed ? 'Sending…' : 'Send suggested reply'}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
