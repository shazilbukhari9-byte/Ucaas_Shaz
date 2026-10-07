/* AI Agent Assist page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: a new-hire ramp
   chart, the five whisper types, chat assist with tone, a private-data
   diagram, a same-day setup timeline and use cases with their whispers.
   Content lives in content/landingPages.js (layout: 'assist'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { RampDemo, WhisperTypes, ChatAssist } from './AssistDemos';

/* ── Private by design: data flow ─────────────────────────────────────── */
function Tenant({ data }) {
  return (
    <section className="lp-section lp-section--theme ag-ten-sec">
      <div className="lp-wrap">
        <div className="ag-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="ag-ten reveal reveal-delay-1">
          <div className="ag-ten-src">
            {data.sources.map((s) => (
              <div key={s.title} className="ag-ten-item">
                <span className="ag-ten-ic"><i className={s.icon} aria-hidden="true"></i></span>
                <span><b>{s.title}</b><em>{s.text}</em></span>
              </div>
            ))}
          </div>
          <div className="ag-ten-flow" aria-hidden="true"><i></i><i></i><i></i></div>
          <div className="ag-ten-vault">
            <span className="ag-ten-lock"><i className="ri-lock-2-fill" aria-hidden="true"></i></span>
            <b>Your account</b>
            <em>Your model · your whispers</em>
            <ul>{data.guarantees.map((g) => <li key={g}><i className="ri-check-line" aria-hidden="true"></i>{g}</li>)}</ul>
          </div>
          <div className="ag-ten-no" aria-hidden="true">
            <span className="ag-ten-x"><i className="ri-close-line"></i></span>
            <em>Other customers’ models</em>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Setup timeline ───────────────────────────────────────────────────── */
function Setup({ data }) {
  return (
    <section className="lp-section ag-set-sec">
      <div className="lp-wrap">
        <div className="ag-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
        </div>
        <ol className="ag-set reveal reveal-delay-1">
          {data.steps.map((s, i) => (
            <li key={s.title} className="ag-set-step">
              <span className="ag-set-time">{s.time}</span>
              <span className="ag-set-ic"><i className={s.icon} aria-hidden="true"></i><b>{i + 1}</b></span>
              <h3 className="ag-set-title">{s.title}</h3>
              <p className="ag-set-text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Use cases with the whisper an agent would hear ───────────────────── */
function UseCases({ page }) {
  return (
    <section className="lp-section ag-uc-sec">
      <div className="lp-wrap">
        <div className="ag-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="ag-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`ag-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="ag-uc-ear" aria-hidden="true">
                <span><i className="ri-sparkling-2-fill"></i>Whisper</span>
                <p>“{a.whisper}”</p>
              </div>
              <div className="ag-uc-body">
                <span className="ag-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
                <h3 className="ag-uc-title">{a.title}</h3>
                <p className="ag-uc-text">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AssistPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.ramp && <RampDemo data={page.ramp} />}
      {page.whispers && <WhisperTypes data={page.whispers} />}
      {page.chat && <ChatAssist data={page.chat} />}
      {page.tenant && <Tenant data={page.tenant} />}
      {page.setup && <Setup data={page.setup} />}
      <UseCases page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
