const CACHE_NAME = 'useful-tools-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// App ကို Install လုပ်ချိန်မှာ ဖိုင်တွေကို Cache (မှတ်ဉာဏ်) ထဲ သိမ်းမည်
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// App ဖွင့်တိုင်း Cache ထဲကဟာကို အရင်ရှာပြမည် (မြန်ဆန်စေရန်)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Cache ထဲမှာရှိရင် အဲဒါကိုပဲ ပြမည်
        }
        return fetch(event.request); // မရှိမှ အင်တာနက်ကနေ ဆွဲယူမည်
      })
  );
});
