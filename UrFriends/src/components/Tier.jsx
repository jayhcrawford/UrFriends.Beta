import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import ContactCard from "./ContactCard.jsx";
import { setVisible } from '../features/modalSlice.js';

function Tier(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch()

  const handleExpand = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleTierSettings = (event) => {
    event.stopPropagation();
    dispatch(setVisible())
    console.log("open tools");
  };

  if (!isExpanded) {
    return (
      <div
        onClick={(event) => handleExpand(event)}
        className="tier-container"
        title="Click To Expand Tier[x]"
      >
        <span className="expand-collapse-span">
          <button className="expand-collapse-btn">
            <i className="fa fa-caret-square-o-right"></i>
          </button>
        </span>
        <span className="tier-title-span">
          <p>Tier {props.tierName}</p>
        </span>
        <span className="tier-settings-span">
          <button
            onClick={(event) => handleTierSettings(event)}
            className="tier-settings-btn"
            title="Change Tier [x] Settings"
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
        title="Click To Expand Tier[x]"
      >
        <span className="expand-collapse-span">
          <button className="expand-collapse-btn">
            <i className="fa fa-caret-square-o-down"></i>
          </button>
        </span>
        <span className="tier-title-span">
          <p>Tier {props.tierName}</p>
        </span>
        <span className="tier-settings-span">
          <button
            onClick={(event) => handleTierSettings(event)}
            className="tier-settings-btn"
            title="Change Tier [x] Settings"
          >
            <i className="fa-solid fa-gear"></i>
          </button>
        </span>
      </div>
      {props.people[props.tierName].map((person) => {
        return <ContactCard key={person.name} person={person} />;
      })}
    </>
  );
}

export default Tier;
