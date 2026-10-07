'use client';
/* Scroll-in motion for the small pieces of a landing page (opt-in with
   `scrollMotion: true` in content/landingPages.js; the Unified Communication
   and home pages render it directly).

   As each group scrolls into view its items rise, slide or settle in one
   after another (headings, feature rows, the product shot, site cards,
   timeline steps, persona cards, table rows, FAQ items, CTA copy).

   Kept light: one IntersectionObserver, no scroll listeners; each item is
   animated once with opacity + the individual `translate` / `scale`
   properties (so the items' own transforms and hover effects are never
   overridden), and the marker attribute is removed once the item has
   settled. Nothing runs for visitors who prefer reduced motion, and items
   already on screen when the page loads are left alone. */
import { useEffect } from 'react';

// [group, items inside it, motion]
const GROUPS = [
  ['.lp-head', ':scope > *', 'up'],
  ['.lp-fx-list', ':scope > li', 'left'],
  // The whole explorer card (its panel re-mounts on every autoplay step).
  ['.lp-section--fx .lp-wrap', ':scope > .lp-fx', 'shot'],
  ['.lp-org-tree', ':scope > .lp-org-root', 'up'],
  ['.lp-org-sites', ':scope > li', 'up'],
  ['.lp-org-points', ':scope > li', 'up'],
  ['.lp-timeline', ':scope > li', 'up'],
  ['.lp-persona-points', ':scope > li', 'left'],
  ['.lp-personas', ':scope > li', 'pop'],
  ['.lp-cmp', ':scope > *', 'up'],
  ['.social-proof-grid-trust-badges', ':scope > *', 'up'],
  ['.lp-ww-intro', ':scope > *', 'up'],
  ['.lp-faq', ':scope > .lp-faq-item', 'up'],
  ['.lp-cta-copy', ':scope > *', 'up'],
  ['.lp-cta-side', ':scope > *', 'up'],

  // Unified Communication page
  ['.uc-head', ':scope > *', 'up'],
  ['.uc-why-sec .lp-wrap', ':scope > .uc-why', 'shot'],
  ['.uc-pillars', ':scope > article', 'pop'],
  ['.uc-cat-sec .lp-wrap', ':scope > .uc-cat', 'shot'],
  ['.uc-cat-rail', ':scope > button', 'left'],
  ['.uc-glo-copy', ':scope > *', 'up'],
  ['.uc-glo-points', ':scope > li', 'left'],
  ['.uc-glo', ':scope > .uc-glo-card', 'shot'],
  ['.uc-glo-rows', ':scope > li', 'up'],
  ['.uc-int', ':scope > article', 'pop'],

  // Home page
  ['.section-header-left', ':scope > *', 'up'],
  ['.section-header-callouts', ':scope > .stat-callout', 'up'],
  ['.tabs-container-card', ':scope > .tabs-container-accordion', 'shot'],
  ['.feature-cards-row', ':scope > *', 'pop'],
  ['.feature-card-points ul', ':scope > li', 'left'],
  ['.platform-showcase-header', ':scope > *', 'up'],
  ['.spotlight-hero-trust-container', ':scope > .spotlight-hero-trust-card', 'shot'],
  ['.arf-header', ':scope > *', 'up'],
  ['.arf-grid', ':scope > article', 'pop'],
  ['.social-proof-grid-header', ':scope > *', 'up'],
];
const STEP_MS = 70; // stagger between items in a group
const MAX_STEPS = 8; // long lists stop stretching the wait
const SETTLE_MS = 1300; // after this the item is back to its own styles

// root: the page's content wrapper (landing pages: main.lp; home: .entry-content).
export default function ScrollMotion({ root: rootSel = 'main.lp' }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;
    const root = document.querySelector(rootSel);
    if (!root) return undefined;

    const timers = new Set();
    const settle = (el) => {
      const t = setTimeout(() => {
        el.removeAttribute('data-sm');
        el.removeAttribute('data-sm-kind');
        el.style.removeProperty('--sm-d');
        timers.delete(t);
      }, SETTLE_MS + (parseFloat(el.style.getPropertyValue('--sm-d')) || 0));
      timers.add(t);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        e.target.querySelectorAll('[data-sm="wait"]').forEach((el) => {
          el.setAttribute('data-sm', 'in');
          settle(el);
        });
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    const vh = window.innerHeight;
    GROUPS.forEach(([groupSel, itemSel, kind]) => {
      root.querySelectorAll(groupSel).forEach((group) => {
        if (group.closest('.lp-hero, .section-hero')) return; // the hero has its own entrance
        if (group.getBoundingClientRect().top < vh * 0.9) return; // already in view
        const items = [...group.querySelectorAll(itemSel)];
        if (!items.length) return;
        items.forEach((el, i) => {
          el.setAttribute('data-sm', 'wait');
          el.setAttribute('data-sm-kind', kind);
          el.style.setProperty('--sm-d', `${Math.min(i, MAX_STEPS) * STEP_MS}ms`);
        });
        io.observe(group);
      });
    });

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [rootSel]);

  return null;
}
