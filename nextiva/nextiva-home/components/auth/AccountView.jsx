'use client';
/* Signed-in landing page (/account): who you are, your trial, and the first
   steps to get a phone system running. Sign out clears the session cookie
   via the API and returns to the sign-in page. */
import { useState } from 'react';

const STEPS = [
  { icon: 'ri-hashtag', title: 'Pick your business number', text: 'Choose a local or toll-free number, or port the one you have.', href: '/numbers/toll-free/', cta: 'Browse numbers' },
  { icon: 'ri-git-branch-line', title: 'Build your call menu', text: 'Set up an auto-attendant so every caller reaches the right person.', href: '/features/auto-attendant/', cta: 'See IVR builder' },
  { icon: 'ri-team-line', title: 'Add your team', text: 'Give everyone an extension that rings on desk, laptop and mobile.', href: '/products/cloud-phone/phone-system/', cta: 'Explore phone system' },
  { icon: 'ri-robot-2-line', title: 'Turn on the AI receptionist', text: 'Answer every call 24/7 and book appointments automatically.', href: '/products/ai/ai-receptionist/', cta: 'Meet the receptionist' },
];

const fmt = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
};

export default function AccountView({ user, welcome }) {
  const [busy, setBusy] = useState(false);
  const initials = `${user.first?.[0] || ''}${user.last?.[0] || ''}`.toUpperCase();

  const signOut = async () => {
    setBusy(true);
    try {
      await fetch('/api/auth/sign-out', { method: 'POST', credentials: 'same-origin' });
    } finally {
      window.location.assign('/sign-in');
    }
  };

  return (
    <div className="acct">
      <header className="acct-bar">
        <a href="/" className="acct-logo"><img src="/media/ucaas-logo.webp" alt="UCaaS home" /></a>
        <div className="acct-user">
          <span className="acct-av" aria-hidden="true">{initials}</span>
          <span className="acct-user-txt">
            <b>{user.first} {user.last}</b>
            <em>{user.email}</em>
          </span>
          <button type="button" className="acct-signout" onClick={signOut} disabled={busy}>
            <i className="ri-logout-box-r-line" aria-hidden="true"></i>{busy ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </header>

      <main className="acct-main">
        {welcome && (
          <div className="acct-welcome" role="status">
            <i className="ri-checkbox-circle-fill" aria-hidden="true"></i>
            Your account is ready. Welcome aboard, {user.first}!
          </div>
        )}

        <section className="acct-hero">
          <div>
            {user.company && <span className="acct-kicker">{user.company}</span>}
            <h1 className="acct-title">Good to see you, {user.first}.</h1>
            <p className="acct-sub">Here’s everything you need to get your business phone system live.</p>
          </div>
          <div className="acct-plan">
            <span className="acct-plan-tag"><i aria-hidden="true"></i>Free trial</span>
            <b>Your trial account</b>
            <span>Explore the platform — talk to us when you’re ready to choose a plan.</span>
            <a href="/contact-sales" className="acct-plan-btn">Talk to sales <i className="ri-arrow-right-line" aria-hidden="true"></i></a>
          </div>
        </section>

        <section className="acct-grid">
          <div className="acct-card acct-card--steps">
            <h2>Get started</h2>
            <ol className="acct-steps">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="acct-step-ic"><i className={s.icon} aria-hidden="true"></i></span>
                  <span className="acct-step-txt">
                    <b><span className="acct-step-n">{i + 1}.</span> {s.title}</b>
                    <em>{s.text}</em>
                  </span>
                  <a href={s.href} className="acct-step-go">{s.cta} <i className="ri-arrow-right-up-line" aria-hidden="true"></i></a>
                </li>
              ))}
            </ol>
          </div>

          <div className="acct-card">
            <h2>Account details</h2>
            <dl className="acct-dl">
              <div><dt>Name</dt><dd>{user.first} {user.last}</dd></div>
              <div><dt>Work email</dt><dd>{user.email}</dd></div>
              <div><dt>Company</dt><dd>{user.company || '—'}</dd></div>
              <div><dt>Member since</dt><dd>{fmt(user.createdAt)}</dd></div>
              {user.providers?.length > 0 && <div><dt>Signs in with</dt><dd>{user.providers.map((x) => (x === 'google' ? 'Google' : 'Microsoft')).join(', ')}</dd></div>}
              <div><dt>Last sign-in</dt><dd>{fmt(user.lastLoginAt)}</dd></div>
            </dl>
            <div className="acct-help">
              <i className="ri-customer-service-2-line" aria-hidden="true"></i>
              <span>Need a hand setting up? <a href="/contact-sales">Book a walkthrough</a></span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
