import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../assets/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        {" "}
        <img
          src="https://cdn.dribbble.com/users/5214489/screenshots/16572960/media/6b27c24edb023951054ce638ca40592f.jpg?resize=400x0"
          alt="Logo"
          width="60"
          height="60"
        />
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/flashcards">FlashCards</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">Contact</Link>
        </li>
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