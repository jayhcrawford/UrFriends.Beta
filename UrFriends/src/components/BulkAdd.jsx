import React from "react";
import { Link } from "react-router";
import { HeroButton } from "./Phonebook";
import { PhonebookButtonIcon } from "./EditTiers";
import { useSelector } from "react-redux";

const BulkAdd = () => {
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const tiersStore = useSelector((state) => state.phonebook.tiers);

  return (
    <>
      <Link to="/">
        <HeroButton text="Phonebook" icon={<PhonebookButtonIcon />} />
      </Link>
      <div>{tiersStore}</div>
    </>
  );
};

export default BulkAdd;
