'use client';

import { useEffect } from 'react';

/**
 * Reserves room for the fixed chrome on this route.
 *
 * The header is `position: fixed` and sits at `top: var(--nb20-banner-offset)`,
 * so both it and the promo banner above it are out of flow. The original page
 * compensates from its banner plugin, which sets that custom property and pads
 * the body; the capture shows the result as an inline `padding-top: 66px`.
 *
 * Measured rather than hard-coded: the banner can be absent or wrap onto two
 * lines, and the header grows on small screens. The homepage does not need this
 * — its hero is designed to sit under a transparent header — so the offset is
 * applied on mount and removed on unmount, leaving other routes untouched.
 */
export default function useBannerOffset() {
  useEffect(() => {
    const banner = document.querySelector('.ntb-banner');
    const header = document.querySelector('.nb20-header');
    if (!header) return;

    const visible = (el) => Boolean(el) && getComputedStyle(el).display !== 'none' && el.offsetHeight > 0;

    const apply = () => {
      const bannerH = visible(banner) && !banner.classList.contains('ntb-banner--closed')
        ? banner.offsetHeight
        : 0;
      document.documentElement.style.setProperty('--nb20-banner-offset', `${bannerH}px`);
      document.body.style.paddingTop = `${bannerH + header.offsetHeight}px`;
    };

    apply();

    const observer = new ResizeObserver(apply);
    observer.observe(header);
    if (banner) observer.observe(banner);
    window.addEventListener('resize', apply);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', apply);
      document.documentElement.style.removeProperty('--nb20-banner-offset');
      document.body.style.paddingTop = '';
    };
  }, []);
}
