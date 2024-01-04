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
  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: "Home", link: "/" },
    {
      key: "2",
      icon: <BookOutlined />,
      label: "FlashCards",
      link: "/flashcards",
    },
    { key: "3", icon: <MailOutlined />, label: "Contact", link: "/contact" },
  ];

  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
