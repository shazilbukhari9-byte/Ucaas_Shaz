/* Enterprise IT page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: the three things
   IT judges on, an identity & access builder, the 14-day migration plan,
   the questions security and finance ask, features and who it's for.
   Content lives in content/landingPages.js (layout: 'enterprise'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { AccessBuilder, MigrationPlan } from './EnterpriseDemos';

function Pillars({ data }) {
  return (
    <section className="lp-section en-pl-sec">
      <div className="lp-wrap">
        <p className="en-pl-text reveal">{data.text}</p>
        <div className="en-pls">
          {data.items.map((x, i) => (
            <article key={x.title} className={`en-pl reveal reveal-delay-${i + 1}`}>
              <span className="en-pl-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="en-pl-ic"><i className={x.icon} aria-hidden="true"></i></span>
              <h3 className="en-pl-title">{x.title}</h3>
              <p className="en-pl-desc">{x.text}</p>
              <span className="en-pl-ok"><i className="ri-check-line" aria-hidden="true"></i>Covered</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Questions({ page }) {
  return (
    <section className="lp-section en-q-sec">
      <div className="lp-wrap">
        <div className="en-head reveal">
          <span className="lp-kicker">The review</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <div className="en-qs">
          {page.challenges.map((c, i) => (
            <article key={c.problem} className={`en-q reveal reveal-delay-${(i % 2) + 1}`}>
              <p className="en-q-ask"><span>{i % 2 ? 'Finance' : 'Security'} asks</span>{c.problem}</p>
              <p className="en-q-ans"><i className="ri-corner-down-right-line" aria-hidden="true"></i>{c.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section en-feat-sec">
      <div className="lp-wrap">
        <div className="en-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="en-feats">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`en-feat lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="en-feat-top">
                <span className="en-feat-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <span className="en-feat-short">{c.short}</span>
              </div>
              <h3 className="en-feat-title">{c.title}</h3>
              <p className="en-feat-text">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience({ page }) {
  return (
    <section className="lp-section en-uc-sec">
      <div className="lp-wrap">
        <div className="en-head reveal">
          <span className="lp-kicker">Who it’s for</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="en-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`en-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="en-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
              <h3 className="en-uc-title">{a.title}</h3>
              <p className="en-uc-text">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EnterprisePage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.pillars && <Pillars data={page.pillars} />}
      {page.access && <AccessBuilder data={page.access} />}
      {page.migration && <MigrationPlan data={page.migration} />}
      {page.challenges && <Questions page={page} />}
      <Features page={page} />
      <Audience page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
