const cacheVersion = "v2";

// install the service worker
this.addEventListener("install", (e) => {
  // e.waitUntil(
  //   caches
  //     .open(cacheVersion)
  //     .then((cache) => {
  //       cache.addAll([
  //         "/faveicon.ico",
  //         "/",
  //         "/static/js/bundle.js",
  //         "/static/js/main.chunk.js",
  //         "/static/js/0.chunk.js",
  //         "/logo512.png",
  //         "/index.html",
  //         "/manifest.json",
  //         "/static/js/1.chunk.js",
  //         "static/js/main.chunk.js.map",
  //         "/static/js/0.chunk.js.map",
  //       ]);
  //     })
  //     .then(() => this.skipWaiting())
  // );
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
  if (!navigator.onLine) {
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
  }
});
