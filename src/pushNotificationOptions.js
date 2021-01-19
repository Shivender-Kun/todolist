// Options and actions for the notifications
const pushNotificationOptions = {
  body: "It's Now or Never 😊",
  icon: `${process.env.PUBLIC_URL}/logo128.png`,
  vibrate: [100, 50, 100],
  data: {
    dateOfArrival: Date.now(),
    primaryKey: 1,
  },
  actions: [
    {
      action: "close",
      title: "Close notification",
    },
  ],
  badge: `${process.env.PUBLIC_URL}/logo128.png`,

  // TODO 5.1 - add a tag to the notification
};

export default pushNotificationOptions;
