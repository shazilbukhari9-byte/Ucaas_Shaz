'use client';

import { useEffect } from 'react';

/**
 * Header behaviour: desktop mega menus (hover, click and keyboard focus), the
 * mobile panel with its accordion sections, and the scroll-direction
 * hide/reveal with a transparent-over-hero state.
 */
export default function useHeaderNav(rootRef) {
  useEffect(() => {
    const header = rootRef.current;
    if (!header) return;

    const cleanups = [];
    const on = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    // --- logo -----------------------------------------------------------------
    const logo = header.querySelector('.nb20-logo[href]');
    if (logo) {
      logo.setAttribute('target', '_self');
      on(logo, 'click', (event) => {
        if (event.defaultPrevented) return;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const href = logo.getAttribute('href');
        if (href && href !== '#') {
          event.preventDefault();
          window.location.assign(href);
        }
      });
    }

    if (header.hasAttribute('data-nb20-minimal')) {
      header.classList.add('nb20-header--minimal', 'is-style-ucaas-header-block-transparent');
      return () => cleanups.forEach((fn) => fn());
    }

    const navItems = header.querySelectorAll('[data-nb20-nav-item]');
    const mobileToggle = header.querySelector('[data-nb20-mobile-toggle]');
    const mobilePanel = header.querySelector('[data-nb20-mobile-panel]');
    const mobileOverlay = header.querySelector('[data-nb20-mobile-overlay]');
    const hero = document.querySelector('.hero');

    const isTransparent =
      header.classList.contains('is-style-ucaas-header-block-transparent') ||
      Boolean(header.closest('.is-style-ucaas-header-block-transparent')) ||
      header.classList.contains('is-style-ucaas-header-block-transparent__black-text') ||
      Boolean(header.closest('.is-style-ucaas-header-block-transparent__black-text'));

    // --- mega menus -----------------------------------------------------------
    let openTimer;
    let closeTimer;

    const closeAllMenus = () => {
      navItems.forEach((item) => {
        item.classList.remove('is-open');
        item.querySelector('[data-nb20-mega-toggle]')?.setAttribute('aria-expanded', 'false');
      });
    };
    const openMenu = (item) => {
      closeAllMenus();
      item.classList.add('is-open');
      item.querySelector('[data-nb20-mega-toggle]')?.setAttribute('aria-expanded', 'true');
    };

    navItems.forEach((item) => {
      const toggle = item.querySelector('[data-nb20-mega-toggle]');
      if (!toggle) return;
      on(item, 'mouseenter', () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
        openTimer = setTimeout(() => openMenu(item), 60);
      });
      on(item, 'mouseleave', () => {
        clearTimeout(openTimer);
        closeTimer = setTimeout(closeAllMenus, 180);
      });
      on(toggle, 'click', (event) => {
        event.preventDefault();
        if (item.classList.contains('is-open')) closeAllMenus();
        else openMenu(item);
      });
      on(item, 'focusin', () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
        openMenu(item);
      });
    });

    // --- mobile panel ---------------------------------------------------------
    let scrollLockOffset = 0;

    const closeMobile = () => {
      if (!mobileToggle || !mobilePanel || !mobileOverlay) return;
      const wasOpen = mobilePanel.classList.contains('is-open');
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobilePanel.classList.remove('is-open');
      mobileOverlay.classList.remove('is-visible');
      document.body.classList.remove('nb20-mobile-nav-open');
      document.body.style.top = '';
      if (wasOpen) window.scrollTo(0, scrollLockOffset);
    };

    const toggleMobile = () => {
      if (!mobilePanel) return;
      if (mobilePanel.classList.contains('is-open')) return closeMobile();
      if (!mobileToggle || !mobileOverlay || window.innerWidth > 960) return;
      closeAllMenus();
      header.classList.remove('nav-hidden');
      scrollLockOffset = window.scrollY;
      document.body.style.top = `-${scrollLockOffset}px`;
      mobileToggle.classList.add('is-active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobilePanel.classList.add('is-open');
      mobileOverlay.classList.add('is-visible');
      document.body.classList.add('nb20-mobile-nav-open');
    };

    if (mobileToggle && mobilePanel && mobileOverlay) {
      on(mobileToggle, 'click', toggleMobile);
      on(mobileOverlay, 'click', closeMobile);
      on(mobilePanel, 'click', (event) => {
        const ctaToggle = event.target.closest('[data-nb20-mobile-cta-dropdown-toggle]');
        if (ctaToggle) {
          ctaToggle.closest('[data-nb20-mobile-cta-dropdown]')?.classList.toggle('is-open');
          return;
        }
        const accordion = event.target.closest('[data-nb20-mobile-accordion]');
        if (accordion) {
          const item = accordion.closest('.nb20-mobile-nav-item');
          if (!item) return;
          const wasOpen = item.classList.contains('is-open');
          mobilePanel
            .querySelectorAll('.nb20-mobile-nav-item.is-open')
            .forEach((el) => el.classList.remove('is-open'));
          if (!wasOpen) item.classList.add('is-open');
          return;
        }
        const link = event.target.closest('a[href]');
        if (link && link.getAttribute('href') !== '#') closeMobile();
      });
      on(window, 'resize', () => {
        if (window.innerWidth > 960) closeMobile();
      });
    }

    on(document, 'click', (event) => {
      if (!header.contains(event.target)) closeAllMenus();
    });
    on(document, 'keydown', (event) => {
      if (event.key === 'Escape') {
        closeAllMenus();
        closeMobile();
      }
    });

    // --- light hero detection -------------------------------------------------
    if (isTransparent) {
      const behind =
        hero ||
        document.querySelector('body > section, body > main, body > div:not(.nb20-header)') ||
        document.body;
      const rgb = getComputedStyle(behind).backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgb) {
        const luminance =
          (0.299 * parseInt(rgb[1], 10) + 0.587 * parseInt(rgb[2], 10) + 0.114 * parseInt(rgb[3], 10)) / 255;
        if (luminance > 0.6) header.classList.add('nb20-header--light-hero');
      }
    }

    // --- scroll direction -----------------------------------------------------
    let lastY = window.pageYOffset || 0;
    let accumulated = 0;
    let ticking = false;

    const onScrollFrame = () => {
      const y = window.pageYOffset || 0;
      const delta = y - lastY;
      const heroHeight = hero ? hero.offsetHeight : 600;
      const threshold = Math.min(100, heroHeight * 0.1);

      if (document.body.classList.contains('nb20-mobile-nav-open')) {
        header.classList.remove('nav-hidden');
        lastY = y;
        return;
      }
      if (isTransparent) {
        if (y > threshold) {
          header.classList.add('nb20-header--scrolled');
        } else {
          header.classList.remove('nb20-header--scrolled', 'nav-hidden');
          accumulated = 0;
        }
      }
      if (y <= 0) {
        header.classList.remove('nav-hidden');
        accumulated = 0;
        lastY = y;
        return;
      }
      if (y > 100) {
        accumulated += delta;
        if (accumulated > 50) {
          header.classList.add('nav-hidden');
          accumulated = 0;
        } else if (accumulated < -10) {
          header.classList.remove('nav-hidden');
          accumulated = 0;
        }
      }
      lastY = y;
    };

    onScrollFrame();
    on(
      window,
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          onScrollFrame();
          ticking = false;
        });
      },
      { passive: true }
    );

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
      cleanups.forEach((fn) => fn());
    };
  }, [rootRef]);
}
