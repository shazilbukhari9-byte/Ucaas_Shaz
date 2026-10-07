'use client';

import { useEffect } from 'react';
import enhanceDemoForm from './enhanceDemoForm';

const OPEN = 'is-open';
const BODY_OPEN = 'v2-get-started-open';
const MODAL = '[data-demo-modal]';

/** `#signup?offer=x` -> `signup`: the fragment names the modal to open. */
function popupKey(href) {
  if (!href || href === '#') return '';
  const fragment = href.slice(1);
  const query = fragment.indexOf('?');
  return query === -1 ? fragment : fragment.substring(0, query);
}

/**
 * The get-started modals. Any in-page anchor whose fragment matches a modal's
 * `data-popup-key` opens it instead of jumping; Escape, the close button and a
 * click on the backdrop close it.
 *
 * The listener is on the document because the links that open these modals live
 * all over the page — in the header, the hero and the sticky CTA — not inside
 * this block.
 */
export default function useGetStarted(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const modals = Array.from(root.querySelectorAll(MODAL));
    if (!modals.length) return;

    const open = (modal) => {
      modal.classList.add(OPEN);
      modal.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add(BODY_OPEN);
      document.body.classList.add(BODY_OPEN);
    };
    const close = (modal) => {
      if (!modal) return;
      modal.classList.remove(OPEN);
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove(BODY_OPEN);
      document.body.classList.remove(BODY_OPEN, 'slideinQuote');
    };

    const onClick = (event) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest('a[href^="#"]');
      if (anchor) {
        const key = popupKey(anchor.getAttribute('href'));
        const modal = key && modals.find((m) => m.dataset.popupKey === key);
        if (modal) {
          event.preventDefault();
          open(modal);
          return;
        }
      }

      const closer = event.target.closest('[data-demo-modal-close]');
      if (closer) {
        event.preventDefault();
        close(closer.closest(MODAL));
      }

      // A click that lands on the backdrop itself, not on the dialog.
      const backdrop = event.target.closest(MODAL);
      if (backdrop && event.target === backdrop) close(backdrop);
    };

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      close(modals.find((m) => m.classList.contains(OPEN)));
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);

    const forms = modals
      .map((modal) => modal.querySelector('.nextiva-hubspot-v2'))
      .filter(Boolean)
      .map((container) => enhanceDemoForm(container));

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
      forms.forEach((fn) => fn());
      document.documentElement.classList.remove(BODY_OPEN);
      document.body.classList.remove(BODY_OPEN);
    };
  }, [rootRef]);
}
