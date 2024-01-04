import React, { useState, useEffect } from "react";
import "../assets/EditCard.css";

const EditCardForm = ({ cardData, onSave, onCancel }) => {
  const [editedCardData, setEditedCardData] = useState({
    front: { text: "", image: "" },
    back: "",
  });

  useEffect(() => {
    setEditedCardData(cardData);
  }, [cardData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("front.")) {
      const frontProperty = name.split(".")[1];
      setEditedCardData((prevData) => ({
        ...prevData,
        front: {
          ...prevData.front,
          [frontProperty]: value,
        },
      }));
    } else {
      setEditedCardData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
          name="front.text"
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

export default EditCardForm;
