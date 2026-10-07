/* Logistics page. Hero, related pages, FAQ and closing CTA are the shared
   landing sections; the middle is this page's own: the hunt-group cascade
   builder, the storm drill, a load from pickup to delivery, the fixes,
   features and who it's for.
   Content lives in content/landingPages.js (layout: 'logistics'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { CascadeDemo, StormDemo, RoadDemo } from './LogisticsDemos';

function Fixes({ page }) {
  return (
    <section className="lp-section lp-section--theme lg-fx-sec">
      <div className="lp-wrap">
        <div className="lg-head reveal">
          <span className="lp-kicker">On the dispatch floor</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <div className="lg-fx">
          {page.challenges.map((c, i) => (
            <article key={c.problem} className={`lg-fx-card reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="lg-fx-n">{String(i + 1).padStart(2, '0')}</span>
              <p className="lg-fx-q">{c.problem}</p>
              <p className="lg-fx-a"><i className="ri-arrow-right-line" aria-hidden="true"></i>{c.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section lg-ft-sec">
      <div className="lp-wrap">
        <div className="lg-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="lg-ft">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`lg-ft-card lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="lg-ft-top">
                <span className="lg-ft-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <span className="lg-ft-short">{c.short}</span>
              </div>
              <h3 className="lg-ft-title">{c.title}</h3>
              <p className="lg-ft-text">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience({ page }) {
  return (
    <section className="lp-section lg-au-sec">
      <div className="lp-wrap">
        <div className="lg-head reveal">
          <span className="lp-kicker">Who it’s for</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="lg-au">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`lg-au-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="lg-au-ic"><i className={a.icon} aria-hidden="true"></i></span>
              <h3 className="lg-au-title">{a.title}</h3>
              <p className="lg-au-text">{a.text}</p>
              <span className="lg-au-call"><i className="ri-phone-line" aria-hidden="true"></i>“{a.call}”</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LogisticsPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.cascade && <CascadeDemo data={page.cascade} />}
      {page.storm && <StormDemo data={page.storm} />}
      {page.road && <RoadDemo data={page.road} />}
      {page.challenges && <Fixes page={page} />}
      <Features page={page} />
      <Audience page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
