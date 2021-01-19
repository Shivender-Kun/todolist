const cacheVersion = "v1";

// install the service worker
this.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheVersion)
      .then((cache) => {
        cache.addAll([
          "/",
          // "/logo512.png",
          "/index.html",
          // "/manifest.json",
          // "/faveicon.ico",
          "/static/js/serviceWorker.js",
          "/static/js/index.js",
          "/static/js/App.js",
          "/static/js/2.6a739a88.chunk.js",
          "/static/js/main.d032018f.chunk.js",
          "/static/css/App.css",
          "/static/css/main.ef8c2f57.chunk.css",
          "/static/css/index.css",
          "/sw.js",
        ]);
      })
      .then(() => this.skipWaiting())
  );
});

this.addEventListener("activate", (e) => {
  // Remove unwanted cache versions
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheVersion) {
            return caches.delete(cache);
          }
          return null;
        })
      );
    })
  );
});

this.addEventListener("fetch", (e) => {
  // if (!navigator.onLine) {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Make clone f response
        const resClone = res.clone();
        caches.open(cacheVersion).then((cache) => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
  // }
});
