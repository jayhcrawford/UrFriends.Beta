import react from "react";
import { useDispatch } from "react-redux";
import { showSideMenu } from "../features/sideMenuSlice";

function Header() {
  const dispatch = useDispatch();

  const handleOpenSideMenu = () => {
    dispatch(showSideMenu());
  };

  return (
    <>
      <header>
        <h1 id="header-logo-text">UrFriends</h1>
      </header>
      <button
        id="random-interact-btn"
        alt="Random Interaction Button"
        aria-label="Random Interaction Button"
      >
        <i className="fa-solid fa-dice"></i>
      </button>
      <button onClick={handleOpenSideMenu} id="main-menu-btn">
        <i className="fa-solid fa-bars"></i>
      </button>
    </>
  );
}

export default Header;
