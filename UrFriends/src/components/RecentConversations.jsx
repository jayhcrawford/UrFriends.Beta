import React from "react";
import { getDateFromDateTime } from "../functions/getDateFromDateTime";
import { shortenConversation } from "../functions/shortenConversation";
import { useDispatch } from "react-redux";
import { setVisibleExpandedContactModal } from "../features/expandedContactModal";

const RecentConversations = (props) => {
  const dispatch = useDispatch();
  const handleOpenExpandedContactModal = (modalContentType) => {
    dispatch(setVisibleExpandedContactModal({ modalContentType }));
  };

  //If !props.conversationArray, then data is still being fetched, or there is no data.
  //Under default circumstances, if a contact has no conversations, lastConvo[0].date will be null
  if (!props.conversationArray || props.person.lastConvo[0].date === null) {
    return null;
  } else if (props.conversationArray.length > 5) {
    //If the length is greater than 5, return shortened list with expand option
    return (
      <>
        {props.conversationArray
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
          .map((conversation) => {
            return (
              <li key={`${conversation.date}+${conversation.topic}`}>
                <div
                  style={{
                    outline: "1px solid black",
                    padding: ".2em",
                    margin: ".2em",
                    height: "3em",
                  }}
                >
                  <button
                    style={{ width: "100%", height: "100%" }}
                    onClick={() => handleOpenExpandedContactModal("Conversation")}
                  >
                    <span style={{ backgroundColor: "red" }}>
                      {props.person.lastConvo[0].date === null
                        ? null
                        : getDateFromDateTime(conversation.date)}
                    </span>
                    <span style={{ backgroundColor: "green" }}>
                      - {shortenConversation(conversation.topic, 60)}
                    </span>
                  </button>
                </div>
              </li>
            );
          })}
        <div style={{ backgroundColor: "lightblue" }}>
          <button onClick={() => handleOpenExpandedContactModal("Expand")}>
            expand
          </button>
        </div>
      </>
    );
  } else {
    //return the list, no need for shortening
    return props.conversationArray
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((conversation) => {
        return (
          <li key={`${conversation.date}+${conversation.topic}`}>
            <div
              style={{
                outline: "1px solid black",
                padding: ".2em",
                margin: ".2em",
                height: "3em",
              }}
            >
              <button
                style={{ width: "100%", height: "100%" }}
                onClick={() => handleOpenExpandedContactModal("Conversation")}
              >
                <span style={{ backgroundColor: "red" }}>
                  {props.person.lastConvo[0].date === null
                    ? null
                    : getDateFromDateTime(conversation.date)}
                </span>
                <span style={{ backgroundColor: "green" }}>
                  - {shortenConversation(conversation.topic, 60)}
                </span>
              </button>
            </div>
          </li>
        );
      });
  }
};

export default RecentConversations;
