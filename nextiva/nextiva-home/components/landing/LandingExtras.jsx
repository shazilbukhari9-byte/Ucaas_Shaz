/* Extra landing-page sections, switched on per page from content/landingPages.js:
   - CompareTable  (page.compare)        "UCaaS vs a legacy PBX" side-by-side
   - PricingTeaser (page.pricingTeaser)  a slim pricing strip with actions
   Both are server-rendered. */

function Mark({ ok }) {
  return ok
    ? <span className="lp-cmp-mark lp-cmp-mark--ok"><i className="ri-check-line" aria-hidden="true"></i><span className="sr-only">Yes</span></span>
    : <span className="lp-cmp-mark lp-cmp-mark--no"><i className="ri-close-line" aria-hidden="true"></i><span className="sr-only">No</span></span>;
}

export function CompareTable({ data, productName }) {
  if (!data?.rows?.length) return null;
  return (
    <section className="lp-section lp-section--tint">
      <div className="lp-wrap lp-cmp-wrap">
        <div className="lp-head reveal">
          <span className="lp-kicker">{data.kicker || 'Side by side'}</span>
          <h2 className="lp-h2">{data.title}</h2>
          {data.intro && <p className="lp-intro">{data.intro}</p>}
        </div>

        <div className="lp-cmp reveal reveal-delay-1" role="table" aria-label={data.title}>
          <div className="lp-cmp-row lp-cmp-row--head" role="row">
            <span role="columnheader" className="lp-cmp-feature"><span className="sr-only">Feature</span></span>
            <span role="columnheader" className="lp-cmp-legacy">
              <i className="ri-server-line" aria-hidden="true"></i>
              {data.legacyLabel || 'Legacy on-site PBX'}
            </span>
            <span role="columnheader" className="lp-cmp-ours">
              <i className="ri-cloud-line" aria-hidden="true"></i>
              {productName}
            </span>
          </div>
          {data.rows.map((r) => (
            <div className="lp-cmp-row" role="row" key={r.feature}>
              <span role="rowheader" className="lp-cmp-feature">{r.feature}</span>
              <span role="cell" className="lp-cmp-legacy"><Mark ok={false} />{r.legacy}</span>
              <span role="cell" className="lp-cmp-ours"><Mark ok />{r.ours}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingTeaser({ data }) {
  if (!data) return null;
  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <div className="lp-price reveal">
          <div className="lp-price-copy">
            <span className="lp-price-tag"><i className="ri-price-tag-3-line" aria-hidden="true"></i>{data.kicker || 'Pricing'}</span>
            <h2 className="lp-h2 lp-price-title">{data.title}</h2>
            <p className="lp-price-text">{data.text}</p>
          </div>
          <ul className="lp-price-points">
            {data.points.map((p) => (
              <li key={p}><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{p}</li>
            ))}
          </ul>
          <div className="lp-price-actions">
            <a className="lp-btn lp-btn--solid" href="/sign-up">Start free trial <i className="ri-arrow-right-line" aria-hidden="true"></i></a>
            <a className="lp-btn lp-btn--ghost" href="/contact-sales">Get a quote</a>
          </div>
        </div>
      </div>
    </section>
  );
}
