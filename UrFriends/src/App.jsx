import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "react-oidc-context";

import Header from "./components/Header";
import Phonebook from "./components/Phonebook";
import SideMenu from "./components/SideMenu";
import Footer from "./components/Footer";
import EditTiers from "./components/EditTiers";

import {
  setSettings,
} from "./features/loginSlice";
import { hideSideMenu } from "./features/sideMenuSlice";

import { Route, Routes } from "react-router";

import Modal from "./components/Modal";

import { getUsersPhonebook } from "../services/contactService";
import Notification from "./components/Notification";
import { populatePhonebook, populateTiers } from "./features/phonebookSlice";
import useWindowSize from "./functions/WindowResize";
import AuthCallback from "./components/AuthCallbackj";
import Logout from "./components/Logout";

function App() {
  const { width } = useWindowSize();

  const { height } = useWindowSize();

  const auth = useAuth();

  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const tiersStore = useSelector((state) => state.phonebook.tiers);
  const loggedIn = useSelector((state) => state.login.user);

  const dispatch = useDispatch();

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

  const signOutRedirect = () => {
    const clientId = "5c76hq5c4logshir8gvjksfdtk";
    const logoutUri = "https://staging.d3q7upo85md648.amplifyapp.com/logout";
    const cognitoDomain = "https://us-east-2k5tcpvej8.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const handleLogOut = async () => {
    // dispatch(hideSideMenu());
    // dispatch(logoutDispatch());
    signOutRedirect();
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  console.log(auth);

  if (auth.isAuthenticated) {
    return (
      <>
        <button onClick={() => handleLogOut()}>Sign out</button>
        <div>
          {auth.user.profile["cognito:username"]}
        </div>
        
      </>
    );
  }

  

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;
