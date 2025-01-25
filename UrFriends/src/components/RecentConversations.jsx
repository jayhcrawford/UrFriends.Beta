import React from "react";
import { getDateFromDateTime } from "../functions/getDateFromDateTime";
import { shortenConversation } from "../functions/shortenConversation";
import { useDispatch } from "react-redux";
import { setVisibleExpandedContactModal } from "../features/expandedContactModal";

//Essentially a fancy ul component
const ConversationList = (props) => {
  return (
    <>
      <div className="conversation-list">
        <h4 style={{ textAlign: "center" }}>Recent Conversations</h4>
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
      <div className="conv-btn-container">
        <button
          className="conv-btn"
          style={{}}
          onClick={() => props.handleOpenExpandedContactModal("Conversation")}
        >
          <span className="conv-btn-date-span">
            {props.person.lastConvo[0].date === null
              ? null
              : getDateFromDateTime(props.conversation.date)}
          </span>
          <span className="conv-btn-conv-span">
            - {shortenConversation(props.conversation.topic, 40)}
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
          <div className="more-conv-btn">
            <button onClick={() => handleOpenExpandedContactModal("Expand")}>
              more conversations
            </button>
          </div>
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
