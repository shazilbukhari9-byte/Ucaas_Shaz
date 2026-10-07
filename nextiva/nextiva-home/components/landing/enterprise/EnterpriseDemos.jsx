'use client';
/* Interactive sections for the Enterprise IT page:
   - AccessBuilder: pick an identity provider, then build an admin role by
     scope (site, queue, channel) and see exactly what that admin can do.
   - MigrationPlan: a 14-day Gantt; pick a day (or step through) and the
     today line, phase bars and the current phase's checklist follow. */
import { useState } from 'react';

/* ── Identity & access ────────────────────────────────────────────────── */
const IDPS = [
  { id: 'okta', label: 'Okta', proto: 'SAML 2.0' },
  { id: 'azure', label: 'Azure AD', proto: 'SAML 2.0' },
  { id: 'google', label: 'Google Workspace', proto: 'SAML 2.0' },
  { id: 'ping', label: 'Ping', proto: 'OIDC' },
  { id: 'onelogin', label: 'OneLogin', proto: 'SAML 2.0' },
  { id: 'duo', label: 'Duo', proto: 'OIDC' },
];
const ROLES = [
  { id: 'site', label: 'Site admin' },
  { id: 'queue', label: 'Queue manager' },
  { id: 'audit', label: 'Auditor (read-only)' },
];
const SITES = ['All sites', 'NYC', 'London', 'Singapore'];
const QUEUES = ['All queues', 'Billing', 'Support', 'Sales'];
const CHANNELS = ['Voice', 'SMS', 'Chat'];

export function AccessBuilder({ data }) {
  const [idp, setIdp] = useState('okta');
  const [role, setRole] = useState('site');
  const [site, setSite] = useState('London');
  const [queue, setQueue] = useState('All queues');
  const [chans, setChans] = useState(['Voice', 'SMS']);
  const p = IDPS.find((x) => x.id === idp);
  const toggleChan = (c) => setChans((cur) => (cur.includes(c) ? (cur.length > 1 ? cur.filter((x) => x !== c) : cur) : [...cur, c]));

  const can = {
    site: [`Add and remove users in ${site}`, `Edit hours, routing and numbers for ${site}`, `See ${chans.join(', ')} activity in ${site}`],
    queue: [`Manage agents in ${queue === 'All queues' ? 'every queue' : `the ${queue} queue`}`, 'Monitor, whisper and barge live calls', `Report on ${chans.join(', ')} for ${site}`],
    audit: [`Read audit logs for ${site}`, `Export ${chans.join(', ')} records`, 'Cannot change any setting'],
  }[role];
  const cannot = {
    site: ['Change billing or other sites', 'Edit SSO or SCIM settings'],
    queue: ['Add or remove users', 'Change site-wide routing'],
    audit: ['Listen to live calls', 'Modify users or routing'],
  }[role];

  return (
    <section className="lp-section en-ac-sec">
      <div className="lp-wrap">
        <div className="en-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="en-ac reveal reveal-delay-1">
          <div className="en-ac-col">
            <span className="en-ac-k"><b>1</b>Sign in with</span>
            <div className="en-idps" role="group" aria-label="Identity provider">
              {IDPS.map((x) => <button key={x.id} type="button" className={idp === x.id ? 'is-on' : ''} aria-pressed={idp === x.id} onClick={() => setIdp(x.id)}>{x.label}</button>)}
            </div>
            <div className="en-sso">
              <span><i className="ri-key-2-line" aria-hidden="true"></i>{p.label} · {p.proto}</span>
              <em>SCIM provisioning on · joiners and leavers sync automatically</em>
            </div>

            <span className="en-ac-k"><b>2</b>Build a role</span>
            <div className="en-roles" role="group" aria-label="Role">
              {ROLES.map((r) => <button key={r.id} type="button" className={role === r.id ? 'is-on' : ''} aria-pressed={role === r.id} onClick={() => setRole(r.id)}>{r.label}</button>)}
            </div>
            <div className="en-scope">
              <label><span>Site</span>
                <select value={site} onChange={(e) => setSite(e.target.value)}>{SITES.map((s) => <option key={s}>{s}</option>)}</select>
              </label>
              <label><span>Queue</span>
                <select value={queue} onChange={(e) => setQueue(e.target.value)}>{QUEUES.map((s) => <option key={s}>{s}</option>)}</select>
              </label>
              <div className="en-chans"><span>Channels</span>
                {CHANNELS.map((c) => <button key={c} type="button" className={chans.includes(c) ? 'is-on' : ''} aria-pressed={chans.includes(c)} onClick={() => toggleChan(c)}>{c}</button>)}
              </div>
            </div>
          </div>

          <div className="en-ac-out" aria-live="polite">
            <span className="en-ac-badge"><i className="ri-shield-user-line" aria-hidden="true"></i>{ROLES.find((r) => r.id === role).label}</span>
            <span className="en-ac-scope">{site} · {queue} · {chans.join(' / ')}</span>
            <span className="en-ac-h">Can</span>
            <ul className="en-can">{can.map((x) => <li key={x}><i className="ri-check-line" aria-hidden="true"></i>{x}</li>)}</ul>
            <span className="en-ac-h">Can’t</span>
            <ul className="en-cant">{cannot.map((x) => <li key={x}><i className="ri-close-line" aria-hidden="true"></i>{x}</li>)}</ul>
            <span className="en-ac-log"><i className="ri-file-list-3-line" aria-hidden="true"></i>Every change by this role is written to the audit log</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Migration plan: a 14-day Gantt with a "today" line ───────────────── */
const DAYS = 14;

export function MigrationPlan({ data }) {
  const [day, setDay] = useState(10);
  // Each phase runs from its start day to the day before the next phase.
  const phases = data.phases.map((p, i, all) => ({ ...p, end: i < all.length - 1 ? all[i + 1].day - 1 : DAYS }));
  const statusOf = (p) => (day > p.end || (p.end === DAYS && day === DAYS) ? 'done' : day >= p.day ? 'now' : 'next');
  const cur = phases.find((p) => day >= p.day && day <= p.end) || phases[phases.length - 1];
  const span = cur.end - cur.day + 1;
  const into = Math.min(span, day - cur.day + 1);
  const tasksDone = statusOf(cur) === 'done' ? cur.tasks.length : Math.round((into / span) * cur.tasks.length);
  const overall = Math.round((day / DAYS) * 100);
  const live = day === DAYS;

  return (
    <section className="lp-section lp-section--theme en-mg-sec">
      <div className="lp-wrap">
        <div className="en-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="en-plan reveal reveal-delay-1">
          <div className="en-plan-head">
            <div className="en-plan-name">
              <span className="en-plan-ic"><i className="ri-route-line" aria-hidden="true"></i></span>
              <span><b>Migration plan</b><em>14 days · cut over on your date</em></span>
            </div>
            <div className="en-plan-prog" aria-live="polite">
              <span className="en-plan-bar"><i style={{ width: `${overall}%` }}></i></span>
              <b>{live ? 'Live' : `${overall}%`}</b>
            </div>
            <div className="en-tam">
              <span className="en-tam-av">NA</span>
              <span><b>Nadia A.</b><em>Technical account manager</em></span>
            </div>
          </div>

          <div className="en-plan-body">
            <div className="en-gantt">
              <div className="en-g-row en-g-row--head">
                <span className="en-g-label">Phase</span>
                <div className="en-g-days" role="group" aria-label="Pick a day">
                  {Array.from({ length: DAYS }, (_, i) => i + 1).map((d) => (
                    <button key={d} type="button" className={`${d === day ? 'is-on' : ''}${d < day ? ' is-past' : ''}`} onClick={() => setDay(d)} aria-pressed={d === day} aria-label={`Day ${d}`}>{d}</button>
                  ))}
                </div>
              </div>

              <div className="en-g-rows">
                <span className="en-g-today" style={{ '--t': (day - 0.5) / DAYS }} aria-hidden="true"><em>Day {day}</em></span>
                {phases.map((p) => {
                  const st = statusOf(p);
                  const fill = st === 'done' ? 100 : st === 'now' ? Math.round(((day - p.day + 1) / (p.end - p.day + 1)) * 100) : 0;
                  return (
                    <div key={p.day} className={`en-g-row en-g-row--${st}`}>
                      <span className="en-g-label">
                        <i className={st === 'done' ? 'ri-checkbox-circle-fill' : st === 'now' ? 'ri-loader-4-line' : 'ri-time-line'} aria-hidden="true"></i>
                        <span><b>{p.title}</b><em>{p.day === p.end ? `Day ${p.day}` : `Days ${p.day}–${p.end}`}</em></span>
                      </span>
                      <div className="en-g-track">
                        <button
                          type="button"
                          className="en-g-bar"
                          style={{ left: `${((p.day - 1) / DAYS) * 100}%`, width: `${((p.end - p.day + 1) / DAYS) * 100}%` }}
                          onClick={() => setDay(p.day)}
                          aria-label={`${p.title}, ${st}`}
                        >
                          <i style={{ width: `${fill}%` }}></i>
                          <span>{st === 'done' ? 'Done' : st === 'now' ? `${fill}%` : 'Planned'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="en-g-ctrl">
                <button type="button" onClick={() => setDay((d) => Math.max(1, d - 1))} disabled={day === 1}><i className="ri-arrow-left-s-line" aria-hidden="true"></i>Previous day</button>
                <button type="button" onClick={() => setDay((d) => Math.min(DAYS, d + 1))} disabled={day === DAYS}>Next day<i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
              </div>
            </div>

            <aside className="en-g-panel" key={`${cur.day}-${live}`} aria-live="polite">
              <span className="en-g-phase">{live ? 'Live' : `Now · ${cur.title}`}</span>
              <b className="en-g-day">Day {day} <em>of {DAYS}</em></b>
              <p className="en-g-text">{cur.text}</p>
              <span className="en-g-k">Checklist · {tasksDone}/{cur.tasks.length}</span>
              <ul className="en-g-tasks">
                {cur.tasks.map((t, i) => (
                  <li key={t} className={i < tasksDone ? 'is-done' : ''}>
                    <i className={i < tasksDone ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'} aria-hidden="true"></i>{t}
                  </li>
                ))}
              </ul>
              <p className="en-g-note">
                <i className="ri-chat-quote-line" aria-hidden="true"></i>
                {live ? 'You’re live — the old system is retired and I’m on hand for the first 30 days.' : 'Nothing is switched off until your team says go.'}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
