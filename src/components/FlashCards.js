import React, { useState, useEffect } from "react";
import "../assets/FlashCards.css";

const FlashCard = () => {
  const [cards, setFlashCards] = useState([]);
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

  const handleInputChange = (c) => {
    const { name, value } = c.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddNewCard = () => {
    fetch("http://localhost:3000/flashCards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCardData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlashCards((prevCards) => [...prevCards, data]);
        setNewCardData({
          front: "",
          back: "",
          modifiedDate: "",
          status: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteCard = (id) => {
    fetch(`http://localhost:3000/flashCards/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setFlashCards((prevCards) => prevCards.filter((card) => card.id !== id));
      })
      .catch((error) => console.error(error));
  };



  return (
    <>
      <div className="container">
        {cards.map((flashCard, index) => (
          <div
            key={flashCard.id}
            className={`Cards ${spin[index] ? "spinned" : ""}`}
            onClick={() => spinCard(index)}
          >
            <div className="front">
              <h2>{flashCard.front}</h2>
              <div className="card-buttons">
                  <button onClick={() => handleDeleteCard(flashCard.id)}>Delete Card</button>
                </div>
            </div>
            <div className="back">
              <p>{flashCard.back}</p>
              {/* <p>Modified Date: {flashCard.modifiedDate}</p>
              <p>Status: {flashCard.status}</p> */}
              
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
        <button onClick={handleAddNewCard}>Add New Card</button>
      </div>
    </>
  );
};

export default FlashCard;
