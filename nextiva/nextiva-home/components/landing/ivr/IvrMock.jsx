'use client';
/* Working hero mockup for the Auto-attendant & IVR page: the published menu
   as a tree on the left, a test call on the right. Press keys on the keypad
   and the caller's path lights up in the tree until they're connected; 3 goes
   to the AI assistant (pick what the caller says); * repeats the menu. The
   mode switch (Open / After hours / Holiday) swaps the greeting and route,
   just like the shared calendar would. */
import { useEffect, useRef, useState } from 'react';

const TREE = [
  { id: 'greet', key: null, label: 'Welcome greeting', sub: 'Text-to-speech · EN', icon: 'ri-volume-up-line', depth: 0 },
  { id: 'k1', key: '1', label: 'Appointments', sub: 'Front desk · ring all', icon: 'ri-calendar-check-line', depth: 1 },
  { id: 'k2', key: '2', label: 'Sales', sub: '2 sub-options', icon: 'ri-briefcase-4-line', depth: 1 },
  { id: 'k21', key: '2·1', label: 'New customers', sub: 'Round-robin', icon: 'ri-user-add-line', depth: 2 },
  { id: 'k22', key: '2·2', label: 'Existing customers', sub: 'Account owner', icon: 'ri-user-star-line', depth: 2 },
  { id: 'k3', key: '3', label: 'Support', sub: 'AI assistant routes', icon: 'ri-robot-2-line', depth: 1 },
  { id: 'k0', key: '0', label: 'Reception', sub: 'Direct dial', icon: 'ri-customer-service-2-line', depth: 1 },
  { id: 'after', key: null, label: 'After-hours route', sub: 'Voicemail or AI', icon: 'ri-moon-clear-line', depth: 0, closedOnly: true },
];

const MODES = [
  { id: 'open', label: 'Open', icon: 'ri-sun-line' },
  { id: 'after', label: 'After hours', icon: 'ri-moon-line' },
  { id: 'holiday', label: 'Holiday', icon: 'ri-gift-line' },
];

const PROMPTS = {
  open: 'Hi, you’ve reached Northside. For appointments press 1, sales 2, support 3, or 0 for reception.',
  sales: 'Sales — new customers press 1, existing customers press 2.',
  ai: 'Support assistant here. What can I help you with?',
  after: 'Thanks for calling Northside. We’re closed right now — we’re open 8 to 6, Monday to Friday. Press 1 to leave a message or 2 to talk to our assistant.',
  holiday: 'Thanks for calling Northside. We’re closed today for the holiday and back tomorrow at 8. Press 1 to leave a message or 2 to talk to our assistant.',
};

const SAYINGS = [
  { text: 'I can’t log in to my account', to: 'Support · Tier 1', note: 'Intent: login problem' },
  { text: 'My invoice looks wrong', to: 'Billing team', note: 'Intent: billing question' },
  { text: 'I want to upgrade my plan', to: 'Sales · Existing customers', note: 'Intent: upgrade' },
];

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function IvrMock({ page }) {
  const [mode, setMode] = useState('open');
  const [call, setCall] = useState({ state: 'idle', path: [], prompt: '', dest: null, note: null });
  const [secs, setSecs] = useState(0);
  const [flash, setFlash] = useState(null);
  const timers = useRef([]);
  const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };
  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearAll(), []);

  const live = call.state !== 'idle' && call.state !== 'ended';
  useEffect(() => {
    if (!live) return undefined;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [live]);

  const start = (m = mode) => {
    clearAll();
    setSecs(0);
    setFlash(null);
    const closed = m !== 'open';
    setCall({ state: 'ringing', path: [], prompt: 'Ringing…', dest: null, note: null });
    later(() => setCall({
      state: closed ? 'closed' : 'menu',
      path: closed ? ['after'] : ['greet'],
      prompt: PROMPTS[closed ? m : 'open'],
      dest: null,
      note: null,
    }), 700);
  };

  // A test call starts on its own so the window is alive on load.
  useEffect(() => { later(() => start('open'), 900); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const connect = (path, dest, note) => {
    setCall({ state: 'routing', path, prompt: `Connecting you to ${dest}…`, dest, note });
    later(() => setCall((c) => ({ ...c, state: 'connected', prompt: `Connected to ${dest}.` })), 1300);
  };

  const press = (k) => {
    if (!live || call.state === 'routing' || call.state === 'connected' || call.state === 'ringing') return;
    setFlash(k);
    later(() => setFlash(null), 220);
    if (k === '*') { start(mode); return; }
    const s = call.state;
    if (s === 'menu') {
      if (k === '1') return connect(['greet', 'k1'], 'the front desk');
      if (k === '2') return setCall({ ...call, state: 'sales', path: ['greet', 'k2'], prompt: PROMPTS.sales });
      if (k === '3') return setCall({ ...call, state: 'ai', path: ['greet', 'k3'], prompt: PROMPTS.ai });
      if (k === '0') return connect(['greet', 'k0'], 'reception');
    }
    if (s === 'sales') {
      if (k === '1') return connect(['greet', 'k2', 'k21'], 'the next sales rep', 'Round-robin · longest idle');
      if (k === '2') return connect(['greet', 'k2', 'k22'], 'your account manager', 'Matched by caller ID');
    }
    if (s === 'closed') {
      if (k === '1') return connect(['after'], 'voicemail', 'Transcribed and emailed to the team');
      if (k === '2') return setCall({ ...call, state: 'ai', path: ['after'], prompt: PROMPTS.ai });
    }
    if (s === 'ai') return undefined;
    setCall((c) => ({ ...c, prompt: `Sorry, ${k} isn’t an option. ${c.state === 'sales' ? PROMPTS.sales : c.state === 'closed' ? PROMPTS[mode] : PROMPTS.open}` }));
    return undefined;
  };

  const say = (x) => {
    if (call.state !== 'ai') return;
    setCall((c) => ({ ...c, state: 'thinking', prompt: `“${x.text}”` }));
    later(() => connect([...call.path], x.to, x.note), 900);
  };

  const hangUp = () => { clearAll(); setCall((c) => ({ ...c, state: 'ended', prompt: `Call ended · ${mmss(secs)}` })); };
  const switchMode = (m) => { setMode(m); start(m); };

  const closed = mode !== 'open';
  const onPath = (id) => call.path.includes(id);
  const current = call.path[call.path.length - 1];
  const keysOn = ['menu', 'sales', 'closed'].includes(call.state);

  return (
    <div className="ivm" role="region" aria-label="Interactive IVR builder and test call">
      <div className="ivm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="ivm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          IVR builder · Main line
        </span>
        <span className="ivm-pub"><i aria-hidden="true"></i>Published · v3</span>
      </div>

      <div className="ivm-modes" role="group" aria-label="Calendar mode">
        {MODES.map((m) => (
          <button key={m.id} type="button" className={mode === m.id ? 'is-on' : ''} aria-pressed={mode === m.id} onClick={() => switchMode(m.id)}>
            <i className={m.icon} aria-hidden="true"></i>{m.label}
          </button>
        ))}
      </div>

      <div className="ivm-body">
        <ol className="ivm-tree" aria-label="Menu flow">
          {TREE.filter((n) => !n.closedOnly || closed).map((n) => {
            const off = closed ? n.id !== 'after' : false;
            return (
              <li
                key={n.id}
                className={`ivm-node ivm-node--d${n.depth}${onPath(n.id) ? ' is-path' : ''}${current === n.id && live ? ' is-here' : ''}${off ? ' is-off' : ''}`}
              >
                {n.key ? <span className="ivm-key">{n.key}</span> : <span className="ivm-key ivm-key--ic"><i className={n.icon} aria-hidden="true"></i></span>}
                <span className="ivm-node-txt"><b>{n.label}</b><em>{n.sub}</em></span>
              </li>
            );
          })}
        </ol>

        <div className="ivm-call">
          <div className="ivm-call-top">
            <span className={`ivm-call-state ivm-call-state--${call.state}`}>
              <i aria-hidden="true"></i>
              {call.state === 'idle' ? 'Test call' : call.state === 'ended' ? 'Ended' : call.state === 'connected' ? 'Connected' : call.state === 'ringing' ? 'Ringing' : 'In menu'}
            </span>
            <span className="ivm-timer">{mmss(secs)}</span>
          </div>
          <p className="ivm-prompt" key={call.prompt} aria-live="polite">{call.prompt || 'Place a test call to hear the menu.'}</p>
          {call.note && <span className="ivm-note"><i className="ri-flow-chart" aria-hidden="true"></i>{call.note}</span>}

          {call.state === 'ai' || call.state === 'thinking' ? (
            <div className="ivm-say" role="group" aria-label="What the caller says">
              <span>Caller says…</span>
              {SAYINGS.map((x) => (
                <button key={x.text} type="button" onClick={() => say(x)} disabled={call.state !== 'ai'}>{x.text}</button>
              ))}
            </div>
          ) : (
            <div className="ivm-pad" role="group" aria-label="Keypad">
              {['1', '2', '3', '0', '*'].map((k) => (
                <button key={k} type="button" className={flash === k ? 'is-flash' : ''} onClick={() => press(k)} disabled={!keysOn && k !== '*'} aria-label={k === '*' ? 'Repeat menu' : `Press ${k}`}>
                  {k}
                </button>
              ))}
            </div>
          )}

          <div className="ivm-call-actions">
            {live ? (
              <button type="button" className="ivm-end" onClick={hangUp}><i className="ri-phone-fill" aria-hidden="true"></i>End call</button>
            ) : (
              <button type="button" className="ivm-start" onClick={() => start()}><i className="ri-phone-fill" aria-hidden="true"></i>{call.state === 'ended' ? 'Call again' : 'Place test call'}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
