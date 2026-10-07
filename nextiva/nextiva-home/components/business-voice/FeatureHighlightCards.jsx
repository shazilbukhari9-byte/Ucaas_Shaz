'use client';
/* Generated from the Business Voice capture — see tools/generate-business-voice.mjs */
import { useRef } from 'react';
import useHighlightCards from '../../hooks/business-voice/useHighlightCards';

export default function FeatureHighlightCards() {
  const rootRef = useRef(null);
  useHighlightCards(rootRef);

  return (
    <section ref={rootRef} id="v2-feature-highlight-cards-block_1f37d139b54e748a0ee5ddbc1a8356e0" className="section-feature-highlight-cards design-v2">
	
    	<div className="fhc-container">
    									<div className="feature-card-image reveal revealed" style={{ backgroundImage: "url(\"https://www.nextiva.com/cdn-cgi/image/width=1024,height=1024,format=auto/wp-content/uploads/2026/02/portrait-woman-eyes-closed-red-blue.png\")", willChange: "auto" }}>
    								<div className="radiate-circles">
    					<div className="radiate-circle"></div>
    					<div className="radiate-circle"></div>
    					<div className="radiate-circle"></div>
    				</div>
				
    					<div className="feature-card-overlay">
    												<span className="feature-card-label">AI Workforce</span>
						
    												<h3 className="feature-card-title">XBert: Your AI workforce</h3>
						
    												<p className="feature-card-desc">AI that resolves routine interactions so your team can focus on revenue.

    </p>
						
    											</div>
    				</div>
    							<div className="feature-card-image reveal reveal-delay-1 revealed" style={{ backgroundImage: "url(\"https://www.nextiva.com/cdn-cgi/image/width=1024,height=1024,format=auto/wp-content/uploads/2026/02/illustration-mountain-peak-glow-navy.png\")", willChange: "auto" }}>
				
    					<div className="feature-card-overlay">
    												<span className="feature-card-label">Command Center</span>
						
    												<h3 className="feature-card-title">NEXT: Your command center</h3>
						
    												<p className="feature-card-desc">The command center for the agentic era. Manage your teams and your AIs in one place.

    </p>
						
    											</div>
    				</div>
    						</div>
    </section>
  );
}
