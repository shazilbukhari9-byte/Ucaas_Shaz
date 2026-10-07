'use client';
/* MCM mega-menu navigation — ported from the mcm-menu-showcase prototype.
   Click a top tab to open its panel; in Products, the left rail switches
   suites. Outside click or Escape closes everything. */
import { useEffect, useRef, useState } from 'react';
import { isBuilt } from '../../content/builtPages';

/* The four suites mirror the platform tabs on the home page — Cloud Phone,
   AI Agent, Auto Dialer, Connected Tools — same names, same one-liners and
   the same destinations, so the menu and the page tell one story.

   Cloud Phone leads because its six pages are the ones that exist. */
const PRODUCT_SUITES = {
  cp: {
    icon: 'cloud_phone', iconClass: 'mcm-ic-cp', title: 'Cloud Phone',
    desc: 'Calling on every device.',
    href: '/products/cloud-phone/phone-system/', pill: 'CLOUD PHONE · UCAAS', h: 'The all-in-one business phone platform.',
    p: 'Local and toll-free numbers, call routing, IVR menus and voicemail transcription — one login, zero hardware.',
    items: [
      ['telephone_receiver', 'Phone & Texting', 'Calls and texts on any device', '/cloud-phone/phone-texting', 'mcm-bg-pop', 'Popular'],
      ['video_camera', 'Video Meetings', 'Recorded video calls in a click', '/products/cloud-phone/video-meetings/', '', ''],
      ['speech_balloon', 'Live Chat', 'Catch visitors on your website', '/cloud-phone/live-chat', '', ''],
      ['inbox_tray', 'Inbox', 'SMS, MMS and fax in one thread', '/cloud-phone/inbox', '', ''],
      ['globe_with_meridians', 'Omnichannel', 'Every channel, one conversation', '/cloud-phone/omnichannel', '', ''],
      ['busts_in_silhouette', 'Team Messaging', 'Channels, threads and DMs', '/products/cloud-phone/team-chat/', '', ''],
    ],
  },
  agent: {
    icon: 'sparkles', iconClass: 'mcm-ic-ai', title: 'AI Agent', dot: true,
    desc: 'Answers calls and chats itself.',
    href: '/products/ai/ai-receptionist/', pill: 'AI AGENT · NEW', h: 'An agent that answers, books and hands off.',
    p: 'Answers calls and chats, books appointments, updates records and hands off to your team when needed.',
    items: [
      ['studio_microphone', 'AI Receptionist', 'Answers and logs every call', '/products/ai/ai-receptionist/', 'mcm-bg-ai', 'AI'],
      ['robot', 'AI Chatbot', 'Handles web chats round the clock', '/products/ai-chatbot', 'mcm-bg-ai', 'AI'],
      ['brain', 'AI Assistant', "Suggests your agent's next reply", '/products/contact-center/agent-assist/', 'mcm-bg-ai', 'AI'],
      ['chart_increasing', 'AI Call Intelligence', 'Reads calls for topics and cues', '/features/conversation-intelligence/', '', ''],
      ['calendar', 'AI Call Scheduling', 'Books the appointment on the call', '/products/ai-scheduling', '', ''],
      ['envelope_with_arrow', 'AI Follow-Ups', 'Sends the recap before you hang up', '/products/ai-follow-ups', '', ''],
    ],
  },
  dialer: {
    icon: 'pager', iconClass: 'mcm-ic-cc', title: 'Auto Dialer',
    desc: 'Preview, progressive, predictive.',
    pill: 'AUTO DIALER · OUTBOUND', h: 'Outbound pacing that lands on live answers.',
    p: 'Three dialing modes with DNC and time-zone screening built in — agents spend the day talking, not dialing.',
    items: [
      ['eye', 'Preview Dialing', 'Agents choose when to dial', '/products/preview-dialer', '', ''],
      ['fast-forward_button', 'Progressive Dialing', 'Dials the next lead automatically', '/products/progressive-dialer', '', ''],
      ['high_voltage', 'Predictive Dialing', 'Dials ahead to find live answers', '/products/predictive-dialer', 'mcm-bg-pop', 'Popular'],
    ],
  },
  tools: {
    icon: 'link', iconClass: 'mcm-ic-wh', title: 'Connected Tools',
    desc: 'Your stack, kept in sync.',
    pill: 'CONNECTED TOOLS · INTEGRATIONS', h: 'Every conversation, synced to your stack.',
    p: 'CRM, helpdesk, calendars and EHR stay current on their own — no copy-paste between tabs.',
    items: [
      ['card_index', 'CRM Integrations', 'Push calls and notes to your CRM', '/integrations#crm', 'mcm-bg-pop', 'Popular'],
      ['ticket', 'Helpdesk & Ticketing', 'Raise tickets from a conversation', '/integrations#helpdesk', '', ''],
      ['spiral_calendar', 'Productivity Tools', 'Calendars and email stay in step', '/integrations#productivity', '', ''],
      ['hospital', 'Healthcare EHR', 'Patient records stay in sync', '/integrations#ehr', '', ''],
      ['bar_chart', 'Analytics & Reporting', 'Live dashboards for every queue', '/products/customer-analytics', '', ''],
      ['puzzle_piece', 'REST APIs', 'Build on the platform directly', '/resources/learn/rest-apis', '', ''],
    ],
  },
};

/* Features and Solutions follow the "MCM Nav – UCaaS under Features &
   Solutions" sheet: three left tabs each (Tab Order 1–3), every tab with its
   featured card (the banner) and its menu items, using the sheet's titles,
   descriptions, badges and icons. Rows the sheet marks NEW carry 'recent'
   (black "built" dot); Existing rows get the red dot.
   Each page appears in exactly one tab:
   - UCaaS: the channels and numbers you communicate on.
   - Core Features: how calls are handled, included on every plan — paired
     as routing (IVR, routing), quality (recording, supervisor), outbound
     (dialer, callback), then live wallboards.
   - AI Features: AI layered on every conversation. */
const FEATURE_TABS = {
  ucaas: {
    icon: 'ucaas_stack', iconClass: 'mcm-ic-cp', title: 'UCaaS', isNew: true,
    desc: 'Phone, numbers, chat, video, SMS & fax.',
    pill: 'UCAAS · NEW', h: 'Every way your team communicates, unified.',
    p: 'Voice, toll-free numbers, team chat, HD video, business SMS, and online fax on one login — with UCaaS AI on every line.',
    cta: 'Overview →', href: '/unified-communication/',
    items: [
      ['telephone_receiver', 'Hosted Phone System', 'Extensions, ring groups, hunt groups.', '/products/cloud-phone/phone-system/', 'mcm-bg-pop', 'Popular', 'recent'],
      ['hash_tag', 'Toll-free Numbers', '800, 888, 877 in minutes.', '/numbers/toll-free/', '', '', 'recent'],
      ['messages_square', 'Team Chat', 'Chat wired into your phone system.', '/products/cloud-phone/team-chat/', '', '', 'recent'],
      ['video_camera', 'HD Video Meetings', '200-seat video with AI notes.', '/products/cloud-phone/video-meetings/', '', '', 'recent'],
      ['sms_bubble', 'Business SMS & MMS', 'Two-way texting, 10DLC-ready.', '/products/cloud-phone/sms-mms/', '', '', 'recent'],
      ['fax_printer', 'Online Fax', 'Encrypted digital fax with audit logs.', '/products/cloud-phone/online-fax/', '', '', 'recent'],
    ],
  },
  core: {
    icon: 'core_gear', iconClass: 'mcm-ic-wh', title: 'Core Features',
    desc: 'Included on every plan.',
    pill: 'CORE FEATURES', h: 'Everything a serious phone system needs — and nothing you don’t.',
    p: 'A visual IVR, smart routing, call recording, supervisor tools and live wallboards — included on every plan.',
    cta: 'Overview →', href: '/features/auto-attendant/',
    items: [
      ['card_index_dividers', 'Auto-attendant & IVR', 'Visual IVR builder.', '/features/auto-attendant/', '', '', 'recent'],
      ['shuffle_tracks_button', 'Call Routing', 'Dept · queue · extension · skill', '/features/call-routing/', '', ''],
      ['record_button', 'Call Recording', 'Full-fidelity with keyword search.', '/features/call-recording/', '', '', 'recent'],
      ['headphone', 'Supervisor Tools', 'Barge, whisper, monitor.', '/features/supervisor-tools/', '', ''],
      ['telephone', 'Auto Dialer', 'Preview · Progressive · Predictive', '/features/auto-dialer/', '', ''],
      ['right_arrow_curving_left', 'Callback Scheduling', 'AI books → Queue Manager returns call', '/features/callback/', 'mcm-bg-ai', 'AI→human'],
      ['bar_chart', 'Live Wallboards', 'Real-time queue & agent dashboards', '/features/wallboard/', '', ''],
    ],
  },
  ai: {
    icon: 'sparkles', iconClass: 'mcm-ic-ai', title: 'AI Features', dot: true,
    desc: 'AI on every conversation.',
    pill: 'AI FEATURES', h: 'AI that joins every conversation, not just the ones you flag.',
    p: 'Live answering, real-time sentiment, agent whisper, and conversation intelligence — natively, no add-ons.',
    cta: 'Overview →', href: '/products/ai/ai-receptionist/',
    items: [
      ['studio_microphone', 'AI Receptionist', '24/7 live answering.', '/products/ai/ai-receptionist/', 'mcm-bg-ai', 'AI'],
      ['sentiment_face', 'AI Sentiment Analysis', 'Real-time emotion scoring.', '/features/ai-sentiment/', 'mcm-bg-ai', 'AI'],
      ['agent_voice', 'AI Agent Assist', 'Live coaching for agents.', '/products/contact-center/agent-assist/', 'mcm-bg-ai', 'AI'],
      ['brain', 'Conversation Intelligence', 'Best-in-class, natively.', '/features/conversation-intelligence/', 'mcm-bg-ai', 'AI'],
    ],
  },
};

const SOLUTION_TABS = {
  ucaas: {
    icon: 'ucaas_stack', iconClass: 'mcm-ic-cp', title: 'UCaaS', isNew: true,
    desc: 'One platform, any team size.',
    pill: 'UCAAS · NEW', h: 'One communications platform — from a 5-seat office to a multi-site enterprise.',
    p: 'Replace separate phone, chat, video, and fax vendors with a single cloud platform your team can use from any device.',
    cta: 'Overview →', href: '/unified-communication/',
    items: [
      ['laptop_mac', 'Remote & Hybrid Teams', 'One number, every device.', '/solutions/remote-teams/', '', '', 'recent'],
      ['store_front', 'SMB Owner-Operators', 'Full phone system, zero hardware.', '/solutions/smb/', '', '', 'recent'],
      ['office_building', 'Enterprise IT', 'SSO, SCIM, multi-site.', '/solutions/enterprise-it/', '', '', 'recent'],
      ['users_group', 'Sales & Support Teams', 'Calling, SMS, and chat in one app.', '/solutions/sales-teams/', '', '', 'recent'],
    ],
  },
  industry: {
    icon: 'industry_building', iconClass: 'mcm-ic-cc', title: 'By Industry',
    desc: 'Finance · Retail · SaaS · Logistics',
    pill: 'BY INDUSTRY', h: 'Built for the regulations and rhythms of your industry.',
    p: 'FINRA + PCI for finance, omnichannel for retail and eCom, API-first for SaaS, and multi-site dispatch for logistics.',
    cta: 'Overview →', href: '/solutions/finance/',
    items: [
      ['bank_fill', 'Financial Services', 'Compliant for FINRA + PCI.', '/solutions/finance/', '', ''],
      ['shopping_bag', 'Retail & eCom', 'Omnichannel for DTC brands.', '/solutions/retail/', '', ''],
      ['puzzle_piece', 'SaaS & Tech', 'API-first phone for SaaS.', '/solutions/saas/', '', ''],
      ['truck_fill', 'Logistics', 'Multi-site dispatch.', '/solutions/logistics/', '', ''],
    ],
  },
  team: {
    icon: 'briefcase', iconClass: 'mcm-ic-wh', title: 'By Team',
    desc: 'Sales · Support · Remote · SMB · IT',
    pill: 'BY TEAM', h: 'Tools shaped to how your team actually sells, supports, and works.',
    p: 'Dialer and AI coaching for sales, omnichannel queues for support, one-number-everywhere for remote, AI front desk for SMBs, SSO and SCIM for enterprise IT.',
    cta: 'Overview →', href: '/solutions/sales-teams/',
    items: [
      ['funds_fill', 'Sales Teams', 'Dialer + AI coaching.', '/solutions/sales-teams/', '', ''],
      ['ticket', 'Support Teams', 'One queue, every channel.', '/solutions/support-teams/', '', ''],
      ['laptop_mac', 'Remote Teams', 'One number, every device.', '/solutions/remote-teams/', '', ''],
      ['store_front', 'SMB Owner-Operators', 'Our AI is your front desk.', '/solutions/smb/', '', ''],
      ['office_building', 'Enterprise IT', 'SSO, SCIM, multi-site.', '/solutions/enterprise-it/', '', ''],
    ],
  },
};

/* Menus that open as a left-rail panel (Products, Features, Solutions): their tabs,
   the rail heading, which tab opens first, and the footer line. */
const TABBED = {
  products: {
    tabs: PRODUCT_SUITES, first: 'cp', railLabel: 'Our Products', railCount: '4 suites',
    note: <><b>UCaaS AI</b> is on every line — included across Cloud Phone &amp; Contact Center.</>,
    links: <>Compare plans &nbsp;·&nbsp; Talk to sales →</>,
  },
  features: {
    tabs: FEATURE_TABS, first: 'ucaas', railLabel: 'Features', railCount: '3 tabs',
    note: <><b>Every feature</b> ships on every plan — no add-ons.</>,
    links: <a href="/features/">All features →</a>,
  },
  solutions: {
    tabs: SOLUTION_TABS, first: 'ucaas', railLabel: 'Solutions', railCount: '3 tabs',
    note: <><b>Not sure where you fit?</b> We’ll map the platform to your team and industry.</>,
    links: <a href="/solutions/">All solutions →</a>,
  },
};

const SIMPLE_PANELS = {
  numbers: {
    pill: 'NUMBERS', h: 'Get a number anywhere — live in minutes.',
    p: 'Local, toll-free & mobile numbers across 190+ countries. Carrier-grade calls, SMS, IVR & routing.',
    cta: 'Browse all →',
    items: [
      ['round_pushpin', 'Local Numbers', 'Geographic numbers by city/region', '/numbers/local/', '', ''],
      ['free_button', 'Toll-Free Numbers', '800 · 888 · 877 · 866 · 844 · 833', '/numbers/toll-free/', '', ''],
      ['mobile_phone', 'Mobile Numbers', 'Mobile-reachable in supported countries', '/numbers/mobile/', '', ''],
      ['world_map', 'By Country', '190+ countries — DID coverage', '/numbers/', '', ''],
    ],
  },
  resources: {
    pill: 'RESOURCES', h: 'Learn, compare, integrate.',
    p: 'Everything to evaluate and get the most out of UCaaS.',
    cta: 'Visit hub →',
    items: [
      ['memo', 'Blog · Docs · Knowledge Base', 'Guides, help & how-tos', '/blog/', '', ''],
      ['balance_scale', 'Compare', 'UCaaS vs the alternatives (×13)', '/compare/', '', ''],
      ['electric_plug', 'Integrations', 'HubSpot · Zoho · Salesforce · Monday · MS Teams · Zapier', '/integrations/', '', ''],
      ['hammer_and_wrench', 'Free Tools', 'Number lookup · validator · TTS (×10)', '/tools/', '', ''],
    ],
  },
};

const TABS = [
  ['products', 'Products', true],
  ['numbers', 'Numbers', true],
  ['features', 'Features', true],
  ['solutions', 'Solutions', true],
  ['resources', 'Resources', true],
  ['pricing', 'Pricing', false],
];

/* Menu icons: product-UI glyphs from Remix Icon (already loaded site-wide,
   the same kind of solid interface icon Stripe, HubSpot or Intercom put in
   their menus), each on a soft tinted tile. The data keys stay descriptive
   (`telephone_receiver`…); this map turns each into its glyph and a tone,
   and the tone groups related items by colour — calling blue, AI violet,
   messaging teal, scheduling amber, insight green, workplace slate. */
const MENU_ICONS = {
  // Cloud Phone
  telephone_receiver: ['ri-phone-fill', 'blue'],
  video_camera: ['ri-vidicon-fill', 'blue'],
  speech_balloon: ['ri-chat-smile-3-fill', 'teal'],
  inbox_tray: ['ri-inbox-2-fill', 'teal'],
  globe_with_meridians: ['ri-global-fill', 'blue'],
  busts_in_silhouette: ['ri-team-fill', 'teal'],
  // AI Agent
  studio_microphone: ['ri-mic-ai-fill', 'violet'],
  robot: ['ri-robot-2-fill', 'violet'],
  brain: ['ri-brain-fill', 'violet'],
  chart_increasing: ['ri-line-chart-fill', 'green'],
  calendar: ['ri-calendar-check-fill', 'amber'],
  envelope_with_arrow: ['ri-mail-send-fill', 'violet'],
  // Auto Dialer
  eye: ['ri-eye-fill', 'blue'],
  'fast-forward_button': ['ri-speed-up-fill', 'blue'],
  high_voltage: ['ri-flashlight-fill', 'amber'],
  // Connected Tools
  card_index: ['ri-contacts-book-3-fill', 'teal'],
  ticket: ['ri-customer-service-2-fill', 'teal'],
  spiral_calendar: ['ri-calendar-2-fill', 'amber'],
  hospital: ['ri-hospital-fill', 'rose'],
  bar_chart: ['ri-bar-chart-box-fill', 'green'],
  puzzle_piece: ['ri-code-s-slash-fill', 'slate'],
  // Numbers
  round_pushpin: ['ri-map-pin-2-fill', 'rose'],
  free_button: ['ri-customer-service-fill', 'green'],
  mobile_phone: ['ri-smartphone-fill', 'blue'],
  world_map: ['ri-earth-fill', 'teal'],
  // Features
  record_button: ['ri-record-circle-fill', 'rose'],
  card_index_dividers: ['ri-git-branch-fill', 'violet'],
  shuffle_tracks_button: ['ri-route-fill', 'blue'],
  headphone: ['ri-headphone-fill', 'teal'],
  telephone: ['ri-phone-find-fill', 'blue'],
  right_arrow_curving_left: ['ri-reply-fill', 'amber'],
  // Solutions
  briefcase: ['ri-briefcase-4-fill', 'slate'],
  office_building: ['ri-building-2-fill', 'slate'],
  // Resources
  memo: ['ri-article-fill', 'blue'],
  balance_scale: ['ri-scales-3-fill', 'violet'],
  electric_plug: ['ri-plug-fill', 'green'],
  hammer_and_wrench: ['ri-tools-fill', 'amber'],
  // Suites and the Pricing row
  cloud_phone: ['ri-cloud-fill', 'blue'],
  sparkles: ['ri-sparkling-2-fill', 'violet'],
  pager: ['ri-dashboard-3-fill', 'green'],
  link: ['ri-links-fill', 'amber'],
  money_bag: ['ri-price-tag-3-fill', 'green'],
  // Features additions from the content plan
  ucaas_stack: ['ri-stack-fill', 'blue'],
  sms_bubble: ['ri-message-2-fill', 'teal'],
  fax_printer: ['ri-printer-fill', 'slate'],
  sentiment_face: ['ri-emotion-happy-fill', 'violet'],
  // Features & Solutions tabs (sheet's lucide picks → Remix equivalents)
  mic_fill: ['ri-mic-fill', 'rose'],
  hash_tag: ['ri-hashtag', 'green'],
  messages_square: ['ri-discuss-fill', 'teal'],
  agent_voice: ['ri-user-voice-fill', 'violet'],
  core_gear: ['ri-settings-4-fill', 'amber'],
  laptop_mac: ['ri-macbook-fill', 'blue'],
  store_front: ['ri-store-2-fill', 'amber'],
  users_group: ['ri-group-fill', 'teal'],
  industry_building: ['ri-building-2-fill', 'green'],
  bank_fill: ['ri-bank-fill', 'green'],
  shopping_bag: ['ri-shopping-bag-3-fill', 'rose'],
  truck_fill: ['ri-truck-fill', 'amber'],
  funds_fill: ['ri-funds-fill', 'green'],
  // Mobile menu: one icon per top-level tab, so every row reads the same
  tab_products: ['ri-apps-2-fill', 'blue'],
  tab_numbers: ['ri-hashtag', 'teal'],
  tab_features: ['ri-star-smile-fill', 'violet'],
  tab_solutions: ['ri-lightbulb-flash-fill', 'amber'],
  tab_resources: ['ri-book-open-fill', 'rose'],
};

function MenuIcon({ name, className = 'mcm-glyph' }) {
  const [glyph, tone] = MENU_ICONS[name] || ['ri-checkbox-blank-circle-fill', 'slate'];
  return <i className={`${className} ${glyph} mcm-tone--${tone}`} aria-hidden="true"></i>;
}

/* Red "built" dot in the top-right corner of every menu link whose page
   exists (content/builtPages.js) — a working reminder of which entries are
   live and which still 404. Purely visual; hidden from assistive tech. */
function BuiltDot({ href, recent }) {
  // Black marks entries just added to the menu; red marks the rest.
  if (!isBuilt(href)) return null;
  return <span className={`mcm-built-dot${recent ? ' mcm-built-dot--recent' : ''}`} aria-hidden="true" title={recent ? 'Page built (newly added)' : 'Page built'}></span>;
}

function ItemGrid({ items }) {
  return (
    <div className="mcm-items">
      {items.map(([icon, name, sub, url, badgeClass, badgeText, flag]) => (
        <a className="mcm-item" href={url} key={name}>
          <BuiltDot href={url} recent={flag === 'recent'} />
          <div className="mcm-item-ic"><MenuIcon name={icon} /></div>
          <div>
            <div className="mcm-item-n">
              {name}
              {badgeText ? <span className={`mcm-badge ${badgeClass}`}>{badgeText}</span> : null}
            </div>
            <div className="mcm-item-s">{sub}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

/* Compact link list for the mobile menu: icon tile, name (+ badge), one-line
   description. */
function DrawerItems({ items, onNavigate }) {
  return (
    <div className="mcm-m-items">
      {items.map(([icon, name, sub, url, badgeClass, badgeText, flag]) => (
        <a className="mcm-m-item" href={url} key={name} onClick={onNavigate}>
          <BuiltDot href={url} recent={flag === 'recent'} />
          <span className="mcm-m-item-ic" aria-hidden="true"><MenuIcon name={icon} /></span>
          <span className="mcm-m-item-txt">
            <span className="mcm-m-item-n">
              {name}
              {badgeText ? <span className={`mcm-badge ${badgeClass}`}>{badgeText}</span> : null}
            </span>
            <span className="mcm-m-item-s">{sub}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

function Banner({ data }) {
  const cta = data.cta || 'Overview →';
  return (
    <div className="mcm-banner">
      <div>
        <span className="mcm-banner-pill">{data.pill}</span>
        <h3>{data.h}</h3>
        <p>{data.p}</p>
      </div>
      {data.href
        ? <a className="mcm-banner-cta" href={data.href}>{cta}<BuiltDot href={data.href} /></a>
        : <span className="mcm-banner-cta">{cta}</span>}
    </div>
  );
}

/* Left-rail panel shared by Products, Features and Solutions: the rail
   switches tabs, the right side shows that tab's banner and items.
   Tabs switch on hover (and keyboard focus); click still works. A short
   hover-intent delay stops a diagonal move toward the items from flicking
   through the tabs it passes over. */
const RAIL_HOVER_MS = 90;

function TabbedPanel({ menu, active, onSelect }) {
  const tab = menu.tabs[active] || menu.tabs[menu.first];
  const hoverTimer = useRef(null);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);
  const hoverSelect = (key) => {
    clearTimeout(hoverTimer.current);
    if (key === active) return;
    hoverTimer.current = setTimeout(() => onSelect(key), RAIL_HOVER_MS);
  };
  const cancelHover = () => clearTimeout(hoverTimer.current);
  return (
    <div className="mcm-panel">
      <div className="mcm-panel-grid">
        <div className="mcm-rail" role="tablist" aria-label={menu.railLabel}>
          <div className="mcm-rail-k"><span>{menu.railLabel}</span><span>{menu.railCount}</span></div>
          {Object.entries(menu.tabs).map(([key, s]) => (
            <button
              key={key} type="button" role="tab"
              aria-selected={active === key}
              className={`mcm-suite${active === key ? ' mcm-suite--on' : ''}`}
              onMouseEnter={() => hoverSelect(key)}
              onMouseLeave={cancelHover}
              onFocus={() => { cancelHover(); onSelect(key); }}
              onClick={() => { cancelHover(); onSelect(key); }}
            >
              <span className={`mcm-suite-ic ${s.iconClass}`}><MenuIcon name={s.icon} /></span>
              <span>
                <span className="mcm-suite-t">
                  {s.title}
                  {s.dot ? <span className="mcm-dotp"></span> : null}
                  {s.isNew ? <span className="mcm-new">New</span> : null}
                </span>
                <span className="mcm-suite-d">{s.desc}</span>
              </span>
              <span className="mcm-suite-arrow">→</span>
            </button>
          ))}
        </div>
        <div className="mcm-content" role="tabpanel">
          <Banner data={tab} />
          <ItemGrid items={tab.items} />
        </div>
      </div>
      <div className="mcm-foot">
        <span>✦ {menu.note}</span>
        <span>{menu.links}</span>
      </div>
    </div>
  );
}

export default function McmMegaHeader() {
  const [openTab, setOpenTab] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  // Selected left-rail tab per tabbed menu; each opens on its first tab.
  const [railTab, setRailTab] = useState(() =>
    Object.fromEntries(Object.entries(TABBED).map(([k, m]) => [k, m.first]))
  );
  const [stuck, setStuck] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const rootRef = useRef(null);

  // The promo banner above is fixed and dismissible, so the bar tracks its
  // live height rather than assuming a constant.
  useEffect(() => {
    const banner = document.querySelector('.ntb-banner');
    const measure = () => {
      // offsetParent is always null for position:fixed, so test visibility directly.
      const visible = banner && getComputedStyle(banner).display !== 'none' && getComputedStyle(banner).visibility !== 'hidden';
      const h = visible ? banner.getBoundingClientRect().height : 0;
      setTopOffset(h);
    };
    measure();
    const ro = banner ? new ResizeObserver(measure) : null;
    if (ro && banner) ro.observe(banner);
    window.addEventListener('resize', measure);
    return () => { ro?.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!openTab) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpenTab(null);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpenTab(null); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openTab]);

  // Mobile menu: lock the page behind it, close on Escape, and close if the
  // window grows past the burger breakpoint so desktop never inherits it.
  useEffect(() => {
    if (!mobileOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    // Smooth scrolling (SmoothScroll.jsx) drives the page itself, so it has
    // to be paused too or the page would still glide behind the menu.
    window.dispatchEvent(new CustomEvent('ucaas:scroll-lock', { detail: true }));
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    const wide = window.matchMedia('(min-width: 981px)');
    const onWide = (e) => { if (e.matches) setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      html.style.overflow = prevOverflow;
      window.dispatchEvent(new CustomEvent('ucaas:scroll-lock', { detail: false }));
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [mobileOpen]);

  const closeMobile = () => { setMobileOpen(false); setMobileSection(null); };
  const toggleSection = (key) => setMobileSection((cur) => (cur === key ? null : key));

  const toggle = (key) => setOpenTab((cur) => (cur === key ? null : key));

  /* Hover to open, on devices that can hover (mouse / trackpad). Touch
     screens keep tap-to-toggle, since they have no hover. Moving the pointer
     anywhere inside the bar or the open panel keeps it open; leaving the
     whole header closes it after a short grace period, so crossing the small
     gap between a tab and its panel never flickers it shut. */
  const canHover = useRef(false);
  const closeTimer = useRef(null);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => { canHover.current = mq.matches; };
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      clearTimeout(closeTimer.current);
    };
  }, []);
  const cancelClose = () => clearTimeout(closeTimer.current);
  // A text selection left on the page (drag, double-click, Ctrl+A) would
  // paint the opening panel in the browser's blue selection highlight.
  const clearSelection = () => {
    const sel = window.getSelection?.();
    if (sel && !sel.isCollapsed) sel.removeAllRanges();
  };
  const hoverOpen = (key) => {
    if (!canHover.current) return;
    cancelClose();
    clearSelection();
    setOpenTab(key);
  };
  const hoverClose = (delay = 160) => {
    if (!canHover.current) return;
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenTab(null), delay);
  };
  // With hover available a click only ever opens (the hover already did);
  // toggling would shut the panel the pointer is resting on.
  const onTabClick = (key) => { clearSelection(); return canHover.current ? setOpenTab(key) : toggle(key); };

  return (
    <div className="mcm-nav-slot" ref={rootRef}>
      <div
        className={`mcm-wrap${stuck ? ' mcm-wrap--stuck' : ''}${mobileOpen ? ' mcm-wrap--menu' : ''}${openTab ? ' mcm-wrap--panel' : ''}`}
        style={{ top: topOffset, '--mcm-top': `${topOffset}px` }}
        onMouseEnter={cancelClose}
        onMouseLeave={() => hoverClose()}
      >
        <nav className="mcm-bar" aria-label="Main">
          <a className="mcm-logo" href="/"><img className="mcm-logo-img" src="/media/ucaas-logo.webp" alt="UCaaS" /></a>

          {TABS.map(([key, label, hasPanel]) =>
            hasPanel ? (
              <button
                key={key} type="button"
                className={`mcm-tab${openTab === key ? ' mcm-tab--active' : ''}`}
                aria-expanded={openTab === key}
                aria-haspopup="true"
                onMouseEnter={() => hoverOpen(key)}
                onClick={() => onTabClick(key)}
              >
                {label} <span className="mcm-caret">▾</span>
              </button>
            ) : (
              <a key={key} className="mcm-tab" href="/pricing" onMouseEnter={() => hoverClose(0)} onClick={() => setOpenTab(null)}>{label}</a>
            )
          )}

          <div className="mcm-right">
            <a className="mcm-btn mcm-btn--ghost" href="/sign-in" target="_blank" rel="noopener noreferrer">Sign in</a>
            <a className="mcm-btn mcm-btn--solid" href="/sign-up" target="_blank" rel="noopener noreferrer">Sign up</a>
          </div>

          <button
            type="button"
            className={`mcm-burger${mobileOpen ? ' mcm-burger--open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mcm-mobile-menu"
            onClick={() => { if (mobileOpen) closeMobile(); else setMobileOpen(true); setOpenTab(null); }}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>

        {/* Mobile menu: a full-height sheet under the bar. Each tab is an
            accordion holding the same links as its desktop mega panel —
            Products grouped by suite — so nothing on desktop is unreachable on
            a phone. The sign-in pair stays pinned at the bottom. */}
        {mobileOpen && (
          <div className="mcm-drawer" id="mcm-mobile-menu" role="dialog" aria-label="Site menu">
            <div className="mcm-drawer-scroll" data-lenis-prevent>
              {TABS.map(([key, label, hasPanel]) => {
                if (!hasPanel) {
                  return (
                    <a key={key} className="mcm-acc-head mcm-acc-head--link" href="/pricing" onClick={closeMobile}>
                      <span className="mcm-acc-label"><MenuIcon name="money_bag" className="mcm-acc-ic" />{label}</span>
                      <span className="mcm-acc-arrow" aria-hidden="true">→</span>
                    </a>
                  );
                }
                const open = mobileSection === key;
                return (
                  <div key={key} className={`mcm-acc${open ? ' mcm-acc--open' : ''}`}>
                    <button
                      type="button"
                      className="mcm-acc-head"
                      aria-expanded={open}
                      aria-controls={`mcm-acc-${key}`}
                      onClick={() => toggleSection(key)}
                    >
                      <span className="mcm-acc-label"><MenuIcon name={`tab_${key}`} className="mcm-acc-ic" />{label}</span>
                      <span className="mcm-acc-chev" aria-hidden="true"></span>
                    </button>
                    <div className="mcm-acc-body" id={`mcm-acc-${key}`}>
                      <div className="mcm-acc-inner">
                        {TABBED[key]
                          ? Object.entries(TABBED[key].tabs).map(([sk, s]) => (
                              <div className="mcm-m-group" key={sk}>
                                <div className="mcm-m-group-head">
                                  <span className={`mcm-suite-ic ${s.iconClass}`} aria-hidden="true"><MenuIcon name={s.icon} /></span>
                                  <span>
                                    <span className="mcm-m-group-t">
                                      {s.title}
                                      {s.isNew ? <span className="mcm-new">New</span> : null}
                                    </span>
                                    <span className="mcm-m-group-d">{s.desc}</span>
                                  </span>
                                </div>
                                <DrawerItems items={s.items} onNavigate={closeMobile} />
                              </div>
                            ))
                          : <DrawerItems items={SIMPLE_PANELS[key].items} onNavigate={closeMobile} />}
                      </div>
                    </div>
                  </div>
                );
              })}

              <p className="mcm-drawer-note">✦ <b>UCaaS AI</b> is on every line — included across Cloud Phone &amp; Contact Center.</p>
            </div>

            <div className="mcm-drawer-actions">
              <a className="mcm-btn mcm-btn--ghost" href="/sign-in" target="_blank" rel="noopener noreferrer" onClick={closeMobile}>Sign in</a>
              <a className="mcm-btn mcm-btn--solid" href="/sign-up" target="_blank" rel="noopener noreferrer" onClick={closeMobile}>Sign up</a>
            </div>
          </div>
        )}

        {openTab && TABBED[openTab] && (
          <TabbedPanel
            menu={TABBED[openTab]}
            active={railTab[openTab]}
            onSelect={(key) => setRailTab((cur) => (cur[openTab] === key ? cur : { ...cur, [openTab]: key }))}
          />
        )}

        {openTab && !TABBED[openTab] && SIMPLE_PANELS[openTab] && (
          <div className="mcm-panel">
            <div className="mcm-content">
              <Banner data={SIMPLE_PANELS[openTab]} />
              <ItemGrid items={SIMPLE_PANELS[openTab].items} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
