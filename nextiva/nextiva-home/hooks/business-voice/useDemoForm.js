'use client';

import { useEffect } from 'react';
import enhanceDemoForm from './enhanceDemoForm';

/**
 * The demo request section — its form gets the shared field UX.
 */
export default function useDemoForm(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups = Array.from(root.querySelectorAll('.nextiva-hubspot-form'))
      .map((container) => enhanceDemoForm(container));

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
