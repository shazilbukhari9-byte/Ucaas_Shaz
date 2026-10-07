import LandingPage, { landingMetadata } from '../../components/landing/LandingPage';
import UcaasPage from '../../components/landing/ucaas/UcaasPage';
import { PAGES } from '../../content/landingPages';

const page = PAGES['/unified-communication/'];

export const metadata = landingMetadata(page);

export default function UnifiedCommunicationPage() {
  // The overview has its own layout; fall back to the shared template.
  if (page.layout === 'ucaas') return <UcaasPage page={page} />;
  return <LandingPage page={page} />;
}
