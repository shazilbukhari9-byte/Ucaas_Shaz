import '../../../styles/business-voice/index.css';
import '../../../styles/business-voice/hero-ucaas.css';

import BusinessVoiceEffects from '../../../components/BusinessVoiceEffects';
import McmMegaHeader from '../../../components/blocks/McmMegaHeader';
import HeroEditorial from '../../../components/business-voice/HeroEditorial';
import LogoTrustBar from '../../../components/business-voice/LogoTrustBar';
import ProductShowcase from '../../../components/business-voice/ProductShowcase';
import FeatureChecklist from '../../../components/business-voice/FeatureChecklist';
import SocialProofGrid from '../../../components/business-voice/SocialProofGrid';
import FeatureHighlightCards from '../../../components/business-voice/FeatureHighlightCards';
import FaqAccordion from '../../../components/business-voice/FaqAccordion';
import DemoForm from '../../../components/business-voice/DemoForm';
import GetStarted from '../../../components/business-voice/GetStarted';
import SiteFooter from '../../../components/blocks/SiteFooter';

export const metadata = {
  title: 'Business Phone & Texting | UCaaS',
  description:
    'Manage your calls and texts on one platform — unlimited calling, business SMS, voicemail transcription and routing, live in minutes.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'UCaaS',
    title: 'Business Phone & Texting | UCaaS',
    description:
      'Manage your calls and texts on one platform — unlimited calling, business SMS, voicemail transcription and routing, live in minutes.',
  },
};

/**
 * Section order and wrapper classes come straight from the capture: the block
 * components are generated, this composition is the only hand-assembled part.
 *
 * The page's stylesheet chain is imported here rather than in the root layout,
 * so it loads on this route and does not restyle the homepage.
 */
export default function PhoneTextingPage() {
  return (
    <>
      <div className="wp-site-blocks">
        <header className="is-style-ucaas-header-block-transparent header--on-light wp-block-template-part">
          <McmMegaHeader />
        </header>

        <div className="entry-content wp-block-post-content has-background has-contrast-background-color is-layout-flow wp-block-post-content-is-layout-flow">
          <HeroEditorial />
          <LogoTrustBar />
          <ProductShowcase />
          <FeatureChecklist />
          <SocialProofGrid />
          <FeatureHighlightCards />
          <FaqAccordion />
          <DemoForm />
        </div>

        <section className="wp-block-template-part">
          <GetStarted />
          <SiteFooter />
        </section>
      </div>

      <BusinessVoiceEffects />
    </>
  );
}
