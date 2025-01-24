import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPerson,
  setVisibleReachOutModal,
} from "../features/reachOutModalSlice";
import { getDateFromDateTime } from "../functions/getDateFromDateTime";
import RecentConversations from "./RecentConversations";

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
        <p style={{ color: "red" }}>X</p>
      </>
    );
  }

  //if latest conversation is within the tier's timeframe
  if (date1 < date2) {
    return (
      <>
        <p style={{ color: "green" }}>O</p>
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

  const handleExpand = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClickReachOut = (event) => {
    event.stopPropagation();
    dispatch(setVisibleReachOutModal());
    dispatch(setPerson(props.person));
  };

  if (isExpanded) {
    return (
      <>
        <div className="contact-card-expanded">
          <div className="contact-expanded-name-phone-email">
            <span className="contact-name">
              {props.person.name.first + " " + props.person.name.last} ____Phone Number: {props.person.phoneNumber}{" "}
              ____Email: {props.person.email ? props.person.email : null}
            </span>
          </div>
          <br />

          <div className="contact-expanded-recent-convos">
            <ul>
              <h4>Recent Conversations</h4>
              <RecentConversations person={props.person} conversationArray={conversationArray}/>
              <br />
              TODO: implement expanding ability. more than 5 conversations, and
              the older ones are hidden. also implement starring convos to
              highlight important things?
            </ul>
          </div>
          <div className="contact-expanded-action-buttons">
            <button>Schedule Conversation with {props.person.name.first + " " + props.person.name.last}</button>
            <br />
            <button>Convo Starters</button>
            <br />
            <button>We Spoke Today</button>
            <br />
            <button>Settings for {props.person.name.first + " " + props.person.name.last}</button>
            <br />
          </div>

          <div className="contact-expanded-button-div">
            <button onClick={(event) => handleExpand(event)}>Collapse</button>
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
            <span className="contact-name">{props.person.name.first + " " + props.person.name.last}</span>
            <span className="last-contact">
              {props.person.lastConvo[0].date === null
                ? `Have a conversation with ${props.person.name.first + " " + props.person.name.last}!`
                : "Last Contact:" +
                  getDateFromDateTime(mostRecentConversation.date)}
            </span>
          </div>
          <span className="last-convo-topic">
            {props.person.lastConvo[0].date === null
              ? null
              : "Topic: " + mostRecentConversation.topic}
          </span>
          <span className="contact-action-btns">
            <button
              className="schedule-btn"
              title="Schedule A Conversation With [x]"
            >
              <i className="fa-regular fa-calendar-days"></i>
            </button>
            <button
              onClick={(event) => handleClickReachOut(event)}
              className="contact-btn"
              title="Contact [x]"
            >
              <i className="fa-regular fa-message"></i>
              <i className="fa-solid fa-phone"></i>
            </button>
          </span>
        </div>
      </>
    );
  }
}

export default ContactCard;
