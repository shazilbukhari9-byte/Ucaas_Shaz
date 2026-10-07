'use client';
/* Working hero mockup for the Team Chat page — a small, fully interactive
   chat client:
   - switch channels and DMs (unread counts clear when opened);
   - send messages (Enter or the send button); teammates type and reply
     based on what you wrote, and replies in other channels raise unread;
   - @mention with the suggestion list (mouse or ↑ ↓ Enter / Tab);
   - add emoji from the picker, attach a file (sent as a file card);
   - react to any message from the hover bar, toggle reactions;
   - join the huddle a teammate starts, mute your mic, leave.
   A short scripted exchange plays once on load. Nothing leaves the page. */
import { useEffect, useRef, useState } from 'react';

const PEOPLE = {
  PS: { name: 'Priya S.', tone: 'orange' },
  DO: { name: 'Daniel O.', tone: 'blue' },
  MK: { name: 'Maya K.', tone: 'violet' },
  YO: { name: 'You', tone: 'teal' },
};

const CHANNELS = [
  { id: 'deal-acme', label: 'deal-acme', members: 8, crew: ['PS', 'DO'] },
  { id: 'cs-renewals', label: 'cs-renewals', members: 12, crew: ['MK', 'DO'] },
  { id: 'general', label: 'general', members: 64, crew: ['MK', 'PS', 'DO'] },
  { id: 'wins', label: 'wins', members: 64, crew: ['PS', 'DO', 'MK'] },
];
const DMS = [
  { id: 'dm-priya', who: 'PS', status: 'active' },
  { id: 'dm-daniel', who: 'DO', status: 'call' },
];

// Message ids must stay unique for the life of the component — including
// across hot reloads, where a module-level counter would restart at 1 while
// existing messages keep their ids. Seed messages get fixed ids (identical on
// server and client); new ones get a time-based id plus a per-call sequence.
let seq = 0;
const newId = () => `m-${Date.now().toString(36)}-${(seq += 1).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const m = (who, at, text, extra = {}) => ({ who, at, text, reactions: {}, ...extra, id: extra.id || newId() });

const SEED = () => ({
  'deal-acme': [m('PS', '10:42', 'Quick one — Sarah at Acme is asking about a multi-year discount on the renewal.', { id: 'seed-deal-1' })],
  'cs-renewals': [
    m('MK', '09:15', 'Three renewals due this week — all on track.', { id: 'seed-cs-1' }),
    m('DO', '09:20', 'Nice. I’ll take the Northwind call at 2.', { id: 'seed-cs-2', reactions: { '👍': { n: 2, mine: false } } }),
  ],
  general: [m('MK', '08:30', 'Office is closed Friday for the holiday 🎉', { id: 'seed-gen-1', reactions: { '🎉': { n: 9, mine: false } } })],
  wins: [
    m('PS', 'Yesterday', 'Closed Lattice — 40 seats! 🚀', { id: 'seed-wins-1', reactions: { '🔥': { n: 12, mine: false }, '👏': { n: 7, mine: false } } }),
    m('DO', 'Yesterday', 'Huge, congrats!', { id: 'seed-wins-2' }),
  ],
  'dm-priya': [m('PS', '10:05', 'Can you review the Acme quote before 3?', { id: 'seed-dmp-1' })],
  'dm-daniel': [m('DO', '09:58', 'On a customer call — back in 10.', { id: 'seed-dmd-1' })],
});

const MENTIONS = ['PS', 'DO', 'MK'];
const QUICK = ['👍', '❤️', '🎉', '😂'];
const EMOJI = ['👍', '🙌', '🎉', '🔥', '✅', '😊', '🙏', '👀'];
const FILES = [
  { name: 'acme-renewal-quote.pdf', size: '240 KB', icon: 'ri-file-pdf-2-line', tone: 'red' },
  { name: 'q2-pipeline.xlsx', size: '86 KB', icon: 'ri-file-excel-2-line', tone: 'green' },
  { name: 'call-notes.docx', size: '32 KB', icon: 'ri-file-word-2-line', tone: 'blue' },
];

function replyFor(text) {
  const t = text.toLowerCase();
  if (/huddle|call|join|talk/.test(t)) return 'Sure — jumping in now 🎧';
  if (/discount|price|pricing|quote|%/.test(t)) return 'I’d offer 10% for a two-year term. I’ll draft it now.';
  if (/thank|thanks|thx/.test(t)) return 'Anytime! 🙌';
  if (/^(hi|hey|hello)\b/.test(t)) return 'Hey! What’s up?';
  if (/\.(pdf|xlsx|docx)$/.test(t)) return 'Got the file — reviewing now 👀';
  if (t.includes('?')) return 'Good question — let me check and come back in a minute.';
  return 'Got it 👍';
}

const clock = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function Av({ who, small }) {
  const p = PEOPLE[who];
  return <span className={`tcm-av tcm-av--${p.tone}${small ? ' tcm-av--sm' : ''}`}>{who}</span>;
}

export default function TeamChatMock({ page }) {
  const [chan, setChan] = useState('deal-acme');
  const [msgs, setMsgs] = useState(SEED);
  const [typing, setTyping] = useState({}); // channel id -> who
  const [huddle, setHuddle] = useState(null); // null | 'live' | 'joined'
  const [micOff, setMicOff] = useState(false);
  const [secs, setSecs] = useState(0);
  const [draft, setDraft] = useState('');
  const [unread, setUnread] = useState({ 'cs-renewals': 2 });
  const [mIdx, setMIdx] = useState(0);
  const [panel, setPanel] = useState(null); // null | 'emoji' | 'files'
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const chanRef = useRef(chan);
  const timers = useRef([]);
  chanRef.current = chan;

  const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const push = (id, msg) => {
    setMsgs((cur) => ({ ...cur, [id]: [...cur[id], msg] }));
    if (id !== chanRef.current) setUnread((u) => ({ ...u, [id]: (u[id] || 0) + 1 }));
  };

  // A teammate types, then replies.
  const replyIn = (id, who, text, wait = 900) => {
    later(() => setTyping((t) => ({ ...t, [id]: who })), wait);
    later(() => {
      setTyping((t) => { const n = { ...t }; delete n[id]; return n; });
      push(id, m(who, clock(), text));
    }, wait + 1500);
  };

  // One short scripted exchange in #deal-acme.
  useEffect(() => {
    replyIn('deal-acme', 'DO', 'I have her contract open. Want to huddle?', 1200);
    later(() => { push('deal-acme', m('DO', '10:43', '', { system: 'started a huddle' })); setHuddle('live'); }, 4300);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!huddle) return undefined;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [huddle]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [msgs, chan, typing, huddle]);

  const open = (id) => { setChan(id); setUnread((u) => ({ ...u, [id]: 0 })); setPanel(null); };

  const responder = (id) => {
    if (id.startsWith('dm-')) return DMS.find((d) => d.id === id).who;
    const crew = CHANNELS.find((c) => c.id === id).crew;
    return crew[Math.floor(Math.random() * crew.length)];
  };

  const sendText = (text, extra) => {
    push(chan, m('YO', clock(), text, extra));
    replyIn(chan, responder(chan), replyFor(extra?.file ? extra.file.name : text));
  };
  const send = (e) => {
    e?.preventDefault();
    const text = draft.trim();
    if (!text) return;
    sendText(text);
    setDraft('');
    setPanel(null);
  };

  const mentionQuery = (draft.match(/(?:^|\s)@(\w*)$/) || [])[1];
  const mentionList = mentionQuery == null ? [] : MENTIONS.filter((w) => PEOPLE[w].name.toLowerCase().startsWith(mentionQuery.toLowerCase()));
  const addMention = (who) => {
    setDraft((d) => d.replace(/@\w*$/, `@${PEOPLE[who].name.split(' ')[0]} `));
    setMIdx(0);
    inputRef.current?.focus();
  };
  const onKey = (e) => {
    if (!mentionList.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setMIdx((i) => (i + 1) % mentionList.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setMIdx((i) => (i - 1 + mentionList.length) % mentionList.length); }
    else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); addMention(mentionList[Math.min(mIdx, mentionList.length - 1)]); }
    else if (e.key === 'Escape') setDraft((d) => d.replace(/@\w*$/, ''));
  };

  const react = (msgId, emoji) => {
    setMsgs((cur) => ({
      ...cur,
      [chan]: cur[chan].map((x) => {
        if (x.id !== msgId) return x;
        const r = { ...x.reactions };
        const cur1 = r[emoji] || { n: 0, mine: false };
        const next = cur1.mine ? { n: cur1.n - 1, mine: false } : { n: cur1.n + 1, mine: true };
        if (next.n <= 0) delete r[emoji]; else r[emoji] = next;
        return { ...x, reactions: r };
      }),
    }));
  };

  const attach = (f) => { sendText(f.name, { file: f }); setPanel(null); };
  const addEmoji = (e) => { setDraft((d) => `${d}${e}`); inputRef.current?.focus(); };

  const toggleHuddle = () => {
    if (chan !== 'deal-acme') open('deal-acme');
    if (!huddle) { setHuddle('joined'); setSecs(0); push('deal-acme', m('YO', clock(), '', { system: 'started a huddle' })); return; }
    setHuddle(huddle === 'joined' ? 'live' : 'joined');
    if (huddle !== 'joined') setMicOff(false);
  };

  const isDm = chan.startsWith('dm-');
  const ch = CHANNELS.find((c) => c.id === chan);
  const dm = DMS.find((d) => d.id === chan);
  const title = isDm ? PEOPLE[dm.who].name : `# ${ch.label}`;
  const sub = isDm ? (dm.status === 'call' ? 'On a call' : 'Active now') : `${ch.members} members`;
  const inHuddle = huddle && chan === 'deal-acme';
  const typer = typing[chan];

  return (
    <div className="tcm" role="region" aria-label="Interactive team chat demo">
      <div className="tcm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="tcm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          {page.title}
        </span>
        <span className="tcm-live"><i aria-hidden="true"></i>3 online</span>
      </div>

      <div className="tcm-body">
        <nav className="tcm-side" aria-label="Channels">
          <span className="tcm-side-label">Channels</span>
          {CHANNELS.map((c) => (
            <button key={c.id} type="button" className={`tcm-chan${chan === c.id ? ' is-on' : ''}${unread[c.id] ? ' is-unread' : ''}`} onClick={() => open(c.id)}>
              <span><i aria-hidden="true">#</i>{c.label}</span>
              <span className="tcm-chan-meta">
                {c.id === 'deal-acme' && huddle && <i className="ri-headphone-fill tcm-chan-huddle" aria-label="Huddle live"></i>}
                {unread[c.id] > 0 && <em>{unread[c.id]}</em>}
              </span>
            </button>
          ))}
          <span className="tcm-side-label">Direct</span>
          {DMS.map((d) => (
            <button key={d.id} type="button" className={`tcm-chan${chan === d.id ? ' is-on' : ''}${unread[d.id] ? ' is-unread' : ''}`} onClick={() => open(d.id)}>
              <span><i className={`tcm-dot tcm-dot--${d.status}`} aria-hidden="true"></i>{PEOPLE[d.who].name}</span>
              {unread[d.id] > 0 && <em>{unread[d.id]}</em>}
            </button>
          ))}
        </nav>

        <div className="tcm-main">
          <div className="tcm-bar">
            <span className="tcm-bar-title"><b>{title}</b><em>{sub}</em></span>
            <button type="button" className={`tcm-huddle-btn${inHuddle ? ' is-live' : ''}${huddle === 'joined' && inHuddle ? ' is-joined' : ''}`} onClick={toggleHuddle}>
              <i className="ri-headphone-line" aria-hidden="true"></i>{huddle === 'joined' ? 'Leave' : huddle ? 'Join huddle' : 'Huddle'}
            </button>
          </div>

          {inHuddle && (
            <div className={`tcm-huddle${huddle === 'joined' ? ' is-joined' : ''}`}>
              <span className="tcm-huddle-avs">
                <Av who="DO" small /><Av who="PS" small />{huddle === 'joined' && <Av who="YO" small />}
              </span>
              <span className="tcm-huddle-txt">
                <b>{huddle === 'joined' ? (micOff ? 'You’re muted' : 'You’re in the huddle') : 'Huddle live'}</b>
                <em>{huddle === 'joined' ? 3 : 2} people · {mmss(secs)}</em>
              </span>
              {huddle === 'joined' ? (
                <span className="tcm-huddle-ctl">
                  <button type="button" className={micOff ? 'is-off' : ''} onClick={() => setMicOff(!micOff)} aria-label={micOff ? 'Unmute microphone' : 'Mute microphone'} aria-pressed={micOff}>
                    <i className={micOff ? 'ri-mic-off-line' : 'ri-mic-line'} aria-hidden="true"></i>
                  </button>
                  <button type="button" className="is-leave" onClick={() => setHuddle('live')} aria-label="Leave huddle">
                    <i className="ri-phone-fill" aria-hidden="true"></i>
                  </button>
                </span>
              ) : <span className="tcm-wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span>}
            </div>
          )}

          <ol className="tcm-msgs" ref={listRef}>
            {msgs[chan].map((x) => (x.system ? (
              <li key={x.id} className="tcm-sys"><i className="ri-headphone-line" aria-hidden="true"></i>{PEOPLE[x.who].name} {x.system}</li>
            ) : (
              <li key={x.id} className={`tcm-msg${x.who === 'YO' ? ' is-me' : ''}`}>
                <Av who={x.who} />
                <span className="tcm-msg-body">
                  <span className="tcm-msg-top"><b>{PEOPLE[x.who].name}</b><em>{x.at}</em></span>
                  {x.file ? (
                    <span className={`tcm-file tcm-file--${x.file.tone}`}>
                      <i className={x.file.icon} aria-hidden="true"></i>
                      <span><b>{x.file.name}</b><em>{x.file.size}</em></span>
                      <i className="ri-download-2-line tcm-file-dl" aria-hidden="true"></i>
                    </span>
                  ) : <span className="tcm-msg-text">{x.text}</span>}
                  {Object.keys(x.reactions).length > 0 && (
                    <span className="tcm-reacts">
                      {Object.entries(x.reactions).map(([e, r]) => (
                        <button key={e} type="button" className={r.mine ? 'is-mine' : ''} onClick={() => react(x.id, e)} aria-pressed={r.mine}>
                          {e} <b>{r.n}</b>
                        </button>
                      ))}
                    </span>
                  )}
                </span>
                <span className="tcm-quick" role="group" aria-label="React">
                  {QUICK.map((e) => <button key={e} type="button" onClick={() => react(x.id, e)} aria-label={`React ${e}`}>{e}</button>)}
                </span>
              </li>
            )))}
            {typer && (
              <li className="tcm-typing"><Av who={typer} small /><span><i></i><i></i><i></i></span><em>{PEOPLE[typer].name.split(' ')[0]} is typing…</em></li>
            )}
          </ol>

          <form className="tcm-compose" onSubmit={send}>
            {mentionList.length > 0 && (
              <div className="tcm-mention" role="listbox" aria-label="Mention a teammate">
                {mentionList.map((w, i) => (
                  <button key={w} type="button" role="option" aria-selected={i === mIdx} className={i === mIdx ? 'is-on' : ''} onMouseEnter={() => setMIdx(i)} onClick={() => addMention(w)}>
                    <Av who={w} small />{PEOPLE[w].name}
                  </button>
                ))}
              </div>
            )}
            {panel === 'emoji' && (
              <div className="tcm-pop tcm-pop--emoji" role="listbox" aria-label="Emoji">
                {EMOJI.map((e) => <button key={e} type="button" onClick={() => addEmoji(e)} aria-label={`Insert ${e}`}>{e}</button>)}
              </div>
            )}
            {panel === 'files' && (
              <div className="tcm-pop tcm-pop--files" role="listbox" aria-label="Attach a file">
                {FILES.map((f) => (
                  <button key={f.name} type="button" className={`tcm-file tcm-file--${f.tone}`} onClick={() => attach(f)}>
                    <i className={f.icon} aria-hidden="true"></i>
                    <span><b>{f.name}</b><em>{f.size}</em></span>
                  </button>
                ))}
              </div>
            )}
            <button type="button" className={`tcm-tool${panel === 'files' ? ' is-on' : ''}`} onClick={() => setPanel(panel === 'files' ? null : 'files')} aria-label="Attach a file">
              <i className="ri-attachment-2" aria-hidden="true"></i>
            </button>
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => { setDraft(e.target.value); setMIdx(0); }}
              onKeyDown={onKey}
              placeholder={`Message ${title}`}
              aria-label="Message"
            />
            <button type="button" className={`tcm-tool${panel === 'emoji' ? ' is-on' : ''}`} onClick={() => setPanel(panel === 'emoji' ? null : 'emoji')} aria-label="Emoji">
              <i className="ri-emotion-happy-line" aria-hidden="true"></i>
            </button>
            <button type="submit" className="tcm-send" disabled={!draft.trim()} aria-label="Send">
              <i className="ri-send-plane-2-fill" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
