/* Supervisor Tools page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: a statement band,
   the three modes with a live audio-path diagram, the AI attention radar,
   features as keyboard-shortcut cards and the roles that use it.
   Content lives in content/landingPages.js (layout: 'supervisor'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { ModesDemo, RadarDemo } from './SupervisorDemos';

function Statement({ text }) {
  return (
    <section className="lp-section sv-st-sec">
      <div className="lp-wrap">
        <p className="sv-st reveal">
          <i className="ri-double-quotes-l" aria-hidden="true"></i>
          {text}
        </p>
      </div>
    </section>
  );
}

/* ── Features as shortcut cards ───────────────────────────────────────── */
function Features({ page }) {
  return (
    <section className="lp-section sv-feat-sec">
      <div className="lp-wrap">
        <div className="sv-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
          <p className="lp-intro">{page.capIntro}</p>
        </div>
        <div className="sv-keys">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`sv-key lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="sv-key-top">
                <span className="sv-key-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <kbd className="sv-kbd" title="Keyboard shortcut">{c.key}</kbd>
              </div>
              <h3 className="sv-key-title">{c.title}</h3>
              <p className="sv-key-text">{c.text}</p>
              <span className="sv-key-short">{c.short}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Roles that use it ────────────────────────────────────────────────── */
function Roles({ page }) {
  return (
    <section className="lp-section sv-role-sec">
      <div className="lp-wrap">
        <div className="sv-head reveal">
          <span className="lp-kicker">Who uses it</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="sv-roles">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`sv-role lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="sv-role-ic"><i className={a.icon} aria-hidden="true"></i></span>
              <h3 className="sv-role-title">{a.title}</h3>
              <p className="sv-role-text">{a.text}</p>
              <span className="sv-role-view"><i className="ri-layout-masonry-line" aria-hidden="true"></i>{a.view}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SupervisorPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.statement && <Statement text={page.statement} />}
      {page.modes && <ModesDemo data={page.modes} />}
      {page.radar && <RadarDemo data={page.radar} />}
      <Features page={page} />
      <Roles page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
