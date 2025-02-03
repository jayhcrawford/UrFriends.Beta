import React, { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LinkBar from "./LinkBar";

const ModifyDataButton = (props) => {
  return (
    <button onClick={() => props.edit(props.keyToEdit)}>{props.text}</button>
  );
};

const AddPersonComponent = () => {
  const [person, setPerson] = useState({
    firstName: "Jay",
    lastName: "Crawford",
  });
  const [editPerson, setEditPerson] = useState({
    firstName: false,
    lastName: false,
  });

  //changes the object that stores the actual Contact values
  const changePerson = (keyToChange, change) => {
    const newPerson = {
      ...person,
      [keyToChange]: change,
    };
    setPerson(newPerson);
  };

  //changes whether or not a field is being edited. If a field in editPerson is true, edit is enabled.
  const setEditMode = (keyToChange) => {
    const newEditPersonObj = {
      ...editPerson,
      [keyToChange]: !editPerson[keyToChange],
    };

    setEditPerson(newEditPersonObj);
  };

  return (
    <>
      <div
        style={{
          width: "105%",
          backgroundColor: "red",
          height: "5em",
          marginLeft: "-.5em",
          marginRight: "-.5em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "4em",
            backgroundColor: "white",
            width: "70%",
            border: "1px solid blue",
          }}
        >
          {editPerson.firstName && (
            <span>
              First Name:{" "}
              <input
                value={person.firstName ? person.firstName : null}
                onChange={(event) =>
                  changePerson("firstName", event.target.value)
                }
              ></input>
              <ModifyDataButton
                text="Save"
                edit={setEditMode}
                keyToEdit="firstName"
              />
            </span>
          )}
          {!editPerson.firstName && (
            <span>
              First Name: {person.firstName}
              <ModifyDataButton
                text="Edit"
                edit={setEditMode}
                keyToEdit="firstName"
              />
            </span>
          )}
          <br />
          {editPerson.lastName && (
            <span>
              Last Name:{" "}
              <input
                value={person.lastName ? person.lastName : null}
                onChange={(event) =>
                  changePerson("lastName", event.target.value)
                }
              ></input>
              <ModifyDataButton
                text="Save"
                edit={setEditMode}
                keyToEdit="lastName"
              />
            </span>
          )}
          {!editPerson.lastName && (
            <span>
              Last Name: {person.lastName}
              <ModifyDataButton
                text="Edit"
                edit={setEditMode}
                keyToEdit="lastName"
              />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

const Empty = (props) => {
  if (!props.visible) {
    return null;
  }

  if (props.visible) {
    return (
      <div
        style={{
          width: "105%",
          backgroundColor: "red",
          height: "5em",
          marginLeft: "-.5em",
          marginRight: "-.5em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "4em",
            backgroundColor: "white",
            width: "70%",
            border: "1px solid blue",
          }}
        ></div>
      </div>
    );
  }
};

const BulkAdd = () => {
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const tiersStore = useSelector((state) => state.phonebook.tiers);

  const [addNewPerson, setAddNewPerson] = useState(false)

  const handleOpenInputPerson = () => {
    setAddNewPerson(!addNewPerson)
  }

  return (
    <>
      <LinkBar page="bulk-add" />
      <div>{tiersStore}</div>
      <div
        style={{
          display: "flex",

          alignItems: "start",
          height: "400px",
          flexDirection: "column",
          backgroundColor: "green",
        }}
      >
        <AddPersonComponent />
        <AddPersonComponent />

        <AddPersonComponent />
        <Empty visible={addNewPerson}/>
      </div>
      <button onClick={handleOpenInputPerson}>+</button>
      <button>Save to Phonebook</button>
    </>
  );
};

export default BulkAdd;
