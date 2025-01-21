import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPerson, setHideReachOutModal } from "../features/reachOutModalSlice";

const ReachOutModal = (props) => {
  const modalVisible = useSelector((state) => state.reachOutModal.visible);
  const person = useSelector((state) => state.reachOutModal.person)
  const loggedIn = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setHideReachOutModal());
    dispatch(resetPerson())
  };

  //render
  if (!modalVisible) {
    return null;
  }
  return (
    <>
      <div className="modal-base-transparency">
        <div className="modal-box">
          <button onClick={handleClose}>Close</button>
          <h3>Reach Out to {person.name}</h3>
        </div>
      </div>
    </>
  );
};

export default ReachOutModal;
