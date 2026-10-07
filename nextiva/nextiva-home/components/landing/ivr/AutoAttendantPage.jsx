/* Auto-attendant & IVR page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: a statement band,
   the five essentials as a branching flow, an hours & holidays calendar you
   can scrub, classic menu vs AI routing played side by side, a three-step
   build canvas and use cases shown as mini menus.
   Content lives in content/landingPages.js (layout: 'ivr'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import HoursDemo from './HoursDemo';
import MenuVsAi from './MenuVsAi';

/* ── Statement band ───────────────────────────────────────────────────── */
function Statement({ data }) {
  return (
    <section className="lp-section aa-st-sec">
      <div className="lp-wrap">
        <div className="aa-st reveal">
          <div className="aa-st-copy">
            {data.kicker && <span className="lp-kicker">{data.kicker}</span>}
            <p className="aa-st-text">
              {data.text} {data.highlight && <span className="aa-st-hl">{data.highlight}</span>}
            </p>
            <p className="aa-st-sub">{data.sub}</p>
          </div>
          <dl className="aa-st-points">
            {data.points.map((p) => (
              <div key={p.label} className="aa-st-point">
                {p.icon && <span className="aa-st-ic"><i className={p.icon} aria-hidden="true"></i></span>}
                <dt>{p.value}</dt>
                <dd>{p.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ── The five essentials as a branching flow ──────────────────────────── */
function Essentials({ page }) {
  return (
    <section className="lp-section aa-ess-sec">
      <div className="lp-wrap aa-ess">
        <div className="aa-ess-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
          <p className="lp-intro">{page.capIntro}</p>
        </div>
        <ol className="aa-ess-flow">
          {page.capabilities.map((c, i) => (
            <li key={c.title} className={`aa-ess-row lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="aa-ess-node" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="aa-ess-card">
                <span className="aa-ess-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <div className="aa-ess-txt">
                  <h3 className="aa-ess-title">{c.title}</h3>
                  <p className="aa-ess-text">{c.text}</p>
                  {c.chips && (
                    <ul className="aa-ess-chips">
                      {c.chips.map((x) => <li key={x}><i className="ri-check-line" aria-hidden="true"></i>{x}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Build: three blocks on a canvas ──────────────────────────────────── */
function Build({ page }) {
  return (
    <section className="lp-section aa-build-sec">
      <div className="lp-wrap">
        <div className="aa-head reveal">
          <span className="lp-kicker">{page.stepsKicker}</span>
          <h2 className="lp-h2">{page.stepsTitle}</h2>
        </div>
        <ol className="aa-canvas reveal reveal-delay-1">
          {page.steps.map((s, i) => (
            <li key={s.title} className="aa-block">
              <span className="aa-block-top">
                <span className="aa-block-ic"><i className={s.icon} aria-hidden="true"></i></span>
                <em>Step {i + 1}</em>
              </span>
              <h3 className="aa-block-title">{s.title}</h3>
              <p className="aa-block-text">{s.text}</p>
              <span className="aa-block-port aa-block-port--in" aria-hidden="true"></span>
              <span className="aa-block-port aa-block-port--out" aria-hidden="true"></span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Use cases as mini menus ──────────────────────────────────────────── */
function UseCases({ page }) {
  return (
    <section className="lp-section aa-uc-sec">
      <div className="lp-wrap">
        <div className="aa-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="aa-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`aa-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="aa-uc-menu" aria-hidden="true">
                <span className="aa-uc-greet"><i className="ri-volume-up-line"></i>Greeting</span>
                {a.menu.map((m, k) => (
                  <span key={m} className="aa-uc-opt"><b>{k + 1}</b>{m}</span>
                ))}
              </div>
              <div className="aa-uc-body">
                <span className="aa-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
                <h3 className="aa-uc-title">{a.title}</h3>
                <p className="aa-uc-text">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AutoAttendantPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.statement && <Statement data={page.statement} />}
      <Essentials page={page} />
      {page.hours && <HoursDemo data={page.hours} />}
      {page.ai && <MenuVsAi data={page.ai} />}
      <Build page={page} />
      <UseCases page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
