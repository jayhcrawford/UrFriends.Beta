import React from "react";
import { useSelector } from "react-redux";

const NotificationBase = (props) => {
  const notificationVisible = useSelector(
    (state) => state.notification.visible
  );

  if (!notificationVisible) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: props.color,
        position: "fixed",
        top: "10px",
        right: "10px",
        left: "10px",
        height: "4em",
        border: "5px solid rgba(255, 255, 255, .4)",
        borderRadius: ".5em",
      }}
    >
      <p
        style={{ marginLeft: "1em", color: props.fontColor, fontSize: "1.2em" }}
      >
        {props.message}
      </p>
    </div>
  );
};

const Notification = () => {
  const notificationMessage = useSelector(
    (state) => state.notification.message
  );
  const notificationType = useSelector((state) => state.notification.type);

  return (
    <>
      {notificationType == "green" && (
        <NotificationBase
          color="limegreen"
          fontColor="white"
          message={notificationMessage}
        />
      )}
      {notificationType == "red" && (
        <NotificationBase
          color="red"
          fontColor="black"
          message={notificationMessage}
        />
      )}
    </>
  );
};

export default Notification;
