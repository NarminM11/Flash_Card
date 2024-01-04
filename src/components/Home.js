import React from "react";
import "../assets/Home.css";

const projects = [
  {
    id: "1",
    name: "Jest-dili",
    description:
      "Jest Dili is a project aimed at creating and developing a website dedicated to helping people learn and explore the Jest programming language. Jest is a popular JavaScript testing framework widely used for testing React applications. The website serves as a comprehensive resource for beginners and experienced developers alike, providing a structured learning path, tutorials, and a wealth of information to enhance proficiency in Jest.",
    link: "https://github.com/NarminM11/SDP-ProjecT.git",
  },
  {
    id: "2",
    name: "API_Data_Display",
    description:
      "Explore a diverse range of products with ease using the API Data Display web application. This project seamlessly integrates with the dummyjson.com API, providing users with a visually appealing interface to discover product details such as title, price, discount, category, and stock. Key features include a well-formatted home page, dedicated product pages with galleries, and bonus functionalities like search, category filtering, and pagination. Dive into the world of products with this user-friendly showcase!",
    link: "https://narminm11.github.io/API_Data_Display/",
  },
  {
    id: "3",
    name: "Personal-WebPage",
    description:
      "Discover the essence of who I am and what I do through my personal webpage. This project is a curated space that reflects my journey, skills, and passions. From an interactive portfolio showcasing my work to a glimpse into my background and interests, the personal webpage is a digital representation of my professional identity. Join me on this virtual journey to explore my story and accomplishments.",
    link: "https://narminm11.github.io/Personal-WebPage/",
  },
];

const HomePage = () => {
  return (
    <>
      <div className="container">
        {projects.map((project) => (
          <div key={project.id} className="project">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project Details
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
