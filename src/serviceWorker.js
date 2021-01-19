// Provide the path to the file where the caching system is defined
const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

export const checkServiceWorkerSupport = () => {
  // Check service worker support
  if (navigator.serviceWorker) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register(swUrl);
    });
  }
};
