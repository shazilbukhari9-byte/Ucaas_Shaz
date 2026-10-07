'use client';

import { useEffect, useState } from 'react';

/**
 * Drives a headline whose last phrase rotates through a list of words, one
 * set at a time, each set holding a different duration. Flattened into a
 * single sequence so one index drives both "which sentence" and "which
 * word" — see HERO-rotating-headline-GUIDE.md for the full rationale.
 */
export default function useRotatingHeadline(sets) {
  const seq = sets.flatMap((set, si) => set.words.map((_, wi) => ({ si, wi, hold: set.hold })));
  const [idx, setIdx] = useState(0);
  const { si, wi } = seq[idx];

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % seq.length), seq[idx].hold);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // `words` is the full list for the current set, so the caller can reserve
  // a slot as wide as the widest phrase and keep the prefix pinned.
  return { pre: sets[si].pre, word: sets[si].words[wi], words: sets[si].words, key: `${si}-${wi}`, setKey: si };
}
