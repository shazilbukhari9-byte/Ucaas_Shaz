/* Generated from the www.ucaas.com capture — see tools/generate.mjs */

const TREND_ICON = 'M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z';
const BARS_ICON = 'M2 13H8V21H2V13ZM9 3H15V21H9V3ZM16 8H22V21H16V8Z';

const STORIES = [
  {
    logo: { src: '/media/hyundai-7c61c16f.png', width: 213, height: 56 },
    icon: TREND_ICON,
    metric: '98% Faster Response',
    quote: 'An incredible 98% improvement in customer response time and an 11% increase in positive reviews.',
    name: 'Hyundai',
    role: '968 Dealerships',
    company: 'Global Automotive',
  },
  {
    logo: { src: '/media/dhl-logo-8e0e4024.png', width: 144, height: 20 },
    icon: TREND_ICON,
    metric: '10K+ Interactions / Quarter',
    quote: 'With all social channels unified into one inbox, we reduced response times to under 2 hours across LinkedIn, Twitter, Facebook, and Instagram.',
    name: 'DHL',
    role: 'Global Logistics',
    company: '220+ Countries & Territories',
  },
  {
    logo: {
      src: '/media/NbC_Bundt_Pan_Logo-315x315-04d4100-80589334.png', width: 300, height: 300,
      srcSet: '/media/NbC_Bundt_Pan_Logo-315x315-04d4100-4166daa0.png 315w, /media/NbC_Bundt_Pan_Logo-315x315-04d4100-7df2f38a.png 150w, /media/NbC_Bundt_Pan_Logo-315x315-04d4100-80589334.png 300w',
    },
    icon: BARS_ICON,
    metric: '270+ Franchise Locations',
    quote: 'Our bakery owners are busy and don’t have time for complicated systems. The interface and the UCaaS Support team were a big selling point.',
    name: 'Vinny Torregrossa',
    role: 'IT Manager',
    company: 'Nothing Bundt Cakes',
  },
  {
    logo: { src: '/media/franklin-street-icon-1-4f000730.png', width: 40, height: 40 },
    icon: BARS_ICON,
    metric: '+30% Annual Revenue Growth',
    quote: 'Since adopting UCaaS, we’ve achieved 30% annual revenue growth. We now provide cloud communications to 325 employees across six locations with 99.999% uptime.',
    name: 'Franklin Street',
    role: '325 Employees, 6 Locations',
    company: 'Commercial Real Estate',
  },
  {
    logo: { src: '/media/tabarka-icon-1-575189f3.png', width: 40, height: 40 },
    icon: TREND_ICON,
    metric: '+60% Cost Savings',
    quote: 'UCaaS’s VoIP phone system has helped us realize an estimated 60% cost savings over our previous system, and our customers never receive a busy signal.',
    name: 'Tabarka Studio',
    role: 'Tile & Stone Manufacturer',
    company: 'Scottsdale, AZ',
  },
  {
    logo: {
      src: '/media/ShelbyLogoCircle2-2f67f1b3.png', width: 300, height: 300,
      srcSet: '/media/ShelbyLogoCircle2-189d6aa5.png 1204w, /media/ShelbyLogoCircle2-3e0d8760.png 150w, /media/ShelbyLogoCircle2-2f67f1b3.png 300w, /media/ShelbyLogoCircle2-fd0b2422.png 768w, /media/ShelbyLogoCircle2-4b4e1967.png 1024w, /media/ShelbyLogoCircle2-2a952a67.png 480w',
    },
    icon: TREND_ICON,
    metric: '+50% Cost Reduction',
    quote: 'We were due for a complete overhaul. Moving to UCaaS gave us an all-in-one cloud-based solution that was easier to manage, more reliable, and cut our communications costs by more than 50%.',
    name: 'Rich Sparkman',
    role: 'Director of Technology',
    company: 'Shelby American',
  },
];

function StoryCard({ story, hidden }) {
  const { logo } = story;
  return (
    <div className="social-proof-grid-card" aria-hidden={hidden || undefined}>
      <div className="social-proof-grid-card-header">
        <div className="social-proof-grid-card-logo">
          <img
            loading="lazy"
            decoding="async"
            width={logo.width}
            height={logo.height}
            src={logo.src}
            srcSet={logo.srcSet}
            sizes={logo.srcSet ? 'auto, (max-width: 300px) 100vw, 300px' : undefined}
            alt=""
          />
        </div>
        <span className="social-proof-grid-card-metric">
          <svg className="metric-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={story.icon}></path>
          </svg>
          {story.metric}
        </span>
      </div>

      <p className="social-proof-grid-card-text">&ldquo;{story.quote}&rdquo;</p>

      <div className="social-proof-grid-card-footer">
        <div className="social-proof-grid-card-stars">★★★★★</div>
        <div className="social-proof-grid-card-author">
          <span className="social-proof-grid-card-name">{story.name}</span>
          <span className="social-proof-grid-card-role">{story.role}</span>
          <span className="social-proof-grid-card-company">{story.company}</span>
        </div>
      </div>
    </div>
  );
}

export default function SocialProofGrid() {
  return (
    <section id="v2-social-proof-grid-block_49a8249d729bd7823e8c98258f3fe0dc" className="section-social-proof-grid design-v2 section-social-proof-grid--show-all-cards">
                    <div className="social-proof-grid-container">


                        <div className="social-proof-grid-header-row reveal">
                            <div className="social-proof-grid-header">
                                <span className="social-proof-grid-eyebrow">Customer Stories</span>

                                <h2 className="social-proof-grid-title">Trusted by 100,000+<br />Businesses Worldwide</h2>
                            </div>

                            <div className="social-proof-grid-trust-badges">
                                <div className="social-proof-grid-badge-item">
                                    <img loading="lazy" decoding="async" width="300" height="74" src="/media/TP-Logo-Tricolor-Black-RGB-b01c96cd.png" className="social-proof-grid-badge-logo" alt="" srcSet="/media/TP-Logo-Tricolor-Black-RGB-1340fb21.png 1071w, /media/TP-Logo-Tricolor-Black-RGB-b01c96cd.png 300w, /media/TP-Logo-Tricolor-Black-RGB-d4892855.png 768w, /media/TP-Logo-Tricolor-Black-RGB-a40d7f51.png 1024w, /media/TP-Logo-Tricolor-Black-RGB-34208214.png 480w" sizes="auto, (max-width: 300px) 100vw, 300px" /> <span className="social-proof-grid-stars">★★★★★</span>
                                    <span className="social-proof-grid-rating-number">4.6/5 on Trustpilot</span>
                                </div>
                                <div className="social-proof-grid-badge-item">
                                    <img loading="lazy" decoding="async" width="100" height="100" src="/media/G2Logo-Red-1-1-e0e28d74.png" className="social-proof-grid-badge-logo" alt="" />                                <span className="social-proof-grid-stars">★★★★★</span>
                                    <span className="social-proof-grid-rating-number">4.5/5 on G2</span>
                                </div>
                                <div className="social-proof-grid-badge-item">
                                    <img loading="lazy" decoding="async" width="300" height="170" src="/media/gartner-logo-d8271cbd.webp" className="social-proof-grid-badge-logo gartner-logo" alt="" />                                <span className="social-proof-grid-stars">★★★★★</span>
                                    <span className="social-proof-grid-rating-number">4.7/5 on Gartner</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* All six stories on one row, drifting left in an endless loop. The
                        set is rendered twice so the track can slide by exactly half its
                        width and snap back without a visible seam; the copy is hidden
                        from assistive tech. Hover or focus pauses it. */}
                    <div className="social-proof-marquee reveal">
                        <div className="social-proof-marquee-track">
                            {STORIES.map((story) => <StoryCard key={story.name} story={story} />)}
                            {STORIES.map((story) => <StoryCard key={`${story.name}-copy`} story={story} hidden />)}
                        </div>
                    </div>
                </section>
  );
}
