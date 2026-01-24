// バージョン管理：更新時はここを変更してPushしてください
const CACHE_NAME = 'suno-temp-v3'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// インストール：新しいリソースをキャッシュし、待機せず即座に有効化
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 有効化：古いキャッシュを即座に削除し、現在の全タブを制御下に置く
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      clients.claim(), // 即座にページを制御
      caches.keys().then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        );
      })
    ])
  );
});

// フェッチ：キャッシュがあればそれを返し、なければネットワークへ
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
