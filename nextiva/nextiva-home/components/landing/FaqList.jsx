'use client';
/* FAQ accordion for the landing pages. One answer open at a time; the panel
   eases open and shut by animating its grid row from 0fr to 1fr, so it works
   for answers of any length. Answers stay in the DOM (hidden from assistive
   tech while closed) so the copy is still server-rendered for search. */
import { useId, useState } from 'react';

export default function FaqList({ faq }) {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <div className="lp-faq reveal">
      {faq.map((f, i) => {
        const isOpen = open === i;
        const qid = `${base}-q${i}`;
        const aid = `${base}-a${i}`;
        return (
          <div className={`lp-faq-item${isOpen ? ' is-open' : ''}`} key={f.q}>
            <div className="lp-faq-h" role="heading" aria-level={3}>
              <button
                type="button"
                id={qid}
                className="lp-faq-q"
                aria-expanded={isOpen}
                aria-controls={aid}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {f.q}
                <i className="ri-add-line" aria-hidden="true"></i>
              </button>
            </div>
            <div id={aid} className="lp-faq-panel" role="region" aria-labelledby={qid} aria-hidden={!isOpen}>
              <div className="lp-faq-inner">
                <div className="lp-faq-a">{f.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
