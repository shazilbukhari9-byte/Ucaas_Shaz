'use client';
/* Working hero mockup for the Call Recording page: a recording as it appears
   in the app, with real audio. Play / pause, speed and mute drive an actual
   <audio> element (public/media/call-recording-demo.wav — a short demo call
   voiced with two synthetic voices, with beeps where the card details were
   redacted). The waveform is the recording's own and is clickable to seek;
   keyword matches are pinned on it; the transcript follows the audio and
   any line can be clicked to jump there; the search box re-highlights
   matches as you type. The file only loads when someone presses play. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { DEMO_AUDIO, DEMO_DURATION, DEMO_STARTS, DEMO_WAVE } from './recordingDemo';

const DURATION = DEMO_DURATION;

// Each part is plain text or a redacted token ({ r: label, t: shown text }).
// Start times come from the audio file (recordingDemo.js).
const LINES = [
  { who: 'agent', name: 'Sam', parts: ['Thanks for calling Acme Dental, this is Sam. How can I help?'] },
  { who: 'caller', name: 'Caller', parts: ['Hi — I was charged twice for my cleaning, so I’d like a refund for one of them.'] },
  { who: 'agent', name: 'Sam', parts: ['Sorry about that. Can you confirm the card on file?'] },
  { who: 'caller', name: 'Caller', parts: ['Sure, it’s ', { r: 'PCI', t: '•••• •••• •••• 4821' }, ', expiring ', { r: 'PCI', t: '••/••' }, '.'] },
  { who: 'agent', name: 'Sam', parts: ['Thanks. I can see the duplicate charge — I’ve issued the refund now.'] },
  { who: 'caller', name: 'Caller', parts: ['Great. How long does a refund usually take?'] },
  { who: 'agent', name: 'Sam', parts: ['Three to five business days. You’ll get an email confirmation as well.'] },
  { who: 'caller', name: 'Caller', parts: ['Perfect, thank you for sorting that out so quickly.'] },
].map((l, i) => ({ ...l, at: DEMO_STARTS[i] }));

const SUGGEST = ['refund', 'card', 'email'];
const SPEEDS = [1, 1.5, 2];

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const textOf = (l) => l.parts.map((p) => (typeof p === 'string' ? p : '')).join('');

// The recording's own loudness, as whole percentages per bar.
const WAVE = DEMO_WAVE;
const BARS = WAVE.length;

function Highlight({ text, q }) {
  if (!q) return text;
  const out = [];
  const lower = text.toLowerCase();
  let i = 0;
  let hit = lower.indexOf(q, i);
  while (hit !== -1) {
    if (hit > i) out.push(text.slice(i, hit));
    out.push(<mark key={hit}>{text.slice(hit, hit + q.length)}</mark>);
    i = hit + q.length;
    hit = lower.indexOf(q, i);
  }
  if (i < text.length) out.push(text.slice(i));
  return out;
}

export default function RecordingMock({ page }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [query, setQuery] = useState('refund');
  const [toast, setToast] = useState('');
  const listRef = useRef(null);
  const audioRef = useRef(null);
  const q = query.trim().toLowerCase();

  // Follow the audio smoothly while it plays (timeupdate alone is ~4 fps).
  useEffect(() => {
    if (!playing) return undefined;
    let raf = 0;
    const step = () => {
      const a = audioRef.current;
      if (a) setT(a.currentTime);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // Pause when the tab is hidden; stop on unmount.
  useEffect(() => {
    const onHide = () => { if (document.hidden) audioRef.current?.pause(); };
    document.addEventListener('visibilitychange', onHide);
    return () => { document.removeEventListener('visibilitychange', onHide); audioRef.current?.pause(); };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      if (a.ended || a.currentTime >= DURATION - 0.05) a.currentTime = 0;
      a.playbackRate = speed;
      const p = a.play();
      if (p) p.catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  };
  const changeSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  };

  const matches = useMemo(
    () => (q.length < 2 ? [] : LINES.filter((l) => textOf(l).toLowerCase().includes(q))),
    [q],
  );
  const active = LINES.reduce((acc, l, i) => (l.at <= t ? i : acc), 0);

  // Keep the active line in view inside the transcript window.
  useEffect(() => {
    const box = listRef.current;
    const el = box?.children[active];
    if (box && el) box.scrollTo({ top: Math.max(0, el.offsetTop - 6), behavior: 'smooth' });
  }, [active]);

  const seek = (sec) => {
    const to = Math.max(0, Math.min(DURATION - 0.1, sec));
    setT(to);
    const a = audioRef.current;
    if (a) {
      // Seeking before the file has loaded: load it first, then jump.
      if (a.readyState < 1) {
        a.preload = 'auto';
        a.load();
        a.addEventListener('loadedmetadata', () => { a.currentTime = to; }, { once: true });
      } else {
        a.currentTime = to;
      }
    }
  };
  const onWave = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    seek(((e.clientX - r.left) / r.width) * DURATION);
  };
  const nextMatch = () => {
    if (!matches.length) return;
    const after = matches.find((m) => m.at > t + 0.5) || matches[0];
    seek(after.at);
  };
  const exportIt = () => {
    setToast('Export logged to the audit trail');
    setTimeout(() => setToast(''), 2200);
  };

  const played = t / DURATION;

  return (
    <div className="rcm" role="region" aria-label="Interactive call recording demo">
      <div className="rcm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="rcm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          {page.title}
        </span>
        <span className="rcm-enc"><i className="ri-lock-2-fill" aria-hidden="true"></i>Encrypted</span>
      </div>

      <div className="rcm-meta">
        <span><b>REC-24817</b> · Acme Dental · Inbound</span>
        <span className="rcm-tags"><em className="rcm-tag rcm-tag--red"><i aria-hidden="true"></i>PII redacted</em></span>
      </div>

      <label className="rcm-search">
        <i className="ri-search-line" aria-hidden="true"></i>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search this call…"
          aria-label="Search the transcript"
        />
        <span className="rcm-count">{q.length < 2 ? '—' : `${matches.length} ${matches.length === 1 ? 'match' : 'matches'}`}</span>
        <button type="button" className="rcm-next" onClick={nextMatch} disabled={!matches.length} aria-label="Next match">
          <i className="ri-arrow-down-s-line" aria-hidden="true"></i>
        </button>
      </label>
      <div className="rcm-suggest">
        {SUGGEST.map((s) => (
          <button type="button" key={s} className={q === s ? 'is-on' : ''} onClick={() => setQuery(s)}>{s}</button>
        ))}
      </div>

      <div className="rcm-player">
        <button
          type="button"
          className="rcm-play"
          onClick={toggle}
          aria-label={playing ? 'Pause recording' : 'Play recording'}
        >
          {loading
            ? <span className="rcm-spin" aria-hidden="true"></span>
            : <i className={playing ? 'ri-pause-fill' : 'ri-play-fill'} aria-hidden="true"></i>}
        </button>
        <div className="rcm-wave" onClick={onWave} role="slider" aria-label="Playback position" aria-valuemin={0} aria-valuemax={DURATION} aria-valuenow={Math.round(t)} tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'ArrowRight') seek(t + 5); if (e.key === 'ArrowLeft') seek(t - 5); }}>
          {WAVE.map((h, i) => (
            <i key={i} className={i / BARS <= played ? 'is-played' : ''} style={{ height: `${h}%` }}></i>
          ))}
          {matches.map((m) => (
            <span key={m.at} className="rcm-pin" style={{ left: `${(m.at / DURATION) * 100}%` }} aria-hidden="true"></span>
          ))}
          <span className="rcm-head-line" style={{ left: `${played * 100}%` }} aria-hidden="true"></span>
        </div>
        <span className="rcm-time">{mmss(t)}<em> / {mmss(DURATION)}</em></span>
        <button
          type="button"
          className="rcm-speed"
          onClick={changeSpeed}
          aria-label={`Playback speed ${speed}×`}
        >
          {speed}×
        </button>
        <button type="button" className="rcm-mute" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted}>
          <i className={muted ? 'ri-volume-mute-line' : 'ri-volume-up-line'} aria-hidden="true"></i>
        </button>
        <audio
          ref={audioRef}
          src={DEMO_AUDIO}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => { setPlaying(false); setT(audioRef.current?.currentTime || 0); }}
          onEnded={() => { setPlaying(false); setLoading(false); }}
          onWaiting={() => setLoading(true)}
          onPlaying={() => setLoading(false)}
          onCanPlay={() => setLoading(false)}
          onSeeked={() => setT(audioRef.current?.currentTime || 0)}
        />
      </div>

      <ol className="rcm-lines" ref={listRef}>
        {LINES.map((l, i) => (
          <li key={l.at} className={`rcm-line rcm-line--${l.who}${i === active ? ' is-on' : ''}`}>
            <button type="button" onClick={() => seek(l.at)}>
              <span className="rcm-av" aria-hidden="true">{l.who === 'agent' ? 'S' : 'C'}</span>
              <span className="rcm-line-body">
                <span className="rcm-line-top"><b>{l.name}</b><em>{mmss(l.at)}</em></span>
                <span className="rcm-line-text">
                  {l.parts.map((p, k) => (typeof p === 'string'
                    ? <Highlight key={k} text={p} q={q.length < 2 ? '' : q} />
                    : <span key={k} className="rcm-red"><span>{p.t}</span><em>{p.r}</em></span>))}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="rcm-foot">
        <span className="rcm-foot-item"><i className="ri-translate-2" aria-hidden="true"></i>Transcript · English</span>
        <span className="rcm-foot-item"><i className="ri-file-list-3-line" aria-hidden="true"></i>Audit logged</span>
        <button type="button" className="rcm-export" onClick={exportIt}>
          <i className="ri-download-2-line" aria-hidden="true"></i>Export
        </button>
        {toast && <span className="rcm-toast" role="status"><i className="ri-check-line" aria-hidden="true"></i>{toast}</span>}
      </div>
    </div>
  );
}
