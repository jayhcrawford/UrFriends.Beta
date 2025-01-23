import { useDispatch } from "react-redux";
import { useState } from "react";
import ContactCard from "./ContactCard.jsx";
import { setVisibleTierSettingsModal } from "../features/tierSettingsSlice.js";

function Tier(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowOfLastContact, setWindowOfLastContact] = useState(null);

  const dispatch = useDispatch();

  const returnPastDate = (days) => {
    var pastDate = new Date(
      new Date().getTime() - 24 * days * 60 * 60 * 1000
    ).toLocaleDateString();
    return pastDate;
  };

  function interpolateTierTimePeriod(timePeriod) {
    switch (timePeriod) {
      case "1d":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(1));
        }
        return "1 Day";
      case "3d":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(3));
        }
        return "3 Days";
      case "1w":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(7));
        }
        return "1 Week";
      case "2w":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(14));
        }
        return "2 Weeks";
      case "3w":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(21));
        }
        return "3 Weeks";
      case "1m":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(30));
        }
        return "1 Month";
      case "2m":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(61));
        }
        return "2 Months";
      case "3m":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(90));
        }
        return "3 Months";
      case "4m":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(120));
        }
        return "4 Months";
      case "5m":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(153));
        }
        return "5 Months";
      case "6m":
        if (windowOfLastContact === null) {
          setWindowOfLastContact(returnPastDate(180));
        }
        return "6 Months";
      default:
        return "No Date";
    }
  }

  const handleExpand = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleTierSettings = (event) => {
    event.stopPropagation();
    dispatch(setVisibleTierSettingsModal());
  };

  if (!isExpanded) {
    return (
      <div
        onClick={(event) => handleExpand(event)}
        className="tier-container"
        title={`Click to Expand Tier ${props.tierName}`}
      >
        <span className="expand-collapse-span">
          <div className="expand-collapse-div">
            <i className="fa fa-caret-square-o-right"></i>
          </div>
        </span>
        <span className="tier-title-span">
          <p>
            Tier {props.tierName} -{" "}
            {props.settings
              ? interpolateTierTimePeriod(props.settings[props.tierName])
              : null}
          </p>
          <p style={{ fontSize: "12px" }}>
            Contacted since: {windowOfLastContact}
          </p>
        </span>
        <span className="tier-settings-span">
          <button
            onClick={(event) => handleTierSettings(event)}
            className="tier-settings-btn"
            title={`Change Tier ${props.tierName} Settings`}
          >
            <i className="fa-solid fa-gear"></i>
          </button>
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={handleExpand}
        className="tier-container"
        title={`Click to Expand Tier ${props.tierName}`}
      >
        <span className="expand-collapse-span">
          <div className="expand-collapse-div">
            <i className="fa fa-caret-square-o-down"></i>
          </div>
        </span>
        <span className="tier-title-span">
          <p>
            Tier {props.tierName} -{" "}
            {interpolateTierTimePeriod(props.settings[props.tierName])}
          </p>
          <p style={{ fontSize: "12px" }}>
            Contacted since: {windowOfLastContact}
          </p>
        </span>
        <span className="tier-settings-span">
          <button
            onClick={(event) => handleTierSettings(event)}
            className="tier-settings-btn"
            title={`Change Tier ${props.tierName} Settings`}
          >
            <i className="fa-solid fa-gear"></i>
          </button>
        </span>
      </div>
      {props.people[props.tierName].map((person) => {
        return (
          <ContactCard
            windowOfLastContact={windowOfLastContact}
            key={person.name}
            person={person}
          />
        );
      })}
    </>
  );
}

export default Tier;
