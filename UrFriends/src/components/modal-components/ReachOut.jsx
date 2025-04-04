import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { patchConversation } from "../../../services/contactService";
import { populatePhonebook } from "../../features/phonebookSlice";
import { hideModal } from "../../features/modalSlice";
import { sendNotification } from "../../functions/sendNotification";



const ReachOut = () => {
  const person = useSelector((state) => state.modal.person);
  const loggedIn = useSelector((state) => state.login.user);
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);

  const [spokeFormVisible, setSpokeFormVisible] = useState(false);

  const [conversationDate, setConversationDate] = useState("");

  const dispatch = useDispatch();

  //updates redux store so that new, updated conversations are shown
  const updateThePhonebookStore = (update) => {
    //the update object has the new conversation appended to it's lastConvo array
    const newTier = [];

    //for each contact in the relevant tier
    phonebookStore[person.tier].forEach((entry) => {
      if (entry.id == person.id) {
        //either the person has changes to lastConvo...
        newTier.push(update);
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

  const handleWeSpoke = (event) => {
    setSpokeFormVisible(true);
  };

  const submitNewConversation = async (event) => {
    event.preventDefault();

    const date = new Date(event.target.date.value);
    //if this is an invalid date, then generate an error
    if (isNaN(date)) {
      sendNotification(dispatch, {message: "the date is invalid", type: "red"})
    return null;
    }

    //converts date to UTC String
    //TODO: fix this bug
    var calendarDate = new Date(
      new Date(date).getTime() + 60 * 60 * 1000
    ).toUTCString();

    const topic = event.target.conversation.value;
    let newConversations;
    if (person.lastConvo[0].date === null) {
      //if the person has no conversations, the default is an empty object.
      newConversations = [
        {
          date: calendarDate,
          topic: topic,
        },
      ];
    } else {
      //if the person has conversations, then simply concat the latest
      newConversations = person.lastConvo.concat({
        date: calendarDate,
        topic: topic,
      });
    }

    const personToUpdate = {
      ...person,
      lastConvo: newConversations,
    };

    try {
      const result = await patchConversation(personToUpdate);

      const newConv = {
        date: calendarDate,
        topic: topic,
      };

      if (result.status == 200) {
        if (result.data.lastConvo[0].topic == null) {
          result.data.lastConvo = [newConv];
          updateThePhonebookStore(result.data);
        } else {
          result.data.lastConvo.push(newConv);
          updateThePhonebookStore(result.data);
        }
        //reset the state and visibility of the conversation form
        setSpokeFormVisible(false);
        setConversationDate("");
        dispatch(hideModal());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNevermind = () => {
    setSpokeFormVisible(false);
    setConversationDate("");
  };

  //render

  return (
    <>
      {!spokeFormVisible && (
        <button onClick={handleWeSpoke}>I had a conversation with</button>
      )}
      {spokeFormVisible && (
        <>
          <form onSubmit={(event) => submitNewConversation(event)}>
            <input
              onChange={(event) => setConversationDate(event.target.value)}
              value={conversationDate}
              type="date"
              name="date"
            ></input>
            <br />
            <textarea
              rows="15"
              style={{width: "100%", resize: "none", overflow: "hidden"}}
              name="conversation"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
          <button onClick={handleNevermind}>Nevermind</button>
        </>
      )}
    </>
  );
};

export default ReachOut;
