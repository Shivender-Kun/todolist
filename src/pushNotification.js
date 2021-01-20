const audio = new Audio("./media/audio.mp3");

// Function for pushing notifications
function pushNotification(notificationTitle, options) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification(notificationTitle, options);
      audio.play();
    });
  }
}

export default pushNotification;
