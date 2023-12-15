import React, { useState, useEffect } from 'react';
import '../assets/FlashCards.css';

const FlashCards = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/project')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flash_cards-container">
      {projects.map((project) => (
        <div className="flash-card" key={project.id}>
          <div className="front">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashCards;
