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
