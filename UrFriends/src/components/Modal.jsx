import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHide } from "../features/modalSlice.js";

const Modal = (props) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log("close the window");
    dispatch(setHide())
  };

  //render
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div
        style={{
          opacity: "30%",
          backgroundColor: "red",
          display: "block",
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0%",
          left: "0%",
        }}
      >
        <button onClick={handleClose}>Close</button>
        {props.children}
      </div>
    </>
  );
};

export default Modal;
