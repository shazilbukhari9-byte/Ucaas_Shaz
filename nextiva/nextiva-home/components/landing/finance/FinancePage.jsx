/* Financial Services page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: the disclosure
   timeline, attested outbound with pre-dial checks, the redact / keep /
   prove vault, the rules it helps meet, features and who it's for.
   Content lives in content/landingPages.js (layout: 'finance'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { DisclosureTimeline, OutboundDemo, VaultDemo } from './FinanceDemos';

function Rules({ page }) {
  return (
    <section className="lp-section lp-section--theme fn-ru-sec">
      <div className="lp-wrap">
        <div className="fn-head reveal">
          <span className="lp-kicker">The exam, answered</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <div className="fn-ru">
          {page.challenges.map((c, i) => (
            <article key={c.problem} className={`fn-ru-card reveal reveal-delay-${(i % 2) + 1}`}>
              <span className="fn-ru-n">{String(i + 1).padStart(2, '0')}</span>
              <p className="fn-ru-q">{c.problem}</p>
              <p className="fn-ru-a"><i className="ri-shield-check-fill" aria-hidden="true"></i>{c.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section fn-ft-sec">
      <div className="lp-wrap">
        <div className="fn-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="fn-ft">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`fn-ft-card lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="fn-ft-top">
                <span className="fn-ft-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <span className="fn-ft-short">{c.short}</span>
              </div>
              <h3 className="fn-ft-title">{c.title}</h3>
              <p className="fn-ft-text">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience({ page }) {
  return (
    <section className="lp-section fn-au-sec">
      <div className="lp-wrap">
        <div className="fn-head reveal">
          <span className="lp-kicker">Who it’s for</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="fn-au">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`fn-au-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="fn-au-ic"><i className={a.icon} aria-hidden="true"></i></span>
              <h3 className="fn-au-title">{a.title}</h3>
              <p className="fn-au-text">{a.text}</p>
              <span className="fn-au-rule"><i className="ri-checkbox-circle-line" aria-hidden="true"></i>{a.rule}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FinancePage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.disclosure && <DisclosureTimeline data={page.disclosure} />}
      {page.outbound && <OutboundDemo data={page.outbound} />}
      {page.vault && <VaultDemo data={page.vault} />}
      {page.challenges && <Rules page={page} />}
      <Features page={page} />
      <Audience page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
