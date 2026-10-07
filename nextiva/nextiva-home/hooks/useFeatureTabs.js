'use client';

import { useEffect } from 'react';

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

/** 1234567 -> "1.2M", matching the theme's abbreviated stat format. */
function abbreviate(value) {
  if (value >= 1e9) {
    const n = value / 1e9;
    return `${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)}B`;
  }
  if (value >= 1e6) return `${(value / 1e6).toFixed(0)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`;
  return String(value);
}

/**
 * The tabbed product showcase: switching tabs, pausing the offscreen visuals,
 * keeping the active tab in view on mobile, and the counters in the header row.
 */
export default function useFeatureTabs(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tabs = root.querySelectorAll('.primary-tab');
    const panels = root.querySelectorAll('.product-content');
    if (!tabs.length || !panels.length) return;

    const visuals = root.querySelectorAll('.accordion-visual');
    const tabsBar = root.querySelector('.primary-tabs-bar');
    const cleanups = [];

    // --- pause the visuals while the section is offscreen ---------------------
    const pauseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visuals.forEach((visual) => {
            const shouldRun = entry.isIntersecting && visual.classList.contains('active');
            visual.classList.toggle('visual-paused', !shouldRun);
          });
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px 50px 0px' }
    );
    pauseObserver.observe(root);
    cleanups.push(() => pauseObserver.disconnect());

    // --- keep the chosen tab visible on narrow screens ------------------------
    const scrollTabIntoView = (tab) => {
      if (!tabsBar || !window.matchMedia('(max-width: 768px)').matches) return;
      const barBox = tabsBar.getBoundingClientRect();
      const tabBox = tab.getBoundingClientRect();
      const towardsEnd = tabBox.left + tabBox.width / 2 > barBox.left + barBox.width / 2;
      requestAnimationFrame(() => {
        const t = tab.getBoundingClientRect();
        const b = tabsBar.getBoundingClientRect();
        const offset = t.left - b.left + tabsBar.scrollLeft;
        const left = towardsEnd ? offset : offset - b.width + t.width;
        tabsBar.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
      });
    };

    // --- tab switching --------------------------------------------------------
    tabs.forEach((tab) => {
      const onClick = () => {
        const key = tab.getAttribute('data-tab');
        if (!key) return;

        tabs.forEach((el) => el.classList.remove('active'));
        panels.forEach((el) => el.classList.remove('active'));
        visuals.forEach((el) => {
          el.classList.remove('active');
          el.classList.add('visual-paused');
        });

        tab.classList.add('active');
        root.querySelector(`#content-${CSS.escape(key)}`)?.classList.add('active');

        const visual = root.querySelector(`#visual-${CSS.escape(key)}`);
        if (visual) {
          visual.classList.add('active');
          visual.classList.remove('visual-paused');
        }
        scrollTabIntoView(tab);
      };
      tab.addEventListener('click', onClick);
      cleanups.push(() => tab.removeEventListener('click', onClick));
    });

    // --- phone stepper: ‹ prev | active tab | next › -------------------------
    // Each arrow just clicks the neighbouring tab, so switching goes through
    // the one handler above. Wraps at both ends.
    const tabList = Array.from(tabs);
    const step = (dir) => {
      const current = tabList.findIndex((el) => el.classList.contains('active'));
      const next = tabList[(current + dir + tabList.length) % tabList.length];
      next?.click();
    };
    [['.primary-tabs-step--prev', -1], ['.primary-tabs-step--next', 1]].forEach(([sel, dir]) => {
      const button = root.querySelector(sel);
      if (!button) return;
      const onStep = () => step(dir);
      button.addEventListener('click', onStep);
      cleanups.push(() => button.removeEventListener('click', onStep));
    });

    // --- header counters ------------------------------------------------------
    const statsRow = root.querySelector('#platformStats');
    const counters = statsRow ? statsRow.querySelectorAll('.counter') : [];
    if (counters.length) {
      let started = false;
      const frames = [];

      const render = (el, value, target, suffix, format) => {
        if (format === 'abbrev') return abbreviate(value) + suffix;
        if (target >= 1e5) return value.toLocaleString('en-US') + suffix;
        return value + suffix;
      };

      const start = () => {
        if (started) return;
        started = true;
        counters.forEach((el, index) => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const format = el.getAttribute('data-format') || 'number';
          const t0 = performance.now();
          const step = (now) => {
            const progress = Math.min((now - t0) / 2500, 1);
            const value = Math.round(easeOutQuart(progress) * target);
            el.textContent = render(el, value, target, suffix, format);
            if (progress < 1) frames[index] = requestAnimationFrame(step);
            else el.textContent = render(el, target, target, suffix, format);
          };
          frames[index] = requestAnimationFrame(step);
        });
      };

      const counterObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && start()),
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );
      counterObserver.observe(statsRow);
      cleanups.push(() => {
        counterObserver.disconnect();
        frames.forEach((f) => cancelAnimationFrame(f));
      });
    }

    // --- mock stage scaling ---------------------------------------------------
    // The Cloud Phone collage is built at a fixed design size; rather than let
    // its columns cramp as the panel narrows, scale the whole stage so the
    // proportions hold at any zoom level or viewport width.
    const stages = root.querySelectorAll('.cp-stage, .adx-stage, #visual-ai-tools .ci-layout, #visual-connected-tools .mockup-group');
    if (stages.length) {
      const fit = () => {
        stages.forEach((stage) => {
          const box = stage.parentElement;
          if (!box) return;
          const styles = getComputedStyle(box);
          const available = box.clientWidth
            - parseFloat(styles.paddingLeft || 0)
            - parseFloat(styles.paddingRight || 0);
          const availableH = box.clientHeight
            - parseFloat(styles.paddingTop || 0)
            - parseFloat(styles.paddingBottom || 0);
          // offsetWidth/Height ignore the transform, so these are the natural sizes
          const natural = stage.offsetWidth;
          const naturalH = stage.offsetHeight;
          if (!natural || !available) return;
          // Fill the frame's height and let the panel run past its right edge,
          // clipped by the frame. The bleed is bounded so the useful columns
          // stay on screen, and MAX keeps the mock from scaling up soft.
          const MAX = 1.3;
          // Rendered width vs the frame's inner width. Stages marked
          // data-no-bleed are meant to sit whole inside the frame instead.
          // No bleed on phones: there is no room to run past the frame, so the
          // mock is fitted whole instead of being clipped to nothing.
          const MAX_BLEED =
            stage.dataset.noBleed !== undefined || window.innerWidth <= 900 ? 1 : 1.32;
          // The Cloud Phone stage on phones shows one view at its real size
          // (see .cp-switch). There the frame takes its height from the mock,
          // so fitting to that height would only feed the last scale back in;
          // fit to width alone and never above natural size.
          // Capped at PHONE_MAX_H tall so the frame stays close to the other
          // tabs' height.
          // The AI Agent window gets the same width-first fit on phones (it is
          // laid out narrower there), with a little more height allowed.
          // Auto Dialer and Connected Tools likewise (see the phone layouts in
          // the features-tabs stylesheet).
          const isAi = stage.classList.contains('ci-layout');
          const isDialer = stage.classList.contains('adx-stage');
          const isTools = stage.classList.contains('mockup-group');
          const PHONE_MAX_H = isTools ? 520 : isAi || isDialer ? 440 : 340;
          const phoneView = window.innerWidth <= 640
            && (stage.classList.contains('cp-stage') || isAi || isDialer || isTools);
          const scale = Math.min(
            phoneView ? 1 : MAX,
            (available * MAX_BLEED) / natural,
            phoneView ? PHONE_MAX_H / naturalH : naturalH && availableH ? availableH / naturalH : MAX
          );
          stage.style.setProperty('--mock-scale', scale.toFixed(4));
          // `transform: scale()` leaves the layout box at full size, so the
          // frame would reserve the mock's natural height. Publish the scaled
          // height so the frame can size to what is actually drawn.
          box.style.setProperty('--mock-h', `${Math.round(naturalH * scale)}px`);
        });
      };
      // Panels are display:none until their tab is active, so an early measure
      // reads 0 and bails; re-run on the next frame once layout has settled.
      const scheduleFit = () => requestAnimationFrame(fit);
      scheduleFit();
      const stageObserver = new ResizeObserver(scheduleFit);
      stages.forEach((stage) => {
        // the stage itself too: its natural size changes when the phone
        // switcher swaps the Cloud Phone view
        stageObserver.observe(stage);
        if (stage.parentElement) stageObserver.observe(stage.parentElement);
        const visual = stage.closest('.accordion-visual');
        if (visual) stageObserver.observe(visual);
      });
      window.addEventListener('resize', scheduleFit);
      cleanups.push(() => {
        stageObserver.disconnect();
        window.removeEventListener('resize', scheduleFit);
      });
    }

    // --- chat cascade: play it when the CHAT is in view, not the section ------
    // The pause observer above releases on the section's top edge, which is
    // hundreds of pixels above this panel. The message cascade therefore ran
    // while the chat was still below the fold and had long finished by the
    // time anyone scrolled to it — the panel read as a static screenshot.
    //
    // This watches the panel itself and restarts the cascade each time it
    // comes into view, so arriving at it always shows the conversation
    // arriving rather than already arrived.
    const chat = root.querySelector('.tab-app-chat');
    if (chat) {
      // Double gate. The CSS pre-state (paused) hangs off `has-chat-reveal`,
      // which only JS adds — so if this hook never runs, the animation simply
      // plays as it always did rather than sitting frozen and invisible.
      chat.classList.add('has-chat-reveal');

      let everFired = false;
      let replayTimer = null;

      // Detach every bubble's animation for one frame, then reattach — the
      // cascade re-runs from zero, stagger and all. This is the only way to
      // restart a staggered CSS animation as one unit; toggling play-state
      // resumes rather than restarts.
      //
      // Never rewind while a pause class is engaged anywhere above: the
      // bubbles' fill puts them at opacity 0 on their first frame, so a
      // cascade started under `animation-play-state: paused !important`
      // freezes the whole thread INVISIBLE — strictly worse than no
      // animation. When paused, leave the thread as it stands and let the
      // next tick try again once the pause observers have released.
      const replay = () => {
        if (chat.closest('.visual-paused, .animations-paused')) return;
        chat.classList.add('chat-rewind');
        void chat.offsetWidth;
        chat.classList.remove('chat-rewind');
      };

      const chatObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              everFired = true;
              chat.classList.add('chat-live');
              // The pause observers release on their own schedule, so the
              // first play may need a couple of attempts before the section
              // is actually unpaused.
              replay();
              setTimeout(replay, 400);
              setTimeout(replay, 1200);
              // Keep the thread alive for as long as it is looked at: the
              // cascade takes ~5.2s, so an 11s cycle leaves a readable hold
              // with the typing dots pulsing before the conversation replays.
              if (!replayTimer) replayTimer = setInterval(replay, 11000);
            } else if (replayTimer) {
              // Offscreen: stop replaying, but keep observing — scrolling
              // back should start the show again, not find it mid-hold.
              clearInterval(replayTimer);
              replayTimer = null;
            }
          });
        },
        { threshold: 0.3 }
      );
      chatObserver.observe(chat);
      cleanups.push(() => clearInterval(replayTimer));

      // If the observer never reports at all — throttled in a background tab,
      // or unsupported — drop the gate entirely so the cascade plays the way
      // it did before this hook existed. A missed animation is a small loss;
      // messages frozen invisible behind a gate that never opens is not.
      const chatFailsafe = setTimeout(() => {
        if (!everFired) chat.classList.remove('has-chat-reveal');
      }, 8000);

      cleanups.push(() => {
        chatObserver.disconnect();
        clearTimeout(chatFailsafe);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
