import '../../../styles/integrations/zapier.css';

import McmMegaHeader from '../../../components/blocks/McmMegaHeader';
import ZapierPage from '../../../components/integrations/ZapierPage';
import GetStarted from '../../../components/business-voice/GetStarted';
import SiteFooter from '../../../components/blocks/SiteFooter';

export const metadata = {
  title: 'Zapier Integration | UCaaS',
  description:
    'Connect UCaaS to 7,000+ apps with Zapier. Turn calls, texts and voicemails into triggers, and send texts or place calls from any Zap.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'UCaaS',
    title: 'Zapier Integration | UCaaS',
    description:
      'Connect UCaaS to 7,000+ apps with Zapier. Turn calls, texts and voicemails into triggers, and send texts or place calls from any Zap.',
  },
};

/**
 * The page's stylesheet is imported here rather than in the root layout, so
 * it loads on this route only and cannot restyle other pages.
 */
export default function ZapierIntegrationPage() {
  return (
    <div className="wp-site-blocks">
      <header className="is-style-ucaas-header-block-transparent header--on-light wp-block-template-part">
        <McmMegaHeader />
      </header>

      <div className="entry-content wp-block-post-content is-layout-flow">
        <ZapierPage />
      </div>

      <section className="wp-block-template-part">
        <GetStarted />
        <SiteFooter />
      </section>
    </div>
  );
}
