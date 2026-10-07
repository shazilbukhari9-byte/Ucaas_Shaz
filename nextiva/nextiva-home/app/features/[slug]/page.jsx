import { notFound } from 'next/navigation';
import LandingPage, { landingMetadata } from '../../../components/landing/LandingPage';
import CallRecordingPage from '../../../components/landing/recording/CallRecordingPage';
import AutoAttendantPage from '../../../components/landing/ivr/AutoAttendantPage';
import SupervisorPage from '../../../components/landing/supervisor/SupervisorPage';
import SentimentPage from '../../../components/landing/sentiment/SentimentPage';
import CiPage from '../../../components/landing/ci/CiPage';
import { PAGES, pagesUnder } from '../../../content/landingPages';

// Only the pages in content/landingPages.js exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return pagesUnder('/features/').map((p) => ({ slug: p.path.split('/')[2] }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = PAGES[`/features/${slug}/`];
  return page ? landingMetadata(page) : {};
}

export default async function FeaturePage({ params }) {
  const { slug } = await params;
  const page = PAGES[`/features/${slug}/`];
  if (!page) notFound();
  // Pages with their own layout; the rest use the shared landing template.
  if (page.layout === 'recording') return <CallRecordingPage page={page} />;
  if (page.layout === 'ivr') return <AutoAttendantPage page={page} />;
  if (page.layout === 'supervisor') return <SupervisorPage page={page} />;
  if (page.layout === 'sentiment') return <SentimentPage page={page} />;
  if (page.layout === 'ci') return <CiPage page={page} />;
  return <LandingPage page={page} />;
}
