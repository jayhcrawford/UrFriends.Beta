import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LinkBar from "./LinkBar";

const BulkAdd = () => {
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const tiersStore = useSelector((state) => state.phonebook.tiers);

  return (
    <>
      <LinkBar page="bulk-add" />
      <div>{tiersStore}</div>
    </>
  );
};

export default BulkAdd;
