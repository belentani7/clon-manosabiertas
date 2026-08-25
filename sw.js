// Service Worker v3 - ManosAbiertas PWA
const CACHE_NAME = 'manosabiertas-v3-' + new Date().getTime();
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/gestalt.css',
  '/assets/js/app.js',
  '/data/courses.json',
  '/data/resources.json',
  '/manifest.json'
];

// Install - cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Installing ManosAbiertas v3');
      return cache.addAll(CRITICAL_ASSETS).catch(() => {
        console.warn('[SW] Some critical assets could not be cached');
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Stale-while-revalidate strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // API calls - network first
  if (url.pathname.startsWith('/api/')) {
    return event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
  }

  // HTML/JSON - Stale-while-revalidate
  if (request.method === 'GET' && 
      (url.pathname.endsWith('.html') || url.pathname.endsWith('.json'))) {
    return event.respondWith(
      caches.match(request).then(cached => {
        const fetched = fetch(request).then(response => {
          const cache = caches.open(CACHE_NAME);
          cache.then(c => c.put(request, response.clone()));
          return response;
        });
        return cached || fetched;
      })
    );
  }

  // Assets (CSS, JS, images) - Cache first
  if (request.method === 'GET' && 
      /\.(css|js|woff2?|png|jpg|jpeg|gif|svg)$/.test(url.pathname)) {
    return event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(request, response.clone()));
          }
          return response;
        });
      })
    );
  }

  // Default - network first
  return event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
      .catch(() => caches.match('/'))
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-checklist') {
    event.waitUntil(
      // Sync checklist data when online
      fetch('/api/sync-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(JSON.parse(localStorage.getItem('checklist-offline') || '{}'))
      })
        .then(() => localStorage.removeItem('checklist-offline'))
        .catch(() => console.warn('[SW] Sync failed, will retry'))
    );
  }
});

// Push notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Nueva actualización en ManosAbiertas',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    tag: 'manosabiertas-notification',
    data: { url: data.url || '/' }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'ManosAbiertas', options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});

console.log('[SW] Service Worker v3 loaded');
