/* Content for the Features and Solutions pages rendered by
   components/landing/LandingPage.jsx.

   Paths and topics follow the "MCM Nav – UCaaS under Features & Solutions"
   content plan; the copy is written fresh for UCaaS from that plan's source
   pages (ideas, specs and structure — not their wording).

   Shape of a page:
     path, section ('features' | 'solutions'), title, navTitle?, eyebrow,
     icon (Remix class), tone, summary (card one-liner), headline, lede,
     stats[{value,label}], capTitle, capIntro, capabilities[{icon,tone,title,text,short?}],
     steps[{title,text}] or challenges[{problem,answer}],
     audienceTitle, audience[{icon,tone,title,text}], related[path], faq[{q,a}] */

const P = {};
const add = (page) => { P[page.path] = page; };

/* ═══ FEATURES · UCaaS ═══════════════════════════════════════════════════ */

add({
  path: '/unified-communication/',
  section: 'features',
  title: 'Unified Communications',
  navTitle: 'UCaaS Platform',
  metaTitle: 'Unified Communications Platform (UCaaS)',
  layout: 'ucaas', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Voice · SMS · Video · Chat',
  heroArt: '/media/authority-valley-network.webp', // misty valley with a glowing network
  panelStyle: 'integrated', // no floating stat badges over the mockup
  heroMock: 'ucaas', // one conversation moving across channels, in the hero
  heroCta: { label: 'Book a demo', href: '/sign-up?intent=demo' },
  statsInHero: true,
  icon: 'ri-stack-fill', tone: 'blue',
  summary: 'Voice, chat, video, SMS and fax on one login.',
  headline: 'Every way your team communicates — on one platform.',
  lede: 'Calls, texts, video and team chat share one login, one number and one customer history — in every country your team works from. Start with voice and add the rest whenever you are ready.',
  ticks: ['One admin console', 'One shared history', '190+ countries'],
  stats: [
    { value: '190+', label: 'countries with local numbers' },
    { value: '99.99%', label: 'uptime SLA' },
    { value: '1', label: 'admin console for every channel' },
    { value: 'Same day', label: 'voice and SMS go live' },
  ],
  why: {
    kicker: 'Why unify',
    title: 'Teams don’t lack channels. They lose context between them.',
    intro: 'A customer calls, texts a follow-up, then jumps on a video call. With separate tools that’s three logs and three people who don’t know it’s the same conversation. On one platform it’s one thread anyone can pick up.',
    pillars: [
      { icon: 'ri-layout-masonry-fill', title: 'One admin console', text: 'Users, numbers, routing and reports for every channel in one place — not three dashboards.' },
      { icon: 'ri-user-follow-fill', title: 'Presence that stays in sync', text: 'On a call means busy in chat and video too, so nobody gets pinged mid-conversation.' },
      { icon: 'ri-line-chart-fill', title: 'Reporting on the whole conversation', text: 'Analytics follow the customer across channels, not one app at a time.' },
    ],
  },
  catalog: {
    kicker: 'Core features',
    title: 'Everything in one place — each feature once',
    intro: 'Grouped by what your team is trying to do. Pick a category to see what’s included.',
    groups: [
      { id: 'voice', icon: 'ri-phone-fill', tone: 'blue', label: 'Voice & calling', blurb: 'Numbers, routing and call control for every team — from a single line to a full contact center.', items: [
        { t: 'Local, toll-free and mobile numbers in 190+ countries', href: '/numbers/toll-free/' },
        { t: 'Transfer, hold and warm hand-off between people or teams', href: '/products/cloud-phone/phone-system/' },
        { t: 'Multi-level IVR with your own menu logic', href: '/features/auto-attendant/' },
        { t: 'Queues with wait experiences and overflow rules', href: '/products/cloud-phone/phone-system/' },
        { t: 'Listen, whisper and barge for supervisors', href: '/features/supervisor-tools/' },
        { t: 'Preview, power and predictive dialing for outbound', href: '/solutions/sales-teams/' },
        { t: 'Call analytics: volume, duration, abandonment, agents', href: '/features/conversation-intelligence/' },
      ] },
      { id: 'msg', icon: 'ri-message-2-fill', tone: 'teal', label: 'Messaging', blurb: 'Texts and chat apps in the same inbox as your calls, with one history per customer.', items: [
        { t: 'Two-way SMS & MMS with delivery and read status', href: '/products/cloud-phone/sms-mms/' },
        { t: 'WhatsApp and Telegram in the same inbox as SMS', href: '/solutions/support-teams/' },
        { t: 'One history across channels when a customer switches', href: '/solutions/support-teams/' },
        { t: 'Encrypted online fax with audit logs', href: '/products/cloud-phone/online-fax/' },
      ] },
      { id: 'collab', icon: 'ri-vidicon-fill', tone: 'violet', label: 'Video & collaboration', blurb: 'Meetings, screen share and team chat that pick up right where the call left off.', items: [
        { t: '1:1 and group HD video for up to 200 people', href: '/products/cloud-phone/video-meetings/' },
        { t: 'Team channels and DMs with file sharing', href: '/products/cloud-phone/team-chat/' },
        { t: 'Presence synced across voice, chat and video', href: '/products/cloud-phone/team-chat/' },
      ] },
      { id: 'ai', icon: 'ri-sparkling-2-fill', tone: 'amber', label: 'Analytics & AI', blurb: 'Transcripts, sentiment and reporting across every channel — not one app at a time.', items: [
        { t: 'AI transcription on every call', href: '/features/call-recording/' },
        { t: 'Sentiment on customer conversations', href: '/features/ai-sentiment/' },
        { t: 'One reporting dashboard for voice, messaging and video', href: '/features/conversation-intelligence/' },
      ] },
      { id: 'api', icon: 'ri-plug-fill', tone: 'green', label: 'Integrations & APIs', blurb: 'Connect the CRM and tools you already use, or build on the platform with open APIs.', items: [
        { t: 'Microsoft 365 and Google Workspace', href: '/integrations/zapier/' },
        { t: 'CRM logging for calls, texts and history', href: '/integrations/zapier/' },
        { t: 'APIs for custom workflows on the communication layer', href: '/integrations/zapier/' },
      ] },
    ],
  },
  global: {
    kicker: 'Global-first',
    title: 'Built for teams that don’t share a time zone',
    intro: 'Most platforms are built for one country and stretched to the rest. Here the base layer is global numbers, so a team split across continents runs on one console, one set of routing rules and one quality bar.',
    points: ['Local numbers and local-quality calls in every market', 'Same routing rules and console for every office', 'Grow into new countries without a new vendor'],
  },
  scale: {
    kicker: 'Grows with you',
    title: 'From the first hire to an enterprise rollout',
    intro: 'Five people and five hundred need different things. Add channels, numbers and countries as you grow — without migrating.',
  },
  integrations: {
    kicker: 'Integrations',
    title: 'Fits the tools you already use',
    intro: 'Unifying communication shouldn’t mean ripping out the rest of your stack.',
    items: [
      { id: 'm365', icon: 'ri-microsoft-fill', title: 'Microsoft 365', text: 'Contacts, calendars and presence stay in sync.' },
      { id: 'gws', icon: 'ri-google-fill', title: 'Google Workspace', text: 'Calling and texting inside Gmail and Calendar workflows.' },
      { id: 'crm', icon: 'ri-contacts-book-3-fill', title: 'CRM platforms', text: 'Calls, texts and history logged on the right record automatically.' },
      { id: 'api', icon: 'ri-code-s-slash-fill', title: 'APIs', text: 'Build custom routing, reporting or embedded calling into your own product.' },
    ],
  },
  related: ['/products/cloud-phone/phone-system/', '/products/cloud-phone/team-chat/', '/products/cloud-phone/video-meetings/', '/products/ai/ai-receptionist/'],
  faq: [
    { q: 'What is UCaaS?', a: 'Unified Communications as a Service: calling, messaging, video and chat delivered from the cloud as one platform, with no on-site hardware to buy or maintain.' },
    { q: 'How is it different from a business phone system?', a: 'A phone system handles calls. UCaaS adds texting, video and chat on top — and keeps every interaction with a customer in one shared history.' },
    { q: 'Which channels are included?', a: 'Voice, SMS and MMS, WhatsApp and Telegram, HD video, team chat and online fax — with AI transcription and reporting across all of them.' },
    { q: 'Does it work the same outside the US and Europe?', a: 'Yes. Numbers are available in 190+ countries and every office runs on the same console and routing rules.' },
    { q: 'Can it connect to our CRM and other tools?', a: 'Yes. It integrates with Microsoft 365, Google Workspace and major CRMs, and there are APIs for custom workflows.' },
    { q: 'Do I have to adopt everything at once?', a: 'No. Most teams start with voice and SMS, then switch on video, chat or AI when they need them — no new contract.' },
    { q: 'Do we need a separate contract for each country?', a: 'No. One account and one contract cover every country you operate in.' },
    { q: 'How long does setup take?', a: 'Voice and SMS can be live the same day; porting existing numbers usually takes one to two weeks, with no downtime.' },
  ],
});

add({
  path: '/products/cloud-phone/phone-system/',
  section: 'features',
  title: 'Hosted Phone System',
  eyebrow: 'Cloud PBX',
  eyebrowStyle: 'badge', // grey home-style badge instead of the orange pill
  heroArt: '/media/starlit-ridge-dusk.webp', // starry dusk sky over a pine ridge
  panelStyle: 'integrated', // stats in a footer bar inside the hero panel
  capStyle: 'explorer', // one feature-explorer card: list + detail panel
  heroMock: 'phone-system', // working admin-console mockup in the hero
  scrollMotion: true, // items animate in as they scroll into view
  heroCta: { label: 'Book a demo', href: '/sign-up?intent=demo' },
  statsInHero: true, // proof numbers under the hero actions, no separate band
  icon: 'ri-phone-fill', tone: 'blue',
  summary: 'Extensions, ring and hunt groups — zero hardware.',
  headline: 'Everything your old PBX did, without the box in the closet.',
  lede: 'Extensions, hunt groups, IVR and paging run in the cloud and are managed from one console across every office — with the phones you already own or the apps on your team’s devices.',
  stats: [
    { value: '99.99%', label: 'uptime SLA' },
    { value: '0', label: 'hardware to install' },
    { value: '~2 weeks', label: 'typical migration, zero downtime' },
    { value: 'Free', label: 'number porting' },
  ],
  capTitle: 'A complete PBX, managed in a browser',
  capabilities: [
    { icon: 'ri-hashtag', tone: 'blue', mock: 'ext', title: 'Unlimited extensions', short: '3–5 digit dialing', text: 'Short-code dialing across every site, with a directory and click-to-call.', points: ['3–5 digit dialing between every site','Company directory with click-to-call','Desk phone, desktop and mobile on one extension'] },
    { icon: 'ri-group-fill', tone: 'teal', mock: 'ring', title: 'Ring & hunt groups', short: 'Four ring strategies', text: 'Sequential, simultaneous, round-robin or longest-idle — per group.', points: ['Sequential, simultaneous, round-robin or longest-idle','Overflow to voicemail or another group','Set per group, change any time'] },
    { icon: 'ri-git-branch-fill', tone: 'violet', mock: 'ivr', title: 'Visual IVR builder', short: 'Drag-and-drop menus', text: 'Multi-level auto-attendant menus you build by dragging and connecting steps — no flow charts, no code.', points: ['Multi-level menus, built by drag and drop','Route by key press to people, groups or queues','Preview a flow before it goes live'] },
    { icon: 'ri-calendar-schedule-fill', tone: 'amber', mock: 'hours', title: 'Hours, holidays & dial plans', short: 'Time-based routing', text: 'Routing rules by time of day, a built-in holiday calendar and an after-hours attendant that switches over on its own.', points: ['Business-hours and after-hours routing','Built-in holiday calendar','After-hours attendant switches on by itself'] },
    { icon: 'ri-phone-find-fill', tone: 'blue', mock: 'handling', title: 'Advanced call handling', short: 'Park, flip, screening', text: 'Call park and pickup, call waiting, screening, and flip a live call between desk, laptop and mobile without dropping it.', points: ['Park and pick up from any phone','Call waiting and call screening','Flip a live call between devices'] },
    { icon: 'ri-contacts-book-fill', tone: 'teal', mock: 'directory', title: 'Directory & presence', short: 'Status everyone can see', text: 'A company directory with live presence, calendar-aware do-not-disturb and click-to-call from any device.', points: ['Live status for everyone in the company','Calendar-aware do-not-disturb','Click-to-call from any device'] },
    { icon: 'ri-megaphone-fill', tone: 'rose', mock: 'paging', title: 'Intercom & paging', short: 'Reach one desk or all', text: 'Page a whole floor or warehouse, intercom a single extension, or broadcast to a group — all from the same app.', points: ['Page a floor, a warehouse or every phone','Intercom a single extension','Broadcast to a group from the app'] },
    { icon: 'ri-building-2-fill', tone: 'slate', mock: 'sites', title: 'Multi-site control', short: 'Per-site caller ID', text: 'Separate caller IDs and number pools per location, with central billing and SSO.', points: ['Separate caller IDs per location','Local number pools for each site','Manage every office from one console'] },
    { icon: 'ri-shield-check-fill', tone: 'green', mock: 'reliable', title: 'Reliable by design', short: 'e911 & SIP trunks', text: 'Enhanced 911, SIP trunking and voicemail-to-email included.', points: ['Enhanced 911 included','SIP trunking for existing equipment','Voicemail-to-email on every line'] },
  ],
  stepsStyle: 'timeline', // day-by-day migration timeline
  stepsKicker: 'Migrate in a weekend',
  stepsTitle: 'From Friday to Monday — no consultant needed',
  steps: [
    { day: 'Fri', label: 'Day 1', icon: 'ri-arrow-left-right-line', title: 'Port your numbers', text: 'We start porting while your old system keeps taking calls.' },
    { day: 'Sat', label: 'Day 2', icon: 'ri-git-branch-line', title: 'Rebuild your dial plan', text: 'Recreate extensions and IVR menus in the visual builder — we help.' },
    { day: 'Sun', label: 'Day 3', icon: 'ri-smartphone-line', title: 'Set up every device', text: 'Desktop and mobile apps for every user, plus your existing SIP phones.' },
    { day: 'Mon', label: 'Day 4', icon: 'ri-rocket-2-line', title: 'Cut over', text: 'Switch when you are ready, with the old system on standby as a fallback.' },
  ],
  multiSite: {
    kicker: 'Multi-site · one console',
    title: 'Every office and brand, under one parent account',
    intro: 'Each location keeps its own users, extensions, caller IDs and number pool — while you manage routing, reporting and billing for all of them in one place.',
    points: [
      { icon: 'ri-building-4-line', text: 'Per-site caller IDs and local number pools' },
      { icon: 'ri-bar-chart-2-line', text: 'Roll-up reporting across every location' },
      { icon: 'ri-shield-user-line', text: 'Site admins with their own permissions' },
    ],
    sites: [
      { code: 'NY', name: 'New York HQ', city: 'New York, NY', ext: 84, live: 12, callerId: '+1 (212) 555-0100', pool: 24, tone: 'orange' },
      { code: 'AU', name: 'Austin Office', city: 'Austin, TX', ext: 32, live: 7, callerId: '+1 (512) 555-0140', pool: 10, tone: 'blue' },
      { code: 'SE', name: 'Seattle Office', city: 'Seattle, WA', ext: 47, live: 5, callerId: '+1 (206) 555-0175', pool: 14, tone: 'teal' },
      { code: 'RT', name: 'Remote Team', city: 'Anywhere', ext: 21, live: 3, callerId: '+1 (800) 555-0199', pool: 6, tone: 'violet' },
    ],
  },
  audienceTitle: 'Built for teams leaving a legacy PBX',
  audienceStyle: 'persona', // numbered persona cards with fit tags
  audiencePoints: ['Keep the SIP desk phones you already own', 'Free number porting with zero downtime', 'One console for every site and brand'],
  audienceIntro: 'No more box in the closet, annual maintenance contract or consultant on speed-dial. Whether you run one storefront or a dozen offices, you keep every feature your old PBX had — and each site gets its own users, caller IDs and number pool, all managed from one console.',
  audience: [
    { icon: 'ri-building-2-fill', tone: 'slate', title: 'Multi-office companies', text: 'One dial plan and roll-up reporting across every site.', tags: ['Multi-site', 'Roll-up reports'] },
    { icon: 'ri-store-2-fill', tone: 'amber', title: 'Small businesses', text: 'Professional call handling without a consultant.', tags: ['Self-serve setup', 'From 1 seat'] },
    { icon: 'ri-macbook-fill', tone: 'blue', title: 'Remote teams', text: 'Desk phones, softphones and mobile on the same extension.', tags: ['Any device', 'One extension'] },
    { icon: 'ri-stack-fill', tone: 'violet', title: 'Multi-brand businesses', text: 'Separate numbers and caller IDs for each brand.', tags: ['Brand caller IDs', 'Number pools'] },
  ],
  compare: {
    kicker: 'Side by side',
    title: 'Why teams move off the box in the closet',
    intro: 'The same calling features you rely on today — without the hardware, the service contracts or the waiting.',
    legacyLabel: 'Legacy on-site PBX',
    rows: [
      { feature: 'Hardware to buy', legacy: 'PBX box, wiring and server room', ours: 'None — use the phones you own or the apps' },
      { feature: 'Getting started', legacy: 'Weeks, with an installer on site', ours: 'Live in minutes; full migration in ~2 weeks' },
      { feature: 'Adding a user or office', legacy: 'Technician visit and new hardware', ours: 'A few clicks in one console' },
      { feature: 'Working remotely', legacy: 'Calls stay on the desk phone', ours: 'Desk, laptop and mobile on one extension' },
      { feature: 'Changing call flows', legacy: 'Open a ticket with your vendor', ours: 'Edit the visual IVR yourself' },
      { feature: 'Multiple sites', legacy: 'One system per location', ours: 'Every site under one parent account' },
      { feature: 'Updates & upkeep', legacy: 'Paid maintenance contracts', ours: 'Automatic, included' },
      { feature: 'Reliability', legacy: 'Only as good as the closet it sits in', ours: '99.99% uptime SLA' },
    ],
  },
  testimonials: true, // home page customer-stories marquee
  related: ['/features/auto-attendant/', '/features/call-recording/', '/numbers/toll-free/', '/products/ai/ai-receptionist/'],
  faq: [
    { q: 'Do I need new desk phones?', a: 'No. Most SIP phones from Yealink, Poly, Cisco and Grandstream work, and the desktop and mobile apps work without any hardware.' },
    { q: 'How long does migration take?', a: 'About two weeks for most small and mid-size businesses, with both systems running side by side until you cut over.' },
    { q: 'Can I keep my numbers?', a: 'Yes — porting is free, and your numbers keep ringing throughout the move.' },
    { q: 'Does it support several offices?', a: 'Yes. Multi-site setups with per-location caller IDs and number pools are standard.' },
  ],
});

add({
  path: '/features/auto-attendant/',
  section: 'features',
  title: 'Auto-attendant & IVR',
  layout: 'ivr', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Auto-attendant & IVR',
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-ridges-layered-crimson-teal-04b8678b.png',
  panelStyle: 'integrated',
  heroMock: 'ivr', // working IVR builder + test call in the hero
  statsInHero: true,
  icon: 'ri-git-branch-fill', tone: 'violet',
  summary: 'Drag-and-drop menus that route every caller.',
  headline: 'A phone menu that gets callers where they’re going — fast.',
  lede: 'Build multi-level menus on a visual canvas, run them on one hours-and-holidays calendar, and let AI route callers by what they say when a menu would only slow them down.',
  ticks: ['Drag-and-drop builder', 'Hours & holidays built in', 'AI routing fallback'],
  stats: [
    { value: '32', label: 'languages for prompts and routing' },
    { value: '0', label: 'developers needed' },
    { value: 'Unlimited', label: 'menu levels and branches' },
    { value: 'Live', label: 'edits — no dropped calls' },
  ],
  statement: {
    kicker: 'Why it matters',
    text: 'Nobody calls a business hoping to hear',
    highlight: '“press 9 to repeat this menu.”',
    sub: 'A good menu gets a caller to the right person in three key presses or fewer — and when their question doesn’t fit a menu, AI takes it from there.',
    points: [
      { value: '≤ 3', label: 'key presses to reach any team', icon: 'ri-keyboard-box-line' },
      { value: '0', label: 'dead ends — every branch has a fallback', icon: 'ri-git-branch-line' },
      { value: '24/7', label: 'answered, including after hours', icon: 'ri-time-line' },
    ],
  },
  capKicker: 'The essentials',
  capTitle: 'Five things every modern phone menu needs',
  capIntro: 'The old press-1-press-2 tree is the starting point, not the goal. This is what you get on every plan.',
  capabilities: [
    { icon: 'ri-node-tree', tone: 'violet', title: 'Multi-level menus with conditions', short: 'Branch on anything', text: 'Nest menus as deep as you need and branch on caller ID, time of day, queue load or business hours.', chips: ['Unlimited depth', 'Conditional branches'] },
    { icon: 'ri-drag-drop-fill', tone: 'blue', title: 'Visual drag-and-drop builder', short: 'Drag, drop, publish', text: 'Place steps on a canvas, connect them with a line and publish — callers already in the menu are never cut off.', chips: ['Live preview', 'Version history & rollback'] },
    { icon: 'ri-calendar-2-fill', tone: 'amber', title: 'Hours, holidays & after-hours', short: 'One calendar', text: 'One calendar drives every menu, with holiday lists per country and an after-hours fallback for each site.', chips: ['Per-country holidays', 'Per-site fallback'] },
    { icon: 'ri-route-fill', tone: 'teal', title: 'Skills-based routing', short: 'Language, tier, topic', text: 'Send callers to the group that can actually help — matched by language, account tier or topic.', chips: ['Round-robin · longest idle · sticky', 'Multi-skill matching'] },
    { icon: 'ri-phone-find-fill', tone: 'green', title: 'Callback instead of hold', short: 'Keep your place', text: 'Callers hear their place in line and the expected wait, and can hang up and get a call back without losing their spot.', chips: ['Position announcements', 'Estimated wait time'] },
  ],
  hours: {
    kicker: 'Hours & holidays',
    title: 'One calendar decides where every call goes',
    intro: 'Set opening hours once per site, add your holidays, and the menu switches itself. Pick a day and drag the time to hear what a caller would get.',
  },
  ai: {
    kicker: 'Or skip the menu',
    title: 'Let callers just say what they need',
    intro: 'The same call, two ways. Run a classic menu, AI routing, or both on the same line — AI picks up anything the menu can’t.',
  },
  stepsKicker: 'Build it',
  stepsTitle: 'From blank canvas to live menu in an afternoon',
  steps: [
    { icon: 'ri-drag-drop-line', title: 'Drag your steps onto the canvas', text: 'Greetings, menus, queues, voicemail and AI — connected visually.' },
    { icon: 'ri-calendar-check-line', title: 'Attach hours and holidays', text: 'Link the shared calendar so every site follows the right schedule.' },
    { icon: 'ri-rocket-2-line', title: 'Publish — live calls stay up', text: 'Changes go live instantly without dropping anyone already in the menu.' },
  ],
  audienceTitle: 'For any number that rings more than one person',
  audience: [
    { icon: 'ri-hospital-fill', tone: 'rose', title: 'Clinics & practices', text: 'Keep bookings, billing and urgent calls apart.', menu: ['Appointments', 'Billing', 'Urgent → on-call'] },
    { icon: 'ri-customer-service-2-fill', tone: 'teal', title: 'Sales, support & billing', text: 'One main number that sends each caller to the right team.', menu: ['Sales', 'Support', 'Billing'] },
    { icon: 'ri-translate-2', tone: 'blue', title: 'Multilingual callers', text: 'Prompts and routing in 32 languages.', menu: ['English', 'Español', 'Français'] },
    { icon: 'ri-building-2-fill', tone: 'slate', title: 'Multi-site businesses', text: 'Local hours and holidays for every location.', menu: ['Downtown', 'Airport', 'Riverside'] },
  ],
  related: ['/products/ai/ai-receptionist/', '/numbers/toll-free/', '/features/supervisor-tools/', '/products/cloud-phone/phone-system/'],
  faq: [
    { q: 'Do I need a developer to build an IVR?', a: 'No. Everything is drag-and-drop on a visual canvas, with a live preview before you publish.' },
    { q: 'Which languages are supported?', a: 'Prompts and AI routing work in 32 languages. You can use text-to-speech or upload your own recordings.' },
    { q: 'Can AI replace the phone menu?', a: 'Yes. Callers can simply say what they need and AI routes them. You can keep the menu as a fallback or run both side by side.' },
    { q: 'Will publishing a change drop calls?', a: 'No. Updates go live without interrupting callers already in the flow, and every version can be rolled back.' },
    { q: 'How do holidays and after-hours work?', a: 'One shared calendar holds opening hours per site and holiday lists per country. Outside those hours the menu switches to your after-hours route automatically.' },
    { q: 'What happens if nobody answers?', a: 'Every branch has a fallback — another group, a callback, voicemail or AI — so callers never hit a dead end.' },
  ],
});

add({
  path: '/features/call-recording/',
  section: 'features',
  title: 'Call Recording',
  eyebrow: 'Call recording',
  layout: 'recording', // dedicated layout, not the shared landing template
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-peak-silhouette-purple-teal-9b87b9ed.png', // dusk peak, teal-to-amber sky
  panelStyle: 'integrated',
  heroMock: 'call-recording', // working recording player in the hero
  statsInHero: true,
  icon: 'ri-record-circle-fill', tone: 'rose',
  summary: 'Every call captured, searchable by keyword.',
  headline: 'Record every call. Find any moment in under a second.',
  lede: 'Calls are recorded, transcribed, redacted and indexed automatically — so reviewing a conversation is a search, not an afternoon of listening.',
  ticks: ['Every call recorded', 'Redacted before storage', 'Searchable in seconds'],
  stats: [
    { value: '~0.4s', label: 'keyword search across the archive' },
    { value: '32', label: 'transcript languages' },
    { value: 'Up to 7 yrs', label: 'configurable retention' },
    { value: 'AES-256', label: 'encryption at rest' },
  ],
  capKicker: 'What you get',
  capTitle: 'Recording that is built for review and compliance',
  capabilities: [
    { icon: 'ri-mic-fill', tone: 'rose', title: 'Every call, both directions', visual: 'stereo', short: 'Stereo, high fidelity', text: 'Inbound and outbound calls are recorded automatically in stereo, so each speaker stays on their own channel.', points: ['Nothing to switch on per call', 'Separate channels for each speaker', 'Encrypted at rest with per-account keys'] },
    { icon: 'ri-file-text-fill', tone: 'blue', title: 'Automatic transcripts', visual: 'transcript', short: 'Speakers & timestamps', text: 'Every recording gets a speaker-labelled, timestamped transcript — in 32 languages — the moment the call ends.', points: ['Speaker labels and timestamps', '32 transcript languages', 'Read along while the audio plays'] },
    { icon: 'ri-search-2-fill', tone: 'violet', title: 'Keyword search', visual: 'search', short: 'The whole archive', text: 'Search every call you have ever recorded for a word or phrase, then jump straight to the second it was said.', points: ['Results across the full archive in about 0.4s', 'Matches marked on the waveform', 'Filter by agent, queue or date'] },
    { icon: 'ri-eye-off-fill', tone: 'slate', title: 'Automatic redaction', visual: 'redact', short: 'PCI, PHI, SSN', text: 'Card numbers, health details and social-security numbers are blanked out of both audio and transcript before anything is stored.', points: ['Redacted in audio and text', 'Happens before storage, not after', 'Each redaction recorded in the audit log'] },
    { icon: 'ri-play-circle-fill', tone: 'amber', title: 'Playback built for review', visual: 'playback', short: 'Speed, skip, jump', text: 'Review faster with variable playback speed and one-click jumps between keyword matches.', points: ['0.75× to 2× playback speed', 'Jump from match to match', 'Click any transcript line to hear it'] },
    { icon: 'ri-archive-fill', tone: 'teal', title: 'Flexible retention', visual: 'retention', short: '30 days – 7 years', text: 'Keep recordings as long as your policy requires — from 30 days up to 7 years — with rules per queue and legal hold.', points: ['Retention rules per queue or team', 'Legal hold for disputes and audits', 'Automatic deletion when time is up'] },
    { icon: 'ri-shield-check-fill', tone: 'green', title: 'Consent & audit trail', visual: 'audit', short: 'State-aware prompts', text: 'Callers hear the right consent message for where they are, and every playback, export and policy change is logged.', points: ['Consent prompts by state or region', 'Tamper-evident audit log', 'Exportable for compliance reviews'] },
    { icon: 'ri-share-forward-fill', tone: 'blue', title: 'Share & export', visual: 'share', short: 'Clips, audio, text', text: 'Share a single moment with a teammate or export audio and transcript — with access controlled by role.', points: ['Share a link to an exact timestamp', 'Export audio and transcript files', 'Role-based access to recordings'] },
  ],
  compliance: {
    kicker: 'Compliance built in',
    title: 'Consent, retention and audit — switched on from day one',
    intro: 'Recording is only useful if you can prove how it was handled. Every call follows your retention rules, and every action on a recording leaves a trail.',
    points: [
      { icon: 'ri-chat-voice-line', text: 'Consent prompts that follow each caller’s state or region' },
      { icon: 'ri-time-line', text: 'Retention from 30 days to 7 years, set per queue' },
      { icon: 'ri-file-list-3-line', text: 'An audit entry for every playback, export and rule change' },
    ],
  },
  useCases: [
    { id: 'qa', icon: 'ri-medal-line', label: 'Quality assurance', title: 'Review the calls that matter, not a random sample', text: 'Search for the moments that signal a problem — a cancellation, a complaint, a missed upsell — and coach from real examples.', points: ['Find every call that mentions a keyword', 'Jump straight to the moment it was said', 'Share the clip with the agent'], query: 'cancel my plan', result: '14 calls this week · 3 agents' },
    { id: 'compliance', icon: 'ri-scales-3-line', label: 'Compliance', title: 'Keep what you must, prove how you handled it', text: 'Retention, consent and redaction follow your policy automatically, and every action on a recording is logged for your auditors.', points: ['Retention rules per queue', 'Card and personal data redacted', 'Audit log ready to export'], query: 'card number', result: '0 unredacted matches · all masked' },
    { id: 'training', icon: 'ri-graduation-cap-line', label: 'Training', title: 'Build a library of your best conversations', text: 'Collect the calls that show how it should be done and give new hires real examples from day one.', points: ['Save standout calls to a library', 'Transcripts to read alongside the audio', 'Ramp new hires on real calls'], query: 'thank you so much', result: '62 calls · top-rated agents' },
    { id: 'disputes', icon: 'ri-chat-check-line', label: 'Disputes', title: 'Settle what was agreed in seconds', text: 'When a customer and an agent remember a call differently, search the transcript and play back exactly what was said.', points: ['Search by phrase, date or number', 'Timestamped transcript as the record', 'Export audio and text together'], query: 'refund', result: '3 matches · REC-24817 · 01:02' },
  ],
  stepsStyle: 'timeline',
  stepsKicker: 'How it works',
  stepsTitle: 'From hang-up to searchable in moments',
  steps: [
    { day: '01', label: 'Capture', icon: 'ri-record-circle-line', title: 'Every call is recorded', text: 'Inbound and outbound calls are captured in stereo — nothing to switch on per call.' },
    { day: '02', label: 'Process', icon: 'ri-shield-keyhole-line', title: 'Transcribed and redacted', text: 'A speaker-labelled transcript is created and sensitive data is removed before storage.' },
    { day: '03', label: 'Index', icon: 'ri-search-line', title: 'Indexed for search', text: 'Every word is indexed, so the call is searchable across your whole archive.' },
    { day: '04', label: 'Review', icon: 'ri-share-forward-line', title: 'Review, share, export', text: 'Jump to any moment, share a clip or export — with every action logged.' },
  ],
  audienceTitle: 'For teams that learn from — or must keep — every call',
  audienceStyle: 'persona',
  audienceIntro: 'Whether you coach a sales floor, run a support desk or answer to a regulator, recordings you can search turn every call into something you can act on.',
  audiencePoints: ['Search instead of random sampling', 'Sensitive data removed automatically', 'Every playback on the record'],
  audience: [
    { icon: 'ri-medal-fill', tone: 'amber', title: 'Quality assurance', text: 'Review by search instead of random sampling.', tags: ['Keyword search', 'QA reviews'] },
    { icon: 'ri-bank-fill', tone: 'green', title: 'Regulated industries', text: 'Retention, redaction and audit logs on by default.', tags: ['PCI redaction', 'Legal hold'] },
    { icon: 'ri-graduation-cap-fill', tone: 'blue', title: 'Training & coaching', text: 'Build a library of great calls for new hires.', tags: ['Shared clips', 'Call library'] },
    { icon: 'ri-scales-3-fill', tone: 'violet', title: 'Dispute resolution', text: 'Find exactly what was agreed, in seconds.', tags: ['Timestamp links', 'Exports'] },
  ],
  compare: {
    kicker: 'Side by side',
    title: 'Recording you can actually use',
    intro: 'Many phone systems record calls. Few make them searchable, safe to keep and easy to prove.',
    legacyLabel: 'Typical recording add-on',
    rows: [
      { feature: 'Search inside calls', legacy: 'Listen and scrub manually', ours: 'Keyword search across every transcript' },
      { feature: 'Transcripts', legacy: 'Extra cost, if available', ours: 'Automatic on every call, 32 languages' },
      { feature: 'Sensitive data', legacy: 'Manual or not handled', ours: 'Redacted from audio and text before storage' },
      { feature: 'How long you can keep calls', legacy: 'Often 30–90 days', ours: '30 days up to 7 years, per queue' },
      { feature: 'Who listened, and when', legacy: 'Higher tiers only, if at all', ours: 'Audit log on by default' },
      { feature: 'Consent messages', legacy: 'One prompt for everyone', ours: 'Set per state or region' },
      { feature: 'Cost', legacy: 'Per-seat recording add-on', ours: 'Part of the platform' },
    ],
  },
  related: ['/features/conversation-intelligence/', '/features/ai-sentiment/', '/features/supervisor-tools/', '/products/cloud-phone/phone-system/'],
  faq: [
    { q: 'How long are recordings kept?', a: 'As long as your policy needs: retention is configurable from 30 days up to 7 years, with separate rules per queue and legal hold for anything under review.' },
    { q: 'Is sensitive data removed automatically?', a: 'Yes. Payment card numbers, health information and social-security numbers are redacted from both the audio and the transcript before the recording is stored.' },
    { q: 'Can callers be told they are being recorded?', a: 'Yes. Consent prompts can be set per state or region and play automatically at the start of the call.' },
    { q: 'Can I search across all of our calls?', a: 'Yes. Keyword search runs across every transcript in your account, and each result opens the recording at the exact moment the word was said.' },
    { q: 'Who can listen to or download recordings?', a: 'Access follows user roles, and every playback, share and export is written to the audit log.' },
    { q: 'Is recording an extra cost?', a: 'No. Recording, transcripts, search and redaction are part of the platform — there is no per-seat recording add-on.' },
  ],
});

add({
  path: '/numbers/toll-free/',
  section: 'numbers',
  title: 'Toll-free Numbers',
  layout: 'tollfree', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Toll-free numbers',
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-saguaro-dawn-navy-amber_8bd680-82e7ec0d.png',
  panelStyle: 'integrated',
  heroMock: 'toll-free', // working number search + provisioning in the hero
  heroCta: { label: 'Book a demo', href: '/sign-up?intent=demo' }, // + 'Talk to sales', as on Unified
  statsInHero: true,
  icon: 'ri-hashtag', tone: 'green',
  summary: '800, 888 and 877 numbers live in minutes.',
  headline: 'A national toll-free number — live in under five minutes.',
  lede: 'Search all seven toll-free prefixes at once, grab a memorable vanity number, and start taking calls and texts on it the same morning.',
  ticks: ['All 7 prefixes in one search', 'Vanity numbers included', 'Calls & texts ready'],
  stats: [
    { value: '7', label: 'prefixes searched at once' },
    { value: '< 5 min', label: 'from search to live' },
    { value: 'Vanity', label: 'numbers that spell your name' },
    { value: 'A-level', label: 'STIR/SHAKEN attestation' },
  ],
  prefixes: {
    kicker: 'Every prefix',
    title: 'Seven prefixes. One search.',
    intro: 'Every toll-free prefix works the same way and is free for callers across the US and Canada. We search them all at once, so you get the best match — not just whatever is left on 800.',
    items: [
      { code: '800', year: '1967', note: 'The original' },
      { code: '888', year: '1996' },
      { code: '877', year: '1998' },
      { code: '866', year: '2000' },
      { code: '855', year: '2010' },
      { code: '844', year: '2013' },
      { code: '833', year: '2017', note: 'Newest, most choice' },
    ],
  },
  vanity: {
    kicker: 'Vanity numbers',
    title: 'Spell your brand on the keypad',
    intro: 'Letters map to keypad digits, so a word becomes a number people remember after one ad. Type a word and watch it dial.',
  },
  capKicker: 'What you get',
  capTitle: 'Toll-free, without the paperwork',
  capIntro: 'Everything a national number needs to be trusted, reachable and ready the moment you pick it.',
  capabilities: [
    { icon: 'ri-search-2-fill', tone: 'green', visual: 'search', title: 'Search all prefixes', short: '800 → 833', text: 'Search 800, 888, 877, 866, 855, 844 and 833 in a single query, vanity patterns included.' },
    { icon: 'ri-flashlight-fill', tone: 'amber', visual: 'speed', title: 'Live in minutes', short: 'Not 24 hours', text: 'Pick a number and take the first call in under five minutes — no waiting on a carrier ticket.' },
    { icon: 'ri-shield-check-fill', tone: 'blue', visual: 'callerid', title: 'Trusted caller ID', short: 'Avoid “Spam likely”', text: 'Outbound calls are signed with A-level STIR/SHAKEN attestation, so they show up as you — not as a warning.' },
    { icon: 'ri-message-2-fill', tone: 'teal', visual: 'sms', title: 'Text-enabled', short: 'Verification handled', text: 'Send and receive texts on the same number. Toll-free carrier verification is done during onboarding.' },
    { icon: 'ri-git-branch-fill', tone: 'violet', visual: 'route', title: 'Routes like any line', short: 'IVR, queues, AI', text: 'Point it at a phone menu, a queue, a person or the AI receptionist — and change it any time.' },
    { icon: 'ri-arrow-left-right-fill', tone: 'slate', visual: 'port', title: 'Bring your own number', short: 'Keep your number', text: 'Already have a toll-free number? Port it in and keep it ringing while it moves.' },
  ],
  usage: {
    kicker: 'Inbound minutes',
    title: 'Minutes included. Overflow you can see coming.',
    intro: 'Every plan includes a monthly inbound toll-free allowance. Usage is visible every day, and alerts fire before you hit the line — so overflow never comes as a surprise.',
    points: ['Allowance resets on the 1st of every month', 'Daily usage in the admin panel', 'Alerts at 80%, 90% and 100%', 'Overflow shown before it adds up'],
  },
  audienceTitle: 'When you want to sound national',
  audience: [
    { icon: 'ri-customer-service-2-fill', tone: 'teal', title: 'Support lines', text: 'A free number customers trust to call.', where: 'Help page', number: '1 (800) 555-HELP' },
    { icon: 'ri-megaphone-fill', tone: 'rose', title: 'Marketing campaigns', text: 'Memorable vanity numbers for ads and print.', where: 'Radio spot', number: '1-888-GO-NORTH' },
    { icon: 'ri-store-2-fill', tone: 'amber', title: 'Growing businesses', text: 'A national presence without national overhead.', where: 'Website header', number: '1 (877) 412-0218' },
    { icon: 'ri-bar-chart-box-fill', tone: 'green', title: 'Campaign tracking', text: 'A different number per channel to see what works.', where: 'Billboard vs. TV', number: '1 (833) 561-0084' },
  ],
  related: ['/features/auto-attendant/', '/products/ai/ai-receptionist/', '/features/call-recording/', '/products/cloud-phone/sms-mms/'],
  faq: [
    { q: 'Are vanity numbers different from standard ones?', a: 'They work exactly the same. Premium vanity numbers are priced separately, and any charge is shown before you pick one.' },
    { q: 'Can I bring my existing toll-free number?', a: 'Yes. Porting usually takes 10–14 business days, and your number stays live meanwhile.' },
    { q: 'Can toll-free numbers send texts?', a: 'Yes. We handle the carrier verification toll-free texting requires as part of onboarding.' },
    { q: 'How does inbound usage work?', a: 'Each plan includes inbound minutes that reset monthly. Daily usage is in the admin panel, with alerts at 80%, 90% and 100%.' },
    { q: 'Is 833 as good as 800?', a: 'Yes. All seven prefixes are free to call and work identically. 800 is the most familiar; newer prefixes like 833 have far more vanity choices left.' },
    { q: 'Who can call a toll-free number for free?', a: 'Callers across the US and Canada. You can also choose which regions your number accepts calls from.' },
  ],
});

add({
  path: '/products/cloud-phone/team-chat/',
  section: 'features',
  title: 'Team Chat',
  layout: 'teamchat', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Team chat',
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-mountain-sunrise-teal-orange-176b9d15.png',
  panelStyle: 'integrated',
  heroMock: 'team-chat', // working chat window in the hero
  heroCta: { label: 'Book a demo', href: '/sign-up?intent=demo' }, // + 'Talk to sales', as on Unified
  statsInHero: true,
  icon: 'ri-discuss-fill', tone: 'teal',
  summary: 'Channels and DMs wired into your phones.',
  headline: 'Chat that turns into a call in one click.',
  lede: 'Channels, DMs and threads live right beside your phone system — so a quick question mid-call gets a quick answer, and a thread can become a huddle without switching apps.',
  ticks: ['Unlimited channels', 'One-click huddles', 'Works alongside Slack'],
  stats: [
    { value: '1 click', label: 'from thread to voice or video' },
    { value: 'Unlimited', label: 'channels and DMs' },
    { value: '2-way', label: 'Slack bridge' },
    { value: 'Encrypted', label: 'in transit and at rest' },
  ],
  capKicker: 'What you get',
  capTitle: 'Everything a team chat needs — plus the phone',
  capIntro: 'Your team already chats somewhere. The difference here is that every conversation sits next to your calls, your numbers and your customers.',
  capabilities: [
    { icon: 'ri-hashtag', tone: 'teal', title: 'Channels & DMs', short: 'Public, private, group', text: 'Unlimited public and private channels, plus direct and group messages — no plan-based limits.', tag: 'Unlimited' },
    { icon: 'ri-chat-thread-fill', tone: 'blue', title: 'Threads & mentions', short: 'Stay on topic', text: 'Threaded replies keep channels readable; @mentions and drag-and-drop files keep work moving.', tag: 'Files included' },
    { icon: 'ri-live-fill', tone: 'violet', title: 'One-click huddles', short: 'Voice or video', text: 'Turn any thread into a voice or video huddle without losing the conversation that led to it.', tag: 'Voice + video' },
    { icon: 'ri-user-follow-fill', tone: 'green', title: 'Smart presence', short: 'Calls, meetings, focus', text: 'Status updates itself when you are on a call, in a meeting or in focus time — nobody has to remember.', tag: 'Automatic' },
    { icon: 'ri-notification-off-fill', tone: 'amber', title: 'Calendar-aware DND', short: 'Quiet when it matters', text: 'Notifications pause during meetings, focus blocks and live calls, then catch you up afterwards.', tag: 'Calendar sync' },
    { icon: 'ri-links-fill', tone: 'rose', title: 'Slack bridge', short: 'Two-way sync', text: 'Messages and files sync both ways, so teams can move over gradually instead of all at once.', tag: 'Two-way' },
    { icon: 'ri-user-shared-fill', tone: 'slate', title: 'Guest access', short: 'Per-channel permissions', text: 'Invite clients and partners into the channels they need — and nothing else.', tag: 'Permissions' },
    { icon: 'ri-phone-fill', tone: 'blue', title: 'Calls in the same app', short: 'Phone built in', text: 'Call a teammate or a customer from the same window you chat in — same number, same history.', tag: 'Phone built in' },
  ],
  bridge: {
    kicker: 'Slack bridge',
    title: 'Keep Slack. Add the phone.',
    intro: 'Nobody has to switch overnight. The two-way bridge mirrors channels, messages and files, so call-related conversations live next to your phone system while everything else carries on as usual.',
    points: ['Messages and files sync both ways', 'Channels mirror across both tools', 'Roll out team by team — no big-bang migration'],
  },
  presence: {
    kicker: 'Presence',
    title: 'A status that knows when to leave you alone',
    intro: 'Presence follows your calls and your calendar, so teammates know when to message — and when to wait.',
  },
  beforeAfter: {
    kicker: 'Before and after',
    title: 'A question comes up mid-call',
    intro: 'A customer asks something only a colleague can answer. Here is what happens next.',
    before: { label: 'Chat and phone in separate apps', time: '~4 minutes', steps: ['Put the customer on hold', 'Switch to the chat app', 'Find who knows the answer', 'Paste a meeting link and wait', 'Come back and pick up the call'] },
    after: { label: 'Team Chat beside the phone', time: '~30 seconds', steps: ['Ask in the account channel without leaving the call', 'See who is free from their presence', 'Start a huddle from the thread if needed'] },
  },
  audienceTitle: 'For teams that talk to customers all day',
  audience: [
    { icon: 'ri-funds-fill', tone: 'green', title: 'Sales & deal rooms', text: 'Pull in an expert mid-call without leaving the line.', scene: {ask: "Can someone confirm the multi-year price for Acme?",who: "PS",answer: "Yes — 10% on a two-year term. Sending it now.",time: "Answered while still on the call"} },
    { icon: 'ri-customer-service-2-fill', tone: 'teal', title: 'Support teams', text: 'Ask for help in a thread while the customer waits.', scene: {ask: "Customer says their porting is stuck — who owns number moves?",who: "DO",answer: "Me. Starting a huddle so we can fix it live.",time: "Customer stayed on the line"} },
    { icon: 'ri-refresh-fill', tone: 'blue', title: 'Renewal & account teams', text: 'Keep every account conversation in one channel.', scene: {ask: "Where are the Northwind renewal notes?",who: "MK",answer: "Pinned in #cs-renewals — I’ll join the 2 pm call.",time: "Every account in one channel"} },
    { icon: 'ri-macbook-fill', tone: 'violet', title: 'Distributed teams', text: 'Presence that shows who is free, wherever they are.', scene: {ask: "Who’s free to cover the Paris queue?",who: "PS",answer: "I’m active until 6 — I’ve got it.",time: "Presence shows who’s around"} },
  ],
  related: ['/products/cloud-phone/video-meetings/', '/unified-communication/', '/products/cloud-phone/phone-system/', '/solutions/remote-teams/'],
  relatedTitle: 'Part of one workspace',
  relatedIntro: 'Team Chat isn’t another app to manage. It shares one login, one directory and one history with the rest of the platform.',
  relatedLinks: {
    '/products/cloud-phone/video-meetings/': { pill: 'Huddle → meeting', text: 'When a huddle needs screens and slides, move it into a full video meeting.' },
    '/unified-communication/': { pill: 'One login', text: 'Chat, calls, video, SMS and fax under one account and one admin console.' },
    '/products/cloud-phone/phone-system/': { pill: 'Chat → call', text: 'Call a teammate’s extension straight from a DM or channel.' },
    '/solutions/remote-teams/': { pill: 'Any device', text: 'Presence and chat follow each person to desktop, web and mobile.' },
  },
  faq: [
    { q: 'Do we have to stop using Slack?', a: 'No. The two-way Slack bridge keeps messages and files in sync, so you can move over team by team at your own pace.' },
    { q: 'Can a chat really become a call?', a: 'Yes. Any thread can turn into a voice or video huddle with one click, and the people in the thread are invited automatically.' },
    { q: 'Can external guests join?', a: 'Yes. Guests can be invited into specific channels only, with their own permissions.' },
    { q: 'Does presence use our calendar?', a: 'Yes. Status changes automatically for calls and calendar meetings, and do-not-disturb follows your focus blocks.' },
    { q: 'Is file storage included?', a: 'Yes — each user has a storage allowance included with their seat.' },
    { q: 'Is chat secure?', a: 'Messages and files are encrypted in transit and at rest.' },
  ],
});

add({
  path: '/products/cloud-phone/video-meetings/',
  section: 'features',
  title: 'HD Video Meetings',
  layout: 'video', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Video meetings',
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-wildflowers-dusk-navy-orange-092165bd.png',
  panelStyle: 'integrated',
  heroMock: 'video', // working meeting room with live transcript in the hero
  heroCta: { label: 'Book a demo', href: '/sign-up?intent=demo' }, // + 'Talk to sales', as on Unified
  statsInHero: true,
  icon: 'ri-vidicon-fill', tone: 'violet',
  summary: '200-seat meetings with AI-written notes.',
  headline: 'Meetings that write their own notes.',
  lede: 'HD video for up to 200 people, a live transcript while you talk, and a summary with action items and owners about 30 seconds after you hang up. Guests join from a browser — nothing to install.',
  ticks: ['No time limit on paid plans', 'Browser join for guests', 'AI notes after every call'],
  stats: [
    { value: '200', label: 'participants per meeting' },
    { value: '~30s', label: 'to an AI summary after the call' },
    { value: '50', label: 'breakout rooms' },
    { value: '0', label: 'installs needed for guests' },
  ],
  after: {
    kicker: 'After you hang up',
    title: 'The meeting ends. The follow-up is already done.',
    intro: 'Most video tools stop at the call. The useful part is what comes next — the decisions, the tasks, the recap for whoever missed it. That part runs on its own.',
    steps: [
      { time: '0:00', icon: 'ri-phone-fill', title: 'Everyone hangs up', text: 'Recording and transcript close automatically.' },
      { time: '0:30', icon: 'ri-sparkling-2-fill', title: 'Summary arrives', text: 'Decisions and key points, sent to every attendee.' },
      { time: '0:35', icon: 'ri-task-fill', title: 'Tasks get owners', text: 'Action items pulled from the conversation and assigned.' },
      { time: '1:00', icon: 'ri-search-2-fill', title: 'Searchable forever', text: 'Recording and transcript indexed, synced to the CRM.' },
    ],
  },
  capKicker: 'What meetings need',
  capTitle: 'Six things. All built in.',
  capIntro: 'No add-ons, no separate video plan — it comes with every phone seat.',
  capabilities: [
    { icon: 'ri-hd-fill', tone: 'violet', spec: '200', unit: 'people', title: 'HD, adaptive video', short: 'Up to 200 people', text: 'Adaptive bitrate keeps video and audio smooth on any connection, from fibre to hotel Wi-Fi.' },
    { icon: 'ri-file-text-fill', tone: 'blue', spec: '~30s', unit: 'to summary', title: 'Transcripts & summaries', short: 'Searchable', text: 'A live, speaker-labelled transcript during the call and a clean summary sent to attendees after it.' },
    { icon: 'ri-task-fill', tone: 'green', spec: 'Auto', unit: 'owners tagged', title: 'Action items with owners', short: 'Nothing slips', text: 'Follow-ups are pulled out of the conversation and assigned to the person who said they’d do it.' },
    { icon: 'ri-record-circle-fill', tone: 'rose', spec: 'Cloud', unit: 'recording', title: 'Cloud recording', short: 'Your retention rules', text: 'Record any meeting with the transcript attached, kept for as long as your policy says.' },
    { icon: 'ri-layout-grid-fill', tone: 'amber', spec: '50', unit: 'breakouts', title: 'Breakouts & screen share', short: 'Workshops', text: 'Up to 50 breakout rooms and multi-person screen sharing for workshops and training.' },
    { icon: 'ri-global-fill', tone: 'teal', spec: '0', unit: 'installs', title: 'Browser join for guests', short: 'Just a link', text: 'Guests click the link and they’re in, from any modern browser. Apps are there if you want them.' },
  ],
  schedule: {
    kicker: 'Scheduling',
    title: 'Book it from the calendar you already use',
    intro: 'One click from Google, Outlook or iCal. The meeting link and a US dial-in number are added to the invite automatically, for anyone on a weak connection.',
    security: {
      title: 'Secure by default',
      text: 'Meetings are encrypted in transit and at rest, and recordings stay in your account under the retention you set.',
      points: ['Encrypted in transit and at rest', 'Recordings stay in your account', 'Waiting room and host controls', 'Retention you configure'],
    },
  },
  audienceTitle: 'For meetings that need to lead somewhere',
  audience: [
    { icon: 'ri-team-fill', tone: 'teal', title: 'Internal planning', text: 'Decisions and owners captured automatically.', agenda: ['Q3 priorities', 'Owners & dates'] },
    { icon: 'ri-shake-hands-fill', tone: 'amber', title: 'Client calls', text: 'Professional meetings guests join in one click.', agenda: ['Proposal walkthrough', 'Next steps'] },
    { icon: 'ri-macbook-fill', tone: 'blue', title: 'Distributed teams', text: 'Face time across time zones, notes for whoever missed it.', agenda: ['Weekly sync', 'Recap for APAC'] },
    { icon: 'ri-graduation-cap-fill', tone: 'violet', title: 'Training & workshops', text: 'Breakouts and recordings for every session.', agenda: ['Group exercise', '6 breakout rooms'] },
  ],
  related: ['/products/cloud-phone/team-chat/', '/unified-communication/', '/features/conversation-intelligence/', '/solutions/remote-teams/'],
  faq: [
    { q: 'Do guests need to install an app?', a: 'No. Guests join from any modern browser with a link. Desktop and mobile apps are optional.' },
    { q: 'Is recording included?', a: 'Yes. Cloud recording is included, with the transcript attached and retention you control.' },
    { q: 'Is there a meeting time limit?', a: 'Not on paid plans — meetings run as long as you need.' },
    { q: 'How accurate are the transcripts?', a: 'Transcripts are speaker-labelled and highly accurate on clear audio, and you can search or correct them after the call.' },
    { q: 'Can people join by phone?', a: 'Yes. Every invite includes a US dial-in number for anyone without a good internet connection.' },
    { q: 'How are meetings secured?', a: 'Meetings are encrypted in transit and at rest, with waiting rooms, host controls, and recordings that stay in your account.' },
  ],
});

add({
  path: '/products/cloud-phone/sms-mms/',
  section: 'features',
  title: 'Business SMS & MMS',
  layout: 'sms', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Business texting',
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-hills-bird-flock-pink-teal-707ecd1f.png',
  panelStyle: 'integrated',
  heroMock: 'sms', // working business texting window in the hero
  heroCta: { label: 'Book a demo', href: '/sign-up?intent=demo' }, // + 'Talk to sales', as on Unified
  statsInHero: true,
  icon: 'ri-message-2-fill', tone: 'teal',
  summary: 'Two-way texting on your number, 10DLC-ready.',
  headline: 'Text customers from your business number — compliant from day one.',
  lede: 'Two-way SMS and MMS from the number customers already know, with carrier registration handled for you and a shared inbox so your whole team can reply.',
  ticks: ['Registration done for you', 'STOP/HELP handled', 'Shared team inbox'],
  stats: [
    { value: '10DLC', label: 'registration filed for you' },
    { value: 'MMS', label: 'photos, PDFs and links' },
    { value: 'STOP/HELP', label: 'opt-outs handled automatically' },
    { value: '1', label: 'shared inbox for the team' },
  ],
  capKicker: 'What you get',
  capTitle: 'Texting your team will actually use',
  capIntro: 'Customers answer a text long before they pick up an unknown call. Everything below runs from your existing business number.',
  capabilities: [
    { icon: 'ri-chat-1-fill', tone: 'teal', title: 'Two-way SMS & MMS', short: 'Images, video, docs', text: 'Send photos, short videos and documents as well as text — and get replies in the same thread.', sample: { dir: 'in', text: '📷 Here’s the photo of the damaged box.' } },
    { icon: 'ri-file-copy-2-fill', tone: 'blue', title: 'Templates & merge fields', short: 'Personal at scale', text: 'Reusable templates that fill in names, dates and order details automatically.', sample: { dir: 'out', text: 'Hi {first_name}, your order {order_id} ships today 📦' } },
    { icon: 'ri-calendar-schedule-fill', tone: 'amber', title: 'Scheduled sends & drips', short: 'Set and forget', text: 'Schedule reminders and multi-step follow-ups in advance, in the customer’s time zone.', sample: { dir: 'out', text: 'Reminder: your appointment is tomorrow at 10:00. Reply C to confirm.', meta: 'Scheduled · Tue 9:00' } },
    { icon: 'ri-robot-2-fill', tone: 'violet', title: 'Auto-replies & keywords', short: 'After hours, keywords', text: 'Answer common questions instantly and route keywords like HOURS or PRICE to the right reply.', sample: { dir: 'out', text: 'We’re open 8–6, Mon–Sat. A teammate will reply first thing tomorrow.', meta: 'Auto-reply · after hours' } },
    { icon: 'ri-shield-check-fill', tone: 'green', title: 'STOP / HELP built in', short: 'Opt-outs automatic', text: 'Opt-out and help keywords are honoured automatically and logged, so you stay on the right side of the rules.', sample: { dir: 'out', text: 'You’re unsubscribed and won’t receive more messages. Reply START to rejoin.', meta: 'Sent automatically' } },
    { icon: 'ri-contacts-book-3-fill', tone: 'slate', title: 'CRM sync', short: 'HubSpot, Zoho, Pipedrive', text: 'Every text lands on the contact record next to calls, so nobody has to copy and paste.', sample: { dir: 'note', text: 'Logged to HubSpot · Maya Patel · 10:44' } },
  ],
  register: {
    kicker: '10DLC, done for you',
    title: 'Four steps to texting. We handle three of them.',
    intro: 'Business texting on local US numbers needs brand and campaign registration with the carriers. We run the whole process for you, from brand vetting to carrier approval.',
    steps: [
      { who: 'us', title: 'Register your brand', text: 'We file your business details with the carrier registry. Vetting usually takes a few days.', time: '1–3 days' },
      { who: 'us', title: 'Submit your campaign', text: 'Marketing, account alerts or one-time codes — we match your messages to the right use case.', time: 'Same day' },
      { who: 'us', title: 'Carrier approval', text: 'Carriers review the campaign. Most are approved within about two weeks.', time: '~7–14 days' },
      { who: 'you', title: 'Start texting', text: 'Send and reply right away, while we watch delivery and sender reputation in the background.', time: 'Live' },
    ],
  },
  inbox: {
    kicker: 'Shared inbox',
    title: 'One inbox the whole team can work from',
    intro: 'Every conversation sits on the contact record. Teammates see who replied last, leave internal notes and pick up threads without stepping on each other.',
    points: ['See who replied last on every thread', 'Internal notes customers never see', 'Auto-assign by keyword or campaign', 'Text and call history in one place'],
  },
  audienceTitle: 'Wherever a text beats a call',
  audience: [
    { icon: 'ri-shopping-bag-3-fill', tone: 'rose', title: 'eCommerce updates', text: 'Order, shipping and delivery notifications.', sample: 'Your order #4821 is out for delivery today 🚚 Track it: brightfield.co/t/4821' },
    { icon: 'ri-calendar-check-fill', tone: 'amber', title: 'Appointment reminders', text: 'Fewer no-shows with automatic reminders.', sample: 'Hi Sam, see you tomorrow at 3:30 pm with Dr. Lee. Reply C to confirm or R to reschedule.' },
    { icon: 'ri-customer-service-2-fill', tone: 'teal', title: 'Customer support', text: 'Answer questions customers prefer to text.', sample: 'Thanks for the photo — we’re sending a replacement today, no need to return the old one.' },
    { icon: 'ri-lock-password-fill', tone: 'slate', title: 'Alerts & one-time codes', text: 'Time-sensitive messages that arrive reliably.', sample: 'Your sign-in code is 482 913. It expires in 10 minutes. Never share it.' },
  ],
  related: ['/products/cloud-phone/phone-system/', '/numbers/toll-free/', '/solutions/retail/', '/unified-communication/'],
  faq: [
    { q: 'What is 10DLC and do I need it?', a: '10DLC is the US carrier registration for business texting on local numbers. If you text US customers from a local number, you need it — and we handle the registration for you.' },
    { q: 'How long does approval take?', a: 'Brand vetting usually takes a few days and campaign approval up to around two weeks, depending on the carriers.' },
    { q: 'Are there carrier registration fees?', a: 'Carriers charge registration fees for 10DLC. Our team will walk you through what applies to your campaign before you register.' },
    { q: 'Can I send pictures and files?', a: 'Yes. MMS supports images, short videos and documents in the US and Canada.' },
    { q: 'What happens when someone replies STOP?', a: 'They are unsubscribed straight away, sent a confirmation, and the opt-out is logged so they will not be messaged again unless they reply START.' },
    { q: 'Can the whole team text from one number?', a: 'Yes. The shared inbox lets several people reply from the same business number, with assignment and internal notes so nobody doubles up.' },
  ],
});

add({
  path: '/products/cloud-phone/online-fax/',
  section: 'features',
  title: 'Online Fax',
  layout: 'fax', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Online fax · add-on',
  eyebrowStyle: 'badge',
  heroArt: '/media/footer-sky-dusk.webp',
  panelStyle: 'integrated',
  heroMock: 'fax', // working fax composer + inbox in the hero
  statsInHero: true,
  icon: 'ri-printer-fill', tone: 'slate',
  summary: 'Encrypted e-fax with a full audit trail.',
  headline: 'Fax without a fax machine — and with an audit trail.',
  lede: 'Send and receive faxes from email, the web or your phone. Every page is encrypted, searchable and logged, and lands in the same inbox as your calls and voicemail.',
  ticks: ['No machine or phone line', 'Encrypted & logged', 'BAA for healthcare'],
  stats: [
    { value: '99.9%', label: 'delivery rate' },
    { value: 'AES-256', label: 'encryption' },
    { value: 'BAA', label: 'included for healthcare' },
    { value: '$0', label: 'setup fee' },
  ],
  channels: {
    kicker: 'Send from where you work',
    title: 'Three ways to send. One record of every page.',
    intro: 'Healthcare, legal and finance still run on fax. You don’t have to run on a fax machine — send from the tools you already have open.',
    items: [
      { id: 'email', icon: 'ri-mail-send-line', label: 'Email', title: 'Email to fax', text: 'Send to the fax number @ your fax domain and attach the PDF. Replies come back to your inbox as attachments.' },
      { id: 'web', icon: 'ri-computer-line', label: 'Web app', title: 'Web composer', text: 'Drag in a file, add a cover page and send to one recipient or a whole list — with one confirmation report.' },
      { id: 'mobile', icon: 'ri-smartphone-line', label: 'Mobile', title: 'From your phone', text: 'Scan a signed page with the camera and fax it in seconds, wherever you are.' },
    ],
  },
  capKicker: 'What you get',
  capTitle: 'Modern fax, audit-ready',
  capIntro: 'Everything a fax-heavy team needs — and nothing that needs a phone closet.',
  capabilities: [
    { icon: 'ri-mail-send-fill', tone: 'blue', title: 'Send from anywhere', short: 'Email, web, mobile', text: 'Reply-to-fax from your email client, or use the web and mobile composer.' },
    { icon: 'ri-inbox-2-fill', tone: 'teal', title: 'One inbox', short: 'With calls & voicemail', text: 'Incoming faxes arrive beside your calls and voicemail — no separate tool to watch.' },
    { icon: 'ri-stack-fill', tone: 'violet', title: 'Batch sending', short: 'One confirmation', text: 'One file, many recipients, and a single delivery report for all of them.' },
    { icon: 'ri-quill-pen-fill', tone: 'amber', title: 'E-signature', short: 'DocuSign & more', text: 'Sign with DocuSign, Dropbox Sign or Adobe Sign and fax it back without printing.' },
    { icon: 'ri-file-search-fill', tone: 'green', title: 'Searchable PDFs', short: 'Find any page', text: 'Every fax is stored as a text-searchable PDF, so you can find a page by what it says.' },
    { icon: 'ri-shield-check-fill', tone: 'slate', title: 'Audit-ready', short: 'Logs on every fax', text: 'Encryption, access controls and a log entry for every send, view and forward.' },
  ],
  audit: {
    kicker: 'Audit trail',
    title: 'Every page accounted for',
    intro: 'Regulators don’t ask whether you faxed it — they ask who saw it and when. Each fax keeps its own tamper-evident history.',
    points: ['Encrypted in transit and at rest (AES-256)', 'BAA included for healthcare customers', 'Role-based access to fax inboxes', 'Retention set to your policy'],
  },
  addon: {
    kicker: 'Why it’s an add-on',
    title: 'Fax-heavy teams pay for fax. Everyone else doesn’t.',
    intro: 'Most teams barely fax; the ones that do, fax a lot. Turning fax on only for the seats that need it keeps the base plan lean for everyone else.',
  },
  audienceTitle: 'Where fax is non-negotiable',
  audience: [
    { icon: 'ri-hospital-fill', tone: 'rose', title: 'Healthcare', text: 'Referrals, prior authorizations and prescriptions.', docs: ['Patient referral', 'Prior authorization'] },
    { icon: 'ri-scales-3-fill', tone: 'violet', title: 'Legal', text: 'Court filings, sign-offs and discovery documents.', docs: ['Court filing', 'Signed agreement'] },
    { icon: 'ri-bank-fill', tone: 'green', title: 'Finance', text: 'Loan documents, KYC packages and regulatory filings.', docs: ['Loan package', 'KYC documents'] },
    { icon: 'ri-government-fill', tone: 'slate', title: 'Public sector', text: 'Forms and agencies that still require a fax line.', docs: ['Permit application', 'Benefits form'] },
  ],
  related: ['/products/cloud-phone/phone-system/', '/features/call-recording/', '/solutions/finance/', '/unified-communication/'],
  faq: [
    { q: 'Can I keep my existing fax number?', a: 'Yes. Fax numbers port in roughly 10–14 business days, and the old number keeps working until the move completes.' },
    { q: 'Is fax included in every plan?', a: 'Fax is an add-on, switched on only for the seats that need it.' },
    { q: 'Is it HIPAA-friendly?', a: 'Faxes are encrypted and every action is logged, and a BAA is included for healthcare customers.' },
    { q: 'Do I need a phone line or machine?', a: 'No — everything runs in the cloud. You send and receive from email, the web app or your phone.' },
    { q: 'Can I send one fax to many recipients?', a: 'Yes. Batch sending delivers one document to a whole list and gives you a single confirmation report.' },
    { q: 'What file types can I fax?', a: 'PDF, Word, images and most common office formats — they’re converted to fax pages automatically.' },
  ],
});

/* ═══ FEATURES · Core & AI ═══════════════════════════════════════════════ */

add({
  path: '/features/supervisor-tools/',
  section: 'features',
  title: 'Supervisor Tools',
  layout: 'supervisor', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Supervisor tools',
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-butte-mesa-indigo-amber-9d6c81af.png',
  panelStyle: 'integrated',
  heroMock: 'supervisor', // working supervisor floor in the hero
  statsInHero: true,
  icon: 'ri-headphone-fill', tone: 'teal',
  summary: 'Live monitoring — listen, whisper, barge.',
  headline: 'Step into the calls that matter — the moment they matter.',
  lede: 'Listen silently, coach the agent in their ear, or join the call. AI ranks every live conversation by risk, so supervisors spend their time where it counts — and every action is logged.',
  ticks: ['Monitor, whisper, barge', 'AI-ranked live calls', 'Audit log on every action'],
  stats: [
    { value: '3', label: 'modes: monitor, whisper, barge' },
    { value: '4s', label: 'live re-ranking of active calls' },
    { value: '100%', label: 'of supervisor actions logged' },
    { value: 'Voice + chat', label: 'same tools on every channel' },
  ],
  statement: 'A supervisor with forty agents can’t hear every call. Random sampling misses the moments that matter — so let AI point to them, and be on the call in one click.',
  modes: {
    kicker: 'Three modes · one click',
    title: 'Choose how present you want to be',
    intro: 'Same call, three ways to be on it. Pick a mode to see exactly who hears whom — and what the customer is told when you join.',
  },
  radar: {
    kicker: 'AI attention radar',
    title: 'The call that needs you is already on screen',
    intro: 'AI watches every live conversation and plots the ones that need a supervisor. Closer to the centre means more urgent; filter by the signal that raised them.',
  },
  capKicker: 'What you get',
  capTitle: 'Coaching in the moment, with proof',
  capIntro: 'Everything runs from one floor view, with a shortcut for each action so supervisors never hunt for a button.',
  capabilities: [
    { icon: 'ri-headphone-fill', tone: 'teal', key: 'M', title: 'Silent monitor', short: 'Listen unnoticed', text: 'Hear any live call without the agent or customer knowing — for QA, shadowing or triage.' },
    { icon: 'ri-user-voice-fill', tone: 'violet', key: 'W', title: 'Whisper', short: 'Agent-only coaching', text: 'Speak into the agent’s ear: prompt the offer, the disclosure or the save. The customer never hears you.' },
    { icon: 'ri-group-fill', tone: 'blue', key: 'B', title: 'Barge', short: 'Join the call', text: 'Step in as a third party when a call needs a senior voice — with the right disclosure played first.' },
    { icon: 'ri-radar-fill', tone: 'rose', key: 'R', title: 'AI attention radar', short: 'Ranks calls by risk', text: 'Sentiment drops, missed disclosures, SLA risk and long silences float to the top, re-ranked every few seconds.' },
    { icon: 'ri-scales-3-fill', tone: 'amber', key: 'D', title: 'State-aware disclosure', short: 'One- & two-party rules', text: 'The right recording and monitoring notice plays automatically for each state or region.' },
    { icon: 'ri-file-list-3-fill', tone: 'slate', key: 'L', title: 'Full audit log', short: 'Stream to your SIEM', text: 'Every monitor, whisper and barge is logged with who, when and which call — and exportable.' },
  ],
  audienceTitle: 'For leaders running live queues',
  audience: [
    { icon: 'ri-customer-service-2-fill', tone: 'teal', title: 'Contact-center supervisors', text: 'Cover a whole floor without random sampling.', view: 'Floor view · ranked calls' },
    { icon: 'ri-medal-fill', tone: 'amber', title: 'QA teams', text: 'Evidence attached to every intervention.', view: 'Audit log · exports' },
    { icon: 'ri-graduation-cap-fill', tone: 'blue', title: 'Training leads', text: 'Coach new agents on real calls, in their ear.', view: 'Whisper · shadowing' },
    { icon: 'ri-alarm-warning-fill', tone: 'rose', title: 'Escalation desks', text: 'Catch at-risk calls before they become complaints.', view: 'Radar · risk alerts' },
  ],
  related: ['/features/ai-sentiment/', '/products/contact-center/agent-assist/', '/features/conversation-intelligence/', '/features/call-recording/'],
  faq: [
    { q: 'Can agents tell when they are being monitored?', a: 'Not in silent monitor mode. In whisper mode only the agent hears you; in barge mode everyone does.' },
    { q: 'Does it work on chat?', a: 'Yes. Monitor, whisper and barge work on chat and messaging conversations too.' },
    { q: 'How does it handle disclosure laws?', a: 'Disclosure rules are set per state or region — for example two-party consent in California — and the right notice plays automatically before you join.' },
    { q: 'What does the AI radar look at?', a: 'Sentiment trend, missed disclosures, SLA risk, raised voices, price push-back and long silences, re-ranked every few seconds.' },
    { q: 'Is every supervisor action recorded?', a: 'Yes. Each monitor, whisper and barge is written to the audit log and can be streamed to your SIEM.' },
    { q: 'Is it an add-on?', a: 'No. All three modes, the radar and the audit log are included in the plan.' },
  ],
});

add({
  path: '/products/ai/ai-receptionist/',
  section: 'features',
  title: 'AI Receptionist',
  layout: 'receptionist', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'AI receptionist',
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-grasses-crescent-moon-navy-00d063b3.png',
  panelStyle: 'integrated',
  heroMock: 'receptionist', // working multilingual test call in the hero
  statsInHero: true,
  icon: 'ri-mic-ai-fill', tone: 'violet',
  summary: '24/7 live answering that books and routes.',
  headline: 'Every call answered, qualified and booked — around the clock.',
  lede: 'A natural-sounding AI receptionist picks up 24/7 in the caller’s language, asks your intake questions, books the appointment and hands off to your team with full context when it should.',
  ticks: ['Answers 24/7', '32 languages', 'Books & logs to your CRM'],
  stats: [
    { value: '24/7', label: 'answering, including holidays' },
    { value: '32', label: 'languages, auto-detected' },
    { value: '40+', label: 'natural voices' },
    { value: '~180ms', label: 'response latency' },
  ],
  hours: {
    kicker: 'Always on',
    title: 'Your customers don’t call between nine and five',
    intro: 'The question occurs to them at 11 PM, on a Sunday, or while your front desk is on another line. Compare a day of calls with and without an AI receptionist.',
  },
  jobs: {
    kicker: 'On every call',
    title: 'Five jobs, one call',
    intro: 'From hello to a clean CRM record without a hand-off — and a person is looped in only when they should be.',
    steps: [
      { icon: 'ri-phone-fill', title: 'Answers', text: 'Picks up instantly, day or night, and detects the caller’s language in under a second.', example: 'Detected: Español' },
      { icon: 'ri-questionnaire-fill', title: 'Qualifies', text: 'Asks your intake questions in the caller’s language and records the answers cleanly.', example: 'Insurance · BlueCross PPO' },
      { icon: 'ri-calendar-check-fill', title: 'Books', text: 'Schedules straight into Google, Outlook or iCal and confirms by text.', example: 'Fri · 2:30 PM · confirmed' },
      { icon: 'ri-file-text-fill', title: 'Summarizes', text: 'Writes the call summary and action items onto the contact in your CRM.', example: 'Logged · Maria Sosa' },
      { icon: 'ri-user-shared-fill', title: 'Transfers', text: 'Hands off to the right person when the call needs it — never a cold transfer.', example: 'To Dr. Patel · notes attached' },
    ],
  },
  languages: {
    kicker: 'Multilingual',
    title: '32 languages. One voice quality.',
    intro: 'The same model, the same speed and the same studio-quality voice whether the caller speaks Mandarin, Portuguese, Tagalog or Hindi. Pick a language to hear how she answers.',
    points: ['Detects the caller’s language in under a second', 'Switches mid-call if the caller does', 'Your brand voice, consistent in every language'],
  },
  handoff: {
    kicker: 'Your rules',
    title: 'You decide when a person takes over',
    intro: 'Set the moments that should reach a human — and what she does the rest of the time. Switch rules on and off to see how calls are handled.',
  },
  capKicker: 'What you get',
  capTitle: 'A front desk that never clocks out',
  capabilities: [
    { icon: 'ri-translate-2', tone: 'blue', title: 'Speaks their language', short: 'Switches mid-call', text: 'Detects the caller’s language in moments and switches if they do.' },
    { icon: 'ri-questionnaire-fill', tone: 'violet', title: 'Your intake questions', short: 'Qualifies every caller', text: 'Asks exactly what your team would ask, in your tone.' },
    { icon: 'ri-calendar-check-fill', tone: 'amber', title: 'Books appointments', short: 'Google, Outlook, iCal', text: 'Schedules straight into your calendar and confirms by text.' },
    { icon: 'ri-file-text-fill', tone: 'green', title: 'Summaries to your CRM', short: 'HubSpot, Zoho, Pipedrive', text: 'Writes a call summary with action items onto the contact record.' },
    { icon: 'ri-user-shared-fill', tone: 'teal', title: 'Warm transfers', short: 'With full context', text: 'Hands off to a person with the caller’s details already captured.' },
    { icon: 'ri-bank-card-fill', tone: 'slate', title: 'Takes payments', short: 'Card data redacted', text: 'Collects payments on PCI-aligned plans, with card details redacted.' },
  ],
  audienceTitle: 'For businesses that can’t afford a missed call',
  audience: [
    { icon: 'ri-hospital-fill', tone: 'rose', title: 'Dental & medical practices', text: 'Bookings and triage around the clock.', line: '“Can I move my cleaning to Friday?”' },
    { icon: 'ri-tools-fill', tone: 'amber', title: 'Home & field services', text: 'Capture every job request, even on a ladder.', line: '“My boiler stopped — can someone come today?”' },
    { icon: 'ri-translate-2', tone: 'blue', title: 'Multilingual customers', text: 'Answer in 32 languages without extra staff.', line: '“¿Tienen cita para el lunes?”' },
    { icon: 'ri-moon-fill', tone: 'violet', title: 'After-hours & overflow', text: 'Nights, weekends and busy Monday mornings.', line: '“Are you open on Sunday?” — 11:42 PM' },
  ],
  related: ['/features/auto-attendant/', '/products/contact-center/agent-assist/', '/solutions/smb/', '/features/conversation-intelligence/'],
  faq: [
    { q: 'How long does setup take?', a: 'About a day with a studio voice; longer if you want a cloned brand voice or training on your own recordings.' },
    { q: 'Will callers know it is AI?', a: 'Most callers find it natural. You choose whether and how the receptionist discloses that it’s AI.' },
    { q: 'Can it take payments?', a: 'Yes, on PCI-aligned plans, with card details redacted from recordings and transcripts.' },
    { q: 'What happens when it can’t help?', a: 'It warm-transfers to your team with the caller’s details and a summary attached — or takes a message if nobody is available.' },
    { q: 'Which calendars and CRMs does it work with?', a: 'Google Calendar, Outlook and iCal for bookings, and HubSpot, Zoho and Pipedrive for call summaries.' },
    { q: 'How are minutes billed?', a: 'Plans include a monthly allowance of AI minutes; extra minutes are billed only when used, at the published rate.' },
  ],
});

add({
  path: '/features/ai-sentiment/',
  section: 'features',
  title: 'AI Sentiment Analysis',
  layout: 'sentiment', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'AI sentiment analysis',
  eyebrowStyle: 'badge',
  heroArt: '/media/dusk-sagebrush-ember-storm.webp',
  panelStyle: 'integrated',
  heroMock: 'sentiment', // live sentiment timeline with auto-routing in the hero
  statsInHero: true,
  icon: 'ri-emotion-happy-fill', tone: 'violet',
  summary: 'Real-time emotion scoring on every call.',
  headline: 'Spot frustration while the customer is still on the line.',
  lede: 'Sentiment is scored live across voice, chat, SMS and social. When a conversation turns, it’s routed to a senior agent automatically — before it turns into churn.',
  ticks: ['Scored as they speak', 'Every channel, one model', 'Auto-routing on a threshold'],
  stats: [
    { value: '92–96%', label: 'accuracy on major languages' },
    { value: '32', label: 'languages scored' },
    { value: '6', label: 'channels, one model' },
    { value: 'Live', label: 'routing on threshold breach' },
  ],
  statement: 'By the time a supervisor hears that a call went sideways, the customer has already decided to leave. Sentiment reads the temperature of every conversation while there’s still time to change it.',
  scorer: {
    kicker: 'Every channel',
    title: 'One model reads every conversation',
    intro: 'Voice, chat, SMS, WhatsApp, Instagram and email are scored the same way. Pick a channel — or type a message — to see how it reads.',
  },
  capKicker: 'What it tracks',
  capTitle: 'Signals you can act on before the conversation ends',
  capIntro: 'Sentiment isn’t a score you read tomorrow. It changes routing, alerts supervisors and saves accounts while the customer is still there.',
  capabilities: [
    { icon: 'ri-pulse-fill', tone: 'violet', visual: 'trajectory', title: 'Sentiment trajectory', short: 'Start, middle, end', text: 'See exactly when a conversation dipped — and what was said at that moment.' },
    { icon: 'ri-route-fill', tone: 'blue', visual: 'route', title: 'Automatic escalation', short: 'Threshold-based', text: 'When sentiment drops below your threshold, the conversation moves to a senior agent — no supervisor ping needed.' },
    { icon: 'ri-equalizer-fill', tone: 'amber', visual: 'threshold', title: 'Your thresholds', short: 'Per queue or campaign', text: 'Tune how sensitive it is for each queue, campaign or skill — billing isn’t sales.' },
    { icon: 'ri-alarm-warning-fill', tone: 'rose', visual: 'flag', title: 'Risk flags', short: 'Compliance patterns', text: 'Conversations that match your compliance-risk patterns are flagged for review automatically.' },
  ],
  heat: {
    kicker: 'Trend dashboards',
    title: 'See where — and when — customers get frustrated',
    intro: 'Sentiment by agent, queue, campaign and time of day, so coaching starts with a pattern instead of a hunch. Select a cell to see what’s behind it.',
  },
  langs: {
    kicker: '32 languages',
    title: 'The same model in every language',
    intro: 'Accuracy is checked against human-rated calls. Widely used languages score highest, and custom training on your own calls improves every language further.',
    tiers: [
      { name: 'Tier A', range: '92–96%', note: 'on clean audio', langs: ['English', 'Español', 'Français', 'Deutsch', 'Português', 'Italiano'] },
      { name: 'Tier B', range: '88–94%', note: 'improves with custom training', langs: ['中文', 'हिन्दी', 'العربية', '日本語', 'Nederlands', '한국어'] },
    ],
  },
  audienceTitle: 'For teams where one bad call costs an account',
  audience: [
    { icon: 'ri-refresh-fill', tone: 'blue', title: 'Retention desks', text: 'Save accounts during the call, not after.', curve: [20, -30, -62, -40, 10, 48] },
    { icon: 'ri-bank-card-fill', tone: 'slate', title: 'Billing queues', text: 'Calm tense conversations before they escalate.', curve: [-10, -35, -50, -20, 15, 30] },
    { icon: 'ri-customer-service-2-fill', tone: 'teal', title: 'Contact centers', text: 'Know which calls need a supervisor right now.', curve: [30, 12, -25, -45, -15, 22] },
    { icon: 'ri-bar-chart-box-fill', tone: 'green', title: 'CX leaders', text: 'Measure experience across every channel.', curve: [5, 18, 26, 20, 38, 52] },
  ],
  related: ['/features/conversation-intelligence/', '/features/supervisor-tools/', '/features/call-recording/', '/products/contact-center/agent-assist/'],
  faq: [
    { q: 'How accurate is it?', a: 'Around 92–96% on the most widely used languages on clean audio, and 88–94% on others — custom training on your own calls improves it further.' },
    { q: 'Does it work beyond voice?', a: 'Yes. Chat, SMS, WhatsApp, Instagram and email are scored by the same model.' },
    { q: 'Can I set my own thresholds?', a: 'Yes — per queue, campaign or skill, including how long sentiment must stay low before anything happens.' },
    { q: 'What happens when sentiment drops?', a: 'You choose: route to a senior agent, alert a supervisor, or simply flag the conversation for review.' },
    { q: 'Is it scored live or after the call?', a: 'Both. Scores update while the customer is speaking, and the full trajectory is saved with the recording afterwards.' },
    { q: 'Is it an add-on?', a: 'No. Sentiment scoring is included in the plan across every channel.' },
  ],
});

add({
  path: '/products/contact-center/agent-assist/',
  section: 'features',
  title: 'AI Agent Assist',
  layout: 'assist', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'AI agent assist',
  eyebrowStyle: 'badge',
  heroArt: '/media/desert-slope-closeup-teal-ember-0c6a7ea7.png',
  panelStyle: 'integrated',
  heroMock: 'assist', // working agent desktop with live whispers in the hero
  statsInHero: true,
  icon: 'ri-user-voice-fill', tone: 'violet',
  summary: 'Live coaching and next-best replies.',
  headline: 'Give every agent an expert coach — on every call.',
  lede: 'Agent Assist listens alongside your team and whispers objection handling, knowledge answers and compliance warnings in under a second — so new hires sound like your best people from day one.',
  ticks: ['Whispers only the agent sees', 'Voice, chat & social', 'Trained on your own data'],
  stats: [
    { value: '< 1s', label: 'coaching latency' },
    { value: '32', label: 'languages' },
    { value: 'Same day', label: 'from setup to live' },
    { value: '0', label: 'shared training data' },
  ],
  ramp: {
    kicker: 'Day-one performance',
    title: 'Close the gap between a new hire and your best agent',
    intro: 'New agents usually take months to sound like your seniors. With the right move whispered at the right moment, they start much closer — and get there faster.',
  },
  whispers: {
    kicker: 'What it whispers',
    title: 'Five kinds of help, timed to the moment',
    intro: 'Every whisper has one job, and it lands while the agent still needs it. Pick a type to see the coaching an agent would get.',
    types: [
      { id: 'obj', icon: 'ri-shield-flash-fill', tone: 'violet', label: 'Objection', title: 'Objection handling from your playbook', text: 'Responses pulled from your own knowledge base and winning calls — not generic templates.', feed: ['Reframe on value — lead with time saved in the first month.', 'Price push-back: compare total cost, not seat price.', 'Ask what “too expensive” is compared to.'] },
      { id: 'emp', icon: 'ri-heart-pulse-fill', tone: 'rose', label: 'Empathy', title: 'Empathy cues when the mood shifts', text: 'Picked up from tone of voice and word choice, the moment sentiment drops.', feed: ['Acknowledge the frustration before solving — “I hear you.”', 'Slow down — the customer sounds rushed.', 'Use their name; they’ve repeated the issue twice.'] },
      { id: 'nba', icon: 'ri-lightbulb-flash-fill', tone: 'amber', label: 'Next-best', title: 'Next-best action for saves and upsells', text: 'Suggests the move that has worked best on calls like this one.', feed: ['Offer the 14-day trial — no card needed.', 'They mentioned a second office — suggest multi-site.', 'Good moment to book a follow-up demo.'] },
      { id: 'kb', icon: 'ri-book-open-fill', tone: 'blue', label: 'Knowledge', title: 'Answers from your knowledge base', text: 'The customer asks; the right article or policy appears before they finish the question.', feed: ['Refund policy: 30 days, prorated.', 'Porting takes 10–14 business days; number stays live.', 'Article KB-204 · Carrier scan disputes.'] },
      { id: 'pol', icon: 'ri-error-warning-fill', tone: 'slate', label: 'Policy', title: 'Guardrails before a risky promise', text: 'Catches commitments the agent shouldn’t make — before they’re said.', feed: ['Don’t confirm pricing — escalate to a manager.', 'Read the recording disclosure before continuing.', 'Can’t promise a delivery date — offer tracking instead.'] },
    ],
  },
  chat: {
    kicker: 'Chat & social',
    title: 'The same coach in every inbox',
    intro: 'Suggested replies appear as the agent types, tone nudges catch a curt answer, and the right article is attached before they go looking — on web chat, WhatsApp, Instagram, Facebook, Telegram and X.',
  },
  tenant: {
    kicker: 'Private by design',
    title: 'Trained on your data. Kept in your account.',
    intro: 'Agent Assist learns from your call recordings, knowledge base and playbooks — and nothing leaves your account or trains anyone else’s model.',
    sources: [
      { icon: 'ri-record-circle-line', title: 'Your call recordings', text: 'What works on your best calls gets suggested more.' },
      { icon: 'ri-book-2-line', title: 'Your knowledge base', text: 'Help articles, wikis and runbooks, searchable in-ear.' },
      { icon: 'ri-file-list-3-line', title: 'Your playbooks', text: 'Objection handling and offers, in your words.' },
    ],
    guarantees: ['No shared training data between customers', 'Encrypted at rest', 'Retention you configure'],
  },
  setup: {
    kicker: 'Go live',
    title: 'Live in one afternoon',
    steps: [
      { icon: 'ri-plug-line', time: '~5 min', title: 'Connect your knowledge base', text: 'Point Agent Assist at your articles, policies and playbooks.' },
      { icon: 'ri-checkbox-multiple-line', time: '~2 hrs', title: 'Approve the first suggestions', text: 'Review a sample of whispers so coaching sounds like your team.' },
      { icon: 'ri-rocket-2-line', time: 'Same day', title: 'Go live', text: 'Agents get whispers on their very next call.' },
    ],
  },
  capabilities: [
    { icon: 'ri-shield-flash-fill', tone: 'violet', title: 'Objection handling', short: 'From your playbook', text: 'Suggested responses drawn from your own knowledge base.' },
    { icon: 'ri-heart-pulse-fill', tone: 'rose', title: 'Empathy cues', short: 'When sentiment shifts', text: 'Nudges agents when the customer’s mood changes.' },
    { icon: 'ri-lightbulb-flash-fill', tone: 'amber', title: 'Next-best action', short: 'Based on what wins', text: 'Recommendations based on what has worked on similar calls.' },
    { icon: 'ri-book-open-fill', tone: 'blue', title: 'Instant answers', short: 'Knowledge in < 1s', text: 'The right article or policy, surfaced before the customer finishes asking.' },
  ],
  audienceTitle: 'For teams that need consistency at scale',
  audience: [
    { icon: 'ri-funds-fill', tone: 'green', title: 'Sales & retention desks', text: 'Better saves and upsells on every call.', whisper: 'Offer the annual plan — they asked about budget twice.' },
    { icon: 'ri-customer-service-2-fill', tone: 'teal', title: 'Support centers', text: 'Faster, more accurate answers.', whisper: 'Reset steps: KB-118 · 3 steps, 2 minutes.' },
    { icon: 'ri-user-add-fill', tone: 'blue', title: 'Fast-growing teams', text: 'Ramp new hires in days, not months.', whisper: 'Confirm the account email before changing plans.' },
    { icon: 'ri-shield-check-fill', tone: 'slate', title: 'Regulated teams', text: 'Compliance warnings in the moment.', whisper: 'Read the disclosure before discussing the claim.' },
  ],
  related: ['/features/supervisor-tools/', '/features/ai-sentiment/', '/features/conversation-intelligence/', '/solutions/sales-teams/'],
  faq: [
    { q: 'Can customers hear the coaching?', a: 'No. Whispers are visible or audible only to the agent.' },
    { q: 'How is it different from a script?', a: 'It reacts to what is actually being said — objections, sentiment and questions — instead of following a fixed path.' },
    { q: 'Is our data used to train other models?', a: 'No. It learns only from your own recordings, knowledge base and playbooks, and nothing is shared between customers.' },
    { q: 'How long does deployment take?', a: 'Most teams are live the same afternoon: connect the knowledge base, approve a sample of suggestions, and go.' },
    { q: 'Does it work on chat and social?', a: 'Yes — suggested replies, tone nudges and article links work on web chat, WhatsApp, Instagram, Facebook, Telegram and X.' },
    { q: 'Which languages does it support?', a: 'Whispers work in 32 languages, including English, Spanish, French, Mandarin, Hindi, Portuguese, Japanese and Tagalog.' },
  ],
});

add({
  path: '/features/conversation-intelligence/',
  section: 'features',
  title: 'Conversation Intelligence',
  layout: 'ci', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Conversation intelligence',
  eyebrowStyle: 'badge',
  heroArt: '/media/footer-ridge-night-v5.webp', // teal mountain ridges at night
  panelStyle: 'integrated',
  heroMock: 'ci', // working transcript archive search in the hero
  statsInHero: true,
  icon: 'ri-brain-fill', tone: 'violet',
  summary: 'Transcripts, summaries, QA and sentiment.',
  headline: 'Turn every conversation into data you can search.',
  lede: 'Every call, meeting and chat is transcribed, summarized and analysed automatically — no bot to invite, no separate per-rep tool to buy.',
  ticks: ['Every conversation, not a sample', 'Search in under a second', 'Objections found for you'],
  stats: [
    { value: '95%+', label: 'transcript accuracy on clean audio' },
    { value: '32', label: 'languages' },
    { value: 'Top 10', label: 'objections clustered automatically' },
    { value: 'Always on', label: 'no meeting bot required' },
  ],
  statement: 'Pipeline reviews stop being a debate about what the customer “probably meant” — and start with the transcript, one search away.',
  layers: {
    kicker: 'What it captures',
    title: 'Five layers of meaning on every conversation',
    intro: 'Voice, video and chat go through the same pipeline. Switch layers on to see what one short call turns into.',
  },
  objections: {
    kicker: 'Objection mining',
    title: 'The reasons deals stall — counted, not guessed',
    intro: 'Objections are grouped automatically across every call, so you see the pattern instead of the loudest anecdote. Pick a theme to read what customers actually said.',
  },
  native: {
    kicker: 'Built in, not bolted on',
    title: 'Intelligence that runs on the calls you already make',
    intro: 'Separate intelligence tools sit on top of your phone system — another login, another bot, another licence. Here it’s part of the platform.',
    bolted: ['A bot has to join each meeting', 'Separate login and data silo', 'Voice and meetings only', 'Licence per rep on top of your phones'],
    builtin: ['Runs on every call automatically', 'Same app, same customer record', 'Voice, video, chat, SMS and social', 'Included in your plan'],
  },
  export: {
    kicker: 'Export & sync',
    title: 'Your conversation data, wherever you work',
    intro: 'Summaries and fields land on the CRM record automatically. Pull everything as CSV, or stream it to your data warehouse on Enterprise.',
  },
  capabilities: [
    { icon: 'ri-file-text-fill', tone: 'blue', title: 'Transcripts everywhere', short: 'Voice, video, chat', text: 'Accurate transcripts across calls, meetings and chats.' },
    { icon: 'ri-emotion-happy-fill', tone: 'violet', title: 'Sentiment', short: 'Overall & per line', text: 'Sentiment for the whole conversation and each moment in it.' },
    { icon: 'ri-sparkling-2-fill', tone: 'violet', title: 'Summaries & actions', short: 'Automatic', text: 'Summaries and next steps written for you after every conversation.' },
    { icon: 'ri-bubble-chart-fill', tone: 'amber', title: 'Objection clusters', short: 'Pricing, timing, security', text: 'The objections that come up most, grouped automatically.' },
  ],
  audienceTitle: 'For leaders who want evidence, not anecdotes',
  audience: [
    { icon: 'ri-funds-fill', tone: 'green', title: 'Sales leaders', text: 'Pipeline reviews grounded in what customers said.', ask: 'Why did deals stall this quarter?' },
    { icon: 'ri-settings-4-fill', tone: 'amber', title: 'RevOps', text: 'Clean, structured data from every call.', ask: 'Which competitor comes up most in late-stage calls?' },
    { icon: 'ri-medal-fill', tone: 'blue', title: 'Support QA', text: 'Review every interaction, not a random 2%.', ask: 'Where did agents skip the verification step?' },
    { icon: 'ri-refresh-fill', tone: 'teal', title: 'Renewal teams', text: 'Spot churn signals early.', ask: 'Which accounts mentioned “budget cuts” this month?' },
  ],
  related: ['/features/call-recording/', '/features/ai-sentiment/', '/products/contact-center/agent-assist/', '/solutions/sales-teams/'],
  faq: [
    { q: 'Do I need to invite a bot to meetings?', a: 'No. Intelligence runs natively on calls, meetings and chats — nothing joins the meeting.' },
    { q: 'Which channels are covered?', a: 'Voice, video and chat, as well as SMS and social conversations.' },
    { q: 'How accurate are the transcripts?', a: '95%+ on clean audio, with speaker labels and timestamps, in 32 languages.' },
    { q: 'Can I export the data?', a: 'CSV export is available on all plans, with live data-warehouse sync on Enterprise.' },
    { q: 'Does it sync to my CRM?', a: 'Yes — summaries, action items and key fields sync to Salesforce and HubSpot out of the box.' },
    { q: 'How are objections grouped?', a: 'AI clusters similar objections across every call into themes like pricing, timeline or security, and counts how often each comes up.' },
  ],
});

/* ═══ SOLUTIONS ═════════════════════════════════════════════════════════ */

add({
  path: '/solutions/remote-teams/',
  section: 'solutions',
  title: 'Remote & Hybrid Teams',
  layout: 'remote', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Remote & hybrid teams',
  eyebrowStyle: 'badge',
  heroArt: '/media/illustration-butte-star-trails-blue-fdd2018c.png', // star trails over a lone butte
  panelStyle: 'integrated',
  heroMock: 'remote', // working one-number, every-device call flip in the hero
  statsInHero: true,
  icon: 'ri-macbook-fill', tone: 'blue',
  summary: 'One number that follows you to every device.',
  headline: 'One business number, on every device your team uses.',
  lede: 'Calls follow each person from phone to laptop to tablet — and move between them mid-call without dropping. Chat, video and phone share one app, one login and one presence.',
  ticks: ['Same number on every device', 'Flip a live call mid-sentence', 'Presence that respects focus time'],
  stats: [
    { value: 'Unlimited', label: 'devices per user' },
    { value: '< 1s', label: 'to flip a live call between devices' },
    { value: '200', label: 'people per video meeting' },
    { value: '1', label: 'login for chat, video and phone' },
  ],
  statement: 'Your team works from home, coworking spaces, airport gates and client sites. The phone system should work the same in every one of them.',
  day: {
    kicker: 'One day, one number',
    title: 'Walks, desks, airports — the same line all day',
    intro: 'One number rings every device you’re signed in to, and a live call moves between them in under a second. The other person hears nothing — no “let me call you back from my laptop”.',
    stops: [
      { time: '08:14', place: 'Brooklyn', device: 'iPhone', icon: 'ri-smartphone-line', what: 'Morning stand-up', note: 'Takes the call on the walk to coffee.' },
      { time: '10:02', place: 'Home office', device: 'MacBook', icon: 'ri-macbook-line', what: 'Customer demo', note: 'Flips to the laptop to share her screen.' },
      { time: '13:45', place: 'Coworking space', device: 'Browser', icon: 'ri-global-line', what: 'Quick callback', note: 'Borrowed meeting room — no install, just the browser.' },
      { time: '16:20', place: 'JFK · Gate B23', device: 'iPad', icon: 'ri-tablet-line', what: 'Call at the gate', note: 'Boarding — flips to the tablet to free her hands.' },
    ],
  },
  presence: {
    kicker: 'Presence, chat & video',
    title: 'Nobody pings the person in a focus block',
    intro: 'Presence comes from calendars, calls, meetings and working hours, so colleagues can see when not to interrupt. Try reaching someone on the team.',
  },
  challengesTitle: 'Remote work, without the phone headaches',
  challenges: [
    { problem: 'Calls drop when you switch from laptop to phone.', answer: 'Flip a live call to another device in under a second.' },
    { problem: 'People hand out their personal mobile numbers.', answer: 'Everyone calls and texts from their business number on any device.' },
    { problem: 'Colleagues interrupt people in deep work or off shift.', answer: 'Presence follows calendars, focus time and working hours.' },
    { problem: 'Chat, video and phone live in three different apps.', answer: 'One app with one login — plus Slack, Teams and Google Meet support.' },
  ],
  capKicker: 'What you get',
  capTitle: 'Everything a distributed team needs',
  capabilities: [
    { icon: 'ri-smartphone-fill', tone: 'blue', title: 'Apps for every device', short: 'iOS, Android, desktop', text: 'iOS, Android, Mac, Windows and browser — unlimited devices per user.' },
    { icon: 'ri-swap-box-fill', tone: 'violet', title: 'Mid-call device flip', short: 'No re-dial', text: 'Move a live call between devices without dropping it.' },
    { icon: 'ri-user-follow-fill', tone: 'green', title: 'Calendar-aware presence', short: 'Focus & off-hours', text: 'Status updates from meetings, focus time and working hours.' },
    { icon: 'ri-vidicon-fill', tone: 'violet', title: 'HD video with AI notes', short: 'Up to 200 people', text: 'Meetings with transcripts and summaries built in.' },
    { icon: 'ri-discuss-fill', tone: 'teal', title: 'Team chat', short: 'Slack bridge', text: 'Channels, DMs and files, synced with Slack if you need it.' },
    { icon: 'ri-shield-user-fill', tone: 'slate', title: 'BYOD controls', short: 'Per-device policies', text: 'Use a personal phone without exposing the personal number — with device policies for IT.' },
  ],
  audienceTitle: 'Works wherever your team works',
  audience: [
    { icon: 'ri-home-4-fill', tone: 'blue', title: 'Work from home', text: 'The full phone system on a laptop.', device: 'Laptop · desk headset' },
    { icon: 'ri-building-2-fill', tone: 'slate', title: 'Coworking & hybrid', text: 'Same number at the desk and on the move.', device: 'Browser · any desk' },
    { icon: 'ri-plane-fill', tone: 'amber', title: 'Travelling staff', text: 'Business calls from anywhere, on any network.', device: 'Phone · Wi-Fi or data' },
    { icon: 'ri-map-pin-2-fill', tone: 'rose', title: 'Client sites', text: 'Never miss a call between meetings.', device: 'Tablet · hands-free' },
  ],
  related: ['/products/cloud-phone/team-chat/', '/products/cloud-phone/video-meetings/', '/unified-communication/', '/solutions/enterprise-it/'],
  faq: [
    { q: 'Can one person use several devices?', a: 'Yes — unlimited devices per user, all on the same business number.' },
    { q: 'Can I switch devices during a call?', a: 'Yes. A live call moves to another device in under a second, and the other person hears nothing.' },
    { q: 'Can staff use their personal phones?', a: 'Yes. The app calls and texts from the business number, so personal numbers stay private — and IT can set per-device policies.' },
    { q: 'How does presence know when I’m busy?', a: 'It reads your calls, meetings, calendar focus blocks and working hours, so status updates on its own.' },
    { q: 'Is video included?', a: 'Yes — HD video meetings for up to 200 participants, with AI transcripts and summaries.' },
    { q: 'Does it work with Slack or Microsoft Teams?', a: 'Yes — Slack, Microsoft Teams and Google Meet integrations are available on every plan.' },
  ],
});

add({
  path: '/solutions/smb/',
  section: 'solutions',
  title: 'SMB Owner-Operators',
  layout: 'smb', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Small business',
  eyebrowStyle: 'badge',
  heroArt: '/media/sky-clouds-daylight-blue.webp',
  panelStyle: 'integrated',
  heroMock: 'smb', // working AI front desk for a small shop in the hero
  statsInHero: true,
  icon: 'ri-store-2-fill', tone: 'amber',
  summary: 'A full phone system with zero hardware.',
  headline: 'A receptionist and a phone system — for less than a part-time hire.',
  lede: 'An AI receptionist answers every call in 32 languages, books the appointment and texts the confirmation, while you get on with the actual work. No contracts, no hardware, no IT person.',
  ticks: ['No contract', 'Start with one seat', 'Live in under an hour'],
  stats: [
    { value: '24/7', label: 'answering, even when you’re busy' },
    { value: '32', label: 'languages' },
    { value: '< 1 hr', label: 'to go live' },
    { value: '1', label: 'seat minimum' },
  ],
  missed: {
    kicker: 'The cost of voicemail',
    title: 'Every call that hits voicemail is a customer you might not get back',
    intro: 'You run a business, not a call centre. Put in your own numbers to see what unanswered calls could be costing you each month.',
  },
  intake: {
    kicker: 'Your questions, her voice',
    title: 'Tell the AI what to ask. She handles the rest.',
    intro: 'Write the questions your front desk would ask. The AI greets the caller, asks them in order, books the slot, texts the confirmation and logs it all to your CRM.',
  },
  setup: {
    kicker: 'Set up in an afternoon',
    title: 'Sign up at lunch. First booking by four.',
    intro: 'No technical person needed — most owners are live in under an hour.',
    steps: [
      { time: '12:30', icon: 'ri-user-add-line', title: 'Sign up', text: 'Pick a plan and get a working number in the same session.' },
      { time: '12:50', icon: 'ri-mic-ai-line', title: 'Choose a voice & questions', text: 'Pick a tone and write your intake questions.' },
      { time: '13:10', icon: 'ri-arrow-left-right-line', title: 'Start porting', text: 'Your old number moves over in the background; a temporary one works meanwhile.' },
      { time: '16:00', icon: 'ri-calendar-check-line', title: 'First booking', text: 'A customer calls, the AI books them — you get the text.' },
    ],
  },
  challengesTitle: 'Stop losing business to voicemail',
  challenges: [
    { problem: 'Calls go to voicemail and the prospect calls a competitor.', answer: 'Every call is answered, 24/7, by an AI receptionist.' },
    { problem: 'You’re too busy doing the work to answer the phone.', answer: 'The AI qualifies callers and books them straight into your calendar.' },
    { problem: 'Nobody on the team is “the tech person”.', answer: 'Guided onboarding — live in under an hour, no hardware.' },
    { problem: 'Long contracts for tools you might outgrow.', answer: 'Month-to-month, starting at a single seat.' },
  ],
  capKicker: 'What you get',
  capTitle: 'Big-company phone service, small-business simple',
  capabilities: [
    { icon: 'ri-mic-ai-fill', tone: 'violet', title: 'AI receptionist', short: '24/7, 32 languages', text: 'Answers, asks your questions, books and confirms by text.' },
    { icon: 'ri-phone-fill', tone: 'blue', title: 'Full phone system', short: 'Extensions & groups', text: 'Voicemail, recording, extensions and hunt groups included.' },
    { icon: 'ri-message-2-fill', tone: 'teal', title: 'Two-way texting', short: 'Reminders & replies', text: 'Text customers reminders and updates from your business number.' },
    { icon: 'ri-calendar-check-fill', tone: 'amber', title: 'Calendar booking', short: 'Google, Outlook, Calendly', text: 'Appointments land straight in the calendar you already use.' },
    { icon: 'ri-plug-fill', tone: 'green', title: 'Your everyday apps', short: 'CRM, Square, QuickBooks', text: 'HubSpot, Zoho, Pipedrive, Google Business Profile, Square and QuickBooks.' },
    { icon: 'ri-earth-fill', tone: 'slate', title: 'Unlimited calling', short: 'US & Canada', text: 'Unlimited calling across the US and Canada.' },
  ],
  audienceTitle: 'Made for owner-operators',
  audience: [
    { icon: 'ri-hospital-fill', tone: 'rose', title: 'Clinics & practices', text: 'Bookings handled while you’re with a patient.', booking: 'Cleaning · Sat 11:00' },
    { icon: 'ri-tools-fill', tone: 'amber', title: 'Trades & home services', text: 'Never miss a job request on site.', booking: 'Boiler repair · Today 15:30' },
    { icon: 'ri-scissors-cut-fill', tone: 'violet', title: 'Salons & studios', text: 'Appointments booked and confirmed automatically.', booking: 'Cut & colour · Thu 10:00' },
    { icon: 'ri-briefcase-4-fill', tone: 'slate', title: 'Professional services', text: 'A polished front desk for a team of one.', booking: 'Consultation · Mon 09:30' },
  ],
  related: ['/products/ai/ai-receptionist/', '/products/cloud-phone/phone-system/', '/products/cloud-phone/sms-mms/', '/numbers/toll-free/'],
  faq: [
    { q: 'Do I need a technical person to set it up?', a: 'No. Onboarding is guided and most owners are live in under an hour.' },
    { q: 'Can I keep my current number?', a: 'Yes. Porting is free, usually takes 5–10 business days, and you get a temporary number in the meantime.' },
    { q: 'Is there a minimum number of users?', a: 'No — you can start with a single seat.' },
    { q: 'Am I locked into a contract?', a: 'No. Plans are month-to-month and you can cancel any time.' },
    { q: 'Can the AI answer in Spanish?', a: 'Yes. It answers in 32 languages and switches automatically to the caller’s language.' },
    { q: 'What if I want to take the call myself?', a: 'Set it to ring you first; the AI picks up only if you don’t answer or you’re marked busy.' },
  ],
});

add({
  path: '/solutions/enterprise-it/',
  section: 'solutions',
  title: 'Enterprise IT',
  layout: 'enterprise', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Enterprise IT',
  eyebrowStyle: 'badge',
  heroArt: '/media/bv/desert-mountains-cloud-blue-hour-blue-peach-5f46000f.png',
  panelStyle: 'integrated',
  heroMock: 'enterprise', // working admin control plane in the hero
  statsInHero: true,
  icon: 'ri-building-2-fill', tone: 'slate',
  summary: 'SSO, SCIM and multi-site control.',
  headline: 'Governance-grade communications — migrated in 14 days.',
  lede: 'SSO, SCIM provisioning, audit logs and role-based access, on infrastructure built for 10,000+ concurrent calls. Your security team reviews it up front; you choose the cutover date.',
  ticks: ['SSO & SCIM', '99.99% SLA', 'Dedicated TAM'],
  stats: [
    { value: '14 days', label: 'typical full migration' },
    { value: '99.99%', label: 'uptime SLA' },
    { value: '10K+', label: 'concurrent calls' },
    { value: '< 1s', label: 'failover between sites' },
  ],
  pillars: {
    text: 'Enterprise IT judges a phone system on three things. Most vendors fall short on at least one.',
    items: [
      { icon: 'ri-shield-keyhole-line', title: 'Governance', text: 'Identity, access and audit your security team can approve.' },
      { icon: 'ri-route-line', title: 'Migration risk', text: 'A dated plan, parallel testing and a cutover you control.' },
      { icon: 'ri-scales-3-line', title: 'Total cost', text: 'One platform instead of a stack of add-ons.' },
    ],
  },
  access: {
    kicker: 'Identity & access',
    title: 'Access your security team can sign off',
    intro: 'Sign in through your identity provider, provision from your directory, and scope every admin to exactly what they run. Pick a provider and build a role to see it.',
  },
  migration: {
    kicker: 'Migration in 14 days',
    title: 'White-glove migration. Cut over when you’re ready.',
    intro: 'A dedicated technical account manager owns it end to end — dial plans mapped and rebuilt, numbers ported in parallel, and nothing switched off until your team says go.',
    phases: [
      { day: 1, title: 'Discovery', text: 'Kick-off with your TAM; current dial plans and integrations audited.', tasks: ['Kick-off call', 'Dial plans exported', 'Integrations listed'] },
      { day: 4, title: 'Dial-plan map', text: 'Plans rebuilt one-to-one; RBAC scopes and SSO configured.', tasks: ['Dial plans rebuilt', 'SSO + SCIM connected', 'RBAC scopes drafted'] },
      { day: 8, title: 'Parallel test', text: 'Numbers ported in parallel while both systems run; agents trained.', tasks: ['Numbers ported in parallel', 'Test calls signed off', 'Agents trained'] },
      { day: 14, title: 'Cutover', text: 'Switch over on your date; audit logs and warehouse sync go live.', tasks: ['Cutover on your date', 'Audit logs streaming', 'Old system retired'] },
    ],
  },
  challengesTitle: 'Everything security and finance will ask about',
  challenges: [
    { problem: 'How do we stop shadow tools and unmanaged accounts?', answer: 'SSO, SCIM provisioning and scoped RBAC for every user.' },
    { problem: 'Migrations usually take months — what’s the risk?', answer: 'A 14-day plan with parallel testing and zero porting downtime.' },
    { problem: 'Will it get through our compliance review?', answer: 'Security documentation, EU data residency options and audit evidence are ready for your review.' },
    { problem: 'Can we get our call data out?', answer: 'Audit logs stream to your SIEM, with hourly sync to your data warehouse.' },
  ],
  capKicker: 'Live by day 14',
  capTitle: 'Built for the way IT actually runs things',
  capabilities: [
    { icon: 'ri-key-2-fill', tone: 'slate', title: 'SSO', short: 'Okta, Azure AD & more', text: 'Okta, Azure AD, Google Workspace, Ping, OneLogin, Duo or any SAML/OIDC provider.' },
    { icon: 'ri-user-settings-fill', tone: 'blue', title: 'SCIM provisioning', short: 'Joiners & leavers', text: 'Accounts created, changed and removed automatically from your directory.' },
    { icon: 'ri-file-list-3-fill', tone: 'violet', title: 'Audit logs', short: 'Splunk, Datadog, Elastic', text: 'Streamed to your SIEM and kept for a year, or longer on request.' },
    { icon: 'ri-shield-user-fill', tone: 'green', title: 'Scoped RBAC', short: 'By site, queue, channel', text: 'Admins see and change only what they are responsible for.' },
    { icon: 'ri-database-2-fill', tone: 'amber', title: 'Warehouse sync', short: 'Snowflake, BigQuery', text: 'Hourly sync to Snowflake, BigQuery and Redshift.' },
    { icon: 'ri-server-fill', tone: 'teal', title: 'Resilient by design', short: 'Active-active POPs', text: 'Active-active points of presence with sub-second failover.' },
  ],
  audienceTitle: 'For organisations at scale',
  audience: [
    { icon: 'ri-shield-keyhole-fill', tone: 'slate', title: 'CIOs & security teams', text: 'A posture you can review and approve up front.' },
    { icon: 'ri-building-2-fill', tone: 'blue', title: 'Multi-site enterprises', text: 'Hundreds of locations, one control plane.' },
    { icon: 'ri-earth-fill', tone: 'teal', title: 'Global organisations', text: 'EU data residency options and numbers in 190+ countries.' },
    { icon: 'ri-bank-fill', tone: 'green', title: 'Regulated industries', text: 'Retention and audit controls built for auditors.' },
  ],
  related: ['/solutions/remote-teams/', '/features/supervisor-tools/', '/features/call-recording/', '/unified-communication/'],
  faq: [
    { q: 'Is Enterprise on the published plans?', a: 'No — Enterprise is custom-priced, and we turn around a quote within 48 hours.' },
    { q: 'Is there a minimum seat count?', a: 'Enterprise agreements typically start around 500 seats.' },
    { q: 'Which identity providers are supported?', a: 'Okta, Azure AD, Google Workspace, Ping, OneLogin and Duo, plus any SAML 2.0 or OIDC provider.' },
    { q: 'What does the migration look like?', a: 'Discovery, dial-plan mapping, a parallel test and cutover — typically within 14 days, on a date you choose.' },
    { q: 'How is access controlled for admins?', a: 'Roles are scoped by site, queue and channel, so each admin sees and changes only what they’re responsible for — and every change is in the audit log.' },
    { q: 'What happens if a site or region goes down?', a: 'Calls run on active-active points of presence and fail over to another region in under a second.' },
  ],
});

add({
  path: '/solutions/sales-teams/',
  section: 'solutions',
  title: 'Sales Teams',
  navTitle: 'Sales & Support Teams',
  layout: 'sales', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Sales teams',
  eyebrowStyle: 'badge',
  heroArt: '/media/bv/desert-hills-poppies-thunderhead-blue-coral-05c29090.png',
  panelStyle: 'integrated',
  heroMock: 'sales', // working pipeline with dial + live coaching in the hero
  statsInHero: true,
  icon: 'ri-funds-fill', tone: 'green',
  summary: 'Power dialer plus live AI coaching.',
  headline: 'Close the gap between your top reps and everyone else.',
  lede: 'Power and predictive dialers, real-time AI coaching the prospect can’t hear, and automatic CRM logging — so every rep sells like your best one and nobody types notes after a call.',
  ticks: ['Power & predictive dialer', 'Live whisper coaching', 'Calls logged to your CRM'],
  stats: [
    { value: 'Live', label: 'AI whisper coaching' },
    { value: 'Auto', label: 'CRM logging after every call' },
    { value: '< 1 hr', label: 'to get the dialer running' },
    { value: '5', label: 'CRMs and sales tools synced' },
  ],
  statement: 'The gap between your best rep and your newest one isn’t talent — it’s pattern recognition. Give every rep the patterns, live, on every call.',
  dialer: {
    kicker: 'Power & predictive dialer',
    title: 'More conversations per hour, fewer wasted dials',
    intro: 'Pick a mode and start a session. The dialer skips do-not-call numbers, detects answering machines, drops a voicemail for you and shows a local caller ID — so reps spend their time talking.',
  },
  huddle: {
    kicker: 'Win the Monday huddle',
    title: 'The objections that cost you deals — ranked from real calls',
    intro: 'Every call is transcribed and tagged, so the patterns rise to the top on their own. Bring this to the team meeting instead of a hunch.',
    items: [
      { tag: 'Price vs competitor', heard: 'Their quote came in lower — why pay more?', play: 'Lead with the cost of switching later, then show total cost over a year, not the seat price.', clip: 'Top-rep clip · 02:14' },
      { tag: 'Implementation time', heard: 'We can’t afford weeks of disruption.', play: 'Walk through the parallel-run plan — nothing is switched off until they’re ready.', clip: 'Top-rep clip · 01:38' },
      { tag: 'CRM integration', heard: 'Will it actually write back to our CRM?', play: 'Show a logged call on a live record — notes, outcome and next step, no typing.', clip: 'Top-rep clip · 00:52' },
    ],
  },
  challengesTitle: 'What holds sales teams back — and the fix',
  challenges: [
    { problem: 'New reps close far less than top performers.', answer: 'Live coaching on pricing, timing and competitor mentions.' },
    { problem: 'The same few objections lose most deals.', answer: 'Objection detection surfaces the rebuttal that works, in the moment.' },
    { problem: 'Reps spend hours logging calls into the CRM.', answer: 'Notes and outcomes are logged to the CRM automatically.' },
    { problem: 'Coaching only happens in a review days later.', answer: 'Coaching happens during the call, while it still matters.' },
  ],
  capKicker: 'What you get',
  capTitle: 'A sales floor in one platform',
  capabilities: [
    { icon: 'ri-speed-up-fill', tone: 'blue', title: 'Power & predictive dialers', short: 'AMD & DNC scrub', text: 'Answering-machine detection, DNC scrubbing and local caller ID.' },
    { icon: 'ri-user-voice-fill', tone: 'violet', title: 'Live whisper coaching', short: 'Prospect never hears', text: 'Guidance on price, timing and competitors during the call.' },
    { icon: 'ri-shield-flash-fill', tone: 'rose', title: 'Objection detection', short: 'Rebuttals in seconds', text: 'Spots objections and surfaces the response that works.' },
    { icon: 'ri-search-2-fill', tone: 'amber', title: 'Searchable call library', short: 'Win/loss reports', text: 'Auto-tagged transcripts and clips of your best calls.' },
    { icon: 'ri-robot-2-fill', tone: 'green', title: 'Automatic CRM notes', short: 'HubSpot, Zoho', text: 'A personal AI logs every call to the right record.' },
    { icon: 'ri-plug-fill', tone: 'slate', title: 'Sales-stack sync', short: 'Salesforce, Outreach', text: 'Salesforce, HubSpot, Pipedrive, Outreach and Salesloft.' },
  ],
  audienceTitle: 'Built for revenue teams',
  audience: [
    { icon: 'ri-phone-find-fill', tone: 'blue', title: 'Outbound SDR teams', text: 'More conversations per hour.', metric: 'Dials → conversations' },
    { icon: 'ri-shake-hands-fill', tone: 'amber', title: 'Account executives', text: 'Coaching on the calls that close deals.', metric: 'Live whisper on demos' },
    { icon: 'ri-line-chart-fill', tone: 'green', title: 'Sales managers', text: 'See what top reps do, and teach it.', metric: 'Weekly objection report' },
    { icon: 'ri-refresh-fill', tone: 'teal', title: 'Renewal & retention', text: 'Spot risk on the call and save the account.', metric: 'Sentiment on every call' },
  ],
  related: ['/products/contact-center/agent-assist/', '/features/conversation-intelligence/', '/solutions/support-teams/', '/features/ai-sentiment/'],
  faq: [
    { q: 'Does it sync with HubSpot?', a: 'Yes — native two-way sync, with call notes, outcomes and next steps logged automatically.' },
    { q: 'Which dialer modes are available?', a: 'Preview, power and predictive dialing, with answering-machine detection, voicemail drop, DNC scrubbing and local caller ID.' },
    { q: 'Can prospects hear the coaching?', a: 'No. Whisper coaching is heard or seen only by the rep.' },
    { q: 'How fast can we start?', a: 'Most teams have the dialer running within an hour.' },
    { q: 'How are objections found?', a: 'Every call is transcribed and tagged automatically, and the most common objections are ranked each week with clips of how top reps handled them.' },
    { q: 'Which CRMs and sales tools does it work with?', a: 'Salesforce, HubSpot, Pipedrive, Zoho, Outreach and Salesloft.' },
  ],
});

add({
  path: '/solutions/support-teams/',
  section: 'solutions',
  title: 'Support Teams',
  layout: 'support', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Support teams',
  eyebrowStyle: 'badge',
  heroArt: '/media/bv/desert-plains-birds-haze-teal-amber-b192ae50.png',
  panelStyle: 'integrated',
  heroMock: 'support', // working omnichannel inbox with shared memory in the hero
  statsInHero: true,
  icon: 'ri-customer-service-2-fill', tone: 'teal',
  summary: 'One queue for every channel.',
  headline: 'One queue for every channel — and every customer’s full history.',
  lede: 'Voice, SMS, chat, WhatsApp and social land in a single queue with shared memory, so customers never repeat themselves. AI resolves tier-1 around the clock and escalates with context.',
  ticks: ['8 channels, one queue', 'Shared memory on every ticket', 'AI tier-1, 24/7'],
  stats: [
    { value: '8', label: 'channels in one queue' },
    { value: '24/7', label: 'AI tier-1 resolution' },
    { value: '1-click', label: 'Zendesk import' },
    { value: 'All-in', label: 'per-seat pricing' },
  ],
  statement: 'They message on WhatsApp on Tuesday, open a chat on Wednesday and call on Thursday — about the same problem. It should be one conversation, and every agent should see all of it.',
  channels: {
    kicker: 'One queue, every channel',
    title: 'Eight ways in. One thread out.',
    intro: 'Every channel feeds the same queue and the same customer history. Send a message in from any channel to see where it lands.',
  },
  knowledge: {
    kicker: 'Knowledge in the agent’s ear',
    title: 'New agents answer like they’ve been here for years',
    intro: 'The AI listens to the conversation, finds the right article or policy and suggests it before the agent goes looking — with the source cited, so they know what to trust.',
  },
  tier1: {
    kicker: 'AI tier-1, 24/7',
    title: 'Routine questions resolved. Hard ones escalated with context.',
    intro: 'Switch the AI on and watch the queue: order status, returns and password resets are resolved on the spot, while anything sensitive goes to a person with the full story attached.',
  },
  challengesTitle: 'Fix the support problems customers notice',
  challenges: [
    { problem: 'Customers repeat themselves every time they switch channel.', answer: 'Shared memory shows every past interaction the moment a ticket is accepted.' },
    { problem: 'Agents juggle several inboxes in different tabs.', answer: 'Voice, SMS, chat, WhatsApp and social in one queue.' },
    { problem: 'New agents don’t know the answers yet.', answer: 'Live knowledge suggestions with cited sources.' },
    { problem: 'AI tools charge per resolution.', answer: 'AI is included in simple per-seat pricing.' },
  ],
  capKicker: 'What you get',
  capTitle: 'Everything a modern support desk needs',
  capabilities: [
    { icon: 'ri-inbox-2-fill', tone: 'teal', title: 'Omnichannel queue', short: 'Voice to Instagram', text: 'Voice, SMS, web chat, WhatsApp, Instagram, Facebook, Telegram and X.' },
    { icon: 'ri-history-fill', tone: 'blue', title: 'Shared memory', short: 'Full history', text: 'Every previous interaction attached to the contact.' },
    { icon: 'ri-emotion-happy-fill', tone: 'violet', title: 'Sentiment routing', short: 'Right agent, right time', text: 'Upset customers go to the agents best placed to help.' },
    { icon: 'ri-book-open-fill', tone: 'amber', title: 'Knowledge suggestions', short: 'With sources', text: 'Answers suggested live, with links to the source article.' },
    { icon: 'ri-robot-2-fill', tone: 'green', title: 'AI tier-1', short: 'Escalates with context', text: 'Routine questions resolved around the clock.' },
    { icon: 'ri-links-fill', tone: 'slate', title: 'Helpdesk sync', short: 'Zendesk, Freshdesk', text: 'Native sync with Zendesk, Freshdesk and HubSpot Service — plus a one-click Zendesk import.' },
  ],
  audienceTitle: 'For CX teams of every size',
  audience: [
    { icon: 'ri-shopping-bag-3-fill', tone: 'rose', title: 'eCommerce support', text: 'Order questions across every channel.', ask: '“Where’s my order #4821?”' },
    { icon: 'ri-code-s-slash-fill', tone: 'slate', title: 'SaaS support', text: 'Technical answers with knowledge built in.', ask: '“The API returns a 401 since this morning.”' },
    { icon: 'ri-earth-fill', tone: 'teal', title: 'Global help desks', text: '24/7 coverage across time zones.', ask: '“¿Pueden ayudarme con mi factura?”' },
    { icon: 'ri-user-add-fill', tone: 'blue', title: 'Growing teams', text: 'New agents productive from day one.', ask: '“How do I change my plan?”' },
  ],
  related: ['/features/ai-sentiment/', '/products/contact-center/agent-assist/', '/products/cloud-phone/sms-mms/', '/solutions/retail/'],
  faq: [
    { q: 'What is shared memory?', a: 'Every interaction with a customer, on any channel, attached to their contact record for the next agent to see the moment they accept the ticket.' },
    { q: 'Which channels are included?', a: 'Voice, SMS, web chat, WhatsApp, Instagram, Facebook, Telegram and X — all in one queue.' },
    { q: 'Can AI handle tier-1 questions?', a: 'Yes. It resolves routine questions and escalates with full context when a person is needed.' },
    { q: 'Does it work with Zendesk?', a: 'Yes — two-way sync, and a one-click import of tickets, macros and customers.' },
    { q: 'Is AI priced per resolution?', a: 'No. AI is included in per-seat pricing.' },
    { q: 'Do agents need to search the knowledge base?', a: 'Rarely. Relevant articles and policies are suggested during the conversation, with the source linked.' },
  ],
});

add({
  path: '/solutions/finance/',
  section: 'solutions',
  title: 'Financial Services',
  layout: 'finance', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Financial services',
  eyebrowStyle: 'badge',
  heroArt: '/media/bv/desert-brush-birds-dusk-blue-coral-4f46c978.png',
  panelStyle: 'integrated',
  heroMock: 'finance', // working compliance desk: live disclosure checklist, redaction, attested outbound
  statsInHero: true,
  icon: 'ri-bank-fill', tone: 'green',
  summary: 'Recorded, redacted and audit-ready calling.',
  headline: 'A calling stack your compliance team can sign off on.',
  lede: 'Recording, card redaction, retention and audit trails are on from the first call, disclosures are checked while the call is still live, and every outbound call is signed so clients actually pick up. Built for wealth, lending, collections and insurance.',
  ticks: ['Disclosures checked live', 'Automatic card redaction', 'Up to 7-year retention'],
  stats: [
    { value: 'Up to 7 yrs', label: 'recording retention' },
    { value: 'A-level', label: 'STIR/SHAKEN attestation on outbound' },
    { value: 'AES-256', label: 'encryption with customer-managed keys' },
    { value: 'Live', label: 'disclosure monitoring' },
  ],
  disclosure: {
    kicker: 'Compliance that runs by default',
    title: 'Catch the missed disclosure during the call — not in next quarter’s audit',
    intro: 'Pick a call type to see the disclosures it needs. Conversation intelligence marks each one on the call timeline as it’s said — and prompts the advisor before the call ends if one is missing.',
  },
  outbound: {
    kicker: 'Outbound that gets answered',
    title: 'Signed, local and inside the rules',
    intro: 'Attested calls with a verified business name are far less likely to be labelled as spam. And before any call is placed, the dialer checks consent, the do-not-call list and the client’s local calling hours.',
  },
  vault: {
    kicker: 'The record, handled',
    title: 'Redact it, keep it, prove it',
    intro: 'Card and account numbers are removed from audio and transcripts automatically. Set retention per line of business, place legal holds and export a complete audit trail when the examiner asks.',
  },
  challengesTitle: 'Meet the rules without slowing the business',
  challenges: [
    { problem: 'Regulators expect recordings and audit trails you can produce on demand.', answer: 'Every call recorded, retained up to 7 years and searchable in seconds.' },
    { problem: 'A missed disclosure is found weeks after the call.', answer: 'Disclosures are checked live, and the advisor is prompted before the call ends.' },
    { problem: 'Outbound calls get labelled as spam.', answer: 'A-level attestation and verified local presence on every outbound call.' },
    { problem: 'Card data in recordings creates PCI exposure.', answer: 'Automatic redaction, plus a secure IVR that keeps card numbers away from agents.' },
  ],
  capKicker: 'What you get',
  capTitle: 'Everything a regulated contact center needs',
  capabilities: [
    { icon: 'ri-record-circle-fill', tone: 'rose', title: 'Recording & retention', short: 'Up to 7 years', text: 'Every call recorded and kept as long as your policy requires, with legal holds.' },
    { icon: 'ri-eye-off-fill', tone: 'slate', title: 'Automatic redaction', short: 'Audio + transcript', text: 'Card and account numbers removed from recordings and transcripts.' },
    { icon: 'ri-shield-check-fill', tone: 'green', title: 'Trusted outbound', short: 'STIR/SHAKEN A-level', text: 'Signed calls and verified local presence to avoid spam labels.' },
    { icon: 'ri-scales-3-fill', tone: 'violet', title: 'Compliant dialing', short: 'TCPA & DNC', text: 'Consent, DNC scrubbing and local calling hours checked before every dial.' },
    { icon: 'ri-alarm-warning-fill', tone: 'amber', title: 'Disclosure monitoring', short: 'Live prompts', text: 'Required statements tracked on every call, with prompts when one is missing.' },
    { icon: 'ri-lock-2-fill', tone: 'blue', title: 'Encryption & access', short: 'Customer-managed keys', text: 'AES-256 at rest, TLS in transit, SSO and role-based access to recordings.' },
  ],
  audienceTitle: 'Across financial services',
  audience: [
    { icon: 'ri-funds-fill', tone: 'green', title: 'Wealth management', text: 'Advisor calls recorded, reviewed and audit-ready.', rule: 'Suitability & fee disclosures' },
    { icon: 'ri-home-4-fill', tone: 'blue', title: 'Mortgage & lending', text: 'Compliant outreach that clients actually answer.', rule: 'Rate & terms disclosures' },
    { icon: 'ri-hand-coin-fill', tone: 'amber', title: 'Collections', text: 'Dialing inside calling hours, with every disclosure said.', rule: 'Mini-Miranda on every call' },
    { icon: 'ri-file-shield-2-fill', tone: 'violet', title: 'Insurance & claims', text: 'Every conversation documented from first notice to payout.', rule: 'Recorded consent & claim notes' },
  ],
  related: ['/features/call-recording/', '/features/conversation-intelligence/', '/features/supervisor-tools/', '/solutions/enterprise-it/'],
  faq: [
    { q: 'Does it support FINRA and SEC record-keeping?', a: 'Recording, retention and audit logs are designed around financial record-keeping requirements, and your account team helps map them to the specific rules you follow.' },
    { q: 'How long are recordings kept?', a: '90 days by default, configurable up to 7 years per line of business, with legal holds that override deletion.' },
    { q: 'Does STIR/SHAKEN reduce spam labels?', a: 'Yes. Signed, attested calls with a verified business name are far less likely to be flagged as spam, so more clients answer.' },
    { q: 'How is card data protected?', a: 'Card and account numbers are redacted from audio and transcripts automatically, and payments can be taken through a secure IVR so agents never hear them.' },
    { q: 'Can the dialer respect calling-hour rules?', a: 'Yes. Calls are only placed inside the client’s local calling window, and consent and do-not-call status are checked before every dial.' },
    { q: 'Can we export an audit trail?', a: 'Yes — recordings, transcripts, disclosure checks and every access or change can be exported for an exam or internal review.' },
  ],
});

add({
  path: '/solutions/retail/',
  section: 'solutions',
  title: 'Retail & eCom',
  layout: 'retail', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Retail & eCommerce',
  eyebrowStyle: 'badge',
  // Purple wildflower field at golden hour — Kevin Wenning on Unsplash (Unsplash License), served from Unsplash's CDN.
  heroArt: 'https://images.unsplash.com/photo-1546473491-cc3f5bba6705?fm=jpg&q=70&w=2400&auto=format&fit=crop',
  panelStyle: 'integrated',
  heroMock: 'retail', // working store-support desk: order lookup, AI answers, returns, stock checks
  statsInHero: true,
  icon: 'ri-shopping-bag-3-fill', tone: 'rose',
  summary: 'Omnichannel service for DTC brands.',
  headline: 'Shoppers move fast. Your support should keep up.',
  lede: 'Voice, text, WhatsApp, Instagram, Facebook and chat in one queue, with the order on every conversation. Automated cart-recovery texts, and an AI that answers “where’s my order?” at 2 am so your team doesn’t have to.',
  ticks: ['6+ channels, one queue', 'Order context on every chat', 'Cart-recovery SMS'],
  stats: [
    { value: '24/7', label: 'order-status answers by AI' },
    { value: '6+', label: 'channels in one queue' },
    { value: '10DLC', label: 'registration handled for you' },
    { value: 'Peak-ready', label: 'seasonal seats in hours' },
  ],
  queue: {
    kicker: 'Six channels, one queue',
    title: 'Agents work one queue — not six tabs',
    intro: 'Switch views to see the difference. Every message lands in the same queue, sorted by wait time, with the shopper’s latest order attached — so nobody asks “what’s your order number?” again.',
  },
  recovery: {
    kicker: 'Abandoned-cart recovery',
    title: 'Win back the cart with one well-timed text',
    intro: 'Build the flow: pick your store, the delay and the offer, then play it. Texts respect quiet hours and opt-outs, and when the shopper replies, the AI answers with the cart in hand.',
  },
  peak: {
    kicker: 'Ready for the rush',
    title: 'Black Friday is a staffing problem. Solve it in an afternoon.',
    intro: 'Pick a day on the retail calendar to see how volume shifts by channel, how much the AI takes off the queue, and how many seasonal seats to add — then add them.',
  },
  challengesTitle: 'Retail support, rebuilt for how people shop',
  challenges: [
    { problem: 'Shoppers message at midnight when nobody is on shift.', answer: 'AI answers order status, returns and stock questions around the clock.' },
    { problem: 'Agents juggle six inboxes in six tabs.', answer: 'Every channel in one queue, routed by skill and last touch.' },
    { problem: 'Abandoned carts quietly drain revenue.', answer: 'Automated recovery texts, with 10DLC and opt-outs handled for you.' },
    { problem: 'Peak season overwhelms the team.', answer: 'Seasonal seats added in hours, not weeks — and removed after.' },
  ],
  capKicker: 'What you get',
  capTitle: 'Service that sells',
  capabilities: [
    { icon: 'ri-inbox-2-fill', tone: 'teal', title: 'Omnichannel queue', short: 'Voice to Instagram', text: 'Voice, SMS, WhatsApp, Instagram, Facebook and web chat together.' },
    { icon: 'ri-shopping-cart-2-fill', tone: 'rose', title: 'Store integrations', short: 'Shopify & more', text: 'Shopify, BigCommerce, WooCommerce and Magento, with order context on every chat.' },
    { icon: 'ri-message-2-fill', tone: 'green', title: 'Cart recovery', short: 'Automated SMS', text: 'Abandoned-cart texts timed to bring shoppers back.' },
    { icon: 'ri-robot-2-fill', tone: 'violet', title: 'Order-status AI', short: 'Where’s my order?', text: 'Tracking, returns and stock questions answered instantly, any hour.' },
    { icon: 'ri-bank-card-fill', tone: 'slate', title: 'Secure payments', short: 'Card capture', text: 'Take card payments by phone, with numbers redacted from recordings.' },
    { icon: 'ri-bar-chart-box-fill', tone: 'amber', title: 'Revenue by channel', short: 'Attribution', text: 'See which conversations and flows lead to orders.' },
  ],
  audienceTitle: 'For brands that sell online and off',
  audience: [
    { icon: 'ri-store-2-fill', tone: 'amber', title: 'DTC brands', text: 'Personal service at scale.', ask: 'Where’s my order?' },
    { icon: 'ri-shopping-bag-3-fill', tone: 'rose', title: 'Marketplace sellers', text: 'Every channel in one place.', ask: 'Can I swap the size?' },
    { icon: 'ri-building-4-fill', tone: 'slate', title: 'Omnichannel retailers', text: 'Store and online support, unified.', ask: 'Is it in stock nearby?' },
    { icon: 'ri-flashlight-fill', tone: 'violet', title: 'Seasonal peaks', text: 'Scale up for launches and holidays.', ask: 'Will it arrive by the 24th?' },
  ],
  related: ['/products/cloud-phone/sms-mms/', '/solutions/support-teams/', '/features/ai-sentiment/', '/products/ai/ai-receptionist/'],
  faq: [
    { q: 'Does it integrate with Shopify?', a: 'Yes — natively, with orders, customers and carts synced so agents and the AI see the order on every conversation. BigCommerce, WooCommerce and Magento are supported too.' },
    { q: 'Is WhatsApp Business included?', a: 'Yes, through the WhatsApp Business API, in the same queue as every other channel.' },
    { q: 'Can the chatbot answer order-status questions?', a: 'Yes — it looks up the order in your store and replies with tracking, any hour. Returns and stock checks work the same way.' },
    { q: 'How do cart-recovery texts stay compliant?', a: 'We handle 10DLC registration, honour opt-outs automatically and hold texts during quiet hours.' },
    { q: 'How fast can we add seasonal agents?', a: 'Seats can be added in hours and removed after the peak, with the same queue, routing and order context from day one.' },
    { q: 'Can we take payments over the phone?', a: 'Yes. Card numbers are captured securely and redacted from recordings and transcripts.' },
  ],
});

add({
  path: '/solutions/saas/',
  section: 'solutions',
  title: 'SaaS & Tech',
  layout: 'saas', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'SaaS & tech',
  eyebrowStyle: 'badge',
  // Lago di Braies, Dolomites, at first light — Intricate Explorer on Unsplash (Unsplash License), served from Unsplash's CDN.
  heroArt: 'https://images.unsplash.com/photo-1770341989953-f3efb336f7eb?fm=jpg&q=70&w=2400&auto=format&fit=crop',
  panelStyle: 'integrated',
  heroMock: 'saas', // working SDK console: pick a language, run it, watch the webhooks stream in
  statsInHero: true,
  icon: 'ri-code-s-slash-fill', tone: 'slate',
  summary: 'API-first telephony for product teams.',
  headline: 'The phone platform your engineers will actually like.',
  lede: 'Outgrown WhatsApp groups and Google Voice? Get typed SDKs, a versioned REST API and real-time webhooks — plus a phone system your sales and success teams can use on day one.',
  ticks: ['Typed SDKs', 'Signed webhooks', 'OpenAPI 3.1'],
  stats: [
    { value: '4', label: 'typed SDKs: TS, Python, Go, Ruby' },
    { value: 'OpenAPI', label: '3.1 spec, versioned' },
    { value: 'Real-time', label: 'call, SMS & transcript webhooks' },
    { value: 'Up to 7 yrs', label: 'recording retention' },
  ],
  layers: {
    kicker: 'One platform, six layers',
    title: 'Everything from the dial tone to the data warehouse',
    intro: 'Most teams stitch these together from five vendors. Pick a layer to see what your users get — and what your engineers get alongside it.',
  },
  hooks: {
    kicker: 'Webhooks you can trust',
    title: 'Signed, retried and replayable',
    intro: 'Pick an event and send a test delivery. Every payload is signed, failed deliveries retry with backoff, and anything missed can be replayed from the dashboard.',
  },
  review: {
    kicker: 'Security review, faster',
    title: 'Answer the vendor questionnaire before the call ends',
    intro: 'The questions every security team asks, answered from public documentation — so your buyers’ reviews don’t stall your deals, or yours.',
  },
  challengesTitle: 'Skip the build-vs-buy debate',
  challenges: [
    { problem: 'Moving off consumer phone tools is painful.', answer: 'Port numbers and move the team over in an afternoon.' },
    { problem: 'Building on raw telecom APIs means glue code forever.', answer: 'A complete phone system and an API, on one platform.' },
    { problem: 'Security questionnaires slow every deal.', answer: 'Public security documentation, DPA and sub-processor list.' },
    { problem: 'Call notes never make it into the CRM.', answer: 'Automatic logging to HubSpot and Zoho, and a Slack message when it matters.' },
  ],
  capKicker: 'What you get',
  capTitle: 'Built for builders',
  capabilities: [
    { icon: 'ri-code-box-fill', tone: 'slate', title: 'Typed SDKs', short: 'TS, Python, Go, Ruby', text: 'First-class SDKs with types and autocompletion for the languages you use.' },
    { icon: 'ri-terminal-box-fill', tone: 'blue', title: 'REST API', short: 'Versioned, idempotent', text: 'OpenAPI 3.1, OAuth 2, idempotency keys and predictable pagination.' },
    { icon: 'ri-flashlight-fill', tone: 'amber', title: 'Webhooks', short: 'Signed & retried', text: 'Real-time events for calls, messages, recordings and transcripts.' },
    { icon: 'ri-brain-fill', tone: 'violet', title: 'Demo intelligence', short: 'Talk ratio & sentiment', text: 'Conversation intelligence on every sales demo and success call.' },
    { icon: 'ri-hard-drive-2-fill', tone: 'green', title: 'Your storage', short: 'S3-compatible', text: 'Recordings and transcripts to your own bucket, with long retention.' },
    { icon: 'ri-slack-fill', tone: 'teal', title: 'Where your team works', short: 'Slack & CRM', text: 'Calls logged to HubSpot or Zoho, with alerts in Slack channels.' },
  ],
  audienceTitle: 'From seed to scale',
  audience: [
    { icon: 'ri-rocket-2-fill', tone: 'violet', title: 'Early-stage startups', text: 'A real phone system from day one.', snip: 'numbers.buy({ area: "415" })' },
    { icon: 'ri-code-s-slash-fill', tone: 'slate', title: 'Engineering teams', text: 'Build calling into your own product.', snip: 'calls.create({ to, from })' },
    { icon: 'ri-funds-fill', tone: 'green', title: 'Sales & success', text: 'Calls logged to the CRM automatically.', snip: 'on("call.completed", log)' },
    { icon: 'ri-shield-keyhole-fill', tone: 'blue', title: 'Security-conscious buyers', text: 'Pass vendor reviews quickly.', snip: 'GET /v1/audit-events' },
  ],
  related: ['/features/conversation-intelligence/', '/solutions/sales-teams/', '/solutions/support-teams/', '/unified-communication/'],
  faq: [
    { q: 'Is there a developer API?', a: 'Yes — a versioned REST API with an OpenAPI 3.1 spec, real-time webhooks and typed SDKs for TypeScript, Python, Go and Ruby.' },
    { q: 'Does it sync with HubSpot?', a: 'Yes — two-way sync, with calls, recordings and notes logged to the right contact automatically. Zoho is supported too.' },
    { q: 'How are webhooks secured?', a: 'Every delivery is signed so you can verify it came from us. Failed deliveries retry with exponential backoff and can be replayed.' },
    { q: 'Can recordings go to our own storage?', a: 'Yes — to any S3-compatible bucket, with retention you control up to 7 years.' },
    { q: 'How do you handle security reviews?', a: 'Security documentation, a DPA and the sub-processor list are available up front, and our team can join your review call.' },
    { q: 'Can we port our existing numbers?', a: 'Yes. Numbers port in from most carriers and consumer tools, and the team can keep working while the port completes.' },
  ],
});

add({
  path: '/solutions/logistics/',
  section: 'solutions',
  title: 'Logistics',
  layout: 'logistics', // dedicated middle sections; hero, related, FAQ and CTA are shared
  eyebrow: 'Logistics & dispatch',
  eyebrowStyle: 'badge',
  // Desert highway at sunset — Francesco Ungaro on Unsplash (Unsplash License), served from Unsplash's CDN.
  heroArt: 'https://images.unsplash.com/photo-1751877055806-db2e9176860a?fm=jpg&q=70&w=2400&auto=format&fit=crop',
  panelStyle: 'integrated',
  heroMock: 'logistics', // working dispatch network: a driver call cascades depot to depot, then to the AI
  statsInHero: true,
  icon: 'ri-truck-fill', tone: 'amber',
  summary: 'Multi-site dispatch on one system.',
  headline: 'Never miss a dispatch call.',
  lede: 'Cascading hunt groups route every driver and dock call to the nearest dispatcher, then the depot, then a regional pool — and if nobody’s free, the AI receptionist picks up. No voicemail, across every site.',
  ticks: ['Multi-site', 'Hunt groups', '24/7 AI backstop'],
  stats: [
    { value: '0', label: 'calls sent to voicemail' },
    { value: '4-step', label: 'cascade to a person or AI' },
    { value: 'Per-depot', label: 'numbers, hours & caller IDs' },
    { value: '24/7', label: 'AI receptionist backstop' },
  ],
  cascade: {
    kicker: 'Built for distributed ops',
    title: 'Hunt groups that move calls fast',
    intro: 'Set how long each tier rings and how it picks a dispatcher, then test it against a bad day. Whatever happens, the last step is the AI — never voicemail.',
  },
  storm: {
    kicker: 'Reliability you can drill',
    title: 'Dispatch doesn’t blink in a storm',
    intro: 'Calls run through active-active points of presence. Take a region offline in the drill and watch live calls move to the others — dispatchers never notice.',
  },
  road: {
    kicker: 'From the cab to the TMS',
    title: 'Every stop, texted and synced',
    intro: 'Step through a load. Drivers and customers get texts at each stage, delivery photos come in by MMS, and every event lands in your TMS through webhooks.',
  },
  challengesTitle: 'Dispatch that never goes dark',
  challenges: [
    { problem: 'A missed dispatch call costs a load.', answer: 'Cascading hunt groups with an AI backstop — no voicemail.' },
    { problem: 'Drivers call from the road on patchy signal.', answer: 'Low-latency routing across multiple carriers, with A-level STIR/SHAKEN on outbound.' },
    { problem: 'Regional outages take phones down.', answer: 'Active-active points of presence with automatic failover.' },
    { problem: 'Depots run like separate companies.', answer: 'Per-depot numbers, hours and caller IDs on one system.' },
  ],
  capKicker: 'What you get',
  capTitle: 'Built for the dispatch floor',
  capabilities: [
    { icon: 'ri-git-merge-fill', tone: 'amber', title: 'Cascading hunt groups', short: 'Zero-voicemail rule', text: 'Dispatcher → depot → region → AI receptionist.' },
    { icon: 'ri-route-fill', tone: 'blue', title: 'Smart ring strategies', short: 'Longest-idle & skills', text: 'Longest-idle, parallel and skills-based ringing per tier.' },
    { icon: 'ri-map-pin-2-fill', tone: 'rose', title: 'Per-depot setup', short: 'Numbers, hours, IDs', text: 'Each depot gets its own numbers, users and hours.' },
    { icon: 'ri-tablet-fill', tone: 'slate', title: 'Rugged Android apps', short: 'Android 8+ & MDM', text: 'Softphones for rugged tablets, with device management.' },
    { icon: 'ri-message-2-fill', tone: 'teal', title: 'SMS & MMS', short: 'ETAs & proof of delivery', text: 'ETAs, exception alerts and delivery photos by text.' },
    { icon: 'ri-plug-fill', tone: 'green', title: 'TMS integrations', short: 'Samsara, Motive & more', text: 'Samsara, Motive, McLeod and more, plus REST and webhooks.' },
  ],
  audienceTitle: 'For operations that never stop',
  audience: [
    { icon: 'ri-truck-fill', tone: 'amber', title: 'Trucking fleets', text: 'Drivers always reach dispatch.', call: 'Flat tire, I-40 mile 212' },
    { icon: 'ri-store-3-fill', tone: 'slate', title: 'Warehouses & docks', text: 'Dock calls routed by site.', call: 'Door 14 is ready to load' },
    { icon: 'ri-map-2-fill', tone: 'blue', title: 'Multi-depot operators', text: 'One system, every location.', call: 'Swap driver at Dallas' },
    { icon: 'ri-box-3-fill', tone: 'green', title: 'Last-mile delivery', text: 'ETAs and proof of delivery by text.', call: 'Left at side door — photo sent' },
  ],
  related: ['/products/cloud-phone/phone-system/', '/products/ai/ai-receptionist/', '/products/cloud-phone/sms-mms/', '/features/auto-attendant/'],
  faq: [
    { q: 'Can each depot have its own setup?', a: 'Yes — each depot has its own users, extensions, caller IDs, numbers and hours, all on one system.' },
    { q: 'Do you support rugged Android devices?', a: 'Yes, Android 8 and above, with MDM enrollment supported.' },
    { q: 'Do you integrate with our TMS?', a: 'Yes — Samsara, Motive, McLeod and others, plus a REST API and webhooks for TMS, WMS or a homegrown dispatch board.' },
    { q: 'What happens during a regional outage?', a: 'Calls fail over automatically to another region, so dispatchers keep working without noticing.' },
    { q: 'What does the AI do when nobody answers?', a: 'It picks up, captures who’s calling and why, books a callback with the right dispatcher and texts the driver a confirmation.' },
    { q: 'Can drivers send proof-of-delivery photos?', a: 'Yes — by MMS to the depot number, attached to the load automatically.' },
  ],
});

export const PAGES = P;

/* Section hubs at /features and /solutions, grouped as in the content plan. */
export const HUBS = {
  numbers: {
    path: null,
    label: 'Numbers',
  },
  features: {
    path: '/features/',
    label: 'Features',
    icon: 'ri-apps-2-fill',
    eyebrow: 'Features',
    headline: 'Every feature your team needs to communicate — in one platform.',
    lede: 'Calling, messaging, video and AI that share one login and one customer history. Explore everything included.',
    ctaTitle: 'See every feature in action',
    groups: [
      {
        kicker: 'UCaaS', title: 'Unified communications',
        intro: 'Voice, chat, video, SMS and fax on one login.',
        // Channels and numbers only; call-handling features live under Core.
        paths: ['/unified-communication/', '/products/cloud-phone/phone-system/', '/numbers/toll-free/', '/products/cloud-phone/team-chat/', '/products/cloud-phone/video-meetings/', '/products/cloud-phone/sms-mms/', '/products/cloud-phone/online-fax/'],
      },
      {
        kicker: 'Core features', title: 'Everything a serious phone system needs',
        paths: ['/features/auto-attendant/', '/features/call-recording/', '/features/supervisor-tools/'],
      },
      {
        kicker: 'AI features', title: 'AI that joins every conversation',
        paths: ['/products/ai/ai-receptionist/', '/features/ai-sentiment/', '/products/contact-center/agent-assist/', '/features/conversation-intelligence/'],
      },
    ],
  },
  solutions: {
    path: '/solutions/',
    label: 'Solutions',
    icon: 'ri-lightbulb-flash-fill',
    eyebrow: 'Solutions',
    headline: 'One platform, shaped to your team and your industry.',
    lede: 'Whether you’re a five-seat office or a regulated enterprise, start from the setup built for how you work.',
    ctaTitle: 'Find the right setup for your team',
    groups: [
      {
        kicker: 'UCaaS', title: 'From a 5-seat office to a multi-site enterprise',
        paths: ['/solutions/remote-teams/', '/solutions/smb/', '/solutions/enterprise-it/', '/solutions/sales-teams/'],
      },
      {
        kicker: 'By industry', title: 'Built for the rules of your industry',
        paths: ['/solutions/finance/', '/solutions/retail/', '/solutions/saas/', '/solutions/logistics/'],
      },
      {
        kicker: 'By team', title: 'Shaped to how your team works',
        paths: ['/solutions/sales-teams/', '/solutions/support-teams/', '/solutions/remote-teams/', '/solutions/smb/', '/solutions/enterprise-it/'],
      },
    ],
  },
};

/* Route helpers. */
export const pagesUnder = (prefix) =>
  Object.values(PAGES).filter((p) => p.path.startsWith(prefix) && p.path !== prefix);
