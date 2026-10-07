'use client';
/* Business SMS & MMS page sections (SmsPage.jsx):
   - SmsFeatures:   feature tabs over a split — what the customer sees on a
                    phone, and how you set it up in the dashboard;
   - RegTracker:    the 10DLC registration as a live tracker card;
   - InboxFlow:     the shared inbox, playing a thread from arrival to done
                    in step with four numbered points;
   - TextWall:      use cases as glass phone notifications over a photo.
   The interactive ones step on their own every STEP_MS and pause only while
   the visitor is actively using them (useIntentPause). Fixed heights, so
   nothing moves the page. Sample names, links and codes only. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

const STEP_MS = 3000;

function useStepper(count, start = 0) {
  const [i, setI] = useState(start);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => {
    if (paused || still) return undefined;
    const t = setTimeout(() => setI((x) => (x + 1) % count), STEP_MS);
    return () => clearTimeout(t);
  }, [i, paused, still, count]);
  return [i, setI, bind];
}

const Head = ({ kicker, title, intro }) => (
  <div className="sms-head reveal">
    <span className="lp-kicker">{kicker}</span>
    <h2 className="lp-h2">{title}</h2>
    {intro && <p className="lp-intro">{intro}</p>}
  </div>
);

/* ── 1 · What you get: customer's phone | your dashboard ────────────────── */
const Bub = ({ out, children, meta }) => (
  <span className={`smx-bub${out ? ' smx-bub--out' : ''}`}>{children}{meta && <em>{meta}</em>}</span>
);

const SCENES = {
  'Two-way SMS & MMS': {
    phone: (
      <>
        <Bub out>Sorry to hear that — can you send a photo of the box?</Bub>
        <span className="smx-photo"><i className="ri-image-2-line"></i><b>damaged-box.jpg</b><em>MMS · 1.2 MB</em></span>
        <Bub>Here it is. The corner is crushed.</Bub>
      </>
    ),
    desk: (
      <div className="smx-desk-in">
        <span className="smx-row-k">Inbox · Maya Patel</span>
        <div className="smx-line"><i className="ri-image-2-line"></i>Photo received<b>damaged-box.jpg</b></div>
        <div className="smx-line"><i className="ri-reply-line"></i>Reply from your business number<b>(415) 555-0182</b></div>
        <div className="smx-compose">Thanks — a replacement ships today.<span>Send</span></div>
      </div>
    ),
  },
  'Templates & merge fields': {
    phone: <Bub out meta="Delivered">Hi Maya, your order #4821 ships today. Track it: brightfield.co/t/4821</Bub>,
    desk: (
      <div className="smx-desk-in">
        <span className="smx-row-k">Template · Order shipped</span>
        <div className="smx-tpl">Hi <mark>{'{first_name}'}</mark>, your order <mark>{'{order_id}'}</mark> ships today. Track it: <mark>{'{tracking_link}'}</mark></div>
        <div className="smx-chips"><span>first_name → Maya</span><span>order_id → #4821</span><span>tracking_link</span></div>
        <div className="smx-compose smx-compose--meta">1 segment · 112 characters<span>Use template</span></div>
      </div>
    ),
  },
  'Scheduled sends & drips': {
    phone: <Bub out meta="Tue 9:00 · your time zone">Reminder: your appointment is tomorrow at 10:00. Reply C to confirm.</Bub>,
    desk: (
      <div className="smx-desk-in">
        <span className="smx-row-k">Follow-up sequence</span>
        {[['Day 0', 'Booking confirmation', 'Sent'], ['Day −1', 'Reminder · Tue 9:00', 'Scheduled'], ['Day +1', 'How did it go?', 'Queued']].map(([d, t, s], i) => (
          <div className={`smx-drip${i === 1 ? ' is-on' : ''}`} key={d}><span>{d}</span><b>{t}</b><em>{s}</em></div>
        ))}
        <div className="smx-note"><i className="ri-earth-line"></i>Sent in each customer’s own time zone</div>
      </div>
    ),
  },
  'Auto-replies & keywords': {
    phone: (
      <>
        <Bub>HOURS</Bub>
        <Bub out meta="Auto-reply · after hours">We’re open 8–6, Mon–Sat. A teammate will reply first thing tomorrow.</Bub>
      </>
    ),
    desk: (
      <div className="smx-desk-in">
        <span className="smx-row-k">Keyword rules</span>
        {[['HOURS', 'Opening hours reply', 1], ['BOOK', 'Booking link'], ['AGENT', 'Route to a teammate']].map(([k, t, on]) => (
          <div className={`smx-rule${on ? ' is-on' : ''}`} key={k}><kbd>{k}</kbd><b>{t}</b><span className="smx-toggle"><i></i></span></div>
        ))}
        <div className="smx-note"><i className="ri-moon-line"></i>After-hours auto-reply on · 6 pm – 8 am</div>
      </div>
    ),
  },
  'STOP / HELP built in': {
    phone: (
      <>
        <Bub>STOP</Bub>
        <Bub out meta="Sent automatically">You’re unsubscribed and won’t receive more messages. Reply START to rejoin.</Bub>
      </>
    ),
    desk: (
      <div className="smx-desk-in">
        <span className="smx-row-k">Opt-out log</span>
        {[['Maya Patel', 'STOP', '10:44', 'Unsubscribed'], ['Sam Rivera', 'HELP', '09:12', 'Help sent'], ['Leo Park', 'START', 'Mon', 'Re-subscribed']].map(([n, k, t, s]) => (
          <div className="smx-log" key={n}><b>{n}</b><kbd>{k}</kbd><em>{t}</em><span>{s}</span></div>
        ))}
        <div className="smx-note"><i className="ri-shield-check-line"></i>Opted-out numbers are blocked from future sends</div>
      </div>
    ),
  },
  'CRM sync': {
    phone: (
      <>
        <Bub>Can I move my delivery to Friday?</Bub>
        <Bub out>Done — Friday between 9 and 12.</Bub>
      </>
    ),
    desk: (
      <div className="smx-desk-in">
        <span className="smx-row-k">Contact · Maya Patel</span>
        {[['ri-message-2-line', 'Text conversation', '10:44', 1], ['ri-phone-line', 'Call · 4 min', '10:20'], ['ri-mail-line', 'Order email', 'Mon']].map(([ic, t, at, on]) => (
          <div className={`smx-tl${on ? ' is-on' : ''}`} key={t}><i className={ic}></i><b>{t}</b><em>{at}</em></div>
        ))}
        <div className="smx-note"><i className="ri-refresh-line"></i>Logged to your CRM automatically — no copy and paste</div>
      </div>
    ),
  },
};

// A nature photo behind the panel for each feature tab (Unsplash); they crossfade.
const SMX_BG = ['1418489098061-ce87b5dc3aee', '1465146344425-f00d5f5c8f07', '1500534314209-a25ddb2bd429', '1502082553048-f009c37129b9', '1509316975850-ff9c5deb0cd9', '1431794062232-2a99a5431c6c']
  .map((id) => 'https://images.unsplash.com/photo-' + id + '?fm=jpg&q=72&w=1800&auto=format&fit=crop');

export function SmsFeatures({ page }) {
  const items = page.capabilities.filter((c) => SCENES[c.title]);
  const [i, setI, bind] = useStepper(items.length);
  const c = items[i];
  const sc = SCENES[c.title];
  return (
    <section className="lp-section smx-sec">
      <div className="lp-wrap">
        <Head kicker={page.capKicker} title={page.capTitle} intro={page.capIntro} />
        <div className="smx reveal" {...bind}>
          <span className="smx-bg" aria-hidden="true">
            {items.map((t, k) => <i key={t.title} className={k === i ? 'on' : undefined} style={{ backgroundImage: 'url(' + SMX_BG[k % SMX_BG.length] + ')' }}></i>)}
          </span>
          <div className="smx-tabs" role="tablist">
            {items.map((t, k) => (
              <button type="button" role="tab" aria-selected={k === i} key={t.title} className={`smx-tab${k === i ? ' is-on' : ''}`} onClick={() => setI(k)}>
                <i className={t.icon} aria-hidden="true"></i>{t.title}
              </button>
            ))}
          </div>
          <div className="smx-body">
            <div className="smx-copy" key={`c-${i}`}>
              <span className="smx-num">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
            <div className="smx-phone" aria-hidden="true">
              <span className="smx-label">What your customer sees</span>
              <div className="smx-device">
                <span className="smx-status"><b>9:41</b><span className="smx-island"></span><span className="smx-sig"><i className="ri-signal-wifi-fill"></i><i className="ri-battery-fill"></i></span></span>
                <span className="smx-from"><span className="smx-logo">BF</span><b>BrightField</b><em>Text message</em></span>
                <div className="smx-thread" key={`p-${i}`}>{sc.phone}</div>
                <span className="smx-input"><span>Text message</span><i className="ri-arrow-up-circle-fill"></i></span>
                <span className="smx-home"></span>
              </div>
            </div>
            <div className="smx-desk" aria-hidden="true">
              <span className="smx-label">How you set it up</span>
              <div className="smx-desk-win" key={`d-${i}`}>{sc.desk}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2 · 10DLC registration tracker ─────────────────────────────────────── */
const REG_LOG = [
  ['Brand details filed with the carrier registry', 'Business name, address and tax ID checked'],
  ['Campaign submitted', 'Matched to “Account notifications” with sample messages'],
  ['Carrier review in progress', 'Carriers are checking the campaign — nothing for you to do'],
  ['Approved — you’re live', 'Send and reply from your business number'],
];

export function RegTracker({ data }) {
  const [cur, setCur, bind] = useStepper(data.steps.length);
  const step = data.steps[cur];
  return (
    <section className="lp-section srt-sec">
      <div className="lp-wrap">
        <Head kicker={data.kicker} title={data.title} intro={data.intro} />
        <div className="srt reveal" {...bind}>
          <div className="srt-top">
            <span className="srt-title"><span className="srt-logo"><i className="ri-shield-check-line"></i></span><span><b>Your 10DLC registration</b><em>BrightField · (415) 555-0182</em></span></span>
            <span className={`srt-status${step.who === 'you' ? ' is-live' : ''}`}><i></i>{step.who === 'you' ? 'Live' : 'In progress'}</span>
          </div>
          <ol className="srt-steps">
            {data.steps.map((s, k) => (
              <li key={s.title} className={`srt-step${k < cur ? ' is-done' : ''}${k === cur ? ' is-on' : ''}`}>
                <button type="button" onClick={() => setCur(k)} aria-pressed={k === cur}>
                  <span className="srt-dot">{k < cur ? <i className="ri-check-line"></i> : k + 1}</span>
                  <span className="srt-step-t"><b>{s.title}</b><em>{s.who === 'us' ? 'We handle it' : 'You'} · {s.time}</em></span>
                </button>
              </li>
            ))}
          </ol>
          <div className="srt-detail" key={cur}>
            <div className="srt-now">
              <span className={`srt-who srt-who--${step.who}`}>{step.who === 'us' ? 'We handle it' : 'Your step'}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="srt-eta"><i className="ri-time-line"></i>{step.time === 'Live' ? 'Ready when you are' : `Typically ${step.time}`}</span>
            </div>
            <ul className="srt-log">
              {REG_LOG.slice(0, cur + 1).reverse().map(([t, s], k) => (
                <li key={t} className={k === 0 ? 'is-new' : undefined}>
                  <i className={k === 0 ? 'ri-radio-button-line' : 'ri-check-line'}></i>
                  <span><b>{t}</b><em>{s}</em></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3 · Shared inbox: a thread from arrival to done ───────────────────── */
// One state per point, in the same order: who replied last, internal note,
// auto-assign, text + call history (and done).
const FLOW = [
  { tag: 'New', who: null, note: false, hist: false, done: false },
  { tag: 'New', who: null, note: true, hist: false, done: false },
  { tag: 'Assigned', who: 'Diego', note: true, hist: false, done: false },
  { tag: 'Done', who: 'Diego', note: true, hist: true, done: true },
];

export function InboxFlow({ data }) {
  const [s, setS, bind] = useStepper(FLOW.length);
  const f = FLOW[s];
  const others = [['MP', 'a', 'Maya Patel', 'Got it. Thanks!', '10:44', 'Aisha'], ['SR', 'c', 'Sam Rivera', 'C', '09:21', 'You']];
  return (
    <section className="lp-section sif-sec">
      <div className="lp-wrap sif">
        <div className="sif-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ol className="sif-steps">
            {data.points.map((p, k) => (
              <li key={p}>
                <button type="button" className={k === s ? 'is-on' : undefined} onClick={() => setS(k)} aria-pressed={k === s}>
                  <span className="sif-n">{k + 1}</span>{p}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="sif-app reveal reveal-delay-1" aria-hidden="true" {...bind}>
          <div className="sif-bar"><b><i className="ri-inbox-line"></i>SMS inbox · Support</b><span>{f.done ? '2 open' : '3 open'}</span></div>
          <div className="sif-body">
            <ul className="sif-list">
              <li className={`sif-item is-sel${f.done ? ' is-done' : ''}`}>
                <span className="sif-av sif-av--b">JL</span>
                <span className="sif-t"><b>Jordan Lee</b><em><i className="ri-image-2-line"></i>Photo of receipt</em></span>
                <span className={`sif-chip sif-chip--${f.tag.toLowerCase()}`} key={f.tag}>{f.tag}</span>
              </li>
              {others.map(([i, t, n, m, at, who]) => (
                <li className={'sif-item' + (s === 0 ? ' is-last' : '')} key={n}>
                  <span className={`sif-av sif-av--${t}`}>{i}</span>
                  <span className="sif-t"><b>{n}</b><em>{m}</em></span>
                  <span className="sif-meta">{at}<small>{who}</small></span>
                </li>
              ))}
            </ul>
            <div className="sif-thread">
              <div className="sif-th-head"><b>Jordan Lee</b><span className={`sif-assignee${f.who ? ' is-set' : ''}`} key={`a-${!!f.who}`}>{f.who ? <><span className="sif-av sif-av--d sif-av--xs">DR</span>{f.who}</> : 'Unassigned'}</span></div>
              {f.hist && <span className="sif-hist" key="hist"><i className="ri-phone-line"></i>Earlier · call with Jordan · 4 min · yesterday</span>}
              <span className="sif-msg"><i className="ri-image-2-line"></i>Here’s the receipt — I was charged twice.</span>
              {f.who && <span className="sif-sys" key="sys"><i className="ri-route-line"></i>Auto-assigned to Diego · keyword “refund”</span>}
              {f.note && <span className="sif-note" key="note"><i className="ri-sticky-note-line"></i>Refund approved — double charge confirmed.<em>Internal · customers never see this</em></span>}
              {f.done && <span className="sif-msg sif-msg--out" key="out">All sorted — the duplicate charge has been refunded.</span>}
              <span className={`sif-done${f.done ? ' is-done' : ''}`}><i className="ri-check-double-line"></i>{f.done ? 'Marked as done' : 'Mark as done'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4 · Use cases: glass notifications over a photo ───────────────────── */
const WALL = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?fm=jpg&q=72&w=1800&auto=format&fit=crop';
const STRIP = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]️?/gu; // keep samples emoji-free

export function TextWall({ page }) {
  return (
    <section className="lp-section stw-sec">
      <div className="lp-wrap">
        <Head kicker="Use cases" title={page.audienceTitle} />
        <div className="stw reveal" style={{ backgroundImage: `url(${WALL})` }}>
          <span className="stw-time" aria-hidden="true"><b>9:41</b><em>Tuesday, June 10</em></span>
          <ul className="stw-grid">
            {page.audience.map((a, k) => (
              <li key={a.title} className="stw-item" style={{ '--k': k }}>
                <div className="stw-note" aria-hidden="true">
                  <span className="stw-note-top"><span className="stw-app"><i className="ri-message-2-fill"></i></span><b>BrightField</b><em>now</em></span>
                  <span className="stw-note-txt">{a.sample.replace(STRIP, '').replace(/\s{2,}/g, ' ')}</span>
                </div>
                <span className="stw-use"><i className={a.icon} aria-hidden="true"></i><span><b>{a.title}</b><em>{a.text}</em></span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
