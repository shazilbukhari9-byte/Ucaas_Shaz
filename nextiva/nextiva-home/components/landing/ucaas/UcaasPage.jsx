/* UCaaS overview page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: why unify (split
   tools vs one platform), the feature catalog, a follow-the-sun global team,
   a team-size scale slider and integrations.
   Content lives in content/landingPages.js (layout: 'ucaas'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import ScrollMotion from '../ScrollMotion';
import { WhyUnify, Catalog, GlobalTeam } from './UcaasDemos';

/* Small visual on each integration card. */
function IntegrationVisual({ id }) {
  if (id === 'api') {
    return (
      <pre className="uc-int-code"><code>
        <span className="k">await</span> ucaas.calls.<span className="f">create</span>({'{'}{'\n'}
        {'  '}to: <span className="s">&apos;+442079460123&apos;</span>,{'\n'}
        {'  '}from: <span className="s">&apos;main-line&apos;</span>,{'\n'}
        {'  '}record: <span className="k">true</span>{'\n'}
        {'}'});
      </code></pre>
    );
  }
  const map = {
    m365: [['ri-calendar-line', 'Calendar · busy 10–11'], ['ri-user-follow-line', 'Presence synced']],
    gws: [['ri-mail-line', 'Call from Gmail'], ['ri-calendar-event-line', 'Meet link → HD video']],
    crm: [['ri-phone-line', 'Call logged · 4m 12s'], ['ri-message-2-line', 'SMS thread attached']],
  };
  return (
    <div className="uc-int-rows">
      {map[id].map(([ic, t]) => <span key={t}><i className={ic}></i>{t}<b className="ri-check-line"></b></span>)}
    </div>
  );
}

function Integrations({ data }) {
  return (
    <section className="lp-section uc-int-sec">
      <div className="lp-wrap">
        <div className="uc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="uc-int">
          {data.items.map((it, i) => (
            <article key={it.id} className={`uc-int-card uc-int-card--${it.id} reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="uc-int-vis" aria-hidden="true"><IntegrationVisual id={it.id} /></div>
              <div className="uc-int-body">
                <span className="uc-int-ic">{INT_LOGOS[it.id] || <i className={it.icon} aria-hidden="true"></i>}</span>
                <h3 className="uc-int-title">{it.title}</h3>
                <p className="uc-int-text">{it.text}</p>
                <span className="uc-int-foot"><i aria-hidden="true"></i>{INT_TAGS[it.id] || 'Connected'}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Real brand marks, in their own colours, for the two named products.
const INT_LOGOS = {
  m365: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  ),
  gws: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  ),
  // CRM and APIs aren't single brands: colourful gradient marks in the same
  // white-tile style as the two brand logos above.
  crm: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs><linearGradient id="intCrm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FB923C" /><stop offset="1" stopColor="#E11D48" /></linearGradient></defs>
      <rect x="4" y="2.5" width="15" height="19" rx="2.5" fill="url(#intCrm)" />
      <rect x="2.5" y="6" width="3" height="2" rx="1" fill="#9F1239" />
      <rect x="2.5" y="11" width="3" height="2" rx="1" fill="#9F1239" />
      <rect x="2.5" y="16" width="3" height="2" rx="1" fill="#9F1239" />
      <circle cx="11.5" cy="10" r="2.6" fill="#fff" />
      <path d="M7.4 17.2c.6-2.2 2.2-3.4 4.1-3.4s3.5 1.2 4.1 3.4" fill="#fff" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs><linearGradient id="intApi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#38BDF8" /><stop offset="1" stopColor="#7C3AED" /></linearGradient></defs>
      <rect x="2" y="3" width="20" height="18" rx="4" fill="url(#intApi)" />
      <path d="M9.2 8.8 6 12l3.2 3.2M14.8 8.8 18 12l-3.2 3.2M13 7.8l-2 8.4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// Short status line under each integration card.
const INT_TAGS = { m365: 'Two-way sync', gws: 'Works inside Gmail', crm: 'Logged automatically', api: 'Build your own' };

export default function UcaasPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.why && <WhyUnify data={page.why} />}
      {page.catalog && <Catalog data={page.catalog} />}
      {page.global && <GlobalTeam data={page.global} />}
      {page.integrations && <Integrations data={page.integrations} />}
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
      <ScrollMotion />
    </Shell>
  );
}
