'use client';
/* Working hero mockup for the Supervisor Tools page: a supervisor floor.
   Three AI-ranked live calls (sentiment drifts while you watch); pick one and
   monitor, whisper or barge. Whisper offers quick prompts; barge plays the
   disclosure for the caller's state first. Every action is written to the
   audit log at the bottom. */
import { useEffect, useRef, useState } from 'react';

const CALLS = [
  { id: 'a8f2', agent: 'Marisol R.', init: 'MR', topic: 'Refund escalation', state: 'CA', rule: 'two-party', base: 18, tag: 'Escalation risk', tone: 'rose', dur: 462 },
  { id: 'c41d', agent: 'Devon K.', init: 'DK', topic: 'Renewal pricing', state: 'NY', rule: 'one-party', base: 42, tag: 'Save signal', tone: 'amber', dur: 258 },
  { id: 'e93b', agent: 'Aiko T.', init: 'AT', topic: 'Onboarding call', state: 'TX', rule: 'one-party', base: 88, tag: 'Calm', tone: 'green', dur: 669 },
];
const PROMPTS = ['Offer the $20 credit', 'Read the refund policy', 'Slow down, empathise'];
const MODE_LABEL = { idle: 'Not connected', monitor: 'Monitoring · silent', whisper: 'Whispering · agent only', barge: 'On the call · all parties' };

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const clock = (s) => {
  const t = 14 * 3600 + 22 * 60 + 11 + s;
  return `${String(Math.floor(t / 3600) % 24).padStart(2, '0')}:${String(Math.floor(t / 60) % 60).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
};

export default function SupervisorMock({ page }) {
  const [sel, setSel] = useState('a8f2');
  const [mode, setMode] = useState('idle');
  const [tick, setTick] = useState(0);
  const [log, setLog] = useState([{ id: 0, t: 0, ev: 'radar.rank', text: '247 active · top 3 shown', scope: 'ai' }]);
  const [notice, setNotice] = useState(null);
  const seq = useRef(1);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Live clock + sentiment drift (starts after mount, so SSR output is stable).
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const drift = (c) => {
    const wave = [0, 2, -1, 3, 1, -2, 0, -3][(tick + c.base) % 8];
    return Math.max(4, Math.min(96, c.base + wave));
  };

  const call = CALLS.find((c) => c.id === sel);
  const write = (ev, text, scope) => {
    const id = seq.current++;
    setLog((cur) => [...cur.slice(-3), { id, t: tick, ev, text, scope }]);
  };

  const pick = (id) => {
    if (id === sel) return;
    if (mode !== 'idle') write(`${mode}.end`, `left ${call.agent}`, 'sup');
    setMode('idle'); setNotice(null); setSel(id);
  };

  const go = (m) => {
    if (m === mode) return;
    if (m === 'monitor') { setNotice(null); write('monitor.start', `→ call#${call.id} (${call.agent})`, 'silent'); }
    if (m === 'whisper') { setNotice(null); write('whisper.start', `→ ${call.agent} · agent only`, 'agent'); }
    if (m === 'barge') {
      setNotice({ state: call.state, rule: call.rule });
      write('disclosure.play', `${call.state} ${call.rule} notice`, 'all');
      timers.current.push(setTimeout(() => write('barge.join', 'third party · disclosed', 'all'), 900));
    }
    setMode(m);
  };
  const whisper = (p) => write('whisper.say', `“${p}”`, 'agent');
  const leave = () => { write(`${mode}.end`, `call#${call.id}`, 'sup'); setMode('idle'); setNotice(null); };

  return (
    <div className="svm" role="region" aria-label="Interactive supervisor floor">
      <div className="svm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="svm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Supervisor floor
        </span>
        <span className="svm-meta">247 active · AI-ranked</span>
      </div>

      <ol className="svm-calls">
        {CALLS.map((c, i) => {
          const s = drift(c);
          return (
            <li key={c.id}>
              <button type="button" className={`svm-call svm-call--${c.tone}${sel === c.id ? ' is-on' : ''}`} onClick={() => pick(c.id)} aria-pressed={sel === c.id}>
                <span className="svm-rank">#{i + 1}</span>
                <span className="svm-av">{c.init}</span>
                <span className="svm-txt"><b>{c.agent}</b><em>{c.topic} · {c.state}</em></span>
                <span className="svm-sent" title="Live sentiment">
                  <span className="svm-sent-bar"><i style={{ width: `${s}%` }}></i></span>
                  <em>{s}</em>
                </span>
                <span className="svm-tag">{c.tag}</span>
                <span className="svm-dur">{mmss(c.dur + tick)}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="svm-ctrl">
        <span className={`svm-state svm-state--${mode}`}><i aria-hidden="true"></i>{MODE_LABEL[mode]} · {call.agent}</span>
        <div className="svm-modes" role="group" aria-label="Supervisor mode">
          {[['monitor', 'ri-headphone-line', 'Monitor'], ['whisper', 'ri-user-voice-line', 'Whisper'], ['barge', 'ri-group-line', 'Barge']].map(([m, ic, l]) => (
            <button key={m} type="button" className={mode === m ? 'is-on' : ''} aria-pressed={mode === m} onClick={() => go(m)}>
              <i className={ic} aria-hidden="true"></i>{l}
            </button>
          ))}
          <button type="button" className="svm-leave" onClick={leave} disabled={mode === 'idle'} aria-label="Leave call"><i className="ri-logout-box-r-line" aria-hidden="true"></i></button>
        </div>
        {mode === 'whisper' && (
          <div className="svm-prompts" role="group" aria-label="Whisper a prompt">
            {PROMPTS.map((p) => <button key={p} type="button" onClick={() => whisper(p)}>{p}</button>)}
          </div>
        )}
        {mode === 'barge' && notice && (
          <div className="svm-notice"><i className="ri-scales-3-line" aria-hidden="true"></i>{notice.state} · {notice.rule} consent — “A supervisor has joined this call.”</div>
        )}
      </div>

      <ol className="svm-log" aria-live="polite">
        <span className="svm-log-k">Live audit log · streaming to SIEM</span>
        {log.map((e) => (
          <li key={e.id} className={`svm-log-row svm-log-row--${e.scope}`}>
            <em>{clock(e.t)}</em><b>{e.ev}</b><span>{e.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
