'use client';
/* Interactive sections for the SMB Owner-Operators page:
   - MissedCalls: your own numbers in, a monthly estimate out — what calls
     that go unanswered could be worth. Nothing is assumed beyond your inputs.
   - IntakeBuilder: edit the questions the AI asks and pick the CRM; the
     preview call and the CRM record update as you type. */
import { useState } from 'react';

/* ── The cost of voicemail ────────────────────────────────────────────── */
const fmt = (n) => `$${Math.round(n).toLocaleString('en-US')}`;

export function MissedCalls({ data }) {
  const [missed, setMissed] = useState(8);
  const [value, setValue] = useState(150);
  const [rate, setRate] = useState(40);
  const monthly = missed * 4.33 * value * (rate / 100);
  const jobs = Math.round(missed * 4.33 * (rate / 100));

  return (
    <section className="lp-section sb-mc-sec">
      <div className="lp-wrap sb-mc">
        <div className="sb-mc-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="sb-calc reveal reveal-delay-1">
          <label className="sb-calc-row">
            <span>Calls you miss a week<b>{missed}</b></span>
            <input type="range" min="1" max="40" step="1" value={missed} onChange={(e) => setMissed(Number(e.target.value))} />
          </label>
          <label className="sb-calc-row">
            <span>Average value of a job or visit<b>{fmt(value)}</b></span>
            <input type="range" min="20" max="1000" step="10" value={value} onChange={(e) => setValue(Number(e.target.value))} />
          </label>
          <label className="sb-calc-row">
            <span>Callers who would have booked<b>{rate}%</b></span>
            <input type="range" min="5" max="90" step="5" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </label>
          <div className="sb-calc-out" aria-live="polite">
            <span>Could be walking away each month</span>
            <b>{fmt(monthly)}</b>
            <em>About {jobs} bookings a month — every one of them answered by the AI instead.</em>
          </div>
          <span className="sb-calc-note">Estimate from your inputs only (4.33 weeks a month).</span>
        </div>
      </div>
    </section>
  );
}

/* ── Intake builder ───────────────────────────────────────────────────── */
const START = ['What’s your name?', 'What’s the reason for your visit?', 'Best number to text you?', 'When works for you?'];
const ANSWERS = ['Lauren Ortiz', 'A cleaning, please', '(415) 555-0142', 'Saturday morning'];
const CRMS = [['hubspot', 'HubSpot'], ['zoho', 'Zoho'], ['pipedrive', 'Pipedrive']];
const VOICES = [['warm', 'Warm'], ['bright', 'Bright'], ['calm', 'Calm']];

export function IntakeBuilder({ data }) {
  const [qs, setQs] = useState(START);
  const [crm, setCrm] = useState('pipedrive');
  const [voice, setVoice] = useState('warm');
  const edit = (i, v) => setQs((cur) => cur.map((q, k) => (k === i ? v.slice(0, 60) : q)));
  const crmName = CRMS.find((c) => c[0] === crm)[1];

  return (
    <section className="lp-section lp-section--theme sb-in-sec">
      <div className="lp-wrap">
        <div className="sb-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="sb-in reveal reveal-delay-1">
          <div className="sb-in-edit">
            <span className="sb-in-k">Your intake questions</span>
            {qs.map((q, i) => (
              <label key={i} className="sb-in-q">
                <b>{i + 1}</b>
                <input value={q} onChange={(e) => edit(i, e.target.value)} aria-label={`Question ${i + 1}`} />
              </label>
            ))}
            <span className="sb-in-k">Voice</span>
            <div className="sb-in-pills" role="group" aria-label="Voice">
              {VOICES.map(([k, l]) => <button key={k} type="button" className={voice === k ? 'is-on' : ''} aria-pressed={voice === k} onClick={() => setVoice(k)}>{l}</button>)}
            </div>
            <span className="sb-in-k">Syncs to</span>
            <div className="sb-in-pills" role="group" aria-label="CRM">
              {CRMS.map(([k, l]) => <button key={k} type="button" className={crm === k ? 'is-on' : ''} aria-pressed={crm === k} onClick={() => setCrm(k)}>{l}</button>)}
            </div>
            <button type="button" className="sb-in-reset" onClick={() => setQs(START)}><i className="ri-restart-line" aria-hidden="true"></i>Reset questions</button>
          </div>

          <div className="sb-in-preview">
            <div className="sb-in-call">
              <span className="sb-in-call-k"><i className="ri-mic-ai-line" aria-hidden="true"></i>Preview call · {VOICES.find((v) => v[0] === voice)[1]} voice</span>
              <p className="sb-bub sb-bub--ai">Thanks for calling Maple &amp; Co.! I can help you book.</p>
              {qs.map((q, i) => (
                <div key={i} className="sb-in-pair">
                  <p className="sb-bub sb-bub--ai">{q || '…'}</p>
                  <p className="sb-bub sb-bub--you">{ANSWERS[i]}</p>
                </div>
              ))}
              <p className="sb-bub sb-bub--ai">You’re booked for Saturday at 11:00 — I’ve texted you the details.</p>
            </div>
            <div className="sb-in-crm">
              <span className="sb-in-crm-k"><i className="ri-contacts-book-3-line" aria-hidden="true"></i>New record in {crmName}</span>
              <dl>
                {qs.map((q, i) => <div key={i}><dt>{q || `Question ${i + 1}`}</dt><dd>{ANSWERS[i]}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
