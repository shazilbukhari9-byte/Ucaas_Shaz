'use client';

/**
 * Zapier integration page.
 *
 * Deliberately NOT the reference site's treatment. Theirs opens with a filter
 * strip ("All 4 · Google 2 · CRM 2") over a grid of logos, which makes the
 * page a directory. A directory answers "what else is there" — but someone
 * landing here has already chosen Zapier and wants to know what it does for
 * them. So the page is built around the triggers and actions UCaaS exposes,
 * and the recipes people actually build from them.
 *
 * Classes are zp-* and styled in styles/integrations/zapier.css, so nothing
 * inherits from the captured sheets.
 */
const TRIGGERS = [
  ['ri-phone-fill', 'Call completed', 'Fires the moment a call ends, with duration, outcome and recording link.'],
  ['ri-voiceprint-fill', 'Voicemail transcribed', 'The text of the message, not just a notification that one arrived.'],
  ['ri-message-2-fill', 'Text received', 'Every inbound SMS, with the thread it belongs to.'],
  ['ri-user-add-fill', 'New caller', 'A number that has never rung you before.'],
  ['ri-calendar-check-fill', 'Appointment booked', 'When the AI agent books a slot during a call.'],
  ['ri-emotion-fill', 'Call scored', 'Sentiment and summary, once the AI has written them up.'],
];

const ACTIONS = [
  ['ri-send-plane-fill', 'Send a text', 'From your business number, to anyone, from any Zap.'],
  ['ri-phone-lock-fill', 'Start a call', 'Ring a rep and connect them when they pick up.'],
  ['ri-sticky-note-fill', 'Log a note', 'Write onto the contact record inside UCaaS.'],
  ['ri-user-follow-fill', 'Create a contact', 'Add or update someone in the shared directory.'],
];

/* Recipes, not a logo grid. Each reads as the sentence a Zap actually is. */
const RECIPES = [
  {
    when: 'a call ends',
    then: 'log it on the Salesforce record with the AI summary',
    apps: ['UCaaS', 'Salesforce'],
    note: 'No rep types a call note again.',
  },
  {
    when: 'a voicemail is transcribed',
    then: 'post the text into your #support channel',
    apps: ['UCaaS', 'Slack'],
    note: 'The team reads it in seconds instead of dialling in.',
  },
  {
    when: 'a number you have never seen rings',
    then: 'add a row to the ops team’s sheet',
    apps: ['UCaaS', 'Google Sheets'],
    note: 'Missed-call tracking with no spreadsheet owner.',
  },
  {
    when: 'the AI books an appointment',
    then: 'create the event and email the confirmation',
    apps: ['UCaaS', 'Google Calendar'],
    note: 'Booked before the caller has hung up.',
  },
];

export default function ZapierPage() {
  return (
    <div className="zp">
      <section className="zp-hero">
        <div className="zp-hero-inner">
          <span className="zp-eyebrow">
            <i className="ri-flashlight-fill" aria-hidden="true"></i> Integration
          </span>

          <h1 className="zp-title">
            Connect UCaaS to <em>7,000+ apps</em> with Zapier.
          </h1>

          <p className="zp-lede">
            Every call, text and voicemail becomes a trigger. Send texts, place calls and write
            notes from anywhere you already work &mdash; no developer, no API keys.
          </p>

          <div className="zp-ctas">
            <a className="zp-btn zp-btn--primary" href="/get-started">
              Connect Zapier
              <i className="ri-arrow-right-line" aria-hidden="true"></i>
            </a>
            <a className="zp-btn zp-btn--ghost" href="/pricing">See pricing</a>
          </div>

          <p className="zp-meta">Included on every plan &middot; Set up in about five minutes</p>
        </div>

        {/* The Zap itself, drawn — one trigger flowing into two actions. It
            explains the page faster than the paragraph above it does. */}
        <div className="zp-flow" aria-hidden="true">
          <span className="zp-node zp-node--trigger">
            <b><i className="ri-phone-fill"></i></b>
            <u><span>When</span><em>a call ends</em></u>
          </span>

          <span className="zp-arrow"><i></i><i></i><i></i></span>

          <span className="zp-node">
            <b className="zp-mark zp-mark--sf">SF</b>
            <u><span>Then</span><em>log it to Salesforce</em></u>
          </span>

          <span className="zp-arrow"><i></i><i></i><i></i></span>

          <span className="zp-node">
            <b className="zp-mark zp-mark--sl">#</b>
            <u><span>Then</span><em>post to Slack</em></u>
          </span>
        </div>
      </section>

      <section className="zp-section">
        <h2 className="zp-h2">Start a Zap from anything that happens on the phone.</h2>
        <p className="zp-sub">Six triggers, each carrying the detail the next step needs.</p>

        <div className="zp-grid">
          {TRIGGERS.map(([icon, name, desc]) => (
            <div className="zp-card" key={name}>
              <span className="zp-card-icon"><i className={icon} aria-hidden="true"></i></span>
              <h3 className="zp-card-title">{name}</h3>
              <p className="zp-card-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="zp-section zp-section--alt">
        <h2 className="zp-h2">And finish one on the phone, too.</h2>
        <p className="zp-sub">Actions any Zap can call, from any of those 7,000 apps.</p>

        <div className="zp-grid zp-grid--four">
          {ACTIONS.map(([icon, name, desc]) => (
            <div className="zp-card" key={name}>
              <span className="zp-card-icon zp-card-icon--action"><i className={icon} aria-hidden="true"></i></span>
              <h3 className="zp-card-title">{name}</h3>
              <p className="zp-card-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="zp-section">
        <h2 className="zp-h2">Four people build in their first week.</h2>
        <p className="zp-sub">Copy one, swap the app, keep the logic.</p>

        <div className="zp-recipes">
          {RECIPES.map((r) => (
            <div className="zp-recipe" key={r.when}>
              <span className="zp-recipe-apps">
                {r.apps.map((a) => <em key={a}>{a}</em>)}
              </span>

              <p className="zp-recipe-line">
                <span className="zp-kw">When</span> {r.when}
                <span className="zp-kw zp-kw--then">Then</span> {r.then}
              </p>

              <p className="zp-recipe-note">{r.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
