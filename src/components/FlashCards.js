import React, { useState, useEffect } from "react";
import "../assets/FlashCards.css";
import EditCardForm from "../components/EditCardForm";

const FlashCard = () => {
  const [cards, setFlashCards] = useState([]);
  const [spin, setSpin] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortOption, setSortOption] = useState("Choose");
  const [editedCardIndex, setEditedCardIndex] = useState(null);
  const [current, setCurrent] = useState(0);
  const cardsPerPage = 2;
  const [newCardData, setNewCardData] = useState({
    front: "",
    back: "",
    modifiedDate: new Date().toISOString(),
    status: "",
  });

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

  const [flashcarddata, setFlashcarddata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const url =
      "https://api.airtable.com/v0/appqY5UZYlf41Q5VT/Table%201?api_key=keyPZ9SKzXIt4Ek1v";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setFlashcarddata(json.records);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const searchText = searchQuery.toLowerCase();

    const filteredCards = cards.filter((flashCard) => {
      const frontText = flashCard.front.text
        ? flashCard.front.text.toLowerCase()
        : "";
      const backText = flashCard.back.toLowerCase();
      return frontText.includes(searchText) || backText.includes(searchText);
    });

    setSearchResults(filteredCards);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setSortOrder("asc");
  };

  useEffect(() => {
    let apiUrl = "http://localhost:3000/flashCards?";

    if (selectedStatus !== "All") {
      apiUrl += `status=${selectedStatus}&`;
    }

    apiUrl += `_sort=${sortOption}&_order=${sortOrder}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setFlashCards(data))
      .catch((error) => console.error(error));
  }, [selectedStatus, sortOption, sortOrder]);

  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = () => {
    let apiUrl = "http://localhost:3000/flashCards?";

    if (selectedStatus !== "All") {
      apiUrl += `status=${selectedStatus}&`;
    }

    apiUrl += `_sort=${sortOption}&_order=${sortDirection}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setFlashCards(data))
      .catch((error) => console.error(error));
  };

  function previousCard() {
    setCurrent(current - 1);
  }

  function nextCard() {
    setCurrent(current + 1);
  }

  return (
    <div className="flashcards-container">
      <div className="filter-container">
        <label className="filter-label">Filter by Status</label>
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
      <div className="search-container">
        <label className="search-label">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search cards..."
          className="search-input"
        />
        <button onClick={handleSearchButtonClick} className="search-button">
          Search
        </button>
      </div>
      <div className="sort-container">
        <label className="sort-label">Sort by</label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="Choose">Choose</option>
          <option value="modifiedDate">Modified Date</option>
          <option value="status">Status</option>
          <option value="front.text">Front Text</option>
        </select>

        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <button onClick={handleSort}>Sort</button>
      </div>

      <div className="all-cards">
        {searchResults.length > 0
          ? searchResults.map((flashCard, index) => (
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
                          <button
                            onClick={() => handleDeleteCard(flashCard.id)}
                          >
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
            ))
          : cards
              .slice(current * cardsPerPage, (current + 1) * cardsPerPage)
              .map((flashCard, index) => (
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
                        {flashCard.front.text && (
                          <h2>{flashCard.front.text}</h2>
                        )}
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
                            <button
                              onClick={() => handleDeleteCard(flashCard.id)}
                            >
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

      <div className="nav">
        <button onClick={previousCard} disabled={current === 0}>
          Previous page
        </button>
        <button
          onClick={nextCard}
          disabled={current === Math.ceil(cards.length / cardsPerPage) - 1}
        >
          Next page
        </button>
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
