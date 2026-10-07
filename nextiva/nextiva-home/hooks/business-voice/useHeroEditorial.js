'use client';

import { useEffect } from 'react';

/**
 * The editorial hero reveals on mount rather than on scroll — it is already in
 * view when the page loads, so waiting for an intersection would leave it blank
 * for a frame.
 */
export default function useHeroEditorial(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelector('.hero-content.reveal')?.classList.add('revealed');
  }, [rootRef]);
}
