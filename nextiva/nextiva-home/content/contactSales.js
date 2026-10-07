/* Contact sales page copy (app/contact-sales). Placeholder copy for the
   template — swap in the final wording here; the layout reads everything
   from this file. Keep it free of unverified claims (no response-time
   promises, customer counts, prices or certifications). */

export const CONTACT = {
  meta: {
    title: 'Contact sales | UCaaS',
    description: 'Talk to the UCaaS team about business phone, contact center, AI receptionist and team messaging for your organisation.',
  },

  // Nature photo behind the hero (unique to this page).
  heroArt: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?fm=jpg&q=72&w=2000&auto=format&fit=crop',

  hero: {
    eyebrow: 'Contact sales',
    headline: ['Let’s', 'plan', 'the', 'right', 'setup', 'for', 'your', 'team'],
    accent: [4], // index of the words drawn in the orange accent
    lede: 'Tell us a little about your business and what you need. We’ll walk you through the platform and help you map out the next steps.',
    points: [
      { icon: 'ri-presentation-line', text: 'A walkthrough shaped around your team' },
      { icon: 'ri-route-line', text: 'Help planning a move from your current system' },
      { icon: 'ri-chat-check-line', text: 'Straight answers on setup and rollout' },
    ],
  },

  // Quick ways to reach the team, shown under the hero copy.
  channels: [
    { icon: 'ri-calendar-event-line', label: 'Book a demo', sub: 'Pick a time that suits you', href: '/sign-up?intent=demo' },
    { icon: 'ri-customer-service-2-line', label: 'Existing customer?', sub: 'Go to your account', href: '/account' },
  ],

  form: {
    title: 'Talk to our sales team',
    sub: 'Two quick steps — it takes about a minute.',
    sizes: ['1–10', '11–50', '51–200', '201–1,000', '1,000+'],
    interests: [
      { id: 'phone', icon: 'ri-phone-line', label: 'Business phone' },
      { id: 'cc', icon: 'ri-headphone-line', label: 'Contact center' },
      { id: 'ai', icon: 'ri-robot-2-line', label: 'AI receptionist' },
      { id: 'chat', icon: 'ri-chat-3-line', label: 'Team chat' },
      { id: 'video', icon: 'ri-vidicon-line', label: 'Video meetings' },
      { id: 'sms', icon: 'ri-message-2-line', label: 'Business SMS' },
    ],
    consent: 'By submitting, you agree that UCaaS may contact you about this enquiry.',
    doneTitle: 'Thanks — we’ve got it',
    doneText: 'Someone from our team will be in touch using the details you shared.',
  },

  ways: {
    kicker: 'Ways to connect',
    title: 'Choose how you’d like to talk',
    items: [
      { icon: 'ri-briefcase-4-line', title: 'Sales', text: 'Plans, rollout and pricing questions for your organisation.', cta: 'Fill in the form', href: '#cs-form' },
      { icon: 'ri-calendar-check-line', title: 'Live demo', text: 'See the platform working with a member of our team.', cta: 'Book a demo', href: '/sign-up?intent=demo' },
      { icon: 'ri-lifebuoy-line', title: 'Support', text: 'Already a customer? Get help from your account.', cta: 'Open account', href: '/account' },
    ],
  },

  steps: {
    kicker: 'What happens next',
    title: 'From first message to go-live',
    items: [
      { title: 'We review your needs', text: 'Your details go to the team that covers your size and industry.' },
      { title: 'A tailored walkthrough', text: 'We show you the features that matter for the way you work.' },
      { title: 'A clear rollout plan', text: 'Numbers, users and devices — mapped out step by step.' },
    ],
  },

  topics: {
    kicker: 'Topics we can help with',
    title: 'One conversation, the whole platform',
    items: [
      { icon: 'ri-phone-fill', title: 'Hosted phone system', href: '/products/cloud-phone/phone-system/' },
      { icon: 'ri-headphone-fill', title: 'Contact center', href: '/features/' },
      { icon: 'ri-robot-2-fill', title: 'AI receptionist', href: '/products/ai/ai-receptionist/' },
      { icon: 'ri-chat-3-fill', title: 'Team chat', href: '/features/' },
      { icon: 'ri-vidicon-fill', title: 'Video meetings', href: '/features/' },
      { icon: 'ri-message-2-fill', title: 'Business SMS', href: '/features/' },
      { icon: 'ri-hashtag', title: 'Numbers & porting', href: '/features/' },
      { icon: 'ri-plug-fill', title: 'Integrations', href: '/integrations/' },
    ],
  },

  faq: {
    kicker: 'FAQ',
    title: 'Before you reach out',
    items: [
      { q: 'Who will get in touch with me?', a: 'A member of our sales team who looks after businesses like yours.' },
      { q: 'Do I need to know exactly what I want?', a: 'No. Tell us how your team works today and we’ll help you work out what fits.' },
      { q: 'Can I keep my existing phone numbers?', a: 'In most cases, yes — we’ll talk you through porting during the walkthrough.' },
      { q: 'I’m already a customer. Where do I get help?', a: 'Sign in to your account to reach support and manage your services.' },
    ],
  },
};
