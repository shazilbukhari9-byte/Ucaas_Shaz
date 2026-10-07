/* Conversation Intelligence page. Hero, related pages, FAQ and closing CTA
   are the shared landing sections; the middle is this page's own: a
   statement, the five layers on one call, objection mining, built-in vs
   bolted-on, export & sync and use cases as the question each team asks.
   Content lives in content/landingPages.js (layout: 'ci'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { Layers, Objections, ExportSync } from './CiDemos';

function Statement({ text }) {
  return (
    <section className="lp-section cvi-st-sec">
      <div className="lp-wrap">
        <div className="cvi-st reveal">
          <span className="cvi-st-search" aria-hidden="true"><i className="ri-search-2-line"></i>what did the customer say about pricing?</span>
          <p>{text}</p>
        </div>
      </div>
    </section>
  );
}

function Native({ data }) {
  return (
    <section className="lp-section lp-section--theme cvi-nat-sec">
      <div className="lp-wrap">
        <div className="cvi-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="cvi-nat">
          <article className="cvi-nat-card cvi-nat-card--bolt reveal reveal-delay-1">
            <div className="cvi-nat-stack" aria-hidden="true">
              <span>Phone system</span><span>+ Meeting bot</span><span>+ Intelligence tool</span>
            </div>
            <h3 className="cvi-nat-title">Bolted on</h3>
            <ul>{data.bolted.map((x) => <li key={x}><i className="ri-close-line" aria-hidden="true"></i>{x}</li>)}</ul>
          </article>
          <article className="cvi-nat-card cvi-nat-card--native reveal reveal-delay-2">
            <div className="cvi-nat-stack is-one" aria-hidden="true">
              <span><i className="ri-brain-fill"></i>One platform · intelligence built in</span>
            </div>
            <h3 className="cvi-nat-title">Built in</h3>
            <ul>{data.builtin.map((x) => <li key={x}><i className="ri-check-line" aria-hidden="true"></i>{x}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function UseCases({ page }) {
  return (
    <section className="lp-section cvi-uc-sec">
      <div className="lp-wrap">
        <div className="cvi-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="cvi-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`cvi-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="cvi-uc-ask" aria-hidden="true">
                <span><i className="ri-search-2-line"></i>Ask the archive</span>
                <p>{a.ask}</p>
              </div>
              <div className="cvi-uc-body">
                <span className="cvi-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
                <h3 className="cvi-uc-title">{a.title}</h3>
                <p className="cvi-uc-text">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CiPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.statement && <Statement text={page.statement} />}
      {page.layers && <Layers data={page.layers} />}
      {page.objections && <Objections data={page.objections} />}
      {page.native && <Native data={page.native} />}
      {page.export && <ExportSync data={page.export} />}
      <UseCases page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
