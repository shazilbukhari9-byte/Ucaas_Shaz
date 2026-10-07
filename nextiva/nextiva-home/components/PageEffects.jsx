'use client';

import useRevealOnScroll from '../hooks/useRevealOnScroll';
import useParticleFields from '../hooks/useParticleFields';
import useAgxLive from '../hooks/useAgxLive';
import useAgxFit from '../hooks/useAgxFit';
import useScrollPerf from '../hooks/useScrollPerf';

/**
 * Page-wide effects. Block-level behaviour lives in each block's own hook
 * under hooks/.
 */
export default function PageEffects() {
  useRevealOnScroll();
  useParticleFields();
  useAgxLive();
  useAgxFit();
  useScrollPerf();
  return null;
}

