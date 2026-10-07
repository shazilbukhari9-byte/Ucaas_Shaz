'use client';

import { useEffect, useRef, useState } from 'react';

/** The scripted call the hero plays on a loop. */
const SCRIPT = [
  { type: 'caller', text: 'Half our handsets dropped off this morning.', delay: 1500 },
  { type: 'typing', delay: 1000 },
  { type: 'ai', text: 'I can have an engineer with you Thursday, 11:15. Does that suit?', delay: 1800 },
  { type: 'caller', text: 'Thursday works. Please book it.', delay: 1500 },
  { type: 'typing', delay: 800 },
  { type: 'ai', text: "Booked. I've texted you the engineer's name.", delay: 1200 },
  { type: 'action', delay: 500 },
];

const MAX_BUBBLES = 4;

const PHONE_ICON =
  'M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z';
const CHECK_ICON = 'M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z';

const CALENDAR_CHECK =
  'M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z';

const formatClock = (seconds) =>
  `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

const sleep = (ms, signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('aborted', 'AbortError'));
    }, { once: true });
  });

/**
 * The hero's AI-receptionist demo. The original theme built these bubbles with
 * `document.createElement`; here the transcript is component state and React
 * renders it.
 */
export default function CallPanel() {
  const [bubbles, setBubbles] = useState([]);
  const [typing, setTyping] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const conversationRef = useRef(null);
  const nextId = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let clock;

    const run = async () => {
      // Reset for this pass.
      setBubbles([]);
      setTyping(false);
      setActionVisible(false);
      setCompleted(false);
      setSeconds(0);

      clock = setInterval(() => setSeconds((s) => s + 1), 1000);

      for (const step of SCRIPT) {
        await sleep(step.delay, signal);
        if (step.type === 'typing') {
          setTyping(true);
          continue;
        }
        setTyping(false);
        if (step.type === 'action') {
          setActionVisible(true);
          continue;
        }
        setBubbles((prev) => {
          const next = [...prev, { id: nextId.current++, type: step.type, text: step.text }];
          return next.length > MAX_BUBBLES ? next.slice(next.length - MAX_BUBBLES) : next;
        });
      }

      await sleep(3000, signal);
      clearInterval(clock);
      await sleep(500, signal);

      setCompleted(true);
      setBubbles([]);
      setActionVisible(false);
    };

    run().catch((err) => {
      if (err.name !== 'AbortError') throw err;
    });

    return () => {
      controller.abort();
      clearInterval(clock);
    };
  }, []);

  // Keep the transcript pinned to the newest message.
  useEffect(() => {
    const el = conversationRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [bubbles, typing]);

  return (
    <div className="ui-call-card">
      <div className="call-card-header">
        <div className="call-header-left">
          <svg
            className={`call-icon${completed ? ' completed' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d={completed ? CHECK_ICON : PHONE_ICON}></path>
          </svg>
          <span className="call-label">{completed ? 'CALL COMPLETED' : 'INCOMING CALL'}</span>
          <div className="sound-wave">
            {Array.from({ length: 5 }, (_, i) => (
              <span className="bar" key={i}></span>
            ))}
          </div>
        </div>
        <span className={`call-time${completed ? ' saved-mode' : ''}`} id="callTime">
          {completed ? '2m 18s' : formatClock(seconds)}
        </span>
      </div>

      <div className="call-main">
        <div className="call-title-row">
          <div className="caller-avatar">
            <img
              decoding="async"
              src="/media/avatar-headset-75de06e7.webp"
              alt="Neha Bhatt"
              className="caller-avatar-img"
            />
          </div>
          <span className="caller-name" id="callerDisplay">
            {completed ? 'Call Summary' : 'Neha Bhatt'}
          </span>
          <div className={`ai-badge${completed ? ' summary-mode' : ''}`}>
            <span className="ai-badge-icon">✦</span>
            <span className="ai-badge-text">
              {completed ? 'Answered by UCaaS AI' : 'UCaaS AI Speaking'}
            </span>
          </div>
        </div>
      </div>

      <div className="call-conversation" id="callConversation" ref={conversationRef}>
        {completed ? (
          <>
            <div className="summary-card">
              <div className="summary-card-label">Summary</div>
              <div className="summary-card-text">
                Neha Bhatt reported handsets offline across two floors. Engineer booked, visit
                confirmed.
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-card-label">Site visit</div>
              <div className="summary-card-text">
                <span className="summary-badge">Thursday</span>{' '}
                <span className="summary-badge">11:15 AM</span>{' '}
                <span className="summary-badge success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d={CALENDAR_CHECK}></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="summary-card summary-card-vibe">
              <div className="summary-card-label">Sentiment</div>
              <div className="summary-card-text">
                <span className="summary-badge positive">Reassured</span>{' '}
                <span className="summary-badge positive">Direct</span>{' '}
                <span className="summary-badge positive">Urgent</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {bubbles.map((bubble) => (
              <div className={`chat-bubble-wrapper ${bubble.type}`} key={bubble.id}>
                {bubble.type === 'ai' && (
                  <div className="chat-bubble-label">
                    <span className="label-icon">✦</span> UCaaS AI
                  </div>
                )}
                <div className={`chat-bubble ${bubble.type}`}>{bubble.text}</div>
              </div>
            ))}
            {typing && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </>
        )}
      </div>

      <div className={`call-action${actionVisible ? ' visible' : ''}`} id="callAction">
        <div className="action-label">ENGINEER DISPATCHED</div>
        <div className="action-content">
          <div className="action-icon">
            <i className="ri-calendar-check-line"></i>
          </div>
          <div className="action-details">
            <span className="action-title">
              <span className="action-title-badge">AI</span> Site Visit Booked
            </span>
            <span className="action-subtitle">Thursday, 11:15 AM</span>
          </div>
        </div>
        <div className="action-progress">
          <div
            className="action-progress-bar"
            style={actionVisible ? { animation: 'sectionHeroProgressFill 1.5s ease forwards' } : undefined}
          ></div>
        </div>
      </div>
    </div>
  );
}
