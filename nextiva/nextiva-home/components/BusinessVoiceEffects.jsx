'use client';

import useRevealOnScroll from '../hooks/useRevealOnScroll';
import useBannerOffset from '../hooks/business-voice/useBannerOffset';

/**
 * Page-wide effects for the Business Voice route. Block-level behaviour lives
 * in each block's own hook under hooks/business-voice/.
 *
 * `useRevealOnScroll` is the homepage's hook: the capture's blocks ship the same
 * `.reveal` convention and the same `animations-paused` sections, so one port
 * serves both pages.
 */
export default function BusinessVoiceEffects() {
  useBannerOffset();
  useRevealOnScroll();
  return null;
}
