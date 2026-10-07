'use client';
/* Toll-free "Every prefix" — a live search board. One query ("NORTH") runs
   across all seven prefixes: the rows are checked one after another
   (Searching… → ✓ matches, with the best match shown), then the board holds
   for a moment and starts over. Pauses only while the visitor is actively
   using it (useIntentPause). Fixed row heights, so nothing moves the page.
   Sample numbers and counts only. */
import { useEffect, useState } from 'react';
import useIntentPause from '../../../hooks/useIntentPause';

const ROW_MS = 900; // time spent on each prefix
const HOLD_MS = 2600; // pause once every prefix is done
const QUERY = 'NORTH';
// Illustrative best match and match count per prefix, in order.
const MATCH = [
  ['1 (800) NORTH-12', 2],
  ['1 (888) NORTH-07', 1],
  ['1 (877) NORTH-64', 3],
  ['1 (866) NORTH-30', 2],
  ['1 (855) NORTH-96', 4],
  ['1 (844) NORTH-21', 3],
  ['1 (833) NORTH-83', 5],
];

export default function PrefixBoard({ items }) {
  const n = items.length;
  const [at, setAt] = useState(0); // rows before `at` are done; `at` is searching
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);

  useEffect(() => {
    if (still) { setAt(n); return undefined; }
    if (paused) return undefined;
    const t = setTimeout(() => setAt((a) => (a >= n ? 0 : a + 1)), at >= n ? HOLD_MS : ROW_MS);
    return () => clearTimeout(t);
  }, [at, paused, still, n]);

  const done = Math.min(at, n);
  const total = MATCH.slice(0, done).reduce((s, m) => s + m[1], 0);

  return (
    <div className="tpb reveal" {...bind}>
      <div className="tpb-bar">
        <span className="tpb-search"><i className="ri-search-line" aria-hidden="true"></i><b>{QUERY}</b><span className="tpb-caret" aria-hidden="true"></span></span>
        <span className="tpb-scope">{at >= n ? `All ${n} prefixes searched` : `Searching ${n} prefixes…`}</span>
        <span className="tpb-total"><b>{total}</b> matches</span>
      </div>

      <div className="tpb-head" aria-hidden="true">
        <span>Prefix</span><span>Since</span><span>Best match</span><span>Status</span>
      </div>
      <ol className="tpb-rows">
        {items.map((p, i) => {
          const state = i < at ? 'done' : i === at ? 'busy' : 'wait';
          const [num, count] = MATCH[i] || ['—', 0];
          return (
            <li key={p.code} className={`tpb-row is-${state}`}>
              <span className="tpb-code">{p.code}</span>
              <span className="tpb-since"><b>{p.year}</b>{p.note && <em>{p.note}</em>}</span>
              <span className="tpb-num">{state === 'done' ? num : <span className="tpb-dash">{state === 'busy' ? 'Checking inventory' : '—'}</span>}</span>
              <span className="tpb-status">
                {state === 'done' && <span className="tpb-chip tpb-chip--ok"><i className="ri-check-line"></i>{count} {count === 1 ? 'match' : 'matches'}</span>}
                {state === 'busy' && <span className="tpb-chip tpb-chip--busy"><i className="tpb-spin"></i>Searching</span>}
                {state === 'wait' && <span className="tpb-chip">Queued</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
