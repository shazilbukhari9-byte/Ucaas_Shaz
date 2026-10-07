'use client';
/* Use cases for call recording: pill tabs on top; each tab shows the
   scenario on the left and a matching search example on the right. */
import { useState } from 'react';

export default function UseCaseTabs({ items }) {
  const [sel, setSel] = useState(0);
  if (!items?.length) return null;
  const u = items[sel];

  return (
    <section className="lp-section cr-uc-sec">
      <div className="lp-wrap">
        <div className="cr-head reveal">
          <span className="cr-kicker">Use cases</span>
          <h2 className="lp-h2">One archive, every team that needs it</h2>
        </div>

        <div className="cr-uc-tabs reveal" role="tablist" aria-label="Use cases">
          {items.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              id={`uc-tab-${x.id}`}
              aria-selected={sel === i}
              aria-controls="uc-panel"
              className={sel === i ? 'is-on' : ''}
              onClick={() => setSel(i)}
            >
              <i className={x.icon} aria-hidden="true"></i>{x.label}
            </button>
          ))}
        </div>

        <div className="cr-uc-panel reveal" id="uc-panel" role="tabpanel" aria-labelledby={`uc-tab-${u.id}`} key={u.id}>
          <div className="cr-uc-copy">
            <h3 className="cr-uc-title">{u.title}</h3>
            <p className="cr-uc-text">{u.text}</p>
            <ul className="cr-uc-points">
              {u.points.map((p) => (
                <li key={p}><i className="ri-check-line" aria-hidden="true"></i>{p}</li>
              ))}
            </ul>
          </div>
          <div className="cr-uc-demo" aria-hidden="true">
            <span className="cr-uc-demo-label">Try a search</span>
            <div className="cr-uc-q"><i className="ri-search-line"></i>“{u.query}”</div>
            <div className="cr-uc-res">
              <i className="ri-checkbox-circle-fill"></i>
              <span>{u.result}</span>
            </div>
            <div className="cr-uc-wave">
              {Array.from({ length: 40 }, (_, i) => (
                <i key={i} className={i % 9 === 3 ? 'is-hit' : ''} style={{ height: `${22 + Math.round(Math.abs(Math.sin((i + sel * 5) * 1.1)) * 78)}%` }}></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
