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
        "/static/js/1.chunk.js",
        "static/js/main.chunk.js.map",
        "/static/js/0.chunk.js.map",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) {
          return res;
        }
        let requestUrl = event.request.clone();
        return fetch(requestUrl);
      })
    );
  }
});
