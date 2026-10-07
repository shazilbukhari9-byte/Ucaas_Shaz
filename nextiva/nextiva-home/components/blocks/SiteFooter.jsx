'use client';
/* Generated from the www.ucaas.com capture — see tools/generate.mjs */
import { useRef } from 'react';
import useFooterBrand from '../../hooks/useFooterBrand';

export default function SiteFooter() {
  const rootRef = useRef(null);
  useFooterBrand(rootRef);

  return (
    <section ref={rootRef} className="footer-section wp-block-template-part">

                <div id="v2-get-started-block_80afa97a1924f2979314624dfbc976bb" className="v2-get-started-block design-v2" data-popup-key="cta-popup">
                    <div className="demo-modal" aria-hidden="true" role="dialog" aria-labelledby="v2-get-started-block_80afa97a1924f2979314624dfbc976bb-headline" data-demo-modal="" data-popup-key="cta-popup">
                        <div className="demo-modal-inner">
                            <button className="demo-modal-close" aria-label="Close demo form" data-demo-modal-close="">
    				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.586l4.95-4.95 1.414 1.414L13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12 5.636 7.05l1.414-1.414L12 10.586z" /></svg>
    			</button>

                            <div className="demo-modal-trust" style={{ backgroundImage: "url(/media/desert-mountains-silhouette-dusk-navy-amber-aa915342.jpeg)" }}>
                                <div className="demo-modal-trust-content">
                                    <div className="demo-modal-badges">
                                        <div className="demo-modal-badge">
                                            <span className="demo-modal-badge-stars">★★★★★</span>
                                            <img width="155" height="38" src="/media/trustpilot-39ceb2b2.png" className="attachment-full size-full" alt="" decoding="async" loading="lazy" srcSet="/media/trustpilot-a1ab3c78.png 155w, /media/trustpilot-52a4f1ad.png 150w" sizes="auto, (max-width: 155px) 100vw, 155px" /> <span className="demo-modal-badge-text">4.6/5 on Trustpilot &#8211; 8,484 reviews</span>
                                        </div>
                                    </div>

                                    <div className="demo-modal-stats">
                                        <div className="demo-modal-stat">
                                            <span className="demo-modal-stat-number">100,000+</span>
                                            <span className="demo-modal-stat-label">Businesses trust UCaaS</span>
                                        </div>
                                        <div className="demo-modal-stat">
                                            <span className="demo-modal-stat-number">17 Years</span>
                                            <span className="demo-modal-stat-label">Award-winning service</span>
                                        </div>
                                    </div>

                                    <div className="demo-modal-quote">
                                        <p className="demo-modal-quote-text">&ldquo;An incredible 98% improvement in customer response time and an 11% increase in positive reviews.&rdquo;</p>
                                        <div className="demo-modal-quote-footer">
                                            <span className="demo-modal-quote-stars">★★★★★</span>
                                            <span className="demo-modal-quote-name">Hyundai</span>
                                            <span className="demo-modal-quote-role">968 Dealerships, Global Automotive</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="demo-modal-form-panel">
                                <div className="demo-modal-form-content">
                                    <h3 className="demo-modal-form-title" id="v2-get-started-block_80afa97a1924f2979314624dfbc976bb-headline">See UCaaS in action.</h3>

                                    <div id="v2-get-started-form-v2-get-started-block_80afa97a1924f2979314624dfbc976bb" className="ucaas-hubspot-v2"></div>

                                    <div className="demo-modal-trust-line">
                                        <span>
    							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
    							Talk to a product expert:							<a href="tel:8007990600" className="demo-modal-phone-link">800-799-0600</a>
    						</span>
                                    </div>
                                    <p className="demo-modal-privacy">
                                        UCaaS uses the information you provide to contact you about relevant products and services. You may unsubscribe at any time. <a href="/privacy-policy.html" target="_blank" rel="noopener">Privacy Policy.</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wp-block-group has-contrast-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-eaa70217 wp-block-group-is-layout-constrained ucaas-footer-shell">

                    <div className="ucaas-footer-utility">
                        <footer className="ucaas-footer  ucaas-block is-style-ucaas-footer-light-v2">
                            <div className="ucaas-footer__wrapper contained-container">
                                <div className="ucaas-footer-logo-section">
                                    <div className="ucaas-footer-logo">
                                        <a href="/">
        														<img id="ucaas-logo-img" width="172" height="88" src="/media/ucaas-logo.webp" alt="UCaaS Logo" loading="lazy" decoding="async" />
        												</a>
                                        <div className="ucaas-footer-logo__sub-heading">
                                            Unified Customer Experience Management Platform </div>
                                    </div>
                                    {/* Subscribe block sits under the lockup, mirroring the
                                        reference layout. It is a real GET form pointed at the
                                        signup page rather than a decorative field, so the
                                        address the visitor types actually carries through. */}
                                    <form className="ucaas-subscribe" action="/get-started" method="get">
                                        <div className="ucaas-subscribe__row">
                                            <input
                                                className="ucaas-subscribe__input"
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="Enter your email address"
                                                aria-label="Email address"
                                            />
                                            <button className="ucaas-subscribe__send" type="submit" aria-label="Subscribe">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <path d="M22 2 11 13"></path>
                                                    <path d="M22 2 15 22l-4-9-9-4Z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <label className="ucaas-subscribe__consent">
                                            <input type="checkbox" name="consent" />
                                            <span>I consent to receive newsletters and updates.</span>
                                        </label>
                                    </form>
                                </div>
                                <div className="ucaas-footer-links__wrapper">
                                    <div className="ucaas-footer-links">
                                        <div className="ucaas-footer-links__column">
                                            <span className="ucaas-footer-links__heading">
        								Conversational Platform							</span>
                                            <ul className="ucaas-footer-links__list">
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/products/customer-communications" target="_self">
        												Customer communication											</a>
                                                </li>
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/products/contact-center-solutions" target="_self">
        												AI-powered contact center											</a>
                                                </li>
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/cloud-phone/phone-texting" target="_self">
        												Business voice											</a>
                                                </li>

                                                <li className="ucaas-footer-links__item">
                                                    <a href="/products/ai-receptionist" target="_self">
        												AI receptionist											</a>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <div className="ucaas-footer-links__column">
                                            <span className="ucaas-footer-links__heading">
        								Helpful Resources							</span>
                                            <ul className="ucaas-footer-links__list">
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/resource-center" target="_self">
        												Resource center											</a>
                                                </li>
                                                <li className="ucaas-footer-links__item">
                                                    <a href="https://help.ucaas.com/" target="_self">
        												Support center											</a>
                                                </li>
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/products/voip-hardware" target="_self">
        												Phones &amp; headsets											</a>
                                                </li>
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/blog/what-is-contact-center.html" target="_self">
        												Contact centers											</a>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="ucaas-footer-links__column">
                                            <span className="ucaas-footer-links__heading">
        								Platform Features							</span>
                                            <ul className="ucaas-footer-links__list">
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/cloud-phone/phone-texting" target="_self">
        												Cloud phone system											</a>
                                                </li>
                                                
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/products/messaging-inbox" target="_self">
        												Text messaging											</a>
                                                </li>
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/products/cloud-call-center" target="_self">
        												Call center											</a>
                                                </li>
                                                <li className="ucaas-footer-links__item">
                                                    <a href="/products/cloud-pbx" target="_self">
        												Cloud PBX											</a>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>

                        {/* Oversized wordmark, cropped by the footer's own overflow
                            exactly as the reference crops its logo image. */}
                        <div className="ucaas-footer-wordmark" aria-hidden="true">UCAAS</div>

                        {/* Centre row: rule, then copyright and legal on the left,
                            social on the right — the reference's .footer-center. */}
                        <div className="ucaas-footer-centre">
                            <div className="ucaas-footer-centre__left">
                                <span className="footer-copyright">© <span id="copyrightYear" data-copyright-year="">2026</span> UCaaS Private Limited. All rights reserved.</span>
                                <div className="footer-legal-links">
                                    <a href="/privacy-policy.html" target="_blank">Privacy Policy</a>
                                    <a href="/legal.html" target="_blank">Terms &amp; Conditions</a>
                                </div>
                            </div>

                            {/* Each mark is doubled inside a clipped reel: on hover the
                                pair slides up so the first copy leaves through the top
                                and the second arrives from below. The images are
                                decorative duplicates, so the accessible name lives on
                                the anchor and both imgs carry an empty alt. */}
                            <div className="ucaas-footer-socialicons">
                                <a href="https://www.facebook.com/UCAAS/" aria-label="Facebook">
                                    <span className="ucaas-social-reel" aria-hidden="true">
                                        <img width="54" height="54" src="/media/fb-footer-7a632752.webp" alt="" decoding="async" />
                                        <img width="54" height="54" src="/media/fb-footer-7a632752.webp" alt="" decoding="async" />
                                    </span>
                                </a>
                                <a href="https://x.com/ucaas?lang=en" aria-label="Twitter (X)">
                                    <span className="ucaas-social-reel" aria-hidden="true">
                                        <img width="54" height="54" src="/media/x-footer-8fdc3c5d.webp" alt="" decoding="async" />
                                        <img width="54" height="54" src="/media/x-footer-8fdc3c5d.webp" alt="" decoding="async" />
                                    </span>
                                </a>
                                <a href="https://www.linkedin.com/company/ucaas" aria-label="LinkedIn">
                                    <span className="ucaas-social-reel" aria-hidden="true">
                                        <img width="54" height="54" src="/media/lin-footer-d0e184e9.webp" alt="" decoding="async" />
                                        <img width="54" height="54" src="/media/lin-footer-d0e184e9.webp" alt="" decoding="async" />
                                    </span>
                                </a>
                                <a href="https://www.youtube.com/ucaas" aria-label="YouTube">
                                    <span className="ucaas-social-reel" aria-hidden="true">
                                        <img width="54" height="54" src="/media/yt-footer-d51cc457.webp" alt="" decoding="async" />
                                        <img width="54" height="54" src="/media/yt-footer-d51cc457.webp" alt="" decoding="async" />
                                    </span>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
  );
}
