// ဗားရှင်းအသစ်ပြောင်းလိုက်ပါသည်
const CACHE_NAME = 'useful-tools-v2';
const urlsToCache = [
  '/',
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ဗားရှင်းအဟောင်း Cache များကို ဖျက်ထုတ်မည့်စနစ်
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Network-First Strategy: အင်တာနက်ရှိရင် အသစ်ကိုယူမယ်၊ အင်တာနက်မရှိမှ သိမ်းထားတာကိုပြမယ်
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
