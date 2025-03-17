import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUnsavedChanges,
  hideModal,
  setUnsavedChanges,
} from "../../features/modalSlice";
import { updateConversation } from "../../../services/contactService";
import {
  hideNotification,
  setNotification,
} from "../../features/notificationSlice";
import { populatePhonebook } from "../../features/phonebookSlice";

const ConversationDetails = (props) => {
  const unsavedChanges = useSelector((state) => state.modal.unsavedChanges);
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);

  const person = useSelector((state) => state.modal.person);

  const [unsavedConversation, setUnsavedConversation] = useState(
    props.conversation.topic
  );
  const [editConvo, setEditConvo] = useState(false);
  const [editDate, setEditDate] = useState(false);

  const dispatch = useDispatch();

  //dispatch notification and reset
  const createNotification = (message, type) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  //show edit box to change convo
  const handleToggleEditConvo = () => {
    setEditConvo(!editConvo);
  };

  //if changes are made to the coversation, they are saved locally;
  //if changes are made, a dispatch is made to set a bool in the store to indicate unsaved changes, preventing premature modal closure
  const changeConversation = (event) => {
    //if unsaved changes exist
    if (event.target.value == props.conversation.topic) {
      //this condition is met if the changes to the conversation are the same as the original conversation; clear bool record of unsaved changes
      dispatch(clearUnsavedChanges());
    } else {
      dispatch(setUnsavedChanges());
    }
    //unsaved changes are stored in this component in state.
    setUnsavedConversation(event.target.value);
  };

  //cancel changing the conversation, throw away changes, reset state.
  const cancelChangeConversaton = () => {
    setEditConvo(!editConvo);
    setUnsavedConversation(props.conversation.topic);
    dispatch(clearUnsavedChanges());
  };

  //updates redux store so that new, updated conversations are shown
  const updateThePhonebookStore = (update) => {
    const newTier = [];

    //for each contact in the relevant tier
    phonebookStore[person.tier].forEach((entry) => {
      if (entry.id == person.id) {
        let personsConvos = [];

        //lastConvo is a nested array, iterate through it and find the conversation object to replace
        person.lastConvo.forEach((convo) => {
          if (convo._id == update._id) {
            const updatedConvo = {
              _id: update._id,
              topic: update.topic,
              date: update.date,
            };
            personsConvos.push(updatedConvo);
          } else {
            personsConvos.push(convo);
          }
        });

        const updatedPerson = {
          ...entry,
          lastConvo: personsConvos,
        };
        //either the person has changes to lastConvo...
        newTier.push(updatedPerson);
      } else {
        //or the person does not have changes
        newTier.push(entry);
      }
    });

    const newPhonebook = {
      ...phonebookStore,
      [person.tier]: newTier,
    };
    //change the store
    dispatch(populatePhonebook(newPhonebook));
  };

  //sends update to server, notifies of success/failure
  const saveConversation = async (convo) => {
    //build the update object
    const updatedConversation = {
      person: person.id,
      ...props.conversation,
      topic: unsavedConversation,
    };
    //send the update obeject
    const result = await updateConversation(updatedConversation);
    //if not success, send error
    if (result.status != 200) {
      createNotification("There was an error saving the conversation", "red");
    } else {
      //send success notification
      //clear unsaved changes bool in state;
      createNotification("The conversation was successfully updated", "green");
      dispatch(clearUnsavedChanges());
      dispatch(hideModal());
      updateThePhonebookStore(updatedConversation);
    }
  };

  return (
    <div>
      Conversation Details Component
      {unsavedChanges && <p>There are unsaved Changes</p>}
      <br />
      {editConvo && (
        <textarea
          style={{ width: "100%", resize: "none", overflow: "hidden" }}
          onChange={(event) => {
            changeConversation(event);
          }}
          value={unsavedConversation}
        ></textarea>
      )}
      <div className="conv-details-conv-render">{props.conversation.topic}</div>
      <div className="conv-details-conv-render">{props.conversation.date}</div>
      {!editConvo && (
        <button onClick={handleToggleEditConvo}>Edit Conversation</button>
      )}
      {editConvo && (
        <>
          <button onClick={saveConversation}>Save</button>
          <br />
          <button onClick={cancelChangeConversaton}>Cancel</button>
        </>
      )}
      <br />
      <button>Change Date</button>
      <br />
      <br />
    </div>
  );
};

export default ConversationDetails;
