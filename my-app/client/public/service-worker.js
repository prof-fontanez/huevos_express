const CACHE_NAME = 'huevos-express-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/logo3.png',
    '/pr_flag.png',
    '/ath_movil.png',
    '/qr2.jpg',
    '/certificado_hacienda.jpg',
];

// Install — cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch — serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests and API calls
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('/api/') ||
        event.request.url.includes('onrender.com') ||
        event.request.url.includes('googleapis.com') ||
        event.request.url.includes('googletagmanager.com')) return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                // Cache successful responses
                if (response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            });
        }).catch(() => {
            // Offline fallback
            return caches.match('/');
        })
    );
});