'use client';
/* Video "What meetings need" — a spec showcase. Left: the spec as a compact
   headline over a meeting-app window showing that feature full size;
   right: the list of all six. The selection steps every STEP_MS; clicking
   a row (or pressing Enter on it) jumps there — hovering does not. Pauses
   only while the visitor is actively using it (useIntentPause). Fixed
   height, so nothing moves.
   Visuals are keyed by order (HD video, transcripts, action items,
   recording, breakouts, browser join). Sample names only. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';
import { nameOf } from './people';

const STEP_MS = 3000;
// A nature photo behind the showcase for each feature (Unsplash); they crossfade.
const BG = ['1473773508845-188df298d2d1', '1434725039720-aaad6dd32dfe', '1506744038136-46273834b3fb', '1500964757637-c85e8a162699', '1482938289607-e9573fc25ebb', '1500382017468-9049fed747ef']
  .map((id) => 'https://images.unsplash.com/photo-' + id + '?fm=jpg&q=72&w=1400&auto=format&fit=crop');

/* One full product screen per feature, inside a meeting-app window. */
const Av = ({ n, t = 0, ring }) => <span className={`vsx-av vsx-av--${t % 4}${ring ? ' is-ring' : ''}`} data-name={nameOf(n)}>{n}</span>;
const SCREEN_TITLE = ['Q3 planning · Live', 'Transcript · Q3 planning', 'Action items · Q3 planning', 'Recording · Q3 planning', 'Breakout rooms · Workshop', 'Join meeting'];

function Visual({ i }) {
  if (i === 0) {
    const ppl = [['TW', 'Tara W.', 1], ['DO', 'Daniel O.'], ['PS', 'Priya S.'], ['MK', 'Marcus K.'], ['AN', 'Aisha N.'], ['YO', 'You']];
    return (
      <div className="vsx vsx--video">
        <div className="vsx-tiles">
          {ppl.map(([n, name, talk], k) => (
            <span key={n} className={`vsx-tile vsx-tile--${k % 6}${talk ? ' is-talk' : ''}`}>
              <Av n={n} t={k} />
              <em>{name}{talk && <i className="ri-mic-fill"></i>}</em>
            </span>
          ))}
        </div>
        <div className="vsx-foot">
          <span className="vsx-chip vsx-chip--dark"><b>HD</b>Auto quality</span>
          <span className="vsx-chip"><i className="ri-signal-wifi-3-line"></i>Connection good</span>
          <span className="vsx-chip"><i className="ri-group-line"></i>6 of 200</span>
        </div>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="vsx vsx--tx">
        {[['TW', 0, 'Tara W.', '00:31', 'Then we go with the Austin office first?'], ['DO', 1, 'Daniel O.', '00:34', 'Yes — Denver follows in October.'], ['PS', 2, 'Priya S.', '00:36', 'I’ll pull the renewal data by end of day.']].map(([n, t, name, at, line]) => (
          <div className="vsx-line" key={at}><Av n={n} t={t} /><span><b>{name}<em>{at}</em></b>{line}</span></div>
        ))}
        <div className="vsx-sum">
          <span className="vsx-sum-k"><i className="ri-sparkling-2-fill"></i>AI summary · ready 30s after the call</span>
          <p>Austin opens first, Denver in October. Pricing and renewal data due this week.</p>
        </div>
      </div>
    );
  }
  if (i === 2) {
    return (
      <div className="vsx vsx--tasks">
        {[['Send 25-seat pricing to Acme', 'DO', 1, 'Daniel', 'Fri'], ['Share renewal data', 'PS', 2, 'Priya', 'Today'], ['Book Austin site visit', 'MK', 3, 'Marcus', 'Done'], ['Draft Denver hiring plan', 'TW', 0, 'Tara', 'Oct 1']].map(([t, n, c, who, when]) => (
          <div className={`vsx-task${when === 'Done' ? ' is-done' : ''}`} key={t}>
            <i className={when === 'Done' ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'}></i>
            <span className="vsx-task-t"><b>{t}</b><em>From the call · 00:3{c}</em></span>
            <span className="vsx-owner"><Av n={n} t={c} />{who}</span>
            <span className={`vsx-due${when === 'Done' ? ' is-done' : ''}`}>{when}</span>
          </div>
        ))}
      </div>
    );
  }
  if (i === 3) {
    return (
      <div className="vsx vsx--rec">
        <div className="vsx-player">
          <span className="vsx-frame">{[0, 1, 2, 3].map((k) => <i key={k} className={`vsx-mini vsx-tile--${k}`}></i>)}</span>
          <span className="vsx-play"><i className="ri-play-fill"></i></span>
          <span className="vsx-recbadge"><i></i>REC · 32:14</span>
        </div>
        <div className="vsx-scrub">
          <span className="vsx-bar"><i style={{ width: '42%' }}></i>{[18, 42, 71].map((p) => <b key={p} style={{ left: `${p}%` }}></b>)}</span>
          <span className="vsx-chapters"><em>Intro</em><em className="is-on">Austin plan</em><em>Pricing</em><em>Next steps</em></span>
        </div>
        <div className="vsx-foot">
          <span className="vsx-chip"><i className="ri-file-text-line"></i>Transcript attached</span>
          <span className="vsx-chip"><i className="ri-shield-check-line"></i>Kept per your retention policy</span>
        </div>
      </div>
    );
  }
  if (i === 4) {
    return (
      <div className="vsx vsx--rooms">
        <div className="vsx-rooms">
          {[['Room 1', ['TW', 'DO', 'PS']], ['Room 2', ['MK', 'AN']], ['Room 3', ['YO', 'TW', 'DO', 'PS']], ['Room 4', ['AN', 'MK', 'YO']], ['Room 5', ['PS', 'DO']], ['Room 6', ['TW', 'AN', 'MK']]].map(([r, ppl], k) => (
            <span className={`vsx-room${k === 2 ? ' is-on' : ''}`} key={r}>
              <b>{r}</b>
              <span className="vsx-stack">{ppl.map((n, j) => <Av key={n + j} n={n} t={j + k} />)}</span>
            </span>
          ))}
        </div>
        <div className="vsx-foot">
          <span className="vsx-chip"><i className="ri-time-line"></i>12:40 left</span>
          <span className="vsx-chip"><i className="ri-slideshow-line"></i>Screen sharing in 2 rooms</span>
          <span className="vsx-chip vsx-chip--dark"><i className="ri-broadcast-line"></i>Broadcast to all</span>
        </div>
      </div>
    );
  }
  return (
    <div className="vsx vsx--join">
      <span className="vsx-url"><i className="ri-lock-line"></i>meet.ucaas.example/q3-planning</span>
      <div className="vsx-join">
        <span className="vsx-cam"><Av n="SR" t={0} /><span className="vsx-cam-ctrls"><i className="ri-mic-line"></i><i className="ri-vidicon-line"></i></span></span>
        <div className="vsx-form">
          <b>Ready to join?</b>
          <span className="vsx-field">Sarah Ruiz</span>
          <span className="vsx-joinbtn">Join now<i className="ri-arrow-right-line"></i></span>
          <em><i className="ri-check-line"></i>No download, no account</em>
        </div>
      </div>
    </div>
  );
}

export default function SpecShowcase({ items }) {
  const [sel, setSel] = useState(0);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => {
    if (paused || still) return undefined;
    const t = setTimeout(() => setSel((s) => (s + 1) % items.length), STEP_MS);
    return () => clearTimeout(t);
  }, [sel, paused, still, items.length]);
  const c = items[sel];

  return (
    <div className="vss reveal" {...bind}>
      <div className="vss-show">
        <span className="vss-bg" aria-hidden="true">
          {items.map((x, i) => <i key={x.title} className={i === sel ? 'on' : undefined} style={{ backgroundImage: 'url(' + BG[i % BG.length] + ')' }}></i>)}
        </span>
        <div className="vss-headline" key={`s-${sel}`}>
          <span className="vss-spec2"><b>{c.spec}</b><em>{c.unit}</em></span>
          <span className="vss-count">{String(sel + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        </div>
        <div className="vsx-win" aria-hidden="true">
          <div className="vsx-bar-top">
            <span className="vsx-dots"><i></i><i></i><i></i></span>
            <b><i className="ri-vidicon-fill"></i>{SCREEN_TITLE[sel]}</b>
            {sel === 0 && <span className="vsx-live"><i></i>Live</span>}
          </div>
          <div className="vsx-screen" key={`v-${sel}`}><Visual i={sel} /></div>
        </div>
      </div>
      <ul className="vss-list">
        {items.map((x, i) => (
          <li key={x.title}>
            <button
              type="button"
              className={`vss-row${i === sel ? ' is-on' : ''}`}
              onClick={() => setSel(i)}
              aria-pressed={i === sel}
            >
              <span className="vss-ic"><i className={x.icon} aria-hidden="true"></i></span>
              <span className="vss-t"><b>{x.title}<small>{x.short}</small></b><em>{x.text}</em></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
