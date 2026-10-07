'use client';
/* Team Chat "What you get" — feature callouts down either side (1–4 left,
   5–8 right) around one glass product window over a nature photo. The
   window shows a dedicated screen for the active feature — the channel
   list, a thread, a live huddle, team presence, the day's DND schedule,
   the Slack bridge, a guest invite, a call from chat. The highlight steps
   through them every STEP_MS; hovering, focusing or clicking a callout
   jumps there. It pauses only while the visitor is actively using it
   (useIntentPause). The window has a fixed height, so switching screens
   never moves the page. Below 1100px the window comes first and the
   callouts follow as a grid. Sample names and 555 numbers only. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

const STEP_MS = 3000;
const SCENE = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?fm=jpg&q=72&w=1400&auto=format&fit=crop';

const Av = ({ n, t = 'a' }) => <span className={`tca-av tca-av--${t}`}>{n}</span>;
const Pill = ({ s = 'ok', children }) => <span className={`tca-pill tca-pill--${s}`}><i></i>{children}</span>;

/* ── One screen per feature ──────────────────────────────────────────── */
function Channels() {
  return (
    <div className="tca-split">
      <div className="tca-pane">
        <span className="tca-label">Channels</span>
        <span className="tca-ch is-on"><i className="ri-hashtag"></i>deal-acme<em>3</em></span>
        <span className="tca-ch"><i className="ri-lock-line"></i>leadership</span>
        <span className="tca-ch"><i className="ri-hashtag"></i>support<em>1</em></span>
        <span className="tca-ch"><i className="ri-hashtag"></i>wins</span>
        <span className="tca-label">Direct messages</span>
        <span className="tca-ch"><Av n="PS" />Priya Sharma</span>
        <span className="tca-ch"><span className="tca-stack"><Av n="DR" t="b" /><Av n="AK" t="c" /></span>Daniel, Aisha</span>
      </div>
      <div className="tca-pane tca-pane--main">
        <div className="tca-row-head"><b># deal-acme</b><span className="tca-btn"><i className="ri-add-line"></i>New channel</span></div>
        <div className="tca-msg"><Av n="PS" /><span><b>Priya <em>9:41</em></b><span>Renewal call moved to 3 pm.</span></span></div>
        <div className="tca-msg"><Av n="DR" t="b" /><span><b>Daniel <em>9:43</em></b><span>On it — sending the deck now.</span></span></div>
        <div className="tca-msg"><Av n="AK" t="c" /><span><b>Aisha <em>9:45</em></b><span>Added the pricing sheet to the channel.</span></span></div>
        <div className="tca-compose"><span>Message # deal-acme</span><i className="ri-send-plane-fill"></i></div>
      </div>
    </div>
  );
}

function Threads() {
  return (
    <div className="tca-stack-v">
      <div className="tca-row-head"><b>Thread · Renewal terms</b><Pill s="idle">3 replies</Pill></div>
      <div className="tca-card">
        <div className="tca-msg"><Av n="AK" t="c" /><span><b>Aisha Khan <em>10:42</em></b><span><mark>@Daniel</mark> can you check the renewal terms before the call?</span></span></div>
        <div className="tca-msg tca-msg--reply"><Av n="DR" t="b" /><span><b>Daniel Reyes <em>10:44</em></b><span>Here is the latest draft.</span><span className="tca-file"><i className="ri-file-pdf-2-line"></i>acme-renewal.pdf<em>240 KB</em></span></span></div>
        <div className="tca-msg tca-msg--reply"><Av n="PS" /><span><b>Priya Sharma <em>10:47</em></b><span>Looks good — sending it to Sarah.</span></span></div>
      </div>
      <div className="tca-compose"><span>Reply in thread… <mark>@</mark> to mention</span><i className="ri-attachment-2"></i></div>
    </div>
  );
}

function Huddle() {
  return (
    <div className="tca-stack-v">
      <div className="tca-row-head"><b>Huddle · # deal-acme</b><Pill s="live">Live · 00:42</Pill></div>
      <div className="tca-seats">
        {[['DR', 'b', 'Daniel Reyes', 1], ['PS', 'a', 'Priya Sharma'], ['AK', 'c', 'Aisha Khan']].map(([i, t, n, talk]) => (
          <div className={`tca-seat${talk ? ' is-talk' : ''}`} key={n}>
            <span className="tca-seat-av"><Av n={i} t={t} /></span>
            <b>{n}</b>
            <em>{talk ? 'Speaking' : 'Listening'}</em>
          </div>
        ))}
      </div>
      <div className="tca-ctrls">
        <span><i className="ri-mic-line"></i>Mute</span>
        <span><i className="ri-vidicon-line"></i>Video</span>
        <span><i className="ri-share-box-line"></i>Share</span>
        <span className="is-end"><i className="ri-phone-fill"></i>Leave</span>
      </div>
      <div className="tca-note"><i className="ri-chat-thread-line"></i>Started from the <b>Renewal terms</b> thread — the chat stays attached</div>
    </div>
  );
}

function Presence() {
  return (
    <div className="tca-stack-v">
      <div className="tca-row-head"><b>Team status</b><span className="tca-tabs"><span className="on">All</span><span>Sales</span><span>Support</span></span></div>
      <div className="tca-list">
        {[['PS', 'a', 'Priya Sharma', 'busy', 'On a call', 'ri-phone-line'], ['DR', 'b', 'Daniel Reyes', 'meet', 'In a meeting', 'ri-calendar-line'], ['AK', 'c', 'Aisha Khan', 'focus', 'Focus time', 'ri-calendar-line'], ['MB', 'd', 'Marco Bianchi', 'ok', 'Available', 'ri-computer-line']].map(([i, t, n, s, l, src]) => (
          <div className="tca-li" key={n}>
            <span className={`tca-pres tca-pres--${s}`}><Av n={i} t={t} /></span>
            <b>{n}</b>
            <Pill s={s}>{l}</Pill>
            <i className={`${src} tca-src`}></i>
          </div>
        ))}
      </div>
      <div className="tca-note"><i className="ri-magic-line"></i>Set automatically from calls and calendars — nobody has to remember</div>
    </div>
  );
}

function Dnd() {
  return (
    <div className="tca-stack-v">
      <div className="tca-row-head"><b>Today</b><span className="tca-paused"><i className="ri-notification-off-line"></i>Paused until 3:00 pm</span></div>
      <div className="tca-agenda">
        {[['9:00', 'Team stand-up', '15 min'], ['2:00', 'Design review', 'Now · notifications paused', 1], ['3:30', 'Focus block', '90 min'], ['5:00', 'Customer call · Acme', '30 min']].map(([t, n, s, now]) => (
          <div className={`tca-slot${now ? ' is-now' : ''}`} key={t}>
            <span className="tca-time">{t}</span>
            <span className="tca-ev"><b>{n}</b><em>{s}</em></span>
          </div>
        ))}
      </div>
      <div className="tca-note"><i className="ri-inbox-line"></i><b>4 messages</b> held — delivered when the meeting ends</div>
    </div>
  );
}

function Bridge() {
  return (
    <div className="tca-stack-v">
      <div className="tca-row-head"><b>Slack bridge</b><Pill>Connected</Pill></div>
      <div className="tca-bridge">
        <div className="tca-bcol">
          <span className="tca-bhead"><span className="tca-blogo"><i className="ri-discuss-fill"></i></span>Team Chat · # deal-acme</span>
          <div className="tca-bmsg"><Av n="PS" /><span>Contract is signed.</span></div>
          <div className="tca-bmsg tca-bmsg--in"><Av n="TW" t="d" /><span>Great news — thanks!</span></div>
        </div>
        <span className="tca-bsync"><i className="ri-arrow-left-right-line"></i></span>
        <div className="tca-bcol">
          <span className="tca-bhead"><span className="tca-blogo tca-blogo--slack"><i className="ri-slack-fill"></i></span>Slack · # deal-acme</span>
          <div className="tca-bmsg tca-bmsg--in"><Av n="PS" /><span>Contract is signed.</span></div>
          <div className="tca-bmsg"><Av n="TW" t="d" /><span>Great news — thanks!</span></div>
        </div>
      </div>
      <div className="tca-note"><i className="ri-refresh-line"></i>Messages and files sync both ways — move teams over at your own pace</div>
    </div>
  );
}

function Guest() {
  return (
    <div className="tca-stack-v">
      <div className="tca-row-head"><b>Invite a guest</b><span className="tca-dim">Acme Corp</span></div>
      <div className="tca-card tca-form">
        <span className="tca-field"><em>Email</em>jordan@acme-corp.example</span>
        <span className="tca-field"><em>Channel</em># deal-acme<i className="ri-arrow-down-s-line"></i></span>
        <span className="tca-label">Access</span>
        <span className="tca-radio is-on"><i></i>Can view and reply</span>
        <span className="tca-radio"><i></i>View only</span>
        <span className="tca-btn tca-btn--wide"><i className="ri-user-add-line"></i>Send invite</span>
      </div>
      <div className="tca-note"><i className="ri-shield-user-line"></i>Guests see only the channels you choose — nothing else</div>
    </div>
  );
}

function Calls() {
  return (
    <div className="tca-stack-v">
      <div className="tca-row-head"><b># deal-acme</b><span className="tca-callbtn"><i className="ri-phone-fill"></i></span></div>
      <div className="tca-msg"><Av n="PS" /><span><b>Priya <em>2:58</em></b><span>Sarah is free now if you want to call.</span></span></div>
      <div className="tca-calling">
        <Av n="SR" t="c" />
        <span className="tca-calling-t"><b>Sarah Ruiz · Acme</b><em>+1 (415) 555-0142 · from your business number</em></span>
        <span className="tca-rec"><i></i>02:18</span>
      </div>
      <div className="tca-ctrls">
        <span><i className="ri-mic-off-line"></i>Mute</span>
        <span><i className="ri-pause-line"></i>Hold</span>
        <span><i className="ri-arrow-left-right-line"></i>Transfer</span>
        <span className="is-end"><i className="ri-phone-fill"></i>End</span>
      </div>
      <div className="tca-note"><i className="ri-history-line"></i>Same number, same history — the call is logged in the channel</div>
    </div>
  );
}

const SCREENS = {
  'Channels & DMs': [1, 'ri-hashtag', Channels],
  'Threads & mentions': [2, 'ri-chat-thread-line', Threads],
  'One-click huddles': [3, 'ri-live-line', Huddle],
  'Smart presence': [4, 'ri-user-follow-line', Presence],
  'Calendar-aware DND': [5, 'ri-notification-off-line', Dnd],
  'Slack bridge': [6, 'ri-links-line', Bridge],
  'Guest access': [7, 'ri-user-shared-line', Guest],
  'Calls in the same app': [8, 'ri-phone-line', Calls],
};

export default function ChatAnatomy({ items }) {
  const feats = items.filter((c) => SCREENS[c.title]).sort((a, b) => SCREENS[a.title][0] - SCREENS[b.title][0]);
  const [hot, setHot] = useState(0);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);

  useEffect(() => {
    if (paused || still) return undefined;
    const t = setTimeout(() => setHot((h) => (h + 1) % feats.length), STEP_MS);
    return () => clearTimeout(t);
  }, [hot, paused, still, feats.length]);

  const callout = (c) => {
    const i = feats.indexOf(c);
    return (
      <li key={c.title}>
        <button
          type="button"
          className={`tca-co${hot === i ? ' is-on' : ''}`}
          onMouseEnter={() => setHot(i)}
          onFocus={() => setHot(i)}
          onClick={() => setHot(i)}
          aria-pressed={hot === i}
        >
          <span className="tca-co-n">{i + 1}</span>
          <span className="tca-co-txt">
            <b>{c.title}{c.tag && <small>{c.tag}</small>}</b>
            <em>{c.text}</em>
          </span>
        </button>
      </li>
    );
  };

  const active = feats[hot];
  const [, icon, Screen] = SCREENS[active.title];

  return (
    <div className="tca reveal" {...bind}>
      <ul className="tca-col tca-col--l">{feats.slice(0, 4).map(callout)}</ul>
      <div className="tca-stage" style={{ backgroundImage: `url(${SCENE})` }}>
        <div className="tca-win" aria-hidden="true">
          <div className="tca-bar">
            <span className="tca-dots"><i></i><i></i><i></i></span>
            <b className="tca-bar-t"><i className="ri-discuss-fill"></i>Team Chat</b>
            <span className="tca-bar-f"><i className={icon}></i>{active.title}</span>
          </div>
          <div className="tca-screen" key={active.title}>
            <Screen />
          </div>
        </div>
        <span className="tca-steps" aria-hidden="true">
          {feats.map((c, i) => <i key={c.title} className={i === hot ? 'on' : ''}></i>)}
        </span>
      </div>
      <ul className="tca-col tca-col--r">{feats.slice(4).map(callout)}</ul>
    </div>
  );
}
