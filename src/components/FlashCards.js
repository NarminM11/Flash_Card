import React, { useState, useEffect } from "react";
import "../assets/FlashCards.css";

const FlashCard = () => {
  const [Cards, setflashCards] = useState([]);
  const [spin, setSnipped] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/flashCards")
      .then((response) => response.json())
      .then((data) => setflashCards(data))
      .catch((error) => console.error(error));
  }, []);
  

  const spinCard = (index) => {
    setSnipped((prevSpinned) => {
      const newSpinned = [...prevSpinned];
      newSpinned[index] = !newSpinned[index];
      return newSpinned;
    });
  };

  return (
    <>
      <div className="container">
        {Cards.map((flashCard, index) => (
          <div
            key={flashCard.id}
            className={`Cards ${spin[index] ? "spinned" : ""}`}
            onClick={() => spinCard(index)}
          >
            <div className="card front">
              <h2>{flashCard.front}</h2>
            </div>
            <div className="card back">
              <p>{flashCard.back}</p>
              <p>Modified Date: {flashCard.modifiedDate}</p>
              <p>Status: {flashCard.status}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlashCard;