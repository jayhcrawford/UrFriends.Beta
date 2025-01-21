import React, { useState } from "react";
import { Link } from "react-router";

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
          return <li key={person.name}>{person.name}</li>;
        })}
      </ul>
    </>
  );
};

const EditTiers = (props) => {

  const tiers = Object.keys(props.phonebook);

  return (
    <>
      <Link to="/">
        <button>Phonebook</button>
      </Link>
      <h3>Edit Tiers</h3>
      <ul>
        {tiers.map((tier) => {
          return (
            <ListFormTier tierContent={props.phonebook[tier]} key={tier}>
              {tier}
            </ListFormTier>
          );
        })}
      </ul>
    </>
  );
};

export default EditTiers;
