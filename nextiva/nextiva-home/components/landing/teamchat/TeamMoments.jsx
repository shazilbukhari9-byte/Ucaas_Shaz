'use client';
/* Team Chat "Built for" — one panel over a nature photo per team. Four team tabs across the
   top; below, a split scene for the chosen team: the customer live on a
   call on the left, the question asked in chat (and answered) on the
   right, joined by a "still on the call" connector — the habit the section
   is about. Steps to the next team every STEP_MS; clicking a tab jumps
   there. Pauses only while the visitor is actively using it
   (useIntentPause). Fixed heights, so switching never moves the page.
   Sample names and 555 numbers only. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

const STEP_MS = 3000;

// Who is on the line for each team's moment, and in which channel the team asks.
const CALL = {
  'Sales & deal rooms': { n: 'SR', name: 'Sarah Ruiz', org: 'Acme · multi-year pricing', time: '03:12', ch: 'deal-acme' },
  'Support teams': { n: 'JL', name: 'Jordan Lee', org: 'Brightline · number port', time: '05:47', ch: 'support' },
  'Renewal & account teams': { n: 'NT', name: 'Nina Torres', org: 'Northwind · renewal', time: '02:05', ch: 'cs-renewals' },
  'Distributed teams': { n: 'LM', name: 'Léa Martin', org: 'Paris queue · callback', time: '01:38', ch: 'eu-support' },
};
const TONE = { PS: 'a', DO: 'b', MK: 'c' };

// A nature photo behind the panel for each team (Unsplash); they crossfade.
const U = (id) => 'https://images.unsplash.com/photo-' + id + '?fm=jpg&q=72&w=1800&auto=format&fit=crop';
const SCENES = {
  'Sales & deal rooms': U('1501785888041-af3ef285b470'),
  'Support teams': U('1480497490787-505ec076689f'),
  'Renewal & account teams': U('1494500764479-0c8f2919a3d8'),
  'Distributed teams': U('1513836279014-a89f7a76ae86'),
};

export default function TeamMoments({ items }) {
  const teams = items.filter((a) => CALL[a.title] && a.scene);
  const [sel, setSel] = useState(0);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);

  useEffect(() => {
    if (paused || still) return undefined;
    const t = setTimeout(() => setSel((s) => (s + 1) % teams.length), STEP_MS);
    return () => clearTimeout(t);
  }, [sel, paused, still, teams.length]);

  if (!teams.length) return null;
  const a = teams[sel];
  const c = CALL[a.title];

  return (
    <div className="tcw reveal" {...bind}>
      <span className="tcw-bg" aria-hidden="true">
        {teams.map((t, i) => (
          <i key={t.title} className={i === sel ? 'on' : undefined} style={{ backgroundImage: 'url(' + SCENES[t.title] + ')' }}></i>
        ))}
      </span>
      <div className="tcw-tabs" role="tablist" aria-label="Teams">
        {teams.map((t, i) => (
          <button
            type="button"
            role="tab"
            aria-selected={sel === i}
            className={`tcw-tab${sel === i ? ' is-on' : ''}`}
            key={t.title}
            onClick={() => setSel(i)}
          >
            <span className="tcw-tab-ic"><i className={t.icon} aria-hidden="true"></i></span>
            <span className="tcw-tab-t"><b>{t.title}</b><em>{t.text}</em></span>
          </button>
        ))}
      </div>

      <div className="tcw-scene" key={a.title} role="tabpanel" aria-label={a.title}>
        <div className="tcw-call">
          <span className="tcw-label"><i className="tcw-live"></i>On the call</span>
          <span className="tcw-caller">
            <span className="tcw-av tcw-av--lg">{c.n}</span>
            <span className="tcw-caller-t"><b>{c.name}</b><em>{c.org}</em></span>
          </span>
          <span className="tcw-wave" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i }}></i>)}</span>
          <span className="tcw-call-foot">
            <span className="tcw-timer">{c.time}</span>
            <span className="tcw-ctrls" aria-hidden="true"><i className="ri-mic-line"></i><i className="ri-pause-line"></i><i className="ri-phone-fill is-end"></i></span>
          </span>
        </div>

        <div className="tcw-link" aria-hidden="true">
          <span className="tcw-link-line"></span>
          <span className="tcw-link-badge"><i className="ri-chat-3-line"></i>Asked in chat — still on the call</span>
          <span className="tcw-link-line"></span>
        </div>

        <div className="tcw-chat">
          <span className="tcw-chat-head"><b># {c.ch}</b><em>Team Chat</em></span>
          <div className="tcw-msg tcw-msg--me">
            <span className="tcw-av tcw-av--me">YO</span>
            <span className="tcw-bub">{a.scene.ask}</span>
          </div>
          <div className="tcw-msg">
            <span className={`tcw-av tcw-av--${TONE[a.scene.who] || 'b'}`}>{a.scene.who}</span>
            <span className="tcw-bub">{a.scene.answer}</span>
          </div>
          <span className="tcw-outcome"><i className="ri-check-double-line"></i>{a.scene.time}</span>
        </div>
      </div>

      <span className="tcw-steps" aria-hidden="true">
        {teams.map((t, i) => <i key={t.title} className={i === sel ? 'on' : ''}></i>)}
      </span>
    </div>
  );
}
