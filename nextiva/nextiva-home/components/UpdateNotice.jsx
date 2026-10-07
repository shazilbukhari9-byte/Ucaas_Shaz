'use client';
/* "New version available" alert, site-wide.

   Every build carries an id (NEXT_PUBLIC_BUILD_ID, set in next.config.mjs).
   This checks /api/version every CHECK_MS (30s), whenever the tab comes back into
   view and on window focus; when the live id differs from the one this tab
   loaded with, a toast slides up at the bottom. "Reload" does a hard refresh:
   it clears any Cache Storage, drops service workers and reloads with a
   cache-busting query (removed again once the fresh page loads). "Later"
   hides it for this build until the next deploy.

   It also remembers (localStorage) the last version this browser saw, so a
   visitor who opens or refreshes the site after a deploy gets the alert too
   — not only tabs that were already open while the deploy went out.

   Add ?preview-update to any URL to see the toast without a deploy. */
import { useCallback, useEffect, useState } from 'react';

const CHECK_MS = 30000;
const BUSTER = '_r';
const CURRENT = process.env.NEXT_PUBLIC_BUILD_ID || '';
const SNOOZE_KEY = 'ucaas-update-snoozed';
const SEEN_KEY = 'ucaas-build-seen';
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } },
};

export default function UpdateNotice() {
  const [next, setNext] = useState(null); // id of the newer build, if any
  const [reloading, setReloading] = useState(false);

  const check = useCallback(async () => {
    try {
      const res = await fetch('/api/version', { cache: 'no-store' });
      if (!res.ok) return;
      const { id } = await res.json();
      if (!id || id === CURRENT) return;
      let snoozed = null;
      try { snoozed = sessionStorage.getItem(SNOOZE_KEY); } catch { /* storage blocked */ }
      if (snoozed !== id) setNext(id);
    } catch { /* offline or mid-deploy: try again on the next tick */ }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    // Tidy the address bar after a hard refresh.
    if (url.searchParams.has(BUSTER)) {
      url.searchParams.delete(BUSTER);
      window.history.replaceState(window.history.state, '', url.toString());
    }
    if (url.searchParams.has('preview-update')) { setNext('preview'); return undefined; }

    // Opened after a deploy: this browser last saw an older version.
    const seen = store.get(SEEN_KEY);
    if (!seen) store.set(SEEN_KEY, CURRENT);
    else if (CURRENT && seen !== CURRENT) setNext(CURRENT);

    const onVisible = () => { if (document.visibilityState === 'visible') check(); };
    const first = setTimeout(check, 4000);
    const id = setInterval(check, CHECK_MS);
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', check);
    return () => {
      clearTimeout(first);
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', check);
    };
  }, [check]);

  // The version the visitor is moving to once they act on the alert.
  const acknowledge = () => { if (next && next !== 'preview') store.set(SEEN_KEY, next); };

  const reload = async () => {
    setReloading(true);
    acknowledge();
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if (navigator.serviceWorker?.getRegistrations) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
    } catch { /* best effort — the cache-busting reload below still runs */ }
    const url = new URL(window.location.href);
    url.searchParams.delete('preview-update');
    url.searchParams.set(BUSTER, String(Date.now()));
    window.location.replace(url.toString());
  };

  const later = () => {
    acknowledge();
    try { sessionStorage.setItem(SNOOZE_KEY, next); } catch { /* storage blocked */ }
    setNext(null);
  };

  if (!next) return null;

  return (
    <div className="upd" role="status" aria-live="polite">
      <span className="upd-ic" aria-hidden="true">
        <i className="ri-sparkling-2-fill"></i>
        <b className="upd-dot"></b>
      </span>
      <span className="upd-copy">
        <b>A new update is live</b>
        <em>We just shipped improvements. Reload to get the latest version.</em>
      </span>
      <span className="upd-actions">
        <button type="button" className="upd-later" onClick={later} disabled={reloading}>Later</button>
        <button type="button" className="upd-reload" onClick={reload} disabled={reloading}>
          <i className={`ri-refresh-line${reloading ? ' is-spinning' : ''}`} aria-hidden="true"></i>
          {reloading ? 'Reloading…' : 'Reload'}
        </button>
      </span>
    </div>
  );
}
