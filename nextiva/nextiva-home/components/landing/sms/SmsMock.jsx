'use client';
/* Working hero mockup for the Business SMS & MMS page: a business texting
   thread with a customer. Type and send (Enter works) — each message goes
   Sending → Delivered; the character counter shows SMS segments; insert a
   template with merge fields filled in; attach an image (sent as MMS); the
   customer replies to what you send; if they text STOP the opt-out reply is
   sent automatically and the thread is locked, START re-subscribes. */
import { useEffect, useRef, useState } from 'react';

const CUSTOMER = { name: 'Maya Patel', first: 'Maya', num: '+1 (415) 555-0182', order: '#4821' };

const TEMPLATES = [
  { id: 'ship', label: 'Order shipped', text: 'Hi {first_name}, your order {order_id} ships today 📦' },
  { id: 'remind', label: 'Appointment reminder', text: 'Hi {first_name}, reminder: your appointment is tomorrow at 10:00. Reply C to confirm.' },
  { id: 'review', label: 'Review request', text: 'Thanks {first_name}! Mind leaving us a quick review? It helps a lot 🙏' },
];
const IMAGES = [
  { name: 'shipping-label.png', size: '142 KB', icon: 'ri-image-2-line' },
  { name: 'product-photo.jpg', size: '318 KB', icon: 'ri-image-line' },
];

let seq = 0;
const newId = () => `s-${Date.now().toString(36)}-${(seq += 1).toString(36)}`;
const fill = (t) => t.replace('{first_name}', CUSTOMER.first).replace('{order_id}', CUSTOMER.order);
const clock = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const SEED = [
  { id: 'seed-1', dir: 'out', text: 'Hi Maya 👋 your order #4821 ships today.', at: '10:42', status: 'delivered' },
  { id: 'seed-2', dir: 'in', text: 'Amazing! Can I get a tracking link?', at: '10:43' },
];

function replyFor(text, mms) {
  const t = text.toLowerCase();
  if (mms) return 'Got it, thanks for the label! 🙌';
  if (/track|link/.test(t)) return 'Perfect, tracking works 👍';
  if (/review/.test(t)) return 'Done — 5 stars ⭐';
  if (/appointment|reminder|confirm/.test(t)) return 'C';
  if (/ship|order/.test(t)) return 'Great, thank you!';
  if (t.includes('?')) return 'Hmm, let me check and get back to you.';
  return 'Thanks! 😊';
}

export default function SmsMock({ page }) {
  const [msgs, setMsgs] = useState(SEED);
  const [draft, setDraft] = useState('');
  const [panel, setPanel] = useState(null); // 'tpl' | 'img' | null
  const [typing, setTyping] = useState(false);
  const [optedOut, setOptedOut] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);
  const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // One scripted reply on load: we send the tracking link.
  useEffect(() => {
    later(() => sendOut('Of course — here’s your tracking link: brightfield.co/t/4821', null, true), 1600);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  const setStatus = (id, status) => setMsgs((cur) => cur.map((x) => (x.id === id ? { ...x, status } : x)));

  const customerSays = (text, wait = 900) => {
    later(() => setTyping(true), wait);
    later(() => {
      setTyping(false);
      const id = newId();
      setMsgs((cur) => [...cur, { id, dir: 'in', text, at: clock() }]);
      const t = text.trim().toUpperCase();
      if (t === 'STOP') {
        later(() => {
          setMsgs((cur) => [...cur, { id: newId(), dir: 'out', auto: true, text: 'You’re unsubscribed from BrightField and won’t get more messages. Reply START to rejoin.', at: clock(), status: 'delivered' }]);
          setOptedOut(true);
        }, 600);
      }
    }, wait + 1400);
  };

  function sendOut(text, file, scripted) {
    const id = newId();
    setMsgs((cur) => [...cur, { id, dir: 'out', text, file, at: clock(), status: 'sending' }]);
    later(() => setStatus(id, 'sent'), 500);
    later(() => setStatus(id, 'delivered'), 1200);
    if (!scripted) customerSays(replyFor(text, !!file));
    else customerSays('Got it. Thanks!', 1800);
  }

  const send = (e) => {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || optedOut) return;
    sendOut(text);
    setDraft('');
    setPanel(null);
  };
  const applyTemplate = (t) => { setDraft(fill(t.text)); setPanel(null); inputRef.current?.focus(); };
  const attach = (f) => { if (optedOut) return; sendOut('', f); setPanel(null); };
  const simulateStop = () => { if (!optedOut) customerSays('STOP', 200); };
  const resubscribe = () => {
    setMsgs((cur) => [...cur,
      { id: newId(), dir: 'in', text: 'START', at: clock() },
      { id: newId(), dir: 'out', auto: true, text: 'Welcome back! You’re subscribed again. Reply STOP to opt out.', at: clock(), status: 'delivered' }]);
    setOptedOut(false);
  };

  const chars = draft.length;
  const segments = chars === 0 ? 0 : Math.ceil(chars / 160);

  return (
    <div className="smm" role="region" aria-label="Interactive business texting demo">
      <div className="smm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="smm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          {page.title}
        </span>
        <span className="smm-reg"><i className="ri-shield-check-fill" aria-hidden="true"></i>10DLC registered</span>
      </div>

      <div className="smm-contact">
        <span className="smm-av">MP</span>
        <span className="smm-who"><b>{CUSTOMER.name}</b><em>{CUSTOMER.num} · from your business number</em></span>
        {optedOut
          ? <span className="smm-state smm-state--out"><i aria-hidden="true"></i>Opted out</span>
          : <span className="smm-state"><i aria-hidden="true"></i>Subscribed</span>}
      </div>

      <ol className="smm-thread" ref={listRef}>
        {msgs.map((x) => (
          <li key={x.id} className={`smm-msg smm-msg--${x.dir}${x.auto ? ' is-auto' : ''}`}>
            {x.auto && <span className="smm-auto"><i className="ri-robot-2-line" aria-hidden="true"></i>Sent automatically</span>}
            {x.file ? (
              <span className="smm-mms">
                <span className="smm-mms-img" aria-hidden="true"><i className={x.file.icon}></i></span>
                <span className="smm-mms-meta"><b>{x.file.name}</b><em>MMS · {x.file.size}</em></span>
              </span>
            ) : <span className="smm-bubble">{x.text}</span>}
            <span className="smm-meta">
              {x.at}
              {x.dir === 'out' && (
                <span className={`smm-status smm-status--${x.status}`}>
                  {x.status === 'sending' ? 'Sending…' : x.status === 'sent' ? '✓ Sent' : '✓✓ Delivered'}
                </span>
              )}
            </span>
          </li>
        ))}
        {typing && <li className="smm-typing" aria-label="Customer is typing"><span><i></i><i></i><i></i></span></li>}
      </ol>

      <form className="smm-compose" onSubmit={send}>
        {panel === 'tpl' && (
          <div className="smm-pop" role="listbox" aria-label="Templates">
            <span className="smm-pop-label">Templates · merge fields filled in</span>
            {TEMPLATES.map((t) => (
              <button key={t.id} type="button" onClick={() => applyTemplate(t)}>
                <b>{t.label}</b><em>{fill(t.text)}</em>
              </button>
            ))}
          </div>
        )}
        {panel === 'img' && (
          <div className="smm-pop" role="listbox" aria-label="Attach an image">
            <span className="smm-pop-label">Send as MMS</span>
            {IMAGES.map((f) => (
              <button key={f.name} type="button" className="smm-pop-file" onClick={() => attach(f)}>
                <i className={f.icon} aria-hidden="true"></i><b>{f.name}</b><em>{f.size}</em>
              </button>
            ))}
          </div>
        )}
        {optedOut ? (
          <div className="smm-locked">
            <i className="ri-forbid-line" aria-hidden="true"></i>
            <span>Maya opted out — you can’t text her until she replies START.</span>
            <button type="button" onClick={resubscribe}>Simulate START</button>
          </div>
        ) : (
          <>
            <div className="smm-tools">
              <button type="button" className={panel === 'tpl' ? 'is-on' : ''} onClick={() => setPanel(panel === 'tpl' ? null : 'tpl')}>
                <i className="ri-file-copy-2-line" aria-hidden="true"></i>Templates
              </button>
              <button type="button" className={panel === 'img' ? 'is-on' : ''} onClick={() => setPanel(panel === 'img' ? null : 'img')}>
                <i className="ri-image-add-line" aria-hidden="true"></i>MMS
              </button>
              <button type="button" onClick={simulateStop} title="See what happens when a customer opts out">
                <i className="ri-forbid-2-line" aria-hidden="true"></i>Test STOP
              </button>
              <span className="smm-count">{chars}/160 · {segments || 1} segment{segments > 1 ? 's' : ''}</span>
            </div>
            <div className="smm-row">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Text Maya…"
                aria-label="Message"
              />
              <button type="submit" className="smm-send" disabled={!draft.trim()} aria-label="Send">
                <i className="ri-send-plane-2-fill" aria-hidden="true"></i>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
