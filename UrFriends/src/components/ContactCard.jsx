import React from "react";
import { useState } from "react";

function ContactCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  if (isExpanded) {
    return (
      <>
        <div

          className="contact-card-expanded"
          title="Click For [x]'s Details"
        >
          <div className="contact-expanded-name-phone-email">
            <span className="contact-name">
              {props.person.name} ____Phone Number: {props.person.phoneNumber}{" "}
              ____Email:{" "}
            </span>
          </div>
          <br />

          <div className="contact-expanded-recent-convos">
            <ul>
              <h4>Recent Conversations</h4>
              {props.person.lastConvo.map((conversation) => {
                return (
                  <li key={`${conversation.date}+${conversation.topic}`}>
                    {conversation.topic}
                  </li>
                );
              })}
              <br />
              TODO: implement expanding ability. more than 5 conversations, and
              the older ones are hidden. also implement starring convos to
              highlight important things?
            </ul>
          </div>
          <div className="contact-expanded-action-buttons"></div>
          
          <div className="contact-expanded-button-div"><button onClick={(event) => handleExpand(event)}>Collapse</button></div>
        </div>
        
      </>
    );
  }

  if (!isExpanded) {
    return (
      <>
        <div
          onClick={handleExpand}
          className="contact-card"
          title="Click For [x]'s Details"
        >
          <div className="contact-name-and-last-cont-div">
            <span className="contact-name">{props.person.name}</span>
            <span className="last-contact">
              Last Contact: {props.person.lastConvo[0].date}
            </span>
          </div>
          <span className="last-convo-topic">
            Topic: {props.person.lastConvo[0].topic}
          </span>
          <span className="contact-action-btns">
            <button
              className="schedule-btn"
              title="Schedule A Conversation With [x]"
            >
              <i className="fa-regular fa-calendar-days"></i>
            </button>
            <button className="contact-btn" title="Contact [x]">
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
