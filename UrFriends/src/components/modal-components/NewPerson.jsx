import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import { postContact } from "../../../services/contactService.js";

const NewPersonModal = (props) => {
  const loggedIn = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const handleAdd = (event) => {
    event.preventDefault();

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

    if (Object.keys(props.people) != 0) {
      //copy phonebook in state
      let newPeople = { ...props.people };
      //if the tier has already been created by a previous contact creation
      if (Object.hasOwn(newPeople, event.target.tier.value)) {
        //edit the tier that will be changed
        const newTier = newPeople[event.target.tier.value].concat(newPerson);
        //assemble the new phonebook and update state passed from ../App.jsx
        newPhonebook = {
          ...props.people,
          [event.target.tier.value]: newTier,
        };
      } else {
        //we need to create a new key in the newPhonebook object
        newPhonebook = {
          ...props.people,
          [event.target.tier.value]: [newPerson],
        };
      }

      props.setPhonebook(newPhonebook);
      postContact(newPerson);
      //if the contact being added is in a tier that doesn't yet exist
      if (!Object.hasOwn(props.people, event.target.tier.value)) {
        const newTiers = props.tiers.concat(newPerson.tier);
        props.setTiers(newTiers);
      }
    } else {
      //The user has no contacts
      const createPhonebook = {
        [newPerson.tier]: [newPerson],
      };
      props.setTiers([newPerson.tier]);
      props.setPhonebook(createPhonebook);
      postContact(newPerson);
    }

    event.target.contactFirstName.value = "";
    event.target.contactLastName.value = "";
    event.target.contactPhone.value = "";
    event.target.contactEmail.value = "";
    event.target.tier.value = "";

    //TODO: add feedback for success

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

export default NewPersonModal;
