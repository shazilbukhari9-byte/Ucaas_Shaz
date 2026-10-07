'use client';
/* Working hero mockup for the AI Receptionist page: a live test call.
   Choose the caller's language and the call replays in it — the language is
   detected, the caller asks for an appointment, the receptionist books the
   slot, confirms by text and logs the call. "Transfer to a person" hands the
   call over with a summary at any point. */
import { useEffect, useRef, useState } from 'react';

const LANGS = {
  en: { label: 'English', code: 'EN-US', lines: [
    ['ai', 'Thanks for calling Summit Dental, this is Olivia. How can I help?'],
    ['caller', 'I need a cleaning on Friday afternoon, please.'],
    ['ai', 'Sure — Friday at 2:30 PM is open. Shall I book it?'],
    ['caller', 'Yes, perfect.'],
    ['ai', 'You’re booked! I’ll text you a confirmation now.'],
  ] },
  es: { label: 'Español', code: 'ES-MX', lines: [
    ['ai', 'Gracias por llamar a Summit Dental, soy Olivia. ¿En qué puedo ayudarle?'],
    ['caller', 'Necesito una limpieza el viernes por la tarde, por favor.'],
    ['ai', 'Claro. Tengo el viernes a las 2:30 PM. ¿Le parece bien?'],
    ['caller', 'Sí, perfecto.'],
    ['ai', '¡Listo! Le envío la confirmación por mensaje.'],
  ] },
  fr: { label: 'Français', code: 'FR-FR', lines: [
    ['ai', 'Merci d’avoir appelé Summit Dental, ici Olivia. Comment puis-je vous aider ?'],
    ['caller', 'J’aimerais un détartrage vendredi après-midi, s’il vous plaît.'],
    ['ai', 'Bien sûr. Vendredi à 14 h 30 est disponible. Je réserve ?'],
    ['caller', 'Oui, parfait.'],
    ['ai', 'C’est réservé ! Je vous envoie une confirmation par SMS.'],
  ] },
  hi: { label: 'हिन्दी', code: 'HI-IN', lines: [
    ['ai', 'Summit Dental में कॉल करने के लिए धन्यवाद, मैं ओलिविया हूँ। मैं आपकी क्या मदद कर सकती हूँ?'],
    ['caller', 'मुझे शुक्रवार दोपहर सफ़ाई के लिए अपॉइंटमेंट चाहिए।'],
    ['ai', 'ज़रूर। शुक्रवार दोपहर 2:30 बजे खाली है। बुक कर दूँ?'],
    ['caller', 'हाँ, बिल्कुल।'],
    ['ai', 'बुक हो गया! मैं आपको SMS से कन्फ़र्मेशन भेज रही हूँ।'],
  ] },
};
const STEP_MS = 1900;
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function ReceptionistMock({ page }) {
  const [lang, setLang] = useState('es');
  const [shown, setShown] = useState(0);
  const [transfer, setTransfer] = useState(false);
  const [secs, setSecs] = useState(0);
  const listRef = useRef(null);
  const L = LANGS[lang];
  const done = shown >= L.lines.length;
  const live = !done && !transfer;

  // Lines play one by one; switching language or calling again restarts.
  useEffect(() => {
    if (transfer || shown >= L.lines.length) return undefined;
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 700 : STEP_MS);
    return () => clearTimeout(id);
  }, [shown, transfer, L.lines.length]);

  useEffect(() => {
    if (!live) return undefined;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [live]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [shown, transfer]);

  const restart = (l = lang) => { setLang(l); setShown(0); setTransfer(false); setSecs(0); };
  const booked = shown >= 5;

  return (
    <div className="arm" role="region" aria-label="Interactive AI receptionist test call">
      <div className="arm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="arm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          AI Receptionist
        </span>
        <span className={`arm-live${live ? '' : ' is-idle'}`}><i aria-hidden="true"></i>{transfer ? 'Transferred' : done ? 'Call ended' : 'Live'} · {mmss(secs)}</span>
      </div>

      <div className="arm-langs" role="group" aria-label="Caller speaks">
        <span>Caller speaks</span>
        {Object.entries(LANGS).map(([k, v]) => (
          <button key={k} type="button" className={lang === k ? 'is-on' : ''} aria-pressed={lang === k} onClick={() => restart(k)}>{v.label}</button>
        ))}
      </div>

      <div className="arm-detect">
        <i className="ri-translate-2" aria-hidden="true"></i>
        {shown > 0 ? <>Language detected <b>{L.code}</b> · 0.4s</> : 'Answering · detecting language…'}
        <span className="arm-voice">Voice: Olivia</span>
      </div>

      <ol className="arm-thread" ref={listRef} aria-live="polite">
        {L.lines.slice(0, shown).map(([who, text]) => (
          <li key={text} className={`arm-msg arm-msg--${who}`}>
            <span className="arm-av">{who === 'ai' ? 'AI' : 'C'}</span>
            <p>{text}</p>
          </li>
        ))}
        {transfer && (
          <li className="arm-transfer">
            <i className="ri-user-shared-fill" aria-hidden="true"></i>
            <span><b>Warm transfer → Dr. Patel</b><em>Summary attached · {L.label} caller · wants Friday PM cleaning</em></span>
          </li>
        )}
      </ol>

      <div className="arm-events">
        <span className={booked ? 'is-on' : ''}><i className="ri-calendar-check-line" aria-hidden="true"></i>{booked ? 'Booked · Fri 2:30 PM' : 'Booking'}</span>
        <span className={done ? 'is-on' : ''}><i className="ri-message-2-line" aria-hidden="true"></i>{done ? 'SMS sent' : 'SMS'}</span>
        <span className={done || transfer ? 'is-on' : ''}><i className="ri-contacts-book-3-line" aria-hidden="true"></i>{done || transfer ? 'Logged · HubSpot' : 'CRM'}</span>
      </div>

      <div className="arm-actions">
        {live
          ? <button type="button" className="arm-hand" onClick={() => setTransfer(true)} disabled={shown === 0}><i className="ri-user-shared-line" aria-hidden="true"></i>Transfer to a person</button>
          : <button type="button" className="arm-again" onClick={() => restart()}><i className="ri-phone-line" aria-hidden="true"></i>Call again</button>}
      </div>
    </div>
  );
}
