import { notFound } from 'next/navigation';
import LandingPage, { landingMetadata } from '../../../components/landing/LandingPage';
import RemotePage from '../../../components/landing/remote/RemotePage';
import SmbPage from '../../../components/landing/smb/SmbPage';
import EnterprisePage from '../../../components/landing/enterprise/EnterprisePage';
import SalesPage from '../../../components/landing/sales/SalesPage';
import SupportPage from '../../../components/landing/support/SupportPage';
import FinancePage from '../../../components/landing/finance/FinancePage';
import RetailPage from '../../../components/landing/retail/RetailPage';
import SaasPage from '../../../components/landing/saas/SaasPage';
import LogisticsPage from '../../../components/landing/logistics/LogisticsPage';
import { PAGES, pagesUnder } from '../../../content/landingPages';

// Only the pages in content/landingPages.js exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return pagesUnder('/solutions/').map((p) => ({ slug: p.path.split('/')[2] }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = PAGES[`/solutions/${slug}/`];
  return page ? landingMetadata(page) : {};
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const page = PAGES[`/solutions/${slug}/`];
  if (!page) notFound();
  // Pages with their own layout; the rest use the shared landing template.
  if (page.layout === 'remote') return <RemotePage page={page} />;
  if (page.layout === 'smb') return <SmbPage page={page} />;
  if (page.layout === 'enterprise') return <EnterprisePage page={page} />;
  if (page.layout === 'sales') return <SalesPage page={page} />;
  if (page.layout === 'support') return <SupportPage page={page} />;
  if (page.layout === 'finance') return <FinancePage page={page} />;
  if (page.layout === 'retail') return <RetailPage page={page} />;
  if (page.layout === 'saas') return <SaasPage page={page} />;
  if (page.layout === 'logistics') return <LogisticsPage page={page} />;
  return <LandingPage page={page} />;
}
