'use client';

import { useEffect, useRef } from 'react';

/**
 * The UCaaS workspace — our own dashboard, in light glass.
 *
 * Authored at a fixed 1000px like a real app frame, then scaled to whatever
 * column it sits in (same fit mechanism as the home hero), so the design
 * never reflows — it only zooms.
 */

const APP_W = 1000;

function useAppFit(hostRef) {
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const app = host.querySelector('.pp-app');
    if (!app) return undefined;

    const fit = () => {
      const width = host.clientWidth;
      if (!width) return;
      const scale = Math.min(1, width / APP_W);
      host.style.setProperty('--app-scale', scale.toFixed(4));
      // transform:scale leaves the layout box at full size — publish the
      // drawn height so the column wraps the visual, not the frame.
      host.style.setProperty('--app-h', `${Math.round(app.offsetHeight * scale)}px`);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(host);
    observer.observe(app);
    return () => observer.disconnect();
  }, [hostRef]);
}

/* Licensed Adobe Stock portraits, cropped square to the face — nothing from
   the original capture. Deepak's row is named for the photo that came back
   from Stock, not the other way round. */
const CONVERSATIONS = [
  { img: '/media/person-meera.webp', name: 'Meera Nair', sub: 'Active call', time: '02:14', state: 'live', icon: 'ri-phone-fill' },
  { img: '/media/person-arjun.webp', name: 'Arjun Dev', sub: 'Incoming call', time: '10:32 AM', state: 'ring', icon: 'ri-phone-line' },
  { img: '/media/person-sana.webp', name: 'Sana Iqbal', sub: 'Can you share the report?', time: '10:12 AM', state: '', icon: '' },
  { img: '/media/person-priya.webp', name: 'Deepak Rao', sub: 'Voicemail · 0:42', time: '9:45 AM', state: '', icon: 'ri-voiceprint-line' },
  { img: '/media/person-rohit.webp', name: 'Rohit Kalra', sub: 'Thanks! Will check.', time: 'Yesterday', state: '', icon: '' },
];

const TRANSCRIPT = [
  { who: 'Meera Nair', at: '10:15 AM', lines: ['Hi, I wanted to check the status of my extension request.'] },
  { who: 'Agent', at: '10:15 AM', lines: ['Sure! I can help you with that.', 'One moment please.'] },
];

export default function UcaasDashboard() {
  const hostRef = useRef(null);
  useAppFit(hostRef);

  return (
    <div className="pp-app-host" ref={hostRef}>
      <div className="pp-app" role="img" aria-label="UCaaS workspace: a live call with real-time transcript and AI summary beside the conversation list">

        {/* top nav */}
        <div className="pp2-nav">
          <span className="pp2-mark" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
          <span className="pp2-tab is-active">Workspace</span>
          <span className="pp2-tab">Contacts</span>
          <span className="pp2-tab">History</span>
          <span className="pp2-tab">Analytics</span>
          <span className="pp2-avail"><i></i> Available <b className="ri-arrow-down-s-line" aria-hidden="true"></b></span>
          <span className="pp2-bell"><i className="ri-notification-3-line" aria-hidden="true"></i><em>2</em></span>
          <span className="pp2-me" aria-hidden="true">AS</span>
        </div>

        <div className="pp2-body">
          {/* conversation list */}
          <aside className="pp2-list">
            <div className="pp2-search">
              <span><i className="ri-search-line" aria-hidden="true"></i> Search conversations…</span>
              <b><i className="ri-equalizer-line" aria-hidden="true"></i></b>
            </div>
            <div className="pp2-chips" aria-hidden="true">
              <span className="is-active">All</span><span>Calls</span><span>Messages</span><span>Voicemail</span>
            </div>
            {CONVERSATIONS.map((row) => (
              <div className={`pp2-conv${row.state === 'live' ? ' is-live' : ''}`} key={row.name}>
                <span className={`pp2-ava${row.state ? ` pp2-ava--${row.state}` : ''}`}>
                  <img src={row.img} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="pp2-conv-id">
                  <b>{row.name}</b>
                  <em className={row.state ? `pp2-sub--${row.state}` : ''}>{row.sub}</em>
                </span>
                <span className="pp2-conv-end">
                  <time>{row.time}</time>
                  {row.icon && <i className={row.icon} aria-hidden="true"></i>}
                </span>
              </div>
            ))}
          </aside>

          {/* call view */}
          <section className="pp2-call">
            <div className="pp2-call-head">
              <span className="pp2-ava pp2-ava--live pp2-ava--lg">
                <img src="/media/person-meera.webp" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="pp2-call-id">
                <b>Meera Nair</b>
                <em>+1 (415) 555-0189</em>
                <span className="pp2-call-state"><i></i> Connected <time>02:14</time></span>
              </span>
              <span className="pp2-wave" aria-hidden="true">
                {Array.from({ length: 26 }, (_, index) => <i key={index} style={{ '--w': index }}></i>)}
              </span>
            </div>

            <div className="pp2-actions" aria-hidden="true">
              <span><i className="ri-mic-line"></i></span>
              <span><i className="ri-dialpad-line"></i></span>
              <span><i className="ri-pause-line"></i></span>
              <span className="pp2-end"><i className="ri-phone-fill"></i></span>
            </div>

            <div className="pp2-transcript">
              <div className="pp2-transcript-head">
                <span className="pp2-mark pp2-mark--sm" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
                <b>Live Transcript</b>
                <em>English <i className="ri-arrow-down-s-line" aria-hidden="true"></i></em>
              </div>
              {TRANSCRIPT.map((entry, index) => (
                <div className="pp2-line" key={entry.who} style={{ '--t': index }}>
                  <span className="pp2-line-meta"><b>{entry.who}</b><time>{entry.at}</time></span>
                  {entry.lines.map((line) => <p key={line}>{line}</p>)}
                </div>
              ))}
            </div>

            <div className="pp2-summary">
              <span className="pp2-summary-head"><i className="ri-sparkling-2-fill" aria-hidden="true"></i> AI Summary</span>
              <p>Customer requested an update on extension. Our team is processing the request.</p>
              <b>View details</b>
            </div>

            <div className="pp2-compose" aria-hidden="true">
              <div className="pp2-compose-tabs"><span className="is-active">Message</span><span>Internal Note</span></div>
              <div className="pp2-compose-row">
                <span>Type your message…</span>
                <i className="ri-emotion-line"></i>
                <i className="ri-attachment-2"></i>
                <b><i className="ri-send-plane-fill"></i></b>
              </div>
            </div>
          </section>
        </div>

        {/* floating toasts */}
        <div className="pp2-toast pp2-toast--call" aria-hidden="true">
          <span className="pp2-toast-icon"><i className="ri-phone-fill"></i></span>
          <span className="pp2-toast-id"><em>Incoming Call</em><b>Arjun Dev</b><em>Sales Team</em></span>
          <span className="pp2-toast-btn pp2-toast-btn--take"><i className="ri-phone-fill"></i></span>
          <span className="pp2-toast-btn pp2-toast-btn--drop"><i className="ri-phone-fill"></i></span>
        </div>
        <div className="pp2-toast pp2-toast--msg" aria-hidden="true">
          <span className="pp2-toast-icon pp2-toast-icon--msg"><i className="ri-message-3-fill"></i></span>
          <span className="pp2-toast-id"><b>New Message</b><em>Sana Iqbal — Can you share the report?</em></span>
        </div>
      </div>
    </div>
  );
}
