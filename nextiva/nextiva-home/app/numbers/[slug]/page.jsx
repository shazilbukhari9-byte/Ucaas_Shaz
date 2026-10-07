import { notFound } from 'next/navigation';
import LandingPage, { landingMetadata } from '../../../components/landing/LandingPage';
import TollFreePage from '../../../components/landing/tollfree/TollFreePage';
import { PAGES, pagesUnder } from '../../../content/landingPages';

/* Pages under the Numbers menu (currently /numbers/toll-free). Only pages in
   content/landingPages.js exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return pagesUnder('/numbers/').map((p) => ({ slug: p.path.split('/')[2] }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = PAGES[`/numbers/${slug}/`];
  return page ? landingMetadata(page) : {};
}

export default async function NumbersPage({ params }) {
  const { slug } = await params;
  const page = PAGES[`/numbers/${slug}/`];
  if (!page) notFound();
  // Pages with their own layout; the rest use the shared landing template.
  if (page.layout === 'tollfree') return <TollFreePage page={page} />;
  return <LandingPage page={page} />;
}
