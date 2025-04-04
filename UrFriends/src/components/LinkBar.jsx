import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { setVisibleModal } from "../features/modalSlice";

//static; passed to HeroButton as props
const PhonebookButtonIcon = () => {
  return <i className="fa-regular fa-face-smile fa-3x"></i>;
};

//static; passed to HeroButton as props
const AddUserIcon = () => {
  return <i className="fa-solid fa-user-plus fa-3x"></i>;
};
//static; passed to HeroButton as props
const BulkAddIcon = () => {
  return <i className="fa-regular fa-address-book fa-3x"></i>;
};
//static; passed to HeroButton as props
const EditTiersIcon = () => {
  return <i className="fa-solid fa-users-gear fa-3x"></i>;
};
//static; passed to HeroButton as props
const CalendarIcon = () => {
  return  <i className="fa-regular fa-calendar-days fa-3x"></i>;
};
//static; passed to HeroButton as props
const ConvoIcon = () => {
  return <i className="fa-regular fa-comment fa-3x"></i>;
};
//static
export const HeroButton = (props) => {
  if (props.current) {
    return (
      <button
        className="hero-btn"
        style={{ backgroundColor: "lightgrey", cursor: "default" }}
        onClick={props.clickHandler}
      >
        <div className="hero-btn-content" style={{ color: "white" }}>
          <div className="action-button-graphic" style={{ color: "white" }}>
            {props.icon}
          </div>
          {props.text}
        </div>
      </button>
    );
  }
  return (
    <button className="hero-btn" onClick={props.clickHandler}>
      <div className="hero-btn-content">
        <div className="action-button-graphic">{props.icon}</div>
        {props.text}
      </div>
    </button>
  );
};

const LinkBar = (props) => {
  const dispatch = useDispatch();

  const addContact = () => {
    dispatch(setVisibleModal({ modalContentType: "add-contact", title: "Add New Person"  }));
  };

  const addConvoSansPerson = () => {
    dispatch(setVisibleModal({ modalContentType: "add-convo-sans-contact", title: "Add Conversation" }));
  };

  

  return (
    <>
      <div className="link-bar-container">
        <Link to="/">
          <HeroButton
            text="Phonebook"
            current={props.page == "phonebook" ? true : false}
            icon={<PhonebookButtonIcon />}
          />
        </Link>
        <Link to="/editTiers">
          <HeroButton
            clickHandler={null}
            icon={<EditTiersIcon />}
            text="Edit Tiers"
            current={props.page == "edit-tiers" ? true : false}
          />
        </Link>
        <Link to="/bulkAdd">
          <HeroButton
            icon={<BulkAddIcon />}
            text="Bulk Add"
            current={props.page == "bulk-add" ? true : false}
          />
        </Link>
        <Link to="/calendar">
          <HeroButton
            icon={<CalendarIcon />}
            text="Calendar"
            current={props.page == "calendar" ? true : false}
          />
        </Link>
        <HeroButton
          clickHandler={addContact}
          icon={<AddUserIcon />}
          text="Add Contact"
        />
        <HeroButton
          clickHandler={addConvoSansPerson}
          icon={<ConvoIcon />}
          text="Add Convo"
        />
      </div>
    </>
  );
};

export default LinkBar;
