export const requestNotificationsPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }

  const permission = await Notification.requestPermission();
  return permission;
};

export const showAppNotification = (title: string, body: string) => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
};
