import React from "react";
import { useSelector } from "react-redux";

const ContactSettings = () => {
  const person = useSelector((state) => state.modal.person);

  const handleDelete = () => {
    console.log(person.id);
  };

  return (
    <div>
      <h2>Settings for {person.name.first}</h2>
      <button
        style={{ color: "black", backgroundColor: "red" }}
        onClick={handleDelete}
      >
        delete this contact
      </button>
    </div>
  );
};

export default ContactSettings;
