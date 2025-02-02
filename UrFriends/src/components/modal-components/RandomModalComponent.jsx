import React, { useState } from "react";
import { useSelector } from "react-redux";

//export
const RandomModalComponent = () => {
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const [randomPerson, setRandomPerson] = useState(null);

  const handleShuffle = () => {
    function getRandomPerson(obj) {
      const keys = Object.keys(obj);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const array = obj[randomKey];
      const randomValue = array[Math.floor(Math.random() * array.length)];
      setRandomPerson(randomValue);
    }
    getRandomPerson(phonebookStore);
  };

  return (
    <div>
      {randomPerson && `${randomPerson.name.first}`}
      <button
        onClick={handleShuffle}
        id="random-interact-shuffle"
        alt="Random Interaction Button"
        aria-label="Random Interaction Button"
      >
        <i className="fa-solid fa-dice fa-2x"></i>
      </button>
    </div>
  );
};

export default RandomModalComponent;
