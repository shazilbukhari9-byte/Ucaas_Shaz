'use client';
/* Sign-in and sign-up pages. Split screen: on the left a nature
   photo slideshow (cross-fading with a slow Ken Burns drift), a rotating customer quote and a live stat chip; on the right the form.

   The forms post to the auth API (app/api/auth/*): sign-up creates the
   account and signs you in, sign-in checks the password, and both land on
   /account (or the ?next= page). Field errors from the server show inline.
   Google / Microsoft buttons start the OAuth flow (app/api/auth/oauth/*);
   if that comes back with ?error=…, the reason is shown above the form. */
import { useEffect, useState } from 'react';

// Nature photography (Unsplash, free licence), served from the Unsplash CDN
// and cropped to the tall panel.
const SCENES = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fm=jpg&q=72&w=1800&auto=format&fit=crop', place: 'Sea of clouds at dawn' },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?fm=jpg&q=72&w=1800&auto=format&fit=crop', place: 'Highlands at golden hour' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?fm=jpg&q=72&w=1800&auto=format&fit=crop', place: 'Sunlit forest trail' },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?fm=jpg&q=72&w=1800&auto=format&fit=crop', place: 'Pine valley below the peaks' },
];

const QUOTES = [
  { q: 'We moved three offices off our old PBX in a weekend. Nobody missed a call.', who: 'Operations lead, multi-site retail' },
  { q: 'The AI receptionist answers before the second ring — our customers noticed in a week.', who: 'Owner, dental practice' },
  { q: 'One console for every number, every site. Our IT team finally got its evenings back.', who: 'IT manager, logistics' },
];

function Visual() {
  const [i, setI] = useState(0);
  const [calls, setCalls] = useState(1284);
  // Only the first scene is part of the initial page load, so the tab's
  // loading indicator stops as soon as the page is usable. The other three
  // are fetched once the browser is idle after load, well before they show.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    const go = () => {
      if (window.requestIdleCallback) window.requestIdleCallback(() => setWarm(true), { timeout: 1500 });
      else setTimeout(() => setWarm(true), 600);
    };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => window.removeEventListener('load', go);
  }, []);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) return undefined;
    const a = setInterval(() => setI((n) => (n + 1) % SCENES.length), 3000);
    const b = setInterval(() => setCalls((c) => c + 1 + (c % 3 === 0 ? 1 : 0)), 2400);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const quote = QUOTES[i % QUOTES.length];

  return (
    <aside className="auth-visual" aria-hidden="true">
      {SCENES.map((s, n) => (
        <div
          key={s.src}
          className={`auth-scene auth-scene--${n % 2 ? 'b' : 'a'}${n === i ? ' is-on' : ''}`}
          style={n === 0 || warm ? { backgroundImage: `url(${s.src})` } : undefined}
        ></div>
      ))}
      <div className="auth-visual-shade"></div>

      <a className="auth-visual-logo" href="/" tabIndex={-1}>
        <img src="/media/ucaas-logo.webp" alt="" />
      </a>

      <div className="auth-chip">
        <span className="auth-chip-ic"><i className="ri-phone-fill"></i></span>
        <span className="auth-chip-txt">
          <b>{calls.toLocaleString('en-US')}</b>
          <em><i className="auth-dot"></i>calls answered today</em>
        </span>
      </div>

      <div className="auth-quote" key={i}>
        <i className="ri-double-quotes-l auth-quote-mark"></i>
        <p>{quote.q}</p>
        <span>{quote.who}</span>
      </div>

      <div className="auth-visual-foot">
        <span className="auth-place"><i className="ri-map-pin-2-line"></i>{SCENES[i].place}</span>
        <span className="auth-dots">
          {SCENES.map((s, n) => <i key={s.src} className={n === i ? 'is-on' : ''}></i>)}
        </span>
      </div>
    </aside>
  );
}

function Field({ label, error, children, hint, id }) {
  return (
    <div className={`auth-field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <span className="auth-error" role="alert">{error}</span> : hint ? <span className="auth-hint">{hint}</span> : null}
    </div>
  );
}

function Password({ id, value, onChange, autoComplete, invalid }) {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-pw">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        placeholder="••••••••"
      />
      <button type="button" className="auth-pw-toggle" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
        <i className={show ? 'ri-eye-off-line' : 'ri-eye-line'} aria-hidden="true"></i>
      </button>
    </div>
  );
}

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s += 1;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s += 1;
  if (/\d/.test(pw)) s += 1;
  if (/[^A-Za-z0-9]/.test(pw)) s += 1;
  return s;
}
const STRENGTH = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SSO_ERRORS = {
  sso_unavailable: (p) => `${p} sign-in isn’t switched on for this site yet. Please use your email and password for now.`,
  sso_cancelled: (p) => `${p} sign-in was cancelled. You can try again or use your email.`,
  sso_failed: (p) => `We couldn’t sign you in with ${p}. Please try again.`,
};

/* An error passed back from the OAuth redirect (?error=…&provider=…). */
function useSsoError() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const fn = SSO_ERRORS[q.get('error')];
    if (fn) setMsg(fn(q.get('provider') === 'microsoft' ? 'Microsoft' : 'Google'));
  }, []);
  return msg;
}

/* Where to go after signing in: a same-site ?next= path, else /account. */
function nextPath() {
  try {
    const n = new URLSearchParams(window.location.search).get('next');
    if (n && n.startsWith('/') && !n.startsWith('//')) return n;
  } catch {}
  return '/account';
}

async function post(url, data) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'same-origin',
    });
    const body = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, body };
  } catch {
    return { ok: false, status: 0, body: { error: 'Network error — check your connection and try again.' } };
  }
}

function FormAlert({ msg }) {
  if (!msg) return null;
  return (
    <div className="auth-alert" role="alert">
      <i className="ri-error-warning-line" aria-hidden="true"></i>{msg}
    </div>
  );
}

function SocialButtons({ verb, from }) {
  // ?next= is read after mount so server and client render the same links.
  const [next, setNext] = useState('');
  useEffect(() => { setNext(new URLSearchParams(window.location.search).get('next') || ''); }, []);
  const href = (id) => `/api/auth/oauth/${id}?from=${from}${next ? `&next=${encodeURIComponent(next)}` : ''}`;
  return (
    <div className="auth-sso">
      <a className="auth-sso-btn" href={href('google')}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
          <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23Z" />
          <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9Z" />
          <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4Z" />
        </svg>
        <span className="auth-sso-verb">{verb} with </span>Google
      </a>
      <a className="auth-sso-btn" href={href('microsoft')}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="#F25022" d="M2 2h9.5v9.5H2z" /><path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
          <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" /><path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
        </svg>
        <span className="auth-sso-verb">{verb} with </span>Microsoft
      </a>
    </div>
  );
}

function SignInForm() {
  const [v, setV] = useState({ email: '', password: '', remember: true });
  useEffect(() => {
    const e = new URLSearchParams(window.location.search).get('email');
    if (e) setV((cur) => ({ ...cur, email: e }));
  }, []);
  const [err, setErr] = useState({});
  const [state, setState] = useState('idle');
  const set = (k) => (e) => setV({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const [alert, setAlert] = useState('');
  const ssoError = useSsoError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const n = {};
    if (!EMAIL.test(v.email.trim())) n.email = 'Enter a valid work email.';
    if (!v.password) n.password = 'Enter your password.';
    setErr(n);
    setAlert('');
    if (Object.keys(n).length) return;
    setState('loading');
    const r = await post('/api/auth/sign-in', { email: v.email, password: v.password, remember: v.remember });
    if (r.ok) {
      setState('done');
      window.location.assign(nextPath());
      return;
    }
    setState('idle');
    setErr(r.body.fields || {});
    setAlert(r.body.fields ? '' : r.body.error || 'Something went wrong. Please try again.');
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <SocialButtons verb="Sign in" from="sign-in" />
      <div className="auth-or"><span>or sign in with email</span></div>
      <FormAlert msg={alert || ssoError} />
      <Field label="Work email" id="si-email" error={err.email}>
        <input id="si-email" type="email" value={v.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" aria-invalid={!!err.email || undefined} />
      </Field>
      <Field label="Password" id="si-pw" error={err.password}>
        <Password id="si-pw" value={v.password} onChange={set('password')} autoComplete="current-password" invalid={!!err.password} />
      </Field>
      <div className="auth-row">
        <label className="auth-check">
          <input type="checkbox" checked={v.remember} onChange={set('remember')} />
          <span>Keep me signed in</span>
        </label>
        <a href="/contact-sales" className="auth-link">Forgot password?</a>
      </div>
      <button type="submit" className="auth-submit" disabled={state !== 'idle'}>
        {state !== 'idle' ? <><span className="auth-spin" aria-hidden="true"></span>Signing in…</> : <>Sign in <i className="ri-arrow-right-line" aria-hidden="true"></i></>}
      </button>
    </form>
  );
}

function SignUpForm({ demo = false }) {
  const [v, setV] = useState({ first: '', last: '', email: '', company: '', password: '', terms: false });
  const [err, setErr] = useState({});
  const [state, setState] = useState('idle');
  const set = (k) => (e) => setV({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const s = strength(v.password);

  const [alert, setAlert] = useState('');
  const ssoError = useSsoError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const n = {};
    if (!v.first.trim()) n.first = 'Required.';
    if (!v.last.trim()) n.last = 'Required.';
    if (!EMAIL.test(v.email.trim())) n.email = 'Enter a valid work email.';
    if (!v.company.trim()) n.company = 'Enter your company name.';
    if (v.password.length < 8) n.password = 'Use at least 8 characters.';
    if (!v.terms) n.terms = 'Please accept the terms to continue.';
    setErr(n);
    setAlert('');
    if (Object.keys(n).length) return;
    setState('loading');
    const r = await post('/api/auth/sign-up', v);
    if (r.ok) {
      setState('done');
      window.location.assign(nextPath() === '/account' ? '/account?welcome=1' : nextPath());
      return;
    }
    setState('idle');
    setErr(r.body.fields || {});
    setAlert(r.status === 409 ? '' : r.body.fields ? '' : r.body.error || 'Something went wrong. Please try again.');
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <SocialButtons verb="Sign up" from="sign-up" />
      <div className="auth-or"><span>or sign up with email</span></div>
      <FormAlert msg={alert || ssoError} />
      <div className="auth-two">
        <Field label="First name" id="su-first" error={err.first}>
          <input id="su-first" value={v.first} onChange={set('first')} autoComplete="given-name" placeholder="Priya" aria-invalid={!!err.first || undefined} />
        </Field>
        <Field label="Last name" id="su-last" error={err.last}>
          <input id="su-last" value={v.last} onChange={set('last')} autoComplete="family-name" placeholder="Sharma" aria-invalid={!!err.last || undefined} />
        </Field>
      </div>
      <Field label="Work email" id="su-email" error={err.email && err.email.includes('already registered')
        ? <>This email is already registered — <a className="auth-link" href={`/sign-in?email=${encodeURIComponent(v.email.trim())}`}>sign in instead</a>.</>
        : err.email}>
        <input id="su-email" type="email" value={v.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" aria-invalid={!!err.email || undefined} />
      </Field>
      <Field label="Company" id="su-company" error={err.company}>
        <input id="su-company" value={v.company} onChange={set('company')} autoComplete="organization" placeholder="Acme Inc." aria-invalid={!!err.company || undefined} />
      </Field>
      <Field label="Password" id="su-pw" error={err.password}>
        <Password id="su-pw" value={v.password} onChange={set('password')} autoComplete="new-password" invalid={!!err.password} />
        {v.password && (
          <span className={`auth-meter auth-meter--${s}`} aria-live="polite">
            <span className="auth-meter-bars"><i></i><i></i><i></i><i></i></span>
            {STRENGTH[s]}
          </span>
        )}
      </Field>
      <label className={`auth-check auth-check--terms${err.terms ? ' has-error' : ''}`}>
        <input type="checkbox" checked={v.terms} onChange={set('terms')} />
        <span>I agree to the <a href="/terms" className="auth-link">Terms</a> and <a href="/privacy" className="auth-link">Privacy Policy</a>.</span>
      </label>
      {err.terms && <span className="auth-error" role="alert">{err.terms}</span>}
      <button type="submit" className="auth-submit" disabled={state !== 'idle'}>
        {state !== 'idle' ? <><span className="auth-spin" aria-hidden="true"></span>Creating account…</> : <>{demo ? 'Book my demo' : 'Start free trial'} <i className="ri-arrow-right-line" aria-hidden="true"></i></>}
      </button>
    </form>
  );
}

export default function AuthPage({ mode }) {
  const signUp = mode === 'sign-up';
  // "Book a demo" buttons land here with ?intent=demo: same form, but the
  // heading speaks to booking a demo. Read after mount so server and client
  // render the same markup first.
  const [demo, setDemo] = useState(false);
  useEffect(() => {
    if (signUp) setDemo(new URLSearchParams(window.location.search).get('intent') === 'demo');
  }, [signUp]);
  return (
    <div className="auth">
      <Visual />
      <main className="auth-main">
        <div className="auth-top">
          <a className="auth-logo" href="/"><img src="/media/ucaas-logo.webp" alt="UCaaS home" /></a>
          <span className="auth-switch">
            {signUp ? 'Already have an account?' : 'New to UCaaS?'}{' '}
            <a href={signUp ? '/sign-in' : '/sign-up'}>{signUp ? 'Sign in' : 'Create an account'}</a>
          </span>
        </div>

        <div className="auth-card">
          <span className="auth-badge"><i className={demo ? 'ri-calendar-check-fill' : signUp ? 'ri-sparkling-2-fill' : 'ri-shield-check-fill'} aria-hidden="true"></i>{demo ? 'Book a demo · 30 minutes' : signUp ? 'Free trial · no hardware' : 'Secure sign-in'}</span>
          <h1 className="auth-title">{demo ? 'Book your demo' : signUp ? 'Start your free trial' : 'Welcome back'}</h1>
          <p className="auth-sub">
            {demo
              ? 'Create your account and we’ll set up a walkthrough of UCaaS built around your team.'
              : signUp
                ? 'Your business phone, AI receptionist and team messaging — live in minutes.'
                : 'Sign in to manage your numbers, calls and team.'}
          </p>
          {signUp ? <SignUpForm demo={demo} /> : <SignInForm />}
        </div>

        <div className="auth-bottom">
          <span><i className="ri-lock-2-line" aria-hidden="true"></i>Encrypted connection</span>
          <span><i className="ri-customer-service-2-line" aria-hidden="true"></i>Real people when you need help</span>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </main>
    </div>
  );
}
