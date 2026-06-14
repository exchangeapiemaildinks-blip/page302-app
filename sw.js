// Bumped cache name (v1 -> v2) so this version of the SW is detected as new,
// installs, and clears out the old v1 cache that was stuck serving the
// original index.html forever.
const CACHE = 'page302-v2';

// Only "rarely changes" assets are precached. The app shell (index.html) is
// handled network-first below, so it doesn't need precaching.
const ASSETS = [
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // backend /feed, fonts etc - leave untouched

  const isAppShell = e.request.mode === 'navigate'
    || url.pathname.endsWith('/') || url.pathname.endsWith('index.html');

  if (isAppShell) {
    // Network-first: always try for the latest version when online.
    // Falls back to the last cached copy only if the network fetch fails.
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for static assets (icons, manifest) - these rarely change.
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
