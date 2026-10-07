'use client';
/* Video "After you hang up" — post-call playback. A player-style timeline
   of the four moments after a meeting (hang up, summary, tasks, search);
   below it, the recap window shows what exists at that moment — the call
   closing, the summary going out, action items with owners, then a search
   that finds the moment in the transcript. Steps every STEP_MS; clicking
   a moment jumps there. Pauses only while the visitor is actively using
   it (useIntentPause). Fixed height, so nothing moves the page. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';
import { nameOf } from './people';

const STEP_MS = 3000;
// A nature photo behind the playback for each moment (Unsplash); they crossfade.
const BG = ['1542273917363-3b1817f69a2d', '1439853949127-fa647821eba0', '1510784722466-f2aa9c52fff6', '1414609245224-afa02bfb3fda']
  .map((id) => 'https://images.unsplash.com/photo-' + id + '?fm=jpg&q=72&w=1600&auto=format&fit=crop');
const PEOPLE = [['TW', 'a'], ['DO', 'b'], ['PS', 'c'], ['MK', 'd'], ['AN', 'a'], ['YO', 'b']];

function Screen({ step }) {
  if (step === 0) {
    return (
      <div className="vap-screen">
        <div className="vap-ended">
          <span className="vap-ended-ic"><i className="ri-phone-fill"></i></span>
          <span className="vap-ended-t"><b>Call ended · Q3 planning</b><em>32 min · 6 people</em></span>
        </div>
        <ul className="vap-checks">
          <li><i className="ri-checkbox-circle-fill"></i>Recording saved to the cloud</li>
          <li><i className="ri-checkbox-circle-fill"></i>Transcript closed — 4,812 words, speaker-labelled</li>
          <li className="is-wait"><i className="ri-loader-4-line vap-spin"></i>Writing the summary…</li>
        </ul>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="vap-screen">
        <span className="vap-k">Summary</span>
        <p className="vap-sum">Q3 expansion plan agreed. Austin opens first, Denver follows in October. Pricing and renewal data due this week.</p>
        <div className="vap-sent">
          <span className="vap-stack">{PEOPLE.map(([n, t]) => <i key={n} className={`vap-av vap-av--${t}`} data-name={nameOf(n)}>{n}</i>)}</span>
          <span><b>Sent to all 6 attendees</b><em>and anyone who missed the call</em></span>
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="vap-screen">
        <span className="vap-k">Action items</span>
        {[['Send 25-seat pricing', 'DO', 'b', 'Daniel', 'Fri'], ['Share renewal data', 'PS', 'c', 'Priya', 'Today'], ['Book Austin site visit', 'MK', 'd', 'Marcus', 'Done']].map(([t, n, c, who, when], i) => (
          <div className={`vap-task${when === 'Done' ? ' is-done' : ''}`} key={t} style={{ '--i': i }}>
            <i className={when === 'Done' ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'}></i>
            <b>{t}</b>
            <span className="vap-owner"><i className={`vap-av vap-av--${c}`} data-name={nameOf(n)}>{n}</i>{who}<em>{when}</em></span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="vap-screen">
      <span className="vap-search"><i className="ri-search-line"></i><b>Austin</b><em>3 moments</em></span>
      <div className="vap-hit">
        <span className="vap-hit-top"><i className="vap-av vap-av--a" data-name={nameOf('TW')}>TW</i><b>Tara W.</b><em>00:36</em></span>
        <p>Agreed — <mark>Austin</mark> first, Denver in October.</p>
      </div>
      <div className="vap-chips">
        <span><i className="ri-film-line"></i>Recording · 32 min</span>
        <span><i className="ri-file-text-line"></i>Transcript</span>
        <span className="is-ok"><i className="ri-refresh-line"></i>Synced to CRM</span>
      </div>
    </div>
  );
}

export default function AfterPlayback({ data }) {
  const steps = data.steps;
  const [s, setS] = useState(0);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => {
    if (paused || still) return undefined;
    const t = setTimeout(() => setS((x) => (x + 1) % steps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [s, paused, still, steps.length]);
  const cur = steps[s];

  return (
    <section className="lp-section vap-sec">
      <div className="lp-wrap">
        <div className="vap-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="vap reveal" {...bind}>
          <span className="vap-bg" aria-hidden="true">
            {steps.map((x, i) => <i key={x.time} className={i === s ? 'on' : undefined} style={{ backgroundImage: 'url(' + BG[i % BG.length] + ')' }}></i>)}
          </span>
          <ol className="vap-track" role="tablist" aria-label="After the call">
            {steps.map((x, i) => (
              <li key={x.time}>
                <button type="button" role="tab" aria-selected={i === s} className={`vap-mark${i === s ? ' is-on' : ''}${i < s ? ' is-past' : ''}`} onClick={() => setS(i)}>
                  <span className="vap-dot"><i className={x.icon} aria-hidden="true"></i></span>
                  <span className="vap-mark-t"><em>{x.time}</em><b>{x.title}</b></span>
                </button>
              </li>
            ))}
          </ol>

          <div className="vap-body">
            <div className="vap-copy" key={`c-${s}`}>
              <span className="vap-time">{cur.time}<small>after the call</small></span>
              <h3>{cur.title}</h3>
              <p>{cur.text}</p>
            </div>
            <div className="vap-win" aria-hidden="true">
              <div className="vap-win-bar">
                <span className="vap-win-ic"><i className="ri-sparkling-2-fill"></i></span>
                <span className="vap-win-t"><b>Meeting notes · Q3 planning</b><em>Automatic recap</em></span>
              </div>
              <div className="vap-win-body" key={`w-${s}`}><Screen step={s} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
