const _self = self as unknown as ServiceWorkerGlobalScope;

const date = new Date();
const firstJan = new Date(date.getFullYear(), 0, 1);
const version = [
  'v',
  date.getFullYear(),
  Math.floor(
    (date.getTime() - firstJan.getTime()) / (1000 * 60 * 60 * 24 * 7)
  ),
].join('.');

const cachePrefix = 'kudagonews-cache';
const cacheName = cachePrefix + '_' + version;

_self.addEventListener('install', (event) => {
  // console.log('Installing [Service Worker]', event);

  event.waitUntil(
    caches
      .open(cacheName)
      .then(async (cache) => {
        // console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/concert',
          '/exhibition',
          '/festival',
          '/theater',
        ]);
      })
      .catch((e) => console.error('sw install error', e))
  );
});

_self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        // Remove caches whose name is no longer valid
        return Promise.all(
          keys
            .filter((key) => {
              return (
                key.startsWith(cachePrefix) && !key.endsWith(version)
              );
            })
            .map((key) => {
              return caches.delete(key);
            })
        );
      })
      .catch((e) => console.error('sw activation failed', e))
  );
});

_self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  if (url.startsWith('http') && e.request.method === 'GET') {
    e.respondWith(
      (async () => {
        const request = e.request;
        const isHtmlPageRequest =
          request.headers.get('Accept')?.indexOf('text/html') !==
            -1 && url.startsWith(_self.origin);
        const cacheKey = isHtmlPageRequest ? '/' : e.request;

        const isImageRequest =
          !isHtmlPageRequest &&
          request.headers.get('Accept')?.indexOf('image/') !== -1;
        const isCacheFirstRequest =
          !isHtmlPageRequest &&
          ((url.startsWith(_self.origin) &&
            url.match(/(\.js|\.css)$/)) ||
            url.match(/\.woff.$/));
        if (isImageRequest || isCacheFirstRequest) {
          const cacheResponse = await caches.match(cacheKey);
          if (cacheResponse) {
            // console.log(`[Service Worker] Return cache resource: ${url}`);
            return cacheResponse;
          }
        }
        try {
          const response = await fetch(cacheKey);
          const cache = await caches.open(cacheName);
          await cache.put(cacheKey, response.clone());
          return response;
        } catch (e) {
          console.error(`sw fetch error`, e);
          const cacheItem = await caches.match(cacheKey);
          if (cacheItem) {
            return cacheItem;
          }
        }
        console.error('e.respondWith skiped try / catch');
        return new Response('', {
          status: 404,
          statusText: 'Not Found',
        });
      })()
    );
  }
});
