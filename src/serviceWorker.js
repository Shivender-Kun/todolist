// Check service worker support
let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

export const checkServiceWorkerSupport = () => {
  if (navigator.serviceWorker) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register(swUrl);
    });
  }
};
