'use client';
/* Interactive sections for the Logistics page:
   - CascadeDemo: set each tier's ring time and strategy (or switch it off);
     the scenarios play in turn, replaying the call on a timeline to show who
     answers and when. The AI is always the last step.
   - StormDemo: three points of presence carrying live calls; the storm drill
     plays itself, taking each region offline in turn while its calls move
     to the others.
   - RoadDemo: a load plays itself from pickup to delivery (pausing on hover)
     — texts to the driver and customer, an MMS proof-of-delivery photo and
     the TMS event at each stop; any stop can still be clicked. */
import { useEffect, useRef, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

// Shared autoplay: runs while the element is on screen, pauses only while
// the visitor is actually using it (see useIntentPause) and never runs for
// reduced motion. "started" stays true once it has played.
function useAutoplay() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [paused, pauseBind] = useIntentPause();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, started, playing: visible && !paused, bind: pauseBind };
}

/* ── Cascade builder ──────────────────────────────────────────────────── */
const STRATS = ['Longest-idle', 'Parallel', 'Skills-based'];
const BASE_TIERS = [
  { id: 'hq', name: 'HQ dispatcher', icon: 'ri-building-2-line', ring: 5, strat: 'Longest-idle', on: true },
  { id: 'depot', name: 'Depot hunt group', icon: 'ri-map-pin-2-line', ring: 8, strat: 'Parallel', on: true },
  { id: 'region', name: 'Regional pool', icon: 'ri-group-line', ring: 12, strat: 'Skills-based', on: true },
];
// Which tiers can pick up in each scenario.
const SCENARIOS = [
  { id: 'normal', label: 'Normal shift', free: ['hq', 'depot', 'region'] },
  { id: 'busy', label: 'HQ on another call', free: ['depot', 'region'] },
  { id: 'night', label: 'Night shift', free: ['region'] },
  { id: 'surge', label: 'Storm surge — all busy', free: [] },
];
const SCENARIO_MS = 3400; // autoplay: time on each scenario
const TL_MS = 1500; // timeline replay length
// A tier answers partway through its ring window; parallel ringing is fastest.
const pickup = (t) => Math.max(1, Math.round(t.ring * (t.strat === 'Parallel' ? 0.3 : t.strat === 'Skills-based' ? 0.5 : 0.4)));

export function CascadeDemo({ data }) {
  const [tiers, setTiers] = useState(BASE_TIERS);
  const [sc, setSc] = useState('normal');
  const auto = useAutoplay();
  const set = (id, patch) => setTiers((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const si = SCENARIOS.findIndex((x) => x.id === sc);
  const free = SCENARIOS[si].free;

  // Rotate through the scenarios on their own; picking one restarts the clock.
  useEffect(() => {
    if (!auto.playing) return undefined;
    const t = setTimeout(() => setSc(SCENARIOS[(si + 1) % SCENARIOS.length].id), SCENARIO_MS);
    return () => clearTimeout(t);
  }, [auto.playing, si]);

  // Walk the cascade: skip tiers that are off, ring the rest in order.
  let clock = 0;
  let answered = null;
  const segs = [];
  for (const t of tiers) {
    if (!t.on) continue;
    if (free.includes(t.id)) {
      const p = pickup(t);
      segs.push({ ...t, at: clock, dur: p, answered: true });
      clock += p;
      answered = t;
      break;
    }
    segs.push({ ...t, at: clock, dur: t.ring, answered: false });
    clock += t.ring;
  }
  if (!answered) segs.push({ id: 'ai', name: 'AI receptionist', icon: 'ri-robot-2-line', at: clock, dur: 1, answered: true });
  const total = clock + (answered ? 0 : 1);
  const worst = tiers.filter((t) => t.on).reduce((a, t) => a + t.ring, 0);
  // The timeline replays the call: each tier rings in turn, then the answer lands.
  const run = `${sc}-${tiers.map((t) => `${t.on ? 1 : 0}${t.ring}${t.strat}`).join('')}`;

  return (
    <section className="lp-section lg-cs-sec">
      <div className="lp-wrap">
        <div className="lg-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="lg-cs reveal reveal-delay-1">
          <div className="lg-cs-tiers">
            {tiers.map((t, i) => (
              <div key={t.id} className={`lg-tier${t.on ? '' : ' is-off'}${segs.some((g) => g.id === t.id && g.answered) ? ' is-ans' : ''}`}>
                <div className="lg-tier-top">
                  <span className="lg-tier-n">{i + 1}</span>
                  <span className="lg-tier-ic"><i className={t.icon} aria-hidden="true"></i></span>
                  <b>{t.name}</b>
                  <button type="button" className={`lg-sw${t.on ? ' is-on' : ''}`} role="switch" aria-checked={t.on} aria-label={`${t.name} on`} onClick={() => set(t.id, { on: !t.on })}><i aria-hidden="true"></i></button>
                </div>
                <div className="lg-tier-ctl">
                  <label className="lg-ring">
                    <span>Ring {t.ring}s</span>
                    <input type="range" min="3" max="20" value={t.ring} disabled={!t.on} onChange={(e) => set(t.id, { ring: Number(e.target.value) })} style={{ '--p': `${((t.ring - 3) / 17) * 100}%` }} aria-label={`${t.name} ring time`} />
                  </label>
                  <div className="lg-strats" role="group" aria-label={`${t.name} strategy`}>
                    {STRATS.map((s) => <button key={s} type="button" disabled={!t.on} className={t.strat === s ? 'is-on' : ''} aria-pressed={t.strat === s} onClick={() => set(t.id, { strat: s })}>{s}</button>)}
                  </div>
                </div>
              </div>
            ))}
            <div className={`lg-tier lg-tier--ai${answered ? '' : ' is-ans'}`}>
              <div className="lg-tier-top">
                <span className="lg-tier-n">4</span>
                <span className="lg-tier-ic"><i className="ri-robot-2-line" aria-hidden="true"></i></span>
                <b>AI receptionist</b>
                <span className="lg-lock"><i className="ri-lock-line" aria-hidden="true"></i>Always on</span>
              </div>
              <p className="lg-tier-note">Captures the issue, books a callback, texts the driver. The zero-voicemail rule.</p>
            </div>
          </div>

          <div className="lg-cs-out" ref={auto.ref} data-playing={auto.playing} style={{ '--scn': `${SCENARIO_MS}ms` }} {...auto.bind}>
            <span className="lg-cs-k">Testing against<em>{si + 1} / {SCENARIOS.length}</em></span>
            <div className="lg-scs" role="group" aria-label="Scenario">
              {SCENARIOS.map((x) => <button key={x.id} type="button" className={sc === x.id ? 'is-on' : ''} aria-pressed={sc === x.id} onClick={() => setSc(x.id)}>{x.label}{sc === x.id && <i key={run} aria-hidden="true"></i>}</button>)}
            </div>
            <div className="lg-tl" key={run} aria-hidden="true">
              {segs.map((g) => (
                <span key={g.id} className={`lg-tl-seg${g.answered ? ' is-ans' : ''}${g.id === 'ai' ? ' is-ai' : ''}`} style={{ flexGrow: g.dur, '--d': `${(g.at / total) * TL_MS}ms`, '--len': `${(g.dur / total) * TL_MS}ms` }}>
                  <i></i>
                  <em>{g.answered ? 'Answered' : `${g.dur}s`}</em>
                </span>
              ))}
            </div>
            <div className="lg-cs-res" key={`r-${run}`} style={{ '--d': `${TL_MS}ms` }} aria-live="polite">
              <span className={`lg-cs-who${answered ? '' : ' is-ai'}`}><i className={answered ? answered.icon : 'ri-robot-2-line'} aria-hidden="true"></i></span>
              <span className="lg-cs-txt">
                <b>{answered ? answered.name : 'AI receptionist'} picks up</b>
                <em>after {total}s{answered ? ` · ${answered.strat.toLowerCase()} ringing` : ' · every tier was busy'}</em>
              </span>
            </div>
            <ul className="lg-cs-facts">
              <li><i className="ri-time-line" aria-hidden="true"></i>Longest possible wait before the AI: <b>{worst}s</b></li>
              <li><i className="ri-voiceprint-line" aria-hidden="true"></i>Calls sent to voicemail: <b>0</b></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Storm drill ──────────────────────────────────────────────────────── */
const POPS = [
  { id: 'east', name: 'USA East', where: 'Reston, VA', calls: 34 },
  { id: 'central', name: 'USA Central', where: 'Dallas, TX', calls: 41 },
  { id: 'west', name: 'USA West', where: 'Hillsboro, OR', calls: 27 },
];
const BASE_CALLS = Object.fromEntries(POPS.map((p) => [p.id, p.calls]));
// The drill plays itself: each region goes down in turn, then comes back.
const DRILL = [
  { down: 'east', ms: 3000 }, { down: null, ms: 1600 },
  { down: 'central', ms: 3000 }, { down: null, ms: 1600 },
  { down: 'west', ms: 3000 }, { down: null, ms: 1600 },
];

export function StormDemo({ data }) {
  const [phase, setPhase] = useState(0);
  const [calls, setCalls] = useState(BASE_CALLS);
  const [log, setLog] = useState([]);
  const auto = useAutoplay();
  const timers = useRef([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clear(), []);
  const total = Object.values(calls).reduce((a, b) => a + b, 0);
  const down = auto.started ? DRILL[phase].down : null;
  const lastDown = DRILL[(phase - 1 + DRILL.length) % DRILL.length].down;

  // Run the current phase: move the downed region's calls a few at a time,
  // or put everything back. Then advance.
  useEffect(() => {
    if (!auto.playing) return undefined;
    clear();
    const id = DRILL[phase].down;
    if (id) {
      const moving = BASE_CALLS[id];
      const others = POPS.filter((p) => p.id !== id);
      setCalls(BASE_CALLS);
      setLog([{ k: 'bad', t: `Drill: ${POPS.find((p) => p.id === id).name} taken offline` }]);
      const steps = 6;
      for (let s = 1; s <= steps; s++) {
        timers.current.push(setTimeout(() => {
          const moved = Math.round((moving * s) / steps);
          const next = { ...BASE_CALLS, [id]: moving - moved };
          others.forEach((p, i) => { next[p.id] = BASE_CALLS[p.id] + Math.floor(moved / 2) + (i === 0 ? moved % 2 : 0); });
          setCalls(next);
        }, 160 * s));
      }
      timers.current.push(setTimeout(() => setLog((l) => [...l, { k: 'ok', t: `${moving} live calls moved to ${others.map((p) => p.name.replace('USA ', '')).join(' + ')}` }]), 160 * steps + 150));
      timers.current.push(setTimeout(() => setLog((l) => [...l, { k: 'ok', t: 'Calls dropped: 0 · dispatchers kept talking' }]), 160 * steps + 550));
    } else {
      setCalls(BASE_CALLS);
      setLog((l) => (l.length ? [...l, { k: 'ok', t: 'Region restored · traffic rebalanced' }] : l));
    }
    timers.current.push(setTimeout(() => setPhase((n) => (n + 1) % DRILL.length), DRILL[phase].ms));
    return () => clear();
  }, [auto.playing, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="lp-section lp-section--theme lg-st-sec">
      <div className="lp-wrap">
        <div className="lg-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="lg-st reveal reveal-delay-1" ref={auto.ref} data-playing={auto.playing} {...auto.bind}>
          <div className="lg-st-bar">
            <span className="lg-st-live"><i aria-hidden="true"></i><b>{total}</b> live calls</span>
            <div className="lg-st-stage" aria-live="polite">
              <span className="lg-st-state is-on">
                <i className={down ? 'ri-thunderstorms-line' : 'ri-restart-line'} aria-hidden="true"></i>
                {down ? `Storm drill · ${down === 'east' ? 'East' : down === 'central' ? 'Central' : 'West'} offline` : lastDown ? 'Restoring · rebalancing traffic' : 'Storm drill starting'}
              </span>
              <span className="lg-st-steps" aria-hidden="true">
                {POPS.map((p) => <i key={p.id} className={down === p.id ? 'is-cur' : ''} title={p.name}>{p.name.replace('USA ', '')}</i>)}
              </span>
            </div>
          </div>
          <div className="lg-pops">
            {POPS.map((p) => {
              const off = down === p.id;
              return (
                <div key={p.id} className={`lg-pop${off ? ' is-down' : down ? ' is-taking' : ''}`}>
                  <span className="lg-pop-top"><i className={off ? 'ri-close-circle-fill' : 'ri-checkbox-circle-fill'} aria-hidden="true"></i>{p.name}<em>{off ? 'Offline' : 'Active'}</em></span>
                  <span className="lg-pop-where">{p.where}</span>
                  <b className="lg-pop-n">{calls[p.id]}</b>
                  <span className="lg-pop-k">live calls</span>
                  <span className="lg-pop-dots" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} className={i < Math.round(calls[p.id] / 6) ? 'is-on' : ''}></i>)}</span>
                </div>
              );
            })}
          </div>
          <ul className="lg-st-log" aria-live="polite">
            {log.map((x, i) => <li key={`${phase}-${i}`} className={`is-${x.k}`}><i className={x.k === 'ok' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'} aria-hidden="true"></i>{x.t}</li>)}
            {!log.length && <li className="lg-st-empty">The drill starts when this section is on screen.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── On the road ──────────────────────────────────────────────────────── */
const TMS = ['Samsara', 'Motive', 'McLeod'];
const STOPS = [
  { id: 'pick', label: 'Picked up', icon: 'ri-inbox-archive-line', msg: { from: 'Dispatch', to: 'Customer', text: 'Load #8812 picked up in Memphis. ETA Thursday 2–4 pm.' }, ev: 'load.picked_up' },
  { id: 'move', label: 'In transit', icon: 'ri-truck-line', msg: { from: 'Dispatch', to: 'Driver', text: 'Fuel stop approved at Little Rock. Dock door 14 at destination.' }, ev: 'load.location_updated' },
  { id: 'late', label: 'Exception', icon: 'ri-alarm-warning-line', msg: { from: 'Dispatch', to: 'Customer', text: 'Weather delay on I-30. New ETA Thursday 5–6 pm. Reply 1 to confirm.' }, ev: 'load.eta_changed', bad: true },
  { id: 'done', label: 'Delivered', icon: 'ri-checkbox-circle-line', msg: { from: 'Driver', to: 'Dispatch', text: 'Delivered, signed by M. Ortiz.', photo: true }, ev: 'load.delivered' },
];

const STOP_MS = 2800; // autoplay: time at each stop
const TYPING_MS = 700; // "typing…" bubble before each new text

export function RoadDemo({ data }) {
  const [step, setStep] = useState(1);
  const [tms, setTms] = useState('Samsara');
  const [typing, setTyping] = useState(false);
  const auto = useAutoplay();
  const { playing } = auto;
  const shown = STOPS.slice(0, typing ? step - 1 : step);
  const cur = STOPS[step - 1];
  // Each stop: a short typing bubble, then the text; then on to the next stop.
  // After delivery it holds a beat longer and starts a new load.
  useEffect(() => {
    if (!playing) { setTyping(false); return undefined; }
    setTyping(true);
    const a = setTimeout(() => setTyping(false), TYPING_MS);
    const b = setTimeout(() => setStep((n) => (n >= STOPS.length ? 1 : n + 1)), step >= STOPS.length ? STOP_MS + 1200 : STOP_MS);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [playing, step]);

  return (
    <section className="lp-section lg-rd-sec">
      <div className="lp-wrap">
        <div className="lg-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div
          ref={auto.ref}
          className="lg-rd reveal reveal-delay-1"
          data-playing={playing}
          style={{ '--stop': `${step >= STOPS.length ? STOP_MS + 1200 : STOP_MS}ms` }}
          {...auto.bind}
        >
          <div className="lg-rd-main">
            <div className="lg-route" style={{ '--p': `${((step - 1) / (STOPS.length - 1)) * 100}%` }}>
              <span className="lg-route-line" aria-hidden="true"><i></i></span>
              <span className="lg-route-truck" aria-hidden="true"><i className="ri-truck-fill"></i></span>
              {STOPS.map((s, i) => (
                <button key={s.id} type="button" className={`lg-stop${i < step ? ' is-done' : ''}${i === step - 1 ? ' is-cur' : ''}${s.bad ? ' is-bad' : ''}`} onClick={() => setStep(i + 1)} aria-pressed={i === step - 1}>
                  <span className="lg-stop-dot"><i className={s.icon} aria-hidden="true"></i></span>
                  <b>{s.label}</b>
                </button>
              ))}
            </div>

            <div className="lg-sync" key={cur.id}>
              <span className="lg-sync-k"><i className="ri-plug-line" aria-hidden="true"></i>Synced to</span>
              <div className="lg-tms" role="group" aria-label="TMS">
                {TMS.map((x) => <button key={x} type="button" className={tms === x ? 'is-on' : ''} aria-pressed={tms === x} onClick={() => setTms(x)}>{x}</button>)}
              </div>
              <code className="lg-sync-ev"><span>POST</span> webhook → {tms} · <b>{cur.ev}</b> · load #8812</code>
            </div>

            <div className="lg-rd-foot">
              <span className="lg-rd-state is-on">
                <i className="ri-truck-line" aria-hidden="true"></i>
                Load #8812 · {cur.label.toLowerCase()}
              </span>
              <span className="lg-rd-prog" aria-hidden="true">
                {STOPS.map((x, i) => <i key={x.id} className={i < step - 1 ? 'is-done' : i === step - 1 ? 'is-cur' : ''}></i>)}
              </span>
            </div>
          </div>

          <div className="lg-phone" aria-live="polite">
            <span className="lg-phone-notch" aria-hidden="true"></span>
            <div className="lg-phone-top"><b>Memphis depot</b><em>(901) 555-0170</em></div>
            <div className="lg-phone-thread">
              {shown.map((s) => (
                <div key={s.id} className={`lg-msg${s.msg.from === 'Driver' ? ' lg-msg--in' : ''}${s.bad ? ' is-bad' : ''}`}>
                  <span className="lg-msg-k">{s.msg.from} → {s.msg.to}</span>
                  {s.msg.photo && <span className="lg-pod" aria-label="Proof-of-delivery photo"><i className="ri-box-3-line" aria-hidden="true"></i><em>POD · 14:52</em></span>}
                  <p>{s.msg.text}</p>
                </div>
              ))}
              {typing && (
                <div className={`lg-msg lg-msg--typing${cur.msg.from === 'Driver' ? ' lg-msg--in' : ''}`} aria-label={`${cur.msg.from} is typing`}>
                  <i></i><i></i><i></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
