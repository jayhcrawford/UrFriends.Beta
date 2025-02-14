import {
  hideNotification,
  setNotification,
} from "../features/notificationSlice";

export const sendNotification = (dispatcher, messageDispatch) => {
  dispatcher(setNotification(messageDispatch));

  setTimeout(() => {
    dispatcher(hideNotification());
  }, 5000);
}
