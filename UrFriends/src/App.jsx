import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Phonebook from "./components/Phonebook";
import Modal from "./components/Modal";
import Login from "./components/Login";
import SideMenu from "./components/SideMenu";
import NewPersonModal from "./components/NewPersonModal";
import Footer from "./components/Footer";
import EditTiers from "./components/EditTiers";

import { loginDispatch, logoutDispatch } from "./features/loginSlice";
import { hideSideMenu } from "./features/sideMenuSlice";

import { Route, Routes } from "react-router";
import ReachOutModal from "./components/ReachOutModal";

import ExpandedContactModal from "./components/ExpandedContactModal";

import { login } from "../services/loginService";
import { getUsersPhonebook } from "../services/contactService";

function App() {
  const loggedIn = useSelector((state) => state.login.user);
  const [phonebook, setPhonebook] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [userSettings, setUserSettings] = useState(null);




  const dispatch = useDispatch();

  //called in useEffect below
  const fetchUserData = async () => {
    try {
      //get user's phonebook and settings
      const result = await getUsersPhonebook(loggedIn);
      //set state for phonebook data and tiers data
      setPhonebook(result.phonebook);
      let tiersArray = Object.keys(result.phonebook);
      setTiers(tiersArray);
      setUserSettings(result.settings.tierTime);
    } catch (error) {
      console.log(error);
    }
  };

  //if the login is not in the Redux store, check localStorage for token
  if (!loggedIn) {
    //TODO: verify that the user's credentials are valid and return the user ID
    if (localStorage.getItem("loggedIn")) {
      const localToken = JSON.parse(localStorage.getItem("loggedIn"));
      dispatch(loginDispatch({ user: localToken }));
    }
  }

  //fetch user's data
  useEffect(() => {
    if (loggedIn) {
      //fetch phonebook and settings
      fetchUserData();
    }
  }, [loggedIn]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const username = event.target.username.value;

    //try to login
    try {
      const result = await login({
        username: username,
        password: password,
      });

      //Store the logged in user in store/localStorage
      dispatch(loginDispatch({ user: result.data.user }));
      localStorage.setItem(
        "loggedIn",
        JSON.stringify({
          ...result.data.user,
        })
      );

      //set user settings in state
      setUserSettings(result.data.settings);
      setPhonebook(result.data.phonebook);
    } catch (error) {
      console.log(error);
    }

    event.target.password.value = "";
    event.target.username.value = "";
  };

  const handleLogOut = () => {
    dispatch(hideSideMenu());
    dispatch(logoutDispatch());
    localStorage.removeItem("loggedIn");
    location.reload();
  };

  if (!loggedIn) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <>

      <NewPersonModal
        people={phonebook}
        setPhonebook={setPhonebook}
        setTiers={setTiers}
        tiers={tiers}
      />
      <ReachOutModal />
      <ExpandedContactModal />
      <SideMenu logout={handleLogOut} />
      <Modal />
      <Header />
      <p></p>
      <Routes>
        <Route
          path=""
          element={
            <Phonebook
              settings={userSettings}
              people={phonebook}
              tiers={tiers}
            />
          }
        />

        <Route
          path="/editTiers"
          element={
            <EditTiers phonebook={phonebook} userSettings={userSettings} />
          }
        />
        {/* TODO: Implement a route for bulk add people*/}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
