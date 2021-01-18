let cacheData = "todo";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/faveicon.ico",
        "/",
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/logo512.png",
        "/index.html",
        "/manifest.json",
        "/main.a9e09ab22182dba9d98a.hot-update.js",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res;
      }
    })
  );
});
