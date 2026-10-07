/* Call Recording page. The hero, related pages, FAQ and closing CTA are the
   shared landing sections (same as every feature page); the middle of the
   page is its own: a "how a call becomes searchable" pipeline, a bento grid
   of features with small product visuals, the compliance console, use-case
   tabs and a two-card comparison. Content lives in content/landingPages.js
   (layout: 'recording'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import ComplianceAudit from '../ComplianceAudit';
import UseCaseTabs from './UseCaseTabs';

/* ── Pipeline: how a call becomes searchable ──────────────────────────── */
function Pipeline({ page }) {
  return (
    <section className="lp-section cr-pipe-sec">
      <div className="lp-wrap">
        <div className="cr-head reveal">
          <span className="cr-kicker">{page.stepsKicker}</span>
          <h2 className="lp-h2">{page.stepsTitle}</h2>
        </div>
        <ol className="cr-pipe reveal reveal-delay-1">
          {page.steps.map((s, i) => (
            <li key={s.title} className="cr-pipe-step">
              <span className="cr-pipe-node">
                <i className={s.icon} aria-hidden="true"></i>
                <span className="cr-pipe-n">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="cr-pipe-label">{s.label}</span>
              <h3 className="cr-pipe-title">{s.title}</h3>
              <p className="cr-pipe-text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Bento grid of features, each with a small product visual ─────────── */
function Visual({ kind }) {
  switch (kind) {
    case 'search':
      return (
        <div className="cr-v cr-v-search" aria-hidden="true">
          <div className="cr-v-bar"><i className="ri-search-line"></i>refund<span>847 calls</span></div>
          {[['REC-24817', 'Acme Dental', '01:02'], ['REC-24790', 'Northwind', '03:18'], ['REC-24752', 'Lattice', '00:41']].map(([id, who, at]) => (
            <div className="cr-v-row" key={id}><b>{id}</b><span>{who}</span><em>{at}</em></div>
          ))}
        </div>
      );
    case 'redact':
      return (
        <div className="cr-v cr-v-redact" aria-hidden="true">
          <div className="cr-v-before"><em>Before</em>card 4111 2244 9087 4821</div>
          <i className="ri-arrow-down-line cr-v-arrow"></i>
          <div className="cr-v-after"><em>Stored</em>card <span>•••• •••• •••• 4821</span><b>PCI</b></div>
        </div>
      );
    case 'stereo':
      return (
        <div className="cr-v cr-v-stereo" aria-hidden="true">
          {['Agent', 'Caller'].map((ch, r) => (
            <div className="cr-v-ch" key={ch}>
              <em>{ch}</em>
              <span>{Array.from({ length: 26 }, (_, i) => (
                <i key={i} style={{ height: `${20 + Math.round(Math.abs(Math.sin((i + r * 7) * 1.3)) * 80)}%` }}></i>
              ))}</span>
            </div>
          ))}
        </div>
      );
    case 'transcript':
      return (
        <div className="cr-v cr-v-tx" aria-hidden="true">
          <div><b>00:14</b> I’d like a refund for one of them.</div>
          <div><b>00:33</b> Can you confirm the card on file?</div>
          <span className="cr-v-langs"><i>EN</i><i>ES</i><i>FR</i><i>+29</i></span>
        </div>
      );
    case 'retention':
      return (
        <div className="cr-v cr-v-ret" aria-hidden="true">
          <div className="cr-v-track"><i style={{ width: '62%' }}></i><span style={{ left: '62%' }}></span></div>
          <div className="cr-v-ticks"><em>30d</em><em>1y</em><em>3y</em><em>7y</em></div>
        </div>
      );
    case 'playback':
      return (
        <div className="cr-v cr-v-speed" aria-hidden="true">
          {['0.75×', '1×', '1.5×', '2×'].map((x) => <i key={x} className={x === '1.5×' ? 'is-on' : ''}>{x}</i>)}
        </div>
      );
    case 'audit':
      return (
        <div className="cr-v cr-v-audit" aria-hidden="true">
          <div><i className="cr-dot cr-dot--blue"></i>Played REC-24817<em>2m</em></div>
          <div><i className="cr-dot cr-dot--red"></i>Redacted 1 card<em>8m</em></div>
        </div>
      );
    case 'share':
      return (
        <div className="cr-v cr-v-share" aria-hidden="true">
          <span><i className="ri-link"></i>ucaas.app/r/24817?t=62</span>
          <b>Copied</b>
        </div>
      );
    default:
      return null;
  }
}

// Tile order that fills the 12-column grid: a 7+5 row, then two rows of 4+4+4.
const BENTO_ORDER = ['search', 'redact', 'stereo', 'transcript', 'retention', 'playback', 'audit', 'share'];

function Bento({ page }) {
  const tiles = [...page.capabilities].sort(
    (a, b) => BENTO_ORDER.indexOf(a.visual) - BENTO_ORDER.indexOf(b.visual),
  );
  return (
    <section className="lp-section cr-bento-sec">
      <div className="lp-wrap">
        <div className="cr-head cr-head--split reveal">
          <div>
            <span className="cr-kicker">{page.capKicker || 'What you get'}</span>
            <h2 className="lp-h2">{page.capTitle}</h2>
          </div>
          <p className="cr-head-note">Everything below is part of call recording — no separate transcription or search product to buy.</p>
        </div>
        <div className="cr-bento">
          {tiles.map((c, i) => (
            <article key={c.title} className={`cr-tile cr-tile--${c.visual} lp-tone--${c.tone} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="cr-tile-top">
                <span className="cr-tile-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <span className="cr-tile-short">{c.short}</span>
              </div>
              <h3 className="cr-tile-title">{c.title}</h3>
              <p className="cr-tile-text">{c.text}</p>
              <Visual kind={c.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Two-card comparison ──────────────────────────────────────────────── */
function Compare({ page }) {
  const c = page.compare;
  return (
    <section className="lp-section cr-vs-sec">
      <div className="lp-wrap">
        <div className="cr-head reveal">
          <span className="cr-kicker">{c.kicker}</span>
          <h2 className="lp-h2">{c.title}</h2>
          <p className="lp-intro">{c.intro}</p>
        </div>
        <div className="cr-vs reveal reveal-delay-1">
          <div className="cr-vs-card cr-vs-card--them">
            <span className="cr-vs-label">{c.legacyLabel}</span>
            <ul>
              {c.rows.map((r) => (
                <li key={r.feature}><i className="ri-close-line" aria-hidden="true"></i><span><b>{r.feature}</b>{r.legacy}</span></li>
              ))}
            </ul>
          </div>
          <span className="cr-vs-badge" aria-hidden="true">vs</span>
          <div className="cr-vs-card cr-vs-card--us">
            <span className="cr-vs-label"><i className={page.icon} aria-hidden="true"></i>UCaaS {page.title}</span>
            <ul>
              {c.rows.map((r) => (
                <li key={r.feature}><i className="ri-check-line" aria-hidden="true"></i><span><b>{r.feature}</b>{r.ours}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CallRecordingPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      <Pipeline page={page} />
      <Bento page={page} />
      {page.compliance && <ComplianceAudit data={page.compliance} />}
      <UseCaseTabs items={page.useCases} />
      {page.compare && <Compare page={page} />}
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
