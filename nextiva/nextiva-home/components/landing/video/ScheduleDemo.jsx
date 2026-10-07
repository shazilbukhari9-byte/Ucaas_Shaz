'use client';
/* Scheduling section — the invite flow. Pick a calendar (real Google,
   Outlook and Apple Calendar marks); a week view shows the event, and the
   event card beside it plays the steps: details → "Add video meeting" →
   meeting link → US dial-in → invite sent. Steps every STEP_MS, the
   calendar changes each loop; clicking a calendar restarts there. Pauses
   only while the visitor is actively using it (useIntentPause). The
   secure-by-default points sit in a strip underneath. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

// Real brand marks for the three calendars — Google's four-colour "G", the
// current Outlook mark and Apple Calendar's app icon — on a small white tile.
const LOGOS = {
  google: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  ),
  // Current multi-colour Outlook mark (thesvg.org, MIT), served as a file.
  outlook: <img src="/media/logos/microsoft-outlook.svg" alt="" width="14" height="14" />,
  // Apple Calendar's app icon (Wikimedia Commons, public domain).
  ical: <img src="/media/logos/apple-calendar.svg" alt="" width="20" height="20" />,
};

const CALS = [
  { id: 'google', label: 'Google' },
  { id: 'outlook', label: 'Outlook' },
  { id: 'ical', label: 'iCal' },
];
const GUESTS = ['Tara W.', 'Daniel O.', 'priya@client.co'];

const STEP_MS = 2400;
const DAYS = [['Mon', 5], ['Tue', 6], ['Wed', 7], ['Thu', 8], ['Fri', 9]];
const HOURS = ['9 am', '10 am', '11 am', '12 pm'];
// Other (static) events on the week, [day index, start hour offset, length, title].
const OTHER = [[0, 0, 1, 'Team stand-up'], [1, 1.5, 1, 'Design review'], [2, 0.5, 1.5, 'Q3 planning'], [4, 1, 1, 'Pipeline call']];
const SECURE_IC = ['ri-lock-2-line', 'ri-hard-drive-2-line', 'ri-door-lock-line', 'ri-time-line'];

export default function ScheduleDemo({ data }) {
  const [cal, setCal] = useState(0);
  const [step, setStep] = useState(0); // 0 details · 1 adding · 2 link · 3 dial-in · 4 sent
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => { if (still) setStep(4); }, [still]);
  useEffect(() => {
    if (paused || still) return undefined;
    const t = setTimeout(() => {
      if (step < 4) setStep(step + 1);
      else { setStep(0); setCal((c) => (c + 1) % CALS.length); }
    }, step === 4 ? STEP_MS + 800 : STEP_MS);
    return () => clearTimeout(t);
  }, [step, paused, still]);

  const c = CALS[cal];
  const pick = (i) => { setCal(i); setStep(0); };

  return (
    <section className="lp-section lp-section--theme vsc-sec">
      <div className="lp-wrap">
        <div className="vsc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="vsc reveal" {...bind}>
          <div className="vsc-top">
            <div className="vsc-cals" role="group" aria-label="Calendar">
              {CALS.map((x, i) => (
                <button key={x.id} type="button" className={cal === i ? 'is-on' : undefined} aria-pressed={cal === i} onClick={() => pick(i)}>
                  <span className={`vm-cal-ic vm-cal-ic--${x.id}`} aria-hidden="true">{LOGOS[x.id]}</span>{x.label}
                </button>
              ))}
            </div>
            <span className="vsc-week">October 5 – 9</span>
          </div>

          <div className="vsc-body">
            {/* Week view */}
            <div className="vsc-cal" aria-hidden="true">
              <div className="vsc-days"><span></span>{DAYS.map(([d, n]) => <span key={d} className={d === 'Thu' ? 'is-today' : undefined}><em>{d}</em><b>{n}</b></span>)}</div>
              <div className="vsc-grid">
                <div className="vsc-hours">{HOURS.map((h) => <span key={h}>{h}</span>)}</div>
                {DAYS.map(([d], di) => (
                  <div className="vsc-col" key={d}>
                    {OTHER.filter((o) => o[0] === di).map(([, at, len, t]) => (
                      <span className="vsc-ev" key={t} style={{ '--at': at, '--len': len }}>{t}</span>
                    ))}
                    {d === 'Thu' && (
                      <span className={`vsc-ev vsc-ev--main${step >= 2 ? ' has-meet' : ''}`} style={{ '--at': 1, '--len': 0.5 }}>
                        <b>Proposal walkthrough</b>
                        {step >= 2 && <em><i className="ri-vidicon-fill"></i>Video</em>}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Event card */}
            <div className="vsc-card" aria-hidden="true">
              <span className="vsc-src"><span className={`vm-cal-ic vm-cal-ic--${c.id}`}>{LOGOS[c.id]}</span>New event · {c.label} Calendar</span>
              <b className="vsc-title">Proposal walkthrough</b>
              <span className="vsc-row"><i className="ri-time-line"></i>Thu, Oct 8 · 10:00 – 10:30</span>
              <span className="vsc-row vsc-guests"><i className="ri-user-line"></i>{GUESTS.map((g) => <em key={g}>{g}</em>)}</span>
              <div className="vsc-meet">
                {step < 2 ? (
                  <span className={`vsc-add${step === 1 ? ' is-press' : ''}`}><i className={step === 1 ? 'ri-loader-4-line vsc-spin' : 'ri-add-line'}></i>{step === 1 ? 'Adding video meeting…' : 'Add video meeting'}</span>
                ) : (
                  <div className="vsc-meetbox" key="meet">
                    <span className="vsc-meet-top"><i className="ri-vidicon-fill"></i>Video meeting added</span>
                    <span className="vsc-link"><i className="ri-link"></i>ucaas.app/m/proposal-4821</span>
                    {step >= 3 && <span className="vsc-dial" key="dial"><i className="ri-phone-line"></i>Dial-in (US) +1 (312) 555-0147 · PIN 482 913</span>}
                  </div>
                )}
              </div>
              <span className={`vsc-sent${step >= 4 ? ' is-on' : ''}`}><i className="ri-mail-send-line"></i>{step >= 4 ? 'Invite sent to 3 guests' : 'Send invite'}</span>
            </div>
          </div>

          <div className="vsc-secure">
            <span className="vsc-secure-h"><span className="vsc-lock"><i className="ri-shield-keyhole-line"></i></span><span><b>{data.security.title}</b><em>{data.security.text}</em></span></span>
            <ul>
              {data.security.points.map((p, i) => <li key={p}><i className={SECURE_IC[i] || 'ri-shield-check-line'} aria-hidden="true"></i>{p}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
