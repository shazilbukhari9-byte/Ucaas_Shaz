/* HD Video Meetings page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own: what happens in
   the minute after you hang up, the six built-ins as spec cards, a
   scheduling demo with the security panel and use cases as agenda cards.
   Content lives in content/landingPages.js (layout: 'video'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import ScheduleDemo from './ScheduleDemo';
import AfterPlayback from './AfterPlayback';
import SpecShowcase from './SpecShowcase';
import { nameOf } from './people';

/* ── Six built-ins as spec cards ──────────────────────────────────────── */
function Features({ page }) {
  return (
    <section className="lp-section vm-feat-sec">
      <div className="lp-wrap">
        <div className="vm-head reveal">
          <span className="lp-kicker">{page.capKicker}</span>
          <h2 className="lp-h2">{page.capTitle}</h2>
          <p className="lp-intro">{page.capIntro}</p>
        </div>
        <SpecShowcase items={page.capabilities} />
      </div>
    </section>
  );
}

/* ── Use cases as meeting tickets ─────────────────────────────────────────
   Each use case is a meeting card: a nature-photo header with a glass time
   pill and the attendees, then the title, the agenda, and an outcome strip
   for what the meeting produced. Sample names and times only. */
const U = (id) => `https://images.unsplash.com/photo-${id}?fm=jpg&q=70&w=900&auto=format&fit=crop`;
const TICKET = {
  'Internal planning': { img: U('1444090542259-0af8fa96557e'), when: 'Mon · 9:00 · 45 min', who: ['TW', 'DO', 'PS', 'MK'], out: '3 owners assigned', outIc: 'ri-user-follow-line' },
  'Client calls': { img: U('1500622944204-b135684e99fd'), when: 'Thu · 10:00 · 30 min', who: ['TW', 'DO'], guest: 'Guest · browser', out: 'Proposal sent', outIc: 'ri-mail-send-line' },
  'Distributed teams': { img: U('1508739773434-c26b3d09e071'), when: '7:00 PT · 15:00 GMT', who: ['AN', 'PS', 'MK'], out: 'Recap sent to APAC', outIc: 'ri-earth-line' },
  'Training & workshops': { img: U('1475113548554-5a36f1f523d6'), when: 'Fri · 13:00 · 90 min', who: ['TW', 'DO', 'PS', 'MK', 'AN'], out: '6 rooms recorded', outIc: 'ri-film-line' },
};

function UseCases({ page }) {
  return (
    <section className="lp-section vtk-sec">
      <div className="lp-wrap">
        <div className="vtk-head reveal">
          <span className="lp-kicker">Use cases</span>
          <h2 className="lp-h2">{page.audienceTitle}</h2>
        </div>
        <div className="vtk">
          {page.audience.map((a, i) => {
            const t = TICKET[a.title] || {};
            return (
              <article key={a.title} className={`vtk-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="vtk-photo" style={t.img ? { backgroundImage: `url(${t.img})` } : undefined} aria-hidden="true">
                  <span className="vtk-when"><i className="ri-vidicon-fill"></i>{t.when}</span>
                  <span className="vtk-who">
                    <span className="vtk-stack">{(t.who || []).map((n, k) => <i key={n + k} className={`vtk-av vtk-av--${k % 4}`} data-name={nameOf(n)}>{n}</i>)}</span>
                    {t.guest && <em>{t.guest}</em>}
                  </span>
                </div>
                <div className="vtk-body">
                  <span className="vtk-top"><span className="vtk-ic"><i className={a.icon} aria-hidden="true"></i></span><h3 className="vtk-title">{a.title}</h3></span>
                  <p className="vtk-text">{a.text}</p>
                  <ol className="vtk-agenda" aria-label="Agenda">
                    {a.agenda.map((x) => <li key={x}>{x}</li>)}
                  </ol>
                </div>
                <div className="vtk-out"><i className={t.outIc || 'ri-check-line'} aria-hidden="true"></i><span><em>Outcome</em><b>{t.out}</b></span><i className="ri-sparkling-2-fill vtk-ai" aria-hidden="true"></i></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function VideoPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      {page.after && <AfterPlayback data={page.after} />}
      <Features page={page} />
      {page.schedule && <ScheduleDemo data={page.schedule} />}
      <UseCases page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
