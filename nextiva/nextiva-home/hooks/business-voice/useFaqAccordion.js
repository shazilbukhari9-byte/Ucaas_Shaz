'use client';

import { useEffect } from 'react';

/**
 * FAQ accordion — one answer open at a time, clicking the open one closes it.
 *
 * The same bundle handles the click-to-load video posters: the embed is only
 * created on demand, and on the no-cookie host, so nothing loads from YouTube
 * until a visitor asks for it.
 */
export default function useFaqAccordion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups = [];
    const items = Array.from(root.querySelectorAll('.faq-accordion-item'));

    items.forEach((item) => {
      const header = item.querySelector('.faq-accordion-header');
      if (!header) return;
      const onClick = () => {
        const wasOpen = item.classList.contains('active');
        items.forEach((other) => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !wasOpen);
      };
      header.addEventListener('click', onClick);
      cleanups.push(() => header.removeEventListener('click', onClick));
    });

    root.querySelectorAll('.youtube-video-container').forEach((poster) => {
      const play = (event) => {
        const container = event.target.closest('.youtube-video-container');
        const videoId = container?.getAttribute('data-video-id');
        if (!videoId) return;

        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        frame.allowFullscreen = true;
        frame.style.width = '100%';
        frame.style.aspectRatio = '16 / 9';
        frame.setAttribute('allow', 'autoplay');
        container.parentNode.replaceChild(frame, container);
      };
      const onKey = (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        play(event);
      };

      poster.addEventListener('click', play);
      poster.addEventListener('keydown', onKey);
      cleanups.push(() => {
        poster.removeEventListener('click', play);
        poster.removeEventListener('keydown', onKey);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
