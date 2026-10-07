import { notFound } from 'next/navigation';
import LandingPage, { landingMetadata } from '../../../../components/landing/LandingPage';
import TeamChatPage from '../../../../components/landing/teamchat/TeamChatPage';
import SmsPage from '../../../../components/landing/sms/SmsPage';
import VideoPage from '../../../../components/landing/video/VideoPage';
import FaxPage from '../../../../components/landing/fax/FaxPage';
import ReceptionistPage from '../../../../components/landing/receptionist/ReceptionistPage';
import AssistPage from '../../../../components/landing/assist/AssistPage';
import { PAGES, pagesUnder } from '../../../../content/landingPages';

/* Product pages from the Features content plan:
   /products/cloud-phone/*, /products/ai/ai-receptionist,
   /products/contact-center/agent-assist. */
export const dynamicParams = false;

export function generateStaticParams() {
  return pagesUnder('/products/').map((p) => {
    const [, , group, slug] = p.path.split('/');
    return { group, slug };
  });
}

export async function generateMetadata({ params }) {
  const { group, slug } = await params;
  const page = PAGES[`/products/${group}/${slug}/`];
  return page ? landingMetadata(page) : {};
}

export default async function ProductPage({ params }) {
  const { group, slug } = await params;
  const page = PAGES[`/products/${group}/${slug}/`];
  if (!page) notFound();
  // Pages with their own layout; the rest use the shared landing template.
  if (page.layout === 'teamchat') return <TeamChatPage page={page} />;
  if (page.layout === 'sms') return <SmsPage page={page} />;
  if (page.layout === 'video') return <VideoPage page={page} />;
  if (page.layout === 'fax') return <FaxPage page={page} />;
  if (page.layout === 'receptionist') return <ReceptionistPage page={page} />;
  if (page.layout === 'assist') return <AssistPage page={page} />;
  return <LandingPage page={page} />;
}
