'use client';
/* Contact sales page (app/contact-sales). Copy lives in content/contactSales.js.

   Motion, all CSS-driven and switched off for prefers-reduced-motion:
   - hero: the headline words rise in one by one; floating 3D shapes drift
     and follow the pointer at different depths (parallax);
   - the form card tilts in 3D towards the pointer with a soft glare, its
     layers lifted on translateZ so they separate as it turns;
   - "Ways to connect" cards tilt the same way;
   - "What happens next" cards flip up into place as they scroll in;
   - "Topics" is a slowly turning 3D ring of cards (pauses while the visitor
     is pointing at it).
   The form has no backend yet: submitting shows the thank-you state only. */
import { useRef, useState } from 'react';
import FaqList from '../landing/FaqList';
import { CONTACT } from '../../content/contactSales';

const fine = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Pointer-tracked 3D tilt: writes --rx/--ry (degrees) and --gx/--gy (glare
   position, %) on the element; the stylesheet does the rest. */
function useTilt(max = 8) {
  const ref = useRef(null);
  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || !fine()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${((x - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${((0.5 - y) * max * 2).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
    el.classList.add('is-tilting');
  };
  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.classList.remove('is-tilting');
  };
  return { ref, onPointerMove, onPointerLeave };
}

function TiltCard({ as: Tag = 'div', className = '', max, children, ...rest }) {
  const tilt = useTilt(max);
  return (
    <Tag className={`cs-tilt ${className}`} {...tilt} {...rest}>
      {children}
      <span className="cs-glare" aria-hidden="true"></span>
    </Tag>
  );
}

function Hero() {
  const { hero, heroArt, channels } = CONTACT;
  const ref = useRef(null);
  // Parallax: --px/--py in -1…1 drive the floating shapes at their own depth.
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !fine()) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    ref.current.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section className="cs-hero" ref={ref} onPointerMove={onPointerMove}>
      <div className="cs-hero-art" aria-hidden="true" style={{ backgroundImage: `url(${heroArt})` }}></div>
      <div className="cs-shapes" aria-hidden="true">
        <span className="cs-shape cs-shape--ring"></span>
        <span className="cs-shape cs-shape--cube">
          <i></i><i></i><i></i><i></i><i></i><i></i>
        </span>
        <span className="cs-shape cs-shape--orb"></span>
        <span className="cs-shape cs-shape--pill"></span>
      </div>

      <div className="lp-wrap cs-hero-grid">
        <div className="cs-copy">
          <span className="cs-badge"><i className="ri-customer-service-2-line" aria-hidden="true"></i>{hero.eyebrow}</span>
          <h1 className="cs-title">
            {hero.headline.map((w, i) => (
              <span className="cs-word" key={i} style={{ '--i': i }}>
                <span className={hero.accent.includes(i) ? 'cs-accent' : undefined}>{w}</span>
              </span>
            ))}
          </h1>
          <p className="cs-lede">{hero.lede}</p>
          <ul className="cs-points">
            {hero.points.map((p, i) => (
              <li key={p.text} style={{ '--i': i }}>
                <span className="cs-point-ic"><i className={p.icon} aria-hidden="true"></i></span>
                {p.text}
              </li>
            ))}
          </ul>
          <div className="cs-channels">
            {channels.map((c) => (
              <a className="cs-channel" href={c.href} key={c.label}>
                <span className="cs-channel-ic"><i className={c.icon} aria-hidden="true"></i></span>
                <span><b>{c.label}</b><em>{c.sub}</em></span>
                <i className="ri-arrow-right-up-line cs-channel-go" aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>

        <div className="cs-stage">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactForm() {
  const { form } = CONTACT;
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [v, setV] = useState({ first: '', last: '', email: '', company: '', size: '', interests: [], message: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const toggle = (id) =>
    setV((s) => ({ ...s, interests: s.interests.includes(id) ? s.interests.filter((x) => x !== id) : [...s.interests, id] }));

  const check = (fields) => {
    const e = {};
    if (fields.includes('first') && !v.first.trim()) e.first = 'Required';
    if (fields.includes('last') && !v.last.trim()) e.last = 'Required';
    if (fields.includes('email') && !EMAIL.test(v.email.trim())) e.email = 'Enter a valid work email';
    if (fields.includes('company') && !v.company.trim()) e.company = 'Required';
    if (fields.includes('size') && !v.size) e.size = 'Choose a team size';
    setErr(e);
    return !Object.keys(e).length;
  };

  const next = (e) => {
    e.preventDefault();
    if (check(['first', 'last', 'email', 'company'])) setStep(2);
  };
  const submit = (e) => {
    e.preventDefault();
    if (check(['size'])) setDone(true); // TODO: send to the CRM once the endpoint exists
  };

  const field = (k, label, type = 'text', auto) => (
    <label className={`cs-field${err[k] ? ' has-err' : ''}`}>
      <input type={type} value={v[k]} onChange={set(k)} placeholder=" " autoComplete={auto} aria-invalid={!!err[k]} />
      <span>{label}</span>
      {err[k] && <em>{err[k]}</em>}
    </label>
  );

  return (
    <TiltCard className="cs-form-card" max={6} id="cs-form">
      <div className="cs-form-in">
        {done ? (
          <div className="cs-done" role="status">
            <span className="cs-done-ic"><i className="ri-check-line" aria-hidden="true"></i></span>
            <h2>{form.doneTitle}</h2>
            <p>{form.doneText}</p>
            <button type="button" className="cs-btn cs-btn--ghost" onClick={() => { setDone(false); setStep(1); setV({ first: '', last: '', email: '', company: '', size: '', interests: [], message: '' }); }}>
              Send another enquiry
            </button>
          </div>
        ) : (
          <>
            <div className="cs-form-head">
              <div>
                <h2>{form.title}</h2>
                <p>{form.sub}</p>
              </div>
              <span className="cs-steps-dots" aria-label={`Step ${step} of 2`}>
                <i className={step >= 1 ? 'on' : ''}></i><i className={step >= 2 ? 'on' : ''}></i>
              </span>
            </div>

            {step === 1 ? (
              <form className="cs-form cs-form--s1" onSubmit={next} noValidate key="s1">
                <div className="cs-row">
                  {field('first', 'First name', 'text', 'given-name')}
                  {field('last', 'Last name', 'text', 'family-name')}
                </div>
                {field('email', 'Work email', 'email', 'email')}
                {field('company', 'Company', 'text', 'organization')}
                <button type="submit" className="cs-btn">
                  <span>Continue</span><i className="ri-arrow-right-line" aria-hidden="true"></i>
                </button>
              </form>
            ) : (
              <form className="cs-form cs-form--s2" onSubmit={submit} noValidate key="s2">
                <div className={`cs-group${err.size ? ' has-err' : ''}`}>
                  <span className="cs-group-l">Team size</span>
                  <div className="cs-seg" role="radiogroup" aria-label="Team size">
                    {form.sizes.map((s) => (
                      <button type="button" role="radio" aria-checked={v.size === s} className={v.size === s ? 'on' : ''} key={s} onClick={() => setV((x) => ({ ...x, size: s }))}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {err.size && <em>{err.size}</em>}
                </div>
                <div className="cs-group">
                  <span className="cs-group-l">Interested in</span>
                  <div className="cs-chips">
                    {form.interests.map((it) => (
                      <button type="button" aria-pressed={v.interests.includes(it.id)} className={v.interests.includes(it.id) ? 'on' : ''} key={it.id} onClick={() => toggle(it.id)}>
                        <i className={it.icon} aria-hidden="true"></i>{it.label}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="cs-field cs-field--area">
                  <textarea rows={3} value={v.message} onChange={set('message')} placeholder=" "></textarea>
                  <span>Anything else we should know? (optional)</span>
                </label>
                <div className="cs-form-actions">
                  <button type="button" className="cs-btn cs-btn--ghost" onClick={() => setStep(1)}>
                    <i className="ri-arrow-left-line" aria-hidden="true"></i>Back
                  </button>
                  <button type="submit" className="cs-btn">
                    <span>Contact sales</span><i className="ri-send-plane-fill" aria-hidden="true"></i>
                  </button>
                </div>
                <p className="cs-consent">{form.consent}</p>
              </form>
            )}
          </>
        )}
      </div>
    </TiltCard>
  );
}

function Head({ kicker, title }) {
  return (
    <div className="lp-head reveal">
      <span className="lp-kicker">{kicker}</span>
      <h2 className="lp-h2">{title}</h2>
    </div>
  );
}

function Ways() {
  const { ways } = CONTACT;
  return (
    <section className="lp-section cs-ways">
      <div className="lp-wrap">
        <Head kicker={ways.kicker} title={ways.title} />
        <div className="cs-ways-grid">
          {ways.items.map((w, i) => (
            <TiltCard as="a" href={w.href} className="cs-way reveal" key={w.title} style={{ '--i': i }}>
              <span className="cs-way-ic"><i className={w.icon} aria-hidden="true"></i></span>
              <b>{w.title}</b>
              <p>{w.text}</p>
              <span className="cs-way-go">{w.cta}<i className="ri-arrow-right-line" aria-hidden="true"></i></span>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const { steps } = CONTACT;
  return (
    <section className="lp-section cs-next">
      <div className="lp-wrap">
        <Head kicker={steps.kicker} title={steps.title} />
        <ol className="cs-next-grid">
          {steps.items.map((s, i) => (
            <li className="cs-next-card reveal" key={s.title} style={{ '--i': i }}>
              <span className="cs-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <b>{s.title}</b>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Topics() {
  const { topics } = CONTACT;
  const n = topics.items.length;
  return (
    <section className="lp-section cs-topics">
      <div className="lp-wrap">
        <Head kicker={topics.kicker} title={topics.title} />
        <div className="cs-ring-stage reveal">
          <div className="cs-ring" style={{ '--n': n }}>
            {topics.items.map((t, i) => (
              <a className="cs-ring-card" href={t.href} key={t.title} style={{ '--i': i }}>
                <span className="cs-ring-ic"><i className={t.icon} aria-hidden="true"></i></span>
                <b>{t.title}</b>
                <i className="ri-arrow-right-up-line cs-ring-go" aria-hidden="true"></i>
              </a>
            ))}
          </div>
          <span className="cs-ring-floor" aria-hidden="true"></span>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = CONTACT;
  return (
    <section className="lp-section lp-faq-sec cs-faq">
      <div className="lp-wrap">
        <Head kicker={faq.kicker} title={faq.title} />
        <FaqList faq={faq.items} />
      </div>
    </section>
  );
}

export default function ContactSalesPage() {
  return (
    <>
      <Hero />
      <Ways />
      <Steps />
      <Topics />
      <Faq />
    </>
  );
}
