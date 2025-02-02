import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { postContact } from "../../../services/contactService.js";
import {
  populatePhonebook,
  populateTiers,
} from "../../features/phonebookSlice.js";
import {
  hideNotification,
  setNotification,
} from "../../features/notificationSlice.js";

const NewPerson = (props) => {
  const loggedIn = useSelector((state) => state.login.user);
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const tiersStore = useSelector((state) => state.phonebook.tiers);

  const dispatch = useDispatch();

  const createNotification = (message, type) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  //update the store when a new person is added
  const updateThePhonebook = (person) => {
    //if the tier is already populated in the phonebook
    if (Object.hasOwn(phonebookStore, `${person.tier}`)) {
      const newTier = phonebookStore[person.tier].concat(person);
      const newPhonebook = {
        ...phonebookStore,
        [person.tier]: newTier,
      };
      dispatch(populatePhonebook(newPhonebook));
    } else {
      //the tier is empty and therefore isn't a part of the store
      const newTier = [person]
      const newPhonebook = {
        ...phonebookStore,
        [person.tier]: newTier
      }
      dispatch(populatePhonebook(newPhonebook))
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    //the result of a call to the service postContact in contactServices.js is passed to this function to display notifications
    const checkResult = (response) => {
      if (response.status != 200 || !Object.hasOwn(response, "status")) {
        createNotification(
          `There was an error saving ${event.target.contactFirstName.value} ${event.target.contactLastName.value} to the server`,
          "red"
        );
        return false;
      } else {
        createNotification(
          `${response.data.name.first} ${response.data.name.last} was saved`,
          "green"
        );
        return true;
      }
    };

    const newPerson = {
      tier: event.target.tier.value,
      name: {
        first: event.target.contactFirstName.value,
        last: event.target.contactLastName.value,
      },
      phoneNumber: event.target.contactPhone.value,
      email: event.target.contactEmail.value,
      lastConvo: [{ date: null }],
      user: loggedIn.user.id,
    };
    let newPhonebook = {};

    if (Object.keys(phonebookStore) != 0) {
      //copy phonebook in state
      let newPeople = { ...phonebookStore };
      //if the tier has already been created by a previous contact creation
      if (Object.hasOwn(newPeople, event.target.tier.value)) {
        //edit the tier that will be changed
        const newTier = newPeople[event.target.tier.value].concat(newPerson);
        //assemble the new phonebook and update state passed from ../App.jsx
        newPhonebook = {
          ...phonebookStore,
          [event.target.tier.value]: newTier,
        };
      } else {
        //we need to create a new key in the newPhonebook object
        newPhonebook = {
          ...phonebookStore,
          [event.target.tier.value]: [newPerson],
        };
      }

      //dispatch(populatePhonebook(newPhonebook));

      const result = await postContact(newPerson);
      //checkResult to determine if a good/bad notification
      const completed = checkResult(result);
      if (completed) {
        //udpate the store
        updateThePhonebook(result.data);
      }

      //if the contact being added is in a tier that doesn't yet exist
      if (!Object.hasOwn(phonebookStore, event.target.tier.value)) {
        const newTiers = tiersStore.concat(newPerson.tier);
        dispatch(populateTiers(newTiers));
      }
    } else {
      //The user has no contacts
      const createPhonebook = {
        [newPerson.tier]: [newPerson],
      };

      dispatch(populateTiers([newPerson.tier]));
      dispatch(populatePhonebook(createPhonebook));

      const result = await postContact(newPerson);

      //checkResult to determine if a good/bad notification
      const completed = checkResult(result);
      if (completed) {
        //udpate the store
        updateThePhonebook(result.data);
      }
    }

    event.target.contactFirstName.value = "";
    event.target.contactLastName.value = "";
    event.target.contactPhone.value = "";
    event.target.contactEmail.value = "";
    event.target.tier.value = "";
  };

  //render
  return (
    <>
      <form onSubmit={(event) => handleAdd(event)}>
        <h3>Add A New Person</h3>
        First Name: <input name="contactFirstName"></input>
        Last Name: <input name="contactLastName"></input>
        <br />
        Phone: <input name="contactPhone"></input>
        <br />
        Email: <input name="contactEmail"></input>
        <br />
        Tier:
        <input type="radio" id="tier1" name="tier" value="1" required />
        <label htmlFor="tier1">1</label>
        <input type="radio" id="tier2" name="tier" value="2" />
        <label htmlFor="tier2">2</label>
        <input type="radio" id="tier3" name="tier" value="3" />
        <label htmlFor="tier3">3</label>
        <input type="radio" id="tier4" name="tier" value="4" />
        <label htmlFor="tier4">4</label>
        <input type="radio" id="tier5" name="tier" value="5" />
        <label htmlFor="tier5">5</label>
        <button type="submit">Add Person</button>
      </form>
    </>
  );
};

export default NewPerson;
