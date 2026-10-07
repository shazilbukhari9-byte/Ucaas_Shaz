'use client';
/* Generated from the www.ucaas.com capture — see tools/generate.mjs */
import { useRef } from 'react';
import useHeaderNav from '../../hooks/useHeaderNav';

export default function MainHeader() {
  const rootRef = useRef(null);
  useHeaderNav(rootRef);

  return (
    <header ref={rootRef} className="nb20-header is-style-ucaas-header-block-light" data-nb20-header="">
                    <div className="nb20-header__inner">
                        <div className="nb20-header__left">
                            <a className="nb20-logo" href="/" target="_self">
    									<span className="nb20-logo-lockup nb20-logo-image--dark">
    	<img decoding="async" src="/media/ucaas-icon.png" alt="UCaaS" className="logo-icon nb20-logo-icon" />
    	<svg className="logo-svg nb20-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.66 15.01">
    		<path className="logo-letter-svg" style={{ animationDelay: "0s" }} d="M0,14.72V4.49h2.56v1.34h.37c.17-.36.47-.7.93-1.02.45-.32,1.14-.48,2.06-.48.8,0,1.49.18,2.09.55s1.06.87,1.39,1.5c.33.64.5,1.38.5,2.24v6.1h-2.6v-5.9c0-.77-.19-1.35-.57-1.73s-.92-.58-1.62-.58c-.8,0-1.42.26-1.85.79-.44.53-.66,1.27-.66,2.22v5.19H0Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.05s" }} d="M16.12,15.01c-1.02,0-1.91-.22-2.69-.65-.78-.43-1.38-1.04-1.81-1.83s-.65-1.72-.65-2.79v-.25c0-1.07.21-2,.64-2.79.43-.79,1.02-1.4,1.79-1.83.77-.43,1.66-.65,2.68-.65s1.88.22,2.62.67c.74.45,1.32,1.07,1.73,1.86s.62,1.71.62,2.75v.89h-7.44c.03.7.29,1.27.78,1.71.5.44,1.1.66,1.81.66s1.26-.16,1.61-.47c.34-.32.6-.67.78-1.05l2.12,1.11c-.19.36-.47.75-.83,1.17s-.85.78-1.45,1.07c-.6.29-1.37.44-2.31.44ZM13.62,8.43h4.78c-.05-.59-.29-1.06-.71-1.42-.42-.36-.97-.54-1.64-.54s-1.26.18-1.67.54-.67.83-.76,1.42Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.1s" }} d="M20.55,14.72l3.71-5.15-3.67-5.07h3.01l2.33,3.4h.37l2.33-3.4h3.01l-3.67,5.07,3.71,5.15h-3.05l-2.33-3.44h-.37l-2.33,3.44h-3.05Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.15s" }} d="M39.47,6.63v-2.14h-2.8V1.32h-2.6v3.17h-1l-1.55,2.14h2.55v5.77c0,.71.21,1.27.63,1.68.42.42.97.63,1.64.63h2.89v-2.14h-1.98c-.39,0-.58-.21-.58-.62v-5.32h2.8Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.2s" }} d="M41.89,3.3c-.47,0-.86-.15-1.18-.45-.32-.3-.48-.7-.48-1.2s.16-.89.48-1.2c.32-.3.72-.45,1.18-.45s.88.15,1.2.45c.32.3.47.7.47,1.2s-.16.89-.47,1.2c-.32.3-.71.45-1.2.45Z"></path>
    		<rect className="logo-letter-svg" style={{ animationDelay: "0.2s" }} x="40.59" y="4.49" width="2.6" height="10.22"></rect>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.25s" }} d="M46.98,14.72l-3.26-10.22h2.76l2.37,8.33h.37l2.37-8.33h2.76l-3.26,10.22h-4.12Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.3s" }} d="M57.82,15.01c-.73,0-1.38-.13-1.96-.38s-1.03-.62-1.37-1.11c-.34-.49-.5-1.08-.5-1.78s.17-1.29.5-1.76c.34-.47.8-.83,1.4-1.07.6-.24,1.28-.36,2.05-.36h2.8v-.58c0-.48-.15-.88-.45-1.18-.3-.31-.78-.46-1.44-.46s-1.13.15-1.44.44c-.32.29-.52.68-.62,1.14l-2.39-.8c.17-.52.43-1,.79-1.43s.85-.78,1.46-1.05c.61-.27,1.36-.4,2.24-.4,1.35,0,2.41.34,3.2,1.01.78.67,1.17,1.65,1.17,2.93v3.81c0,.41.19.62.58.62h.82v2.14h-1.73c-.51,0-.93-.12-1.26-.37-.33-.25-.49-.58-.49-.99v-.02h-.39c-.06.17-.18.38-.37.65-.19.27-.5.5-.91.71s-.98.31-1.69.31ZM58.27,12.9c.73,0,1.32-.2,1.78-.61.46-.41.69-.95.69-1.62v-.21h-2.62c-.48,0-.86.1-1.13.31-.28.21-.41.5-.41.87s.14.67.43.91c.29.23.71.35,1.26.35Z"></path>
    	</svg>
    </span>					<span className="nb20-logo-lockup nb20-logo-image--light">
    	<img decoding="async" src="/media/ucaas-icon.png" alt="UCaaS" className="logo-icon nb20-logo-icon" />
    	<svg className="logo-svg nb20-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.66 15.01">
    		<path className="logo-letter-svg" style={{ animationDelay: "0s" }} d="M0,14.72V4.49h2.56v1.34h.37c.17-.36.47-.7.93-1.02.45-.32,1.14-.48,2.06-.48.8,0,1.49.18,2.09.55s1.06.87,1.39,1.5c.33.64.5,1.38.5,2.24v6.1h-2.6v-5.9c0-.77-.19-1.35-.57-1.73s-.92-.58-1.62-.58c-.8,0-1.42.26-1.85.79-.44.53-.66,1.27-.66,2.22v5.19H0Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.05s" }} d="M16.12,15.01c-1.02,0-1.91-.22-2.69-.65-.78-.43-1.38-1.04-1.81-1.83s-.65-1.72-.65-2.79v-.25c0-1.07.21-2,.64-2.79.43-.79,1.02-1.4,1.79-1.83.77-.43,1.66-.65,2.68-.65s1.88.22,2.62.67c.74.45,1.32,1.07,1.73,1.86s.62,1.71.62,2.75v.89h-7.44c.03.7.29,1.27.78,1.71.5.44,1.1.66,1.81.66s1.26-.16,1.61-.47c.34-.32.6-.67.78-1.05l2.12,1.11c-.19.36-.47.75-.83,1.17s-.85.78-1.45,1.07c-.6.29-1.37.44-2.31.44ZM13.62,8.43h4.78c-.05-.59-.29-1.06-.71-1.42-.42-.36-.97-.54-1.64-.54s-1.26.18-1.67.54-.67.83-.76,1.42Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.1s" }} d="M20.55,14.72l3.71-5.15-3.67-5.07h3.01l2.33,3.4h.37l2.33-3.4h3.01l-3.67,5.07,3.71,5.15h-3.05l-2.33-3.44h-.37l-2.33,3.44h-3.05Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.15s" }} d="M39.47,6.63v-2.14h-2.8V1.32h-2.6v3.17h-1l-1.55,2.14h2.55v5.77c0,.71.21,1.27.63,1.68.42.42.97.63,1.64.63h2.89v-2.14h-1.98c-.39,0-.58-.21-.58-.62v-5.32h2.8Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.2s" }} d="M41.89,3.3c-.47,0-.86-.15-1.18-.45-.32-.3-.48-.7-.48-1.2s.16-.89.48-1.2c.32-.3.72-.45,1.18-.45s.88.15,1.2.45c.32.3.47.7.47,1.2s-.16.89-.47,1.2c-.32.3-.71.45-1.2.45Z"></path>
    		<rect className="logo-letter-svg" style={{ animationDelay: "0.2s" }} x="40.59" y="4.49" width="2.6" height="10.22"></rect>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.25s" }} d="M46.98,14.72l-3.26-10.22h2.76l2.37,8.33h.37l2.37-8.33h2.76l-3.26,10.22h-4.12Z"></path>
    		<path className="logo-letter-svg" style={{ animationDelay: "0.3s" }} d="M57.82,15.01c-.73,0-1.38-.13-1.96-.38s-1.03-.62-1.37-1.11c-.34-.49-.5-1.08-.5-1.78s.17-1.29.5-1.76c.34-.47.8-.83,1.4-1.07.6-.24,1.28-.36,2.05-.36h2.8v-.58c0-.48-.15-.88-.45-1.18-.3-.31-.78-.46-1.44-.46s-1.13.15-1.44.44c-.32.29-.52.68-.62,1.14l-2.39-.8c.17-.52.43-1,.79-1.43s.85-.78,1.46-1.05c.61-.27,1.36-.4,2.24-.4,1.35,0,2.41.34,3.2,1.01.78.67,1.17,1.65,1.17,2.93v3.81c0,.41.19.62.58.62h.82v2.14h-1.73c-.51,0-.93-.12-1.26-.37-.33-.25-.49-.58-.49-.99v-.02h-.39c-.06.17-.18.38-.37.65-.19.27-.5.5-.91.71s-.98.31-1.69.31ZM58.27,12.9c.73,0,1.32-.2,1.78-.61.46-.41.69-.95.69-1.62v-.21h-2.62c-.48,0-.86.1-1.13.31-.28.21-.41.5-.41.87s.14.67.43.91c.29.23.71.35,1.26.35Z"></path>
    	</svg>
    </span>							</a>

                            <nav className="nb20-nav" aria-label="Primary navigation">
                                <ul className="nb20-nav__list">
                                    <li className="nb20-nav__item has-mega-menu" data-nb20-nav-item="">
                                        <a className="nb20-nav__link" href="#" target="" data-nb20-mega-toggle="" aria-expanded="false" aria-controls="nb20-mega-panel-0">
    									Products																			<span className="nb20-nav__caret" aria-hidden="true"></span>
    																	</a>

                                        <div className="nb20-mega-menu " id="nb20-mega-panel-0" data-nb20-mega-panel="" style={{ '--nb20-cols': "4" }}>
                                            <div className="nb20-mega-menu__content">

                                                <div className="nb20-mega-menu__columns">
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">Product</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/next-platform" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">NEXT Platform</span>
    																																											<span className="nb20-mega-menu__item-badge mega-menu-badge">NEW</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Unified communications and CX solution.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/ai-assistant" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">AI Assistant</span>
    																																											<span className="nb20-mega-menu__item-badge mega-menu-badge">NEW</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">AI employee for customer conversations.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/contact-center-solutions" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Contact Center</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Omnichannel customer experience platform.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/small-business-voip" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Business Phone</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Phone service for any size business.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">AI Capabilities</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/ai-employee" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">AI Employee</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Works tasks start to finish.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/solutions/ai-agent-assist" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Agent Assist</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Real-time agent guidance.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/ai-receptionist" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">AI Receptionist</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Handle incoming calls 24/7.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/ai-voice-agent" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">AI Voice Agent</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Automate customer calls with AI.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">Channels</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/business-voice" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Voice &amp; Texting</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Phone calls and texting.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/live-chat" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Live Chat</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Interact with website visitors.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/messaging-inbox" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Messenger</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Help customers on every channel.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/unified-inbox" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Email</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Unified customer inbox.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/review-management" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Social &amp; Reviews</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Manage all social channels.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/video" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Video Meetings</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Instant virtual meetings.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">Advanced</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/integrations" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Integrations</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Apps and integrations.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/customer-analytics" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Analytics &amp; Reporting</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Insights and dashboards.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/solutions/workforce-engagement" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Workforce Management</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Scale your contact center.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/products/customer-journey" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Journey Orchestration</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">End-to-end customer engagement.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="nb20-mega-menu__promo">
                                                    <img decoding="async" src="/media/ucaas-icon.png" alt="UCaaS" className="nb20-mega-menu__promo-icon" />
                                                    <div className="nb20-mega-menu__promo-content">
                                                        <a className="nb20-mega-menu__promo-title" href="/products/ai-assistant" target="">Meet the AI Assistant</a>
                                                        <p className="nb20-mega-menu__promo-description">Your AI employee that handles customer conversations</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                    <li className="nb20-nav__item has-mega-menu" data-nb20-nav-item="">
                                        <a className="nb20-nav__link" href="#" target="" data-nb20-mega-toggle="" aria-expanded="false" aria-controls="nb20-mega-panel-1">
    									Solutions																			<span className="nb20-nav__caret" aria-hidden="true"></span>
    																	</a>

                                        <div className="nb20-mega-menu " id="nb20-mega-panel-1" data-nb20-mega-panel="" style={{ '--nb20-cols': "4" }}>
                                            <div className="nb20-mega-menu__content">

                                                <div className="nb20-mega-menu__columns">
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">Industries</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/healthcare" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Healthcare</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Streamline patient operations.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/accounting" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Accounting</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Deliver secure, reliable service.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/real-estate" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Real Estate</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Close deals faster.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/retail" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Retail</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Increase sales and loyalty.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/automotive" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Automotive</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Drive service revenue.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/law-firms" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Legal</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Win more clients.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nb20-mega-menu__column nb20-mega-menu__column--no-title">

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/insurance" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Insurance</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Resolve claims faster.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/logistics" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Logistics</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Keep deliveries on track.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/restaurants" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Restaurants</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Fill more tables.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/nonprofit" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Nonprofit</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Inspire more giving.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/education" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Education</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Engage every student.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/government" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Government</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Serve your community.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nb20-mega-menu__column nb20-mega-menu__column--no-title">

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/fitness-wellness" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Fitness &amp; Wellness</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Build a stronger gym.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/home-services" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Home Services</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Handle more jobs.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/industry/hospitality" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Hospitality</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Provide great experiences.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">Solutions</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/solutions/smb-customer-management" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Small Business</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Solutions for growing businesses.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/solutions/enterprise" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Mid Market &amp; Enterprise</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Scale with advanced capabilities.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/company/partners" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Partners</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Join our partner network.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </li>
                                    <li className="nb20-nav__item has-mega-menu" data-nb20-nav-item="">
                                        <a className="nb20-nav__link" href="#" target="" data-nb20-mega-toggle="" aria-expanded="false" aria-controls="nb20-mega-panel-2">
    									Resources																			<span className="nb20-nav__caret" aria-hidden="true"></span>
    																	</a>

                                        <div className="nb20-mega-menu " id="nb20-mega-panel-2" data-nb20-mega-panel="" style={{ '--nb20-cols': "3" }}>
                                            <div className="nb20-mega-menu__content">

                                                <div className="nb20-mega-menu__columns">
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">Company</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/company/leadership" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Leadership</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Meet our executive team.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/company/board-of-directors" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Board of Directors</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Our board members.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/company/careers" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Careers</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Join our team.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/why-ucaas/network" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Trust &amp; Reliability</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Security and compliance.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/company/contact" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Contact Us</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">We&#039;re here to help.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">Helpful Assets</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/download" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Download UCaaS</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Get UCaaS on any device.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/resource-center" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Resource Center</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Your business toolkit.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/blog/" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Blog</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Practical advice. Real results.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/demo-center" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Demo Center</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">See UCaaS in action.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/why-ucaas/service-delivery" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Service Delivery</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Service that keeps you moving.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nb20-mega-menu__column">
                                                        <span className="nb20-mega-menu__column-title">Highlights &amp; Insights</span>

                                                        <ul className="nb20-mega-menu__item-list">
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/why-ucaas/case-studies" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Customer Stories</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">See how customers succeed.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/company/news" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">News</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Latest company updates.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/why-ucaas/ucaas-is-the-best" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Awards</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Recognition and accolades.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/amazing-service" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Amazing Service</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Our commitment to customers.</span>
    																																							</a>
                                                            </li>
                                                            <li className="nb20-mega-menu__item">
                                                                <a className="nb20-mega-menu__item-link" href="/company/events" target="">
    																				<span className="nb20-mega-menu__item-title-row">
    																					<span className="nb20-mega-menu__item-title mega-menu-title">Events</span>
    																																									</span>
    																																									<span className="nb20-mega-menu__item-description">Webinars and conferences.</span>
    																																							</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </li>
                                    <li className="nb20-nav__item " data-nb20-nav-item="">
                                        <a className="nb20-nav__link" href="/ucaas-pricing" target="">
    									Pricing																	</a>

                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="nb20-header__right">
                            <a className="nb20-header__sales" href="tel:+18007990600" target="">
    									<svg className="nb20-header__sales-icon phone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    						<path d="M21 8C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8H21ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path>
    					</svg>
    								<span className="nb20-header__sales-label">Sales</span>
    				<span className="nb20-header__sales-value">800-799-0600</span>
    			</a>

                            <div className="nb20-nav__item nb20-nav__item--utility nb20-nav__item--support has-mega-menu" data-nb20-nav-item="">
                                <a className="nb20-header__utility-link nb20-header__utility-link--dropdown" href="#" target="_self" data-nb20-mega-toggle="" aria-expanded="false" aria-controls="nb20-support-panel">
    						Support						<span className="nb20-nav__caret" aria-hidden="true"></span>
    					</a>
                                <div className="nb20-mega-menu nb20-mega-menu--utility support-dropdown" id="nb20-support-panel" data-nb20-mega-panel="">
                                    <div className="nb20-mega-menu__content">
                                        <div className="nb20-mega-menu__columns">
                                            <div className="nb20-mega-menu__column">
                                                <ul className="nb20-mega-menu__item-list">
                                                    <li className="nb20-mega-menu__item">
                                                        <a className="nb20-mega-menu__item-link" href="https://help.ucaas.com/" target="">
    													<span className="nb20-mega-menu__item-title-row">
    														<span className="nb20-mega-menu__item-title mega-menu-title">Help Center</span>
    																											</span>
    																											<span className="nb20-mega-menu__item-description">Docs, guides, and answers</span>
    																									</a>
                                                    </li>
                                                    <li className="nb20-mega-menu__item">
                                                        <a className="nb20-mega-menu__item-link" href="#open-support-chat" target="">
    													<span className="nb20-mega-menu__item-title-row">
    														<span className="nb20-mega-menu__item-title mega-menu-title">Chat with Support</span>
    																											</span>
    																											<span className="nb20-mega-menu__item-description">Talk to our team live.</span>
    																									</a>
                                                    </li>
                                                    <li className="nb20-mega-menu__item">
                                                        <a className="nb20-mega-menu__item-link" href="tel:+18002857995" target="">
    													<span className="nb20-mega-menu__item-title-row">
    														<span className="nb20-mega-menu__item-title mega-menu-title">Call Support</span>
    																											</span>
    																											<span className="nb20-mega-menu__item-description">800-285-7995</span>
    																									</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nb20-nav__item nb20-nav__item--utility nb20-nav__item--login has-mega-menu" data-nb20-nav-item="">
                                <a className="nb20-header__utility-link nb20-header__utility-link--button nb20-header__utility-link--dropdown" href="#" target="_self" data-nb20-mega-toggle="" aria-expanded="false" aria-controls="nb20-login-panel">
    						Log In						<span className="nb20-nav__caret" aria-hidden="true"></span>
    					</a>
                                <div className="nb20-mega-menu nb20-mega-menu--utility nb20-mega-menu--login login-dropdown" id="nb20-login-panel" data-nb20-mega-panel="">
                                    <div className="nb20-mega-menu__content">
                                        <div className="nb20-mega-menu__columns">
                                            <div className="nb20-mega-menu__column">
                                                <ul className="nb20-mega-menu__item-list">
                                                    <li className="nb20-mega-menu__item">
                                                        <a className="nb20-mega-menu__item-link" href="https://authenticate.ucaas.com/AccountValidation/login.action" target="">
    													<span className="nb20-mega-menu__item-title-row">
    														<span className="nb20-mega-menu__item-title mega-menu-title">UCaaSONE</span>
    																													<span className="nb20-mega-menu__item-badge mega-menu-badge">POPULAR</span>
    																											</span>
    																											<span className="nb20-mega-menu__item-description">Calls, messages, and meetings</span>
    																									</a>
                                                    </li>
                                                    <li className="nb20-mega-menu__item">
                                                        <a className="nb20-mega-menu__item-link" href="https://app.ucaas.io/" target="">
    													<span className="nb20-mega-menu__item-title-row">
    														<span className="nb20-mega-menu__item-title mega-menu-title">Platform &amp; AI</span>
    																													<span className="nb20-mega-menu__item-badge mega-menu-badge">NEW</span>
    																											</span>
    																											<span className="nb20-mega-menu__item-description">AI-powered customer conversations</span>
    																									</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="nb20-mega-menu__promo nb20-mega-menu__promo--link-only login-footer">
                                            <a className="nb20-mega-menu__promo-title login-footer-link" href="https://help.ucaas.com/article/how-to-login-to-ucaas" target="">
    										Other Logins										<span className="login-footer-arrow" aria-hidden="true">&rarr;</span>
    									</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="nb20-header__cta" href="#cta-popup" target="">Get a Demo</a>
                        </div>

                        <button className="nb20-nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" data-nb20-mobile-toggle="">
    				<span></span>
    				<span></span>
    				<span></span>
    			</button>
                    </div>
                    <div className="nb20-mobile-nav-panel" data-nb20-mobile-panel="">

                        <div className="nb20-mobile-nav-item">
                            <button className="nb20-mobile-nav-link" type="button" data-nb20-mobile-accordion="">
    				<span>Products</span>
    				<span className="nb20-mobile-nav-toggle" aria-hidden="true"></span>
    			</button>
                            <div className="nb20-mobile-nav-submenu">
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">Product</span>
                                    <a className="nb20-mobile-nav-sublink" href="/products/next-platform" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">NEXT Platform</span>
    																			<span className="nb20-mobile-nav-item-badge mega-menu-badge">NEW</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Unified communications and CX solution.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/ai-assistant" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">AI Assistant</span>
    																			<span className="nb20-mobile-nav-item-badge mega-menu-badge">NEW</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">AI employee for customer conversations.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/contact-center-solutions" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Contact Center</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Omnichannel customer experience platform.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/small-business-voip" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Business Phone</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Phone service for any size business.</span>
    															</a>
                                </div>
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">AI Capabilities</span>
                                    <a className="nb20-mobile-nav-sublink" href="/products/ai-employee" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">AI Employee</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Works tasks start to finish.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/solutions/ai-agent-assist" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Agent Assist</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Real-time agent guidance.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/ai-receptionist" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">AI Receptionist</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Handle incoming calls 24/7.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/ai-voice-agent" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">AI Voice Agent</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Automate customer calls with AI.</span>
    															</a>
                                </div>
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">Channels</span>
                                    <a className="nb20-mobile-nav-sublink" href="/products/business-voice" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Voice &amp; Texting</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Phone calls and texting.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/live-chat" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Live Chat</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Interact with website visitors.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/messaging-inbox" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Messenger</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Help customers on every channel.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/unified-inbox" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Email</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Unified customer inbox.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/review-management" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Social &amp; Reviews</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Manage all social channels.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/video" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Video Meetings</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Instant virtual meetings.</span>
    															</a>
                                </div>
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">Advanced</span>
                                    <a className="nb20-mobile-nav-sublink" href="/integrations" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Integrations</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Apps and integrations.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/customer-analytics" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Analytics &amp; Reporting</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Insights and dashboards.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/solutions/workforce-engagement" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Workforce Management</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Scale your contact center.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/products/customer-journey" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Journey Orchestration</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">End-to-end customer engagement.</span>
    															</a>
                                </div>
                            </div>
                        </div>
                        <div className="nb20-mobile-nav-item">
                            <button className="nb20-mobile-nav-link" type="button" data-nb20-mobile-accordion="">
    				<span>Solutions</span>
    				<span className="nb20-mobile-nav-toggle" aria-hidden="true"></span>
    			</button>
                            <div className="nb20-mobile-nav-submenu">
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">Industries</span>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/healthcare" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Healthcare</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Streamline patient operations.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/accounting" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Accounting</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Deliver secure, reliable service.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/real-estate" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Real Estate</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Close deals faster.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/retail" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Retail</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Increase sales and loyalty.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/automotive" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Automotive</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Drive service revenue.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/law-firms" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Legal</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Win more clients.</span>
    															</a>
                                </div>
                                <div className="nb20-mobile-nav-section nb20-mobile-nav-section--no-title">
                                    <a className="nb20-mobile-nav-sublink" href="/industry/insurance" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Insurance</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Resolve claims faster.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/logistics" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Logistics</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Keep deliveries on track.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/restaurants" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Restaurants</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Fill more tables.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/nonprofit" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Nonprofit</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Inspire more giving.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/education" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Education</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Engage every student.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/government" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Government</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Serve your community.</span>
    															</a>
                                </div>
                                <div className="nb20-mobile-nav-section nb20-mobile-nav-section--no-title">
                                    <a className="nb20-mobile-nav-sublink" href="/industry/fitness-wellness" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Fitness &amp; Wellness</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Build a stronger gym.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/home-services" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Home Services</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Handle more jobs.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/industry/hospitality" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Hospitality</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Provide great experiences.</span>
    															</a>
                                </div>
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">Solutions</span>
                                    <a className="nb20-mobile-nav-sublink" href="/solutions/smb-customer-management" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Small Business</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Solutions for growing businesses.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/solutions/enterprise" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Mid Market &amp; Enterprise</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Scale with advanced capabilities.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/company/partners" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Partners</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Join our partner network.</span>
    															</a>
                                </div>
                            </div>
                        </div>
                        <div className="nb20-mobile-nav-item">
                            <button className="nb20-mobile-nav-link" type="button" data-nb20-mobile-accordion="">
    				<span>Resources</span>
    				<span className="nb20-mobile-nav-toggle" aria-hidden="true"></span>
    			</button>
                            <div className="nb20-mobile-nav-submenu">
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">Company</span>
                                    <a className="nb20-mobile-nav-sublink" href="/company/leadership" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Leadership</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Meet our executive team.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/company/board-of-directors" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Board of Directors</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Our board members.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/company/careers" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Careers</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Join our team.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/why-ucaas/network" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Trust &amp; Reliability</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Security and compliance.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/company/contact" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Contact Us</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">We&#039;re here to help.</span>
    															</a>
                                </div>
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">Helpful Assets</span>
                                    <a className="nb20-mobile-nav-sublink" href="/download" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Download UCaaS</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Get UCaaS on any device.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/resource-center" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Resource Center</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Your business toolkit.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/blog/" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Blog</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Practical advice. Real results.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/demo-center" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Demo Center</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">See UCaaS in action.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/why-ucaas/service-delivery" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Service Delivery</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Service that keeps you moving.</span>
    															</a>
                                </div>
                                <div className="nb20-mobile-nav-section">
                                    <span className="nb20-mobile-nav-section-label">Highlights &amp; Insights</span>
                                    <a className="nb20-mobile-nav-sublink" href="/why-ucaas/case-studies" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Customer Stories</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">See how customers succeed.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/company/news" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">News</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Latest company updates.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/why-ucaas/ucaas-is-the-best" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Awards</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Recognition and accolades.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/amazing-service" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Amazing Service</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Our commitment to customers.</span>
    															</a>
                                    <a className="nb20-mobile-nav-sublink" href="/company/events" target="">
    								<span className="nb20-mobile-nav-sublink-title-row">
    									<span className="nb20-mobile-nav-sublink-title mega-menu-title">Events</span>
    																	</span>
    																	<span className="nb20-mobile-nav-sublink-desc">Webinars and conferences.</span>
    															</a>
                                </div>
                            </div>
                        </div>
                        <div className="nb20-mobile-nav-item">
                            <a className="nb20-mobile-nav-link" href="/ucaas-pricing" target="">
    				Pricing			</a>
                        </div>

                        <div className="nb20-mobile-nav-item">
                            <button className="nb20-mobile-nav-link" type="button" data-nb20-mobile-accordion="">
    			<span>Support</span>
    			<span className="nb20-mobile-nav-toggle" aria-hidden="true"></span>
    		</button>
                            <div className="nb20-mobile-nav-submenu">
                                <div className="nb20-mobile-nav-section">
                                    <a className="nb20-mobile-nav-sublink" href="https://help.ucaas.com/" target="">
    						<span className="nb20-mobile-nav-sublink-title-row">
    							<span className="nb20-mobile-nav-sublink-title mega-menu-title">Help Center</span>
    													</span>
    													<span className="nb20-mobile-nav-sublink-desc">Docs, guides, and answers</span>
    											</a>
                                    <a className="nb20-mobile-nav-sublink" href="#open-support-chat" target="">
    						<span className="nb20-mobile-nav-sublink-title-row">
    							<span className="nb20-mobile-nav-sublink-title mega-menu-title">Chat with Support</span>
    													</span>
    													<span className="nb20-mobile-nav-sublink-desc">Talk to our team live.</span>
    											</a>
                                    <a className="nb20-mobile-nav-sublink" href="tel:+18002857995" target="">
    						<span className="nb20-mobile-nav-sublink-title-row">
    							<span className="nb20-mobile-nav-sublink-title mega-menu-title">Call Support</span>
    													</span>
    													<span className="nb20-mobile-nav-sublink-desc">800-285-7995</span>
    											</a>
                                </div>
                            </div>
                        </div>

                        <div className="nb20-mobile-nav-utility">
                            <a className="nb20-mobile-nav-phone" href="tel:+18007990600" target="">
    					<svg className="nb20-header__sales-icon phone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    				<path d="M21 8C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8H21ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path>
    			</svg>
    				<span><span className="nb20-mobile-nav-phone-label">Sales</span> 800-799-0600</span>
    	</a>
                            <a className="nb20-mobile-nav-phone" href="tel:+18002857995" target="_blank">
    		<svg className="nb20-header__sales-icon phone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    			<path d="M21 8C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8H21ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path>
    		</svg>
    		<span><span className="nb20-mobile-nav-phone-label">Support </span>800-285-7995</span>
    	</a>

                            <div className="nb20-mobile-nav-cta-dropdown" data-nb20-mobile-cta-dropdown="">
                                <button type="button" className="nb20-mobile-nav-cta nb20-mobile-nav-cta--outline nb20-mobile-nav-cta--dropdown" data-nb20-mobile-cta-dropdown-toggle="">
    				<span>Log In</span>
    				<span className="nb20-mobile-nav-cta-caret" aria-hidden="true"></span>
    			</button>
                                <div className="nb20-mobile-nav-cta-dropdown-menu">
                                    <a className="nb20-mobile-nav-sublink" href="https://authenticate.ucaas.com/AccountValidation/login.action" target="">
    						<span className="nb20-mobile-nav-sublink-title-row">
    							<span className="nb20-mobile-nav-sublink-title mega-menu-title">UCaaSONE</span>
    															<span className="nb20-mobile-nav-item-badge mega-menu-badge">POPULAR</span>
    													</span>
    													<span className="nb20-mobile-nav-sublink-desc">Calls, messages, and meetings</span>
    											</a>
                                    <a className="nb20-mobile-nav-sublink" href="https://app.ucaas.io/" target="">
    						<span className="nb20-mobile-nav-sublink-title-row">
    							<span className="nb20-mobile-nav-sublink-title mega-menu-title">Platform &amp; AI</span>
    															<span className="nb20-mobile-nav-item-badge mega-menu-badge">NEW</span>
    													</span>
    													<span className="nb20-mobile-nav-sublink-desc">AI-powered customer conversations</span>
    											</a>

                                    <a className="nb20-mobile-nav-sublink" href="https://help.ucaas.com/article/how-to-login-to-ucaas" target="">
    						<span className="nb20-mobile-nav-sublink-title">Other Logins</span>
    					</a>
                                </div>
                            </div>

                            <a className="nb20-mobile-nav-cta" href="#cta-popup" target="">
    			Get a Demo		</a>
                        </div>
                    </div>
                    <div className="nb20-mobile-nav-overlay" data-nb20-mobile-overlay=""></div>
                </header>
  );
}
