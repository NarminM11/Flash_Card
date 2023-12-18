import React from "react";
import "../assets/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">FlashCards</li>
      </ul>
      <span className="social-icons">
        <a
          className="social-media"
          href="https://www.facebook.com"
          target="_blank"
          rel=""
        >
          Facebook
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
