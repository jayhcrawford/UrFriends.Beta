import React from "react";
import { getDateFromDateTime } from "../functions/getDateFromDateTime";
import { shortenConversation } from "../functions/shortenConversation";
import { useDispatch } from "react-redux";
import { setVisibleExpandedContactModal } from "../features/expandedContactModal";

//Essentially a fancy ul component
const ConversationList = (props) => {
  return (
    <>
      <div style={{ backgroundColor: "lightblue" }}>
        <h4>Recent Conversations</h4>
        <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
          {props.children}
        </ul>
      </div>
    </>
  );
};

//Essentially a fancy li component
const ConversationButton = (props) => {
  return (
    <li>
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
          onClick={() => props.handleOpenExpandedContactModal("Conversation")}
        >
          <span style={{ backgroundColor: "red" }}>
            {props.person.lastConvo[0].date === null
              ? null
              : getDateFromDateTime(props.conversation.date)}
          </span>
          <span style={{ backgroundColor: "green" }}>
            - {shortenConversation(props.conversation.topic, 60)}
          </span>
        </button>
      </div>
    </li>
  );
};

//Renders ul with li's but conditionally. If there are many conversations, an
//abbreviated list and an expand button are rendered.
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
    //If the length is greater than 5, return abbreviated list with option to expand
    return (
      <>
        <ConversationList>
          {" "}
          {props.conversationArray
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((conversation) => {
              return (
                <ConversationButton
                  key={`${conversation.date}+${conversation.topic}`}
                  conversation={conversation}
                  person={props.person}
                  handleOpenExpandedContactModal={
                    handleOpenExpandedContactModal
                  }
                />
              );
            })}
          <button onClick={() => handleOpenExpandedContactModal("Expand")}>
            expand
          </button>
        </ConversationList>
      </>
    );
  } else {
    //return the list, no need for abbreviating the conversationArray
    return (
      <>
        <ConversationList>
          {props.conversationArray
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((conversation) => {
              return (
                <ConversationButton
                  key={`${conversation.date}+${conversation.topic}`}
                  conversation={conversation}
                  person={props.person}
                  handleOpenExpandedContactModal={
                    handleOpenExpandedContactModal
                  }
                />
              );
            })}
        </ConversationList>
      </>
    );
  }
};

export default RecentConversations;
