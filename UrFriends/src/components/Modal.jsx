import React from "react";
import { useState } from "react";

const Modal = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        opacity: "10%",
        backgroundColor: "red",
        display: "block",
        position: "fixed",
        width: "70%",
        height: "70%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {props.children}
    </div>
  );
};

export default Modal
