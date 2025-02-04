import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { patchConversation } from "../../../services/contactService";
import {
  hideNotification,
  setNotification,
} from "../../features/notificationSlice";

const AddConversationSelectContact = (props) => {
  const person = useSelector((state) => state.modal.person);
  const loggedIn = useSelector((state) => state.login.user);
  const [spokeFormVisible, setSpokeFormVisible] = useState(true);

  const [conversationDate, setConversationDate] = useState("");

  const dispatch = useDispatch();

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

  //render
  return (
    <>
      Person: <br />
      <input></input>
      <br />
      <div className="add-convo-search-results">
        <button className="ac-sr-button">Search Results</button>
        <button className="ac-sr-button">Search Results</button>
        <button className="ac-sr-button">Search Results</button>
        <button className="ac-sr-button">Search Results</button>
        <button className="ac-sr-button">Search Results</button>
      </div>
      <>
        {" "}
        <form onSubmit={(event) => submitNewConversation(event)}>
          <textarea
            rows="15"
            style={{ width: "100%", resize: "none", whiteSpace: "pre" }}
            name="conversation"
          ></textarea>
          <input
            onChange={(event) => setConversationDate(event.target.value)}
            value={conversationDate}
            type="date"
            name="date"
          ></input>
          <br />
          <button type="submit">Submit</button>
        </form>
      </>
    </>
  );
};

export default AddConversationSelectContact;
