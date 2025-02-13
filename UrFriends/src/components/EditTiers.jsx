import React, { useState } from "react";
import { Link } from "react-router";
import { patchSettings } from "../../services/settingService";
import { patchTiers } from "../../services/contactService";
import { timeFrameOptions } from "../functions/timeFrameSupportFunctions";
import { useSelector } from "react-redux";
import LinkBar from "./LinkBar";

export const MiniButton = (props) => {
  return (
    <button
      style={{
        backgroundColor: "brown",
        color: "white",
        padding: ".9em",
        cursor: "pointer",
        borderRadius: "2em",
        marginLeft: "1em",
        marginTop: ".7em",
        border: "none",
      }}
    >
      {props.text}
    </button>
  );
};

//static; used in the Select element for Tier Timeframe selection
const interpretOptionValue = (option) => {
  switch (option) {
    case "1d":
      return "1 Day";
    case "3d":
      return "3 Days";
    case "1w":
      return "1 Week";
    case "2w":
      return "2 Weeks";
    case "3w":
      return "3 Weeks";
    case "1m":
      return "1 Month";
    case "2m":
      return "2 Months";
    case "3m":
      return "3 Months";
    case "4m":
      return "4 Months";
    case "5m":
      return "5 Months";
    case "6m":
      return "6 Months";
    default:
      return "No Date";
  }
};

//static; renders radio button group, allowing tier adjustment; sets localTiers
const TierSelector = (props) => {
  const tiersStore = useSelector((state) => state.phonebook.tiers);
  if (!tiersStore) {
    return null;
  }

  const handleChange = (newTier, oldTier) => {
    props.handleChangeTier(props.name.first, newTier, oldTier);
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
          {tiersStore.map((tier) => {
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

//static; renders header with tier name and a button, contains state to change
//tier name
const TierName = (props) => {
  const [editTierName, setEditTierName] = useState(false);
  const [localTierName, setLocalTierName] = useState("");
  const [newNameInputVal, setNewNameInputVal] = useState("");

  if (localTierName == "" && newNameInputVal == "") {
    setLocalTierName(props.tier);
  }

  const saveLocalTier = () => {
    setLocalTierName(newNameInputVal);
    setEditTierName(false);
  };

  return (
    <>
      <h3 style={{ margin: "0", display: "inline" }}> Tier {localTierName}</h3>
      {editTierName && (
        <input
          value={newNameInputVal}
          onChange={(event) => setNewNameInputVal(event.target.value)}
        ></input>
      )}
      {!editTierName && (
        <button onClick={() => setEditTierName(true)}>Change Tier Name</button>
      )}
      {editTierName && (
        <>
          <button onClick={() => saveLocalTier()}> Save</button>
          <button onClick={() => setEditTierName(false)}> Cancel</button>
        </>
      )}
    </>
  );
};

//static; shows collapsed tier with option to expand
const ListFormTier = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const tiersStore = useSelector((state) => state.phonebook.tiers);

  if (!isExpanded) {
    return (
      <>
        <div style={{ paddingBottom: ".1em" }}>
          <TierName tier={props.tier} />
          Timeframe:
          <select
            name="selectedTimeFrame"
            onChange={(event) =>
              props.updateTierTimeFrameState(event, props.tier)
            }
            defaultValue={props.localSettings[props.tier]}
          >
            {timeFrameOptions.map((option) => {
              return (
                <option value={option} key={option}>
                  {interpretOptionValue(option)}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          Show Contacts
        </button>
      </>
    );
  }
  return (
    <>
      <>
        {props.children}{" "}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          Hide Contacts
        </button>
      </>
      <ul>
        {props.tierContent.map((person) => {
          return (
            <li key={`${person.name.first}-${person.name.last}`}>
              {person.name.first + " " + person.name.last}
              <TierSelector
                localTiers={props.localTiers}
                handleChangeTier={props.handleChangeTier}
                name={person.name}
                tier={person.tier}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

//export; stores phonebook passed as props into localTiers, radio buttons manipulate localTiers
//calls PATCH to change tier settings and contact tiers
const EditTiers = (props) => {
  //localTiers allows us to store the phonebook without triggering an unwelcome re-render;
  //The difference of phonebookStore and localTiers will be PATCH'd when a user wishes to save adjustments
  const [localTiers, setLocalTiers] = useState(null);
  const [localSettings, setLocalSettings] = useState(null);

  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const loggedIn = useSelector((state) => state.login.user);
  const settingsStore = useSelector((state) => state.login.settings);

  if (phonebookStore && localTiers == null) {
    setLocalTiers(phonebookStore);
  }

  if (settingsStore && localSettings == null) {
    setLocalSettings(settingsStore);
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

      if (contact.name.first == person) {
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

  //updates tier settings stored in localSettings
  //Does not PATCH changes
  const updateTierTimeFrameState = (event, tier) => {
    const updatedSettings = {
      ...localSettings,
      [tier]: event.target.value,
    };

    setLocalSettings(updatedSettings);
  };

  //PATCH anything that was changed, settings or contacts
  const handlePatchChanges = () => {
    //Find any contacts that need to be PATCH'd
    let contactsChanged = [];
    //iterate through local phonebook (localTiers) object keys
    for (let i = 1; i <= tiers.length; i++) {
      for (let j = 0; j < localTiers[i].length; j++) {
        if (localTiers[i][j].tier != phonebookStore[i][j].tier) {
          //if the contact's tier was changed, then add it to the contactsChanged array
          contactsChanged.push(localTiers[i][j]);
        }
      }
    }

    //Determine if settings have changed, otherwise the patchSettings Object will send null for the settings key
    const tiersToAssess = Object.keys(localTiers);
    let changeSettings = false;
    let sendChangedSettings = null;
    for (let i = 0; i < tiersToAssess.length; i++) {
      if (localSettings[tiersToAssess[i]] != settingsStore[tiersToAssess[i]]) {
        changeSettings = true;
      }
    }
    if (changeSettings) {
      sendChangedSettings = localSettings;
    }

    //TODO: layout a condition where patchSettings is only used for settings and
    //phonebook changes call the service patchTiers from contactService
    patchSettings({
      token: loggedIn.user.token,
      settings: sendChangedSettings,
      phonebook: contactsChanged,
    });
  };

  let tiers;
  if (phonebookStore) {
    tiers = Object.keys(phonebookStore);
  } else {
    tiers = null;
  }

  if (tiers == null) {
    return null;
  } else {
    return (
      <>
        <LinkBar page="edit-tiers" />
        <h2>Edit Tiers</h2>
        <MiniButton text="Add Tier" />
        <MiniButton text="Delete Tier" />
        <ul style={{ paddingInlineStart: "0px" }}>
          {tiers.map((tier) => {
            return (
              <div
                key={tier}
                style={{
                  border: "1px solid black",
                  margin: "1em",
                  padding: "1em",
                }}
              >
                <ListFormTier
                  localTiers={localTiers}
                  handleChangeTier={handleChangeTier}
                  tierContent={localTiers[tier]}
                  settings={settingsStore}
                  tiers={tiers}
                  tier={tier}
                  localSettings={localSettings}
                  updateTierTimeFrameState={updateTierTimeFrameState}
                ></ListFormTier>
              </div>
            );
          })}
          <button onClick={handlePatchChanges}>Save</button>
        </ul>
      </>
    );
  }
};

export default EditTiers;
