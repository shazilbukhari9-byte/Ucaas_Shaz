/* Every route that currently exists in app/. The nav marks links to these
   pages with a small red "built" dot (see McmMegaHeader), so it is easy to
   see at a glance which menu entries lead somewhere and which still 404.

   Kept as a plain list (not derived from content/landingPages.js) so the
   client-side header doesn't pull the whole page-content module into its
   bundle. Add a path here whenever a new page is created. */
export const BUILT_PAGES = new Set([
  '/',
  '/cloud-phone/phone-texting',
  '/integrations/zapier',

  // Hubs
  '/features',
  '/solutions',

  // Features
  '/unified-communication',
  '/products/cloud-phone/phone-system',
  '/products/cloud-phone/team-chat',
  '/products/cloud-phone/video-meetings',
  '/products/cloud-phone/sms-mms',
  '/products/cloud-phone/online-fax',
  '/features/auto-attendant',
  '/features/call-recording',
  '/features/supervisor-tools',
  '/features/ai-sentiment',
  '/features/conversation-intelligence',
  '/products/ai/ai-receptionist',
  '/products/contact-center/agent-assist',

  // Numbers
  '/numbers/toll-free',

  // Solutions
  '/solutions/remote-teams',
  '/solutions/smb',
  '/solutions/enterprise-it',
  '/solutions/sales-teams',
  '/solutions/support-teams',
  '/solutions/finance',
  '/solutions/retail',
  '/solutions/saas',
  '/solutions/logistics',
]);

/** True when a menu href points at a page that exists (ignores #hash and a trailing slash). */
export function isBuilt(href) {
  if (!href) return false;
  const path = href.split('#')[0].replace(/\/+$/, '') || '/';
  return BUILT_PAGES.has(path);
}
