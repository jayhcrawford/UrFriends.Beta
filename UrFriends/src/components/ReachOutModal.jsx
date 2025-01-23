import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPerson,
  setHideReachOutModal,
} from "../features/reachOutModalSlice";

import { patchConversation } from "../../services/contactService";

const ReachOutModal = (props) => {
  const modalVisible = useSelector((state) => state.reachOutModal.visible);
  const person = useSelector((state) => state.reachOutModal.person);
  const loggedIn = useSelector((state) => state.login.user);
  const [spokeFormVisible, setSpokeFormVisible] = useState(false);

  const [conversationDate, setConversationDate] = useState("");

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setHideReachOutModal());
    dispatch(resetPerson());
    setSpokeFormVisible(false);
  };

  const handleWeSpoke = (event) => {
    setSpokeFormVisible(true);
  };

  const submitNewConversation = (event) => {
    event.preventDefault();
    const date = new Date(event.target.date.value);

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
  if (!modalVisible) {
    return null;
  }
  return (
    <>
      <div className="modal-base-transparency">
        <div className="modal-box" style={{ width: "800px" }}>
          <button onClick={handleCloseModal}>Close</button>
          <h3>Reach Out to {person.name.first}</h3>

          {!spokeFormVisible && (
            <button onClick={handleWeSpoke}>
              I had a conversation with {person.name.first}
            </button>
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
                <input name="conversation"></input>
                <button type="submit">Submit</button>
              </form>
              <button onClick={handleNevermind}>Nevermind</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReachOutModal;
