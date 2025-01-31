import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPerson,
  setVisibleReachOutModal,
} from "../features/reachOutModalSlice";
import { getDateFromDateTime } from "../functions/getDateFromDateTime";
import RecentConversations from "./RecentConversations";
import { setVisibleExpandedContactModal } from "../features/expandedContactModal";

//static
const ActionButton = (props) => {
  return (
    <>
      <button
        onClick={(event) =>
          props.handleExpandedContactModal(event, {
            modalContentType: props.message,
            person: props.person,
          })
        }
        className="action-button"
      >
        <div className="action-button-graphic"></div>
        <span className="action-button-text">{props.children}</span>
      </button>
    </>
  );
};

//static; shows if user has reached out to contact within Tier's timeframe
const ContactStatusIndicator = (props) => {
  const date1 = new Date(props.windowOfLastContact);
  const date2 = new Date(props.lastContact);

  //if contact has no conversations, or their latest conversation
  //is outside of the tier's timeframe
  if (
    props.windowOfLastContact === null ||
    props.lastContact === null ||
    date1 > date2
  ) {
    return (
      <>
        <p style={{ color: "red" }}>
          <i className="fa-solid fa-xmark"></i>
        </p>
      </>
    );
  }

  //if latest conversation is within the tier's timeframe
  if (date1 < date2) {
    return (
      <>
        <p style={{ color: "green" }}>
          <i className="fa-solid fa-circle-check"></i>
        </p>
      </>
    );
  }
};

//export; displays contact's info, conversations, and action buttons
function ContactCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  let conversationArray = [];
  if (!props.person) {
    conversationArray = null;
  } else {
    conversationArray = [...props.person.lastConvo];
  }

  //sort the conversations coming from Mongo to guaruntee that they will be in descending order
  let mostRecentConversation = { date: null };
  let sortedConversations;
  if (props.person.lastConvo[0].date === null) {
    mostRecentConversation = { date: null };
  } else {
    let needsToSort = [...props.person.lastConvo];
    sortedConversations = needsToSort.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    mostRecentConversation = {
      date: sortedConversations[0].date,
      topic: sortedConversations[0].topic,
    };
  }

  //expands ContactCard.jsx
  const handleExpand = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  //opens modal for the various components within expanded ContactCard.jsx
  const handleExpandedContactModal = (event, payload) => {
    event.stopPropagation();
    dispatch(setVisibleExpandedContactModal(payload));
  };

  if (isExpanded) {
    return (
      <>
        <div className="contact-card-expanded">
          <div className="contact-expanded-name-phone-email">
            <div className="ce-name">
              {props.person.name.first + " " + props.person.name.last}
            </div>
            <div className="ce-number">
              Phone Number: {props.person.phoneNumber}
            </div>
            <div className="ce-email">
              Email: {props.person.email ? props.person.email : null}
            </div>
          </div>
          <br />

          <div className="contact-expanded-recent-convos">
            <RecentConversations
              person={props.person}
              conversationArray={conversationArray}
            />
          </div>
          <div className="contact-expanded-action-buttons">
            <div className="act-btn-1">
              <ActionButton
                handleExpandedContactModal={handleExpandedContactModal}
                message={"we-spoke"}
                person={props.person}
              >
                We Spoke
              </ActionButton>
            </div>
            <br />
            <div className="act-btn-2">
              <ActionButton
                handleExpandedContactModal={handleExpandedContactModal}
                message={"convo-starters"}
                person={props.person}
              >
                Convo Starters
              </ActionButton>
            </div>
            <br />
            <div className="act-btn-3">
              <ActionButton
                handleExpandedContactModal={handleExpandedContactModal}
                message={`schedule-conv-w-${props.person.name.first}`}
                person={props.person}
              >
                Schedule Convo
              </ActionButton>
            </div>
            <br />
            <div className="act-btn-4">
              <ActionButton
                handleExpandedContactModal={handleExpandedContactModal}
                message={`settings-${props.person.name.first}`}
                person={props.person}
              >
                {props.person.name.first}'s Settings
              </ActionButton>
            </div>

            <br />
          </div>

          <div className="contact-expanded-button-div">
            <button
              className="collapse-ct-card"
              onClick={(event) => handleExpand(event)}
            >
              Collapse
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!isExpanded) {
    return (
      <>
        <div onClick={handleExpand} className="contact-card">
          <div className="recent-contact-status-div">
            <ContactStatusIndicator
              windowOfLastContact={props.windowOfLastContact}
              lastContact={mostRecentConversation.date}
              checked={true}
            />
          </div>
          <div className="contact-name-and-last-cont-div">
            <span className="contact-name">
              {props.person.name.first + " " + props.person.name.last}
            </span>
            <span className="last-contact">
              {props.person.lastConvo[0].date === null
                ? `Have a conversation with ${
                    props.person.name.first + " " + props.person.name.last
                  }!`
                : "Last Contact:" +
                  getDateFromDateTime(mostRecentConversation.date)}
            </span>
          </div>
          <span className="last-convo-topic">
            {props.person.lastConvo[0].date === null
              ? null
              : "Topic: " + mostRecentConversation.topic}
          </span>
          <div className="contact-action-btns">
            <button
              onClick={(event) =>
                handleExpandedContactModal(event, {
                  modalContentType: "Schedule",
                  person: props.person,
                })
              }
              className="schedule-btn"
              title="Schedule A Conversation With [x]"
            >
              <i className="fa-regular fa-calendar-days"></i>
            </button>
            <button
              onClick={(event) =>
                handleExpandedContactModal(event, {
                  modalContentType: "Reach Out",
                  person: props.person,
                })
              }
              className="contact-btn"
              title="Contact [x]"
            >
              <i className="fa-regular fa-message"></i>
              <i className="fa-solid fa-phone"></i>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ContactCard;
