/* Remote & Hybrid Teams page. Hero, related pages, FAQ and closing CTA are
   the shared landing sections; the middle is this page's own: a statement,
   one day on one number, a presence board, the old headaches vs the fix,
   features and where teams work from.
   Content lives in content/landingPages.js (layout: 'remote'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { DayTimeline, PresenceBoard, Statement } from './RemoteDemos';

function Fixes({ page }) {
  return (
    <section className="lp-section rt-fix-sec">
      <div className="lp-wrap">
        <div className="rt-head reveal">
          <span className="lp-kicker">Before → after</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <ol className="rt-fixes">
          {page.challenges.map((c, i) => (
            <li key={c.problem} className={`rt-fix reveal reveal-delay-${(i % 2) + 1}`}>
              <span className="rt-fix-n">{String(i + 1).padStart(2, '0')}</span>
              <p className="rt-fix-was"><i className="ri-close-circle-line" aria-hidden="true"></i>{c.problem}</p>
              <span className="rt-fix-arrow" aria-hidden="true"><i className="ri-arrow-right-line"></i></span>
              <p className="rt-fix-now"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{c.answer}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section rt-feat-sec">
      <div className="lp-wrap">
        <div className="rt-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="rt-feats">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`rt-feat lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="rt-feat-ic"><i className={c.icon} aria-hidden="true"></i></span>
              <h3 className="rt-feat-title">{c.title}</h3>
              <p className="rt-feat-text">{c.text}</p>
              <span className="rt-feat-short">{c.short}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Places({ page }) {
  return (
    <section className="lp-section rt-uc-sec">
      <div className="lp-wrap">
        <div className="rt-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="rt-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`rt-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="rt-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
              <h3 className="rt-uc-title">{a.title}</h3>
              <p className="rt-uc-text">{a.text}</p>
              <span className="rt-uc-dev"><i className="ri-smartphone-line" aria-hidden="true"></i>{a.device}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RemotePage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.statement && <Statement text={page.statement} />}
      {page.day && <DayTimeline data={page.day} />}
      {page.presence && <PresenceBoard data={page.presence} />}
      {page.challenges && <Fixes page={page} />}
      <Features page={page} />
      <Places page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
