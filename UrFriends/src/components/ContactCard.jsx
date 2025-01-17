import React from "react";
import { useState } from "react";

function getDateFromDateTime(dateTimeString) {
  // Create a Date object from the string
  const date = new Date(dateTimeString);
  
  // Use toLocaleDateString to get only the date part
  return date.toLocaleDateString();
}


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
        >
          <div className="contact-expanded-name-phone-email">
            <span className="contact-name">
              {props.person.name} ____Phone Number: {props.person.phoneNumber}{" "}
              ____Email:{" "}{props.person.email ? props.person.email : null}
            </span>
          </div>
          <br />

          <div className="contact-expanded-recent-convos">
            <ul>
              <h4>Recent Conversations</h4>
              {props.person.lastConvo[0].date === null ? null : props.person.lastConvo.map((conversation) => {
                return (
                  <li key={`${conversation.date}+${conversation.topic}`}>
                    { props.person.lastConvo[0].date === null ? null: getDateFromDateTime(props.person.lastConvo[0].date)} - {conversation.topic}
                  </li>
                );
              })}
              <br />
              TODO: implement expanding ability. more than 5 conversations, and
              the older ones are hidden. also implement starring convos to
              highlight important things?
            </ul>
          </div>
          <div className="contact-expanded-action-buttons">
            <button>Schedule Conversation with {props.person.name}</button><br/>
            <button>Convo Starters</button><br/>
            <button>We Spoke Today</button><br/>
            <button>Settings for {props.person.name}</button><br/>
          </div>
          
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
         
        >
          <div className="contact-name-and-last-cont-div">
            <span className="contact-name">{props.person.name}</span>
            <span className="last-contact">
              { props.person.lastConvo[0].date === null ? `Have a conversation with ${props.person.name}!` : "Last Contact:" + getDateFromDateTime(props.person.lastConvo[0].date)}
            </span>
          </div>
          <span className="last-convo-topic">
            {props.person.lastConvo[0].date === null ? null : "Topic: " + props.person.lastConvo[0].topic}
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
