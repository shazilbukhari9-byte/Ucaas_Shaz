'use client';
/* "One parent account, every office" section for the Hosted Phone System
   page, laid out as a clean account hierarchy: the parent account on top,
   a connector bus down to one card per site, and the key facts for each site
   (extensions, live calls, caller ID, number pool) right on its card. Live
   call counts drift quietly so the numbers read as real-time. Hovering a site
   highlights its branch. Data comes from page.multiSite. */
import { useEffect, useState } from 'react';

export default function MultiSiteConsole({ data }) {
  const [live, setLive] = useState(() => data.sites.map((s) => s.live));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setLive((cur) => cur.map((n, i) => {
        const base = data.sites[i].live;
        const next = n + (Math.random() < 0.5 ? -1 : 1);
        return Math.max(Math.max(1, base - 2), Math.min(base + 2, next));
      }));
    }, 2600);
    return () => clearInterval(id);
  }, [data.sites]);

  const totalExt = data.sites.reduce((a, s) => a + s.ext, 0);
  const totalLive = live.reduce((a, n) => a + n, 0);

  return (
    <section className="lp-section lp-section--theme">
      <div className="lp-wrap lp-org">
        <div className="lp-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>

        <div className="lp-org-tree reveal reveal-delay-1">
          <div className="lp-org-root">
            <span className="lp-org-root-ic"><i className="ri-building-2-line" aria-hidden="true"></i></span>
            <span className="lp-org-root-name">
              <b>Parent account</b>
              <em>Routing, reporting and billing for every site</em>
            </span>
            <span className="lp-org-root-stats">
              <span><b>{data.sites.length}</b> sites</span>
              <span><b>{totalExt}</b> extensions</span>
              <span><b className="lp-org-num">{totalLive}</b> live calls</span>
            </span>
          </div>

          <ul className="lp-org-sites" style={{ '--n': data.sites.length }}>
            {data.sites.map((s, i) => (
              <li className="lp-org-site" key={s.code}>
                <div className="lp-org-card">
                  <div className="lp-org-card-head">
                    <span className="lp-org-code">{s.code}</span>
                    <span className="lp-org-name">
                      <b>{s.name}</b>
                      <em>{s.city}</em>
                    </span>
                  </div>
                  <dl className="lp-org-facts">
                    <div><dt>Extensions</dt><dd>{s.ext}</dd></div>
                    <div><dt>Live calls</dt><dd><i className="lp-org-dot" aria-hidden="true"></i>{live[i]}</dd></div>
                    <div><dt>Caller ID</dt><dd>{s.callerId}</dd></div>
                    <div><dt>Number pool</dt><dd>{s.pool} numbers</dd></div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul className="lp-org-points reveal reveal-delay-2">
          {data.points.map((p) => (
            <li key={p.text}>
              <i className={p.icon} aria-hidden="true"></i>
              {p.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
