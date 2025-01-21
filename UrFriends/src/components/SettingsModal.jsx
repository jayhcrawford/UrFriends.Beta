import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHideTierSettingsModal } from "../features/tierSettingsSlice";

const TierSettingsModal = (props) => {
  const modalVisible = useSelector((state) => state.tierSettingsModal.visible);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setHideTierSettingsModal());
  };

  //render
  if (!modalVisible) {
    return null;
  }
  return (
    <>
      <div className="modal-base-transparency">
        <div className="modal-box">
          <h3>Tier [Pass Thru Store] Settings</h3>
            <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default TierSettingsModal;
