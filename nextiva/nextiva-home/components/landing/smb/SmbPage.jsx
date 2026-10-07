/* SMB Owner-Operators page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: a missed-call
   estimate, an intake builder, the afternoon setup on a clock, sticky-note
   headaches with their fixes, features and the bookings each business gets.
   Content lives in content/landingPages.js (layout: 'smb'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { MissedCalls, IntakeBuilder } from './SmbDemos';

function Setup({ data }) {
  return (
    <section className="lp-section sb-set-sec">
      <div className="lp-wrap">
        <div className="sb-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <ol className="sb-clock reveal reveal-delay-1">
          {data.steps.map((s, i) => (
            <li key={s.time} className={`sb-clock-step${i === data.steps.length - 1 ? ' is-last' : ''}`}>
              <span className="sb-clock-t">{s.time}</span>
              <span className="sb-clock-ic"><i className={s.icon} aria-hidden="true"></i></span>
              <h3 className="sb-clock-title">{s.title}</h3>
              <p className="sb-clock-text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Notes({ page }) {
  return (
    <section className="lp-section sb-note-sec">
      <div className="lp-wrap">
        <div className="sb-head reveal">
          <span className="lp-kicker">Sound familiar?</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <div className="sb-notes">
          {page.challenges.map((c, i) => (
            <article key={c.problem} className={`sb-note sb-note--${i % 4} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="sb-pin" aria-hidden="true"></span>
              <p className="sb-note-was">{c.problem}</p>
              <p className="sb-note-fix"><span className="sb-stamp">Fixed</span>{c.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section sb-feat-sec">
      <div className="lp-wrap">
        <div className="sb-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="sb-feats">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`sb-feat lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="sb-feat-ic"><i className={c.icon} aria-hidden="true"></i></span>
              <div>
                <h3 className="sb-feat-title">{c.title}</h3>
                <p className="sb-feat-text">{c.text}</p>
                <span className="sb-feat-short">{c.short}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases({ page }) {
  return (
    <section className="lp-section sb-uc-sec">
      <div className="lp-wrap">
        <div className="sb-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="sb-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`sb-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="sb-uc-ticket" aria-hidden="true">
                <span><i className="ri-calendar-check-fill"></i>Booked by AI</span>
                <b>{a.booking}</b>
                <em><i className="ri-message-2-line"></i>Confirmation texted</em>
              </div>
              <div className="sb-uc-body">
                <span className="sb-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
                <h3 className="sb-uc-title">{a.title}</h3>
                <p className="sb-uc-text">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SmbPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.missed && <MissedCalls data={page.missed} />}
      {page.intake && <IntakeBuilder data={page.intake} />}
      {page.setup && <Setup data={page.setup} />}
      {page.challenges && <Notes page={page} />}
      <Features page={page} />
      <UseCases page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
