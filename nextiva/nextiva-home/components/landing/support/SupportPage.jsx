/* Support Teams page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: three channels as
   one conversation, eight channels into one queue, knowledge suggestions
   with citations, AI tier-1, the problems it fixes, features and who it's
   for. Content lives in content/landingPages.js (layout: 'support'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { MergeDemo, ChannelsDemo, KnowledgeDemo, Tier1Demo } from './SupportDemos';

function Fixes({ page }) {
  return (
    <section className="lp-section st-fx-sec">
      <div className="lp-wrap">
        <div className="st-head reveal">
          <span className="lp-kicker">What changes</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <div className="st-fx">
          {page.challenges.map((c, i) => (
            <article key={c.problem} className={`st-fx-card reveal reveal-delay-${(i % 4) + 1}`}>
              <p className="st-fx-q"><i className="ri-chat-delete-line" aria-hidden="true"></i>{c.problem}</p>
              <p className="st-fx-a"><i className="ri-chat-check-line" aria-hidden="true"></i>{c.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section st-ft-sec">
      <div className="lp-wrap">
        <div className="st-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="st-ft">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`st-ft-card lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="st-ft-ic"><i className={c.icon} aria-hidden="true"></i></span>
              <h3 className="st-ft-title">{c.title}</h3>
              <p className="st-ft-text">{c.text}</p>
              <span className="st-ft-short">{c.short}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience({ page }) {
  return (
    <section className="lp-section st-au-sec">
      <div className="lp-wrap">
        <div className="st-head reveal">
          <span className="lp-kicker">Who it’s for</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="st-au">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`st-au-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="st-au-ask" aria-hidden="true">{a.ask}</span>
              <span className="st-au-ic"><i className={a.icon} aria-hidden="true"></i></span>
              <h3 className="st-au-title">{a.title}</h3>
              <p className="st-au-text">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SupportPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.statement && <MergeDemo text={page.statement} />}
      {page.channels && <ChannelsDemo data={page.channels} />}
      {page.knowledge && <KnowledgeDemo data={page.knowledge} />}
      {page.tier1 && <Tier1Demo data={page.tier1} />}
      {page.challenges && <Fixes page={page} />}
      <Features page={page} />
      <Audience page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
