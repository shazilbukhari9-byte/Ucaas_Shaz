'use client';
/* Generated from the www.ucaas.com capture — see tools/generate.mjs */
import { useRef } from 'react';
import usePricingGrid from '../../hooks/usePricingGrid';

export default function PricingGrid() {
  const rootRef = useRef(null);
  usePricingGrid(rootRef);

  return (
    <section ref={rootRef} id="pricing" className="section-pricing-grid">
                    <div className="pricing-grid-container">

                        <div className="pricing-grid-header reveal">
                            <span className="pricing-grid-eyebrow">Plans &amp; Pricing</span>

                            <h2 className="pricing-grid-title">Choose Your Plan</h2>

                            <p className="pricing-grid-subtitle">Every plan includes business phone and team messaging. Add AI when you&#039;re ready. Pick the one that fits how your team works.</p>

                            <div className="pill-toggle pill-toggle--business-type">
                                <button className="pill-toggle-btn active" data-type="small-business">Small business</button>
                                <button className="pill-toggle-btn" data-type="enterprise">Enterprise</button>
                            </div>

                            <div className="pricing-grid-toggle-wrapper">
                                <div className="pill-toggle pill-toggle--billing">
                                    <span className="pill-toggle-btn toggle-monthly">Monthly</span>
                                    <span className="pill-toggle-btn toggle-annually active">Annually</span>
                                </div>
                                <span className="pill-toggle-badge">Save up to 50%</span>
                            </div>
                        </div>

                        <div className="pricing-grid-plans pricing-grid-plans--small-business">
                            <div className="pricing-grid-card reveal reveal-delay-1">
                                <div className="pricing-grid-card-header">
                                    <span className="plan-badge">Starter</span>

                                    <h3 className="plan-name">Core</h3>

                                    <p className="plan-tagline">Connect your team &amp; customers</p>

                                    <div className="plan-price">
                                        <span className="price-currency">$</span>
                                        <span className="price-amount" data-monthly="23" data-annually="15">15</span>
                                        <span className="price-period">/user/mo</span>
                                    </div>
                                    <div className="price-savings">
                                        <span className="original-price" data-monthly="" data-annually="$23">$23</span>
                                        <span className="savings-badge" data-monthly="" data-annually="Save 35%">Save 35%</span>
                                    </div>
                                </div>


                                <div className="pricing-grid-card-body">
                                    <p className="plan-description">Reliably run your business with unified voice, video, SMS, and digital channels with instant setup.</p>


                                    <ul className="plan-features">
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Inbound &amp; Outbound Voice</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Connect with customers and your team using award-winning, reliable voice conversations within the U.S. and CA. Get a new number or bring over your existing number for free.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Business SMS</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Send and receive SMS text messages from your business phone number using the desktop and mobile app.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Video Meetings</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Collaborate face-to-face with video meetings. Engage in sidebar chats and record for future reference.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Screen &amp; File Sharing</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Get on the same page by sharing your screen during a video call or exchanging key files.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Call Routing</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Ensure all customer inquiries are professionally handled and properly routed to the right team member.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Team Chat</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Mobile App</span>
                                        </li>
                                    </ul>

                                    <div className="plan-addon">
                                        <span className="plan-addon-icon"><img decoding="async" src="/media/ucaas-icon.png" alt="" className="plan-addon-ai-icon" /></span>
                                        <span className="plan-addon-text"><strong>Add-On:</strong> AI Receptionist</span>
                                        <span className="feature-tooltip-trigger" data-tooltip="A 24/7 AI receptionist, built to reliably answer every call, text, and chat, so you never miss another lead again.">
    											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>										</span>
                                    </div>
                                </div>

                                <div className="pricing-grid-card-footer">
                                    <a href="/sign-up-b?billing=annually" className="plan-cta plan-cta-secondary">
    			<span className="btn-text">Get Started</span>
    			<span className="btn-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="10" height="2" rx="1"></rect><path d="M9.5 3.5L14 8l-4.5 4.5V3.5z"></path></svg></span>
    		</a>
                                </div>
                            </div>
                            <div className="pricing-grid-card reveal reveal-delay-2 pricing-grid-card--featured">
                                <div className="pricing-grid-card-header">
                                    <span className="plan-badge">Most Popular</span>

                                    <h3 className="plan-name">Engage</h3>

                                    <p className="plan-tagline">Manage interactions at scale</p>

                                    <div className="plan-price">
                                        <span className="price-currency">$</span>
                                        <span className="price-amount" data-monthly="50" data-annually="25">25</span>
                                        <span className="price-period">/user/mo</span>
                                    </div>
                                    <div className="price-savings">
                                        <span className="original-price" data-monthly="" data-annually="$50">$50</span>
                                        <span className="savings-badge" data-monthly="" data-annually="Save 50%">Save 50%</span>
                                    </div>
                                </div>


                                <div className="pricing-grid-card-body">
                                    <p className="plan-description">Equip your teams with automation, advanced tools, and intelligent routing for personalized experiences at scale.

                                    </p>

                                    <p className="features-includes">Everything in Core, plus:</p>

                                    <ul className="plan-features">
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Customer-to-Team SMS</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Enable customers to reach your entire team via a shared SMS inbox, allowing multiple team members to access messages, respond promptly, and deliver faster resolutions.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Toll-Free Number &amp; Minutes</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Give your business a professional edge by offering a universal, non-local, toll-free number.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Advanced Reporting</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Move your business forward with insight gained from data found within your voice analytics.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Inbound Call Center</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Manage high-volume inbound calls and use touch tone prompts to route calls to best-fit agents.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Live Chat &amp; Chatbot</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Offer 24/7 support and efficiently manage responses to FAQs with web chatbot automation. Start with automated prompts to gather essential information, then seamlessly transition to a live-agent interaction.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                    </ul>

                                    <div className="plan-addon">
                                        <span className="plan-addon-icon"><img decoding="async" src="/media/ucaas-icon.png" alt="" className="plan-addon-ai-icon" /></span>
                                        <span className="plan-addon-text"><strong>Add-On:</strong> AI Receptionist</span>
                                        <span className="feature-tooltip-trigger" data-tooltip="A 24/7 AI receptionist, built to reliably answer every call, text, and chat, so you never miss another lead again.">
    											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>										</span>
                                    </div>
                                </div>

                                <div className="pricing-grid-card-footer">
                                    <a href="#cta-popup" className="plan-cta plan-cta-secondary">
    			<span className="btn-text">Get a Demo</span>
    			<span className="btn-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="10" height="2" rx="1"></rect><path d="M9.5 3.5L14 8l-4.5 4.5V3.5z"></path></svg></span>
    		</a>
                                </div>
                            </div>
                            <div className="pricing-grid-card reveal reveal-delay-3 pricing-grid-card--dark">
                                <div className="pricing-grid-card-header">
                                    <span className="plan-badge">NEW</span>

                                    <h3 className="plan-name">Scale</h3>

                                    <p className="plan-tagline">Get everything in one package</p>

                                    <div className="plan-price">
                                        <span className="price-currency">$</span>
                                        <span className="price-amount" data-monthly="75" data-annually="75">75</span>
                                        <span className="price-period">/user/mo</span>
                                    </div>
                                    <div className="price-savings">
                                        <span className="original-price" data-monthly="" data-annually=""></span>
                                        <span className="savings-badge" data-monthly="" data-annually=""></span>
                                    </div>
                                </div>


                                <div className="pricing-grid-card-body">
                                    <p className="plan-description">Win every conversation, measure every interaction, and use AI to optimize every customer journey.
                                    </p>

                                    <p className="features-includes">Full Customer Experience Platform:</p>

                                    <ul className="plan-features">
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Voice &amp; Web Chat</span>
                                            <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="Provide consistent support across voice and web chat channels. Use web chatbots to collect key information upfront and offer 24/7 self-service, with the option to transfer to a live agent when needed.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Blended Inbound &amp; Outbound</span>
                                            <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="Let agents handle both incoming and outgoing calls in a single interface—maximizing productivity and reducing idle time.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">AI Transcription &amp; Summary</span>
                                            <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="Automatically capture the content of voice conversations in real time and create post-call summaries.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Skills-Based Routing</span>
                                            <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="Improve first-call resolution by routing callers to best-fit agents equipped to handle interactions specific to area of expertise, language, or demographic.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Journey Orchestration</span>
                                            <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="Design and automate customer journeys across channels with a visual workflow builder. Create seamless experiences from first contact to resolution.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                    </ul>

                                    <div className="plan-addon">
                                        <span className="plan-addon-icon"><img decoding="async" src="/media/ucaas-icon.png" alt="" className="plan-addon-ai-icon" /></span>
                                        <span className="plan-addon-text"><strong>Add-On:</strong> AI Receptionist</span>
                                        <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="A 24/7 AI receptionist, built to reliably answer every call, text, and chat, so you never miss another lead again.">
    											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>										</span>
                                    </div>
                                </div>

                                <div className="pricing-grid-card-footer">
                                    <a href="#scale" className="plan-cta plan-cta-white">
    			<span className="btn-text">See if you qualify</span>
    			<span className="btn-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="10" height="2" rx="1"></rect><path d="M9.5 3.5L14 8l-4.5 4.5V3.5z"></path></svg></span>
    		</a>
                                </div>
                            </div>
                        </div>

                        <div className="pricing-grid-plans pricing-grid-plans--enterprise" style={{ display: "none" }}>
                            <div className="pricing-grid-card reveal reveal-delay-1">
                                <div className="pricing-grid-card-header">
                                    <span className="plan-badge">Starter</span>

                                    <h3 className="plan-name">Essential</h3>

                                    <p className="plan-tagline">Start your contact center here</p>

                                    <div className="plan-price">
                                        <span className="price-from">From</span>
                                        <span className="price-currency">$</span>
                                        <span className="price-amount">75</span>
                                        <span className="price-period">/agent/mo</span>
                                    </div>
                                </div>


                                <div className="pricing-grid-card-body">
                                    <p className="plan-description">Empower your team to deliver exceptional support across voice and web chat with built-in journey orchestration, smart automations, and intelligent routing.

                                    </p>

                                    <p className="features-includes">Core features:</p>

                                    <ul className="plan-features">
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Omnichannel Capabilities</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Maximize productivity by incorporating both inbound and outbound calls to agents' workflow across voice and digital channels.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Journey Orchestration</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Build a complete customer journey with drag-and-drop ease. Incorporate IVR, enhanced routing, voice bot-to-agent hand-off for a blended AI and human experience.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">AI Transcription &amp; Summary</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Increase productivity when AI takes call notes for you in real time and creates an automatic summary of the conversation.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Skills-Based Routing</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Improve first-call resolution by routing callers to best-fit agents equipped to handle interactions specific to area of expertise, language, or demographic.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Voice &amp; Web Chat</span>
                                        </li>
                                    </ul>

                                </div>

                                <div className="pricing-grid-card-footer">
                                    <a href="#cta-popup" className="plan-cta plan-cta-secondary">
    			<span className="btn-text">Get a Demo</span>
    			<span className="btn-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="10" height="2" rx="1"></rect><path d="M9.5 3.5L14 8l-4.5 4.5V3.5z"></path></svg></span>
    		</a>
                                </div>
                            </div>
                            <div className="pricing-grid-card reveal reveal-delay-2 pricing-grid-card--featured">
                                <div className="pricing-grid-card-header">
                                    <span className="plan-badge">Most Popular</span>

                                    <h3 className="plan-name">Professional</h3>

                                    <p className="plan-tagline">For teams ready for more</p>

                                    <div className="plan-price plan-price-contact">
                                        <span className="price-contact">Contact Sales</span>
                                    </div>
                                </div>


                                <div className="pricing-grid-card-body">
                                    <p className="plan-description">Built on everything in Essential with support for more channels, dynamic scripting, intelligent routing, and self-service powered by easy-to-build workflows.</p>

                                    <p className="features-includes">Everything in Essential, plus:</p>

                                    <ul className="plan-features">
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Advanced Self-Service</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Enable customers to resolve issues independently with intelligent self-service options including IVR, chatbots, and knowledge base integrations.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Real-Time Supervisor Support</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Improve agent performance and training opportunities by empowering supervisors to monitor both voice and digital interactions, providing instant feedback to agents.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Secure Payment (PCI-DSS)</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Built right in, an AI bot ensures PCI-compliant transactions where agents neither see nor hear credit card information.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Progressive &amp; Predictive Dialing</span>
                                            <span className="feature-tooltip-trigger" data-tooltip="Progressive and Predictive Dialing streamline outreach, with Quarterback Mode routing live calls to available agents for efficiency and personalization.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">More Channels Supported</span>
                                        </li>
                                    </ul>

                                </div>

                                <div className="pricing-grid-card-footer">
                                    <a href="#cta-popup" className="plan-cta plan-cta-secondary">
    			<span className="btn-text">Get a Demo</span>
    			<span className="btn-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="10" height="2" rx="1"></rect><path d="M9.5 3.5L14 8l-4.5 4.5V3.5z"></path></svg></span>
    		</a>
                                </div>
                            </div>
                            <div className="pricing-grid-card reveal reveal-delay-3 pricing-grid-card--dark">
                                <div className="pricing-grid-card-header">
                                    <span className="plan-badge">Enterprise</span>

                                    <h3 className="plan-name">Premium</h3>

                                    <p className="plan-tagline">Premium support without limits</p>

                                    <div className="plan-price plan-price-contact">
                                        <span className="price-contact">Contact Sales</span>
                                    </div>
                                </div>


                                <div className="pricing-grid-card-body">
                                    <p className="plan-description">Unlock unlimited channels, limitless intelligent routing, and secure in-conversation payments. Everything your team needs for fast, secure, and seamless experiences at scale.

                                    </p>

                                    <p className="features-includes">Everything in Professional, plus:</p>

                                    <ul className="plan-features">
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Workforce Management</span>
                                            <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="Ensure you're properly staffed by surfacing and analyzing historical data such as volume, wait time, and more.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Unlimited Skills-Based Routing</span>
                                            <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="Send callers to the best-fit agent based on skills, language, or expertise—helping resolve issues faster on the first try.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Advanced Analytics</span>
                                            <span className="feature-tooltip-trigger feature-tooltip-light" data-tooltip="Generate advanced insight on existing data by creating and visualizing customized data drill downs.">
    													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"></path></svg>												</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">Unlimited Channels</span>
                                        </li>
                                        <li>
                                            <span className="feature-icon">&#10003;</span>
                                            <span className="feature-text">In-Conversation Payments</span>
                                        </li>
                                    </ul>

                                </div>

                                <div className="pricing-grid-card-footer">
                                    <a href="#cta-popup" className="plan-cta plan-cta-white">
    			<span className="btn-text">Get a Demo</span>
    			<span className="btn-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="10" height="2" rx="1"></rect><path d="M9.5 3.5L14 8l-4.5 4.5V3.5z"></path></svg></span>
    		</a>
                                </div>
                            </div>
                        </div>



                        <div className="pricing-grid-footer">
                            <p className="pricing-grid-note">All plans include 24/7 customer support • No credit card required for demo • Cancel anytime</p>
                        </div>

                    </div>
                </section>
  );
}
