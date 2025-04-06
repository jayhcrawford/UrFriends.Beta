import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "react-oidc-context";

import Header from "./components/Header";
import Phonebook from "./components/Phonebook";
import LoginWithAWS from "./components/LoginWithAWS";
import SideMenu from "./components/SideMenu";
import Footer from "./components/Footer";
import EditTiers from "./components/EditTiers";
import Calendar from "./components/Calendar";

import {
  loginDispatch,
  logoutDispatch,
  setSettings,
} from "./features/loginSlice";
import { hideSideMenu } from "./features/sideMenuSlice";

import { Route, Routes } from "react-router";

import Modal from "./components/Modal";

import { login } from "../services/loginService";
import { getUsersPhonebook } from "../services/contactService";
import Notification from "./components/Notification";
import { populatePhonebook, populateTiers } from "./features/phonebookSlice";
import BulkAdd from "./components/BulkAdd/BulkAdd";
import useWindowSize from "./functions/WindowResize";
import AuthCallback from "./components/AuthCallbackj";

function App() {
  const { width } = useWindowSize();

  const { height } = useWindowSize();

  const auth = useAuth();

  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const tiersStore = useSelector((state) => state.phonebook.tiers);
  const loggedIn = useSelector((state) => state.login.user);

  const dispatch = useDispatch();

  //called in useEffect below
  const fetchUserData = async () => {
    try {
      //get user's phonebook and settings
      const result = await getUsersPhonebook(loggedIn);
      //set state for phonebook data and tiers data

      dispatch(populatePhonebook(result.phonebook));

      let tiersArray = Object.keys(result.phonebook);
      dispatch(populateTiers(tiersArray));

      dispatch(setSettings(result.settings.tierTime));
    } catch (error) {
      console.log(error);
      return [];
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

      //dispatch phonebook and settings data to store
      dispatch(setSettings(result.data.settings));
      dispatch(populatePhonebook(result.data.phonebook));
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
    // return <Login handleLogin={handleLogin} />;
  }

  const signOutRedirect = () => {
    const clientId = "5c76hq5c4logshir8gvjksfdtk";
    const logoutUri = "https//localhost:5173/main";
    const cognitoDomain =
      "https://us-east-2k5tcpvej8.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <>
        <button onClick={() => signOutRedirect()}>Sign out</button>

        {width + " " + height}
        <Notification />
        <Modal />
        <SideMenu logout={handleLogOut} />
        <Header />
        <p></p>
        <Routes>
          <Route path="/main" element={<Phonebook />} />
          <Route path="/auth_reciever" element={<AuthCallback />} />
          <Route path="/editTiers" element={<EditTiers />} />
          {/* TODO: Implement a route for bulk add people*/}
        </Routes>
        <Footer />
      </>
    );
  }

  console.log(auth);

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;
