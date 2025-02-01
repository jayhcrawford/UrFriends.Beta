import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { patchConversation } from "../../../services/contactService";
import {
  hideNotification,
  setNotification,
} from "../../features/notificationSlice";

const ReachOut = (props) => {
  const person = useSelector((state) => state.phonebook.phonebook);
  const loggedIn = useSelector((state) => state.login.user);
  const [spokeFormVisible, setSpokeFormVisible] = useState(false);

  const [conversationDate, setConversationDate] = useState("");

  const dispatch = useDispatch();

  const handleWeSpoke = (event) => {
    setSpokeFormVisible(true);
  };

  const submitNewConversation = (event) => {
    event.preventDefault();

    const date = new Date(event.target.date.value);

    if (isNaN(date)) {
      dispatch(setNotification());
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
      return null;
    }

    var calendarDate = new Date(
      new Date(date).getTime() + 60 * 60 * 1000
    ).toUTCString();

    const topic = event.target.conversation.value;
    let newConversations;
    if (person.lastConvo[0].date === null) {
      newConversations = [
        {
          date: calendarDate,
          topic: topic,
        },
      ];
    } else {
      newConversations = person.lastConvo.concat({
        date: calendarDate,
        topic: topic,
      });
    }

    const personToUpdate = {
      ...person,
      lastConvo: newConversations,
    };

    patchConversation(personToUpdate);

    //reset the state and visibility of the conversation form
    setSpokeFormVisible(false);
    setConversationDate("");
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
          {" "}
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
              style={{ width: "100%", resize: "none", whiteSpace: "pre" }}
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
