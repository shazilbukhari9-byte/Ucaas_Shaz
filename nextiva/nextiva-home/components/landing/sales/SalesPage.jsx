/* Sales Teams page. Hero, related pages, FAQ and closing CTA are the shared
   landing sections; the middle is this page's own: the rep gap with live
   coaching, a dialer session, the Monday huddle of ranked objections, what
   holds teams back, features with CRM sync and who it's for.
   Content lives in content/landingPages.js (layout: 'sales'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { GapDemo, DialerDemo, HuddleDemo } from './SalesDemos';

const CRMS = ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho', 'Outreach', 'Salesloft'];

function Fixes({ page }) {
  return (
    <section className="lp-section lp-section--theme sl-fx-sec">
      <div className="lp-wrap">
        <div className="sl-head reveal">
          <span className="lp-kicker">Before &amp; after</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <ol className="sl-fx">
          {page.challenges.map((c, i) => (
            <li key={c.problem} className={`sl-fx-row reveal reveal-delay-${(i % 2) + 1}`}>
              <span className="sl-fx-n">{String(i + 1).padStart(2, '0')}</span>
              <p className="sl-fx-before"><i className="ri-close-circle-line" aria-hidden="true"></i>{c.problem}</p>
              <i className="ri-arrow-right-line sl-fx-arrow" aria-hidden="true"></i>
              <p className="sl-fx-after"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{c.answer}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section sl-ft-sec">
      <div className="lp-wrap">
        <div className="sl-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="sl-ft">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`sl-ft-card lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="sl-ft-ic"><i className={c.icon} aria-hidden="true"></i></span>
              <span className="sl-ft-body">
                <h3 className="sl-ft-title">{c.title}</h3>
                <p className="sl-ft-text">{c.text}</p>
              </span>
              <span className="sl-ft-short">{c.short}</span>
            </article>
          ))}
        </div>
        <div className="sl-crm reveal">
          <div className="sl-crm-rec" aria-hidden="true">
            <span className="sl-crm-top"><i className="ri-contacts-book-2-line"></i>Hannah W. · Northwind Dental<em>Updated just now</em></span>
            <span className="sl-crm-line"><b>Call</b>6m 12s · price objection handled</span>
            <span className="sl-crm-line"><b>Stage</b>Qualified → Proposal</span>
            <span className="sl-crm-line"><b>Next step</b>Send a 12-month cost comparison by Thu</span>
          </div>
          <div className="sl-crm-copy">
            <h3 className="sl-crm-title">Native CRM sync — nobody types notes after a call</h3>
            <p className="sl-crm-text">Each call is summarized and written to the right contact and deal, with the outcome and the next step. Two-way sync keeps the dialer list in step with your CRM.</p>
            <div className="sl-crm-chips">{CRMS.map((c) => <span key={c}>{c}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Audience({ page }) {
  return (
    <section className="lp-section sl-au-sec">
      <div className="lp-wrap">
        <div className="sl-head reveal">
          <span className="lp-kicker">Who it’s for</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="sl-au">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`sl-au-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="sl-au-ic"><i className={a.icon} aria-hidden="true"></i></span>
              <h3 className="sl-au-title">{a.title}</h3>
              <p className="sl-au-text">{a.text}</p>
              <span className="sl-au-metric"><i className="ri-focus-3-line" aria-hidden="true"></i>{a.metric}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SalesPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.statement && <GapDemo text={page.statement} />}
      {page.dialer && <DialerDemo data={page.dialer} />}
      {page.huddle && <HuddleDemo data={page.huddle} />}
      {page.challenges && <Fixes page={page} />}
      <Features page={page} />
      <Audience page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
