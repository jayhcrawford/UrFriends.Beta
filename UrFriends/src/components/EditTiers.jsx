import React, { useState } from "react";
import { Link } from "react-router";
import { patchSettings } from "../../services/settingService";
import { patchTiers } from "../../services/contactService";
import { timeFrameOptions } from "../functions/timeFrameSupportFunctions";
import { useDispatch, useSelector } from "react-redux";
import LinkBar from "./LinkBar";
import {
  hideNotification,
  setNotification,
} from "../features/notificationSlice";

//export; renders a basic button to use sitewide
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

/* COMPONENTS */

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

//static; renders when a tier currently has 0 contacts
const ThisTierIsEmpty = () => {
  return (
    <p
      style={{
        border: "2px dashed black",
        padding: "1em",
        backgroundColor: "lightgrey",
      }}
    >
      There are no entries for this tier
    </p>
  );
};

//static; when a user selects to "expand" the contacts in a given tier, if there are
// contacts in that tier, this componenet renders those contacts, as well as select
// elements that modify the localTiers object in EditTiers
const RenderContactsIntTier = (props) => {
  return (
    <ul>
      {props.tierContent.map((person) => {
        return (
          <li key={`${person.name.first}-${person.name.last}`}>
            {person.name.first + " " + person.name.last}
            <ContactTierSelector
              localTiers={props.localTiers}
              handleChangeTier={props.handleChangeTier}
              name={person.name}
              person_id={person.id}
              tier={person.tier}
            />
          </li>
        );
      })}
    </ul>
  );
};

//static; renders radio button group, allowing tier adjustment; sets localTiers
const ContactTierSelector = (props) => {
  const tiersStore = useSelector((state) => state.phonebook.tiers);
  const settingsStore = useSelector((state) => state.login.settings);

  let allTiers;
  if (settingsStore && !allTiers) {
    allTiers = Object.keys(settingsStore);
  }

  if (!tiersStore) {
    return null;
  }

  const handleChange = (newTier, oldTier) => {
    props.handleChangeTier(props.person_id, newTier, oldTier);
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
          {allTiers.map((tier) => {
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

//static; produces a select element that modifies the localSettings object in EditTiers
const TimeFrameSelector = (props) => {
  return (
    <>
      Timeframe:
      <select
        name="selectedTimeFrame"
        onChange={(event) => props.updateTierTimeFrameState(event, props.tier)}
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
    </>
  );
};

//static; shows collapsed tier with option to expand
const ListFormTier = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tierIsEmpty, setTierIsEmpty] = useState(false);

  if (!Array.isArray(props.tierContent) && !tierIsEmpty) {
    setTierIsEmpty(true);
  }

  //if contacts are showing
  if (!isExpanded) {
    return (
      <>
        <div style={{ paddingBottom: ".1em" }}>
          <TierName tier={props.tier} /> <br />
          <TimeFrameSelector
            updateTierTimeFrameState={props.updateTierTimeFrameState}
            tier={props.tier}
            localSettings={props.localSettings}
          />
        </div>

        {/* If the tier is __NOT EMPTY__ (>0 CONTACTS), this button will show the contacts in the tier */}
        {!tierIsEmpty && (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            Show Contacts
          </button>
        )}

        {/* If this tier is __EMPTY__ (0 CONTACTS), we want to render a component whose other settings can be changed, and indicate
        that emptiness */}
        {tierIsEmpty && <ThisTierIsEmpty />}
      </>
    );
  }

  //if contacts are not showing
  return (
    <>
      <>
        <div style={{ paddingBottom: ".1em" }}>
          <TierName tier={props.tier} /> <br />
          <TimeFrameSelector
            updateTierTimeFrameState={props.updateTierTimeFrameState}
            tier={props.tier}
            localSettings={props.localSettings}
          />
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          Hide Contacts
        </button>
        <RenderContactsIntTier
          handleChangeTier={props.handleChangeTier}
          tierContent={props.tierContent}
          localTiers={props.localTiers}
        />
      </>
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

  const dispatch = useDispatch();

  const createNotification = (message, type) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

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

  //passed as props down to ContactTierSelector.jsx component
  //Does not PATCH changes. Changes are stored locally. PATCH'd from handlePatchChanges
  const handleChangeTier = (person_id, newTier, oldTier) => {
    //capture the tier that contains the contact to change

    let tierToUpdate = [...localTiers[oldTier]];

    //update the tier from local state to have the correct info for every contact
    let updatedTier = [];
    tierToUpdate.forEach((contact) => {
      let personToReturn;

      if (contact.id == person_id) {
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
  const handlePatchChanges = async () => {
    //any settings that are changed are changed in state (localTiers and localSettings)
    //anything coming from the store was fetched
    const tier_keys_toAssess = Object.keys(settingsStore);

    //CONTACTS
    //Find any contacts that need to be PATCH'd
    let contactsChanged = [];
    tier_keys_toAssess.forEach((key) => {
      if (localTiers[key] && Object.hasOwn(localTiers[key], "length")) {
        for (let i = 0; i < localTiers[key].length; i++) {
          if (localTiers[key][i].tier != key) {
            contactsChanged.push(localTiers[key][i]);
          }
        }
      }
    });
    //(END) CONTACTS

    //SETTINGS
    //Find any changed settings, otherwise the patchSettings Object will send null for the "settings" key
    let changeSettings = false;
    let sendChangedSettings = null;
    for (let i = 0; i < tier_keys_toAssess.length; i++) {
      if (
        localSettings[tier_keys_toAssess[i]] !=
        settingsStore[tier_keys_toAssess[i]]
      ) {
        changeSettings = true;
      }
    }
    if (changeSettings) {
      sendChangedSettings = localSettings;
    }
    //(END) SETTINGS

    //PATCH
    //TODO; seperate the logic of patching the settings and the phonebook changes
    if (contactsChanged.length == 0 && !sendChangedSettings) {
      //no contacts or settings were changed; do not patch; notify
      createNotification(`There were no changes made`, "red");
    } else {
      //settings were changed, or contacts were udpated;
      //patch the changes
      const result = await patchSettings({
        token: loggedIn.user.token,
        settings: sendChangedSettings,
        phonebook: contactsChanged,
      });
      //then notify

      //NOTIFICATION
      //TODO; after seperating the phonebook and settings patching logic, implement a more specific notification process
      if (
        result &&
        Object.hasOwn(result, "data") &&
        Object.hasOwn(result.data, "success")
      ) {
        //dispatch a success notification
        createNotification(`The changes were saved`, "green");
      } else if (
        result &&
        Object.hasOwn(result, "data") &&
        Object.hasOwn(result.data, "error")
      ) {
        //dispatch an error notification
        createNotification(`There was an error saving the changes`, "red");
      }
      //(END) NOTIFICATION
    }
    //(END) PATCH
  };

  let tiers;
  if (phonebookStore && settingsStore) {
    tiers = Object.keys(settingsStore);
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
                />
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
