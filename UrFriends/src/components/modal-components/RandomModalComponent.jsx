import React, { useState } from "react";

const RandomModalComponent = () => {
  const [shuffled, setShuffled] = useState(false);

  const handleShuffle = () => {
    setShuffled(true);
  };

  return (
    <div>
      {shuffled && "You shuffled"}
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
