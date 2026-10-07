'use client';
/* Team Chat "Slack bridge" visual — the bridge working live. A Slack window
   (back) and a Team Chat window (front) show the same #deal-acme channel;
   every STEP_MS one more event lands on one side and is mirrored on the
   other with a "Synced from …" tag, while the badge between them shows the
   direction. A rollout strip underneath shows teams moving over one at a
   time. Pauses only while the visitor is actively using it
   (useIntentPause). Fixed heights, so nothing moves the page. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

const STEP_MS = 3000;

// Each event starts on one side (from) and is mirrored on the other.
const EVENTS = [
  { from: 'slack', n: 'MC', t: 'c', who: 'Mia Chen', body: 'Can someone share the renewal deck?' },
  { from: 'us', n: 'PS', t: 'a', who: 'Priya Sharma', file: 'acme-renewal.pdf' },
  { from: 'slack', n: 'MC', t: 'c', who: 'Mia Chen', body: 'Perfect — reviewing before the call.' },
  { from: 'us', n: 'DR', t: 'b', who: 'Daniel Reyes', body: 'Call with Sarah is at 3 pm, joining from here.' },
];
const SHOWN = 3; // messages visible per window

const TEAMS = [
  ['Sales', 'us', 'On Team Chat'],
  ['Support', 'both', 'Bridged'],
  ['Finance', 'both', 'Bridged'],
  ['Operations', 'slack', 'Moving next'],
];

function Msg({ e, side, fresh }) {
  const mirrored = e.from !== side;
  return (
    <div className={`tsb-msg${fresh ? ' is-fresh' : ''}`}>
      <span className={`tsb-av tsb-av--${e.t}`}>{e.n}</span>
      <span className="tsb-msg-t">
        <b>{e.who}{mirrored && <small className={`tsb-tag tsb-tag--${e.from}`}>Synced from {e.from === 'slack' ? 'Slack' : 'Team Chat'}</small>}</b>
        {e.body && <span>{e.body}</span>}
        {e.file && <span className="tsb-file"><i className="ri-file-pdf-2-line"></i>{e.file}</span>}
      </span>
    </div>
  );
}

function Win({ side, list, step }) {
  const slack = side === 'slack';
  return (
    <div className={`tsb-win tsb-win--${side}`}>
      <div className="tsb-head">
        <span className="tsb-logo"><i className={slack ? 'ri-slack-fill' : 'ri-discuss-fill'}></i></span>
        <b>{slack ? 'Slack' : 'UCaaS Team Chat'}</b>
        <em># deal-acme</em>
      </div>
      <div className="tsb-feed">
        {list.map(({ e, k }) => <Msg e={e} side={side} key={k} fresh={k === step} />)}
      </div>
    </div>
  );
}

export default function SyncBridge() {
  const [step, setStep] = useState(SHOWN - 1);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);

  useEffect(() => {
    if (paused || still) return undefined;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step, paused, still]);

  // The last SHOWN events, newest at the bottom; k is a running key.
  const list = Array.from({ length: SHOWN }, (_, i) => {
    const k = step - (SHOWN - 1) + i;
    return { e: EVENTS[((k % EVENTS.length) + EVENTS.length) % EVENTS.length], k };
  });
  const latest = list[list.length - 1].e;
  const toUs = latest.from === 'slack';

  return (
    <div className="tsb" aria-hidden="true" {...bind}>
      <div className="tsb-stage">
        <Win side="slack" list={list} step={step} />
        <Win side="us" list={list} step={step} />
        <span className="tsb-sync" key={step}>
          <i className={toUs ? 'ri-arrow-right-down-line' : 'ri-arrow-left-up-line'}></i>
          <span><b>Synced</b><em>{toUs ? 'Slack → Team Chat' : 'Team Chat → Slack'}</em></span>
        </span>
      </div>
      <div className="tsb-roll">
        <span className="tsb-roll-l">Rollout</span>
        {TEAMS.map(([n, s, l]) => (
          <span className={`tsb-team tsb-team--${s}`} key={n}>
            <b>{n}</b>
            <em><i></i>{l}</em>
          </span>
        ))}
      </div>
    </div>
  );
}
