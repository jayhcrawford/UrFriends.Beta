import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHide } from "../features/modalSlice.js";

const Modal = (props) => {
  const modalVisible = useSelector((state) => state.modal.visible);
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log("close the window");
    dispatch(setHide());
  };

  //render
  if (!modalVisible) {
    return null;
  }
  return (
    <>
      <div className="modal-base-transparency">
        <button onClick={handleClose}>Close</button>
        {props.children}
      </div>
    </>
  );
};

export default Modal;
