'use client';
/* Interactive sections for the Support Teams page:
   - MergeDemo: the same issue over three days and three channels — as three
     disconnected tickets, or as one conversation with shared memory.
   - ChannelsDemo: send a message in from any of eight channels and watch it
     join the same queue and the customer's existing thread.
   - KnowledgeDemo: pick what the customer asks; the AI suggests an answer
     with the source articles cited, and the agent inserts it.
   - Tier1Demo: switch AI tier-1 on and run the queue — routine questions
     resolve on the spot, sensitive ones escalate with context. */
import { useEffect, useRef, useState } from 'react';

/* ── Three channels, one conversation ─────────────────────────────────── */
const DAYS = [
  { day: 'Tue', ch: 'WhatsApp', icon: 'ri-whatsapp-line', msg: 'My lamp arrived cracked. Photos attached.', cold: 'Agent asks for order number and photos' },
  { day: 'Wed', ch: 'Web chat', icon: 'ri-chat-3-line', msg: 'Any update on my broken lamp?', cold: 'New agent asks for photos again' },
  { day: 'Thu', ch: 'Phone', icon: 'ri-phone-line', msg: 'I’m calling about the lamp — third time now.', cold: 'Customer explains everything from scratch' },
];

export function MergeDemo({ text }) {
  const [merged, setMerged] = useState(true);
  return (
    <section className="lp-section st-mg-sec">
      <div className="lp-wrap">
        <p className="st-mg-text reveal">{text}</p>
        <div className="st-mg reveal reveal-delay-1">
          <div className="st-mg-toggle" role="group" aria-label="View">
            <button type="button" className={!merged ? 'is-on' : ''} aria-pressed={!merged} onClick={() => setMerged(false)}>Three tickets</button>
            <button type="button" className={merged ? 'is-on' : ''} aria-pressed={merged} onClick={() => setMerged(true)}>One conversation</button>
          </div>
          <div className={`st-mg-board${merged ? ' is-merged' : ''}`} aria-live="polite">
            {DAYS.map((d, i) => (
              <div key={d.day} className="st-mg-card">
                <span className="st-mg-top"><i className={d.icon} aria-hidden="true"></i>{d.ch}<em>{d.day}</em>{!merged && <b>Ticket #{3100 + i * 17}</b>}</span>
                <p className="st-mg-msg">{d.msg}</p>
                {merged
                  ? <span className="st-mg-note is-good"><i className="ri-history-line" aria-hidden="true"></i>{i === 0 ? 'Photos saved to the contact' : 'Agent sees everything before saying hello'}</span>
                  : <span className="st-mg-note"><i className="ri-error-warning-line" aria-hidden="true"></i>{d.cold}</span>}
              </div>
            ))}
            {merged && <div className="st-mg-end"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>Replacement sent on the call · one thread, resolved</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Eight channels into one queue ────────────────────────────────────── */
const CHANNELS = [
  { id: 'voice', label: 'Voice', icon: 'ri-phone-line', msg: 'Inbound call · order question' },
  { id: 'sms', label: 'SMS', icon: 'ri-message-2-line', msg: '“Is my order shipped yet?”' },
  { id: 'chat', label: 'Web chat', icon: 'ri-chat-3-line', msg: '“Can I change my size?”' },
  { id: 'wa', label: 'WhatsApp', icon: 'ri-whatsapp-line', msg: '“Photo of the damaged box”' },
  { id: 'ig', label: 'Instagram', icon: 'ri-instagram-line', msg: 'DM · “Do you ship to Canada?”' },
  { id: 'fb', label: 'Facebook', icon: 'ri-messenger-line', msg: '“Still waiting for a refund”' },
  { id: 'tg', label: 'Telegram', icon: 'ri-telegram-line', msg: '“Where do I find my invoice?”' },
  { id: 'x', label: 'X', icon: 'ri-twitter-x-line', msg: 'Mention · “Support, are you there?”' },
];
const PEOPLE = ['Marco D.', 'Ana P.', 'Lee T.'];
const DESKS = ['Zendesk', 'Freshdesk', 'HubSpot Service'];

export function ChannelsDemo({ data }) {
  const [queue, setQueue] = useState([
    { key: 'a', ch: CHANNELS[3], who: 'Marco D.', n: 2 },
    { key: 'b', ch: CHANNELS[1], who: 'Ana P.', n: 1 },
  ]);
  const [desk, setDesk] = useState('Zendesk');
  const count = useRef(0);
  const send = (ch) => {
    count.current += 1;
    const who = PEOPLE[count.current % PEOPLE.length];
    setQueue((q) => {
      const prev = q.find((x) => x.who === who);
      return [{ key: `${ch.id}-${count.current}`, ch, who, n: (prev ? prev.n : 0) + 1, fresh: true }, ...q.filter((x) => x.who !== who)].slice(0, 4);
    });
  };
  return (
    <section className="lp-section lp-section--theme st-ch-sec">
      <div className="lp-wrap">
        <div className="st-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="st-ch reveal reveal-delay-1">
          <div className="st-ch-grid" role="group" aria-label="Send a message from a channel">
            {CHANNELS.map((c) => (
              <button key={c.id} type="button" onClick={() => send(c)}>
                <i className={c.icon} aria-hidden="true"></i><b>{c.label}</b><em>Send in</em>
              </button>
            ))}
          </div>
          <div className="st-ch-flow" aria-hidden="true"><i></i><i></i><i></i></div>
          <div className="st-ch-q">
            <span className="st-ch-qh"><i className="ri-inbox-2-line" aria-hidden="true"></i>One queue<em>{queue.length} threads</em></span>
            <ul aria-live="polite">
              {queue.map((x) => (
                <li key={x.key} className={x.fresh ? 'is-fresh' : ''}>
                  <span className="st-ch-av">{x.who.split(' ').map((w) => w[0]).join('')}</span>
                  <span className="st-ch-body"><b>{x.who}</b><em><i className={x.ch.icon} aria-hidden="true"></i>{x.ch.msg}</em></span>
                  <span className="st-ch-mem">{x.n > 1 ? `${x.n} contacts · history attached` : 'New thread'}</span>
                </li>
              ))}
            </ul>
            <div className="st-ch-sync">
              <span>Syncs with</span>
              {DESKS.map((d) => <button key={d} type="button" className={desk === d ? 'is-on' : ''} aria-pressed={desk === d} onClick={() => setDesk(d)}>{d}</button>)}
              <em><i className="ri-refresh-line" aria-hidden="true"></i>Tickets mirrored to {desk}</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Knowledge in the agent's ear ─────────────────────────────────────── */
const ASKS = [
  {
    id: 'return', label: 'Return after 30 days',
    said: '“I bought this 34 days ago — can I still send it back?”',
    answer: 'Yes — as a loyalty member you have 45 days. I’ll email a prepaid return label now.',
    cites: [{ t: 'Returns policy', s: '§2 · Member return window' }, { t: 'Macro', s: 'Send prepaid return label' }],
  },
  {
    id: 'rma', label: 'Faulty device',
    said: '“The charger stopped working after two weeks.”',
    answer: 'That’s covered under warranty. I’ve opened a replacement request — you’ll get a shipping label by email.',
    cites: [{ t: 'Warranty guide', s: 'Chargers & accessories' }, { t: 'Process', s: 'Open a replacement (RMA)' }],
  },
  {
    id: 'credit', label: 'Late delivery',
    said: '“It arrived three days late and I needed it for an event.”',
    answer: 'I’m sorry it missed your event. I’ve refunded the shipping and added a credit to your account.',
    cites: [{ t: 'Delivery promise', s: 'Late-delivery remedies' }, { t: 'Macro', s: 'Apply goodwill credit' }],
  },
];

export function KnowledgeDemo({ data }) {
  const [id, setId] = useState('return');
  const [inserted, setInserted] = useState(false);
  const a = ASKS.find((x) => x.id === id);
  return (
    <section className="lp-section st-kb-sec">
      <div className="lp-wrap">
        <div className="st-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="st-kb reveal reveal-delay-1">
          <div className="st-kb-asks" role="group" aria-label="Customer question">
            <span className="st-kb-k">The customer asks</span>
            {ASKS.map((x) => (
              <button key={x.id} type="button" className={id === x.id ? 'is-on' : ''} aria-pressed={id === x.id} onClick={() => { setId(x.id); setInserted(false); }}>{x.label}</button>
            ))}
          </div>
          <div className="st-kb-main" key={id} aria-live="polite">
            <p className="st-kb-said"><span>Customer</span>{a.said}</p>
            <div className="st-kb-sug">
              <span className="st-kb-sug-top"><i className="ri-sparkling-2-fill" aria-hidden="true"></i>Suggested answer</span>
              <p>{a.answer}</p>
              <div className="st-kb-cites">
                {a.cites.map((c, i) => (
                  <span key={c.t} className="st-kb-cite"><b>[{i + 1}]</b><span><strong>{c.t}</strong><em>{c.s}</em></span></span>
                ))}
              </div>
            </div>
            <div className={`st-kb-box${inserted ? ' is-filled' : ''}`}>
              <p>{inserted ? a.answer : 'Type a reply…'}</p>
              <button type="button" onClick={() => setInserted(true)} disabled={inserted}>{inserted ? <><i className="ri-check-line" aria-hidden="true"></i>Inserted</> : 'Insert answer'}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── AI tier-1 ────────────────────────────────────────────────────────── */
const INCOMING = [
  { who: 'Order status', ch: 'ri-chat-3-line', ai: true, note: 'Tracking link sent' },
  { who: 'Password reset', ch: 'ri-message-2-line', ai: true, note: 'Reset link sent' },
  { who: 'Legal complaint', ch: 'ri-mail-line', ai: false, note: 'To a senior agent · summary attached' },
  { who: 'Return request', ch: 'ri-whatsapp-line', ai: true, note: 'Label emailed' },
  { who: 'Store hours', ch: 'ri-instagram-line', ai: true, note: 'Answered' },
  { who: 'Very upset caller', ch: 'ri-phone-line', ai: false, note: 'To the best-placed agent · sentiment flagged' },
];

export function Tier1Demo({ data }) {
  const [ai, setAi] = useState(true);
  const [step, setStep] = useState(0);
  const timer = useRef(null);
  useEffect(() => () => clearInterval(timer.current), []);
  const run = () => {
    clearInterval(timer.current);
    setStep(0);
    timer.current = setInterval(() => setStep((s) => {
      if (s + 1 >= INCOMING.length) clearInterval(timer.current);
      return Math.min(INCOMING.length, s + 1);
    }), 550);
  };
  const toggle = () => { clearInterval(timer.current); setStep(0); setAi((x) => !x); };
  const shown = INCOMING.slice(0, step);
  const byAi = ai ? shown.filter((x) => x.ai).length : 0;
  const toPeople = shown.length - byAi;
  const running = step > 0 && step < INCOMING.length;

  return (
    <section className="lp-section lp-section--theme st-t1-sec">
      <div className="lp-wrap">
        <div className="st-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="st-t1 reveal reveal-delay-1">
          <div className="st-t1-bar">
            <button type="button" className={`st-t1-switch${ai ? ' is-on' : ''}`} role="switch" aria-checked={ai} onClick={toggle}><i aria-hidden="true"></i>AI tier-1 {ai ? 'on' : 'off'}</button>
            <span className="st-t1-time"><i className="ri-moon-clear-line" aria-hidden="true"></i>02:14 · no agents online</span>
            <button type="button" className="st-t1-run" onClick={run} disabled={running}><i className="ri-play-fill" aria-hidden="true"></i>{step ? 'Run again' : 'Run the queue'}</button>
          </div>
          <div className="st-t1-lanes" aria-live="polite">
            <div className="st-t1-lane">
              <span className="st-t1-lh"><i className="ri-robot-2-line" aria-hidden="true"></i>Resolved by AI<b>{byAi}</b></span>
              <ul>{shown.filter((x) => ai && x.ai).map((x) => <li key={x.who}><i className={x.ch} aria-hidden="true"></i><b>{x.who}</b><em>{x.note}</em></li>)}</ul>
            </div>
            <div className="st-t1-lane st-t1-lane--people">
              <span className="st-t1-lh"><i className="ri-user-heart-line" aria-hidden="true"></i>{ai ? 'Escalated with context' : 'Waiting for an agent'}<b>{toPeople}</b></span>
              <ul>{shown.filter((x) => !(ai && x.ai)).map((x) => <li key={x.who}><i className={x.ch} aria-hidden="true"></i><b>{x.who}</b><em>{ai ? x.note : 'Queued until morning'}</em></li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
