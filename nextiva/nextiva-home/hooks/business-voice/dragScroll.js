/**
 * Click-and-drag horizontal scrolling for the stat carousels.
 *
 * Both the product showcase and the social-proof grid ship the same handful of
 * pointer handlers in their own bundle; they are one helper here. The 1.5×
 * multiplier and the `dragging` class are the original's.
 *
 * Returns a cleanup that removes every listener it added.
 */
export function enableDragScroll(track) {
  if (!track) return () => {};

  let dragging = false;
  let originX = 0;
  let originScroll = 0;

  const start = (event) => {
    dragging = true;
    track.classList.add('dragging');
    originX = event.pageX - track.offsetLeft;
    originScroll = track.scrollLeft;
  };
  const stop = () => {
    dragging = false;
    track.classList.remove('dragging');
  };
  const move = (event) => {
    if (!dragging) return;
    event.preventDefault();
    const walk = (event.pageX - track.offsetLeft - originX) * 1.5;
    track.scrollLeft = originScroll - walk;
  };

  track.addEventListener('mousedown', start);
  track.addEventListener('mouseleave', stop);
  track.addEventListener('mouseup', stop);
  track.addEventListener('mousemove', move);

  return () => {
    track.removeEventListener('mousedown', start);
    track.removeEventListener('mouseleave', stop);
    track.removeEventListener('mouseup', stop);
    track.removeEventListener('mousemove', move);
  };
}

/**
 * Suppresses the click that ends a drag, so dragging a carousel by a card does
 * not also follow that card's link.
 */
export function suppressDragClicks(track, threshold = 5) {
  if (!track) return () => {};

  let downX = 0;
  const onDown = (event) => { downX = event.pageX; };
  const onClick = (event) => {
    if (Math.abs(event.pageX - downX) <= threshold) return;
    event.preventDefault();
    event.stopPropagation();
  };

  track.addEventListener('mousedown', onDown);
  track.addEventListener('click', onClick);

  return () => {
    track.removeEventListener('mousedown', onDown);
    track.removeEventListener('click', onClick);
  };
}
