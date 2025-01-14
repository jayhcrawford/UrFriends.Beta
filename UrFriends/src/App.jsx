import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Phonebook from "./components/Phonebook";
import Modal from "./components/Modal";
import Login from "./components/Login";
import SideMenu from "./components/SideMenu";

function App() {
  const [people, setPeople] = useState("");
  const [tiers, setTiers] = useState([]);
  const loggedIn = true;

  //get the user's phonebook data
  useEffect(() => {
    axios
      .get("http://localhost:3000/phonebook")
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        //format the phonebook JSON here

        const tieredPeople = {};
        response.map((person) => {
          //if tiered people does not have key corresponding to relevant tier, create
          if (!Object.hasOwn(tieredPeople, `${person.tier}`)) {
            tieredPeople[person.tier] = [person];
          } else {
            //push in the person into the already extant key's array
            tieredPeople[person.tier].push(person);
          }
        });

        setPeople(tieredPeople);
        return tieredPeople;
      })
      .then((response) => {
        let tiersArray = Object.keys(response);
        setTiers(tiersArray);
      });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const username = event.target.username.value;

    console.log(username, password);

    event.target.password.value = "";
    event.target.username.value = "";
  };

  if (!loggedIn) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <>
      <SideMenu />
      <Modal />
      <Header />
      <p></p>
      <Phonebook people={people} tiers={tiers} />
      <footer>
        <div
          style={{
            height: "10em",
            marginTop: "2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
          }}
          className="footer-contents"
        >
          <p style={{ padding: "1em" }}>
            Jay Crawford - UrFriends - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
