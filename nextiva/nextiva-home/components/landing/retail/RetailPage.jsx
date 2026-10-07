/* Retail & eCom page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: one queue vs six
   tabs, the cart-recovery flow, peak-season staffing, the fixes, store
   integrations with features, and who it's for.
   Content lives in content/landingPages.js (layout: 'retail'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { QueueDemo, RecoveryDemo, PeakDemo } from './RetailDemos';

const STORES = [
  { name: 'Shopify', icon: 'ri-shopping-bag-line' },
  { name: 'BigCommerce', icon: 'ri-store-3-line' },
  { name: 'WooCommerce', icon: 'ri-shopping-cart-line' },
  { name: 'Magento', icon: 'ri-price-tag-3-line' },
];

function Fixes({ page }) {
  return (
    <section className="lp-section lp-section--theme rc-fx-sec">
      <div className="lp-wrap">
        <div className="rc-head reveal">
          <span className="lp-kicker">What changes</span>
          <h2 className="lp-h2">{page.challengesTitle}</h2>
        </div>
        <div className="rc-fx">
          {page.challenges.map((c, i) => (
            <article key={c.problem} className={`rc-fx-card reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="rc-fx-tag">Before</span>
              <p className="rc-fx-q">{c.problem}</p>
              <span className="rc-fx-tag rc-fx-tag--after">After</span>
              <p className="rc-fx-a">{c.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section rc-ft-sec">
      <div className="lp-wrap">
        <div className="rc-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
        </div>
        <div className="rc-stores reveal">
          <span className="rc-stores-k">Order context from</span>
          {STORES.map((s) => <span key={s.name} className="rc-store"><i className={s.icon} aria-hidden="true"></i>{s.name}</span>)}
          <span className="rc-stores-note">Orders, customers and carts synced to every conversation</span>
        </div>
        <div className="rc-ft">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`rc-ft-card lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="rc-ft-ic"><i className={c.icon} aria-hidden="true"></i></span>
              <h3 className="rc-ft-title">{c.title}</h3>
              <p className="rc-ft-text">{c.text}</p>
              <span className="rc-ft-short">{c.short}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience({ page }) {
  return (
    <section className="lp-section rc-au-sec">
      <div className="lp-wrap">
        <div className="rc-head reveal">
          <span className="lp-kicker">Who it’s for</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="rc-au">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`rc-au-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="rc-au-top">
                <span className="rc-au-ic"><i className={a.icon} aria-hidden="true"></i></span>
                <span className="rc-au-ask">“{a.ask}”</span>
              </div>
              <h3 className="rc-au-title">{a.title}</h3>
              <p className="rc-au-text">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RetailPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.queue && <QueueDemo data={page.queue} />}
      {page.recovery && <RecoveryDemo data={page.recovery} />}
      {page.peak && <PeakDemo data={page.peak} />}
      {page.challenges && <Fixes page={page} />}
      <Features page={page} />
      <Audience page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
