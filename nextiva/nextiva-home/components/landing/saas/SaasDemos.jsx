'use client';
/* Interactive sections for the SaaS & Tech page:
   - LayersDemo: the six layers of the platform as a stack; it climbs from
     the foundation up every few seconds (pausing while it's being used), or pick
     one to see what users get and what engineers get alongside it.
   - HooksDemo: pick an event, see the signed payload and send a test
     delivery — with the endpoint failing, it retries with backoff; any
     delivery can be replayed.
   - ReviewDemo: a vendor security questionnaire answered from public docs. */
import { useEffect, useRef, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

/* ── Six layers ───────────────────────────────────────────────────────── */
// Listed top of the stack first; the last entry is the foundation.
const LAYERS = [
  { id: 'admin', icon: 'ri-shield-keyhole-line', title: 'Admin & security', sub: 'SSO, roles, audit', desc: 'Control who can see and change what, and keep a record of every change.', users: ['SSO sign-in and role-based access', 'Audit log of every change', 'Per-team settings'], devs: ['SCIM provisioning', 'Audit events API'], code: 'GET /v1/audit-events' },
  { id: 'ai', icon: 'ri-robot-2-line', title: 'Personal AI', sub: 'Summaries & CRM notes', desc: 'Every call summarized, with next steps written to the CRM for each rep.', users: ['Call summaries and next steps', 'Notes logged to HubSpot or Zoho', 'Follow-up drafts'], devs: ['Summary in the call.completed payload', 'Custom field mapping'], code: 'call.summary.next_steps' },
  { id: 'ci', icon: 'ri-brain-line', title: 'Conversation intelligence', sub: 'Sentiment & topics', desc: 'Transcripts, sentiment and objections on every demo and success call.', users: ['Sentiment and talk ratio', 'Objections and topics', 'Searchable transcripts'], devs: ['transcript.ready webhook', 'Insights API'], code: 'GET /v1/calls/:id/insights' },
  { id: 'chat', icon: 'ri-chat-3-line', title: 'Team chat & Slack', sub: 'Messages & alerts', desc: 'Team messaging built in, with call alerts where your team already works.', users: ['Team and direct messages', 'Missed-call alerts in Slack', 'Shared inboxes'], devs: ['message.* events', 'Slack app with slash commands'], code: 'on("message.received", handler)' },
  { id: 'soft', icon: 'ri-computer-line', title: 'Softphones', sub: 'Desktop, mobile & web', desc: 'Apps for every device, plus a dialer you can embed in your own product.', users: ['Desktop, mobile and web apps', 'Click-to-call from the CRM', 'Hand off calls between devices'], devs: ['Embeddable web dialer', 'Click-to-call SDK'], code: '<ucaas-dialer number="+14155550123" />' },
  { id: 'core', icon: 'ri-phone-line', title: 'Numbers & phone events', sub: 'Numbers, porting & events', desc: 'The foundation: numbers, porting, recording and a real-time event stream.', users: ['Local, toll-free and international numbers', 'Porting from any carrier', 'Recording with long retention'], devs: ['call.* events in real time', 'S3-compatible export'], code: 'POST /v1/numbers/port' },
];

const STEP_MS = 2600; // autoplay: time on each layer

export function LayersDemo({ data }) {
  const [id, setId] = useState('core');
  const [paused, pauseBind] = useIntentPause(); // only while the visitor is using the card
  const [visible, setVisible] = useState(false);
  const box = useRef(null);
  const idx = LAYERS.findIndex((x) => x.id === id);

  // Only play while the card is on screen, and never for reduced motion.
  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // Climb the stack from the foundation up, then start again at the bottom.
  const playing = visible && !paused;
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setId(LAYERS[(idx - 1 + LAYERS.length) % LAYERS.length].id), STEP_MS);
    return () => clearTimeout(t);
  }, [playing, idx]);
  const L = LAYERS[idx];
  const num = LAYERS.length - idx;
  return (
    <section className="lp-section sx-ly-sec">
      <div className="lp-wrap">
        <div className="sx-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div
          ref={box}
          className="sx-ly reveal reveal-delay-1"
          data-playing={playing}
          style={{ '--step': `${STEP_MS}ms` }}
          {...pauseBind}
        >
          <div className="sx-stack">
            <span className="sx-stack-k"><i className="ri-stack-line" aria-hidden="true"></i>Platform stack<em>{LAYERS.length} layers</em></span>
            <div className="sx-stack-list" role="tablist" aria-label="Platform layers" aria-orientation="vertical">
              {LAYERS.map((x, n) => (
                <button key={x.id} type="button" role="tab" aria-selected={id === x.id} className={`sx-layer${id === x.id ? ' is-on' : ''}`} onClick={() => setId(x.id)} onMouseEnter={() => setId(x.id)}>
                  <span className="sx-layer-n">{String(LAYERS.length - n).padStart(2, '0')}</span>
                  <span className="sx-layer-ic"><i className={x.icon} aria-hidden="true"></i></span>
                  <span className="sx-layer-txt"><b>{x.title}</b><em>{x.sub}</em></span>
                  <i className="ri-arrow-right-s-line sx-layer-go" aria-hidden="true"></i>
                  {id === x.id && <span className="sx-layer-bar" aria-hidden="true"></span>}
                </button>
              ))}
            </div>
          </div>

          <div className="sx-ly-panel" key={id} role="tabpanel" aria-live="polite">
            <div className="sx-ly-top">
              <span className="sx-ly-ic"><i className={L.icon} aria-hidden="true"></i></span>
              <div>
                <span className="sx-ly-tag">Layer {String(num).padStart(2, '0')}{num === 1 ? ' · Foundation' : ''}</span>
                <h3 className="sx-ly-title">{L.title}</h3>
              </div>
              <span className="sx-ly-pos" aria-hidden="true">{LAYERS.map((x, n) => <i key={x.id} className={n === idx ? 'is-on' : ''}></i>)}</span>
            </div>
            <p className="sx-ly-desc">{L.desc}</p>
            <div className="sx-ly-cols">
              <div className="sx-ly-box">
                <span className="sx-ly-k"><i className="ri-team-line" aria-hidden="true"></i>For your team</span>
                <ul>{L.users.map((u, n) => <li key={u} style={{ '--d': `${120 + n * 90}ms` }}><i className="ri-check-line" aria-hidden="true"></i>{u}</li>)}</ul>
              </div>
              <div className="sx-ly-box sx-ly-box--dev">
                <span className="sx-ly-k"><i className="ri-code-s-slash-line" aria-hidden="true"></i>For your engineers</span>
                <ul>{L.devs.map((u, n) => <li key={u} style={{ '--d': `${200 + n * 90}ms` }}><i className="ri-check-line" aria-hidden="true"></i>{u}</li>)}</ul>
              </div>
            </div>
            <div className="sx-ly-code"><span>Example</span><code className="sx-ly-type" style={{ '--chars': L.code.length }}>{L.code}</code></div>
            <div className="sx-ly-foot">
              <span className="sx-ly-state is-on"><i className="ri-stack-line" aria-hidden="true"></i>Climbing the stack · {L.title}</span>
              <span className="sx-ly-step">{String(num).padStart(2, '0')} / {String(LAYERS.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Webhooks ─────────────────────────────────────────────────────────── */
const HOOKS = {
  'call.completed': { id: 'cl_9QdX2', direction: 'outbound', duration: 134, recording: true, summary: 'Demo booked for Thu 2 pm' },
  'sms.received': { id: 'sm_4LkP8', from: '+14155550123', body: 'Can we move the demo to Friday?', channel: 'sms' },
  'transcript.ready': { id: 'tr_7RmA1', call_id: 'cl_9QdX2', words: 812, sentiment: 'positive', talk_ratio: 0.42 },
  'recording.ready': { id: 'rc_2HnC5', call_id: 'cl_9QdX2', format: 'wav', storage: 's3://acme-calls/2026/10/' },
};
const BACKOFF = ['1 s', '4 s', '16 s'];

export function HooksDemo({ data }) {
  const [ev, setEv] = useState('call.completed');
  const [failing, setFailing] = useState(true);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);
  const timers = useRef([]);
  const seq = useRef(0);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clear(), []);
  const push = (row) => setLog((l) => [{ ...row, key: ++seq.current }, ...l].slice(0, 6));

  const deliver = (replay = false) => {
    clear();
    setBusy(true);
    const tries = failing && !replay ? 3 : 1;
    for (let n = 0; n < tries; n++) {
      timers.current.push(setTimeout(() => {
        const ok = n === tries - 1;
        push({ ev, n: n + 1, ok, replay, note: ok ? `200 OK · ${88 + n * 13} ms · signature verified` : `500 from your endpoint · retrying in ${BACKOFF[n]}` });
        if (ok) setBusy(false);
      }, 300 + n * 900));
    }
  };
  const payload = JSON.stringify({ type: ev, created: '2026-10-03T14:22:07Z', data: HOOKS[ev] }, null, 2);

  return (
    <section className="lp-section lp-section--theme sx-wh-sec">
      <div className="lp-wrap">
        <div className="sx-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="sx-wh reveal reveal-delay-1">
          <div className="sx-wh-left">
            <div className="sx-wh-evs" role="group" aria-label="Event">
              {Object.keys(HOOKS).map((k) => <button key={k} type="button" className={ev === k ? 'is-on' : ''} aria-pressed={ev === k} onClick={() => setEv(k)}>{k}</button>)}
            </div>
            <div className="sx-wh-code">
              <span className="sx-wh-hdr"><b>POST</b> https://api.acme.dev/hooks<em>X-Signature: t=1791…, v1=8c2f…</em></span>
              <pre key={ev}>{payload}</pre>
            </div>
          </div>
          <div className="sx-wh-right">
            <button type="button" className={`sx-switch${failing ? ' is-on' : ''}`} role="switch" aria-checked={failing} onClick={() => setFailing((f) => !f)}>
              <i aria-hidden="true"></i>Simulate endpoint outage {failing ? 'on' : 'off'}
            </button>
            <div className="sx-wh-btns">
              <button type="button" className="sx-wh-send" onClick={() => deliver(false)} disabled={busy}><i className={busy ? 'ri-loader-4-line' : 'ri-send-plane-fill'} aria-hidden="true"></i>{busy ? 'Delivering…' : 'Send test event'}</button>
              <button type="button" className="sx-wh-replay" onClick={() => deliver(true)} disabled={busy || !log.length}><i className="ri-replay-line" aria-hidden="true"></i>Replay last</button>
            </div>
            <span className="sx-wh-k">Delivery log</span>
            <ul className="sx-wh-log" aria-live="polite">
              {log.map((r) => (
                <li key={r.key} className={r.ok ? 'is-ok' : 'is-fail'}>
                  <i className={r.ok ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'} aria-hidden="true"></i>
                  <span><b>{r.ev}<small>{r.replay ? ' · replay' : ` · attempt ${r.n}`}</small></b><em>{r.note}</em></span>
                </li>
              ))}
              {!log.length && <li className="sx-wh-empty">No deliveries yet — send a test event.</li>}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Security questionnaire ───────────────────────────────────────────── */
const QS = [
  { q: 'Is customer data encrypted in transit and at rest?', a: 'TLS 1.2+ in transit; AES-256 at rest.', doc: 'Security overview · Encryption' },
  { q: 'Do you support SSO and automated provisioning?', a: 'SAML single sign-on and SCIM provisioning.', doc: 'Admin guide · Identity' },
  { q: 'Can recordings be stored in our own cloud?', a: 'Yes — export to any S3-compatible bucket.', doc: 'Developer docs · Storage' },
  { q: 'Can we control data retention?', a: '90 days by default, configurable up to 7 years, with legal holds.', doc: 'Admin guide · Retention' },
  { q: 'Is there an audit trail of admin and API activity?', a: 'Every admin change and API key action is logged and exportable.', doc: 'Admin guide · Audit log' },
  { q: 'Who are your sub-processors?', a: 'Published list, with notice before changes.', doc: 'Legal · Sub-processors' },
  { q: 'Will you sign a data processing agreement?', a: 'Yes — a standard DPA is available up front.', doc: 'Legal · DPA' },
  { q: 'How are security incidents handled?', a: 'Documented response process with customer notification.', doc: 'Security overview · Incidents' },
];

export function ReviewDemo({ data }) {
  const [done, setDone] = useState(0);
  const timer = useRef(null);
  useEffect(() => () => clearInterval(timer.current), []);
  const fill = () => {
    clearInterval(timer.current);
    setDone(0);
    timer.current = setInterval(() => setDone((d) => {
      if (d + 1 >= QS.length) clearInterval(timer.current);
      return Math.min(QS.length, d + 1);
    }), 380);
  };
  const pct = Math.round((done / QS.length) * 100);

  return (
    <section className="lp-section sx-rv-sec">
      <div className="lp-wrap">
        <div className="sx-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="sx-rv reveal reveal-delay-1">
          <div className="sx-rv-top">
            <span className="sx-rv-doc"><i className="ri-file-shield-2-line" aria-hidden="true"></i><b>Vendor security questionnaire</b><em>Acme Inc. · procurement</em></span>
            <span className="sx-rv-prog"><span><i style={{ width: `${pct}%` }}></i></span><b>{done}/{QS.length}</b></span>
            <button type="button" className="sx-rv-fill" onClick={fill}><i className="ri-magic-line" aria-hidden="true"></i>{done ? 'Fill again' : 'Answer from docs'}</button>
          </div>
          <ol className="sx-rv-list" aria-live="polite">
            {QS.map((x, n) => (
              <li key={x.q} className={n < done ? 'is-done' : ''}>
                <span className="sx-rv-n">{n + 1}</span>
                <span className="sx-rv-q">{x.q}</span>
                <span className="sx-rv-a">
                  {n < done ? <><b>{x.a}</b><em><i className="ri-link" aria-hidden="true"></i>{x.doc}</em></> : <em className="sx-rv-blank">Awaiting answer</em>}
                </span>
              </li>
            ))}
          </ol>
          {done === QS.length && <p className="sx-rv-ok"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>All answered with links to the source — ready to send back to procurement.</p>}
        </div>
      </div>
    </section>
  );
}
