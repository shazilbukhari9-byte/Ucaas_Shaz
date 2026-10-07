'use client';
/* Interactive sections for the Retail & eCom page:
   - QueueDemo: the same eight messages as six channel tabs (click between
     them while shoppers wait in the others) or as one queue sorted by wait,
     with the order attached to each.
   - RecoveryDemo: build an abandoned-cart flow — store, delay, offer and the
     shopper's local time — then play it on a phone preview. Texts are held
     during quiet hours.
   - PeakDemo: pick a day on the retail calendar; volume by channel, what the
     AI takes off the queue and how many seasonal seats to add. */
import { useEffect, useRef, useState } from 'react';

const CH = {
  voice: { icon: 'ri-phone-line', label: 'Voice' },
  sms: { icon: 'ri-message-2-line', label: 'SMS' },
  wa: { icon: 'ri-whatsapp-line', label: 'WhatsApp' },
  ig: { icon: 'ri-instagram-line', label: 'Instagram' },
  fb: { icon: 'ri-messenger-line', label: 'Facebook' },
  chat: { icon: 'ri-chat-3-line', label: 'Web chat' },
};

/* ── One queue vs six tabs ────────────────────────────────────────────── */
const MSGS = [
  { who: 'Nora B.', ch: 'voice', text: 'Calling about a double charge', order: '#4230 · Paid', team: 'Billing', wait: 212 },
  { who: 'Maya C.', ch: 'wa', text: 'Where’s my order?', order: '#4218 · Out for delivery', team: 'AI', wait: 175 },
  { who: 'Leo P.', ch: 'ig', text: 'Can I return the jacket?', order: '#4193 · Return eligible', team: 'Returns', wait: 140 },
  { who: 'Sam T.', ch: 'chat', text: 'Discount code isn’t working', order: 'Cart · 3 items', team: 'Sales', wait: 96 },
  { who: 'Ava R.', ch: 'sms', text: 'Linen shirt in medium?', order: 'Inventory · M in stock', team: 'AI', wait: 64 },
  { who: 'Kofi A.', ch: 'fb', text: 'Package arrived damaged', order: '#4177 · Delivered', team: 'Returns', wait: 41 },
  { who: 'Ines M.', ch: 'wa', text: 'Can I change the address?', order: '#4236 · Not shipped', team: 'AI', wait: 22 },
  { who: 'Theo W.', ch: 'ig', text: 'Is the sale on in stores too?', order: 'No recent order', team: 'Sales', wait: 9 },
];
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function QueueDemo({ data }) {
  const [view, setView] = useState('queue');
  const [tab, setTab] = useState('voice');
  const inTab = MSGS.filter((m) => m.ch === tab);
  const elsewhere = MSGS.filter((m) => m.ch !== tab);
  const oldest = elsewhere.reduce((a, m) => Math.max(a, m.wait), 0);

  return (
    <section className="lp-section rc-q-sec">
      <div className="lp-wrap">
        <div className="rc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="rc-q reveal reveal-delay-1">
          <div className="rc-q-toggle" role="group" aria-label="View">
            <button type="button" className={view === 'tabs' ? 'is-on' : ''} aria-pressed={view === 'tabs'} onClick={() => setView('tabs')}><i className="ri-layout-top-line" aria-hidden="true"></i>Six tabs</button>
            <button type="button" className={view === 'queue' ? 'is-on' : ''} aria-pressed={view === 'queue'} onClick={() => setView('queue')}><i className="ri-inbox-2-line" aria-hidden="true"></i>One queue</button>
          </div>

          <div className="rc-q-win">
            {view === 'tabs' ? (
              <>
                <div className="rc-q-tabs" role="tablist" aria-label="Channel inboxes">
                  {Object.entries(CH).map(([id, c]) => {
                    const n = MSGS.filter((m) => m.ch === id).length;
                    return (
                      <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'is-on' : ''} onClick={() => setTab(id)}>
                        <i className={c.icon} aria-hidden="true"></i><span>{c.label}</span>{n > 0 && <b>{n}</b>}
                      </button>
                    );
                  })}
                </div>
                <ul className="rc-q-list" aria-live="polite">
                  {inTab.map((m) => (
                    <li key={m.who} className="rc-q-row rc-q-row--bare">
                      <span className="rc-q-av">{m.who.split(' ').map((w) => w[0]).join('')}</span>
                      <span className="rc-q-body"><b>{m.who}</b><em>{m.text}</em></span>
                      <span className="rc-q-ask">Order number?</span>
                      <span className="rc-q-wait">{mmss(m.wait)}</span>
                    </li>
                  ))}
                </ul>
                <p className="rc-q-warn"><i className="ri-error-warning-line" aria-hidden="true"></i>{elsewhere.length} shoppers waiting in other tabs — the oldest for {mmss(oldest)}. No order details here, so the agent has to ask.</p>
              </>
            ) : (
              <>
                <div className="rc-q-qh"><span><i className="ri-inbox-2-line" aria-hidden="true"></i>All channels</span><em>{MSGS.length} waiting · sorted by wait</em></div>
                <ul className="rc-q-list" aria-live="polite">
                  {MSGS.map((m) => (
                    <li key={m.who} className="rc-q-row">
                      <span className="rc-q-ch" title={CH[m.ch].label}><i className={CH[m.ch].icon} aria-hidden="true"></i></span>
                      <span className="rc-q-body"><b>{m.who}</b><em>{m.text}</em></span>
                      <span className="rc-q-order"><i className="ri-shopping-bag-3-line" aria-hidden="true"></i>{m.order}</span>
                      <span className={`rc-q-team${m.team === 'AI' ? ' is-ai' : ''}`}>{m.team === 'AI' ? 'AI answering' : m.team}</span>
                      <span className="rc-q-wait">{mmss(m.wait)}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Cart recovery flow ───────────────────────────────────────────────── */
const STORES = ['Shopify', 'BigCommerce', 'WooCommerce'];
const DELAYS = [{ v: 15, label: '15 min' }, { v: 30, label: '30 min' }, { v: 60, label: '1 hour' }];
const OFFERS = [
  { id: 'none', label: 'No offer', line: '' },
  { id: 'ship', label: 'Free shipping', line: ' Free shipping is on us if you finish today.' },
  { id: 'pct', label: '10% off', line: ' Here’s 10% off: BACK10.' },
];

export function RecoveryDemo({ data }) {
  const [store, setStore] = useState('Shopify');
  const [delay, setDelay] = useState(30);
  const [offer, setOffer] = useState('ship');
  const [late, setLate] = useState(false);
  const [step, setStep] = useState(0);
  const timer = useRef(null);
  useEffect(() => () => clearInterval(timer.current), []);
  const reset = (fn) => (v) => { clearInterval(timer.current); setStep(0); fn(v); };

  const o = OFFERS.find((x) => x.id === offer);
  const sendLabel = late ? 'Held for quiet hours · sent 8:00 am' : `T+${delay} min`;
  const steps = [
    { t: 'T+0', title: 'Cart abandoned', text: `${store} sends the cart: linen shirt, canvas tote.`, icon: 'ri-shopping-cart-2-line' },
    { t: late ? '8:00 am' : `T+${delay}m`, title: 'Text sent', text: late ? 'Shopper’s local time is 10:40 pm — held until morning.' : 'Inside quiet hours rules · opt-out included.', icon: 'ri-message-2-line' },
    { t: late ? '8:04 am' : `T+${delay + 4}m`, title: 'Shopper replies', text: offer === 'none' ? '“Does the shirt run small?”' : '“Does it work on sale items?”', icon: 'ri-chat-1-line' },
    { t: late ? '8:04 am' : `T+${delay + 4}m`, title: 'AI answers', text: 'With the cart and catalog in hand — no agent needed.', icon: 'ri-robot-2-line' },
    { t: late ? '8:15 am' : `T+${delay + 15}m`, title: 'Checkout complete', text: 'Order created and attributed to this flow.', icon: 'ri-checkbox-circle-line' },
  ];
  const play = () => {
    clearInterval(timer.current);
    setStep(1);
    timer.current = setInterval(() => setStep((s) => {
      if (s + 1 >= steps.length) clearInterval(timer.current);
      return Math.min(steps.length, s + 1);
    }), 900);
  };
  const qReply = offer === 'none' ? 'Does the shirt run small?' : 'Does it work on sale items?';
  const aReply = offer === 'none' ? 'It runs true to size — most people take their usual. Your cart’s saved here.' : 'Yes, it works on everything in your cart — it’s applied at checkout.';

  return (
    <section className="lp-section lp-section--theme rc-rv-sec">
      <div className="lp-wrap">
        <div className="rc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="rc-rv reveal reveal-delay-1">
          <div className="rc-rv-build">
            <div className="rc-rv-ctl">
              <span className="rc-rv-k">Store</span>
              <div className="rc-chips" role="group" aria-label="Store platform">
                {STORES.map((x) => <button key={x} type="button" className={store === x ? 'is-on' : ''} aria-pressed={store === x} onClick={() => reset(setStore)(x)}>{x}</button>)}
              </div>
            </div>
            <div className="rc-rv-ctl">
              <span className="rc-rv-k">Send after</span>
              <div className="rc-chips" role="group" aria-label="Delay">
                {DELAYS.map((x) => <button key={x.v} type="button" className={delay === x.v ? 'is-on' : ''} aria-pressed={delay === x.v} onClick={() => reset(setDelay)(x.v)}>{x.label}</button>)}
              </div>
            </div>
            <div className="rc-rv-ctl">
              <span className="rc-rv-k">Offer</span>
              <div className="rc-chips" role="group" aria-label="Offer">
                {OFFERS.map((x) => <button key={x.id} type="button" className={offer === x.id ? 'is-on' : ''} aria-pressed={offer === x.id} onClick={() => reset(setOffer)(x.id)}>{x.label}</button>)}
              </div>
            </div>
            <div className="rc-rv-ctl">
              <span className="rc-rv-k">Shopper’s local time</span>
              <div className="rc-chips" role="group" aria-label="Shopper local time">
                <button type="button" className={!late ? 'is-on' : ''} aria-pressed={!late} onClick={() => reset(setLate)(false)}>2:30 pm</button>
                <button type="button" className={late ? 'is-on' : ''} aria-pressed={late} onClick={() => reset(setLate)(true)}>10:40 pm</button>
              </div>
            </div>

            <ol className="rc-rv-steps" aria-live="polite">
              {steps.map((x, n) => (
                <li key={x.title} className={n < step ? 'is-done' : n === step && step > 0 ? 'is-next' : ''}>
                  <span className="rc-rv-dot"><i className={x.icon} aria-hidden="true"></i></span>
                  <span className="rc-rv-body"><b>{x.title}</b><em>{x.text}</em></span>
                  <span className="rc-rv-t">{x.t}</span>
                </li>
              ))}
            </ol>
            <button type="button" className="rc-rv-play" onClick={play}><i className="ri-play-fill" aria-hidden="true"></i>{step ? 'Play again' : 'Play the flow'}</button>
          </div>

          <div className="rc-phone" aria-live="polite">
            <span className="rc-phone-notch" aria-hidden="true"></span>
            <div className="rc-phone-top"><span className="rc-phone-av">BL</span><b>BrightLane</b><em>10DLC registered</em></div>
            <div className="rc-phone-thread">
              {step >= 2 ? (
                <p className="rc-b rc-b--in"><span className="rc-b-t">{sendLabel}</span>Hi Jordan — you left a linen shirt and a canvas tote in your cart.{o.line} Pick up where you left off: brightlane.co/c/8k2 <em>Reply STOP to opt out</em></p>
              ) : (
                <p className="rc-phone-empty">{step === 1 ? 'Cart received from ' + store + '…' : 'Press “Play the flow”'}</p>
              )}
              {step >= 3 && <p className="rc-b rc-b--out">{qReply}</p>}
              {step >= 4 && <p className="rc-b rc-b--in rc-b--ai"><span className="rc-b-t"><i className="ri-sparkling-2-fill" aria-hidden="true"></i>AI</span>{aReply}</p>}
              {step >= 5 && <span className="rc-b-done"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>Order placed · recovered by this flow</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Peak season ──────────────────────────────────────────────────────── */
// Example hourly volumes for a mid-size store — for the demo only.
const DAYS = [
  { id: 'tue', label: 'Typical Tuesday', vol: { voice: 18, sms: 22, wa: 16, ig: 10, fb: 6, chat: 28 }, ai: 0.4 },
  { id: 'bf', label: 'Black Friday', vol: { voice: 64, sms: 96, wa: 70, ig: 48, fb: 22, chat: 120 }, ai: 0.5 },
  { id: 'cm', label: 'Cyber Monday', vol: { voice: 48, sms: 80, wa: 58, ig: 36, fb: 18, chat: 132 }, ai: 0.52 },
  { id: 'ret', label: 'January returns', vol: { voice: 52, sms: 40, wa: 46, ig: 20, fb: 14, chat: 60 }, ai: 0.45 },
];
const TEAM = 14;
const PER_AGENT = 12; // conversations an agent closes per hour

export function PeakDemo({ data }) {
  const [id, setId] = useState('bf');
  const [added, setAdded] = useState({});
  const d = DAYS.find((x) => x.id === id);
  const total = Object.values(d.vol).reduce((a, b) => a + b, 0);
  const byAi = Math.round(total * d.ai);
  const need = Math.ceil((total - byAi) / PER_AGENT);
  const extra = added[id] || 0;
  const gap = Math.max(0, need - TEAM - extra);
  const cover = Math.min(100, Math.round(((TEAM + extra) / need) * 100));
  const max = Math.max(...DAYS.flatMap((x) => Object.values(x.vol)));

  return (
    <section className="lp-section rc-pk-sec">
      <div className="lp-wrap">
        <div className="rc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="rc-pk reveal reveal-delay-1">
          <div className="rc-pk-days" role="group" aria-label="Day">
            {DAYS.map((x) => <button key={x.id} type="button" className={id === x.id ? 'is-on' : ''} aria-pressed={id === x.id} onClick={() => setId(x.id)}>{x.label}</button>)}
          </div>
          <div className="rc-pk-grid">
            <div className="rc-pk-bars">
              <span className="rc-pk-k">Conversations per hour · example volumes</span>
              {Object.entries(d.vol).map(([ch, v]) => (
                <div key={ch} className="rc-pk-bar">
                  <span className="rc-pk-ch"><i className={CH[ch].icon} aria-hidden="true"></i>{CH[ch].label}</span>
                  <span className="rc-pk-track"><i style={{ width: `${(v / max) * 100}%` }}></i></span>
                  <b>{v}</b>
                </div>
              ))}
            </div>
            <div className="rc-pk-out" aria-live="polite">
              <div className="rc-pk-nums">
                <span><b>{total}</b>per hour</span>
                <span className="is-ai"><b>{byAi}</b>handled by AI</span>
                <span><b>{need}</b>agents needed</span>
              </div>
              <div className="rc-pk-cover">
                <span className="rc-pk-cover-top"><b>Coverage</b><em>{TEAM} on the team{extra ? ` + ${extra} seasonal` : ''}</em></span>
                <span className={`rc-pk-meter${cover >= 100 ? ' is-full' : ''}`}><i style={{ width: `${cover}%` }}></i></span>
                <em className="rc-pk-pct">{cover}%</em>
              </div>
              {gap > 0 ? (
                <button type="button" className="rc-pk-add" onClick={() => setAdded((a) => ({ ...a, [id]: (a[id] || 0) + gap }))}>
                  <i className="ri-user-add-line" aria-hidden="true"></i>Add {gap} seasonal seat{gap > 1 ? 's' : ''}
                </button>
              ) : (
                <p className="rc-pk-ok"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{extra ? `${extra} seats added · live in about 2 hours, same queue and routing` : 'Your team covers this day — no extra seats needed'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
