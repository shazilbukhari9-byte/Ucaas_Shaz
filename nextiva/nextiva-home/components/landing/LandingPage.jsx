import McmMegaHeader from '../blocks/McmMegaHeader';
import LogoTrustBar from '../blocks/LogoTrustBar';
import SiteFooter from '../blocks/SiteFooter';
import PageEffects from '../PageEffects';
import PhoneSystemMock from './PhoneSystemMock';
import FaqList from './FaqList';
import MultiSiteConsole from './MultiSiteConsole';
import MigrationTimeline from './MigrationTimeline';
import CtaFluidCanvas from './CtaFluidCanvas';
import SocialProofGrid from '../blocks/SocialProofGrid';
import { CompareTable, PricingTeaser } from './LandingExtras';
import FeatureExplorer from './FeatureExplorer';
import ScrollMotion from './ScrollMotion';
import RecordingMock from './RecordingMock';
import ComplianceAudit from './ComplianceAudit';
import TeamChatMock from './teamchat/TeamChatMock';
import SmsMock from './sms/SmsMock';
import IvrMock from './ivr/IvrMock';
import TollFreeMock from './tollfree/TollFreeMock';
import VideoMock from './video/VideoMock';
import FaxMock from './fax/FaxMock';
import UcaasMock from './ucaas/UcaasMock';
import SupervisorMock from './supervisor/SupervisorMock';
import ReceptionistMock from './receptionist/ReceptionistMock';
import SentimentMock from './sentiment/SentimentMock';
import AssistMock from './assist/AssistMock';
import CiMock from './ci/CiMock';
import RemoteMock from './remote/RemoteMock';
import SmbMock from './smb/SmbMock';
import EnterpriseMock from './enterprise/EnterpriseMock';
import SalesMock from './sales/SalesMock';
import SupportMock from './support/SupportMock';
import FinanceMock from './finance/FinanceMock';
import RetailMock from './retail/RetailMock';
import SaasMock from './saas/SaasMock';
import LogisticsMock from './logistics/LogisticsMock';
import { PAGES, HUBS } from '../../content/landingPages';

/* Shared layout for every Features and Solutions page (content in
   content/landingPages.js). Server-rendered; the only interactive piece is
   the FAQ accordion (FaqList) and the Hosted Phone System hero mock.

   The page's own layout and components are its own; the BACKGROUND theme is
   the home page's: the hero sits on the home aurora (drifting pastel
   gradient, cloud crest, snow) and the sections alternate the home cream and
   white grounds.

   Section order: hero → proof stats → capabilities → how it works /
   challenges → who it's for → related pages → FAQ → closing CTA. Sections
   with no content for a page are simply skipped. */

function Icon({ name, tone = 'blue' }) {
  return (
    <span className={`lp-ic lp-tone--${tone}`} aria-hidden="true">
      <i className={name}></i>
    </span>
  );
}

/* Home-page hero backdrop: the same aurora, cloud and snow layers the home
   hero uses (styled by the home .section-hero--aurora rules). */
export function AuroraBackdrop({ art }) {
  return (
    <>
      {/* With artwork the aurora sits fully behind the opaque painting, so its
          drift is switched off (styles/60-perf.css) — it was never visible. */}
      <div className={`hero-aurora${art ? ' hero-aurora--under-art' : ''}`} aria-hidden="true"></div>
      {art
        ? <div className="lp-hero-art" aria-hidden="true" style={{ backgroundImage: `url(${art})` }}></div>
        : <div className="hero-clouds" aria-hidden="true" style={{ backgroundImage: 'url(/media/pastel-clouds-hero.webp)' }}></div>}
      <div className="hero-particles hero-particles--snow" id="heroFloatingParticles" aria-hidden="true"></div>
    </>
  );
}

export function Crumbs({ page }) {
  const hub = HUBS[page.section];
  return (
    <nav className="lp-crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      {/* Numbers has no hub page yet, so its crumb is plain text. */}
      {hub.path ? <a href={hub.path}>{hub.label}</a> : <span>{hub.label}</span>}
      <span aria-hidden="true">/</span>
      <span aria-current="page">{page.navTitle || page.title}</span>
    </nav>
  );
}

export function Hero({ page }) {
  return (
    <section className={`lp-hero section-hero--aurora${page.heroMock ? ` lp-hero--${page.heroMock}` : ''}`}>
      <AuroraBackdrop art={page.heroArt} />
      <div className="lp-wrap lp-hero-grid">
        <div className="lp-hero-copy reveal">
          <Crumbs page={page} />
          <span className={`lp-eyebrow${page.eyebrowStyle === "badge" ? " lp-eyebrow--badge" : ""}`}>
            <i className={page.icon} aria-hidden="true"></i>
            {page.eyebrow}
          </span>
          <h1 className="lp-title">{page.headline}</h1>
          <p className="lp-lede">{page.lede}</p>
          <div className="lp-actions">
            {/* heroCta swaps the primary action for pages that lead with a demo. */}
            <a className="lp-btn lp-btn--solid" href={page.heroCta?.href || '/sign-up'}>
              {page.heroCta?.label || 'Start free trial'} <i className="ri-arrow-right-line" aria-hidden="true"></i>
            </a>
            <a className="lp-btn lp-btn--ghost" href="/contact-sales">Talk to sales</a>
          </div>
          <ul className="lp-ticks">
            {(page.ticks || ['No hardware', 'Live in minutes', 'Cancel anytime']).map((t) => (
              <li key={t}><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{t}</li>
            ))}
          </ul>
          {/* statsInHero: the proof numbers sit under the actions instead of in
              their own band below the hero. */}
          {page.statsInHero && page.stats?.length > 0 && (
            <dl className="lp-hero-stats">
              {page.stats.slice(0, 4).map((st) => (
                <div key={st.label}><dt>{st.value}</dt><dd>{st.label}</dd></div>
              ))}
            </dl>
          )}
        </div>

        {/* Visual: a product-style card built from the page's own data — the
            headline capability list as a live "panel", with floating stats. */}
        {/* panelStyle 'integrated': the two stats sit in a footer bar inside the
            panel instead of floating over its corners (no overlap). */}
        <div
          className={`lp-hero-visual reveal reveal-delay-1${page.panelStyle === 'integrated' ? ' lp-hero-visual--integrated' : ''}`}
          aria-hidden={page.heroMock ? undefined : "true"}
        >
          {page.heroMock === 'phone-system' ? <PhoneSystemMock page={{ icon: page.icon, title: page.navTitle || page.title, stats: page.stats }} /> : page.heroMock === 'call-recording' ? <RecordingMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'team-chat' ? <TeamChatMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'sms' ? <SmsMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'ivr' ? <IvrMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'toll-free' ? <TollFreeMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'video' ? <VideoMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'fax' ? <FaxMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'ucaas' ? <UcaasMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'supervisor' ? <SupervisorMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'receptionist' ? <ReceptionistMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'sentiment' ? <SentimentMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'assist' ? <AssistMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'ci' ? <CiMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'remote' ? <RemoteMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'smb' ? <SmbMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'enterprise' ? <EnterpriseMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'sales' ? <SalesMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'support' ? <SupportMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'finance' ? <FinanceMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'retail' ? <RetailMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'saas' ? <SaasMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : page.heroMock === 'logistics' ? <LogisticsMock page={{ icon: page.icon, title: page.navTitle || page.title }} /> : (
          <div className="lp-panel">
            <div className="lp-panel-head">
              <span className="lp-dots"><i></i><i></i><i></i></span>
              <span className="lp-panel-title">
                {page.panelStyle === 'integrated'
                  ? <span className="lp-panel-badge"><i className={page.icon}></i></span>
                  : <i className={page.icon}></i>}
                {page.navTitle || page.title}
              </span>
              <span className="lp-live">Live</span>
            </div>
            <ul className="lp-panel-list">
              {page.capabilities.slice(0, 4).map((c) => (
                <li key={c.title}>
                  <Icon name={c.icon} tone={c.tone} />
                  <span><b>{c.title}</b><em>{c.short || c.text}</em></span>
                  <i className="ri-checkbox-circle-fill lp-ok"></i>
                </li>
              ))}
            </ul>
            {page.panelStyle === 'integrated' && page.stats?.length > 1 && (
              <div className="lp-panel-stats">
                {page.stats.slice(0, 2).map((s) => (
                  <div className="lp-panel-stat" key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          )}
          {page.panelStyle !== 'integrated' && page.stats?.[0] && (
            <div className="lp-float lp-float--a">
              <b>{page.stats[0].value}</b><span>{page.stats[0].label}</span>
            </div>
          )}
          {page.panelStyle !== 'integrated' && page.stats?.[1] && (
            <div className="lp-float lp-float--b">
              <b>{page.stats[1].value}</b><span>{page.stats[1].label}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stats({ stats }) {
  if (!stats?.length) return null;
  return (
    <section className="lp-stats">
      <div className="lp-wrap lp-stats-grid reveal">
        {stats.map((s) => (
          <div className="lp-stat" key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, intro }) {
  return (
    <div className="lp-head reveal">
      {kicker && <span className="lp-kicker">{kicker}</span>}
      <h2 className="lp-h2">{title}</h2>
      {intro && <p className="lp-intro">{intro}</p>}
    </div>
  );
}

function Capabilities({ page }) {
  return (
    <section className={`lp-section${page.capStyle === 'explorer' ? ' lp-section--fx' : ''}`}>
      <div className="lp-wrap">
        <SectionHead kicker={page.capKicker || 'What you get'} title={page.capTitle} intro={page.capIntro} />
        {/* capStyle 'explorer': one card — feature list + detail panel.
            capStyle 'scatter': small cards strewn at slight angles. */}
        {page.capStyle === 'explorer' ? <FeatureExplorer items={page.capabilities} /> : (
        <div className={`lp-cards${page.capStyle === 'scatter' ? ' lp-cards--scatter' : ''}`}>
          {page.capabilities.map((c, i) => (
            <article className={`lp-card reveal reveal-delay-${(i % 3) + 1}`} key={c.title}>
              <Icon name={c.icon} tone={c.tone} />
              <h3 className="lp-card-title">{c.title}</h3>
              <div className="lp-card-text">{c.text}</div>
            </article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

/* Features get numbered steps; Solutions get challenge → answer pairs. */
function HowItWorks({ page }) {
  // stepsStyle 'timeline': day-by-day migration on a connected rail.
  if (page.steps?.length && page.stepsStyle === 'timeline') {
    return (
      <section className="lp-section lp-section--tint">
        <div className="lp-wrap">
          <SectionHead kicker={page.stepsKicker || 'How it works'} title={page.stepsTitle} intro={page.stepsIntro} />
          <MigrationTimeline steps={page.steps} />
        </div>
      </section>
    );
  }
  if (page.steps?.length) {
    return (
      <section className="lp-section lp-section--tint">
        <div className="lp-wrap">
          <SectionHead kicker={page.stepsKicker || 'How it works'} title={page.stepsTitle || 'Up and running in three steps'} />
          <ol className="lp-steps">
            {page.steps.map((s, i) => (
              <li className={`lp-step reveal reveal-delay-${i + 1}`} key={s.title}>
                <span className="lp-step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="lp-card-title">{s.title}</h3>
                <div className="lp-card-text">{s.text}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
  if (page.challenges?.length) {
    return (
      <section className="lp-section lp-section--tint">
        <div className="lp-wrap">
          <SectionHead kicker="The fix" title={page.challengesTitle || 'What changes when you switch'} />
          <div className="lp-pairs">
            {page.challenges.map((c, i) => (
              <div className={`lp-pair reveal reveal-delay-${(i % 3) + 1}`} key={c.problem}>
                <div className="lp-pair-problem"><i className="ri-close-circle-line" aria-hidden="true"></i>{c.problem}</div>
                <div className="lp-pair-answer"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i>{c.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return null;
}

function Audience({ page }) {
  if (!page.audience?.length) return null;
  return (
    <section className="lp-section">
      <div className={`lp-wrap lp-split${page.audienceStyle === 'persona' ? ' lp-split--persona' : ''}`}>
        {page.audienceStyle === 'persona' ? (
          // Head column stretches to the card grid's height: kicker level with
          // the top row, the points list level with the bottom row.
          <div className="lp-persona-head">
            <SectionHead kicker={page.audienceKicker || 'Built for'} title={page.audienceTitle} intro={page.audienceIntro} />
            {page.audiencePoints?.length > 0 && (
              <ul className="lp-persona-points reveal">
                {page.audiencePoints.map((t) => (
                  <li key={t}><i className="ri-check-line" aria-hidden="true"></i>{t}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <SectionHead kicker={page.audienceKicker || 'Built for'} title={page.audienceTitle} intro={page.audienceIntro} />
        )}
        {page.audienceStyle === 'persona' ? (
          <ul className="lp-personas reveal">
            {page.audience.map((a, i) => (
              <li key={a.title} className={`lp-persona lp-tone--${a.tone || 'blue'}`}>
                <i className={`${a.icon} lp-persona-mark`} aria-hidden="true"></i>
                <div className="lp-persona-top">
                  <span className="lp-persona-num">{String(i + 1).padStart(2, '0')}</span>
                  <Icon name={a.icon} tone={a.tone} />
                </div>
                <b className="lp-persona-title">{a.title}</b>
                <span className="lp-persona-text">{a.text}</span>
                {a.tags?.length > 0 && (
                  <div className="lp-persona-foot">
                    {a.tags.map((t) => <span className="lp-persona-tag" key={t}>{t}</span>)}
                    <i className="ri-check-line lp-persona-go" aria-hidden="true"></i>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="lp-audience reveal">
            {page.audience.map((a) => (
              <li key={a.title}>
                <Icon name={a.icon} tone={a.tone} />
                <span><b>{a.title}</b><em>{a.text}</em></span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* "Works with": its own framed band, so it doesn't read as a tail of the
   section above. The left side names this page as the hub; the right side
   holds the related pages as full cards. */
export function Related({ page }) {
  const items = (page.related || []).map((p) => PAGES[p]).filter(Boolean);
  if (!items.length) return null;
  const name = page.navTitle || page.title;
  return (
    <section className="lp-section lp-ww-sec">
      <div className="lp-wrap">
        <div className="lp-ww reveal">
          <div className="lp-ww-intro">
            <span className="lp-kicker">Works with</span>
            <h2 className="lp-h2 lp-ww-title">Pairs well with</h2>
            <p className="lp-ww-text">{name} shares the same login, numbers and admin console as the rest of the platform — add any of these without a new vendor.</p>
            <div className="lp-ww-hub" aria-hidden="true">
              <span className="lp-ww-hub-core"><Icon name={page.icon} tone={page.tone} /><b>{name}</b></span>
              <span className="lp-ww-hub-lines">{items.map((r) => <i key={r.path}></i>)}</span>
              <span className="lp-ww-hub-n">+{items.length} that connect</span>
            </div>
          </div>
          <div className="lp-ww-grid">
            {items.map((r, i) => (
              <a className={`lp-ww-card reveal reveal-delay-${(i % 4) + 1}`} href={r.path} key={r.path}>
                <span className="lp-ww-card-top">
                  <Icon name={r.icon} tone={r.tone} />
                  <i className="ri-arrow-right-up-line lp-ww-arrow" aria-hidden="true"></i>
                </span>
                <b>{r.navTitle || r.title}</b>
                <em>{r.summary}</em>
                <span className="lp-ww-more">Explore</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ faq }) {
  if (!faq?.length) return null;
  return (
    <section className="lp-section lp-faq-sec">
      <div className="lp-wrap lp-faq-wrap">
        <SectionHead kicker="FAQ" title="Questions, answered" />
        <FaqList faq={faq} />
      </div>
    </section>
  );
}

/* Closing CTA. Our own take on a "fluid" banner: a marbled backdrop in the
   brand oranges (an SVG stripe gradient pushed around by turbulence, drifting
   slowly) under a fine film grain and a light sheen that sweeps across now
   and then. Copy and a trust line sit on the left, the two actions on the
   right. */
function CtaFluid() {
  return (
    <svg className="lp-cta-bg" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lpCtaStripes" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="150" y2="95" spreadMethod="reflect">
          <stop offset="0" stopColor="#12032e" />
          <stop offset=".34" stopColor="#3a0d2e" />
          <stop offset=".58" stopColor="#f8b27a" />
          <stop offset=".8" stopColor="#fcd0a8" />
          <stop offset="1" stopColor="#fff1e3" />
        </linearGradient>
        <filter id="lpCtaSwirl" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.0034" numOctaves="2" seed="4" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="420" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <rect x="-200" y="-200" width="1600" height="820" fill="url(#lpCtaStripes)" filter="url(#lpCtaSwirl)" />
    </svg>
  );
}

export function ClosingCta({ page }) {
  const name = page.navTitle || page.title;
  return (
    <section className="lp-cta-wrap">
      <div className="lp-wrap">
        <div className="lp-cta reveal">
          <CtaFluid />
          <CtaFluidCanvas />
          <span className="lp-cta-grain" aria-hidden="true"></span>
          <div className="lp-cta-copy">
            <span className="lp-cta-eyebrow">Get started today</span>
            <h2 className="lp-h2 lp-cta-title">
              {page.ctaTitle || (name ? <>Ready to try <span className="lp-cta-hl">{name}</span>?</> : 'Ready to get started?')}
            </h2>
            <div className="lp-cta-text">{page.ctaText || 'Set up in minutes. No hardware, no contracts — and a real person whenever you need one.'}</div>
            <ul className="lp-cta-trust">
              <li><i className="ri-flashlight-line" aria-hidden="true"></i>Live in minutes</li>
              <li><i className="ri-arrow-left-right-line" aria-hidden="true"></i>Free number porting</li>
              <li><i className="ri-close-circle-line" aria-hidden="true"></i>Cancel anytime</li>
            </ul>
          </div>
          <div className="lp-cta-side">
            {/* Demo-led pages (page.heroCta) lead with "Book a demo" here too,
                with "Talk to sales" as the second action. */}
            <div className="lp-actions">
              {page.heroCta ? (
                <>
                  <a className="lp-btn lp-cta-btn" href={page.heroCta.href}>
                    <span>{page.heroCta.label}</span>
                    <i className="ri-arrow-right-line" aria-hidden="true"></i>
                  </a>
                  <a className="lp-btn lp-cta-btn lp-cta-btn--glass" href="/contact-sales">
                    <i className="ri-customer-service-2-line" aria-hidden="true"></i> Talk to sales
                  </a>
                </>
              ) : (
                <>
                  <a className="lp-btn lp-cta-btn" href="/sign-up">
                    <span>Start free trial</span>
                    <i className="ri-arrow-right-line" aria-hidden="true"></i>
                  </a>
                  <a className="lp-btn lp-cta-btn lp-cta-btn--glass" href="/sign-up?intent=demo">
                    <i className="ri-calendar-line" aria-hidden="true"></i> Book a demo
                  </a>
                </>
              )}
            </div>
            <a className="lp-cta-help" href="/contact-sales">
              Prefer to talk it through? <b>Speak with our team</b> <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Shell({ children }) {
  return (
    <>
      <div className="wp-site-blocks">
        <header className="is-style-ucaas-header-block-transparent header--on-light wp-block-template-part">
          <McmMegaHeader />
        </header>
        <main className="lp">{children}</main>
        <SiteFooter />
      </div>
      <PageEffects />
    </>
  );
}

export default function LandingPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {!page.statsInHero && <Stats stats={page.stats} />}
      <Capabilities page={page} />
      {page.multiSite && <MultiSiteConsole data={page.multiSite} />}
      {page.compliance && <ComplianceAudit data={page.compliance} />}
      <HowItWorks page={page} />
      <Audience page={page} />
      {page.compare && <CompareTable data={page.compare} productName={page.navTitle || page.title} />}
      {/* The home page's customer-stories marquee, on pages that opt in. */}
      {page.testimonials && <SocialProofGrid />}
      {page.pricingTeaser && <PricingTeaser data={page.pricingTeaser} />}
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
      {page.scrollMotion && <ScrollMotion />}
    </Shell>
  );
}

/* Hub pages (/features, /solutions): every page in the section as cards,
   grouped the way the content plan groups them. */
export function HubPage({ hubKey }) {
  const hub = HUBS[hubKey];
  return (
    <Shell>
      <section className="lp-hero lp-hero--hub section-hero--aurora">
        <AuroraBackdrop />
        <div className="lp-wrap">
          <div className="lp-hero-copy lp-hero-copy--center reveal">
            <span className="lp-eyebrow"><i className={hub.icon} aria-hidden="true"></i>{hub.eyebrow}</span>
            <h1 className="lp-title">{hub.headline}</h1>
            <p className="lp-lede">{hub.lede}</p>
          </div>
        </div>
      </section>
      {hub.groups.map((g) => (
        <section className="lp-section" key={g.title}>
          <div className="lp-wrap">
            <SectionHead kicker={g.kicker} title={g.title} intro={g.intro} />
            <div className="lp-related lp-related--hub">
              {g.paths.map((p) => PAGES[p]).filter(Boolean).map((r) => (
                <a className="lp-related-card reveal" href={r.path} key={r.path}>
                  <Icon name={r.icon} tone={r.tone} />
                  <span><b>{r.navTitle || r.title}</b><em>{r.summary}</em></span>
                  <i className="ri-arrow-right-up-line lp-related-arrow" aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}
      <ClosingCta page={{ ctaTitle: hub.ctaTitle }} />
    </Shell>
  );
}

/* Shared metadata builder for the route files. */
export function landingMetadata(page) {
  const title = `${page.metaTitle || page.title} | UCaaS`;
  return {
    title,
    description: page.metaDescription || page.lede,
    alternates: { canonical: page.path },
    openGraph: { type: 'website', siteName: 'UCaaS', title, description: page.metaDescription || page.lede },
  };
}
