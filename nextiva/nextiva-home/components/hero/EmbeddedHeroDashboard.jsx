'use client';

import { useEffect, useRef } from 'react';
import HeroDashboard from './HeroDashboard';

/**
 * Hosts the home hero's dashboard outside the home hero.
 *
 * Two things make that non-trivial, both handled here:
 *
 * 1. Scope — the dashboard's styles all live under
 *    `.section-hero .hero-showcase`, so the wrapper provides those class
 *    ancestors. `hero-embed` then switches off everything `.section-hero`
 *    would drag in (full-height navy hero background, padding).
 *
 * 2. Fit — the window is authored at a fixed 1080px and scaled via the
 *    `--hero-app-scale` var, which useHeroShowcase only sets on the home
 *    page. The same measurement runs here against this host.
 */
const DESIGN_WIDTH = 1080;

export default function EmbeddedHeroDashboard({ customer, thread }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const appWindow = host.querySelector('.desktop-app-window');
    if (!appWindow) return undefined;

    const fit = () => {
      const available = host.clientWidth;
      if (!available) return;
      const scale = Math.min(1, available / DESIGN_WIDTH);
      appWindow.style.setProperty('--hero-app-scale', scale.toFixed(4));
      // scale() leaves the layout box at full size — publish the drawn
      // height so the page wraps the visual, not the unscaled frame.
      host.style.setProperty('--hero-app-h', `${Math.round(appWindow.offsetHeight * scale)}px`);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(host);
    observer.observe(appWindow);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-hero hero-embed" ref={hostRef}>
      <div className="hero-showcase">
        <HeroDashboard customer={customer} thread={thread} />
      </div>
    </div>
  );
}
