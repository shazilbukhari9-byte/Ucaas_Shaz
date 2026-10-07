'use client';
/* Generated from the Business Voice capture — see tools/generate-business-voice.mjs */
import { useRef } from 'react';
import useFaqAccordion from '../../hooks/business-voice/useFaqAccordion';

export default function FaqAccordion() {
  const rootRef = useRef(null);
  useFaqAccordion(rootRef);

  return (
    <section ref={rootRef} id="faq" className="section-faq-accordion  v2-section-faq-wrapper section-faq-accordion--white">
    	<div className="faq-accordion-container">
    		<div className="faq-section-header reveal revealed" style={{ willChange: "auto" }}>
    				<span className="platform-badge">FAQs</span>
		
    				<h2 className="faq-section-title">Frequently Asked Questions</h2>
		
    			</div>
	
    				<div className="faq-accordion-list reveal revealed" style={{ willChange: "auto" }}>
    															<div className="faq-accordion-item active">
    					<div className="faq-accordion-header">
    						<h3 className="faq-accordion-question">Can I keep my existing phone number?</h3>
    						<span className="faq-accordion-toggle">
    							<i className="ri-add-line plus-icon"></i>
    							<i className="ri-subtract-line minus-icon"></i>
    						</span>
    					</div>
    					<div className="faq-accordion-content">
    						<div className="faq-accordion-answer">
    							<p>Yes. Nextiva ports your existing numbers for free. Local numbers typically transfer in 3–5 business days, toll-free numbers in 7–10 business days. Your current number keeps working throughout the process, so there’s no gap in service. You’ll receive email confirmations at each stage of the port.</p>
    						</div>
    					</div>
    				</div>
    																			<div className="faq-accordion-item">
    					<div className="faq-accordion-header">
    						<h3 className="faq-accordion-question">What devices does Nextiva work on?</h3>
    						<span className="faq-accordion-toggle">
    							<i className="ri-add-line plus-icon"></i>
    							<i className="ri-subtract-line minus-icon"></i>
    						</span>
    					</div>
    					<div className="faq-accordion-content">
    						<div className="faq-accordion-answer">
    							<p>Nextiva runs on the NextivaONE app for Mac, Windows, iOS, and Android, plus a browser-based app for any computer. All stay in sync so calls, texts, and contacts follow you across devices. Compatible VoIP desk phones are also supported. Nextiva Anywhere lets you forward calls to any phone and pull active calls between your desk phone and app using a star code.</p>
    						</div>
    					</div>
    				</div>
    																			<div className="faq-accordion-item">
    					<div className="faq-accordion-header">
    						<h3 className="faq-accordion-question">How does XBert AI call handling work?</h3>
    						<span className="faq-accordion-toggle">
    							<i className="ri-add-line plus-icon"></i>
    							<i className="ri-subtract-line minus-icon"></i>
    						</span>
    					</div>
    					<div className="faq-accordion-content">
    						<div className="faq-accordion-answer">
    							<p>XBert AI answers incoming calls when your team is unavailable. It handles common questions, captures caller details, books appointments, and routes urgent calls to the right person. After every call, you get an AI-generated summary with action items so nothing falls through the cracks.</p>
    						</div>
    					</div>
    				</div>
    																			<div className="faq-accordion-item">
    					<div className="faq-accordion-header">
    						<h3 className="faq-accordion-question">Are there limits on text messages?</h3>
    						<span className="faq-accordion-toggle">
    							<i className="ri-add-line plus-icon"></i>
    							<i className="ri-subtract-line minus-icon"></i>
    						</span>
    					</div>
    					<div className="faq-accordion-content">
    						<div className="faq-accordion-answer">
    							<p>Nextiva supports SMS and MMS from your U.S. business number. You can send texts, images (JPG, PNG, GIF), audio (MP3, WAV), and video (MP4) up to 1 MB per file. To send commercial messages, you’ll need to complete A2P 10DLC registration through your admin portal to comply with carrier regulations. International texting and SMS shortcodes are not currently supported.</p>
    						</div>
    					</div>
    				</div>
    																			<div className="faq-accordion-item">
    					<div className="faq-accordion-header">
    						<h3 className="faq-accordion-question">What integrations does Nextiva support?</h3>
    						<span className="faq-accordion-toggle">
    							<i className="ri-add-line plus-icon"></i>
    							<i className="ri-subtract-line minus-icon"></i>
    						</span>
    					</div>
    					<div className="faq-accordion-content">
    						<div className="faq-accordion-answer">
    							<p>Nextiva integrates with major CRMs (Salesforce, HubSpot, Zoho, Microsoft Dynamics, Oracle Sales Cloud, SugarCRM), helpdesks (Zendesk, ConnectWise, ServiceNow), productivity tools (Microsoft Teams, Google Workspace, Microsoft Outlook), and ERPs (Oracle NetSuite, Jack Henry). A Chrome extension is also available for browser-based workflows.</p>
    						</div>
    					</div>
    				</div>
    																			<div className="faq-accordion-item">
    					<div className="faq-accordion-header">
    						<h3 className="faq-accordion-question">Can I make international calls?</h3>
    						<span className="faq-accordion-toggle">
    							<i className="ri-add-line plus-icon"></i>
    							<i className="ri-subtract-line minus-icon"></i>
    						</span>
    					</div>
    					<div className="faq-accordion-content">
    						<div className="faq-accordion-answer">
    							<p>Yes. International dialing is available but disabled by default on new accounts to prevent unauthorized charges. Contact Nextiva support to enable it. Once activated, you dial 011 + country code + number from any device. Rates vary by destination and are published in Nextiva’s international rate card.</p>
    						</div>
    					</div>
    				</div>
    																			<div className="faq-accordion-item">
    					<div className="faq-accordion-header">
    						<h3 className="faq-accordion-question">How quickly can I get set up?</h3>
    						<span className="faq-accordion-toggle">
    							<i className="ri-add-line plus-icon"></i>
    							<i className="ri-subtract-line minus-icon"></i>
    						</span>
    					</div>
    					<div className="faq-accordion-content">
    						<div className="faq-accordion-answer">
    							<p>Same day. Download the NextivaONE app, log in, and start making calls. If you’re using desk phones, they boot up in a few minutes once plugged in. Microsoft Teams integration syncs in about 15 minutes depending on account size. Number porting runs in parallel so you can use Nextiva immediately with a new number while your existing number transfers.</p>
    						</div>
    					</div>
    				</div>
    																			<div className="faq-accordion-item">
    					<div className="faq-accordion-header">
    						<h3 className="faq-accordion-question">Is Nextiva reliable enough for my business?</h3>
    						<span className="faq-accordion-toggle">
    							<i className="ri-add-line plus-icon"></i>
    							<i className="ri-subtract-line minus-icon"></i>
    						</span>
    					</div>
    					<div className="faq-accordion-content">
    						<div className="faq-accordion-answer">
    							<p>Nextiva’s network delivers 99.999% uptime across 8 points of presence with carrier-grade data centers. Real-time network status is publicly available at status.nextiva.com. Because it’s cloud-based, your phone system keeps working even if your office loses power, as long as your team has internet on another device.</p>
    						</div>
    					</div>
    				</div>
    									</div>
    			</div>

		
    	</section>
  );
}
