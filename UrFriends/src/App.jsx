import axios from "axios";
import { useState, useEffect } from "react";

import Header from "./Header";
import Phonebook from "./components/Phonebook";
import Modal from "./components/Modal";


function App() {
  const [people, setPeople] = useState("");
  const [tiers, setTiers] = useState([]);

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

  return (
    <>
      <Header />
      <Modal />
      <p></p>
      <Phonebook people={people} tiers={tiers} />
    </>
  );
}

export default App;
