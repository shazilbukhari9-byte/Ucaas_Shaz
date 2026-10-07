'use client';
/* Generated from the www.ucaas.com capture — see tools/generate.mjs */
import { useRef } from 'react';
import useHeroShowcase from '../../hooks/useHeroShowcase';
import useRotatingHeadline from '../../hooks/useRotatingHeadline';
import HeroDashboard from '../hero/HeroDashboard';
import CallPanel from '../hero/CallPanel';

// Rotating headline — see HERO-rotating-headline-GUIDE.md. Placeholder copy
// and G2 rating, used as-is for now; swap in real figures when available.
const HEADLINE_SETS = [
  { pre: 'Agentic AI For', words: ['Sales Teams.', 'Support Teams.', 'Global Teams.'], hold: 1700 },
  { pre: 'Every Business Call', words: ['Answered.'], hold: 3000 },
];

export default function HeroSection() {
  const rootRef = useRef(null);
  useHeroShowcase(rootRef);
  const { pre, word, words, key, setKey } = useRotatingHeadline(HEADLINE_SETS);
  const contentRef = useRef(null);
  const descRef = useRef(null);

  return (
    <section ref={rootRef} id="hero" className="section-hero section-hero--stacked section-hero--aurora v2-section-hero-wrapper">

                    {/* Animated pastel gradient: two blob layers drifting and cross-fading. */}
                    <div className="hero-aurora"></div>
                    {/* Clouds along the base — our own generated pastel sky. */}
                    <div className="hero-clouds" style={{ backgroundImage: "url(/media/pastel-clouds-hero.webp)" }}></div>
                    <div className="hero-particles hero-particles--snow" id="heroFloatingParticles"></div>


                    <div className="hero-container">
                        <div className="hero-content hero-content--wide" ref={contentRef}>

                            <div className="hero-eyebrow hero-eyebrow--pill">
                                <i className="ri-sparkling-2-fill"></i> AI on every line
                            </div>

                            <h1 className="hero-title hero-title--metric hero-title--rotating">
                                {/* Keyed by sentence, not word: the whole line fades in when
                                    the sentence switches, instead of snapping. */}
                                <span className="hero-title-line" key={setKey}>
                                <span className="hero-title-pre">{pre}</span>{' '}
                                {/* The slot is sized by hidden copies of every phrase in the
                                    set, so its width never changes and the prefix stays put
                                    while words swap inside it. */}
                                <span className="hero-rotor-slot">
                                    {words.map((w) => (
                                        <span className="hero-rotor-sizer" aria-hidden="true" key={w}>{w}</span>
                                    ))}
                                    <span className="hero-rotor" key={key}>{word}</span>
                                </span>
                                </span>
                            </h1>

                            <div className="hero-description hero-description--compact" ref={descRef}>
                                <p>An AI receptionist that answers, qualifies and books every call on its own — with cloud calling, SMS and video on one number. Live in minutes.</p>
                            </div>

                            <div className="hero-ctas">
                                <a href="#cta-popup" className="btn btn-primary">
    						<span className="btn-text">Start free trial</span>
    						<span className="btn-arrow">
    							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    								<rect x="2" y="7" width="10" height="2" rx="1" />
    								<path d="M9.5 3.5L14 8l-4.5 4.5V3.5z" />
    							</svg>
    						</span>
    					</a>

                                <a href="#talk-to-sales" className="btn btn-secondary btn-ghost">
    						<span className="btn-text">Talk to sales</span>
    					</a>
                            </div>

                        </div>


                        <div className="hero-showcase">
                                <HeroDashboard />

                        
                            <div className="ui-showcase">
                                <CallPanel />
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
                                        <button className="stats-time-filter" id="statsTimeToggle" data-period="today" type="button">
    					<span className="stats-time-label">Today</span>
    					<i className="ri-arrow-down-s-line"></i>
    				</button>
                                    </div>
                                    <div className="stats-grid">
                                        <div className="stat-item">
                                            <div className="stat-value" id="statCalls" data-today="68" data-monthly="1735">0</div>
                                            <div className="stat-label">Calls Answered</div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-value" id="statAppointments" data-today="14" data-monthly="228">0</div>
                                            <div className="stat-label">Visits Booked</div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-value" id="statQuestions" data-today="214" data-monthly="5390">0</div>
                                            <div className="stat-label">Queries Closed</div>
                                        </div>
                                        <div className="stat-item stat-item-trend">
                                            <div className="stat-value stat-trend-up">
                                                <i className="ri-arrow-up-line"></i>
                                                <span id="statSentiment" data-today="97" data-monthly="95">0</span>%
                                            </div>
                                            <div className="stat-label">Resolved First Call</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
  );
}
