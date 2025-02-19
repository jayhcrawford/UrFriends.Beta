import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../../services/contactService";
import { hideModal } from "../../features/modalSlice";
import {
  hideNotification,
  setNotification,
} from "../../features/notificationSlice";
import { populatePhonebook } from "../../features/phonebookSlice";
import { sendNotification } from "../../functions/sendNotification";

const ModifyDataButton = (props) => {
  return (
    <button onClick={() => props.edit(props.keyToEdit)}>{props.text}</button>
  );
};

//an input element that modifies state stored higher in the form
const ChangeableInput = (props) => {
  return (
    <>
      {props.editBool && (
        <span>
          {props.label}{" "}
          <input
            value={props.valueProp ? props.valueProp : null}
            onChange={(event) =>
              props.changePerson(props.personValue, event.target.value)
            }
          ></input>
          <ModifyDataButton
            text="Save"
            edit={props.setEditMode}
            keyToEdit={props.personValue}
          />
        </span>
      )}
      {!props.editBool && (
        <span>
          {props.label} {props.valueProp}
          <ModifyDataButton
            text="Edit"
            edit={props.setEditMode}
            keyToEdit={props.personValue}
          />
        </span>
      )}
    </>
  );
};

const ContactSettingsForm = () => {
  const personStore = useSelector((state) => state.modal.person);
  
  const [person, setPerson] = useState({
    firstName: personStore.name.first,
    lastName: "",
  });
  const [editPerson, setEditPerson] = useState({
    firstName: false,
    lastName: false,
  });

  //changes whether or not a field is being edited. If a field in editPerson is true, edit is enabled.
  const setEditMode = (keyToChange) => {
    const newEditPersonObj = {
      ...editPerson,
      [keyToChange]: !editPerson[keyToChange],
    };

    setEditPerson(newEditPersonObj);
  };

  //changes the object that stores the actual Contact values
  const changePerson = (keyToChange, change) => {
    const newPerson = {
      ...person,
      [keyToChange]: change,
    };
    setPerson(newPerson);
  };

  const gridStyle = {
    display: "grid",
    gridTemplateRows: "repeat(6, 1fr)", // 6 rows
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
    gap: "10px", // optional gap between items
  };

  return (
    <div style={gridStyle}>
      <div>
        <ChangeableInput
          label={"First Name"}
          valueProp={person.firstName}
          editBool={editPerson.firstName}
          personValue={"firstName"}
          editPerson={editPerson}
          person={person}
          changePerson={changePerson}
          setEditMode={setEditMode}
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      
    </div>
  );
};

//static; renders delete and prompts message
const DeleteThisContact = (props) => {
  return (
    <>
      {!props.areYouSure && (
        <button onClick={props.handleAreYouSure}>delete this contact</button>
      )}
      {props.areYouSure && (
        <div>
          <div style={{ backgroundColor: "red", color: "white" }}>
            Everything related to this contact (including conversations) will be
            deleted, and it is irreversible. Are you sure?
          </div>
          <button
            style={{
              margin: "1em",
              border: "3px solid red",
              cursor: "pointer",
            }}
            onClick={props.handleDelete}
          >
            Yes, Delete Everything
          </button>
          <br />
          <button
            style={{ margin: "1em" }}
            onClick={() => props.setAreYouSure(false)}
          >
            Nevermind
          </button>
        </div>
      )}
    </>
  );
};

//export
const ContactSettings = () => {
  const person = useSelector((state) => state.modal.person);
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);

  //for delete contact
  const [areYouSure, setAreYouSure] = useState(false);

  const dispatch = useDispatch();

  //updates the store to disclude this person; called in handleDelete
  const removePerson = () => {
    let result = [];
    for (let i = 0; i < phonebookStore[person.tier].length; i++) {
      if (phonebookStore[person.tier][i].id == person.id) {
        continue;
      } else {
        result.push(phonebookStore[person.tier][i]);
      }
    }
    const newPhonebook = {
      ...phonebookStore,
      [person.tier]: result,
    };
    dispatch(populatePhonebook(newPhonebook));
  };

  //state changes to confirm that user wants to permanently delete this contact
  const handleAreYouSure = () => {
    setAreYouSure(true);
  };

  //called after areYouSure confirmed
  const handleDelete = async () => {
    const result = await deleteContact(person.id);
    if (result.status != 204) {
      sendNotification(dispatch, {
        message: "There was an error deleting the person",
        type: "red",
      });
    } else {
      dispatch(hideModal());
      sendNotification(dispatch, {
        message: "Success deleting",
        type: "green",
      });
      removePerson();
    }
  };

  return (
    <div>
      <h2>Settings for {person.name.first}</h2>

      <ContactSettingsForm />

      {/* Entire form disappears if the delete button is clicked, and a warning is shown */}
      {!areYouSure && (
        <div>
          <div></div>
        </div>
      )}

      {/* Contains delete button and warning message */}
      <DeleteThisContact
        handleAreYouSure={handleAreYouSure}
        setAreYouSure={setAreYouSure}
        areYouSure={areYouSure}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ContactSettings;
