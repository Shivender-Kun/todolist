// Naming a cache version
const cacheVersion = "v1";

// install the service worker
this.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheVersion)
      .then((cache) => {
        // Cache the required files
        cache.addAll([
          "/",
          "/logo512.png",
          "/logo128.png",
          "/index.html",
          "/manifest.json",
          "/asset-manifest.json",
          "/faveicon.ico",
          "/serviceWorker.js",
          "/static/js/2.6a739a88.chunk.js",
          "/static/js/2.6a739a88.chunk.js.map",
          "/static/js/main.fb9f5247.chunk.js",
          "/static/js/main.fb9f5247.chunk.js.map",
          "/static/js/runtime-main.33471999.js",
          "/static/js/runtime-main.33471999.js.map",
          "/static/css/main.ef8c2f57.chunk.css",
          "/static/css/main.ef8c2f57.chunk.css.map",
          "/sw.js",
          "/media/audio.mp3",
        ]);
      })
      .then(() => this.skipWaiting())
  );
});

// Activate the servicer worker
this.addEventListener("activate", (e) => {
  // Remove unwanted cache versions
  e.waitUntil(
    // Removing old cache versions
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

// Fetching the cached files
this.addEventListener("fetch", (e) => {
  // If user ofline fetch cached/cloned files
  if (navigator.onLine) {
    e.waitUntil(
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
  // If user online then wait for the latest server files
  else {
    e.respondWith(
      fetch(e.request)
        .then((res) => res)
        .catch((err) => caches.match(e.request).then((res) => res))
    );
  }
});

// To check if notification is clicked
this.addEventListener("notificationclick", (e) => {
  if (e.action === "close") {
    e.notification.close();
  } else {
    clients.openWindow("https://2do-list-react.netlify.app/");
    e.notification.close();
  }
});
