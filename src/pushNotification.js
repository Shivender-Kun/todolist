// Function for pushing notifications
function pushNotification(notificationTitle, options) {
  if ("Notification" in window) {
    Notification.requestPermission((status) => status);
  }
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification(notificationTitle, options);
    });
  }
}

export default pushNotification;
