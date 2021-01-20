// Options and actions for the notifications
const pushNotificationOptions = {
  body: "It's Now or Never 😊",
  icon: `${process.env.PUBLIC_URL}/logo512.png`,
  audio: "./media/audio.wav",
  vibrate: [200, 250, 200, 100, 150],
  data: {
    dateOfArrival: Date.now(),
    primaryKey: 1,
  },
  actions: [
    {
      action: "explore",
      title: "explore notification",
    },
    {
      action: "close",
      title: "Close notification",
    },
  ],
  silent: false,
  badge: `${process.env.PUBLIC_URL}/logo128.png`,
};

export default pushNotificationOptions;
