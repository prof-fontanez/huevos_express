import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { writeFileSync } from 'fs'

const buildTime = Date.now();

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime)
  },
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.huevosexpresspr.com',
      dynamicRoutes: [
        '/product',
        '/history',
        '/heroes',
        '/activities',
      ],
    }),
    {
      name: 'generate-sw',
      closeBundle() {
        const swContent = `const CACHE_NAME = 'huevos-express-${buildTime}';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/logo3.png',
    '/pr_flag.png',
    '/ath_movil.png',
    '/qr2.jpg',
    '/certificado_hacienda.jpg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

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
    self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => client.navigate(client.url));
    });
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith('http')) return;
    if (event.request.url.includes('/api/') ||
        event.request.url.includes('onrender.com') ||
        event.request.url.includes('googleapis.com') ||
        event.request.url.includes('googletagmanager.com')) return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                if (response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            });
        }).catch(() => {
            return caches.match('/');
        })
    );
});`;
        writeFileSync('dist/service-worker.js', swContent);
      }
    }
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})