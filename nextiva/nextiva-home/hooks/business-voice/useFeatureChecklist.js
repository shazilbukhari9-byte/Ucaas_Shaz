'use client';

import { useEffect } from 'react';

/**
 * The feature checklist's tab switcher. Desktop uses a pill row, mobile a
 * dropdown; both drive the same panels, so selecting a tab syncs the pills, the
 * dropdown label, the open/closed dropdown state and the visible panel.
 *
 * A panel that arrives on screen already switched-to never intersects, so its
 * `.reveal` children are revealed outright when the panel activates.
 */
export default function useFeatureChecklist(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups = [];
    const on = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    const closeDropdowns = () => {
      root.querySelectorAll('.feature-checklist-mobile-dropdown-control').forEach((control) => {
        control.classList.remove('is-open');
        control.querySelector('.feature-checklist-mobile-dropdown-toggle')
          ?.setAttribute('aria-expanded', 'false');
      });
    };

    const select = (tab) => {
      root.querySelectorAll('.pill-toggle-btn').forEach((pill) => {
        pill.classList.toggle('active', pill.getAttribute('data-feature-tab') === tab);
      });
      root.querySelectorAll('.feature-checklist-mobile-dropdown-option').forEach((option) => {
        option.classList.toggle('active', option.getAttribute('data-feature-tab') === tab);
      });

      const option = root.querySelector(`.feature-checklist-mobile-dropdown-option[data-feature-tab="${tab}"]`);
      const label = root.querySelector('.feature-checklist-mobile-dropdown-label');
      if (option && label) label.textContent = option.textContent.trim();

      closeDropdowns();

      root.querySelectorAll('.feature-tab-panel').forEach((panel) => panel.classList.remove('active'));
      const panel = root.querySelector(`[data-feature-panel="${tab}"]`);
      if (!panel) return;
      panel.classList.add('active');
      panel.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
    };

    root.querySelectorAll('.pill-toggle-btn').forEach((pill) => {
      on(pill, 'click', () => select(pill.getAttribute('data-feature-tab')));
    });

    root.querySelectorAll('.feature-checklist-mobile-dropdown-control').forEach((control) => {
      const toggle = control.querySelector('.feature-checklist-mobile-dropdown-toggle');
      if (!toggle) return;
      on(toggle, 'click', () => {
        const open = control.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      control.querySelectorAll('.feature-checklist-mobile-dropdown-option').forEach((option) => {
        on(option, 'click', () => select(option.getAttribute('data-feature-tab')));
      });
    });

    // Clicking anywhere else closes an open dropdown.
    on(document, 'click', (event) => {
      root.querySelectorAll('.feature-checklist-mobile-dropdown-control.is-open').forEach((control) => {
        if (control.contains(event.target)) return;
        control.classList.remove('is-open');
        control.querySelector('.feature-checklist-mobile-dropdown-toggle')
          ?.setAttribute('aria-expanded', 'false');
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
