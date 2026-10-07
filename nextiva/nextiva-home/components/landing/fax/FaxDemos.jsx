'use client';
/* Interactive sections for the Online Fax page:
   - Channels: three ways to send (email, web, mobile), each with its own visual.
   - AuditTrail: one fax's history; "Verify history" checks each entry in turn.
   - AddonSeats: switch fax on per seat and see that only those seats pay. */
import { useEffect, useRef, useState } from 'react';

/* ── Channels ─────────────────────────────────────────────────────────── */
function ChannelVisual({ id }) {
  if (id === 'email') {
    return (
      <div className="fx-ch-mail">
        <span className="fx-ch-bar"><i></i><i></i><i></i><b>New message</b></span>
        <span className="fx-ch-field"><em>To</em>13125550198@fax.ucaas.app</span>
        <span className="fx-ch-field"><em>Subject</em>Referral — J. Alvarez</span>
        <span className="fx-ch-body">Please find the referral attached. Thanks!</span>
        <span className="fx-ch-att"><i className="ri-file-pdf-2-fill"></i>patient-referral.pdf<em>3 pages</em></span>
        <span className="fx-ch-send"><i className="ri-send-plane-2-fill"></i>Send</span>
      </div>
    );
  }
  if (id === 'web') {
    return (
      <div className="fx-ch-web">
        <span className="fx-ch-drop"><i className="ri-upload-cloud-2-line"></i>signed-agreement.pdf · 6 pages</span>
        <span className="fx-ch-k">Recipients · batch</span>
        {['Harbor Counsel', 'County Clerk', 'Eastline Title'].map((r, i) => (
          <span key={r} className="fx-ch-rcpt" style={{ animationDelay: `${i * 0.15}s` }}><i className="ri-check-line"></i>{r}<em>Delivered</em></span>
        ))}
        <span className="fx-ch-report"><i className="ri-file-list-3-line"></i>1 confirmation report for 3 recipients</span>
      </div>
    );
  }
  return (
    <div className="fx-ch-phone">
      <span className="fx-ch-notch"></span>
      <span className="fx-ch-cam">
        <span className="fx-ch-doc"><i></i><i></i><i></i><i></i><b>Signed</b></span>
        <em className="fx-ch-corner fx-ch-corner--a"></em><em className="fx-ch-corner fx-ch-corner--b"></em>
        <em className="fx-ch-corner fx-ch-corner--c"></em><em className="fx-ch-corner fx-ch-corner--d"></em>
      </span>
      <span className="fx-ch-scan">Edges found · 1 page</span>
      <span className="fx-ch-fax"><i className="ri-printer-line"></i>Fax it</span>
    </div>
  );
}

export function Channels({ data }) {
  const [on, setOn] = useState(data.items[0].id);
  return (
    <section className="lp-section fx-ch-sec">
      <div className="lp-wrap">
        <div className="fx-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="fx-ch reveal reveal-delay-1">
          <div className="fx-ch-list" role="tablist" aria-label="Ways to send">
            {data.items.map((c) => (
              <button key={c.id} type="button" role="tab" aria-selected={on === c.id} className={`fx-ch-tab${on === c.id ? ' is-on' : ''}`} onClick={() => setOn(c.id)}>
                <span className="fx-ch-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <span className="fx-ch-txt"><em>{c.label}</em><b>{c.title}</b><span>{c.text}</span></span>
              </button>
            ))}
          </div>
          <div className="fx-ch-stage" role="tabpanel" aria-hidden="true" key={on}>
            <ChannelVisual id={on} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Audit trail ──────────────────────────────────────────────────────── */
const EVENTS = [
  { at: 'Oct 2 · 09:41:07', icon: 'ri-inbox-archive-line', what: 'Received from +1 (617) 555-0123', who: 'System', hash: '9f2c…a71e' },
  { at: 'Oct 2 · 09:41:09', icon: 'ri-file-search-line', what: 'Text indexed · 2 pages', who: 'System', hash: '41bd…03c9' },
  { at: 'Oct 2 · 09:52:30', icon: 'ri-eye-line', what: 'Opened', who: 'Dr. M. Lee', hash: 'c7e0…5b12' },
  { at: 'Oct 2 · 10:05:14', icon: 'ri-quill-pen-line', what: 'Signed via DocuSign', who: 'Dr. M. Lee', hash: '2a98…e44f' },
  { at: 'Oct 2 · 10:06:02', icon: 'ri-share-forward-line', what: 'Forwarded to Billing', who: 'R. Patel', hash: '7d13…9a20' },
];

export function AuditTrail({ data }) {
  const [checked, setChecked] = useState(-1);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const verify = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setChecked(-1);
    EVENTS.forEach((_, i) => timers.current.push(setTimeout(() => setChecked(i), 380 * (i + 1))));
  };
  const done = checked === EVENTS.length - 1;

  return (
    <section className="lp-section lp-section--theme fx-au-sec">
      <div className="lp-wrap fx-au">
        <div className="fx-au-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="fx-au-points">
            {data.points.map((p) => <li key={p}><i className="ri-shield-check-line" aria-hidden="true"></i>{p}</li>)}
          </ul>
        </div>

        <div className="fx-log reveal reveal-delay-1">
          <div className="fx-log-head">
            <span><i className="ri-file-shield-2-line" aria-hidden="true"></i>FX-04821 · Lab results</span>
            <button type="button" onClick={verify} disabled={checked >= 0 && !done}>
              <i className={done ? 'ri-checkbox-circle-fill' : 'ri-fingerprint-line'} aria-hidden="true"></i>
              {done ? 'History verified' : 'Verify history'}
            </button>
          </div>
          <ol className="fx-log-list" aria-live="polite">
            {EVENTS.map((e, i) => (
              <li key={e.at} className={`fx-log-row${i <= checked ? ' is-ok' : ''}`}>
                <span className="fx-log-ic"><i className={e.icon} aria-hidden="true"></i></span>
                <span className="fx-log-txt"><b>{e.what}</b><em>{e.at} · {e.who}</em></span>
                <span className="fx-log-hash">{i <= checked ? <><i className="ri-check-line" aria-hidden="true"></i>{e.hash}</> : e.hash}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── Add-on seats ─────────────────────────────────────────────────────── */
const SEATS = [
  { n: 'Ana', role: 'Front desk', fax: true }, { n: 'Ben', role: 'Sales', fax: false }, { n: 'Cleo', role: 'Billing', fax: true },
  { n: 'Dev', role: 'Support', fax: false }, { n: 'Eli', role: 'Sales', fax: false }, { n: 'Fay', role: 'Referrals', fax: true },
  { n: 'Gus', role: 'Support', fax: false }, { n: 'Hana', role: 'Ops', fax: false }, { n: 'Ivo', role: 'Sales', fax: false },
  { n: 'Jo', role: 'Marketing', fax: false }, { n: 'Kai', role: 'Support', fax: false }, { n: 'Lia', role: 'Founder', fax: false },
];

export function AddonSeats({ data }) {
  const [seats, setSeats] = useState(SEATS);
  const on = seats.filter((s) => s.fax).length;
  const toggle = (n) => setSeats((cur) => cur.map((s) => (s.n === n ? { ...s, fax: !s.fax } : s)));

  return (
    <section className="lp-section fx-add-sec">
      <div className="lp-wrap fx-add">
        <div className="fx-add-panel reveal">
          <div className="fx-add-head">
            <span><i className="ri-team-line" aria-hidden="true"></i>Your team · {seats.length} seats</span>
            <em>Tap a seat to switch fax on or off</em>
          </div>
          <div className="fx-seats">
            {seats.map((s) => (
              <button key={s.n} type="button" className={`fx-seat${s.fax ? ' is-on' : ''}`} onClick={() => toggle(s.n)} aria-pressed={s.fax}>
                <span className="fx-seat-av">{s.n.slice(0, 2)}</span>
                <span className="fx-seat-txt"><b>{s.n}</b><em>{s.role}</em></span>
                <span className="fx-seat-fax"><i className="ri-printer-fill" aria-hidden="true"></i></span>
              </button>
            ))}
          </div>
          <div className="fx-add-sum" aria-live="polite">
            <span className="fx-add-meter"><i style={{ width: `${Math.round((on / seats.length) * 100)}%` }}></i></span>
            <span><b>{on}</b> of {seats.length} seats have fax — the other <b>{seats.length - on}</b> don’t pay for it.</span>
          </div>
        </div>

        <div className="fx-add-copy reveal reveal-delay-1">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
      </div>
    </section>
  );
}
