'use client';
/* Interactive sections for the AI Receptionist page:
   - DayOfCalls: an example day of calls by hour, with and without the AI.
   - JobsDemo: the five jobs on every call, stepping through each output.
   - LanguagesDemo: pick a language and see the greeting in it.
   - HandoffRules: switch hand-off rules on and off; sample calls re-route. */
import { useEffect, useState } from 'react';

/* ── A day of calls ───────────────────────────────────────────────────── */
// Example volumes per hour (00–23). Front desk covers 9–17 and can take
// at most CAP calls an hour; the rest go to voicemail without the AI.
const DAY = [1, 0, 0, 0, 0, 1, 2, 4, 7, 11, 13, 12, 9, 12, 14, 11, 9, 7, 6, 5, 4, 3, 2, 1];
const CAP = 10;
const OPEN = 9;
const CLOSE = 17;

export function DayOfCalls({ data }) {
  const [ai, setAi] = useState(true);
  const rows = DAY.map((n, h) => {
    const open = h >= OPEN && h < CLOSE;
    const staff = open ? Math.min(n, CAP) : 0;
    return { h, n, staff, rest: n - staff };
  });
  const total = DAY.reduce((a, b) => a + b, 0);
  const missed = rows.reduce((a, r) => a + r.rest, 0);
  const max = Math.max(...DAY);

  return (
    <section className="lp-section ar-day-sec">
      <div className="lp-wrap">
        <div className="ar-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="ar-day reveal reveal-delay-1">
          <div className="ar-day-top">
            <div className="ar-day-toggle" role="group" aria-label="Compare">
              <button type="button" className={!ai ? 'is-on' : ''} aria-pressed={!ai} onClick={() => setAi(false)}>Front desk only</button>
              <button type="button" className={ai ? 'is-on' : ''} aria-pressed={ai} onClick={() => setAi(true)}>With AI receptionist</button>
            </div>
            <div className="ar-day-sum" aria-live="polite">
              <b>{ai ? total : total - missed}</b><span>of {total} calls answered</span>
              {!ai && <em>{missed} went to voicemail</em>}
              {ai && <em className="is-ok">{missed} picked up by AI</em>}
            </div>
          </div>
          <div className="ar-bars" aria-hidden="true">
            {rows.map((r) => (
              <div key={r.h} className="ar-bar">
                <span className="ar-bar-col" style={{ height: `${Math.round((r.n / max) * 100)}%` }}>
                  {r.rest > 0 && <i className={`ar-bar-rest${ai ? ' is-ai' : ' is-miss'}`} style={{ flexGrow: r.rest }}></i>}
                  {r.staff > 0 && <i className="ar-bar-staff" style={{ flexGrow: r.staff }}></i>}
                </span>
                <em>{r.h % 3 === 0 ? String(r.h).padStart(2, '0') : ''}</em>
              </div>
            ))}
            <span className="ar-day-band" style={{ left: `${(OPEN / 24) * 100}%`, width: `${((CLOSE - OPEN) / 24) * 100}%` }}><b>Front desk hours</b></span>
          </div>
          <div className="ar-legend">
            <span><i className="ar-lg ar-lg--staff"></i>Answered by your team</span>
            {ai ? <span><i className="ar-lg ar-lg--ai"></i>Answered by AI</span> : <span><i className="ar-lg ar-lg--miss"></i>Missed · voicemail</span>}
            <span className="ar-legend-note">Example day</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Five jobs ────────────────────────────────────────────────────────── */
export function JobsDemo({ data }) {
  const [on, setOn] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return undefined;
    const id = setInterval(() => setOn((x) => (x + 1) % data.steps.length), 2600);
    return () => clearInterval(id);
  }, [auto, data.steps.length]);
  const s = data.steps[on];

  return (
    <section className="lp-section lp-section--theme ar-jobs-sec">
      <div className="lp-wrap">
        <div className="ar-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="ar-jobs reveal reveal-delay-1">
          <ol className="ar-jobs-track" role="tablist" aria-label="Five jobs">
            {data.steps.map((x, i) => (
              <li key={x.title}>
                <button type="button" role="tab" aria-selected={on === i} className={`ar-job${on === i ? ' is-on' : ''}${i < on ? ' is-done' : ''}`} onClick={() => { setAuto(false); setOn(i); }}>
                  <span className="ar-job-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ar-job-ic"><i className={x.icon} aria-hidden="true"></i></span>
                  <b>{x.title}</b>
                </button>
              </li>
            ))}
          </ol>
          <div className="ar-job-panel" role="tabpanel" key={on}>
            <div className="ar-job-copy">
              <h3 className="ar-job-title">{s.title}</h3>
              <p className="ar-job-text">{s.text}</p>
            </div>
            <div className="ar-job-out">
              <span>Example output</span>
              <b><i className={s.icon} aria-hidden="true"></i>{s.example}</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Languages ────────────────────────────────────────────────────────── */
const LANGS = [
  { code: 'EN', name: 'English', flag: '🇺🇸', hi: 'Thanks for calling Summit Dental — how can I help?' },
  { code: 'ES', name: 'Español', flag: '🇪🇸', hi: 'Gracias por llamar a Summit Dental. ¿En qué puedo ayudarle?' },
  { code: 'PT', name: 'Português', flag: '🇧🇷', hi: 'Obrigada por ligar para a Summit Dental. Como posso ajudar?' },
  { code: 'FR', name: 'Français', flag: '🇫🇷', hi: 'Merci d’avoir appelé Summit Dental. Comment puis-je vous aider ?' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪', hi: 'Danke für Ihren Anruf bei Summit Dental. Wie kann ich helfen?' },
  { code: 'IT', name: 'Italiano', flag: '🇮🇹', hi: 'Grazie per aver chiamato Summit Dental. Come posso aiutarla?' },
  { code: 'ZH', name: '中文', flag: '🇨🇳', hi: '感谢致电 Summit Dental，请问有什么可以帮您？' },
  { code: 'JA', name: '日本語', flag: '🇯🇵', hi: 'Summit Dental にお電話いただきありがとうございます。ご用件をお伺いします。' },
  { code: 'KO', name: '한국어', flag: '🇰🇷', hi: 'Summit Dental에 전화해 주셔서 감사합니다. 무엇을 도와드릴까요?' },
  { code: 'HI', name: 'हिन्दी', flag: '🇮🇳', hi: 'Summit Dental में कॉल करने के लिए धन्यवाद। मैं आपकी क्या मदद कर सकती हूँ?' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦', hi: 'شكرًا لاتصالك بـ Summit Dental. كيف يمكنني مساعدتك؟', rtl: true },
  { code: 'TL', name: 'Tagalog', flag: '🇵🇭', hi: 'Salamat sa pagtawag sa Summit Dental. Paano kita matutulungan?' },
  { code: 'VI', name: 'Tiếng Việt', flag: '🇻🇳', hi: 'Cảm ơn bạn đã gọi đến Summit Dental. Tôi có thể giúp gì cho bạn?' },
  { code: 'TH', name: 'ไทย', flag: '🇹🇭', hi: 'ขอบคุณที่โทรหา Summit Dental ค่ะ มีอะไรให้ช่วยไหมคะ' },
  { code: 'NL', name: 'Nederlands', flag: '🇳🇱', hi: 'Bedankt voor het bellen naar Summit Dental. Waarmee kan ik u helpen?' },
  { code: 'PL', name: 'Polski', flag: '🇵🇱', hi: 'Dziękujemy za telefon do Summit Dental. W czym mogę pomóc?' },
];

export function LanguagesDemo({ data }) {
  const [code, setCode] = useState('ES');
  const l = LANGS.find((x) => x.code === code);
  return (
    <section className="lp-section ar-lang-sec">
      <div className="lp-wrap ar-lang">
        <div className="ar-lang-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="ar-lang-points">
            {data.points.map((p) => <li key={p}><i className="ri-check-line" aria-hidden="true"></i>{p}</li>)}
          </ul>
        </div>
        <div className="ar-lang-card reveal reveal-delay-1">
          <div className="ar-lang-say" key={code} dir={l.rtl ? 'rtl' : 'ltr'} lang={code.toLowerCase()}>
            <span className="ar-lang-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
            <p>{l.hi}</p>
          </div>
          <div className="ar-lang-grid" role="group" aria-label="Languages">
            {LANGS.map((x) => (
              <button key={x.code} type="button" className={code === x.code ? 'is-on' : ''} aria-pressed={code === x.code} onClick={() => setCode(x.code)}>
                <span aria-hidden="true">{x.flag}</span>{x.name}
              </button>
            ))}
          </div>
          <div className="ar-lang-foot"><span>16 of 32 shown</span><span><b>0.4s</b> detection</span><span><b>~180ms</b> response</span></div>
        </div>
      </div>
    </section>
  );
}

/* ── Hand-off rules ───────────────────────────────────────────────────── */
const RULES = [
  { id: 'ask', label: 'Caller asks for a person', icon: 'ri-user-voice-line', on: true },
  { id: 'urgent', label: 'Urgent words — “emergency”, “pain”', icon: 'ri-alarm-warning-line', on: true },
  { id: 'vip', label: 'Calls from VIP numbers', icon: 'ri-vip-crown-line', on: false },
  { id: 'pay', label: 'Payments over $500', icon: 'ri-bank-card-line', on: false },
];
const CALLS = [
  { who: 'New patient', said: '“Do you take BlueCross?”', hits: [] },
  { who: 'Existing patient', said: '“I’m in a lot of pain since this morning.”', hits: ['urgent'] },
  { who: 'VIP · Harbor Clinic', said: '“Can I book three staff check-ups?”', hits: ['vip'] },
  { who: 'Caller', said: '“Can I just talk to someone?”', hits: ['ask'] },
  { who: 'Patient', said: '“I’d like to pay my $640 invoice.”', hits: ['pay'] },
];

export function HandoffRules({ data }) {
  const [rules, setRules] = useState(RULES);
  const active = new Set(rules.filter((r) => r.on).map((r) => r.id));
  const toggle = (id) => setRules((cur) => cur.map((r) => (r.id === id ? { ...r, on: !r.on } : r)));
  const human = CALLS.filter((c) => c.hits.some((h) => active.has(h))).length;

  return (
    <section className="lp-section lp-section--theme ar-rule-sec">
      <div className="lp-wrap">
        <div className="ar-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="ar-rule reveal reveal-delay-1">
          <div className="ar-rule-list">
            <span className="ar-rule-k">Hand off to a person when…</span>
            {rules.map((r) => (
              <label key={r.id} className={`ar-switch${r.on ? ' is-on' : ''}`}>
                <i className={r.icon} aria-hidden="true"></i>
                <span>{r.label}</span>
                <input type="checkbox" checked={r.on} onChange={() => toggle(r.id)} />
                <em aria-hidden="true"></em>
              </label>
            ))}
            <p className="ar-rule-else"><i className="ri-robot-2-line" aria-hidden="true"></i>Everything else: the AI answers, books and logs it.</p>
          </div>
          <div className="ar-rule-calls" aria-live="polite">
            <span className="ar-rule-k">Incoming calls · {human} to a person, {CALLS.length - human} handled by AI</span>
            {CALLS.map((c) => {
              const toHuman = c.hits.some((h) => active.has(h));
              return (
                <div key={c.said} className={`ar-call${toHuman ? ' is-human' : ''}`}>
                  <span className="ar-call-who"><b>{c.who}</b><em>{c.said}</em></span>
                  <span className="ar-call-out">{toHuman ? <><i className="ri-user-shared-line" aria-hidden="true"></i>Warm transfer</> : <><i className="ri-robot-2-line" aria-hidden="true"></i>AI handles</>}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
