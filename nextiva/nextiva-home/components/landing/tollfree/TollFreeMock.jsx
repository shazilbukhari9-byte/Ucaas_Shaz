'use client';
/* Working hero mockup for the Toll-free Numbers page: a number search.
   Type a word (vanity) and filter by prefix — results are generated across
   all seven prefixes; pick one and Provision runs the real-world steps
   (reserve → STIR/SHAKEN → SMS → route) until the number is live. Results
   are derived from the word with a small hash, so they're stable between
   server and client renders. */
import { useEffect, useMemo, useRef, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

export const PREFIXES = ['800', '888', '877', '866', '855', '844', '833'];
const KEYMAP = { A: 2, B: 2, C: 2, D: 3, E: 3, F: 3, G: 4, H: 4, I: 4, J: 5, K: 5, L: 5, M: 6, N: 6, O: 6, P: 7, Q: 7, R: 7, S: 7, T: 8, U: 8, V: 8, W: 9, X: 9, Y: 9, Z: 9 };
export const toDigits = (w) => w.toUpperCase().split('').map((c) => KEYMAP[c] ?? c).join('');

const hash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
const digitsFrom = (seed, n) => {
  let out = '';
  let h = seed;
  for (let i = 0; i < n; i += 1) { h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; out += String(h % 10); }
  return out;
};

function resultsFor(word, prefix) {
  const w = word.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
  const list = [];
  (prefix === 'all' ? PREFIXES : [prefix]).forEach((p) => {
    const h = hash(`${w}|${p}`);
    if (w.length >= 2 && h % 4 !== 0) {
      const fill = 7 - w.length;
      const tail = fill > 0 ? `-${digitsFrom(h, fill)}` : '';
      list.push({ id: `${p}-v`, prefix: p, label: `1 (${p}) ${w}${tail}`, digits: `${p}${toDigits(w)}${fill > 0 ? digitsFrom(h, fill) : ''}`, vanity: true });
    }
    const d = digitsFrom(h + 7, 7);
    list.push({ id: `${p}-s`, prefix: p, label: `1 (${p}) ${d.slice(0, 3)}-${d.slice(3)}`, digits: `${p}${d}`, vanity: false });
  });
  // Vanity matches first, then standard numbers.
  return list.sort((a, b) => Number(b.vanity) - Number(a.vanity));
}

const PAGE = 4;
const PAGE_MS = 3000;
const STEPS = ['Reserving number', 'Signing STIR/SHAKEN (A-level)', 'Enabling texting', 'Routing to Main menu'];

export default function TollFreeMock({ page }) {
  const [word, setWord] = useState('NORTH');
  const [prefix, setPrefix] = useState('all');
  const [sel, setSel] = useState(null);
  const [step, setStep] = useState(-1); // -1 idle, 0..3 running, 4 live
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const results = useMemo(() => resultsFor(word, prefix), [word, prefix]);
  const picked = results.find((r) => r.id === sel) || null;
  const vanityCount = results.filter((r) => r.vanity).length;

  // No scrolling: the results show PAGE at a time and turn to the next page
  // by themselves every PAGE_MS (wrapping round), so the list keeps one
  // height. It holds while the visitor is using the mock or provisioning,
  // and a new search or prefix goes back to page 1.
  const [pg, setPg] = useState(0);
  useEffect(() => { setPg(0); }, [word, prefix]);
  const pages = Math.max(1, Math.ceil(results.length / PAGE));
  const view = results.slice(pg * PAGE, pg * PAGE + PAGE);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  const turning = pages > 1 && !paused && !still && step < 0;
  useEffect(() => {
    if (!turning) return undefined;
    const t = setTimeout(() => setPg((n) => (n + 1) % pages), PAGE_MS);
    return () => clearTimeout(t);
  }, [turning, pg, pages]);

  const provision = () => {
    if (!picked || step >= 0) return;
    setStep(0);
    STEPS.forEach((_, i) => timers.current.push(setTimeout(() => setStep(i + 1), 700 * (i + 1))));
  };
  const reset = () => { timers.current.forEach(clearTimeout); timers.current = []; setStep(-1); setSel(null); };
  const busy = step >= 0;

  return (
    <div className="tfm" {...bind} role="region" aria-label="Interactive toll-free number search">
      <div className="tfm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="tfm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Pick your number
        </span>
        <span className="tfm-meta">USA · {results.length} found</span>
      </div>

      {step === 4 && picked ? (
        <div className="tfm-live" aria-live="polite">
          <span className="tfm-live-ic"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i></span>
          <span className="tfm-live-k">Your number is live</span>
          <b className="tfm-live-n">{picked.label}</b>
          <span className="tfm-live-d">Dials as {picked.digits.replace(/^(\d{3})(\d{3})(\d{4})$/, '1-$1-$2-$3')}</span>
          <ul className="tfm-live-tags">
            <li><i className="ri-shield-check-line" aria-hidden="true"></i>STIR/SHAKEN A</li>
            <li><i className="ri-message-2-line" aria-hidden="true"></i>Text-enabled</li>
            <li><i className="ri-git-branch-line" aria-hidden="true"></i>Main menu</li>
          </ul>
          <button type="button" className="tfm-again" onClick={reset}><i className="ri-search-line" aria-hidden="true"></i>Search another</button>
        </div>
      ) : (
        <>
          <label className="tfm-search">
            <i className="ri-search-2-line" aria-hidden="true"></i>
            <input
              value={word}
              onChange={(e) => { setWord(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)); setSel(null); }}
              placeholder="Type a word, e.g. FLOWERS"
              aria-label="Search for a word or digits"
              disabled={busy}
            />
            <em>{vanityCount} vanity</em>
          </label>

          <div className="tfm-chips" role="group" aria-label="Prefix">
            {['all', ...PREFIXES].map((p) => (
              <button key={p} type="button" className={prefix === p ? 'is-on' : ''} aria-pressed={prefix === p} onClick={() => { setPrefix(p); setSel(null); }} disabled={busy}>
                {p === 'all' ? 'All' : p}
              </button>
            ))}
          </div>

          <div className="tfm-listbox">
          <ul className="tfm-list" key={`${word}-${prefix}-${pg}`}>
            {view.map((r) => (
              <li key={r.id}>
                <button type="button" className={`tfm-row${sel === r.id ? ' is-on' : ''}`} onClick={() => setSel(r.id)} disabled={busy} aria-pressed={sel === r.id}>
                  <span className="tfm-num">{r.label}</span>
                  <span className={`tfm-type${r.vanity ? ' is-vanity' : ''}`}>{r.vanity ? 'Vanity · Premium' : 'Standard · ready now'}</span>
                  <span className="tfm-pick">{sel === r.id ? <><i className="ri-check-line" aria-hidden="true"></i>Selected</> : 'Pick'}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="tfm-pager">
            <span className="tfm-pager-count">{pg * PAGE + 1}–{pg * PAGE + view.length} <em>of {results.length}</em></span>
            <span className="tfm-pager-dots" aria-hidden="true">
              {Array.from({ length: pages }, (_, n) => (
                <i key={n} className={n === pg ? 'is-on' : n < pg ? 'is-done' : ''}>
                  {n === pg && turning && <b key={pg}></b>}
                </i>
              ))}
            </span>
          </div>
          </div>

          <div className="tfm-foot">
            {busy ? (
              <ol className="tfm-steps" aria-live="polite">
                {STEPS.map((s, i) => (
                  <li key={s} className={i < step ? 'is-done' : i === step ? 'is-run' : ''}>
                    <i className={i < step ? 'ri-check-line' : 'ri-loader-4-line'} aria-hidden="true"></i>{s}
                  </li>
                ))}
              </ol>
            ) : (
              <>
                <span className="tfm-sel">{picked ? picked.label : 'Pick a number to continue'}</span>
                <button type="button" className="tfm-go" onClick={provision} disabled={!picked}>
                  Provision <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
