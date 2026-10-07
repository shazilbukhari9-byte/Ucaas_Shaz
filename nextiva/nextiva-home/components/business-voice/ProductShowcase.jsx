'use client';
/* Generated from the Business Voice capture — see tools/generate-business-voice.mjs */
import { useRef } from 'react';
import EmbeddedHeroDashboard from '../hero/EmbeddedHeroDashboard';
import useProductShowcase from '../../hooks/business-voice/useProductShowcase';

/* This page's chat is deliberately not the home one: different people,
   different subject (texting rather than porting a phone system), and a
   slower tempo with its own bubble entrance — `variant` is the class that
   picks that up in styles/business-voice/hero-ucaas.css.
   Declared at module scope, not inline in the JSX, so it is the same object
   on every render and the playback effect is not restarted by a re-render. */
const TEXTING_THREAD = {
  recipient: 'UCaaS AI + Sana Iqbal',
  /* The AI agent is the story on this page, so it sits in the header as a
     participant rather than being implied. Two stacked avatars, and a
     presence line carrying what the thread is about and how fresh it is. */
  avatars: [{ ai: true }, { initials: 'SI' }],
  presence: {
    label: 'Actively texting now',
    topic: 'Reroute & updates',
    time: '5m ago',
  },
  backlog: 6,
  lead: 340,
  gap: 1150,
  variant: 'chat-anim--drift',
  replies: [
    'Noted — that’s on the account and the team can see it.',
    'Anything else? Otherwise keep scrolling for the rest of the texting tools.',
  ],
  conversation: [
    { kind: 'received', text: 'Got your voicemail — easier if I just text?', pause: 1200 },
    { kind: 'sent', text: 'Much easier. Same number, it comes through here', pause: 1000 },
    { kind: 'received', text: 'Good. I’m rarely somewhere I can take a call', pause: 1500 },
    { kind: 'sent', text: 'Then don’t — text works from the yard just as well', pause: 1100 },
    { kind: 'received', text: 'The Tuesday drop needs moving to the side entrance', pause: 1400 },
    { kind: 'sent', text: 'Changed. The driver has it on his run sheet already', pause: 1100 },
    { kind: 'received', text: 'That was quick. Who else can see this thread?', pause: 1300 },
    { kind: 'sent', text: 'Dispatch and I both do — one inbox, not my handset', pause: 1200 },
    { kind: 'received', text: 'So I’m not stuck waiting if you’re out', pause: 1400 },
    { kind: 'sent', text: 'Never. Whoever is on shift picks it straight up', pause: 1000 },
    { kind: 'received', text: 'Can the drivers be reached the same way?', pause: 1300 },
    { kind: 'sent', text: 'Yes — every van number takes texts now', pause: 1100 },
    { kind: 'received', text: 'People have been messaging those for years', pause: 1500 },
    { kind: 'sent', text: 'All of it landed this morning. Nothing was lost', pause: 1200 },
    { kind: 'received', text: 'What happens when we message after six?', pause: 1300 },
    { kind: 'sent', text: 'The AI agent answers and books you a slot', pause: 1200 },
    { kind: 'received', text: 'An actual slot, not a note for the morning?', pause: 1200 },
    { kind: 'sent', text: 'An actual slot — it goes into the calendar there and then', pause: 1000 },
    { kind: 'received', text: 'Set that up for the Leeds depot as well', pause: 1400 },
    { kind: 'sent', text: 'On it. That will be running within the hour', pause: 1100 },
  ],
};

export default function ProductShowcase() {
  const rootRef = useRef(null);
  useProductShowcase(rootRef);

  return (
    <section ref={rootRef} id="v2-product-showcase-block_dfc31e84cae9474ea29707bee584f12a" className="section-platform-showcase  v2-product-showcase-wrapper section-platform-showcase--white">
			
    		<div className="platform-showcase-header reveal revealed" style={{ willChange: "auto" }}>
    			<div className="platform-showcase-header-text">
    				<span className="platform-badge">Voice &amp; Texting on UCaaS</span>
    				<h2 className="showcase-section-title">Nobody free to answer? The AI agent takes it.</h2>
    				<p className="showcase-section-description">Calling, texting and voicemail in one app on every device — and when the team is busy, the AI agent answers and books the appointment.</p>
    			</div>
    							
    					</div>
	
    				<div className="hero-app-showcase platform-page-showcase reveal revealed" style={{ backgroundImage: "url(\"/media/desert-ridges-layered-crimson-teal-04b8678b.png\")", willChange: "auto" }}>

    	<div className="ucaas-dash-slot">
    		{/* The home hero's dashboard — the same component, shared. */}
    		<EmbeddedHeroDashboard
    			customer={{
    				initials: 'SI',
    				name: 'Sana Iqbal',
    				email: 'sana@vertexlogistics.com',
    				tags: ['Texts first', 'SMB'],
    				activity: [
    					{ icon: 'ri-message-3-fill', text: 'SMS received', time: 'Just now' },
    					{ icon: 'ri-voiceprint-fill', text: 'Voicemail · 0:42', time: 'Today' },
    					{ icon: 'ri-phone-fill', text: 'Callback set', time: 'Thu 10:00' },
    				],
    				assignee: { initials: 'AS', name: 'Aarav Shah', role: 'Support lead', status: 'Online' },
    				preview: 'Set that up for the Leeds depot as well',
    				note: 'Prefers text over calls. Shared-inbox invite sent — confirm the Saturday 10 AM booking by SMS.',
    			}}
    			thread={TEXTING_THREAD}
    		/>
    	</div>

	


	
    	<div className="ui-showcase">
		
    		<div className="ui-call-card">
    			<div className="call-card-header">
    				<div className="call-header-left">
    					<svg className="call-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path></svg>
    					<span className="call-label">CALL COMPLETED</span>
    					<div className="sound-wave">
    						<span className="bar"></span>
    						<span className="bar"></span>
    						<span className="bar"></span>
    						<span className="bar"></span>
    						<span className="bar"></span>
    					</div>
    				</div>
    				<span className="call-time">2m 18s</span>
    			</div>

    			<div className="call-main">
    				<div className="call-title-row">
    					<div className="caller-avatar">
    						<img decoding="async" src="/media/avatar-headset-75de06e7.webp" alt="Neha Bhatt" className="caller-avatar-img" />
    					</div>
    					<span className="caller-name">Call Summary</span>
    					<div className="ai-badge">
    						<span className="ai-badge-icon">✦</span>
    						<span className="ai-badge-text">Answered by UCaaS AI</span>
    					</div>
    				</div>
    			</div>

    			<div className="call-summary-content">
    				<div className="summary-section">
    					<span className="summary-label">SUMMARY</span>
    					<p className="summary-text">Neha Bhatt reported handsets offline across two floors. Engineer booked, visit confirmed.</p>
    				</div>
    				<div className="summary-section">
    					<span className="summary-label">SITE VISIT</span>
    					<div className="summary-appointment">
    						<span className="appointment-tag">Thursday</span>
    						<span className="appointment-tag">11:15 AM</span>
    						<i className="ri-check-double-fill appointment-check"></i>
    					</div>
    				</div>
    				<div className="summary-section">
    					<span className="summary-label">SENTIMENT</span>
    					<div className="summary-sentiment-tags">
    						<span className="sentiment-tag positive">Reassured</span>
    						<span className="sentiment-tag excited">Direct</span>
    						<span className="sentiment-tag curious">Urgent</span>
    					</div>
    				</div>
    			</div>
    		</div>

		
    		<div className="ui-stats-card">
    			<div className="stats-header">
    				<div className="stats-header-left">
    					<div className="gyroscope-icon">
    						<div className="gyro-ring gyro-ring-outer"></div>
    						<div className="gyro-ring gyro-ring-middle"></div>
    						<div className="gyro-ring gyro-ring-inner"></div>
    					</div>
    					<span className="stats-label">Handled by AI</span>
    				</div>
    				<button className="stats-time-filter">
    					<span className="stats-time-label">Today</span>
    					<i className="ri-arrow-down-s-line"></i>
    				</button>
    			</div>
    			<div className="stats-grid">
    				<div className="stat-item">
    					<div className="stat-value">68</div>
    					<div className="stat-label">Calls Answered</div>
    				</div>
    				<div className="stat-item">
    					<div className="stat-value">14</div>
    					<div className="stat-label">Visits Booked</div>
    				</div>
    				<div className="stat-item">
    					<div className="stat-value">214</div>
    					<div className="stat-label">Queries Closed</div>
    				</div>
    				<div className="stat-item">
    					<div className="stat-value">97%</div>
    					<div className="stat-label">Resolved First Call</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
	
				
    				    				<div className="split-showcase-info-cards voice-texting-highlights reveal revealed" style={{ willChange: "auto" }}>
    							<div className="split-showcase-info-card">
    								<div className="split-showcase-info-icon">
    									<i className="ri-customer-service-2-fill"></i>
    								</div>
    								<h3>Someone answers, every time</h3>
    								<p>The AI agent picks up when nobody is free, answers the question and books the slot.</p>
    							</div>
    							<div className="split-showcase-info-card">
    								<div className="split-showcase-info-icon">
    									<i className="ri-chat-thread-fill"></i>
    								</div>
    								<h3>One thread, calls and texts</h3>
    								<p>A call now, a text at six. Both land in the same thread, so nobody re-asks.</p>
    							</div>
    							<div className="split-showcase-info-card">
    								<div className="split-showcase-info-icon">
    									<i className="ri-team-fill"></i>
    								</div>
    								<h3>A number the whole team can answer</h3>
    								<p>A shared inbox, not one desk phone. You can see who replied and who is typing.</p>
    							</div>
    							<div className="split-showcase-info-card">
    								<div className="split-showcase-info-icon">
    									<i className="ri-arrow-left-right-fill"></i>
    								</div>
    								<h3>Keep the number you already have</h3>
    								<p>Porting is free and runs in the background. Nothing changes for your callers.</p>
    							</div>
    					</div>

    <div className="integrations-strip">
    		<div className="integrations-strip-wrapper">
    			<div className="integrations-strip-text">
    				<p><i className="ri-plug-fill"></i> Works with your favorite tools and platforms</p>
    			</div>
    			<div className="logo-marquee-container">
    				<div className="logo-marquee">
    					<div className="logo-marquee-track">
    														<span className="integration-name">Salesforce</span>
    																<span className="integration-name">HubSpot</span>
    																<span className="integration-name">Zendesk</span>
    																<span className="integration-name">Microsoft Teams</span>
    																<span className="integration-name">Google Workspace</span>
    																<span className="integration-name">Zapier</span>
    																<span className="integration-name">Zoho</span>
    																<span className="integration-name">ServiceNow</span>
    																<span className="integration-name">Salesforce</span>
    																<span className="integration-name">HubSpot</span>
    																<span className="integration-name">Zendesk</span>
    																<span className="integration-name">Microsoft Teams</span>
    																<span className="integration-name">Google Workspace</span>
    																<span className="integration-name">Zapier</span>
    																<span className="integration-name">Zoho</span>
    																<span className="integration-name">ServiceNow</span>
    													</div>
    				</div>
    			</div>
    		</div>
    	</div>
	
	
	
    	</section>
  );
}
