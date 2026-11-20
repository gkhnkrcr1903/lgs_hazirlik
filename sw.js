/* Basit çevrimdışı önbellek: önce ağ, ağ yoksa önbellek */
const CACHE = 'lgs-hazirlik-v2';
const DOSYALAR = ['./', 'index.html', 'css/style.css', 'js/util.js', 'js/app.js', 'js/data/matematik.js', 'js/data/turkce.js', 'js/data/sosyal.js', 'js/data/din.js', 'manifest.json', 'icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const kopya = res.clone(); caches.open(CACHE).then(c => c.put(e.request, kopya));
      }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
