import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideSideMenu } from "../features/sideMenuSlice";
import { logoutDispatch } from "../features/loginSlice";

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
        className="side-menu-transparency-base"
        onClick={(event) => handleClickAway(event)}
      ></div>
      <div className="side-menu">
        <div className="side-menu-content" >
          <span className="side-menu-grid-elem1"><button className="side-menu-close-btn" onClick={(event) => handleClose(event)}><i className="fa-solid fa-x fa-3x"></i></button></span>
          <span className="side-menu-grid-elem2"></span>
          <span className="side-menu-grid-elem3"></span>
          <span className="side-menu-grid-elem4"></span>
          <span className="side-menu-grid-elem5"></span>
          <span className="side-menu-grid-elem6"></span>
          <span className="side-menu-elem side-menu-grid-elem6"><button className="side-menu-btn" onClick={props.logout}>Log Out</button></span>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

/* 
style={{
  position: "fixed",
  backgroundColor: "rgba(0,0,0,0.3)",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}} */

/* 

  style={{
    position: "fixed",
    backgroundColor: "white",
    boxShadow:
      "20px 1px 10px rgba(0,0,0,0.3), 20px -5px 10px rgba(0,0,0,0.3)",
    top: 0,
    left: 0,
    width: "50%",
    height: "100%",
  }} */
