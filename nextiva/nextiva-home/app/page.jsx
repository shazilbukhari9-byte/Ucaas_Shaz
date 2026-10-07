import PageEffects from '../components/PageEffects';
import McmMegaHeader from '../components/blocks/McmMegaHeader';
import HeroSection from '../components/blocks/HeroSection';
import LogoTrustBar from '../components/blocks/LogoTrustBar';
import FeaturesTabs from '../components/blocks/FeaturesTabs';
import SpotlightHeroTrust from '../components/blocks/SpotlightHeroTrust';
import ProductAnchor from '../components/blocks/ProductAnchor';
import SocialProofGrid from '../components/blocks/SocialProofGrid';
import FiberDivider from '../components/blocks/FiberDivider';
import GetStarted from '../components/blocks/GetStarted';
import SiteFooter from '../components/blocks/SiteFooter';
import ScrollMotion from '../components/landing/ScrollMotion';

export default function HomePage() {
  return (
    <>
      <div className="wp-site-blocks">
        <header className="is-style-ucaas-header-block-transparent header--on-light wp-block-template-part">
          <McmMegaHeader />
        </header>

        <div className="entry-content wp-block-post-content is-layout-flow wp-block-post-content-is-layout-flow">
          <HeroSection />
          <LogoTrustBar />
          <FeaturesTabs />
          <ProductAnchor />
          <SpotlightHeroTrust />
          <SocialProofGrid />
          <FiberDivider />
          <GetStarted />
        </div>

        <SiteFooter />
      </div>

      <PageEffects />
      {/* Items animate in as they scroll into view. */}
      <ScrollMotion root=".entry-content" />
    </>
  );
}
