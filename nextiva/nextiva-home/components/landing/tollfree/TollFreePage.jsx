/* Toll-free Numbers page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: a timeline of the
   seven prefixes, a vanity keypad, a feature bento where every card carries a
   small product visual, an inbound-minutes meter and use cases shown as the
   number in context. Content lives in content/landingPages.js
   (layout: 'tollfree'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { VanityTranslator, UsageChart, Placements } from './TollFreeSections';
import PrefixBoard from './PrefixBoard';

/* ── Seven prefixes: a live search board (PrefixBoard) ────────────────── */
function Prefixes({ data }) {
  return (
    <section className="lp-section tf-pre-sec">
      <div className="lp-wrap">
        <div className="tf-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <PrefixBoard items={data.items} />
        <p className="tf-pre-foot reveal">
          <i className="ri-radar-line" aria-hidden="true"></i>
          One query covers every prefix — standard and vanity — from live inventory.
        </p>
      </div>
    </section>
  );
}

/* ── What you get: a bento grid ───────────────────────────────────────────
   Four columns; the cards take different sizes (big search card, wide
   timeline, two small phone cards, two wide cards), each with a small
   product visual of its feature. Visuals by each capability's `visual`. */
const PREFIXES = ['800', '888', '877', '866', '855', '844', '833'];

function BentoVisual({ kind }) {
  if (kind === 'search') {
    return (
      <div className="tfb-search">
        <span className="tfb-q"><i className="ri-search-line"></i><b>NORTH</b><em>7 prefixes</em></span>
        <span className="tfb-chips">{PREFIXES.map((p, i) => <i key={p} style={{ '--i': i }}>{p}</i>)}</span>
        <span className="tfb-results">
          {[['1 (833) NORTH-83', 'Vanity'], ['1 (877) NORTH-64', 'Vanity'], ['1 (800) 891-2765', 'Standard']].map(([n, t], i) => (
            <span className="tfb-res" key={n} style={{ '--i': i }}><b>{n}</b><em>{t}</em><span>Pick</span></span>
          ))}
        </span>
      </div>
    );
  }
  if (kind === 'speed') {
    return (
      <div className="tfb-steps">
        {[['ri-search-line', 'Search', '0:00'], ['ri-hand-coin-line', 'Pick', '0:40'], ['ri-phone-line', 'First call', 'Live']].map(([ic, l, t], i) => (
          <span className={`tfb-step${i === 2 ? ' is-live' : ''}`} key={l}><i className={ic}></i><b>{t}</b><em>{l}</em></span>
        ))}
      </div>
    );
  }
  if (kind === 'callerid') {
    return (
      <div className="tfb-phone">
        <em>Incoming call</em>
        <span className="tfb-av">NR</span>
        <b>NorthRoute</b>
        <span className="tfb-verified"><i className="ri-shield-check-fill"></i>Verified caller</span>
      </div>
    );
  }
  if (kind === 'sms') {
    return (
      <div className="tfb-sms">
        <span className="tfb-b">Is my order ready?</span>
        <span className="tfb-b tfb-b--out">Yes — ready for pickup today.</span>
        <em><i className="ri-check-double-line"></i>Texted from 1 (833) 561-0084</em>
      </div>
    );
  }
  if (kind === 'route') {
    return (
      <div className="tfb-route">
        <span className="tfb-num"><i className="ri-phone-fill"></i>1 (888) GO-NORTH</span>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 C 40 50, 40 12, 100 12 M0 50 C 40 50, 40 37, 100 37 M0 50 C 40 50, 40 63, 100 63 M0 50 C 40 50, 40 88, 100 88" /></svg>
        <span className="tfb-dests">
          {[['ri-git-branch-line', 'Phone menu'], ['ri-team-line', 'Sales queue'], ['ri-user-line', 'A person'], ['ri-robot-2-line', 'AI receptionist']].map(([ic, l]) => (
            <span key={l}><i className={ic}></i>{l}</span>
          ))}
        </span>
      </div>
    );
  }
  return (
    <div className="tfb-port">
      <span className="tfb-carrier"><i className="ri-building-line"></i>Current carrier</span>
      <span className="tfb-move"><b>1 (800) 555-0142</b><em><i className="ri-checkbox-circle-fill"></i>Stays live while it moves</em></span>
      <span className="tfb-carrier tfb-carrier--us"><i className="ri-phone-fill"></i>UCaaS</span>
    </div>
  );
}

function Features({ page }) {
  return (
    <section className="lp-section tfb-sec">
      <div className="lp-wrap">
        <div className="tf-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
          <p className="lp-intro">{page.capIntro}</p>
        </div>
        <div className="tfb">
          {page.capabilities.map((c, i) => (
            <article key={c.title} className={`tfb-card tfb-card--${c.visual} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="tfb-vis" aria-hidden="true"><BentoVisual kind={c.visual} /></div>
              <div className="tfb-body">
                <span className="tfb-tag"><i className={c.icon} aria-hidden="true"></i>{c.short}</span>
                <h3 className="tfb-title">{c.title}</h3>
                <p className="tfb-text">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TollFreePage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.prefixes && <Prefixes data={page.prefixes} />}
      {page.vanity && <VanityTranslator data={page.vanity} />}
      <Features page={page} />
      {page.usage && <UsageChart data={page.usage} />}
      <Placements page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
