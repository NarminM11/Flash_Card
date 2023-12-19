import React, { useState, useEffect } from "react";
import "../assets/FlashCards.css";

const FlashCard = () => {
  const [Cards, setFlashCards] = useState([]);
  const [spin, setSpin] = useState([]);
  const [newCardData, setNewCardData] = useState({
    front: "",
    back: "",
    modifiedDate: "",
    status: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/flashCards")
      .then((response) => response.json())
      .then((data) => setFlashCards(data))
      .catch((error) => console.error(error));
  }, []);

  const spinCard = (index) => {
    setSpin((prevSpin) => {
      const newSpin = [...prevSpin];
      newSpin[index] = !newSpin[index];
      return newSpin;
    });
  };

  const handleInputChange = (d) => {
    const { name, value } = d.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            <div className="front">
              <h2>{flashCard.front}</h2>
            </div>
            <div className="back">
              <p>{flashCard.back}</p>
              <p>Modified Date: {flashCard.modifiedDate}</p>
              <p>Status: {flashCard.status}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="new-card">
        <input
          type="text"
          name="front"
          placeholder="Front of the card"
          value={newCardData.front}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="back"
          placeholder="Back of the card"
          value={newCardData.back}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="modifiedDate"
          placeholder="Modified Date"
          value={newCardData.modifiedDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status of the card"
          value={newCardData.status}
          onChange={handleInputChange}
        />
        <button>Add New Card</button>
      </div>
    </>
  );
};

export default FlashCard;
