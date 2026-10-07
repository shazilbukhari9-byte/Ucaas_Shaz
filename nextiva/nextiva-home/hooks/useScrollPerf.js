'use client';

import { useEffect } from 'react';

/**
 * Keeps scrolling smooth on pages with heavy decoration.
 *
 * Several blocks put frosted-glass panels (backdrop-filter) over backgrounds
 * that never stop moving — the hero aurora, the floating AI-receptionist
 * windows, drifting particles. Each moving frame forces the browser to redo
 * the blur, and during a scroll that work lands on the same frames as the
 * scroll itself, so it stutters.
 *
 * - While the page is scrolling, <html> gets `is-scrolling`: CSS pauses the
 *   decorative loops behind the glass (styles/60-perf.css) and particle fields
 *   stop spawning; Web-Animations particles are paused here directly. Once
 *   scrolling settles everything resumes where it left off.
 * - Sections that are off screen get `is-offscreen`, which pauses their
 *   infinite CSS animations so they cost nothing until scrolled back to.
 */
const SETTLE_MS = 180;
const PARTICLES = '.particle, .snowflake';

export default function useScrollPerf() {
  useEffect(() => {
    const root = document.documentElement;
    let settle = null;
    let scrolling = false;

    const setParticles = (pause) => {
      document.querySelectorAll(PARTICLES).forEach((el) => {
        el.getAnimations().forEach((a) => (pause ? a.pause() : a.play()));
      });
    };

    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        root.classList.add('is-scrolling');
        setParticles(true);
      }
      clearTimeout(settle);
      settle = setTimeout(() => {
        scrolling = false;
        root.classList.remove('is-scrolling');
        setParticles(false);
      }, SETTLE_MS);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Sections start as running; only an observer report marks one off screen,
    // so nothing is ever paused by mistake if the observer never fires.
    const sections = document.querySelectorAll('.wp-site-blocks section, main section');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting)),
      { rootMargin: '200px 0px' }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(settle);
      io.disconnect();
      root.classList.remove('is-scrolling');
      sections.forEach((s) => s.classList.remove('is-offscreen'));
    };
  }, []);
}
