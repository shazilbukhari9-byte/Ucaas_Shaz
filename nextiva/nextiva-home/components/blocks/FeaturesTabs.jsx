'use client';
/* Generated from the www.ucaas.com capture — see tools/generate.mjs */
import { useRef, useState } from 'react';
import useFeatureTabs from '../../hooks/useFeatureTabs';

export default function FeaturesTabs() {
  const rootRef = useRef(null);
  useFeatureTabs(rootRef);
  // Phones only: the Cloud Phone collage is too wide to read whole, so a
  // switcher shows the softphone or the team chat at its real size.
  const [cpView, setCpView] = useState('phone');

  return (
    <section ref={rootRef} id="v2-section-features-tabs-block_8346ae6c6f50bc7fdaf89f3b6cdfdc24" className="section-tabbed-trust-showcase  v2-section-features-tabs-wrapper">
                    <div className="section-header-row reveal">
                        <div className="section-header-left">
                            <span className="platform-badge">
    					One Platform				</span>

                            <h2 className="accordion-section-heading">
                                Every Line, Every Channel, One Workspace </h2>
                        </div>

                        <div className="section-header-callouts" id="platformStats">
                            <div className="stat-callout">
                                <div className="stat-callout-icon">
                                    <img decoding="async" width="48" height="48" src="/media/stat-icon-1-orange.png" className="attachment-full size-full" alt="" /> </div>

                                <span className="stat-callout-title">
    																	<span className="counter" data-target="60" data-suffix="s">
    										60s									</span> To Go Live </span>

                                <span className="stat-callout-desc">
    								Signup to first answered call							</span>

                            </div>
                            <div className="stat-callout">
                                <div className="stat-callout-icon">
                                    <img decoding="async" width="48" height="48" src="/media/stat-icon-2-orange.png" className="attachment-full size-full" alt="" /> </div>

                                <span className="stat-callout-title">
    																	<span className="counter" data-target="40" data-suffix="+">
    										40+									</span> Countries </span>

                                <span className="stat-callout-desc">
    								Local numbers in every market
    							</span>

                            </div>
                            <div className="stat-callout">
                                <div className="stat-callout-icon">
                                    <img decoding="async" width="48" height="48" src="/media/stat-icon-3-orange.png" className="attachment-full size-full" alt="" /> </div>

                                <span className="stat-callout-title">
    																	<span className="counter" data-target="24" data-suffix="/7">
    										24/7									</span> Answering </span>

                                <span className="stat-callout-desc">
    								AI answering that never sleeps
    							</span>

                            </div>
                        </div>
                    </div>

<div className="tabs-container-card">
                    <div className="primary-tabs-bar reveal reveal-delay-1">
                        {/* Phone-only stepper arrows: on narrow screens the bar shows
                            just the active tab between these, "‹ Cloud Phone ›".
                            Hidden on wider screens, where every tab fits. */}
                        <button className="primary-tabs-step primary-tabs-step--prev" type="button" aria-label="Previous product">
                            <i className="ri-arrow-left-s-line" aria-hidden="true"></i>
                        </button>
                        <button className="primary-tab active" type="button" data-tab="customer-interactions">
    											<span className="primary-tab-icon">
    															<i className="ri-phone-line" aria-hidden="true"></i>
    													</span>
    										 Cloud Phone									</button>
                        <button className="primary-tab" type="button" data-tab="ai-tools">
    											<span className="primary-tab-icon">
    															<i className="ri-sparkling-2-line" aria-hidden="true"></i>
    													</span>
    										 AI Agent 											<span className="new-pill">New</span>
    									</button>
                        <button className="primary-tab" type="button" data-tab="customer-experience">
    											<span className="primary-tab-icon">
    															<i className="ri-contacts-book-line" aria-hidden="true"></i>
    													</span>
    										Auto Dialer									</button>
                        <button className="primary-tab" type="button" data-tab="connected-tools">
    											<span className="primary-tab-icon">
    															<i className="ri-puzzle-2-line" aria-hidden="true"></i>
    													</span>
    										Connected Tools									</button>
                        <button className="primary-tabs-step primary-tabs-step--next" type="button" aria-label="Next product">
                            <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
                        </button>
                    </div>

                        <div className="tabs-container-accordion">
                            <div className="product-content-panel">
                                <div className="product-content active" id="content-customer-interactions">
                                    <h3 className="product-content-title">
                                        Cloud Phone </h3>

                                    <p className="product-content-description">
                                        Calling on every device — local and toll-free numbers, call routing, IVR menus and voicemail transcription in one place.

                                    </p>

                                    <span className="product-content-eyebrow">
    									NEXT Platform Capabilities								</span>

                                    <div className="product-links-cards">
                                        <a className="product-link-card" href="/cloud-phone/phone-texting">
    																					<span className="product-link-card-icon">
    																									<i className="ri-phone-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Phone &amp; Texting													</span>
												
    																									<span className="product-link-card-desc">
    														Calls and texts on any device.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/cloud-phone/video-meetings">
    																					<span className="product-link-card-icon">
    																									<i className="ri-video-chat-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Video Meetings													</span>
												
    																									<span className="product-link-card-desc">
    														Recorded video calls in a click.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/cloud-phone/live-chat">
    																					<span className="product-link-card-icon">
    																									<i className="ri-chat-1-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Live Chat													</span>
												
    																									<span className="product-link-card-desc">
    														Catch visitors on your website.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/cloud-phone/inbox">
    																					<span className="product-link-card-icon">
    																									<i className="ri-inbox-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Inbox													</span>
												
    																									<span className="product-link-card-desc">
    														SMS, MMS and fax in one thread.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/cloud-phone/omnichannel">
    																					<span className="product-link-card-icon">
    																									<i className="ri-broadcast-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Omnichannel													</span>
												
    																									<span className="product-link-card-desc">
    														Every channel, one conversation.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/cloud-phone/team-messaging">
    																					<span className="product-link-card-icon">
    																									<i className="ri-message-3-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Team Messaging													</span>
												
    																									<span className="product-link-card-desc">
    														Channels, threads and DMs.													</span>
    																							</div>
    										</a>
                                    </div>
                                </div>
                                <div className="product-content" id="content-ai-tools">
                                    <h3 className="product-content-title">
                                        AI Agent </h3>

                                    <p className="product-content-description">
                                        Answers calls and chats, books appointments, updates records and hands off to your team when needed. </p>

                                    <span className="product-content-eyebrow">
    									NEXT Platform Capabilities								</span>

                                    <div className="product-links-cards">
                                        <a className="product-link-card" href="/products/ai-receptionist">
                                            <span className="product-link-card-icon">
                                                <i className="ri-customer-service-2-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">AI Receptionist</span>
                                                <span className="product-link-card-desc">Answers and logs every call.</span>
                                            </div>
                                        </a>
                                        <a className="product-link-card" href="/products/ai-chatbot">
                                            <span className="product-link-card-icon">
                                                <i className="ri-robot-2-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">AI Chatbot</span>
                                                <span className="product-link-card-desc">Handles web chats round the clock.</span>
                                            </div>
                                        </a>
                                        <a className="product-link-card" href="/products/ai-assistant">
                                            <span className="product-link-card-icon">
                                                <i className="ri-user-voice-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">AI Assistant</span>
                                                <span className="product-link-card-desc">Suggests your agent's next reply.</span>
                                            </div>
                                        </a>
                                        <a className="product-link-card" href="/products/ai-call-intelligence">
                                            <span className="product-link-card-icon">
                                                <i className="ri-line-chart-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">AI Call Intelligence</span>
                                                <span className="product-link-card-desc">Reads calls for topics and cues.</span>
                                            </div>
                                        </a>
                                        <a className="product-link-card" href="/products/ai-scheduling">
                                            <span className="product-link-card-icon">
                                                <i className="ri-calendar-check-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">AI Call Scheduling</span>
                                                <span className="product-link-card-desc">Books the appointment on the call.</span>
                                            </div>
                                        </a>
                                        <a className="product-link-card" href="/products/ai-follow-ups">
                                            <span className="product-link-card-icon">
                                                <i className="ri-mail-send-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">AI Follow-Ups</span>
                                                <span className="product-link-card-desc">Sends the recap before you hang up.</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="product-content" id="content-customer-experience">
                                    <h3 className="product-content-title">
                                        Auto Dialer </h3>

                                    <p className="product-content-description">
                                        Work call lists automatically — preview, progressive and predictive dialling, with retries and every outcome logged.

                                    </p>

                                    <span className="product-content-eyebrow">Platform Capabilities</span>

                                    <div className="product-links-cards">
                                        <a className="product-link-card" href="/products/preview-dialer">
                                            <span className="product-link-card-icon">
                                                <i className="ri-eye-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">Preview Dialing</span>
                                                <span className="product-link-card-desc">Agents choose when to dial.</span>
                                            </div>
                                        </a>
                                        <a className="product-link-card" href="/products/progressive-dialer">
                                            <span className="product-link-card-icon">
                                                <i className="ri-play-circle-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">Progressive Dialing</span>
                                                <span className="product-link-card-desc">Dials the next lead automatically.</span>
                                            </div>
                                        </a>
                                        <a className="product-link-card" href="/products/predictive-dialer">
                                            <span className="product-link-card-icon">
                                                <i className="ri-speed-up-line" aria-hidden="true"></i>
                                            </span>
                                            <div className="product-link-card-content">
                                                <span className="product-link-card-title">Predictive Dialing</span>
                                                <span className="product-link-card-desc">Dials ahead to find live answers.</span>
                                            </div>
                                        </a>
                                    </div>

                                </div>
                                <div className="product-content" id="content-connected-tools">
                                    <h3 className="product-content-title">
                                        Connected Tools </h3>

                                    <p className="product-content-description">
                                        Connect your CRM, helpdesk, productivity and industry tools so calls, notes and outcomes flow into one workflow.

                                    </p>

                                    <span className="product-content-eyebrow">
    									Integration Marketplace								</span>

                                    <div className="product-links-cards">
                                        <a className="product-link-card" href="/integrations#crm">
    																					<span className="product-link-card-icon">
    																									<i className="ri-contacts-book-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														CRM Integrations													</span>
												
    																									<span className="product-link-card-desc">
    														Push calls and notes to your CRM.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/integrations#helpdesk">
    																					<span className="product-link-card-icon">
    																									<i className="ri-customer-service-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Helpdesk &amp; Ticketing													</span>
												
    																									<span className="product-link-card-desc">
    														Raise tickets from a conversation.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/integrations#productivity">
    																					<span className="product-link-card-icon">
    																									<i className="ri-apps-2-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Productivity Tools													</span>
												
    																									<span className="product-link-card-desc">
    														Calendars and email stay in step.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/integrations#ehr">
    																					<span className="product-link-card-icon">
    																									<i className="ri-heart-pulse-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Healthcare EHR													</span>
												
    																									<span className="product-link-card-desc">
    														Patient records stay in sync.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/products/customer-analytics">
    																					<span className="product-link-card-icon">
    																									<i className="ri-bar-chart-box-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														Analytics &amp; Reporting													</span>
												
    																									<span className="product-link-card-desc">
    														Live dashboards for every queue.													</span>
    																							</div>
    										</a>
                                        <a className="product-link-card" href="/resources/learn/rest-apis">
    																					<span className="product-link-card-icon">
    																									<i className="ri-code-s-slash-line" aria-hidden="true"></i>
    																							</span>
										
    											<div className="product-link-card-content">
    																									<span className="product-link-card-title">
    														REST APIs													</span>
												
    																									<span className="product-link-card-desc">
    														Open APIs and webhooks to build on.													</span>
    																							</div>
    										</a>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-visual-container">
                                <div className="accordion-visual active" id="visual-customer-interactions">
                                    <div className="accordion-visual-placeholder accordion-visual-placeholder--light" style={{ backgroundImage: "url(/media/pastel-mountains-dawn.webp)", backgroundSize: "cover", backgroundPosition: "center bottom" }}>
                                        <div className="cp-switch" role="tablist" aria-label="Cloud Phone view">
                                            <button type="button" role="tab" aria-selected={cpView === 'phone'} className={cpView === 'phone' ? 'is-on' : ''} onClick={() => setCpView('phone')}><i className="ri-smartphone-line" aria-hidden="true"></i>Softphone</button>
                                            <button type="button" role="tab" aria-selected={cpView === 'chat'} className={cpView === 'chat' ? 'is-on' : ''} onClick={() => setCpView('chat')}><i className="ri-chat-3-line" aria-hidden="true"></i>Team chat</button>
                                        </div>
                                                                                <div className="cp-stage" data-view={cpView}>
                                            <div className="tab-phone-mockup">
                                                <div className="tab-phone-notch"></div>
                                                <div className="tab-phone-screen">
                                                    <div className="dialer-contact">
                                                        <span className="dialer-avatar">RK</span>
                                                        <span className="dialer-who">
                                                            <span className="dialer-name">Rohit Kalra</span>
                                                            <span className="dialer-number">+91 98765 43210</span>
                                                            <span className="dialer-tag">Lead</span>
                                                        </span>
                                                        <span className="dialer-meta">
                                                            <span className="dialer-status"><i className="ri-circle-fill"></i> Connected</span>
                                                            <span className="dialer-timer">01:57</span>
                                                        </span>
                                                    </div>

                                                    <div className="dialer-keys">
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key"><i className="ri-pause-circle-line"></i></span>
                                                            <span className="dialer-key-label">Hold</span>
                                                        </span>
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key"><i className="ri-mic-line"></i></span>
                                                            <span className="dialer-key-label">Mute</span>
                                                        </span>
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key"><i className="ri-volume-up-line"></i></span>
                                                            <span className="dialer-key-label">Speaker</span>
                                                        </span>
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key"><i className="ri-arrow-left-right-line"></i></span>
                                                            <span className="dialer-key-label">Transfer</span>
                                                        </span>
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key"><i className="ri-user-add-line"></i></span>
                                                            <span className="dialer-key-label">Add Call</span>
                                                        </span>
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key dialer-key--rec"><i className="ri-record-circle-fill"></i></span>
                                                            <span className="dialer-key-label">Record</span>
                                                        </span>
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key"><i className="ri-file-list-2-line"></i></span>
                                                            <span className="dialer-key-label">Transcript</span>
                                                        </span>
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key"><i className="ri-edit-box-line"></i></span>
                                                            <span className="dialer-key-label">Notes</span>
                                                        </span>
                                                        <span className="dialer-btn">
                                                            <span className="dialer-key"><i className="ri-keyboard-box-line"></i></span>
                                                            <span className="dialer-key-label">Keypad</span>
                                                        </span>
                                                    </div>

                                                    <span className="dialer-btn dialer-btn--end">
                                                        <span className="dialer-key dialer-key--end"><i className="ri-phone-fill"></i></span>
                                                        <span className="dialer-key-label">Hangup</span>
                                                    </span>

                                                    <div className="dialer-sentiment">
                                                        <span className="dialer-sentiment-title">Live Sentiment</span>
                                                        <div className="dialer-gauges">
                                                            <span className="dialer-gauge">
                                                                <svg viewBox="0 0 36 36" aria-hidden="true">
                                                                    <circle className="gauge-track" cx="18" cy="18" r="14"></circle>
                                                                    <circle className="gauge-fill gauge-pos" cx="18" cy="18" r="14" strokeDasharray="0.88 87.96"></circle>
                                                                </svg>
                                                                <span className="dialer-gauge-value">1%</span>
                                                                <span className="dialer-gauge-label">Positive</span>
                                                            </span>
                                                            <span className="dialer-gauge">
                                                                <svg viewBox="0 0 36 36" aria-hidden="true">
                                                                    <circle className="gauge-track" cx="18" cy="18" r="14"></circle>
                                                                    <circle className="gauge-fill gauge-neu" cx="18" cy="18" r="14" strokeDasharray="87.08 87.96"></circle>
                                                                </svg>
                                                                <span className="dialer-gauge-value">99%</span>
                                                                <span className="dialer-gauge-label">Neutral</span>
                                                            </span>
                                                            <span className="dialer-gauge">
                                                                <svg viewBox="0 0 36 36" aria-hidden="true">
                                                                    <circle className="gauge-track" cx="18" cy="18" r="14"></circle>
                                                                    <circle className="gauge-fill gauge-neg" cx="18" cy="18" r="14" strokeDasharray="0.0 87.96"></circle>
                                                                </svg>
                                                                <span className="dialer-gauge-value">0%</span>
                                                                <span className="dialer-gauge-label">Negative</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-desktop-app">
                                                <div className="tab-app-window">
                                                    <div className="tab-app-body">
                                                        <div className="tab-app-sidebar">
                                                <div className="tab-sidebar-title">Messages</div>
                                                        <div className="tab-conversation active">
                                                            <div className="tab-conv-avatar tab-conv-avatar--rk">RK<span className="tab-status"></span></div>
                                                            <div className="tab-conv-info">
                                                                <span className="tab-conv-name">Rohit Kalra</span>
                                                                <span className="tab-conv-preview">Porting the rest across this week</span>
                                                            </div>
                                                            <span className="tab-conv-time">2m</span>
                                                        </div>
                                                        <div className="tab-conversation">
                                                            <div className="tab-conv-avatar tab-conv-avatar--ps">PS</div>
                                                            <div className="tab-conv-info">
                                                                <span className="tab-conv-name">Priya Sharma</span>
                                                                <span className="tab-conv-preview">Sent the porting form over</span>
                                                            </div>
                                                            <span className="tab-conv-time">15m</span>
                                                        </div>
                                                        <div className="tab-conversation">
                                                            <div className="tab-conv-avatar tab-conv-avatar--mn">MN</div>
                                                            <div className="tab-conv-info">
                                                                <span className="tab-conv-name">Meera Nair</span>
                                                                <span className="tab-conv-preview">Can we add two more lines?</span>
                                                            </div>
                                                            <span className="tab-conv-time">1h</span>
                                                        </div>
                                                        <div className="tab-conversation">
                                                            <div className="tab-conv-avatar tab-conv-avatar--dp">DP</div>
                                                            <div className="tab-conv-info">
                                                                <span className="tab-conv-name">David Park</span>
                                                                <span className="tab-conv-preview">Thanks, all set on our side</span>
                                                            </div>
                                                            <span className="tab-conv-time">2h</span>
                                                        </div>
                                                        <div className="tab-conversation">
                                                            <div className="tab-conv-avatar tab-conv-avatar--av">AV</div>
                                                            <div className="tab-conv-info">
                                                                <span className="tab-conv-name">Ananya Verma</span>
                                                                <span className="tab-conv-preview">Invoice looks right, approving it</span>
                                                            </div>
                                                            <span className="tab-conv-time">4h</span>
                                                        </div>
                                                        <div className="tab-conversation">
                                                            <div className="tab-conv-avatar tab-conv-avatar--si">SI</div>
                                                            <div className="tab-conv-info">
                                                                <span className="tab-conv-name">Sana Iqbal</span>
                                                                <span className="tab-conv-preview">Can the team get voicemail to email?</span>
                                                            </div>
                                                            <span className="tab-conv-time">6h</span>
                                                        </div>
                                                        <div className="tab-conversation">
                                                            <div className="tab-conv-avatar tab-conv-avatar--to">TO</div>
                                                            <div className="tab-conv-info">
                                                                <span className="tab-conv-name">Tomas Oliveira</span>
                                                                <span className="tab-conv-preview">Call quality has been spot on</span>
                                                            </div>
                                                            <span className="tab-conv-time">Yst</span>
                                                        </div>
                                                        <div className="tab-conversation">
                                                            <div className="tab-conv-avatar tab-conv-avatar--lc">LC</div>
                                                            <div className="tab-conv-info">
                                                                <span className="tab-conv-name">Lena Chen</span>
                                                                <span className="tab-conv-preview">Adding the Bristol office next month</span>
                                                            </div>
                                                            <span className="tab-conv-time">Yst</span>
                                                        </div>
                                                    </div>
                                                    <div className="tab-app-chat">
                                                            <div className="tab-chat-header">
                                                                <span className="tab-chat-name">Rohit Kalra</span>
                                                                <div className="tab-chat-actions">
                                                                    <i className="ri-phone-line"></i>
                                                                    <i className="ri-vidicon-line"></i>
                                                                </div>
                                                            </div>
                                                            <div className="tab-chat-messages">
                                                                <div className="tab-msg received">Missed your call &#8212; was that about the new numbers?</div>
                                                                <div className="tab-msg sent">It was. Ten lines are provisioned and live already</div>
                                                                <div className="tab-msg received">Brilliant. Porting the rest across this week then</div>
                                                                <div className="tab-msg sent">I&#8217;ll drop the porting form in this thread</div>
                                                                <div className="tab-msg received">Got it. Do the desk phones need anything?</div>
                                                                <div className="tab-msg sent">No, they pick up the new numbers on their own</div>
                                                                <div className="tab-msg received">Perfect. Sending the extension list across now</div>
                                                                <div className="tab-msg received tab-msg--typing">
                                                                    <span className="tab-typing-dot"></span>
                                                                    <span className="tab-typing-dot"></span>
                                                                    <span className="tab-typing-dot"></span>
                                                                </div>
                                                            </div>
                                                            <div className="tab-chat-input">
                                                                <span className="tab-chat-compose">
                                                                    <span className="tab-chat-typed">Great &#8212; I&#8217;ll set them up today</span>
                                                                    <span className="tab-chat-caret"></span>
                                                                </span>
                                                                <i className="ri-send-plane-2-fill"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-visual" id="visual-ai-tools">
                                    <div className="accordion-visual-placeholder accordion-visual-placeholder--light" style={{ backgroundImage: "url(/media/pastel-mountains-dawn.webp)", backgroundSize: "cover", backgroundPosition: "center bottom" }}>
                                        <div className="ci-layout">
                                        <div className="ci-labels">
                                        <div className="tab-toast ai-panel-toast-1">
                                            <div className="tab-toast-icon"><i className="ri-calendar-check-fill"></i></div>
                                            <div className="tab-toast-content">
                                                <span className="tab-toast-title">Appointment Booked</span>
                                                <span className="tab-toast-desc">Tomorrow, 2:00 PM</span>
                                            </div>
                                        </div>
                                        <div className="tab-toast ai-panel-toast-2">
                                            <div className="tab-toast-icon"><i className="ri-route-fill"></i></div>
                                            <div className="tab-toast-content">
                                                <span className="tab-toast-title">Call Routed</span>
                                                <span className="tab-toast-desc">Sent to sales in 4s</span>
                                            </div>
                                        </div>
                                        <div className="tab-toast ai-panel-toast-3">
                                            <div className="tab-toast-icon"><i className="ri-questionnaire-fill"></i></div>
                                            <div className="tab-toast-content">
                                                <span className="tab-toast-title">FAQ Answered</span>
                                                <span className="tab-toast-desc">No agent needed</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="ci-window">
                                            <div className="ci-titlebar">Call Intelligence</div>

                                            <div className="ci-body">
                                                <div className="ci-col ci-col--transcript">
                                                    <span className="ci-col-title">Transcript Records</span>
                                                    <div className="ci-transcript">
                                                        <div className="ci-line ci-line--in">
                                                            <span className="ci-line-meta">Meera Nair <span className="ci-line-time">01:56 PM</span></span>
                                                            <span className="ci-bubble">Hi, I'd like to book for tomorrow</span>
                                                        </div>
                                                        <div className="ci-line ci-line--out">
                                                            <span className="ci-line-meta">AI Assistant <span className="ci-line-time">01:56 PM</span></span>
                                                            <span className="ci-bubble">I have 2pm or 4pm available. Which works?</span>
                                                        </div>
                                                        <div className="ci-line ci-line--in">
                                                            <span className="ci-line-meta">Meera Nair <span className="ci-line-time">01:57 PM</span></span>
                                                            <span className="ci-bubble">2pm works</span>
                                                        </div>
                                                        <div className="ci-line ci-line--out">
                                                            <span className="ci-line-meta">AI Assistant <span className="ci-line-time">01:57 PM</span></span>
                                                            <span className="ci-bubble">Booked. Confirmation sent by SMS.</span>
                                                        </div>
                                                        <div className="ci-line ci-line--in">
                                                            <span className="ci-line-meta">Meera Nair <span className="ci-line-time">01:58 PM</span></span>
                                                            <span className="ci-bubble">Can I get a reminder the morning of?</span>
                                                        </div>
                                                        <div className="ci-line ci-line--out">
                                                            <span className="ci-line-meta">AI Assistant <span className="ci-line-time">01:58 PM</span></span>
                                                            <span className="ci-bubble">Done &#8212; a text will land at 9:00 AM.</span>
                                                        </div>
                                                        <div className="ci-line ci-line--in">
                                                            <span className="ci-line-meta">Meera Nair <span className="ci-line-time">01:59 PM</span></span>
                                                            <span className="ci-bubble">And is parking available on site?</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ci-col ci-col--insights">
                                                    <span className="ci-col-title">Conversation Insights</span>

                                                    <span className="ci-section-label">Sentiment</span>
                                                    <div className="ci-card">
                                                        <span className="ci-card-title">Live Sentiment</span>
                                                        <div className="ci-sentiment">
                                                            <span className="ci-dial">
                                                                <svg viewBox="0 0 36 36" aria-hidden="true">
                                                                    <circle className="ci-dial-track" cx="18" cy="18" r="15.5"></circle>
                                                                    <circle className="ci-dial-fill" cx="18" cy="18" r="15.5" strokeDasharray="60.38 97.39"></circle>
                                                                </svg>
                                                                <span className="ci-dial-mid">
                                                                    <b>62%</b>
                                                                    <em>Positive</em>
                                                                </span>
                                                            </span>

                                                            <span className="ci-legend">
                                                                        <span className="ci-leg">
                                                                            <span className="ci-leg-dot ci-leg-dot--pos"></span>
                                                                            <span className="ci-leg-name">Positive</span>
                                                                            <span className="ci-leg-track"><span className="ci-leg-fill ci-leg-fill--pos" style={{ width: "62%" }}></span></span>
                                                                            <span className="ci-leg-val">62.0%</span>
                                                                        </span>
                                                                        <span className="ci-leg">
                                                                            <span className="ci-leg-dot ci-leg-dot--neu"></span>
                                                                            <span className="ci-leg-name">Neutral</span>
                                                                            <span className="ci-leg-track"><span className="ci-leg-fill ci-leg-fill--neu" style={{ width: "27%" }}></span></span>
                                                                            <span className="ci-leg-val">27.0%</span>
                                                                        </span>
                                                                        <span className="ci-leg">
                                                                            <span className="ci-leg-dot ci-leg-dot--neg"></span>
                                                                            <span className="ci-leg-name">Negative</span>
                                                                            <span className="ci-leg-track"><span className="ci-leg-fill ci-leg-fill--neg" style={{ width: "5%" }}></span></span>
                                                                            <span className="ci-leg-val">5.0%</span>
                                                                        </span>
                                                                        <span className="ci-leg">
                                                                            <span className="ci-leg-dot ci-leg-dot--mix"></span>
                                                                            <span className="ci-leg-name">Mixed</span>
                                                                            <span className="ci-leg-track"><span className="ci-leg-fill ci-leg-fill--mix" style={{ width: "6%" }}></span></span>
                                                                            <span className="ci-leg-val">6.0%</span>
                                                                        </span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <span className="ci-section-label">Call Summary</span>
                                                    <div className="ci-card ci-card--summary">
                                                        Booked a 2:00 PM appointment for tomorrow. Confirmation sent by SMS.
                                                    </div>

                                                    <span className="ci-section-label">Key Topics</span>
                                                    <div className="ci-card ci-topics">
                                                        <span className="ci-topic">appointment</span>
                                                        <span className="ci-topic">availability</span>
                                                        <span className="ci-topic">confirmation</span>
                                                    </div>

                                                    <span className="ci-section-label">Speak Word Ratio</span>
                                                    <div className="ci-card">
                                                        <div className="ci-ratio">
                                                            <span className="ci-ratio-row">
                                                                <span className="ci-ratio-name">Meera Nair</span>
                                                                <span className="ci-ratio-val">38.3% (23 words)</span>
                                                            </span>
                                                            <span className="ci-ratio-bar"><span className="ci-ratio-fill ci-ratio-fill--a" style={{ width: "38.3%" }}></span></span>
                                                        </div>
                                                        <div className="ci-ratio">
                                                            <span className="ci-ratio-row">
                                                                <span className="ci-ratio-name">AI Assistant</span>
                                                                <span className="ci-ratio-val">61.7% (37 words)</span>
                                                            </span>
                                                            <span className="ci-ratio-bar"><span className="ci-ratio-fill ci-ratio-fill--b" style={{ width: "61.7%" }}></span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ci-footer">
                                                <span className="ci-section-label">Recording</span>
                                                <span className="ci-footer-text">Recording available &#8212; 02:34</span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-visual" id="visual-customer-experience">
                                    <div className="accordion-visual-placeholder accordion-visual-placeholder--light" style={{ backgroundImage: "url(/media/pastel-mountains-dawn.webp)", backgroundSize: "cover", backgroundPosition: "center bottom" }}>
                                        <div className="adx-stage">
                                            <div className="adx-labels">
                                                <div className="tab-toast adx-toast adx-toast-1">
                                                    <div className="tab-toast-icon"><i className="ri-play-circle-fill"></i></div>
                                                    <div className="tab-toast-content">
                                                        <span className="tab-toast-title">Campaign Started</span>
                                                        <span className="tab-toast-desc">240 leads queued</span>
                                                    </div>
                                                </div>
                                                <div className="tab-toast adx-toast adx-toast-2">
                                                    <div className="tab-toast-icon"><i className="ri-phone-fill"></i></div>
                                                    <div className="tab-toast-content">
                                                        <span className="tab-toast-title">Live Answer</span>
                                                        <span className="tab-toast-desc">Connected in 3.2s</span>
                                                    </div>
                                                </div>
                                                <div className="tab-toast adx-toast adx-toast-3">
                                                    <div className="tab-toast-icon"><i className="ri-calendar-check-fill"></i></div>
                                                    <div className="tab-toast-content">
                                                        <span className="tab-toast-title">Callback Booked</span>
                                                        <span className="tab-toast-desc">Tomorrow, 11:00 AM</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="dz-app">
                                                <div className="dz-head">
                                                    <span className="dz-brand">
                                                        <span className="dz-brand-text">
                                                            <b>Auto Dialer</b>
                                                        </span>
                                                    </span>
                                                    <span className="dz-head-right">
                                                        <span className="dz-live"><span className="dz-live-dot"></span>18 on call</span>
                                                        <span className="dz-agents"><span className="dz-agent dz-agent--mn">MN</span><span className="dz-agent dz-agent--rk">RK</span><span className="dz-agent dz-agent--ps">PS</span><span className="dz-agent dz-agent--dp">DP</span><span className="dz-agent dz-agent--more">+6</span></span>
                                                        <span className="dz-btn"><i className="ri-pause-mini-fill"></i>Pause dialing</span>
                                                    </span>
                                                </div>

                                                <div className="dz-modes">
                                                        <span className="dz-mode">
                                                            <span className="dz-mode-top">
                                                                <span className="dz-mode-icon"><i className="ri-eye-line"></i></span>
                                                                <span className="dz-mode-name">Preview</span>
                                                                <span className="dz-mode-check"><i className="ri-add-line"></i></span>
                                                            </span>
                                                            <span className="dz-mode-desc">Agent reads the lead first, then chooses when to dial.</span>
                                                            <span className="dz-mode-meter">
                                                                <span className="dz-mode-meter-head">Agent paced<b>1 : 1</b></span>
                                                                <span className="dz-bar"><span className="dz-bar-fill" style={{ width: "34%" }}></span></span>
                                                            </span>
                                                        </span>
                                                        <span className="dz-mode">
                                                            <span className="dz-mode-top">
                                                                <span className="dz-mode-icon"><i className="ri-skip-forward-line"></i></span>
                                                                <span className="dz-mode-name">Progressive</span>
                                                                <span className="dz-mode-check"><i className="ri-add-line"></i></span>
                                                            </span>
                                                            <span className="dz-mode-desc">The next lead is dialled the moment a call wraps up.</span>
                                                            <span className="dz-mode-meter">
                                                                <span className="dz-mode-meter-head">Auto paced<b>1 : 1</b></span>
                                                                <span className="dz-bar"><span className="dz-bar-fill" style={{ width: "62%" }}></span></span>
                                                            </span>
                                                        </span>
                                                        <span className="dz-mode dz-mode--on">
                                                            <span className="dz-mode-top">
                                                                <span className="dz-mode-icon"><i className="ri-flashlight-fill"></i></span>
                                                                <span className="dz-mode-name">Predictive</span>
                                                                <span className="dz-mode-check"><i className="ri-check-line"></i></span>
                                                            </span>
                                                            <span className="dz-mode-desc">Dials several numbers ahead so agents land on live answers.</span>
                                                            <span className="dz-mode-meter">
                                                                <span className="dz-mode-meter-head">Pacing ratio<b>2.4 x</b></span>
                                                                <span className="dz-bar"><span className="dz-bar-fill" style={{ width: "88%" }}></span></span>
                                                            </span>
                                                        </span>
                                                </div>

                                                <div className="dz-floor">
                                                    <div className="dz-main">
                                                        <div className="dz-call">
                                                        <span className="dz-call-head">
                                                            <span className="dz-call-avatar">MN</span>
                                                            <span className="dz-call-who">
                                                                <b>Meera Nair<span className="dz-call-tag">Attempt 2 of 4</span></b>
                                                                <em>+91 98105 44210 &bull; Kestrel Interiors</em>
                                                            </span>
                                                            <span className="dz-call-timer"><i className="ri-record-circle-fill"></i>02:41</span>
                                                        </span>
                                                        <span className="dz-actions">
                                                            <span className="dz-act"><i className="ri-arrow-left-right-line"></i>Transfer</span>
                                                            <span className="dz-act"><i className="ri-sticky-note-line"></i>Note</span>
                                                            <span className="dz-act"><i className="ri-price-tag-3-line"></i>Disposition</span>
                                                            <span className="dz-act dz-act--end"><i className="ri-phone-fill"></i>End</span>
                                                        </span>
                                                    </div>
                                                        <div className="dz-queue">
                                                        <span className="dz-queue-head">Next in queue<b>236</b></span>
                                                            <span className="dz-lead">
                                                                <span className="dz-lead-avatar dz-lead-avatar--av">AV</span>
                                                                <span className="dz-lead-info">
                                                                    <b>Ananya Verma</b>
                                                                    <em>Vertex Logistics</em>
                                                                </span>
                                                                <span className="dz-lead-tag">Attempt 1</span>
                                                            </span>
                                                            <span className="dz-lead">
                                                                <span className="dz-lead-avatar dz-lead-avatar--rk">RK</span>
                                                                <span className="dz-lead-info">
                                                                    <b>Rohit Kalra</b>
                                                                    <em>Northline Freight</em>
                                                                </span>
                                                                <span className="dz-lead-tag">Callback</span>
                                                            </span>
                                                            <span className="dz-lead">
                                                                <span className="dz-lead-avatar dz-lead-avatar--dp">DP</span>
                                                                <span className="dz-lead-info">
                                                                    <b>David Park</b>
                                                                    <em>Parkway Dental</em>
                                                                </span>
                                                                <span className="dz-lead-tag">Attempt 2</span>
                                                            </span>
                                                        <span className="dz-queue-foot"><i className="ri-forbid-2-line"></i>DNC and time zones screened</span>
                                                    </div>
                                                    </div>

                                                    <div className="dz-feed">
                                                        <span className="dz-feed-head">Recent activity<b>Last hour</b></span>
                                                            <span className="dz-feed-item">
                                                                <span className="dz-feed-dot dz-feed-dot--done"></span>
                                                                <span className="dz-feed-info">
                                                                    <b>Connected</b>
                                                                    <em>Vikram Rao &bull; 4m 12s</em>
                                                                </span>
                                                                <span className="dz-feed-time">1m</span>
                                                            </span>
                                                            <span className="dz-feed-item">
                                                                <span className="dz-feed-dot dz-feed-dot--warn"></span>
                                                                <span className="dz-feed-info">
                                                                    <b>No answer</b>
                                                                    <em>Farah Haddad &bull; requeued</em>
                                                                </span>
                                                                <span className="dz-feed-time">3m</span>
                                                            </span>
                                                            <span className="dz-feed-item">
                                                                <span className="dz-feed-dot dz-feed-dot--done"></span>
                                                                <span className="dz-feed-info">
                                                                    <b>Callback set</b>
                                                                    <em>Owen Bailey &bull; Thu 10:00</em>
                                                                </span>
                                                                <span className="dz-feed-time">6m</span>
                                                            </span>
                                                            <span className="dz-feed-item">
                                                                <span className="dz-feed-dot dz-feed-dot--dead"></span>
                                                                <span className="dz-feed-info">
                                                                    <b>Voicemail</b>
                                                                    <em>Lucia Moretti &bull; dropped</em>
                                                                </span>
                                                                <span className="dz-feed-time">9m</span>
                                                            </span>
                                                            <span className="dz-feed-item">
                                                                <span className="dz-feed-dot dz-feed-dot--done"></span>
                                                                <span className="dz-feed-info">
                                                                    <b>Connected</b>
                                                                    <em>Hassan Zaidi &bull; 2m 48s</em>
                                                                </span>
                                                                <span className="dz-feed-time">12m</span>
                                                            </span>
                                                    </div>
                                                </div>

                                                <div className="dz-foot">
                                                        <span className="dz-stat">
                                                            <span className="dz-stat-text">Dials / hour<b>128</b></span>
                                                        </span>
                                                        <span className="dz-stat">
                                                            <span className="dz-stat-text">Connect rate<b>42%</b></span>
                                                        </span>
                                                        <span className="dz-stat">
                                                            <span className="dz-stat-text">Abandon<b>1.8%</b></span>
                                                        </span>
                                                        <span className="dz-stat">
                                                            <span className="dz-stat-text">Avg talk<b>3:12</b></span>
                                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-visual" id="visual-connected-tools">
                                    <div className="accordion-visual-placeholder accordion-visual-placeholder--light" style={{ backgroundImage: "url(/media/pastel-mountains-dawn.webp)", backgroundSize: "cover", backgroundPosition: "center bottom" }}>
                                        <div className="mockup-group cc-mockup-group">
                                            <div className="toasts-group">
                                                <div className="tab-toast cc-toast-1">
                                                    <div className="tab-toast-icon"><i className="ri-refresh-fill"></i></div>
                                                    <div className="tab-toast-content">
                                                        <span className="tab-toast-title">Salesforce Synced</span>
                                                        <span className="tab-toast-desc">142 contacts synced</span>
                                                    </div>
                                                </div>
                                                <div className="tab-toast cc-toast-2">
                                                    <div className="tab-toast-icon"><i className="ri-user-add-fill"></i></div>
                                                    <div className="tab-toast-content">
                                                        <span className="tab-toast-title">New Lead Imported</span>
                                                        <span className="tab-toast-desc">HubSpot to UCaaS</span>
                                                    </div>
                                                </div>
                                                <div className="tab-toast cc-toast-3">
                                                    <div className="tab-toast-icon"><i className="ri-flow-chart"></i></div>
                                                    <div className="tab-toast-content">
                                                        <span className="tab-toast-title">Workflow Triggered</span>
                                                        <span className="tab-toast-desc">Summary to Zendesk</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dashboard-group cc-dashboard">
                                                <div className="tab-app-window">
                                                    <div className="tab-app-header">
                                                        <span className="tab-app-title">Integration Hub</span>
                                                        <div className="tab-app-icons">
                                                            <i className="ri-add-line"></i>
                                                            <i className="ri-settings-3-line"></i>
                                                        </div>
                                                    </div>
                                                    <div className="cc-dashboard-body integ-hub-body">
                                                        <div className="integ-section-label">Connected Apps</div>
                                                        <div className="integ-apps-grid">
                                                            <div className="integ-app-card integ-connected">
                                                                <div className="integ-app-icon" style={{ background: "rgba(0, 112, 210, 0.25)" }}><i className="ri-cloud-fill" style={{ color: "#4fc3f7" }}></i></div>
                                                                <span className="integ-app-name">Salesforce</span>
                                                                <span className="integ-app-status connected"><i className="ri-checkbox-circle-fill"></i> Connected</span>
                                                            </div>
                                                            <div className="integ-app-card integ-connected">
                                                                <div className="integ-app-icon" style={{ background: "rgba(255, 122, 0, 0.25)" }}><i className="ri-fire-fill" style={{ color: "#ff9a44" }}></i></div>
                                                                <span className="integ-app-name">HubSpot</span>
                                                                <span className="integ-app-status connected"><i className="ri-checkbox-circle-fill"></i> Connected</span>
                                                            </div>
                                                            <div className="integ-app-card integ-connected">
                                                                <div className="integ-app-icon" style={{ background: "rgba(3, 179, 101, 0.25)" }}><i className="ri-customer-service-2-fill" style={{ color: "#4ade80" }}></i></div>
                                                                <span className="integ-app-name">Zendesk</span>
                                                                <span className="integ-app-status connected"><i className="ri-checkbox-circle-fill"></i> Connected</span>
                                                            </div>
                                                            <div className="integ-app-card integ-connected">
                                                                <div className="integ-app-icon" style={{ background: "rgba(88, 101, 242, 0.25)" }}><i className="ri-team-fill" style={{ color: "#818cf8" }}></i></div>
                                                                <span className="integ-app-name">MS Teams</span>
                                                                <span className="integ-app-status connected"><i className="ri-checkbox-circle-fill"></i> Connected</span>
                                                            </div>
                                                            <div className="integ-app-card integ-connected">
                                                                <div className="integ-app-icon" style={{ background: "rgba(1, 119, 55, 0.28)" }}><i className="ri-filter-3-fill" style={{ color: "#34d399" }}></i></div>
                                                                <span className="integ-app-name">Pipedrive</span>
                                                                <span className="integ-app-status connected"><i className="ri-checkbox-circle-fill"></i> Connected</span>
                                                            </div>
                                                            <div className="integ-app-card integ-connected">
                                                                <div className="integ-app-icon" style={{ background: "rgba(255, 62, 62, 0.25)" }}><i className="ri-kanban-view" style={{ color: "#fb7185" }}></i></div>
                                                                <span className="integ-app-name">Monday</span>
                                                                <span className="integ-app-status connected"><i className="ri-checkbox-circle-fill"></i> Connected</span>
                                                            </div>
                                                        </div>
                                                        <div className="integ-section-label">Recent Sync Activity</div>
                                                        <div className="integ-activity-list">
                                                            <div className="integ-activity-item">
                                                                <div className="integ-activity-icon"><i className="ri-refresh-line"></i></div>
                                                                <div className="integ-activity-info">
                                                                    <span className="integ-activity-text">Salesforce contacts synced</span>
                                                                    <span className="integ-activity-meta">142 records • 2 min ago</span>
                                                                </div>
                                                            </div>
                                                            <div className="integ-activity-item">
                                                                <div className="integ-activity-icon"><i className="ri-ticket-2-line"></i></div>
                                                                <div className="integ-activity-info">
                                                                    <span className="integ-activity-text">Zendesk ticket created</span>
                                                                    <span className="integ-activity-meta">From missed call • 8 min ago</span>
                                                                </div>
                                                            </div>
                                                            <div className="integ-activity-item">
                                                                <div className="integ-activity-icon"><i className="ri-calendar-check-line"></i></div>
                                                                <div className="integ-activity-info">
                                                                    <span className="integ-activity-text">Monday task created</span>
                                                                    <span className="integ-activity-meta">Meeting booked • 15 min ago</span>
                                                                </div>
                                                            </div>
                                                            <div className="integ-activity-item">
                                                                <div className="integ-activity-icon"><i className="ri-git-merge-line"></i></div>
                                                                <div className="integ-activity-info">
                                                                    <span className="integ-activity-text">HubSpot deal stage updated</span>
                                                                    <span className="integ-activity-meta">Pipeline moved • 22 min ago</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
  );
}
