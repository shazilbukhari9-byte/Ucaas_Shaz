'use client';
/* Vanity section: type a word, pick a prefix, and the keypad on the right
   shows which keys it dials. "Dial it" lights the keys one by one. */
import { useEffect, useRef, useState } from 'react';
import { toDigits } from './TollFreeMock';

const KEYS = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['*', ''], ['0', '+'], ['#', ''],
];
const EXAMPLES = ['FLOWERS', 'GO-NORTH', 'PLUMBER', 'TAXICAB'];

export default function VanityKeypad({ data }) {
  const [word, setWord] = useState('FLOWERS');
  const [prefix, setPrefix] = useState('800');
  const [lit, setLit] = useState(null); // index into digits while dialing
  const timers = useRef([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clear(), []);

  const letters = word.replace(/[^A-Z0-9]/g, '').slice(0, 7);
  const digits = toDigits(letters);
  const used = new Set(digits.split(''));
  const dialing = lit !== null;

  const dial = () => {
    clear();
    digits.split('').forEach((_, i) => timers.current.push(setTimeout(() => setLit(i), 380 * i)));
    timers.current.push(setTimeout(() => setLit(null), 380 * digits.length + 300));
  };
  const change = (v) => { clear(); setLit(null); setWord(v.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 9)); };

  return (
    <section className="lp-section lp-section--theme tf-van-sec">
      <div className="lp-wrap tf-van">
        <div className="tf-van-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>

          <div className="tf-van-form">
            <div className="tf-van-pre" role="group" aria-label="Prefix">
              {['800', '888', '833'].map((p) => (
                <button key={p} type="button" className={prefix === p ? 'is-on' : ''} aria-pressed={prefix === p} onClick={() => setPrefix(p)}>{p}</button>
              ))}
            </div>
            <input value={word} onChange={(e) => change(e.target.value)} aria-label="Word to spell" placeholder="Type a word" />
          </div>
          <div className="tf-van-ex">
            <span>Try</span>
            {EXAMPLES.map((x) => <button key={x} type="button" onClick={() => change(x)}>{x}</button>)}
          </div>

          <div className="tf-van-out" aria-live="polite">
            <span className="tf-van-word">1-{prefix}-<b>{letters || '…'}</b></span>
            <span className="tf-van-arrow" aria-hidden="true"><i className="ri-arrow-down-line"></i></span>
            <span className="tf-van-digits">
              1-{prefix}-
              {digits.split('').map((d, i) => (
                <span key={`${d}-${i}`}>
                  {i === 3 && '-'}
                  <i className={lit === i ? 'is-lit' : ''}>{d}</i>
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="tf-pad reveal reveal-delay-1">
          <div className="tf-pad-screen">
            <span>Dialing</span>
            <b>{prefix} {digits ? `${digits.slice(0, 3)}${digits.length > 3 ? `-${digits.slice(3)}` : ''}` : '—'}</b>
          </div>
          <div className="tf-pad-grid" aria-hidden="true">
            {KEYS.map(([k, l]) => {
              const on = dialing ? digits[lit] === k : used.has(k);
              return (
                <span key={k} className={`tf-key${on ? ' is-on' : ''}${dialing && digits[lit] === k ? ' is-press' : ''}`}>
                  <b>{k}</b><em>{l}</em>
                </span>
              );
            })}
          </div>
          <button type="button" className="tf-pad-dial" onClick={dial} disabled={!digits || dialing}>
            <i className="ri-phone-fill" aria-hidden="true"></i>{dialing ? 'Dialing…' : 'Dial it'}
          </button>
        </div>
      </div>
    </section>
  );
}
