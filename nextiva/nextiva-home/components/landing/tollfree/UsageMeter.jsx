'use client';
/* Inbound minutes section: copy on the left; on the right an allowance
   gauge you can drive with the slider. Alerts light up at 80/90/100% and
   anything past the allowance shows as overflow. The allowance figure is
   an example, not a plan quote. */
import { useState } from 'react';

const ALLOWANCE = 5000;
const ALERTS = [80, 90, 100];
const R = 64;
const C = Math.round(2 * Math.PI * R * 100) / 100;

export default function UsageMeter({ data }) {
  const [used, setUsed] = useState(3200);
  const pct = Math.round((used / ALLOWANCE) * 100);
  const shown = Math.min(pct, 100);
  const over = Math.max(0, used - ALLOWANCE);
  const tone = pct >= 100 ? 'over' : pct >= 80 ? 'warn' : 'ok';
  const dash = Math.round((shown / 100) * C * 100) / 100;

  return (
    <section className="lp-section tf-use-sec">
      <div className="lp-wrap tf-use">
        <div className="tf-use-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="tf-use-points">
            {data.points.map((p) => <li key={p}><i className="ri-check-line" aria-hidden="true"></i>{p}</li>)}
          </ul>
        </div>

        {/* The reveal class lives on a wrapper: the tone class below changes
            while dragging, and rewriting className would drop the class the
            reveal observer added (the card would fade out). */}
        <div className="reveal reveal-delay-1">
        <div className={`tf-meter tf-meter--${tone}`}>
          <div className="tf-meter-head">
            <span><i className="ri-phone-line" aria-hidden="true"></i>Inbound toll-free · this month</span>
            <em>Example allowance</em>
          </div>

          <div className="tf-meter-body">
            <div className="tf-ring">
              <svg viewBox="0 0 160 160" aria-hidden="true">
                <circle cx="80" cy="80" r={R} className="tf-ring-track" />
                {ALERTS.map((a) => {
                  const ang = (a / 100) * 360 - 90;
                  const rad = (ang * Math.PI) / 180;
                  const x = Math.round((80 + Math.cos(rad) * R) * 100) / 100;
                  const y = Math.round((80 + Math.sin(rad) * R) * 100) / 100;
                  return <circle key={a} cx={x} cy={y} r="3" className={`tf-ring-tick${pct >= a ? ' is-hit' : ''}`} />;
                })}
                <circle cx="80" cy="80" r={R} className="tf-ring-fill" strokeDasharray={`${dash} ${C}`} transform="rotate(-90 80 80)" />
              </svg>
              <div className="tf-ring-mid">
                <b>{pct}%</b>
                <span>{used.toLocaleString('en-US')} / {ALLOWANCE.toLocaleString('en-US')} min</span>
              </div>
            </div>

            <div className="tf-meter-side">
              <ul className="tf-alerts">
                {ALERTS.map((a) => (
                  <li key={a} className={pct >= a ? 'is-hit' : ''}>
                    <i className={pct >= a ? 'ri-notification-3-fill' : 'ri-notification-3-line'} aria-hidden="true"></i>
                    <span>{a}% alert</span>
                    <em>{pct >= a ? 'Sent' : 'Waiting'}</em>
                  </li>
                ))}
              </ul>
              <div className="tf-over">
                <span>Overflow</span>
                <b>{over ? `${over.toLocaleString('en-US')} min` : 'None yet'}</b>
                <em>{over ? 'Billed at the published per-minute rate' : 'You’re inside your allowance'}</em>
              </div>
            </div>
          </div>

          <label className="tf-meter-slider">
            <span>Drag to simulate the month</span>
            <input type="range" min="0" max="6500" step="50" value={used} onChange={(e) => setUsed(Number(e.target.value))} aria-label="Minutes used this month" />
          </label>
        </div>
        </div>
      </div>
    </section>
  );
}
