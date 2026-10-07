/* Online Fax page. Hero, related pages, FAQ and closing CTA are the shared
   landing sections; the middle is this page's own: three ways to send, the
   features as fax sheets, a verifiable audit trail, the per-seat add-on and
   regulated use cases shown as document stacks.
   Content lives in content/landingPages.js (layout: 'fax'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { Channels, AuditTrail, AddonSeats } from './FaxDemos';

/* ── Features as fax sheets ───────────────────────────────────────────── */
function Features({ page }) {
  const total = String(page.capabilities.length).padStart(2, '0');
  return (
    <section className="lp-section fx-feat-sec">
      <div className="lp-wrap">
        <div className="fx-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
          <p className="lp-intro">{page.capIntro}</p>
        </div>
        <div className="fx-sheets">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`fx-sheet lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="fx-sheet-strip">
                <span>PAGE {String(i + 1).padStart(2, '0')}/{total}</span>
                <span>{c.short}</span>
              </div>
              <div className="fx-sheet-body">
                <span className="fx-sheet-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <h3 className="fx-sheet-title">{c.title}</h3>
                <p className="fx-sheet-text">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Use cases as document stacks ─────────────────────────────────────── */
function UseCases({ page }) {
  return (
    <section className="lp-section fx-uc-sec">
      <div className="lp-wrap">
        <div className="fx-head reveal">
          <span className="lp-kicker">Built for regulated work</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="fx-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`fx-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="fx-uc-stack" aria-hidden="true">
                {a.docs.map((d, k) => (
                  <span key={d} className={`fx-uc-doc fx-uc-doc--${k}`}>
                    <i className="ri-file-text-line"></i><b>{d}</b><em>Encrypted · logged</em>
                  </span>
                ))}
              </div>
              <div className="fx-uc-body">
                <span className="fx-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
                <h3 className="fx-uc-title">{a.title}</h3>
                <p className="fx-uc-text">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FaxPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.channels && <Channels data={page.channels} />}
      <Features page={page} />
      {page.audit && <AuditTrail data={page.audit} />}
      {page.addon && <AddonSeats data={page.addon} />}
      <UseCases page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
