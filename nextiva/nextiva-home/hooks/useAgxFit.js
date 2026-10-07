'use client';

import { useEffect } from 'react';

/**
 * Fits the AI-receptionist composition (desktop pane + handset) inside its
 * night-sky card at any width or browser zoom.
 *
 * The two panes are laid out side by side at one fixed design size; this
 * scales that stage to the card's inner width (never above 1) and publishes
 * the drawn height, so the card always wraps the whole composition with the
 * same margin on every side — nothing overlaps and nothing is cropped,
 * whether the page is viewed at 80%, 90% or 100%.
 *
 * Phones (≤640px) keep their own stacked layout and are left alone.
 */
export default function useAgxFit() {
  useEffect(() => {
    const card = document.querySelector('.section-spotlight-hero-trust .spotlight-hero-trust-card');
    const stage = card?.querySelector('.agx');
    if (!card || !stage) return undefined;

    const fit = () => {
      if (window.innerWidth <= 640) {
        card.style.removeProperty('--agx-scale');
        card.style.removeProperty('--agx-h');
        return;
      }
      // Desktop leaves the night sky room to show above the panes, and the
      // panes run down past the card's bottom edge (a negative bottom pad), so
      // the card crops them there — the window reads as continuing out of the
      // frame rather than sitting on a band of empty ground.
      const wide = window.innerWidth > 900;
      const pad = wide ? 72 : 28;
      const padTop = wide ? 96 : 28;
      const padBottom = wide ? -20 : 28;
      const natural = stage.offsetWidth; // offset sizes ignore the transform
      const naturalH = stage.offsetHeight;
      if (!natural || !naturalH) return;
      const scale = Math.min(wide ? 0.92 : 1, (card.clientWidth - pad * 2) / natural);
      card.style.setProperty('--agx-scale', scale.toFixed(4));
      card.style.setProperty('--agx-pad', `${pad}px`);
      card.style.setProperty('--agx-pad-top', `${padTop}px`);
      card.style.setProperty('--agx-pad-bottom', `${padBottom}px`);
      card.style.setProperty('--agx-h', `${Math.round(naturalH * scale)}px`);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(card);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);
}
