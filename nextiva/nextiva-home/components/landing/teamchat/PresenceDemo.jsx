'use client';
/* Presence section — "a day in your status". One panel: your status card
   (what set it, what happens to notifications, when it ends), what a
   teammate sees when they try to reach you, and a ribbon of the working
   day underneath with a "now" marker. The day steps on by itself every
   STEP_MS; clicking a block on the ribbon jumps there. Pauses only while
   the visitor is actively using it (useIntentPause). Fixed heights, so
   nothing moves the page. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

const STEP_MS = 3000;
const DAY_START = 9;
const DAY_END = 18;

// The day, block by block. from/to in hours (24h).
const DAY = [
  { from: 9, to: 10.5, id: 'active', label: 'Active', icon: 'ri-checkbox-blank-circle-fill', by: 'Desktop app', byIc: 'ri-computer-line', notify: 'All notifications', until: '10:30 am', see: 'Aisha is active — she usually replies in a few minutes.', send: 'Send' },
  { from: 10.5, to: 11.5, id: 'meeting', label: 'In a meeting', icon: 'ri-calendar-event-fill', by: '“Acme QBR” on your calendar', byIc: 'ri-calendar-line', notify: 'Paused until 11:30', until: '11:30 am', see: 'Aisha is in a meeting until 11:30. Your message will reach her then.', send: 'Send for later' },
  { from: 11.5, to: 12.5, id: 'call', label: 'On a call', icon: 'ri-phone-fill', by: 'A call connected', byIc: 'ri-phone-line', notify: 'Mentions only', until: 'when the call ends', see: 'Aisha is on a call. Chat is fine — she’ll see mentions.', send: 'Send' },
  { from: 12.5, to: 14, id: 'active', label: 'Active', icon: 'ri-checkbox-blank-circle-fill', by: 'Back at your desk', byIc: 'ri-computer-line', notify: 'All notifications', until: '2:00 pm', see: 'Aisha is active — she usually replies in a few minutes.', send: 'Send' },
  { from: 14, to: 16, id: 'focus', label: 'Focused', icon: 'ri-focus-3-fill', by: 'Focus block, 2–4 pm', byIc: 'ri-timer-line', notify: 'Urgent only', until: '4:00 pm', see: 'Aisha is focusing until 4:00. Mark it urgent only if it can’t wait.', send: 'Send quietly' },
  { from: 16, to: 18, id: 'active', label: 'Active', icon: 'ri-checkbox-blank-circle-fill', by: 'Desktop app', byIc: 'ri-computer-line', notify: 'All notifications', until: '6:00 pm', see: 'Aisha is active — she usually replies in a few minutes.', send: 'Send' },
];

const clock = (h) => {
  const hr = Math.floor(h);
  const m = Math.round((h - hr) * 60);
  const h12 = ((hr + 11) % 12) + 1;
  return `${h12}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
};
const pct = (h) => ((h - DAY_START) / (DAY_END - DAY_START)) * 100;

export default function PresenceDemo({ data }) {
  const [sel, setSel] = useState(1);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);

  useEffect(() => {
    if (paused || still) return undefined;
    const t = setTimeout(() => setSel((s) => (s + 1) % DAY.length), STEP_MS);
    return () => clearTimeout(t);
  }, [sel, paused, still]);

  const s = DAY[sel];

  return (
    <section className="lp-section tc-pres-sec">
      <div className="lp-wrap">
        <div className="tcp-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        {/* data-status, not a class: React must not rewrite a .reveal element's className. */}
        <div className="tcp reveal" data-status={s.id} {...bind}>
          <div className="tcp-top">
            {/* Your status */}
            <div className="tcp-me" key={`me-${sel}`}>
              <span className="tcp-k">Your status</span>
              <div className="tcp-me-row">
                <span className="tcp-av">AK<i></i></span>
                <span className="tcp-me-t">
                  <b>Aisha Khan</b>
                  <span className="tcp-status"><i className={s.icon}></i>{s.label}</span>
                </span>
              </div>
              <dl className="tcp-facts">
                <div><dt>Set by</dt><dd><i className={s.byIc}></i>{s.by}</dd></div>
                <div><dt>Notifications</dt><dd><i className="ri-notification-3-line"></i>{s.notify}</dd></div>
                <div><dt>Until</dt><dd><i className="ri-time-line"></i>{s.until}</dd></div>
              </dl>
            </div>

            {/* What a teammate sees */}
            <div className="tcp-them">
              <span className="tcp-k">What your team sees</span>
              <div className="tcp-dm">
                <div className="tcp-dm-head">
                  <span className="tcp-av tcp-av--sm">AK<i></i></span>
                  <b>Aisha Khan</b>
                  <span className="tcp-status tcp-status--sm"><i className={s.icon}></i>{s.label}</span>
                </div>
                <div className="tcp-dm-body" key={`dm-${sel}`}>
                  <span className="tcp-hint"><i className="ri-information-line"></i>{s.see}</span>
                </div>
                <div className="tcp-dm-compose">
                  <span className="tcp-draft"><span className="tcp-av tcp-av--xs tcp-av--me">DR</span>Quick one about the Acme terms…</span>
                  <span className="tcp-send">{s.send}<i className="ri-send-plane-fill"></i></span>
                </div>
              </div>
            </div>
          </div>

          {/* The day */}
          <div className="tcp-day">
            <div className="tcp-day-head">
              <span className="tcp-k">Today</span>
              <span className="tcp-legend">
                <span><i className="is-active"></i>Active</span>
                <span><i className="is-meeting"></i>Meeting</span>
                <span><i className="is-call"></i>Call</span>
                <span><i className="is-focus"></i>Focus</span>
              </span>
            </div>
            <div className="tcp-ribbon">
              {DAY.map((b, i) => (
                <button
                  type="button"
                  key={b.from}
                  className={`tcp-block is-${b.id}${i === sel ? ' is-on' : ''}`}
                  style={{ flexGrow: b.to - b.from }}
                  onClick={() => setSel(i)}
                  aria-pressed={i === sel}
                  aria-label={`${clock(b.from)} to ${clock(b.to)}: ${b.label}`}
                >
                  <i className={b.icon} aria-hidden="true"></i>
                  <span>{b.label}</span>
                </button>
              ))}
              <span className="tcp-now" style={{ left: `${pct(s.from)}%` }} aria-hidden="true"><b>Now</b></span>
            </div>
            <div className="tcp-axis" aria-hidden="true">
              {[9, 11, 13, 15, 17].map((h) => <span key={h} style={{ left: `${pct(h)}%` }}>{clock(h)}{h < 12 ? ' am' : ' pm'}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
