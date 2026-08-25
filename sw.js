/* ═══════════════════════════════════════════════════════════════
   MANOS ABIERTAS — Service Worker (PWA Offline-First)
   Strategy: stale-while-revalidate for content, cache-first for assets
   ═══════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'manos-abiertas-v3.0.0';
const STATIC_CACHE = 'ma-static-v3';
const DATA_CACHE = 'ma-data-v3';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/data/courses.json',
  '/data/resources.json'
];

const CDN_URLS = [
  'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
  'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&display=swap'
];

// Install: precache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log('[SW] Precaching static assets');
      return cache.addAll(PRECACHE_URLS).catch(err => {
        console.warn('[SW] Precache partial failure (offline?):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== STATIC_CACHE && k !== DATA_CACHE && k !== CACHE_NAME)
          .map(k => {
            console.log('[SW] Removing old cache:', k);
            return caches.delete(k);
          })
      )
    )
  );
  self.clients.claim();
});

// Fetch: stale-while-revalidate for HTML/data, cache-first for static assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Data files (JSON): stale-while-revalidate
  if (url.pathname.startsWith('/data/') || url.pathname.endsWith('.json')) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  // CDN assets: cache-first (they're versioned)
  if (url.hostname !== location.hostname) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // HTML: stale-while-revalidate
  if (request.headers.get('accept')?.includes('text/html') || url.pathname === '/') {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
    return;
  }

  // Everything else (CSS, JS, images): cache-first
  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

// Strategy: Cache-First (fallback to network)
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return new Response('Offline — recurso no disponible', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// Strategy: Stale-While-Revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || (await fetchPromise) || new Response(
    offlinePage(),
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

// Offline fallback page
function offlinePage() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Manos Abiertas — Sin conexión</title>
  <style>
    body{font-family:'Outfit',system-ui,sans-serif;background:#FEFCF8;color:#1A1A2E;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center;padding:20px}
    .box{max-width:400px}
    h1{font-size:2rem;margin-bottom:8px}
    p{color:#4A4A6A;line-height:1.6}
    .emoji{font-size:4rem;margin-bottom:16px}
    button{background:#FF6B35;color:white;border:none;padding:12px 28px;border-radius:999px;font:600 1rem 'Outfit',sans-serif;cursor:pointer;margin-top:20px}
    button:hover{background:#E85A24}
  </style>
</head>
<body>
  <div class="box">
    <div class="emoji">📡</div>
    <h1>Sin conexión</h1>
    <p>No tienes conexión a internet. La plataforma se cargará automáticamente cuando vuelvas a estar online.</p>
    <p><strong>Emergencias: llama al 112</strong></p>
    <button onclick="location.reload()">Reintentar</button>
  </div>
</body>
</html>`;
}
