const CACHE_NAME = 'suno-gen-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// インストール時にリソースをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// キャッシュがあればそれを返し、なければネットワークから取得
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
