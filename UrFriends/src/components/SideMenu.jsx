import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideSideMenu } from "../features/sideMenuSlice";
import { logout } from "../features/loginSlice";

const SideMenu = (props) => {
  const isVisible = useSelector((state) => state.sideMenu.visible);

  const dispatch = useDispatch();

  const handleClose = (event) => {
    event.stopPropagation();
    dispatch(hideSideMenu());
  };

  const handleClickAway = (event) => {
    event.stopPropagation();
    dispatch(hideSideMenu());
  };



  //render
  if (!isVisible) {
    return null;
  }
  return (
    <>
      <div
        style={{
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.3)",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onClick={(event) => handleClickAway(event)}
      ></div>
      <div
        style={{
          position: "fixed",
          backgroundColor: "white",
          boxShadow:
            "20px 1px 10px rgba(0,0,0,0.3), 20px -5px 10px rgba(0,0,0,0.3)",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
        }}
      >
        <button onClick={(event) => handleClose(event)}>Close</button>
        <button onClick={props.logout}>Log Out</button>
      </div>
    </>
  );
};

export default SideMenu;
