'use client';
/* "What you get" as one feature explorer card (capStyle: 'explorer'): the
   full feature list on the left, the chosen feature in detail on the right —
   its description, three highlights and a large faded icon. It steps through
   the list on its own every STEP_MS; picking a feature jumps there and the
   tour carries on from it. It pauses only while the visitor is actively
   using it (see useIntentPause).
   On phones the list becomes a swipeable strip of tabs above one detail
   card; the active tab slides itself into view as the tour moves. */
import { useEffect, useRef, useState } from 'react';
import useIntentPause from '../../hooks/useIntentPause';
import FxMock, { FX_SCENES } from './FxMocks';

const STEP_MS = 3000;

function Detail({ c, n, total }) {
  // With a product mockup: the mockup on a soft stage up top, the copy below.
  if (c.mock) {
    return (
      <div className="lp-fx-detail lp-fx-detail--mock">
        <div className="lp-fx-stage" style={FX_SCENES[c.mock] ? { backgroundImage: `url(${FX_SCENES[c.mock]})` } : undefined}>
          <span className="lp-fx-count">{String(n + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <FxMock id={c.mock} />
        </div>
        <div className="lp-fx-copy">
          <h3 className="lp-fx-title">
            <span className="lp-ic lp-fx-ic" aria-hidden="true"><i className={c.icon}></i></span>{c.title}
          </h3>
          <p className="lp-fx-text">{c.text}</p>
          {c.points?.length > 0 && (
            <ul className="lp-fx-ticks">
              {c.points.map((p) => (
                <li key={p}><i className="ri-check-line" aria-hidden="true"></i>{p}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={`lp-fx-detail lp-tone--${c.tone || 'blue'}`}>
      <i className={`${c.icon} lp-fx-mark`} aria-hidden="true"></i>
      <span className="lp-fx-count">{String(n + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      <span className="lp-ic lp-fx-ic" aria-hidden="true"><i className={c.icon}></i></span>
      <h3 className="lp-fx-title">{c.title}</h3>
      <p className="lp-fx-text">{c.text}</p>
      {c.points?.length > 0 && (
        <ul className="lp-fx-points">
          {c.points.map((p) => (
            <li key={p}><i className="ri-check-line" aria-hidden="true"></i>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function FeatureExplorer({ items }) {
  const [sel, setSel] = useState(0);
  const [paused, bind] = useIntentPause();
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  const playing = !paused && !still;

  // A timeout per step (not an interval) so a click restarts the full 3s.
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setSel((s) => (s + 1) % items.length), STEP_MS);
    return () => clearTimeout(t);
  }, [playing, sel, items.length]);

  // Phones: keep the active tab centred in the strip. Only the strip scrolls
  // (sideways), never the page.
  const listRef = useRef(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const btn = list.children[sel];
    if (!btn) return;
    const box = list.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    const left = list.scrollLeft + (r.left - box.left) - (box.width - r.width) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [sel]);

  const pick = (i) => setSel(i);
  const step = (d) => setSel((s) => (s + d + items.length) % items.length);

  return (
    <div
      className="lp-fx reveal"
      {...bind}
    >
      {/* Phones only: arrows either side of the tab strip. On wider screens
          the wrapper is display: contents and the arrows are hidden. */}
      <div className="lp-fx-nav">
      <button type="button" className="lp-fx-arrow lp-fx-arrow--prev" aria-label="Previous feature" onClick={() => step(-1)}>
        <i className="ri-arrow-left-s-line" aria-hidden="true"></i>
      </button>
      <ul ref={listRef} className="lp-fx-list" role="tablist" aria-orientation="vertical">
        {items.map((c, i) => (
          <li key={c.title}>
            <button
              type="button"
              role="tab"
              id={`fx-tab-${i}`}
              aria-selected={sel === i}
              aria-controls="fx-panel"
              className={`lp-fx-item lp-tone--${c.tone || 'blue'}${sel === i ? ' is-on' : ''}`}
              onClick={() => pick(i)}
            >
              <span className="lp-fx-item-ic" aria-hidden="true"><i className={c.icon}></i></span>
              <span className="lp-fx-item-txt">
                <b>{c.title}</b>
                <em>{c.short}</em>
              </span>
              <i className="ri-arrow-right-s-line lp-fx-chev" aria-hidden="true"></i>
              {sel === i && playing && <span className="lp-fx-progress" aria-hidden="true"></span>}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="lp-fx-arrow lp-fx-arrow--next" aria-label="Next feature" onClick={() => step(1)}>
        <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
      </button>
      </div>

      <div className="lp-fx-panel" id="fx-panel" role="tabpanel" aria-labelledby={`fx-tab-${sel}`} key={sel}>
        <Detail c={items[sel]} n={sel} total={items.length} />
      </div>
    </div>
  );
}
