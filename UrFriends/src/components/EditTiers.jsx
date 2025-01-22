import React, { useState } from "react";
import { Link } from "react-router";
import { patchSettings } from "../../services/settingService";
import { patchTiers } from "../../services/contactService";

//static
const timeFrameOptions = [
  "1d",
  "3d",
  "1w",
  "2w",
  "3w",
  "1m",
  "2m",
  "3m",
  "4m",
  "5m",
  "6m",
];

//static
const TierSelector = (props) => {
  if (!props.tiers) {
    return null;
  }

  const handleChange = (newTier, oldTier) => {
    props.handleChangeTier(props.name, newTier, oldTier);
  };

  return (
    <>
      <form>
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            display: "flex",
          }}
        >
          {props.tiers.map((tier) => {
            const inputKey = `${tier}-${props.name}`;
            //If the tier is the person's tier, set it to be checked by default
            if (props.tier == tier) {
              return (
                <li style={{ marginRight: "10px" }} key={inputKey}>
                  <input
                    name="selectTier"
                    defaultChecked
                    value={tier}
                    type="radio"
                    onChange={() => handleChange(tier, props.tier)}
                  ></input>
                  <label htmlFor={tier}>{tier}</label>
                </li>
              );
            } else {
              //It's not checked by default
              return (
                <li style={{ marginRight: "10px" }} key={inputKey}>
                  <input
                    name="selectTier"
                    value={tier}
                    type="radio"
                    onChange={() => handleChange(tier, props.tier)}
                  ></input>
                  <label htmlFor={tier}>{tier}</label>
                </li>
              );
            }
          })}
        </ul>
      </form>
    </>
  );
};

//static
const ListFormTier = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <>
        <p>
          {props.children}
          <button onClick={() => setIsExpanded(!isExpanded)}>Expand</button>
        </p>
      </>
    );
  }
  return (
    <>
      <p>
        {props.children}{" "}
        <button onClick={() => setIsExpanded(!isExpanded)}>Collapse</button>
      </p>
      <ul>
        {props.tierContent.map((person) => {
          return (
            <li key={person.name}>
              {person.name}
              <TierSelector
                localTiers={props.localTiers}
                handleChangeTier={props.handleChangeTier}
                name={person.name}
                tier={person.tier}
                tiers={props.tiers}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

//export
const EditTiers = (props) => {
  //localTiers allows us to store the phonebook without triggering an unwelcome re-render;
  //The difference of props.phonebook and localTiers will be PATCH'd when a user wishes to save adjustments
  const [localTiers, setLocalTiers] = useState(null);
  if (props.phonebook && localTiers == null) {
    setLocalTiers(props.phonebook);
  }

  //if localTiers hasn't been set yet, then the change information won't be saved in state
  if (!localTiers) {
    return null;
  }

  //passed as props down to TierSelector.jsx component
  //Does not PATCH changes. Changes are stored locally. PATCH'd from handleSaveTiers
  const handleChangeTier = (person, newTier, oldTier) => {
    //capture the tier that contains the contact to change
    let tierToUpdate = [...localTiers[oldTier]];

    //update the tier from local state to have the correct info for every contact
    let updatedTier = [];
    tierToUpdate.forEach((contact) => {
      let personToReturn;
      if (contact.name == person) {
        personToReturn = {
          ...contact,
          tier: Number(newTier),
        };
        updatedTier.push(personToReturn);
      } else {
        updatedTier.push(contact);
      }
    });

    //set state with the new values
    const newLocalState = {
      ...localTiers,
      [oldTier]: updatedTier,
    };
    setLocalTiers(newLocalState);
  };

  //TODO: Implement the ability to change a Tier's timeframe
  const handleSaveTiers = () => {
    let contactsChanged = [];
    //iterate through local phonebook (localTiers) object keys
    for (let i = 1; i <= tiers.length; i++) {
      for (let j = 0; j < localTiers[i].length; j++) {
        if (localTiers[i][j].tier != props.phonebook[i][j].tier) {
          //if the contact's tier was changed, then add it to the contactsChanged array
          contactsChanged.push(localTiers[i][j]);
        }
      }
    }
    patchSettings({ settings: "body", phonebook: contactsChanged });
  };

  let tiers;
  if (props.phonebook) {
    tiers = Object.keys(props.phonebook);
  } else {
    tiers = null;
  }

  if (tiers == null) {
    return null;
  } else {
    return (
      <>
        <Link to="/">
          <button>Phonebook</button>
        </Link>
        <h3>Edit Tiers</h3>
        <ul>
          {tiers.map((tier) => {
            return (
              <ListFormTier
                localTiers={localTiers}
                handleChangeTier={handleChangeTier}
                tierContent={localTiers[tier]}
                key={tier}
                settings={props.userSettings}
                tiers={tiers}
              >
                Tier {tier} <br />
                Timeframe:
                <select defaultValue={props.userSettings[tier]}>
                  {timeFrameOptions.map((option) => {
                    return <option key={option}>{option}</option>;
                  })}
                </select>
              </ListFormTier>
            );
          })}
          <button onClick={handleSaveTiers}>Save</button>
        </ul>
      </>
    );
  }
};

export default EditTiers;
