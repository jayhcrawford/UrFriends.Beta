import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHideExpandedContactModal } from "../features/expandedContactModal";

const ExpandedContactModal = (props) => {
  const modalVisible = useSelector((state) => state.expandContactModal.visible);
  const modalType = useSelector((state) => state.expandContactModal.type);
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log("close the window");
    dispatch(setHideExpandedContactModal());
  };

  //render
  if (!modalVisible) {
    return null;
  }
  return (
    <>
      <div className="modal-base-transparency">
        <div className="modal-box">
          <h3>{modalType}</h3>
          <p>Here is the content</p>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default ExpandedContactModal;
