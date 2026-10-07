'use client';
/* Working hero mockup for the Enterprise IT page: an admin control plane.
   Eight sites with live seat counts; onboard a hire or offboard a leaver
   (SCIM events), or simulate a point-of-presence outage — the site's
   traffic fails over to another region in under a second. Every action is
   written to the audit stream that goes to your SIEM. */
import { useEffect, useRef, useState } from 'react';

const SITES = [
  { id: 'NYC', seats: 2140 }, { id: 'SFO', seats: 880 }, { id: 'LON', seats: 1210 }, { id: 'BER', seats: 440 },
  { id: 'SIN', seats: 920 }, { id: 'TYO', seats: 560 }, { id: 'SYD', seats: 320 }, { id: 'GRU', seats: 190 },
];
const HIRES = [['lakshmi.iyer', 'LON'], ['carlos.silva', 'GRU'], ['mei.chen', 'SIN'], ['owen.park', 'SFO'], ['ana.ruiz', 'NYC']];
const LEAVERS = [['k.ohashi', 'TYO'], ['j.weber', 'BER'], ['t.ng', 'SYD']];
const BACKUP = { NYC: 'Ashburn', SFO: 'Dallas', LON: 'Frankfurt', BER: 'Frankfurt', SIN: 'Tokyo', TYO: 'Singapore', SYD: 'Singapore', GRU: 'Miami' };

const clock = (s) => {
  const t = 14 * 3600 + 2 * 60 + 11 + s;
  return `${String(Math.floor(t / 3600) % 24).padStart(2, '0')}:${String(Math.floor(t / 60) % 60).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
};

export default function EnterpriseMock({ page }) {
  const [seats, setSeats] = useState(() => Object.fromEntries(SITES.map((s) => [s.id, s.seats])));
  const [down, setDown] = useState(null); // { site, phase: 'down' | 'rerouted' }
  const [scim, setScim] = useState([
    { id: 0, user: 'lakshmi.iyer@', what: 'provisioned', site: 'LON' },
    { id: 1, user: 'k.ohashi@', what: 'deprovisioned', site: 'TYO' },
  ]);
  const [today, setToday] = useState(12);
  const [log, setLog] = useState([
    { id: 0, t: 0, text: 'auth.success role=admin site=NYC' },
    { id: 1, t: 3, text: 'call.start queue=billing site=LON' },
  ]);
  const [tick, setTick] = useState(4);
  const n = useRef({ hire: 1, leave: 1, id: 10 });
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const write = (text) => setLog((l) => [...l.slice(-3), { id: n.current.id++, t: tick, text }]);
  const addScim = (user, what, site) => setScim((s) => [{ id: n.current.id++, user: `${user}@`, what, site }, ...s].slice(0, 3));

  const onboard = () => {
    const [user, site] = HIRES[n.current.hire++ % HIRES.length];
    setSeats((s) => ({ ...s, [site]: s[site] + 1 }));
    setToday((x) => x + 1);
    addScim(user, 'provisioned', site);
    write(`scim.provision u=${user} site=${site} ok`);
  };
  const offboard = () => {
    const [user, site] = LEAVERS[n.current.leave++ % LEAVERS.length];
    setSeats((s) => ({ ...s, [site]: s[site] - 1 }));
    setToday((x) => x + 1);
    addScim(user, 'deprovisioned', site);
    write(`scim.deprovision u=${user} sessions=revoked ok`);
  };
  const outage = () => {
    if (down) return;
    const site = 'NYC';
    setDown({ site, phase: 'down' });
    write(`pop.health site=${site} status=degraded`);
    timers.current.push(setTimeout(() => {
      setDown({ site, phase: 'rerouted' });
      write(`failover ${site} → ${BACKUP[site]} 0.6s calls_dropped=0`);
    }, 650));
    timers.current.push(setTimeout(() => {
      setDown(null);
      write(`pop.health site=${site} status=ok failback=scheduled`);
    }, 4200));
  };
  const total = Object.values(seats).reduce((a, b) => a + b, 0);

  return (
    <div className="enm" role="region" aria-label="Interactive enterprise admin console">
      <div className="enm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="enm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Control plane
        </span>
        <span className="enm-seats">{total.toLocaleString('en-US')} seats · 8 sites</span>
      </div>

      <div className="enm-body">
        <ul className="enm-sites" aria-label="Sites">
          {SITES.map((s) => {
            const st = down && down.site === s.id ? down.phase : 'ok';
            return (
              <li key={s.id} className={`enm-site enm-site--${st}`}>
                <span className="enm-site-top"><i aria-hidden="true"></i><b>{s.id}</b></span>
                <em>{seats[s.id].toLocaleString('en-US')}</em>
                {st === 'rerouted' && <span className="enm-via">via {BACKUP[s.id]}</span>}
                {st === 'down' && <span className="enm-via">failing over…</span>}
              </li>
            );
          })}
        </ul>

        <div className="enm-scim">
          <span className="enm-k"><i className="ri-user-settings-line" aria-hidden="true"></i>SCIM · live <b>+{today} today</b></span>
          <ol aria-live="polite">
            {scim.map((e) => (
              <li key={e.id} className={`enm-ev enm-ev--${e.what}`}>
                <span>{e.user}</span><em>{e.what} · {e.site}</em>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="enm-actions" role="group" aria-label="Admin actions">
        <button type="button" onClick={onboard}><i className="ri-user-add-line" aria-hidden="true"></i>Onboard hire</button>
        <button type="button" onClick={offboard}><i className="ri-user-unfollow-line" aria-hidden="true"></i>Offboard leaver</button>
        <button type="button" className="enm-danger" onClick={outage} disabled={!!down}><i className="ri-flashlight-line" aria-hidden="true"></i>Simulate outage</button>
      </div>

      <ol className="enm-log" aria-live="polite">
        <span className="enm-log-k">Audit → SIEM · streaming</span>
        {log.map((e) => (
          <li key={e.id}><em>[{clock(e.t)}]</em>{e.text}</li>
        ))}
      </ol>
    </div>
  );
}
