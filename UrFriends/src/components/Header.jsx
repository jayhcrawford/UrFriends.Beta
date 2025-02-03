import react from "react";
import { useDispatch } from "react-redux";
import { showSideMenu } from "../features/sideMenuSlice";
import { setVisibleModal } from "../features/modalSlice";

function Header() {
  const dispatch = useDispatch();

  const handleOpenSideMenu = () => {
    dispatch(showSideMenu());
  };

  const handleRandom = () => {
    dispatch(
      setVisibleModal({
        modalContentType: "random",
        title: "Random Interaction Machine",
      })
    );
  };

  return (
    <>
      <header>
        <h1 id="header-logo-text">UrFriends</h1>
      </header>
      <button
        onClick={handleRandom}
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
