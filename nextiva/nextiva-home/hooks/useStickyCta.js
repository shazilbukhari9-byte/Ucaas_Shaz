'use client';

import { useEffect } from 'react';

const offsetTop = (el) => el.getBoundingClientRect().top + window.scrollY;

/**
 * Sticky CTA banner. It appears once the hero is behind you, hides again while
 * the pricing grid is on screen (that section has its own CTAs), and stays
 * hidden over the footer. Dismissing it is sticky for the session.
 */
export default function useStickyCta(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const banner = root.querySelector('.sticky-cta-banner');
    if (!banner) return;

    const closeBtn = banner.querySelector('[data-sticky-cta-close]');
    const giantBrand = document.querySelector('.footer-giant-brand');
    const footer = document.querySelector('footer');
    const hero = document.querySelector('.design-v2 .section-hero');
    const pricing = document.querySelector('.design-v2 .section-pricing-grid');
    const footerSection = document.querySelector('.section-footer') || footer;
    const showAfter = Number.parseInt(banner.dataset.showAfter || '300', 10);

    const isVoipHero = Boolean(document.querySelector('.design-v2 .section-hero--showcase-voip'));
    const isStackedHome =
      !isVoipHero &&
      (document.body.classList.contains('page-template-template-homepage-v2') ||
        Boolean(document.querySelector('.design-v2 .section-hero--stacked')));

    let dismissed = false;
    let ticking = false;
    let viewportH = window.innerHeight;
    let heroH = 0;
    let pricingTop = 0;
    let pricingBottom = 0;
    let footerTop = 0;

    const measure = () => {
      viewportH = window.innerHeight;
      heroH = hero ? hero.offsetHeight : 0;
      pricingTop = pricing ? offsetTop(pricing) : 0;
      pricingBottom = pricing ? offsetTop(pricing) + pricing.offsetHeight : 0;
      footerTop = footerSection ? offsetTop(footerSection) : 0;
    };
    measure();

    const nearFooter = () =>
      giantBrand
        ? giantBrand.getBoundingClientRect().top < viewportH
        : Boolean(footer) && footer.getBoundingClientRect().top <= viewportH - 48;

    const update = () => {
      if (dismissed) return banner.classList.remove('visible');

      const y = window.scrollY;
      let visible;

      if (nearFooter()) visible = false;
      else if (isStackedHome && pricing && heroH) visible = y > heroH && y + viewportH < pricingTop;
      else if (isVoipHero && pricing && footerSection) visible = y > pricingBottom && y + viewportH < footerTop;
      else if (heroH) visible = y > heroH * 0.8;
      else visible = y > showAfter;

      banner.classList.toggle('visible', visible);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    const onClose = () => {
      dismissed = true;
      banner.classList.remove('visible');
      banner.classList.add('dismissed');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    closeBtn?.addEventListener('click', onClose);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      closeBtn?.removeEventListener('click', onClose);
    };
  }, [rootRef]);
}
