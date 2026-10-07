'use client';
/* Originally generated from the Business Voice capture, since rewritten:
   the three panels are built from the data below rather than hand-repeated
   markup, so a feature can be moved between tabs by editing one line. */
import { useRef } from 'react';
import useFeatureChecklist from '../../hooks/business-voice/useFeatureChecklist';

/* Twelve, twelve and eight — each tab fills its rows exactly at four columns,
   so no panel ends on a half-empty row.

   The AI tab previously carried Number Porting, Toll-Free Numbers and Team
   Presence, none of which are AI or analytics; they have moved to the tab
   they belong to and the space has gone to features that do belong here. */
const TABS = [
  {
    id: 'calling',
    label: 'Calling',
    features: [
      ['ri-phone-fill', 'Unlimited Calling', 'US and Canada calling included with every plan.'],
      ['ri-customer-service-2-fill', 'Auto Attendant & IVR', 'Route callers with custom menus and a dial-by-name directory.'],
      ['ri-flow-chart', 'Call Flow Builder', 'Design routing visually with business hours and time-based rules.'],
      ['ri-record-circle-fill', 'Call Recording', 'Record inbound and outbound calls with automatic archiving.'],
      ['ri-corner-up-right-fill', 'Call Forwarding', 'Send calls to any number when you are busy, away or offline.'],
      ['ri-arrow-left-right-fill', 'Call Transfer', 'Blind or warm transfer, with the option to brief the next person.'],
      ['ri-group-fill', 'Call Groups & Queues', 'Ring the team at once or in turn so nobody waits on hold.'],
      ['ri-team-fill', 'Conference Calling', 'Connect up to 250 people on a dedicated dial-in bridge.'],
      ['ri-contacts-book-fill', 'Caller ID', 'Show your business name on every outbound call.'],
      ['ri-hashtag', 'Toll-Free & Local Numbers', 'Choose from 200+ area codes, or add a toll-free number.'],
      ['ri-swap-box-fill', 'Number Porting', 'Bring the numbers you already have across with zero downtime.'],
      ['ri-shield-check-fill', '99.999% Uptime', 'Carrier-grade network with published, real-time status.'],
    ],
  },
  {
    id: 'messaging',
    label: 'Texting',
    features: [
      ['ri-message-2-fill', 'Business SMS & MMS', 'Send and receive texts from your business number.'],
      ['ri-inbox-fill', 'Shared Inbox', 'One number the whole team can answer, with no double replies.'],
      ['ri-time-fill', 'Scheduled Texts', 'Write it now, send it when the customer is likely to read it.'],
      ['ri-chat-quote-fill', 'Saved Replies', 'Answer the questions you get daily without retyping them.'],
      ['ri-computer-fill', 'Desktop App', 'Call and text without leaving your computer.'],
      ['ri-smartphone-fill', 'Mobile App', 'Your full business phone in your pocket. iOS and Android.'],
      ['ri-global-fill', 'Browser App', 'Log in from any computer, with nothing to install.'],
      ['ri-refresh-fill', 'Device Sync', 'Calls, texts and notifications stay in step across devices.'],
      ['ri-chat-3-fill', 'Team Messaging', 'Chat with colleagues alongside your calls and texts.'],
      ['ri-user-follow-fill', 'Team Presence', 'See who is free, on a call or away, in real time.'],
      ['ri-contacts-fill', 'Contact Import', 'Bring your Google and Outlook contacts in automatically.'],
      ['ri-attachment-fill', 'File Sharing', 'Share photos, documents and files in any conversation.'],
    ],
  },
  {
    id: 'ai',
    label: 'AI & Analytics',
    features: [
      ['ri-robot-2-fill', 'AI Receptionist', 'Answers around the clock, handles questions and routes the call.'],
      ['ri-calendar-check-fill', 'AI Appointment Booking', 'Books the slot in your calendar during the call itself.'],
      ['ri-file-text-fill', 'Call Summaries', 'A written recap with action items after every call.'],
      ['ri-voiceprint-fill', 'Voicemail Transcription', 'Read voicemail as text instead of listening back.'],
      ['ri-mic-fill', 'Live Transcription', 'Follow a call in text as it happens, and search it later.'],
      ['ri-emotion-fill', 'Sentiment Scoring', 'See which conversations went well and which need a callback.'],
      ['ri-bar-chart-box-fill', 'Voice Analytics', 'Track call volume, talk time, missed calls and trends.'],
      ['ri-file-chart-fill', 'Custom Reports', '250+ report options, delivered automatically on your schedule.'],
      ['ri-notification-badge-fill', 'Call Pop', 'Caller details and history on screen the moment it rings.'],
      ['ri-alarm-warning-fill', 'Keyword Alerts', 'Get told when a phrase you care about comes up on a call.'],
      ['ri-timer-flash-fill', 'Queue Analytics', 'Wait times, abandon rates and who is carrying the load.'],
      ['ri-download-cloud-fill', 'Data Export', 'Take any report out as CSV, or pull it through the API.'],
    ],
  },
];

export default function FeatureChecklist() {
  const rootRef = useRef(null);
  useFeatureChecklist(rootRef);

  return (
    <section ref={rootRef} className="section-feature-checklist  v2-section-feature-checklist-wrapper">
      <div className="feature-checklist-container">
        <div className="platform-showcase-header reveal revealed" style={{ willChange: 'auto' }}>
          <span className="platform-badge">Platform Features</span>
          <h2 className="showcase-section-title">Every feature you need. AI built in.</h2>
        </div>

        <div className="pill-toggle reveal revealed" style={{ marginBottom: '40px', willChange: 'auto' }}>
          {TABS.map((tab, index) => (
            <button
              className={`pill-toggle-btn${index === 0 ? ' active' : ''}`}
              data-feature-tab={tab.id}
              key={tab.id}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {TABS.map((tab, index) => (
          <div
            className={`feature-tab-panel${index === 0 ? ' active' : ''}`}
            data-feature-panel={tab.id}
            key={tab.id}
          >
            <div
              className={`feature-checklist-grid reveal${index === 0 ? ' revealed' : ''}`}
              style={index === 0 ? { willChange: 'auto' } : undefined}
            >
              {tab.features.map(([icon, name, description]) => (
                <div className="smb-industry-card" key={name}>
                  <div className="smb-industry-icon-wrap"><i className={icon}></i></div>
                  <h3 className="smb-industry-name">{name}</h3>
                  <p className="smb-industry-desc">{description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
