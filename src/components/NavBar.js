import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  MailOutlined,
  GithubOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "../assets/Navbar.css";


const Navbar = () => {
  return (
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/flashcards">FlashCards</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MailOutlined />}>
            <Link to="/contact">Contact</Link>
          </Menu.Item>
          <Menu.Item key= "4" >
          <span className="social-icons">
          <a
            className="social-media"
            href="https://github.com/NarminM11"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined />
          </a>
          <a
            className="social-media"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined />
          </a>
        </span>
          </Menu.Item>
        </Menu>
        
      </div>
  );
};

export default Navbar;