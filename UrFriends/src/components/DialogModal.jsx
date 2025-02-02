import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { confirmDialog, hideDialog } from "../features/dialogModalSlice";

const DialogModal = (props) => {
  const dialogVisible = useSelector((state) => state.dialog.visible);
  const message = useSelector((state) => state.modal.message);
  
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideDialog());
  };
  const handleConfirm = () => {
    dispatch(confirmDialog());
  };

  //render
  if (!dialogVisible) {
    return null;
  }
  return (
    <>
      <div className="modal-base-transparency">
        <div className="dialog-modal-box">
          <div className="modal-top-bar">
            <button onClick={handleClose}>Close</button>
          </div>
            DIALOG
            <button onClick={handleConfirm}>CONFIRM</button>
        </div>
      </div>
    </>
  );
};

export default DialogModal;
