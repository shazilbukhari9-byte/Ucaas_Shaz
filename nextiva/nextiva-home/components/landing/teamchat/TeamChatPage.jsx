/* Team Chat page. Hero, related pages, FAQ and closing CTA are the shared
   landing sections; the middle is this page's own: an annotated
   product shot of the features, a Slack-bridge sync diagram, an interactive presence
   demo, a before/after of a mid-call question and a who-it's-for strip. Content
   lives in content/landingPages.js (layout: 'teamchat'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import PresenceDemo from './PresenceDemo';
import ChatAnatomy from './ChatAnatomy';
import TeamMoments from './TeamMoments';
import SyncBridge from './SyncBridge';

/* ── Features: an annotated product shot (ChatAnatomy) ───────────────── */
function Features({ page }) {
  return (
    <section className="lp-section tc-feat-sec">
      <div className="lp-wrap">
        <div className="lp-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
          <p className="lp-intro">{page.capIntro}</p>
        </div>
        <ChatAnatomy items={page.capabilities} />
      </div>
    </section>
  );
}

/* ── Slack bridge ─────────────────────────────────────────────────────── */
// Icon for each bridge point, in order.
const BRIDGE_IC = ['ri-arrow-left-right-line', 'ri-git-merge-line', 'ri-team-line'];

function Bridge({ data }) {
  return (
    <section className="lp-section lp-section--theme tc-br-sec">
      <div className="lp-wrap tc-br">
        <div className="tc-br-copy reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
          <ul className="tsb-points">
            {data.points.map((p, i) => (
              <li key={p}>
                <span className="tsb-points-ic"><i className={BRIDGE_IC[i] || 'ri-check-line'} aria-hidden="true"></i></span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="tc-br-viz-wrap reveal reveal-delay-1">
          <SyncBridge />
        </div>
      </div>
    </section>
  );
}

/* ── Before / after ───────────────────────────────────────────────────── */
function BeforeAfter({ data }) {
  return (
    <section className="lp-section tc-ba-sec">
      <div className="lp-wrap">
        <div className="tc-head reveal">
          <span className="lp-kicker">{data.kicker}</span>
          <h2 className="lp-h2">{data.title}</h2>
          <p className="lp-intro">{data.intro}</p>
        </div>
        <div className="tc-ba reveal reveal-delay-1">
          {[['before', data.before], ['after', data.after]].map(([key, side]) => (
            <div key={key} className={`tc-ba-col tc-ba-col--${key}`}>
              <div className="tc-ba-top">
                <span className="tc-ba-label">{side.label}</span>
                <span className="tc-ba-time"><i className="ri-time-line" aria-hidden="true"></i>{side.time}</span>
              </div>
              <ol>
                {side.steps.map((st, i) => (
                  <li key={st}><span className="tc-ba-n">{i + 1}</span>{st}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Who it's for: one dark panel — team tabs over a call + chat scene ── */
function WhoFor({ page }) {
  return (
    <section className="lp-section tc-who-sec">
      <div className="lp-wrap">
        <div className="tc-who-head reveal">
          <div>
            <span className="lp-kicker">Built for</span>
            <h2 className="lp-h2">{page.audienceTitle}</h2>
          </div>
          <p className="tc-who-note">Four teams, one habit: ask in chat while the customer is still on the line.</p>
        </div>
        <TeamMoments items={page.audience} />
      </div>
    </section>
  );
}


export default function TeamChatPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      <Features page={page} />
      {page.bridge && <Bridge data={page.bridge} />}
      {page.presence && <PresenceDemo data={page.presence} />}
      {page.beforeAfter && <BeforeAfter data={page.beforeAfter} />}
      <WhoFor page={page} />
      {/* Shared "Works with" section, as on the other product pages. */}
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
