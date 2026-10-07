'use client';
/* Shared-inbox section: copy on the left; on the right a team inbox you can
   use — pick a conversation, see who replied last and the internal note,
   assign it to a teammate, and mark it done. */
import { useState } from 'react';

const TEAM = { MP: 'orange', DR: 'blue', AK: 'violet', JL: 'teal' };
const AGENTS = [
  { id: 'DR', name: 'Diego' },
  { id: 'AK', name: 'Aisha' },
  { id: 'YO', name: 'You' },
];

const THREADS = [
  { id: 1, name: 'Maya Patel', kind: 'SMS', last: 'Got it. Thanks!', at: '10:44', replier: 'DR', note: 'VIP customer — offer free returns.', unread: 0, tag: 'Orders' },
  { id: 2, name: 'Jordan Lee', kind: 'MMS', last: '📷 Photo of receipt attached', at: '10:32', replier: null, note: 'Refund request, check receipt total.', unread: 2, tag: 'Refunds' },
  { id: 3, name: 'Aisha Khan', kind: 'SMS', last: 'When will my order ship?', at: '09:58', replier: null, note: '', unread: 1, tag: 'Orders' },
  { id: 4, name: 'Sam Rivera', kind: 'SMS', last: 'C', at: '09:21', replier: 'AK', note: 'Confirmed for Tue 10:00.', unread: 0, tag: 'Bookings' },
];

const initials = (n) => n.split(' ').map((p) => p[0]).join('');

export default function InboxDemo({ data }) {
  const [threads, setThreads] = useState(THREADS);
  const [sel, setSel] = useState(2);
  const t = threads.find((x) => x.id === sel);

  const update = (id, patch) => setThreads((cur) => cur.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const open = (id) => { setSel(id); update(id, { unread: 0 }); };
  const assign = (agent) => update(sel, { assignee: agent });
  const done = () => update(sel, { done: !t.done });
  const openCount = threads.filter((x) => !x.done).length;

  return (
    <section className="lp-section lp-section--theme sm-in-sec">
      <div className="lp-wrap sm-in">
        <div className="sm-in-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="sm-in-points">
            {data.points.map((p) => <li key={p}><i className="ri-check-line" aria-hidden="true"></i>{p}</li>)}
          </ul>
        </div>

        <div className="sm-in-app reveal reveal-delay-1" role="region" aria-label="Shared inbox demo">
          <div className="sm-in-head">
            <span><i className="ri-inbox-2-line" aria-hidden="true"></i>SMS inbox · Support</span>
            <em>{openCount} open</em>
          </div>
          <div className="sm-in-body">
            <ul className="sm-in-list">
              {threads.map((x) => (
                <li key={x.id}>
                  <button type="button" className={`sm-in-row${sel === x.id ? ' is-on' : ''}${x.done ? ' is-done' : ''}`} onClick={() => open(x.id)}>
                    <span className={`sm-in-av sm-in-av--${TEAM[initials(x.name)] || 'slate'}`}>{initials(x.name)}</span>
                    <span className="sm-in-txt">
                      <span className="sm-in-top"><b>{x.name}</b><em>{x.at}</em></span>
                      <span className="sm-in-last">{x.last}</span>
                    </span>
                    <span className="sm-in-side">
                      {x.unread > 0 && <i className="sm-in-badge">{x.unread}</i>}
                      {x.replier && <span className="sm-in-replier" title="Last replied">↪ {x.replier}</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="sm-in-detail" key={t.id}>
              <div className="sm-in-d-top">
                <b>{t.name}</b>
                <span className="sm-in-tag">{t.kind} · {t.tag}</span>
              </div>
              <div className="sm-in-msg">{t.last}</div>
              <div className="sm-in-note">
                <i className="ri-sticky-note-line" aria-hidden="true"></i>
                <span>{t.note || 'No internal notes yet.'}<em>Internal · customers never see this</em></span>
              </div>
              <div className="sm-in-assign">
                <span>Assign to</span>
                <div>
                  {AGENTS.map((a) => (
                    <button key={a.id} type="button" className={t.assignee === a.id ? 'is-on' : ''} onClick={() => assign(a.id)} aria-pressed={t.assignee === a.id}>
                      {a.name}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" className={`sm-in-done${t.done ? ' is-on' : ''}`} onClick={done}>
                <i className={t.done ? 'ri-arrow-go-back-line' : 'ri-check-double-line'} aria-hidden="true"></i>
                {t.done ? 'Reopen' : 'Mark as done'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
