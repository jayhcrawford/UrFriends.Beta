import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../../services/contactService";
import { hideModal } from "../../features/modalSlice";
import {
  hideNotification,
  setNotification,
} from "../../features/notificationSlice";
import { populatePhonebook } from "../../features/phonebookSlice";

const terms = {
  name: {
    first: "Jay",
    last: "Crawford",
  },
  email: "jayhcrawford@gmail.com",
  phonenumber: "310-709-4913",
  workplace: "Barton G",
  hometown: "Knoxville, TN",
  currentAddress: "1325 S Hope St, Los Angeles, CA 90015",
  birthday: "12-14-1993",
  customFields: ["custom1", "custom2", "custom3"],
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

const InputWithEdit = (props) => {
  const [inputVal, setInputVal] = useState(props.initVal);
  const [editInputVal, setEditInputVal] = useState(false);

  const label = props.label;

  return (
    <>
      <div
        style={{
          backgroundColor: "red",
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
          }}
        >
          {editInputVal && (
            <span>
              {label}:
              <input
                value={inputVal}
                onChange={(event) => setInputVal(event.target.value)}
              ></input>
              <button onClick={() => setEditInputVal(!editInputVal)}>
                Save
              </button>
            </span>
          )}
          {!editInputVal && (
            <span>
              {label}: {inputVal}
              <button onClick={() => setEditInputVal(!editInputVal)}>
                Edit
              </button>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

const ContactSettingsForm = () => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: "5px",
          width: "90%",
          border: "1px solid black",
        }}
      >
        <InputWithEdit label="First Name" initVal={terms.name.first} />
        <InputWithEdit label="Last Name" initVal={terms.name.last} />
        <InputWithEdit label="Email" initVal={terms.email} />
        <InputWithEdit label="Phone Number" initVal={terms.phonenumber} />
        <InputWithEdit label="Current Address" initVal={terms.currentAddress} />
        <InputWithEdit label="Hometown" initVal={terms.hometown} />
        <InputWithEdit label="Workplace" initVal={terms.workplace} />
      </div>
      <>
      <h4>Custom Fields</h4>
        {terms.customFields.map((field) => {
          return <InputWithEdit label={field} initVal="something" />;
        })}
      </>
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

  const createNotification = (message, type) => {
    dispatch(setNotification({ message: message, type: type }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

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
      createNotification("There was an error deleting the person", "red");
    } else {
      dispatch(hideModal());
      createNotification("Success deleting", "green");
      removePerson();
    }
  };

  if (person) {
    console.log(person);
  }

  return (
    <div>
      <h2>Settings for {person.name.first}</h2>

      {/* Entire form disappears if the delete button is clicked, and a warning is shown */}
      {!areYouSure && (
        <div>
          <div>
            <ContactSettingsForm />
          </div>
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
