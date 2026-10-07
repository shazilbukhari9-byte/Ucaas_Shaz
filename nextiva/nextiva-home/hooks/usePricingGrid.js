'use client';

import { useEffect } from 'react';

/**
 * Pricing grid behaviour:
 *  - monthly / annually billing switch, which swaps prices, strikethroughs,
 *    savings badges and CTA links;
 *  - the small-business / enterprise pill toggle that cross-fades the two plan
 *    groups.
 */
export default function usePricingGrid(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups = [];
    const on = (el, type, fn) => {
      el.addEventListener(type, fn);
      cleanups.push(() => el.removeEventListener(type, fn));
    };
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    // --- billing period -------------------------------------------------------
    const monthlyBtn = root.querySelector('.toggle-monthly');
    const annualBtn = root.querySelector('.toggle-annually');

    if (monthlyBtn && annualBtn) {
      const prices = root.querySelectorAll(
        '.pricing-grid-plans--small-business .price-amount, .pricing-grid-fourth-plan .price-amount'
      );
      const originals = root.querySelectorAll('.pricing-grid-plans--small-business .original-price');
      const badges = root.querySelectorAll('.pricing-grid-plans--small-business .savings-badge');
      const ctas = root.querySelectorAll(
        '.pricing-grid-plans--small-business .plan-cta, .pricing-grid-fourth-plan .plan-cta'
      );

      let annual = true;

      // Derive the monthly href from the annual one the markup ships with.
      ctas.forEach((cta) => {
        const href = cta.getAttribute('href') || '';
        if (!href.includes('billing=annually')) return;
        cta.setAttribute('data-href-annual', href);
        const url = new URL(href, window.location.origin);
        url.searchParams.delete('billing');
        cta.setAttribute('data-href-monthly', url.toString());
      });

      const apply = () => {
        monthlyBtn.classList.toggle('active', !annual);
        annualBtn.classList.toggle('active', annual);

        prices.forEach((el) => {
          const next = annual ? el.getAttribute('data-annually') : el.getAttribute('data-monthly');
          el.style.transform = 'translateY(-10px)';
          el.style.opacity = '0';
          later(() => {
            el.textContent = next;
            el.style.transform = 'translateY(10px)';
            later(() => {
              el.style.transform = 'translateY(0)';
              el.style.opacity = '1';
            }, 50);
          }, 150);
        });

        [originals, badges].forEach((group) =>
          group.forEach((el) => {
            const monthly = el.getAttribute('data-monthly') || '';
            const annually = el.getAttribute('data-annually') || '';
            el.textContent = annual ? annually : monthly;
            el.style.display = (annual && annually) || (!annual && monthly) ? 'inline' : 'none';
          })
        );

        ctas.forEach((cta) => {
          const a = cta.getAttribute('data-href-annual');
          const m = cta.getAttribute('data-href-monthly');
          if (a && m) cta.setAttribute('href', annual ? a : m);
        });
      };

      on(monthlyBtn, 'click', () => {
        annual = false;
        apply();
      });
      on(annualBtn, 'click', () => {
        annual = true;
        apply();
      });
      apply();
    }

    // --- audience pill toggle -------------------------------------------------
    const pills = root.querySelectorAll('.pill-toggle-btn[data-type]');
    const smallBusiness = root.querySelector('.pricing-grid-plans--small-business');
    const enterprise = root.querySelector('.pricing-grid-plans--enterprise');
    const toggleWrapper = root.querySelector('.pricing-grid-toggle-wrapper');
    const fourthPlan = root.querySelector('.pricing-grid-fourth-plan');

    if (pills.length && smallBusiness && enterprise) {
      pills.forEach((pill) => {
        on(pill, 'click', () => {
          pills.forEach((el) => el.classList.remove('active'));
          pill.classList.add('active');

          const toEnterprise = pill.getAttribute('data-type') === 'enterprise';
          const outgoing = toEnterprise ? smallBusiness : enterprise;
          const incoming = toEnterprise ? enterprise : smallBusiness;

          outgoing.style.opacity = '0';
          outgoing.style.transform = 'translateY(20px)';
          if (toEnterprise && fourthPlan) {
            fourthPlan.style.opacity = '0';
            fourthPlan.style.transform = 'translateY(20px)';
          }

          later(() => {
            outgoing.style.display = 'none';
            incoming.style.display = 'grid';
            incoming.style.opacity = '0';
            incoming.style.transform = 'translateY(20px)';

            if (fourthPlan) {
              fourthPlan.style.display = toEnterprise ? 'none' : '';
              if (!toEnterprise) {
                fourthPlan.style.opacity = '0';
                fourthPlan.style.transform = 'translateY(20px)';
              }
            }
            if (toggleWrapper) {
              toggleWrapper.style.visibility = toEnterprise ? 'hidden' : 'visible';
              toggleWrapper.style.opacity = toEnterprise ? '0' : '1';
            }

            later(() => {
              incoming.style.opacity = '1';
              incoming.style.transform = 'translateY(0)';
              if (!toEnterprise && fourthPlan) {
                fourthPlan.style.opacity = '1';
                fourthPlan.style.transform = 'translateY(0)';
              }
            }, 50);
          }, 200);
        });
      });
    }

    return () => {
      timers.forEach(clearTimeout);
      cleanups.forEach((fn) => fn());
    };
  }, [rootRef]);
}
