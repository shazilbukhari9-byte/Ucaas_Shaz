'use client';

/**
 * Hero for /cloud-phone/phone-texting — ours.
 *
 * Replaces the captured editorial hero: the eight-photo image row is gone
 * (those were the reference site's photographs), the copy is UCaaS's own, and
 * the layout is a split — copy left, visual column right. The right column is
 * intentionally empty for now, holding its space until the dashboard or
 * artwork that belongs there is ready.
 *
 * Class names are bvh-* and styled in styles/business-voice/hero-ucaas.css,
 * so none of the captured hero rules apply to it.
 */
export default function HeroEditorial() {
  return (
    <section className="bvh-hero">
      {/* Same dawn ridge backdrop the product hero used. */}
      <div className="bvh-hero-bg" aria-hidden="true"></div>
      <div className="floating-particles" aria-hidden="true"></div>

      <div className="bvh-hero-inner">
        <div className="bvh-hero-copy">
          <span className="bvh-eyebrow">
            <i className="ri-sparkling-2-fill" aria-hidden="true"></i> Cloud Phone · Phone &amp; Texting
          </span>

          <h1 className="bvh-title">
            The business phone system <em>that works everywhere you do.</em>
          </h1>

          <p className="bvh-lede">
            Unlimited calling and texting on one number, on every device — set up in minutes,
            backed by 99.999% uptime.
          </p>

          <div className="bvh-ctas">
            <a className="bvh-btn bvh-btn--primary" href="/get-started">
              Start free trial
              <i className="ri-arrow-right-line" aria-hidden="true"></i>
            </a>
            <a className="bvh-btn bvh-btn--ghost" href="/pricing">
              See pricing
            </a>
          </div>

          <p className="bvh-trustline">Plans from $15/user/mo · Free number porting · Live in minutes</p>
        </div>

        {/* Reserved for the product visual. Empty by design for now — it holds
            the column so the split does not collapse while the artwork is
            still to come. */}
        <div className="bvh-hero-visual" aria-hidden="true"></div>
      </div>
    </section>
  );
}
