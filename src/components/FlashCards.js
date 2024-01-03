import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../assets/FlashCards.css";

const EditCardForm = ({ cardData, onSave, onCancel }) => {
  const [editedCardData, setEditedCardData] = useState(cardData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = () => {
    onSave(editedCardData);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="edit-form-modal" onClick={handleModalClick}>
      <div className="edit-form-content">
        <h2>Edit Card</h2>
        <label>Front:</label>
        <input
          type="text"
          name="front"
          value={editedCardData.front.text}
          onChange={handleInputChange}
        />
        <label>Back:</label>
        <input
          type="text"
          name="back"
          value={editedCardData.back}
          onChange={handleInputChange}
        />

        <div className="edit-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const FlashCard = () => {
  const [cards, setFlashCards] = useState([]);
  const [spin, setSpin] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [newCardData, setNewCardData] = useState({
    front: "",
    back: "",
    modifiedDate: new Date().toISOString(),
    status: "",
  });
  const [editedCardIndex, setEditedCardIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/flashCards?_sort=modifiedDate&_order=desc")
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    let apiUrl =
      "http://localhost:3000/flashCards?_sort=modifiedDate&_order=desc";

    if (selectedStatus !== "All") {
      apiUrl += `&status=${selectedStatus}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setFlashCards(data))
      .catch((error) => console.error(error));
  }, [selectedStatus]);

  const handleAddNewCard = () => {
    fetch("http://localhost:3000/flashCards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newCardData,
        modifiedDate: new Date().toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlashCards((prevCards) => [...prevCards, data]);
        setNewCardData({
          front: "",
          back: "",
          modifiedDate: new Date().toISOString(),
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
        setFlashCards((prevCards) =>
          prevCards.filter((card) => card.id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  const handleEditCard = (index, e) => {
    e.stopPropagation();
    setEditedCardIndex(index);
  };

  const handleSaveCard = (editedCardData) => {
    const id = cards[editedCardIndex].id;

    editedCardData.modifiedDate = new Date().toISOString();

    fetch(`http://localhost:3000/flashCards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCardData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlashCards((prevCards) =>
          prevCards.map((card, index) =>
            index === editedCardIndex ? data : card
          )
        );
        setEditedCardIndex(null);
      })
      .catch((error) => console.error(error));
  };

  const handleCancelEdit = () => {
    setEditedCardIndex(null);
  };

  return (
    <div className="flashcards-container">
      <div className="filter-container">
        <label>Filter by Status</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All cards</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
      </div>

      <div className="all-cards">
        {cards.map((flashCard, index) => (
          <div
            key={flashCard.id}
            className={`Cards ${spin[index] ? "spinned" : ""}`}
            onClick={() => spinCard(index)}
          >
            <div className="front">
              {editedCardIndex === index ? (
                <EditCardForm
                  cardData={flashCard}
                  onSave={handleSaveCard}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <div>
                  {flashCard.front.text && <h2>{flashCard.front.text}</h2>}
                  {flashCard.front.image && (
                    <img
                      src={flashCard.front.image}
                      alt={`Card Front for ${flashCard.front.text}`}
                    />
                  )}
                  <div className="button-container">
                    <div className="edit-button">
                      <button onClick={(e) => handleEditCard(index, e)}>
                        Edit Card
                      </button>
                    </div>
                    <div className="delete-button">
                      <button onClick={() => handleDeleteCard(flashCard.id)}>
                        {/* <FontAwesomeIcon icon={faTrash} /> */}
                        Delete Card
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="back">
              <p>{flashCard.back}</p>
              <div>
                <p>
                  Modified Date:{" "}
                  {flashCard.modifiedDate
                    ? new Date(flashCard.modifiedDate).toLocaleString()
                    : "Not available"}
                </p>
                <p>Status: {flashCard.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-new-card">
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
    </div>
  );
};

export default FlashCard;
