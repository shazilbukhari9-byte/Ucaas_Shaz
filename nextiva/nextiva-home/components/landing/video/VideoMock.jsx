'use client';
/* Working hero mockup for the HD Video Meetings page: a meeting in progress.
   Participant tiles with an active-speaker ring, a live transcript that adds
   lines as people talk (action items are pulled into Notes automatically),
   and working controls — mic, camera, screen share, record. Leave ends the
   meeting and the AI summary arrives a moment later; Rejoin starts over. */
import { useEffect, useRef, useState } from 'react';

const PEOPLE = [
  { id: 'TW', name: 'Tara W.', tone: 'violet' },
  { id: 'DO', name: 'Daniel O.', tone: 'blue' },
  { id: 'PS', name: 'Priya S.', tone: 'rose' },
  { id: 'MK', name: 'Marcus K.', tone: 'amber' },
  { id: 'AN', name: 'Aisha N.', tone: 'teal' },
];

const SCRIPT = [
  { who: 'TW', at: '00:12', text: 'Let’s lock the Q3 expansion plan. Daniel — is your team ready?' },
  { who: 'DO', at: '00:18', text: 'Ready. We need pricing for 25 seats by Friday.', action: { text: 'Send 25-seat pricing by Friday', owner: 'Daniel' } },
  { who: 'PS', at: '00:24', text: 'I’ll pull the renewal data and share it by end of day.', action: { text: 'Share renewal data today', owner: 'Priya' } },
  { who: 'MK', at: '00:31', text: 'Then we go with the Austin office first?' },
  { who: 'TW', at: '00:36', text: 'Agreed — Austin first, Denver in October.', decision: 'Austin opens first; Denver follows in October' },
];

const STEP_MS = 2600;
const who = (id) => PEOPLE.find((p) => p.id === id);
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function VideoMock({ page }) {
  const [lines, setLines] = useState(1);
  const [tab, setTab] = useState('live');
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [share, setShare] = useState(false);
  const [rec, setRec] = useState(true);
  const [phase, setPhase] = useState('live'); // live | writing | summary
  const [secs, setSecs] = useState(754);
  const listRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Transcript plays line by line while the meeting is live.
  useEffect(() => {
    if (phase !== 'live' || lines >= SCRIPT.length) return undefined;
    const id = setTimeout(() => setLines((n) => n + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [lines, phase]);

  useEffect(() => {
    if (phase !== 'live') return undefined;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [lines, tab]);

  const said = SCRIPT.slice(0, lines);
  const actions = said.filter((l) => l.action).map((l) => l.action);
  const decisions = said.filter((l) => l.decision).map((l) => l.decision);
  const speaking = phase === 'live' ? said[said.length - 1]?.who : null;

  const leave = () => {
    setPhase('writing');
    setLines(SCRIPT.length);
    timers.current.push(setTimeout(() => setPhase('summary'), 2200));
  };
  const rejoin = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase('live'); setLines(1); setTab('live'); setShare(false); setSecs(754);
    setMic(true); setCam(true); setRec(true);
  };

  const allActions = SCRIPT.filter((l) => l.action).map((l) => l.action);
  const allDecisions = SCRIPT.filter((l) => l.decision).map((l) => l.decision);

  return (
    <div className="vdm" role="region" aria-label="Interactive video meeting demo">
      <div className="vdm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="vdm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Q3 planning
        </span>
        <span className="vdm-time">{phase === 'live' ? mmss(secs) : 'Ended'}</span>
        {rec && phase === 'live' && <span className="vdm-rec"><i aria-hidden="true"></i>REC</span>}
      </div>

      {phase === 'live' ? (
        <>
          <div className="vdm-body">
            <div className={`vdm-stage${share ? ' is-share' : ''}`}>
              {share && (
                <div className="vdm-screen">
                  <span className="vdm-screen-bar"><i className="ri-slideshow-3-line" aria-hidden="true"></i>You are sharing · Q3-expansion.pdf</span>
                  <div className="vdm-screen-doc" aria-hidden="true">
                    <b>Q3 expansion</b>
                    <span className="vdm-bars"><i style={{ height: '40%' }}></i><i style={{ height: '62%' }}></i><i style={{ height: '78%' }}></i><i style={{ height: '55%' }}></i></span>
                  </div>
                </div>
              )}
              <div className="vdm-tiles">
                {PEOPLE.map((p) => (
                  <span key={p.id} className={`vdm-tile vdm-tile--${p.tone}${speaking === p.id ? ' is-speaking' : ''}`}>
                    <span className="vdm-av">{p.id}</span>
                    <em>{p.name}</em>
                  </span>
                ))}
                <span className={`vdm-tile vdm-tile--you${cam ? '' : ' is-off'}`}>
                  {cam ? <span className="vdm-av vdm-av--you">You</span> : <i className="ri-camera-off-line vdm-off" aria-hidden="true"></i>}
                  <em>You{mic ? '' : ' · muted'}</em>
                  {!mic && <i className="ri-mic-off-fill vdm-muted" aria-hidden="true"></i>}
                </span>
              </div>
            </div>

            <div className="vdm-side">
              <div className="vdm-tabs" role="tablist">
                <button type="button" role="tab" aria-selected={tab === 'live'} className={tab === 'live' ? 'is-on' : ''} onClick={() => setTab('live')}>Transcript</button>
                <button type="button" role="tab" aria-selected={tab === 'notes'} className={tab === 'notes' ? 'is-on' : ''} onClick={() => setTab('notes')}>
                  AI notes{actions.length > 0 && <b>{actions.length}</b>}
                </button>
              </div>
              <ol className="vdm-feed" ref={listRef} aria-live="polite">
                {tab === 'live'
                  ? said.map((l) => (
                    <li key={l.at} className="vdm-line">
                      <span className="vdm-line-top"><b>{who(l.who).name}</b><em>{l.at}</em></span>
                      <p>{l.text}</p>
                      {l.action && <span className="vdm-flag"><i className="ri-sparkling-2-fill" aria-hidden="true"></i>Action item found</span>}
                    </li>
                  ))
                  : (
                    <>
                      {actions.length === 0 && decisions.length === 0 && <li className="vdm-empty">Listening for decisions and action items…</li>}
                      {actions.map((a) => (
                        <li key={a.text} className="vdm-note vdm-note--task">
                          <span>Action item · auto</span>
                          <p>{a.text}</p>
                          <em>Owner: @{a.owner.toLowerCase()}</em>
                        </li>
                      ))}
                      {decisions.map((d) => (
                        <li key={d} className="vdm-note vdm-note--dec"><span>Decision</span><p>{d}</p></li>
                      ))}
                    </>
                  )}
              </ol>
            </div>
          </div>

          <div className="vdm-ctrl">
            <button type="button" className={mic ? '' : 'is-off'} onClick={() => setMic(!mic)} aria-pressed={!mic} aria-label={mic ? 'Mute' : 'Unmute'}>
              <i className={mic ? 'ri-mic-fill' : 'ri-mic-off-fill'} aria-hidden="true"></i>
            </button>
            <button type="button" className={cam ? '' : 'is-off'} onClick={() => setCam(!cam)} aria-pressed={!cam} aria-label={cam ? 'Turn camera off' : 'Turn camera on'}>
              <i className={cam ? 'ri-vidicon-fill' : 'ri-camera-off-fill'} aria-hidden="true"></i>
            </button>
            <button type="button" className={share ? 'is-on' : ''} onClick={() => setShare(!share)} aria-pressed={share} aria-label="Share screen">
              <i className="ri-share-box-fill" aria-hidden="true"></i>
            </button>
            <button type="button" className={rec ? 'is-rec' : ''} onClick={() => setRec(!rec)} aria-pressed={rec} aria-label={rec ? 'Stop recording' : 'Record'}>
              <i className="ri-record-circle-fill" aria-hidden="true"></i>
            </button>
            <span className="vdm-count"><i className="ri-group-line" aria-hidden="true"></i>6</span>
            <button type="button" className="vdm-leave" onClick={leave}><i className="ri-phone-fill" aria-hidden="true"></i>Leave</button>
          </div>
        </>
      ) : (
        <div className="vdm-after" aria-live="polite">
          {phase === 'writing' ? (
            <div className="vdm-writing">
              <span className="vdm-spin" aria-hidden="true"><i className="ri-sparkling-2-fill"></i></span>
              <b>Meeting ended · writing your summary</b>
              <em>Transcript closed{rec ? ' · recording saved' : ''}</em>
            </div>
          ) : (
            <div className="vdm-sum">
              <div className="vdm-sum-top">
                <span><i className="ri-sparkling-2-fill" aria-hidden="true"></i>AI summary · Q3 planning</span>
                <em>Sent to 6 attendees</em>
              </div>
              <p className="vdm-sum-lead">The team agreed the Q3 expansion plan and set owners for pricing and renewal data.</p>
              <span className="vdm-sum-k">Decisions</span>
              <ul className="vdm-sum-list">{allDecisions.map((d) => <li key={d}><i className="ri-check-double-line" aria-hidden="true"></i>{d}</li>)}</ul>
              <span className="vdm-sum-k">Action items</span>
              <ul className="vdm-sum-list">{allActions.map((a) => <li key={a.text}><i className="ri-checkbox-blank-circle-line" aria-hidden="true"></i>{a.text}<b>@{a.owner.toLowerCase()}</b></li>)}</ul>
              <div className="vdm-sum-foot">
                {rec && <span><i className="ri-film-line" aria-hidden="true"></i>Recording + transcript saved</span>}
                <button type="button" onClick={rejoin}><i className="ri-restart-line" aria-hidden="true"></i>Rejoin</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
