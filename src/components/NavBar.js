import React from "react";
// import { Link } from "react-router-dom";  // Import Link from react-router-dom
import "../assets/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">FlashCards</li>
        <li className="nav-item">Contact</li>

        {/* <Link to="../components/FlashCards.js">FlashCards</Link> */}

      </ul>
      <span className="social-icons">
        <a
          className="social-media"
          href="https://github.com/NarminM11"
          target="_blank"
          rel=""
        >
          GitHub
        </a>
        <a
          className="social-media"
          href="https://www.instagram.com"
          target="_blank"
          rel=""
        >
          Instagram
        </a>
      </span>
    </nav>
  );
};

export default Navbar;
