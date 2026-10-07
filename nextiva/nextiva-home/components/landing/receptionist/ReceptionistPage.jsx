/* AI Receptionist page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: a day of calls
   with and without the AI, the five jobs on every call, a language picker,
   hand-off rules, the features and use cases shown as a caller's first line.
   Content lives in content/landingPages.js (layout: 'receptionist'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { DayOfCalls, JobsDemo, LanguagesDemo, HandoffRules } from './ReceptionistDemos';

/* ── Features ─────────────────────────────────────────────────────────── */
function Features({ page }) {
  return (
    <section className="lp-section ar-feat-sec">
      <div className="lp-wrap">
        <div className="ar-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="ar-feats">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`ar-feat lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="ar-feat-ic"><i className={c.icon} aria-hidden="true"></i></span>
              <div>
                <h3 className="ar-feat-title">{c.title}</h3>
                <p className="ar-feat-text">{c.text}</p>
                <span className="ar-feat-short">{c.short}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Use cases as the caller's first line ─────────────────────────────── */
function UseCases({ page }) {
  return (
    <section className="lp-section ar-uc-sec">
      <div className="lp-wrap">
        <div className="ar-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="ar-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`ar-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="ar-uc-call" aria-hidden="true">
                <span className="ar-uc-in"><i className="ri-phone-fill"></i>Incoming</span>
                <p>{a.line}</p>
                <span className="ar-uc-ok"><i className="ri-check-line"></i>Answered by AI</span>
              </div>
              <div className="ar-uc-body">
                <span className="ar-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
                <h3 className="ar-uc-title">{a.title}</h3>
                <p className="ar-uc-text">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ReceptionistPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.hours && <DayOfCalls data={page.hours} />}
      {page.jobs && <JobsDemo data={page.jobs} />}
      {page.languages && <LanguagesDemo data={page.languages} />}
      {page.handoff && <HandoffRules data={page.handoff} />}
      <Features page={page} />
      <UseCases page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
