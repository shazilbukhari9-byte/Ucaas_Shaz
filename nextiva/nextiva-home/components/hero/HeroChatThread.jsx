'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/* One continuous conversation, played through exactly once — never looped.
   A short pool cycled round put the same sentence back on screen inside a
   minute, which reads as a broken widget rather than a chat. This runs long
   enough to hold attention and then simply rests on the typing dots.
   `pause` is the beat before the line lands. */
const HOME_CONVERSATION = [
  { kind: 'received', text: 'After six nobody picks up. We lose those calls', pause: 1200 },
  { kind: 'sent', text: 'Not any more', pause: 850 },
  { kind: 'received', text: 'The AI actually answers?', pause: 950 },
  { kind: 'sent', text: 'Answers, qualifies, and books the slot', pause: 1150 },
  { kind: 'received', text: 'Into our calendar?', pause: 900 },
  { kind: 'sent', text: 'Mid-call. The summary lands after', pause: 1100 },
  { kind: 'received', text: 'And texts?', pause: 900 },
  { kind: 'sent', text: 'Same number — calls, texts, voicemail', pause: 1100 },
  { kind: 'received', text: 'Right. Move our main line across', pause: 1150 },
  { kind: 'sent', text: 'Porting is free. Live by Friday', pause: 950 },
];

/**
 * A thread is everything that makes one conversation itself: who is on the
 * other end, what is said, and how it is paced. Pages pass their own so the
 * shared dashboard is not running the identical chat in two places.
 *
 * `lead` is the beat before the typing dots appear, `gap` the rest between a
 * landed line and the next one starting — together they set the tempo.
 * `avatars` and `presence` are both optional: supply them for the fuller
 * header (stacked faces, live status, topic, last-activity time), omit them
 * for the plain name-and-Online header.
 * `variant` is a class on the panel, which is how threads get different
 * bubble entrances (see styles/business-voice/hero-ucaas.css).
 */
const HOME_THREAD = {
  recipient: 'Rohit Kalra',
  conversation: HOME_CONVERSATION,
  backlog: 6,
  lead: 300,
  gap: 1600,
  variant: '',
  replies: [
    'Got it — logging that against the account now.',
    'Anything else you need routed? Otherwise scroll on to see the rest of the platform.',
  ],
};

/* The backlog and the script are two disjoint halves, not one array walked by
   an offset cursor. The backlog is what is already on screen at first paint;
   the script is everything still to come. Sharing one array meant playback had
   to START at the backlog length to avoid replaying it, and any path that left
   that cursor at 0 put the opening lines back on screen underneath themselves.
   Split like this there is no index the two can share, so that cannot happen. */
function buildThread(thread) {
  const seed = thread.conversation.slice(0, thread.backlog).map((message, id) => ({ ...message, id }));
  return {
    seed,
    script: thread.conversation.slice(thread.backlog),
    // Rolling window: the oldest lines drop off as new ones arrive. Comfortably
    // more than the panel shows, so nothing is culled while still on screen.
    max: seed.length + 2,
  };
}

/**
 * The interactive chat card in the dashboard. Visitors can type; the thread
 * answers with the scripted replies. State-driven, so React owns the list
 * instead of the theme script appending nodes.
 *
 * `thread` swaps the whole conversation — recipient, script, pacing and bubble
 * entrance. Home renders the default.
 */
export default function HeroChatThread({ thread = HOME_THREAD }) {
  // Memoised so the playback effect below, which depends on the thread, is not
  // handed fresh arrays on every keystroke in the composer.
  const { seed: SEED_MESSAGES, script: SCRIPT, max: MAX_MESSAGES } = useMemo(
    () => buildThread(thread),
    [thread]
  );
  /* Starts full, not empty. Playing the thread in from nothing left the panel
     visibly half-empty for the first several seconds, and clearing it to
     restart put that gap back on every lap. A chat you open mid-conversation
     is both truer to the product and never has dead space in it — so the seed
     thread is the backlog, and the effect below keeps adding to it. */
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [draft, setDraft] = useState('');
  // Whether the other party is "typing" — drives the three-dot bubble at the
  // end of the thread, the same tell the Cloud Phone dashboard uses.
  const [typing, setTyping] = useState(false);

  const listRef = useRef(null);
  const nextId = useRef(SEED_MESSAGES.length);
  const replyIndex = useRef(0);
  // How far through the script we are.
  const cursor = useRef(0);
  const timers = useRef([]);
  // Set as soon as the visitor sends anything, so the scripted playback stops
  // rather than talking over them.
  const takenOver = useRef(false);
  // Guards the seed playback against running twice. React runs effects twice
  // in development StrictMode, which queued two sets of timers and appended
  // the whole conversation a second time.
  const played = useRef(false);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /**
   * Starts the running conversation when the card first reaches the screen.
   *
   * Tied to visibility rather than mount: the hero is above the fold on most
   * screens but not all, and lines that arrived before anyone was looking are
   * lines nobody saw arrive.
   *
   * `unobserve` fires immediately and `played` guards the rest, so scrolling
   * away and back never starts a second loop racing the first.
   */
  useEffect(() => {
    const el = listRef.current;
    if (!el) return undefined;

    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      // No performance — the backlog is already on screen, so there is
      // nothing to undo. Just never start the loop.
      played.current = true;
      return undefined;
    }

    /**
     * Adds the next line to the running conversation, then queues itself.
     *
     * Walks the script straight through and stops at the end. Nothing is ever
     * cleared: new lines land at the bottom and the oldest scroll off the top,
     * which is how a chat window left open actually behaves — and it keeps the
     * panel full at every instant, including the first paint.
     */
    const runNext = () => {
      if (takenOver.current) return;
      // Every handle from the previous line has fired by now; dropping them
      // keeps the array from growing for as long as the tab stays open.
      timers.current = [];

      const source = SCRIPT[cursor.current];
      if (!source) {
        // Script spent. It does NOT wrap back to the top: looping would put a
        // line the visitor has already read back on screen, which reads as a
        // stuck widget however long the gap. Instead the thread comes to rest
        // on the dots — he is still typing, the conversation simply carries on
        // past what we show.
        setTyping(true);
        return;
      }
      cursor.current += 1;

      // Dots only ahead of a message from him — you do not watch yourself
      // type, so the visitor's own lines just land.
      if (source.kind === 'received') {
        timers.current.push(setTimeout(() => !takenOver.current && setTyping(true), thread.lead));
      }

      timers.current.push(
        setTimeout(() => {
          if (takenOver.current) return;
          setTyping(false);
          setMessages((prev) => {
            // Last line of defence. The split above should make a repeat
            // impossible, but this has come back often enough that the render
            // path refuses one outright rather than trusting the arithmetic.
            if (prev.some((m) => m.text === source.text)) return prev;
            const next = [...prev, { ...source, id: nextId.current++ }];
            return next.length > MAX_MESSAGES ? next.slice(next.length - MAX_MESSAGES) : next;
          });
          timers.current.push(setTimeout(runNext, thread.gap));
        }, source.pause)
      );
    };

    const play = () => {
      if (played.current) return;
      played.current = true;
      timers.current.push(setTimeout(runNext, 1200));
    };

    const observer = new IntersectionObserver(
      (entries, self) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          self.unobserve(entry.target);
          play();
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);

    // Backstop. The observer is throttled while the tab is in the background
    // and can be missed entirely; without this the thread would sit empty
    // forever, which is worse than never having animated it. `play()` guards
    // itself, so whichever path arrives first wins and the other is a no-op.
    const failsafe = setTimeout(play, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread]);

  // Keep the newest message in view — including the typing bubble, so the
  // thread scrolls as soon as he starts rather than when the reply lands.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);


  /* ── Composer state ────────────────────────────────────────────────────
     Everything the composer can do is local and simulated — nothing typed,
     attached or recorded ever leaves the page. */
  const [fmt, setFmt] = useState({ bold: false, italic: false, underline: false, code: false });
  const [list, setList] = useState(null); // 'ol' | 'ul' | null
  const [tray, setTray] = useState(null); // 'emoji' | 'schedule' | null
  const [recording, setRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const [votes, setVotes] = useState({});
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const recTimer = useRef(null);
  const fallbackIndex = useRef(0);

  useEffect(() => () => clearInterval(recTimer.current), []);

  const append = (kind, text, extra = {}) =>
    setMessages((prev) => {
      const next = [...prev, { id: nextId.current++, kind, text, ...extra }];
      return next.length > MAX_MESSAGES ? next.slice(next.length - MAX_MESSAGES) : next;
    });

  /** The visitor has joined in: stop the scripted talk so it never speaks over them. */
  const takeOver = () => {
    if (takenOver.current) return;
    takenOver.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyping(false);
  };

  /** Dots, then the answer — a reply that simply appears reads as canned. */
  const respond = (reply) => {
    if (!reply) return;
    timers.current.push(setTimeout(() => setTyping(true), 420));
    timers.current.push(
      setTimeout(() => {
        setTyping(false);
        append('received', reply);
      }, 1600 + Math.min(reply.length * 18, 1400) + Math.random() * 400)
    );
  };

  /** Sends a message of any type and queues the matching reply. */
  const post = (payload) => {
    takeOver();
    append('sent user-sent', payload.text || '', payload);
    respond(replyFor(payload, thread, replyIndex, fallbackIndex));
  };

  const send = () => {
    if (recording) {
      stopRecording(true);
      return;
    }
    const text = draft.trim();
    if (!text) return;
    post({ type: 'text', text, fmt: { ...fmt }, list });
    setDraft('');
    setList(null);
    setTray(null);
    inputRef.current?.focus();
  };

  // ── Toolbar ────────────────────────────────────────────────────────────
  const toggleFmt = (key) => {
    setFmt((cur) => ({ ...cur, [key]: !cur[key] }));
    inputRef.current?.focus();
  };
  const toggleList = (kind) => {
    setList((cur) => (cur === kind ? null : kind));
    inputRef.current?.focus();
  };

  // ── Attachments: picker and drag-and-drop ──────────────────────────────
  const sendFiles = (fileList) => {
    Array.from(fileList || []).slice(0, 3).forEach((file) =>
      post({ type: 'file', text: file.name, meta: { size: formatSize(file.size), ext: extOf(file.name) } })
    );
  };
  const onDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    sendFiles(event.dataTransfer?.files);
  };

  // ── Voice note (simulated — no microphone permission is requested) ─────
  const startRecording = () => {
    setTray(null);
    setRecSeconds(0);
    setRecording(true);
    clearInterval(recTimer.current);
    recTimer.current = setInterval(() => setRecSeconds((s) => (s >= 59 ? s : s + 1)), 1000);
  };
  function stopRecording(sendIt) {
    clearInterval(recTimer.current);
    setRecording(false);
    if (sendIt) post({ type: 'voice', text: 'Voice note', meta: { duration: Math.max(recSeconds, 1) } });
  }

  // ── Poll, schedule, emoji ──────────────────────────────────────────────
  const sendPoll = () => {
    const question = draft.trim() || 'Best time for the porting call?';
    post({ type: 'poll', text: question, meta: { options: ['Today, 4:00 PM', 'Tomorrow, 10:30 AM'] } });
    setDraft('');
    setTray(null);
  };
  const sendEvent = (slot) => {
    post({ type: 'event', text: 'Porting walkthrough', meta: { slot } });
    setTray(null);
  };
  const insertEmoji = (emoji) => {
    const el = inputRef.current;
    const start = el?.selectionStart ?? draft.length;
    const end = el?.selectionEnd ?? draft.length;
    const next = (draft.slice(0, start) + emoji + draft.slice(end)).slice(0, MAX_DRAFT);
    setDraft(next);
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };

  // ── AI assist: tidy the draft, or suggest a reply when it is empty ─────
  const assist = () => {
    if (aiBusy) return;
    setAiBusy(true);
    setTray(null);
    setTimeout(() => {
      setDraft((cur) => (cur.trim() ? polish(cur) : suggestFor(messages)).slice(0, MAX_DRAFT));
      setAiBusy(false);
      inputRef.current?.focus();
    }, 650);
  };

  const onKeyDown = (event) => {
    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && (key === 'b' || key === 'i' || key === 'u')) {
      event.preventDefault();
      toggleFmt({ b: 'bold', i: 'italic', u: 'underline' }[key]);
      return;
    }
    if (event.key === 'Escape') setTray(null);
    if (event.key !== 'Enter') return;
    event.preventDefault();
    send();
  };

  const canSend = recording || draft.trim().length > 0;
  const fieldClass = [
    'composer-field',
    fmt.bold && 'is-bold',
    fmt.italic && 'is-italic',
    fmt.underline && 'is-underline',
    fmt.code && 'is-code',
  ].filter(Boolean).join(' ');

  return (
    <div className={`app-chat ${thread.variant}`.trim()}>
      <div className="chat-header">
        {/* Identity block: optional avatar stack, the name, and either the
            plain Online tell or the richer presence line. A thread that
            supplies neither `avatars` nor `presence` renders exactly what
            this header rendered before. */}
        <div className="chat-header-identity">
          {thread.avatars && (
            <span className="chat-avatar-stack" aria-hidden="true">
              {thread.avatars.map((avatar) => (
                <span
                  className={`chat-stack-avatar ${avatar.ai ? 'chat-stack-avatar--ai' : ''}`.trim()}
                  key={avatar.ai ? 'ai' : avatar.initials}
                >
                  {avatar.ai ? <i className="ri-sparkling-2-fill"></i> : avatar.initials}
                </span>
              ))}
            </span>
          )}

          <div className="chat-header-info">
            <span className="chat-recipient">{thread.recipient}</span>

            {thread.presence ? (
              <span className="chat-status chat-status--live">
                <span className="chat-presence-mark"></span>
                <span className="chat-presence-label">{thread.presence.label}</span>
                <span className="chat-presence-topic">{thread.presence.topic}</span>
                <span className="chat-presence-time">{thread.presence.time}</span>
              </span>
            ) : (
              <span className="chat-status">
                <span className="status-dot"></span>Online
              </span>
            )}
          </div>
        </div>
        <div className="chat-header-actions">
          <div className="chat-action">
            <i className="ri-phone-line"></i>
          </div>
          <div className="chat-action">
            <i className="ri-vidicon-line"></i>
          </div>
          <div className="chat-action">
            <i className="ri-more-2-fill"></i>
          </div>
        </div>
      </div>

      <div className="chat-messages" id="heroChatMessages" ref={listRef} aria-live="polite">
        {messages.map((message) => (
          <div
            className={`message ${message.kind}${message.type && message.type !== 'text' ? ' message--rich' : ''}`}
            key={message.id}
          >
            <MessageBody
              message={message}
              vote={votes[message.id]}
              onVote={(i) => setVotes((cur) => ({ ...cur, [message.id]: i }))}
            />
          </div>
        ))}

        {typing && (
          <div className="message received message--typing" aria-hidden="true">
            <span className="chat-typing-dot"></span>
            <span className="chat-typing-dot"></span>
            <span className="chat-typing-dot"></span>
          </div>
        )}
      </div>

      {/* Composer: formatting toolbar, free-text field, an optional tray
          (emoji / schedule), and the action row. Every control works; see
          the handlers above. */}
      <div
        className={`chat-composer${dragOver ? ' is-dragover' : ''}${recording ? ' is-recording' : ''}`}
        onDragOver={(event) => { event.preventDefault(); setDragOver(true); }}
        onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDragOver(false); }}
        onDrop={onDrop}
      >
        <div className="composer-toolbar" role="toolbar" aria-label="Formatting">
          <button type="button" aria-label="Bold (Ctrl+B)" title="Bold (Ctrl+B)" aria-pressed={fmt.bold} onClick={() => toggleFmt('bold')}><i className="ri-bold"></i></button>
          <button type="button" aria-label="Italic (Ctrl+I)" title="Italic (Ctrl+I)" aria-pressed={fmt.italic} onClick={() => toggleFmt('italic')}><i className="ri-italic"></i></button>
          <button type="button" aria-label="Underline (Ctrl+U)" title="Underline (Ctrl+U)" aria-pressed={fmt.underline} onClick={() => toggleFmt('underline')}><i className="ri-underline"></i></button>
          <button type="button" aria-label="Code" title="Code" aria-pressed={fmt.code} onClick={() => toggleFmt('code')}><i className="ri-code-s-slash-line"></i></button>
          <span className="composer-sep" aria-hidden="true"></span>
          <button type="button" aria-label="Numbered list" title="Numbered list (separate items with commas)" aria-pressed={list === 'ol'} onClick={() => toggleList('ol')}><i className="ri-list-ordered"></i></button>
          <button type="button" aria-label="Bulleted list" title="Bulleted list (separate items with commas)" aria-pressed={list === 'ul'} onClick={() => toggleList('ul')}><i className="ri-list-unordered"></i></button>
          {list && <span className="composer-hint">Separate items with commas</span>}
        </div>

        {recording ? (
          <div className="composer-recorder" role="status">
            <span className="composer-rec-dot" aria-hidden="true"></span>
            <span className="composer-rec-label">Recording</span>
            <span className="composer-rec-time">{formatDuration(recSeconds)}</span>
            <span className="composer-rec-wave" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }}></i>)}
            </span>
            <button type="button" className="composer-rec-cancel" onClick={() => stopRecording(false)}>Cancel</button>
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            className={fieldClass}
            id="heroMessageInput"
            placeholder={dragOver ? 'Drop to attach…' : aiBusy ? 'AI is writing…' : 'Type something or drag and drop files...'}
            aria-label="Message"
            maxLength={MAX_DRAFT}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
          />
        )}

        {tray === 'emoji' && (
          <div className="composer-tray composer-tray--emoji" aria-label="Emoji">
            {EMOJI.map((emoji) => (
              <button type="button" key={emoji} onClick={() => insertEmoji(emoji)} aria-label={`Insert ${emoji}`}>{emoji}</button>
            ))}
          </div>
        )}

        {tray === 'schedule' && (
          <div className="composer-tray composer-tray--schedule" aria-label="Pick a meeting time">
            <span className="composer-tray-title"><i className="ri-calendar-event-line"></i>Propose a meeting</span>
            {SLOTS.map((slot) => (
              <button type="button" key={slot} onClick={() => sendEvent(slot)}>{slot}</button>
            ))}
          </div>
        )}

        <div className="composer-actions">
          {draft.length > MAX_DRAFT - 60 && (
            <span className="composer-count">{MAX_DRAFT - draft.length}</span>
          )}
          <input
            ref={fileRef}
            type="file"
            multiple
            hidden
            onChange={(event) => { sendFiles(event.target.files); event.target.value = ''; }}
          />
          <button type="button" aria-label="Attach file" title="Attach file" onClick={() => fileRef.current?.click()}><i className="ri-attachment-2"></i></button>
          <button type="button" aria-label={recording ? 'Stop and send voice note' : 'Record voice note'} title="Voice note" aria-pressed={recording} onClick={() => (recording ? stopRecording(true) : startRecording())}><i className={recording ? 'ri-stop-circle-line' : 'ri-mic-line'}></i></button>
          <button type="button" aria-label="Create poll" title="Poll (uses your text as the question)" onClick={sendPoll}><i className="ri-bar-chart-2-line"></i></button>
          <button type="button" aria-label="Schedule a meeting" title="Schedule" aria-pressed={tray === 'schedule'} onClick={() => setTray((t) => (t === 'schedule' ? null : 'schedule'))}><i className="ri-calendar-line"></i></button>
          <button type="button" aria-label="Emoji" title="Emoji" aria-pressed={tray === 'emoji'} onClick={() => setTray((t) => (t === 'emoji' ? null : 'emoji'))}><i className="ri-emotion-line"></i></button>
          <button type="button" aria-label="AI assist" title={draft.trim() ? 'AI: polish my message' : 'AI: suggest a reply'} className={aiBusy ? 'is-busy' : undefined} onClick={assist}><i className="ri-sparkling-line"></i></button>
          <button className={`composer-send${canSend ? ' is-ready' : ''}`} id="heroSendBtn" type="button" aria-label="Send message" disabled={!canSend} onClick={send}>
            <i className="ri-send-plane-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══ Composer helpers ═════════════════════════════════════════════════════ */

const MAX_DRAFT = 280;
const EMOJI = ['👍', '🙏', '😊', '🎉', '✅', '🔥', '👋', '📞', '📅', '💬', '🚀', '❤️'];
const SLOTS = ['Today · 4:00 PM', 'Tomorrow · 10:30 AM', 'Friday · 2:00 PM'];

/* Keyword replies, first match wins. Broad enough that whatever a visitor
   tries — pricing, porting, the AI, a demo — gets an on-topic answer. */
const REPLY_RULES = [
  // A bare greeting only — "hi, how much is it?" should get the pricing answer.
  [/^\s*(hi|hello|hey|hiya|namaste|good (morning|afternoon|evening))\b[\s!.,👋]*$/i, 'Hey! 👋 What can I help with — calls, texts or the AI receptionist?'],
  [/(\$|\b(price|pricing|cost|plan|plans|how much)\b)/i, 'Plans start at $99/mo with unlimited calling and the AI receptionist included. Want the comparison sheet?'],
  [/\b(port|porting|transfer|move|number)\b/i, 'Porting is free and usually done in 3–5 business days. Your number keeps ringing the whole time.'],
  [/\b(ai|receptionist|bot|agent|automat\w*)\b/i, 'The AI picks up 24/7, qualifies the caller and books straight into your calendar. A summary lands after every call.'],
  [/\b(demo|trial|meeting|call me|book|schedule)\b/i, 'Happy to set that up. Tap the calendar icon below and pick a slot that suits you.'],
  [/\b(sms|text|texts|whatsapp|message)\b/i, 'Calls, texts and voicemail all land in one inbox, on the same number.'],
  [/\b(video|zoom|meet)\b/i, 'Video meetings are built in: one click from any chat, recorded and transcribed.'],
  [/\b(crm|hubspot|salesforce|zoho|integrat\w*)\b/i, 'It syncs with HubSpot, Salesforce, Zoho and more, so every call and note lands in your CRM.'],
  [/\b(thanks|thank you|thx|ty|great|perfect|awesome)\b/i, 'Anytime! Shout if anything else comes up. 🙌'],
  [/\?\s*$/, 'Good question. Let me check with the team and get back to you within the hour.'],
];

const GENERIC_REPLIES = [
  'Got it — logging that against the account now.',
  'Makes sense. I’ve added it to the notes for the team.',
  'On it. You’ll get a confirmation by text shortly.',
  'Noted! Anything else before Friday’s switch-over?',
];

function replyFor(payload, thread, replyIndex, fallbackIndex) {
  switch (payload.type) {
    case 'file':
      return `Got “${payload.text}” — attached it to the account. 📎`;
    case 'voice':
      return 'Thanks for the voice note — transcribed and added to the call notes.';
    case 'poll':
      return 'Voted ✅ The first option works best on our side.';
    case 'event':
      return `Accepted — see you ${payload.meta.slot.replace(' · ', ' at ')}. Invite on its way 📅`;
    default: {
      const hit = REPLY_RULES.find(([re]) => re.test(payload.text));
      if (hit) return hit[1];
      // The thread's own scripted replies first, then a rotating set.
      const scripted = thread.replies?.[replyIndex.current];
      if (scripted !== undefined) {
        replyIndex.current += 1;
        return scripted;
      }
      const generic = GENERIC_REPLIES[fallbackIndex.current % GENERIC_REPLIES.length];
      fallbackIndex.current += 1;
      return generic;
    }
  }
}

/* "AI assist" on a draft: expands chat shorthand, fixes capitals and closes
   the sentence. Deterministic, so it always does something sensible. */
const SHORTHAND = [
  [/\bu\b/gi, 'you'], [/\bur\b/gi, 'your'], [/\br\b/gi, 'are'], [/\b(pls|plz)\b/gi, 'please'],
  [/\b(thx|ty)\b/gi, 'thanks'], [/\btmrw\b/gi, 'tomorrow'], [/\bbtw\b/gi, 'by the way'],
  [/\bi\b/g, 'I'], [/\bim\b/gi, 'I’m'], [/\bdont\b/gi, 'don’t'], [/\bcant\b/gi, 'can’t'],
  [/\s{2,}/g, ' '],
];
function polish(text) {
  let out = text.trim();
  SHORTHAND.forEach(([re, to]) => { out = out.replace(re, to); });
  out = out.charAt(0).toUpperCase() + out.slice(1);
  if (!/[.!?…]$/.test(out)) {
    out += /^(what|when|where|why|how|can|could|do|does|is|are|will|would)\b/i.test(out) ? '?' : '.';
  }
  return out;
}

function suggestFor(messages) {
  const last = [...messages].reverse().find((m) => m.kind === 'received');
  const text = last?.text || '';
  if (/porting|number/i.test(text)) return 'Great — can you send over the porting form?';
  if (/calendar|book|slot|demo/i.test(text)) return 'Perfect, tomorrow morning works for us.';
  if (/plan|\$|price/i.test(text)) return 'Yes please, send the comparison over.';
  if (/\?\s*$/.test(text)) return 'Yes — let’s go ahead with that.';
  return 'Sounds good, thanks for the quick help!';
}

function formatSize(bytes) {
  if (typeof bytes !== 'number') return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extOf(name) {
  const m = /\.([a-z0-9]{1,5})$/i.exec(name || '');
  return m ? m[1].toUpperCase() : 'FILE';
}

function formatDuration(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/* Renders one bubble: plain/formatted text, a list, or a rich card. */
function MessageBody({ message, vote, onVote }) {
  const { type = 'text', text, fmt, list, meta } = message;

  if (type === 'file') {
    return (
      <span className="msg-file">
        <span className="msg-file-ic">{meta.ext}</span>
        <span className="msg-file-txt"><b>{text}</b><em>{meta.size}</em></span>
        <i className="ri-download-2-line" aria-hidden="true"></i>
      </span>
    );
  }

  if (type === 'voice') {
    return (
      <span className="msg-voice">
        <i className="ri-play-fill" aria-hidden="true"></i>
        <span className="msg-voice-wave" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ height: `${30 + ((i * 37) % 70)}%` }}></i>)}
        </span>
        <em>{formatDuration(meta.duration)}</em>
      </span>
    );
  }

  if (type === 'poll') {
    return (
      <span className="msg-poll">
        <span className="msg-poll-q"><i className="ri-bar-chart-2-line" aria-hidden="true"></i>{text}</span>
        {meta.options.map((option, i) => (
          <button
            type="button"
            key={option}
            className={`msg-poll-opt${vote === i ? ' is-voted' : ''}`}
            onClick={() => onVote(i)}
            aria-pressed={vote === i}
          >
            <span>{option}</span>
            <span className="msg-poll-pct">{vote === undefined ? '' : vote === i ? '100%' : '0%'}</span>
          </button>
        ))}
      </span>
    );
  }

  if (type === 'event') {
    return (
      <span className="msg-event">
        <span className="msg-event-ic"><i className="ri-calendar-event-fill" aria-hidden="true"></i></span>
        <span className="msg-event-txt"><b>{text}</b><em>{meta.slot} · 20 min</em></span>
      </span>
    );
  }

  const cls = fmt
    ? ['msg-text', fmt.bold && 'is-bold', fmt.italic && 'is-italic', fmt.underline && 'is-underline'].filter(Boolean).join(' ')
    : undefined;
  const wrap = (content) => (fmt?.code ? <code className="msg-code">{content}</code> : content);

  if (list) {
    const items = text.split(/\s*[,;\n]\s*/).filter(Boolean);
    const List = list;
    return (
      <List className={`msg-list ${cls || ''}`.trim()}>
        {items.map((item, i) => <li key={i}>{wrap(item)}</li>)}
      </List>
    );
  }

  return <span className={cls}>{wrap(text)}</span>;
}
