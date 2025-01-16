import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHideNewPersonModal } from "../features/newPersonModalSlice.js";

const newPersonModal = (props) => {
  const modalVisible = useSelector((state) => state.newPersonModal.visible);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setHideNewPersonModal());
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const newPerson = {
      tier: event.target.tier.value,
      name: event.target.contactName.value,
      phoneNumber: event.target.contactPhone.value,
      email: event.target.contactEmail.value,
      lastConvo: [{date: null}]
    };

    //copy phonebook in state
    let newPeople = { ...props.people };
    //edit the tier that will be changed
    const newTier = newPeople[event.target.tier.value].concat(newPerson);
    //assemble the new phonebook and update state passed from ../App.jsx
    const newPhonebook = {
      ...props.people,
      [event.target.tier.value]: newTier
    }
    props.setPhonebook(newPhonebook)

    event.target.contactName.value = "";
    event.target.contactPhone.value = "";
    event.target.contactEmail.value = "";
    event.target.tier.value = "";

    //TODO: add user feedback for success
    dispatch(setHideNewPersonModal());
  };

  //render
  if (!modalVisible) {
    return null;
  }
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(200, 0, 0, .2)",
          display: "flex",
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0%",
          left: "0%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            display: "inline-block",
            padding: "2em",
            backgroundColor: "white",
            height: "300px",
            margin: "10em",
          }}
        >
          <form onSubmit={(event) => handleAdd(event)}>
            <button onClick={handleClose}>Close</button>
            <h3>Add A New Person</h3>
            Name: <input name="contactName"></input>
            <br />
            Phone: <input name="contactPhone"></input>
            <br />
            Email: <input name="contactEmail"></input>
            <br />
            Tier:
            <input
              type="radio"
              id="tier1"
              name="tier"
              value="1"
              required
            />
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
        </div>
      </div>
    </>
  );
};

export default newPersonModal;
