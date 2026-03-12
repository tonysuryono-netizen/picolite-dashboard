const CACHE_NAME = 'picolite-v0.2.0-beta'; 
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'PICO LOGO 512P NEW.png' // Tambahkan ini supaya ikon muncul di HP
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache dibuka!');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Balikkan response dari cache, jika tidak ada baru ambil dari network
      return response || fetch(event.request);
    })
  );
});

// Menghapus cache lama jika ada update versi
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});