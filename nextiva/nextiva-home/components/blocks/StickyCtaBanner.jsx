'use client';
/* Generated from the www.ucaas.com capture — see tools/generate.mjs */
import { useRef } from 'react';
import useStickyCta from '../../hooks/useStickyCta';

export default function StickyCtaBanner() {
  const rootRef = useRef(null);
  useStickyCta(rootRef);

  return (
    <div ref={rootRef} className=" ucaas-sticky-cta-banner-block">
                    <div className="sticky-cta-banner" id="sticky-cta-block_9387f3a14fdea2206ffd52e6fcf68231" data-show-after="300" data-storage-key="ucaas_sticky_cta_banner_global">
                        <div className="sticky-cta-content">
                            <i className="ri-sparkling-2-fill sticky-cta-icon" aria-hidden="true"></i>
                            <span className="sticky-cta-text">
    								<span className="sticky-cta-text-full">Get <strong>unlimited calling</strong> and <strong>AI Agent</strong> plans from $99/mo</span>
                            <span className="sticky-cta-text-short">Get AI plans from <strong>$99/mo</strong></span>
                            </span>
                        </div>

                        <div className="sticky-cta-actions sticky-cta-actions-desktop">
                            <a href="#cta-popup?offer=ai_tools_99" className="sticky-cta-btn sticky-cta-secondary">Learn More</a>
                            <a href="/sign-up" className="sticky-cta-btn sticky-cta-primary">Buy Now</a>
                        </div>

                        <div className="sticky-cta-actions sticky-cta-actions-mobile">
                            <a href="/sign-up" className="sticky-cta-btn sticky-cta-primary">Buy Now</a>
                        </div>

                        <button className="sticky-cta-close" data-sticky-cta-close="" aria-label="Close">
    								<svg className="sticky-cta-close-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    									<path d="M6 6L18 18M18 6L6 18"></path>
    								</svg>
    							</button>
                    </div>
                </div>
  );
}
