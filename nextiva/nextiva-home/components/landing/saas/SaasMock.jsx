'use client';
/* Working hero mockup for the SaaS & Tech page: an SDK console. Pick a
   language, press Run and the request goes out; the response comes back and
   the webhook events for the call stream in below, each with its timing. */
import { useEffect, useRef, useState } from 'react';

// Each line is a list of [token class, text] pairs — k keyword, s string,
// f function, c comment, p plain.
const LANGS = {
  ts: {
    label: 'TypeScript',
    code: [
      [['k', 'import'], ['p', ' { Phone } '], ['k', 'from'], ['s', " '@ucaas/sdk'"]],
      [['k', 'const'], ['p', ' phone = '], ['k', 'new'], ['f', ' Phone'], ['p', '(process.env.KEY)']],
      [],
      [['k', 'const'], ['p', ' call = '], ['k', 'await'], ['p', ' phone.calls.'], ['f', 'create'], ['p', '({']],
      [['p', '  to: '], ['s', "'+14155550123'"], ['p', ', record: '], ['k', 'true'], ['p', ',']],
      [['p', '  webhook: '], ['s', "'https://api.acme.dev/hooks'"], ['p', ','], ['c', ' // signed']],
      [['p', '})']],
    ],
  },
  py: {
    label: 'Python',
    code: [
      [['k', 'from'], ['p', ' ucaas '], ['k', 'import'], ['p', ' Phone']],
      [['p', 'phone = '], ['f', 'Phone'], ['p', '(os.environ['], ['s', '"KEY"'], ['p', '])']],
      [],
      [['p', 'call = phone.calls.'], ['f', 'create'], ['p', '(']],
      [['p', '    to='], ['s', '"+14155550123"'], ['p', ', record='], ['k', 'True'], ['p', ',']],
      [['p', '    webhook='], ['s', '"https://api.acme.dev/hooks"'], ['p', ','], ['c', '  # signed']],
      [['p', ')']],
    ],
  },
  go: {
    label: 'Go',
    code: [
      [['p', 'phone := ucaas.'], ['f', 'New'], ['p', '(os.'], ['f', 'Getenv'], ['p', '('], ['s', '"KEY"'], ['p', '))']],
      [],
      [['p', 'call, err := phone.Calls.'], ['f', 'Create'], ['p', '(ctx, &ucaas.CallParams{']],
      [['p', '    To:      '], ['s', '"+14155550123"'], ['p', ',']],
      [['p', '    Record:  '], ['k', 'true'], ['p', ',']],
      [['p', '    Webhook: '], ['s', '"https://api.acme.dev/hooks"'], ['p', ','], ['c', ' // signed']],
      [['p', '})']],
    ],
  },
  curl: {
    label: 'cURL',
    code: [
      [['f', 'curl'], ['p', ' -X POST https://api.ucaas.dev/v1/calls \\']],
      [['p', '  -H '], ['s', '"Authorization: Bearer $KEY"'], ['p', ' \\']],
      [['p', '  -H '], ['s', '"Idempotency-Key: 7f3c…"'], ['p', ' \\']],
      [['p', '  -d '], ['s', "'{"]],
      [['s', '    "to": "+14155550123", "record": true,']],
      [['s', '    "webhook": "https://api.acme.dev/hooks"']],
      [['s', "  }'"]],
    ],
  },
};
const EVENTS = [
  { at: 0, name: 'POST /v1/calls', meta: '201 Created · 142 ms', kind: 'req' },
  { at: 500, name: 'call.created', meta: 'id cl_9QdX2 · +0.1 s' },
  { at: 1100, name: 'call.ringing', meta: '+1.3 s' },
  { at: 1900, name: 'call.answered', meta: '+4.8 s' },
  { at: 3000, name: 'call.completed', meta: 'duration 2m 14s' },
  { at: 3700, name: 'transcript.ready', meta: 'sentiment positive · 812 words' },
];

export default function SaasMock({ page }) {
  const [lang, setLang] = useState('ts');
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clear(), []);

  const run = () => {
    clear();
    setShown(0);
    setRunning(true);
    EVENTS.forEach((e, i) => timers.current.push(setTimeout(() => {
      setShown(i + 1);
      if (i === EVENTS.length - 1) setRunning(false);
    }, 350 + e.at)));
  };
  useEffect(() => { timers.current.push(setTimeout(run, 1200)); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const L = LANGS[lang];

  return (
    <div className="sxm" role="region" aria-label="Interactive SDK console">
      <div className="sxm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="sxm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          make-call
        </span>
        <div className="sxm-langs" role="group" aria-label="Language">
          {Object.entries(LANGS).map(([id, x]) => (
            <button key={id} type="button" className={lang === id ? 'is-on' : ''} aria-pressed={lang === id} onClick={() => setLang(id)}>{x.label}</button>
          ))}
        </div>
      </div>

      <div className="sxm-code" key={lang}>
        <pre aria-label={`${L.label} example`}>
          {L.code.map((line, n) => (
            <span key={n} className="sxm-line"><em>{n + 1}</em>{line.map(([c, t], j) => <span key={j} className={`t-${c}`}>{t}</span>)}{'\n'}</span>
          ))}
        </pre>
        <button type="button" className="sxm-run" onClick={run} disabled={running}>
          <i className={running ? 'ri-loader-4-line' : 'ri-play-fill'} aria-hidden="true"></i>{running ? 'Running' : 'Run'}
        </button>
      </div>

      <div className="sxm-events">
        <span className="sxm-ek"><i className="ri-flashlight-line" aria-hidden="true"></i>Webhook events<em>{shown ? `${Math.max(0, shown - 1)} delivered · signed` : 'waiting'}</em></span>
        <ol aria-live="polite">
          {EVENTS.slice(0, shown).map((e) => (
            <li key={e.name} className={e.kind === 'req' ? 'is-req' : ''}>
              <i className={e.kind === 'req' ? 'ri-arrow-right-up-line' : 'ri-checkbox-circle-fill'} aria-hidden="true"></i>
              <b>{e.name}</b><em>{e.meta}</em>
            </li>
          ))}
          {!shown && <li className="sxm-empty">Press Run to place a test call</li>}
        </ol>
      </div>
    </div>
  );
}
