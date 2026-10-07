'use client';
/* Working hero mockup for the Hosted Phone System page: a small admin console
   with four live views — extensions (click a status to change it, add an
   extension), a ring group that rings its members by the chosen strategy, an
   IVR you can dial through, and an active call with hold / park / transfer /
   flip. It tours the views on its own until the visitor clicks anything, and
   pauses while hovered. */
import { useEffect, useRef, useState } from 'react';

const TABS = [
  { id: 'ext', label: 'Extensions', icon: 'ri-hashtag' },
  { id: 'ring', label: 'Ring groups', icon: 'ri-team-line' },
  { id: 'ivr', label: 'IVR', icon: 'ri-git-branch-line' },
  { id: 'call', label: 'Live call', icon: 'ri-phone-line' },
];

const STATUSES = [
  { id: 'available', label: 'Available' },
  { id: 'oncall', label: 'On a call' },
  { id: 'away', label: 'Away' },
  { id: 'dnd', label: 'Do not disturb' },
];

const PEOPLE = [
  { name: 'Priya Sharma', ext: 101, status: 'available', tone: 'orange' },
  { name: 'Daniel Reyes', ext: 102, status: 'oncall', tone: 'blue' },
  { name: 'Aisha Khan', ext: 103, status: 'available', tone: 'violet' },
  { name: 'Marco Bianchi', ext: 104, status: 'dnd', tone: 'teal' },
];
const EXTRA = [
  { name: 'Lena Fischer', tone: 'pink' },
  { name: 'Kenji Mori', tone: 'green' },
];

const STRATEGIES = [
  { id: 'simultaneous', label: 'Simultaneous' },
  { id: 'sequential', label: 'Sequential' },
  { id: 'roundrobin', label: 'Round robin' },
  { id: 'idle', label: 'Longest idle' },
];
const IDLE = [4, 12, 2, 7]; // minutes since each member's last call

const MENU = [
  { key: '1', label: 'Sales', to: 'Sales queue', meta: '3 agents free' },
  { key: '2', label: 'Support', to: 'Support queue', meta: '2 agents free' },
  { key: '3', label: 'Billing', to: 'Billing · ext 140', meta: 'Direct line' },
  { key: '0', label: 'Operator', to: 'Front desk · ext 100', meta: 'Priya answers' },
];

const CALLERS = [
  { name: 'Jordan Lee', num: '+1 (415) 555-0199', tone: 'blue' },
  { name: 'Sofia Alvarez', num: '+1 (212) 555-0143', tone: 'pink' },
  { name: 'Omar Haddad', num: '+44 20 7946 0321', tone: 'green' },
];

const initials = (n) => n.split(' ').map((p) => p[0]).join('');
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function Avatar({ name, tone, ring }) {
  return <span className={`psm-av psm-av--${tone}${ring ? ' is-ringing' : ''}`}>{initials(name)}</span>;
}

/* ── Views ─────────────────────────────────────────────────────────────── */

function Extensions({ people, setPeople, touch }) {
  const cycle = (i) => {
    touch();
    setPeople((list) => list.map((p, j) => {
      if (j !== i) return p;
      const k = STATUSES.findIndex((s) => s.id === p.status);
      return { ...p, status: STATUSES[(k + 1) % STATUSES.length].id };
    }));
  };
  const add = () => {
    touch();
    setPeople((list) => {
      const next = EXTRA[list.length - PEOPLE.length];
      if (!next) return list;
      return [...list, { ...next, ext: 101 + list.length, status: 'available', fresh: true }];
    });
  };
  const full = people.length >= PEOPLE.length + EXTRA.length;

  return (
    <div className="psm-view">
      <div className="psm-sub">
        <span><b>{people.length}</b> extensions · 3–5 digit dialing</span>
        <button type="button" className="psm-chip psm-chip--dark" onClick={add} disabled={full}>
          <i className={full ? 'ri-check-line' : 'ri-add-line'} aria-hidden="true"></i>{full ? 'Seats full' : 'Add'}
        </button>
      </div>
      {/* Only a list longer than the view scrolls on its own; otherwise the wheel
          must reach the page (Locomotive/Lenis), so data-lenis-prevent is set
          only when there is something to scroll. */}
      <ul className={`psm-list${people.length > PEOPLE.length ? ' is-scroll' : ''}`} data-lenis-prevent={people.length > PEOPLE.length ? '' : undefined}>
        {people.map((p, i) => {
          const st = STATUSES.find((s) => s.id === p.status);
          return (
            <li key={p.ext} className={`psm-row${p.fresh ? ' is-fresh' : ''}`}>
              <Avatar name={p.name} tone={p.tone} />
              <span className="psm-row-txt">
                <b>{p.name}</b>
                <em>Ext {p.ext} · desk + mobile</em>
              </span>
              <button
                type="button"
                className={`psm-status psm-status--${p.status}`}
                onClick={() => cycle(i)}
                title="Click to change status"
              >
                <i aria-hidden="true"></i>{st.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RingGroup({ people, strategy, setStrategy, step, round, touch }) {
  const members = people.slice(0, 4);
  let order = [0, 1, 2, 3];
  if (strategy === 'roundrobin') order = order.map((i) => (i + round) % 4);
  if (strategy === 'idle') order = [...order].sort((a, b) => IDLE[b] - IDLE[a]);

  const answering = step === 3;
  const answeredBy = strategy === 'simultaneous' ? order[round % 4] : order[2];
  const ringing = answering
    ? []
    : strategy === 'simultaneous' ? order : [order[step]];

  const line = answering
    ? `Answered by ${members[answeredBy].name.split(' ')[0]} in ${strategy === 'simultaneous' ? 2 : 6 + step}s`
    : strategy === 'simultaneous'
      ? 'Ringing all 4 members at once…'
      : `Ringing ${members[order[step]].name.split(' ')[0]}…`;

  return (
    <div className="psm-view">
      <div className="psm-sub">
        <span><b>Sales</b> · ring group ext 600</span>
        <span className="psm-incoming"><i className="ri-phone-fill" aria-hidden="true"></i>+1 (415) 555-0142</span>
      </div>
      <div className="psm-seg" role="radiogroup" aria-label="Ring strategy">
        {STRATEGIES.map((s) => (
          <button
            type="button"
            key={s.id}
            role="radio"
            aria-checked={strategy === s.id}
            className={strategy === s.id ? 'is-on' : ''}
            onClick={() => { touch(); setStrategy(s.id); }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="psm-members">
        {members.map((m, i) => (
          <div
            key={m.ext}
            className={`psm-member${ringing.includes(i) ? ' is-ringing' : ''}${answering && answeredBy === i ? ' is-answered' : ''}`}
          >
            <Avatar name={m.name} tone={m.tone} ring={ringing.includes(i)} />
            <b>{m.name.split(' ')[0]}</b>
            <em>{strategy === 'idle' ? `idle ${IDLE[i]}m` : `#${order.indexOf(i) + 1}`}</em>
          </div>
        ))}
      </div>
      <div className={`psm-banner${answering ? ' is-ok' : ''}`}>
        <i className={answering ? 'ri-checkbox-circle-fill' : 'ri-notification-3-line'} aria-hidden="true"></i>
        {line}
      </div>
    </div>
  );
}

function Ivr({ open, setOpen, pick, setPick, touch }) {
  const chosen = MENU.find((m) => m.key === pick);
  return (
    <div className="psm-view">
      <div className="psm-sub">
        <span><b>Main menu</b> · visual IVR</span>
        <button
          type="button"
          className={`psm-switch${open ? ' is-on' : ''}`}
          role="switch"
          aria-checked={open}
          onClick={() => { touch(); setOpen(!open); setPick(null); }}
        >
          <i aria-hidden="true"></i>{open ? 'Open hours' : 'After hours'}
        </button>
      </div>
      <div className="psm-flow">
        <div className="psm-node psm-node--start">
          <i className="ri-phone-fill" aria-hidden="true"></i>
          <span>
            <b>Incoming call</b>
            <em>{open ? '“Thanks for calling Acme. Press…”' : '“We’re closed right now…”'}</em>
          </span>
        </div>
        <div className="psm-keys">
          {MENU.map((m) => (
            <button
              type="button"
              key={m.key}
              disabled={!open}
              className={pick === m.key ? 'is-on' : ''}
              onClick={() => { touch(); setPick(m.key); }}
            >
              <kbd>{m.key}</kbd>{m.label}
            </button>
          ))}
        </div>
        <div className={`psm-banner${chosen || !open ? ' is-ok' : ''}`} key={`${open}${pick}`}>
          {!open ? (
            <><i className="ri-voiceprint-line" aria-hidden="true"></i>Routed to voicemail · transcript emailed</>
          ) : chosen ? (
            <><i className="ri-route-line" aria-hidden="true"></i>Routing to <b>{chosen.to}</b> · {chosen.meta}<span className="psm-bar"></span></>
          ) : (
            <><i className="ri-keyboard-line" aria-hidden="true"></i>Press a key to route the caller</>
          )}
        </div>
      </div>
    </div>
  );
}

function LiveCall({ call, secs, mode, setMode, touch }) {
  const caller = CALLERS[call % CALLERS.length];
  const act = (m) => { touch(); setMode(mode === m ? 'talking' : m); };
  const label = {
    talking: 'Connected · recording',
    hold: 'On hold · music playing',
    park: 'Parked on orbit 701 · pick up from any phone',
    transfer: 'Transferring to Sales (600)…',
    flip: 'Flipped to your mobile · no drop',
  }[mode];

  return (
    <div className="psm-view">
      <div className="psm-call">
        <Avatar name={caller.name} tone={caller.tone} />
        <span className="psm-row-txt">
          <b>{caller.name}</b>
          <em>{caller.num}</em>
        </span>
        <span className="psm-timer">
          {mode === 'talking' && <i className="psm-rec" aria-hidden="true"></i>}
          {mmss(secs)}
        </span>
      </div>
      <div className={`psm-wave${mode === 'talking' || mode === 'flip' ? '' : ' is-still'}`} aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 97) % 900}ms` }}></i>)}
      </div>
      <div className={`psm-banner psm-banner--${mode}`}>
        <i className={mode === 'talking' ? 'ri-record-circle-line' : 'ri-information-line'} aria-hidden="true"></i>
        {label}
      </div>
      <div className="psm-actions">
        {[
          ['hold', 'ri-pause-line', 'Hold'],
          ['park', 'ri-parking-box-line', 'Park'],
          ['transfer', 'ri-share-forward-line', 'Transfer'],
          ['flip', 'ri-smartphone-line', 'Flip'],
        ].map(([id, icon, text]) => (
          <button
            type="button"
            key={id}
            className={mode === id ? 'is-on' : ''}
            aria-pressed={mode === id}
            onClick={() => act(id)}
          >
            <i className={icon} aria-hidden="true"></i>{text}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Shell ─────────────────────────────────────────────────────────────── */

export default function PhoneSystemMock({ page }) {
  const [tab, setTab] = useState('ext');
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [people, setPeople] = useState(PEOPLE);
  const [strategy, setStrategy] = useState('sequential');
  const [tick, setTick] = useState(0);
  const step = tick % 4;
  const round = Math.floor(tick / 4);
  const [open, setOpen] = useState(true);
  const [pick, setPick] = useState(null);
  const [call, setCall] = useState(0);
  const [secs, setSecs] = useState(84);
  const [mode, setMode] = useState('talking');
  const [calls, setCalls] = useState(1284);
  const tabRef = useRef(tab);
  tabRef.current = tab;

  const touch = () => setAuto(false);

  // Guided tour: next view every 6s until the visitor takes over.
  useEffect(() => {
    if (!auto || hover) return undefined;
    const id = setInterval(() => {
      const i = TABS.findIndex((t) => t.id === tabRef.current);
      setTab(TABS[(i + 1) % TABS.length].id);
    }, 6000);
    return () => clearInterval(id);
  }, [auto, hover]);

  // While touring, the IVR "dials" a key by itself.
  useEffect(() => {
    if (!auto || tab !== 'ivr') return undefined;
    setPick(null);
    const id = setTimeout(() => setPick('2'), 1800);
    return () => clearTimeout(id);
  }, [auto, tab]);

  // Ring group ticks: three ring steps, then an answer, then a new call.
  useEffect(() => {
    if (tab !== 'ring') return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, [tab]);
  useEffect(() => { setTick(0); }, [strategy]);

  // Call timer (paused while parked), and the transfer completes on its own.
  useEffect(() => {
    if (mode === 'park') return undefined;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [mode]);
  useEffect(() => {
    if (mode !== 'transfer') return undefined;
    const id = setTimeout(() => {
      setCall((c) => c + 1);
      setSecs(0);
      setMode('talking');
    }, 2200);
    return () => clearTimeout(id);
  }, [mode]);

  // Calls-today counter.
  useEffect(() => {
    const id = setInterval(() => setCalls((c) => c + 1 + (c % 3 === 0 ? 1 : 0)), 2600);
    return () => clearInterval(id);
  }, []);

  const uptime = page.stats?.[0];

  return (
    <div
      className="psm"
      role="region"
      aria-label="Interactive hosted phone system demo"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="psm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="psm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          {page.navTitle || page.title}
        </span>
        <span className="psm-live"><i aria-hidden="true"></i>Live</span>
      </div>

      <div className="psm-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            type="button"
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? 'is-on' : ''}
            onClick={() => { touch(); setTab(t.id); }}
          >
            <i className={t.icon} aria-hidden="true"></i>
            <span>{t.label}</span>
            {tab === t.id && auto && !hover && <span className="psm-tab-progress" key={t.id}></span>}
          </button>
        ))}
      </div>

      <div className="psm-body" key={tab}>
        {tab === 'ext' && <Extensions people={people} setPeople={setPeople} touch={touch} />}
        {tab === 'ring' && (
          <RingGroup people={people} strategy={strategy} setStrategy={setStrategy} step={step} round={round} touch={touch} />
        )}
        {tab === 'ivr' && <Ivr open={open} setOpen={setOpen} pick={pick} setPick={setPick} touch={touch} />}
        {tab === 'call' && <LiveCall call={call} secs={secs} mode={mode} setMode={setMode} touch={touch} />}
      </div>

      <div className="psm-foot">
        <div><b>{uptime?.value || '99.99%'}</b><span>{uptime?.label || 'uptime SLA'}</span></div>
        <div><b>{calls.toLocaleString('en-US')}</b><span><i className="psm-dot" aria-hidden="true"></i>calls today</span></div>
        <div><b>0</b><span>hardware to install</span></div>
      </div>
    </div>
  );
}
