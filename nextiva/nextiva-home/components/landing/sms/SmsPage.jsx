/* Business SMS & MMS page. Hero, related pages, FAQ and closing CTA are the
   shared landing sections; the middle is this page's own (SmsSections.jsx): a
   customer-phone / dashboard feature split, a live 10DLC tracker, a shared
   inbox playing a thread to done, and use cases as phone notifications.
   Content lives in content/landingPages.js (layout: 'sms'). */
import LogoTrustBar from '../../blocks/LogoTrustBar';
import { Shell, Hero, Related, Faq, ClosingCta } from '../LandingPage';
import { SmsFeatures, RegTracker, InboxFlow, TextWall } from './SmsSections';

export default function SmsPage({ page }) {
  return (
    <Shell>
      <Hero page={page} />
      <LogoTrustBar />
      <SmsFeatures page={page} />
      {page.register && <RegTracker data={page.register} />}
      {page.inbox && <InboxFlow data={page.inbox} />}
      <TextWall page={page} />
      <Related page={page} />
      <Faq faq={page.faq} />
      <ClosingCta page={page} />
    </Shell>
  );
}
