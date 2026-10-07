/* AI Sentiment Analysis page. Hero, related pages, FAQ and closing CTA are
   the shared landing sections; the middle is this page's own: a statement,
   a channel scorer, the signals as a bento with small visuals, a trend
   heatmap, language tiers and use cases with their sentiment curves.
   Content lives in content/landingPages.js (layout: 'sentiment'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { ChannelScorer, Heatmap } from './SentimentDemos';

function Statement({ text }) {
  return (
    <section className="lp-section se-st-sec">
      <div className="lp-wrap">
        <div className="se-st reveal">
          <span className="se-st-meter" aria-hidden="true"><i></i></span>
          <p>{text}</p>
        </div>
      </div>
    </section>
  );
}

/* Small visual for each signal card. */
function Visual({ kind }) {
  if (kind === 'trajectory') {
    return (
      <svg className="se-v-traj" viewBox="0 0 200 70" aria-hidden="true">
        <line x1="0" x2="200" y1="35" y2="35" />
        <path d="M0 26 L40 30 L70 50 L95 62 L120 44 L150 24 L200 12" />
        <circle cx="95" cy="62" r="4" />
        <text x="100" y="66">dip · 2:12</text>
      </svg>
    );
  }
  if (kind === 'route') {
    return (
      <div className="se-v-route">
        <span className="se-v-agent">J<em>Junior</em></span>
        <span className="se-v-arrow"><i className="ri-arrow-right-line"></i><b>≤ −60</b></span>
        <span className="se-v-agent is-sr">S<em>Senior</em></span>
      </div>
    );
  }
  if (kind === 'threshold') {
    return (
      <div className="se-v-th">
        {[['Billing', 70], ['Sales', 45], ['Support', 58]].map(([q, w]) => (
          <span key={q}><em>{q}</em><i><b style={{ width: `${w}%` }}></b></i></span>
        ))}
      </div>
    );
  }
  return (
    <div className="se-v-flag">
      <span><i className="ri-flag-2-fill"></i>Promise of refund date</span>
      <span><i className="ri-flag-2-fill"></i>Missed disclosure</span>
    </div>
  );
}

function Signals({ page }) {
  return (
    <section className="lp-section se-sig-sec">
      <div className="lp-wrap">
        <div className="se-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
          <p className="lp-intro">{page.capIntro}</p>
        </div>
        <div className="se-sig">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`se-card lp-tone--${c.tone} reveal reveal-delay-${(i % 2) + 1}`}>
              <div className="se-card-vis" aria-hidden="true"><Visual kind={c.visual} /></div>
              <div className="se-card-body">
                <span className="se-card-tag"><i className={c.icon} aria-hidden="true"></i>{c.short}</span>
                <h3 className="se-card-title">{c.title}</h3>
                <p className="se-card-text">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Languages({ data }) {
  return (
    <section className="lp-section se-lang-sec">
      <div className="lp-wrap">
        <div className="se-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="se-tiers">
          {data.tiers.map((t, i) => (
            <article key={t.name} className={`se-tier se-tier--${i ? 'b' : 'a'} reveal reveal-delay-${i + 1}`}>
              <div className="se-tier-top">
                <span className="se-tier-name">{t.name}</span>
                <b>{t.range}</b>
                <em>{t.note}</em>
              </div>
              <ul>{t.langs.map((l) => <li key={l}>{l}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="se-tier-foot reveal">+ 20 more languages · custom training on your own calls improves accuracy further</p>
      </div>
    </section>
  );
}

/* ── Use cases with a sentiment curve ─────────────────────────────────── */
const spark = (c) => c.map((v, i) => `${i ? 'L' : 'M'}${Math.round((i / (c.length - 1)) * 200)} ${Math.round(40 - v * 0.34)}`).join(' ');

function UseCases({ page }) {
  return (
    <section className="lp-section se-uc-sec">
      <div className="lp-wrap">
        <div className="se-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="se-uc">
          {page.audience.map((a, i) => (
            <article key={a.title} className={`se-uc-card lp-tone--${a.tone} reveal reveal-delay-${(i % 4) + 1}`}>
              <svg className="se-uc-spark" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" x2="200" y1="40" y2="40" />
                <path d={spark(a.curve)} />
              </svg>
              <div className="se-uc-body">
                <span className="se-uc-ic"><i className={a.icon} aria-hidden="true"></i></span>
                <h3 className="se-uc-title">{a.title}</h3>
                <p className="se-uc-text">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SentimentPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.statement && <Statement text={page.statement} />}
      {page.scorer && <ChannelScorer data={page.scorer} />}
      <Signals page={page} />
      {page.heat && <Heatmap data={page.heat} />}
      {page.langs && <Languages data={page.langs} />}
      <UseCases page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
