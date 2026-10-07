/* SaaS & Tech page. Hero, related pages, FAQ and closing CTA are the shared
   landing sections; the middle is this page's own: the six-layer stack,
   the webhook playground, the security questionnaire, build-vs-buy fixes,
   features and who it's for.
   Content lives in content/landingPages.js (layout: 'saas'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { LayersDemo, HooksDemo, ReviewDemo } from './SaasDemos';

function Fixes({ page }) {
  return (
    <section className="lp-section lp-section--theme sx-fx-sec">
      <div className="lp-wrap">
        <div className="sx-head reveal">
          <span className="lp-kicker">Build vs buy</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <div className="sx-fx">
          {page.challenges.map((c, i) => (
            <article key={c.problem} className={`sx-fx-card reveal reveal-delay-${(i % 2) + 1}`}>
              <code className="sx-fx-diff sx-fx-diff--rm">- {c.problem}</code>
              <code className="sx-fx-diff sx-fx-diff--add">+ {c.answer}</code>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section sx-ft-sec">
      <div className="lp-wrap">
        <div className="sx-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="sx-ft">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`sx-ft-card lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="sx-ft-top">
                <span className="sx-ft-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <span className="sx-ft-short">{c.short}</span>
              </div>
              <h3 className="sx-ft-title">{c.title}</h3>
              <p className="sx-ft-text">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience({ page }) {
  return (
    <section className="lp-section sx-au-sec">
      <div className="lp-wrap">
        <div className="sx-head reveal">
          <span className="lp-kicker">Who it’s for</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="sx-au">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`sx-au-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="sx-au-ic"><i className={a.icon} aria-hidden="true"></i></span>
              <h3 className="sx-au-title">{a.title}</h3>
              <p className="sx-au-text">{a.text}</p>
              <code className="sx-au-snip">{a.snip}</code>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SaasPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.layers && <LayersDemo data={page.layers} />}
      {page.hooks && <HooksDemo data={page.hooks} />}
      {page.review && <ReviewDemo data={page.review} />}
      {page.challenges && <Fixes page={page} />}
      <Features page={page} />
      <Audience page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
