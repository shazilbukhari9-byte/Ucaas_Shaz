'use client';
/* Hours & holidays section: a week calendar for one site with a time
   scrubber. Pick a day (or a holiday) and drag the time — the panel shows
   whether the line is open and exactly what route a caller gets. */
import { useState } from 'react';

const WEEK = [
  { id: 'mon', label: 'Mon', open: [8, 18] },
  { id: 'tue', label: 'Tue', open: [8, 18] },
  { id: 'wed', label: 'Wed', open: [8, 18] },
  { id: 'thu', label: 'Thu', open: [8, 18] },
  { id: 'fri', label: 'Fri', open: [8, 18] },
  { id: 'sat', label: 'Sat', open: [9, 13] },
  { id: 'sun', label: 'Sun', open: null },
];
const HOLIDAYS = ['Jan 1 · New Year’s Day', 'Jul 4 · Independence Day', 'Nov 26 · Thanksgiving', 'Dec 25 · Christmas Day'];

const fmt = (h) => {
  const hh = Math.floor(h);
  const mm = h % 1 ? '30' : '00';
  return `${String(hh).padStart(2, '0')}:${mm}`;
};

function routeFor(day, t) {
  if (day === 'holiday') {
    return {
      status: 'holiday', label: 'Closed · holiday',
      greeting: 'Thanks for calling Northside — we’re closed today for the holiday and back tomorrow at 8.',
      route: ['Holiday greeting', 'Voicemail or AI assistant', 'Message emailed to the team'],
    };
  }
  const d = WEEK.find((x) => x.id === day);
  const isOpen = d.open && t >= d.open[0] && t < d.open[1];
  if (isOpen) {
    const lunch = t >= 12 && t < 13 && day !== 'sat';
    return {
      status: 'open', label: lunch ? 'Open · lunch cover' : 'Open',
      greeting: 'Hi, you’ve reached Northside. For appointments press 1, sales 2, support 3, or 0 for reception.',
      route: ['Main menu', lunch ? 'Reduced team · callback offered' : 'Teams ring by skill', 'Overflow to AI after 45s'],
    };
  }
  const next = d.open && t < d.open[0] ? `today at ${fmt(d.open[0])}` : 'on the next working day';
  return {
    status: 'closed', label: 'Closed · after hours',
    greeting: `Thanks for calling Northside — we’re closed right now and open again ${next}.`,
    route: ['After-hours greeting', 'Voicemail or AI assistant', 'Urgent calls → on-call phone'],
  };
}

export default function HoursDemo({ data }) {
  const [day, setDay] = useState('tue');
  const [t, setT] = useState(10.5);
  const r = routeFor(day, t);
  const pct = (h) => `${(h / 24) * 100}%`;

  return (
    <section className="lp-section aa-hours-sec">
      <div className="lp-wrap">
        <div className="aa-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="aa-hours reveal reveal-delay-1">
          <div className="aa-cal">
            <div className="aa-cal-head">
              <span><i className="ri-map-pin-2-line" aria-hidden="true"></i>Northside · New York (ET)</span>
              <span className="aa-cal-scale" aria-hidden="true"><em>00</em><em>06</em><em>12</em><em>18</em><em>24</em></span>
            </div>
            <ul className="aa-cal-rows">
              {WEEK.map((d) => (
                <li key={d.id}>
                  <button type="button" className={`aa-cal-row${day === d.id ? ' is-on' : ''}`} onClick={() => setDay(d.id)} aria-pressed={day === d.id}>
                    <span className="aa-cal-day">{d.label}</span>
                    <span className="aa-cal-bar">
                      {d.open
                        ? <i className="aa-cal-open" style={{ left: pct(d.open[0]), width: pct(d.open[1] - d.open[0]) }}></i>
                        : <em className="aa-cal-closed">Closed</em>}
                      {day === d.id && <b className="aa-cal-mark" style={{ left: pct(t) }}></b>}
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button type="button" className={`aa-cal-row aa-cal-row--hol${day === 'holiday' ? ' is-on' : ''}`} onClick={() => setDay('holiday')} aria-pressed={day === 'holiday'}>
                  <span className="aa-cal-day">Holiday</span>
                  <span className="aa-cal-bar"><em className="aa-cal-closed">Closed all day</em>
                    {day === 'holiday' && <b className="aa-cal-mark" style={{ left: pct(t) }}></b>}
                  </span>
                </button>
              </li>
            </ul>
            <label className="aa-cal-time">
              <span>Time of call <b>{fmt(t)}</b></span>
              <input type="range" min="0" max="23.5" step="0.5" value={t} onChange={(e) => setT(Number(e.target.value))} aria-label="Time of call" />
            </label>
            <div className="aa-cal-hols">
              <span>Holiday list · US</span>
              {HOLIDAYS.map((h) => (
                <button key={h} type="button" onClick={() => setDay('holiday')}>{h}</button>
              ))}
            </div>
          </div>

          <div className={`aa-out aa-out--${r.status}`} aria-live="polite">
            <span className="aa-out-status"><i aria-hidden="true"></i>{r.label}</span>
            <span className="aa-out-when">{day === 'holiday' ? 'Holiday' : WEEK.find((d) => d.id === day).label} · {fmt(t)}</span>
            <p className="aa-out-greet"><i className="ri-volume-up-line" aria-hidden="true"></i>{r.greeting}</p>
            <ol className="aa-out-route">
              {r.route.map((x, i) => (
                <li key={x}><span>{i + 1}</span>{x}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
