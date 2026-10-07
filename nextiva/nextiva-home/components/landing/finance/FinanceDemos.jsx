'use client';
/* Interactive sections for the Financial Services page:
   - DisclosureTimeline: pick a call type and play the call; each required
     disclosure is marked on the timeline as it's said. With live monitoring
     on, a missing one is prompted before the call ends; off, it's only
     found in the audit weeks later.
   - OutboundDemo: what the client's phone shows for an unsigned call vs an
     attested, branded local one — plus the pre-dial checks (consent, DNC,
     local calling hours) for three sample clients.
   - VaultDemo: redact a transcript, set retention per line of business,
     place a legal hold and export the audit trail. */
import { useEffect, useRef, useState } from 'react';

/* ── Disclosure timeline ──────────────────────────────────────────────── */
const TYPES = [
  {
    id: 'wealth', label: 'Wealth review', mins: 18,
    items: [
      { label: 'Recording notice', at: 0.4 },
      { label: 'Fee disclosure', at: 6 },
      { label: 'Suitability check', at: 10.5 },
      { label: 'Risk disclosure', at: null },
    ],
  },
  {
    id: 'mortgage', label: 'Mortgage quote', mins: 14,
    items: [
      { label: 'Recording notice', at: 0.3 },
      { label: 'Rate & APR stated', at: 5 },
      { label: 'Estimate-only notice', at: null },
      { label: 'Written disclosure sent', at: 12 },
    ],
  },
  {
    id: 'collections', label: 'Collections', mins: 9,
    items: [
      { label: 'Recording notice', at: 0.3 },
      { label: 'Identity verified', at: 1.5 },
      { label: 'Debt-collector notice', at: null },
      { label: 'Payment terms read back', at: 7.5 },
    ],
  },
];
const fmt = (m) => `${Math.floor(m)}:${String(Math.round((m % 1) * 60)).padStart(2, '0')}`;

export function DisclosureTimeline({ data }) {
  const [tid, setTid] = useState('wealth');
  const [live, setLive] = useState(true);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(null);
  const type = TYPES.find((x) => x.id === tid);
  const promptAt = type.mins - 1.5;

  useEffect(() => {
    if (!playing) return undefined;
    const t0 = performance.now() - (t / type.mins) * 6000;
    const tick = (now) => {
      const v = Math.min(type.mins, ((now - t0) / 6000) * type.mins);
      setT(v);
      if (v < type.mins) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, tid]); // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (id) => { setPlaying(false); setT(0); setTid(id); };
  const toggleLive = () => { setPlaying(false); setT(0); setLive((x) => !x); };
  const play = () => { if (t >= type.mins) setT(0); setPlaying(true); };

  const ended = t >= type.mins;
  const items = type.items.map((x) => {
    const at = x.at ?? (live ? promptAt : null);
    const st = at !== null && t >= at ? (x.at === null ? 'prompted' : 'said') : ended ? 'missed' : 'pending';
    return { ...x, when: at, st };
  });
  const missed = items.some((x) => x.st === 'missed');

  return (
    <section className="lp-section fn-dt-sec">
      <div className="lp-wrap">
        <div className="fn-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="fn-dt reveal reveal-delay-1">
          <div className="fn-dt-bar">
            <div className="fn-dt-tabs" role="group" aria-label="Call type">
              {TYPES.map((x) => <button key={x.id} type="button" className={tid === x.id ? 'is-on' : ''} aria-pressed={tid === x.id} onClick={() => pick(x.id)}>{x.label}</button>)}
            </div>
            <button type="button" className={`fn-switch${live ? ' is-on' : ''}`} role="switch" aria-checked={live} onClick={toggleLive}><i aria-hidden="true"></i>Live monitoring {live ? 'on' : 'off'}</button>
          </div>

          <div className="fn-dt-player">
            <button type="button" className="fn-dt-play" onClick={() => (playing ? setPlaying(false) : play())} aria-label={playing ? 'Pause call' : 'Play call'}>
              <i className={playing ? 'ri-pause-fill' : ended ? 'ri-restart-line' : 'ri-play-fill'} aria-hidden="true"></i>
            </button>
            <div className="fn-dt-track">
              <span className="fn-dt-fill" style={{ width: `${(t / type.mins) * 100}%` }}></span>
              {items.filter((x) => x.when !== null).map((x) => (
                <span key={x.label} className={`fn-dt-mark fn-dt-mark--${x.st}`} style={{ left: `${(x.when / type.mins) * 100}%` }} title={x.label}>
                  <i className={x.st === 'prompted' ? 'ri-alarm-warning-fill' : 'ri-check-line'} aria-hidden="true"></i>
                </span>
              ))}
              <input type="range" min="0" max={type.mins} step="0.1" value={t} onChange={(e) => { setPlaying(false); setT(Number(e.target.value)); }} aria-label="Call position" />
            </div>
            <span className="fn-dt-time">{fmt(t)} <em>/ {fmt(type.mins)}</em></span>
          </div>

          <ul className="fn-dt-list" aria-live="polite">
            {items.map((x) => (
              <li key={x.label} className={`fn-dt-item fn-dt-item--${x.st}`}>
                <i className={{ said: 'ri-checkbox-circle-fill', prompted: 'ri-alarm-warning-fill', missed: 'ri-close-circle-fill', pending: 'ri-time-line' }[x.st]} aria-hidden="true"></i>
                <b>{x.label}</b>
                <em>{{ said: `Said at ${fmt(x.when)}`, prompted: `Advisor prompted · said at ${fmt(x.when)}`, missed: 'Not said', pending: 'Waiting' }[x.st]}</em>
              </li>
            ))}
          </ul>

          <p className={`fn-dt-out${ended ? (missed ? ' is-bad' : ' is-good') : ''}`}>
            {!ended && <><i className="ri-information-line" aria-hidden="true"></i>Press play — or drag through the call.</>}
            {ended && missed && <><i className="ri-error-warning-fill" aria-hidden="true"></i>Found in a sample audit six weeks later — the client has to be called back.</>}
            {ended && !missed && <><i className="ri-shield-check-fill" aria-hidden="true"></i>Every disclosure said before the call ended. Nothing to remediate.</>}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Outbound: caller ID + pre-dial checks ────────────────────────────── */
const CLIENTS = [
  { id: 'tx', name: 'J. Romero', where: 'Austin, TX', offset: -1, consent: true, dnc: false },
  { id: 'ca', name: 'P. Sato', where: 'San Diego, CA', offset: -3, consent: true, dnc: false },
  { id: 'ny', name: 'L. Brennan', where: 'Albany, NY', offset: 0, consent: false, dnc: false },
];
const NOW_ET = 9 * 60 + 40; // 9:40 am Eastern — early enough that West Coast clients are still outside calling hours
const clock = (m) => { const h = Math.floor(((m % 1440) + 1440) % 1440 / 60); const mm = String(((m % 60) + 60) % 60).padStart(2, '0'); return `${((h + 11) % 12) + 1}:${mm} ${h < 12 ? 'am' : 'pm'}`; };

export function OutboundDemo({ data }) {
  const [signed, setSigned] = useState(true);
  const [cid, setCid] = useState('tx');
  const c = CLIENTS.find((x) => x.id === cid);
  const local = NOW_ET + c.offset * 60;
  const inHours = local >= 8 * 60 && local < 21 * 60;
  const verdict = !c.consent ? { cls: 'bad', icon: 'ri-forbid-line', text: 'Blocked — no consent on file for this number' } : !inHours ? { cls: 'wait', icon: 'ri-time-line', text: `Held — queued for 8:00 am local (${clock(8 * 60 - c.offset * 60)} ET)` } : { cls: 'good', icon: 'ri-phone-fill', text: 'Cleared to dial' };

  return (
    <section className="lp-section lp-section--theme fn-ob-sec">
      <div className="lp-wrap">
        <div className="fn-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="fn-ob reveal reveal-delay-1">
          <div className="fn-ob-phone-col">
            <div className="fn-ob-toggle" role="group" aria-label="Outbound number">
              <button type="button" className={!signed ? 'is-on' : ''} aria-pressed={!signed} onClick={() => setSigned(false)}>Unsigned number</button>
              <button type="button" className={signed ? 'is-on' : ''} aria-pressed={signed} onClick={() => setSigned(true)}>Attested + local</button>
            </div>
            <div className={`fn-phone${signed ? ' is-signed' : ' is-spam'}`} aria-live="polite">
              <span className="fn-phone-notch" aria-hidden="true"></span>
              <span className="fn-phone-k">Incoming call</span>
              {signed ? (
                <>
                  <span className="fn-phone-logo"><i className="ri-bank-fill" aria-hidden="true"></i></span>
                  <b className="fn-phone-name">Parity Finance <i className="ri-verified-badge-fill" aria-hidden="true"></i></b>
                  <span className="fn-phone-num">(512) 555-0186 · Austin, TX</span>
                  <span className="fn-phone-why">Calling about your loan application</span>
                </>
              ) : (
                <>
                  <span className="fn-phone-logo"><i className="ri-spam-2-fill" aria-hidden="true"></i></span>
                  <b className="fn-phone-name">Spam Likely</b>
                  <span className="fn-phone-num">+1 (888) 555-0142</span>
                  <span className="fn-phone-why">Unverified caller</span>
                </>
              )}
              <span className="fn-phone-btns" aria-hidden="true"><i className="ri-phone-fill"></i><i className="ri-phone-fill"></i></span>
            </div>
          </div>

          <div className="fn-ob-checks">
            <span className="fn-ob-k">Before the dialer calls…</span>
            <div className="fn-ob-clients" role="group" aria-label="Client">
              {CLIENTS.map((x) => (
                <button key={x.id} type="button" className={cid === x.id ? 'is-on' : ''} aria-pressed={cid === x.id} onClick={() => setCid(x.id)}>
                  <b>{x.name}</b><em>{x.where}</em>
                </button>
              ))}
            </div>
            <ul className="fn-ob-list" aria-live="polite">
              <li className={c.consent ? 'is-ok' : 'is-bad'}><i className={c.consent ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill'} aria-hidden="true"></i><b>Consent on file</b><em>{c.consent ? 'Written consent · 2024' : 'None recorded'}</em></li>
              <li className="is-ok"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i><b>Do-not-call scrub</b><em>Not listed</em></li>
              <li className={inHours ? 'is-ok' : 'is-wait'}><i className={inHours ? 'ri-checkbox-circle-fill' : 'ri-time-fill'} aria-hidden="true"></i><b>Local calling hours</b><em>{clock(local)} local · window 8 am–9 pm</em></li>
              <li className={signed ? 'is-ok' : 'is-wait'}><i className={signed ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'} aria-hidden="true"></i><b>Caller ID</b><em>{signed ? 'A-level attestation · branded' : 'Unsigned — likely labelled spam'}</em></li>
            </ul>
            <p className={`fn-ob-verdict is-${verdict.cls}`}><i className={verdict.icon} aria-hidden="true"></i>{verdict.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Vault: redaction, retention, audit ───────────────────────────────── */
const LOBS = [
  { id: 'adv', label: 'Advisory', years: 7 },
  { id: 'lend', label: 'Lending', years: 5 },
  { id: 'svc', label: 'Service', years: 0.25 },
];
const STEPS = [0.25, 1, 3, 5, 7];
const yrs = (y) => (y < 1 ? '90 days' : `${y} year${y > 1 ? 's' : ''}`);
const BASE_LOG = [
  { who: 'M. Chen', what: 'Played recording #41723', when: '09:14' },
  { who: 'System', what: 'Redacted card number in #41719', when: '09:02' },
  { who: 'Compliance', what: 'Exported Q3 disclosure report', when: 'Mon' },
];

export function VaultDemo({ data }) {
  const [redact, setRedact] = useState(true);
  const [lob, setLob] = useState('adv');
  const [ret, setRet] = useState({ adv: 7, lend: 5, svc: 0.25 });
  const [hold, setHold] = useState(false);
  const [log, setLog] = useState(BASE_LOG);
  const [exported, setExported] = useState(false);
  const add = (what) => setLog((l) => [{ who: 'You', what, when: 'now' }, ...l].slice(0, 4));
  const cur = LOBS.find((x) => x.id === lob);
  const setYears = (i) => { setRet((r) => ({ ...r, [lob]: STEPS[i] })); add(`Set ${cur.label} retention to ${yrs(STEPS[i])}`); };
  const toggleHold = () => { setHold((h) => !h); add(hold ? 'Released legal hold on #41723' : 'Placed legal hold on #41723'); };
  const doExport = () => { setExported(true); add('Exported audit trail'); };
  const r = (s) => (redact ? <mark>{s.replace(/\d(?=(?:[\s-]?\d){4})/g, '•')}</mark> : <span className="fn-raw">{s}</span>);

  return (
    <section className="lp-section fn-vt-sec">
      <div className="lp-wrap">
        <div className="fn-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="fn-vt reveal reveal-delay-1">
          <div className="fn-vt-card fn-vt-redact">
            <div className="fn-vt-top">
              <span className="fn-vt-n">01</span><b>Redact</b>
              <button type="button" className={`fn-switch fn-switch--sm${redact ? ' is-on' : ''}`} role="switch" aria-checked={redact} onClick={() => setRedact((x) => !x)}><i aria-hidden="true"></i>{redact ? 'On' : 'Off'}</button>
            </div>
            <div className="fn-wave" aria-hidden="true">
              {Array.from({ length: 40 }, (_, k) => <i key={k} className={redact && k >= 15 && k < 27 ? 'is-muted' : ''} style={{ '--h': `${25 + ((k * 53) % 75)}%` }}></i>)}
            </div>
            <p className="fn-vt-tx"><span>Client</span>Sure, the card is {r('4111 2222 3333 4417')}, and my account number is {r('0012-4458-9930')}.</p>
            <span className={`fn-vt-note${redact ? ' is-good' : ' is-bad'}`}>
              <i className={redact ? 'ri-shield-check-line' : 'ri-error-warning-line'} aria-hidden="true"></i>
              {redact ? 'Removed from audio and transcript — agents and reviewers never see it' : 'Card data stored in the recording — PCI exposure'}
            </span>
          </div>

          <div className="fn-vt-card fn-vt-keep">
            <div className="fn-vt-top"><span className="fn-vt-n">02</span><b>Keep</b></div>
            <div className="fn-vt-lobs" role="group" aria-label="Line of business">
              {LOBS.map((x) => <button key={x.id} type="button" className={lob === x.id ? 'is-on' : ''} aria-pressed={lob === x.id} onClick={() => setLob(x.id)}>{x.label}</button>)}
            </div>
            <span className="fn-vt-big">{yrs(ret[lob])}</span>
            <input className="fn-vt-range" type="range" min="0" max={STEPS.length - 1} step="1" value={STEPS.indexOf(ret[lob])} onChange={(e) => setYears(Number(e.target.value))} aria-label={`${cur.label} retention`} style={{ '--p': `${(STEPS.indexOf(ret[lob]) / (STEPS.length - 1)) * 100}%` }} />
            <span className="fn-vt-ticks" aria-hidden="true">{STEPS.map((s) => <em key={s}>{s < 1 ? '90d' : `${s}y`}</em>)}</span>
            <button type="button" className={`fn-vt-hold${hold ? ' is-on' : ''}`} aria-pressed={hold} onClick={toggleHold}>
              <i className={hold ? 'ri-lock-fill' : 'ri-lock-unlock-line'} aria-hidden="true"></i>
              {hold ? 'Legal hold on #41723 — deletion paused' : 'Place legal hold on #41723'}
            </button>
          </div>

          <div className="fn-vt-card fn-vt-prove">
            <div className="fn-vt-top"><span className="fn-vt-n">03</span><b>Prove</b></div>
            <ul className="fn-vt-log" aria-live="polite">
              {log.map((x, i) => (
                <li key={`${x.what}-${log.length - i}`}><b>{x.who}</b><span>{x.what}</span><em>{x.when}</em></li>
              ))}
            </ul>
            <button type="button" className="fn-vt-export" onClick={doExport}>
              <i className={exported ? 'ri-checkbox-circle-fill' : 'ri-download-2-line'} aria-hidden="true"></i>
              {exported ? 'audit-trail.zip ready' : 'Export audit trail'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
