import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import { MenuItems } from "./MenuItems";
//import style from "./NavBar.module.css";
//import "./NavBar.css";
import "css/components/NavBar.css";

const NavBar = () => {
  let activeStyle = {
    borderRadius: "4px",
    backgroundColor: "#2003ad",
  };

  return (
    <nav className="NavBar-Items">
      <h1 className="navbar-logo">Spector</h1>
      <ul className="NavBar-Menu">
        {MenuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.url}
              className="NavBar-Links"
              //className={item.cName} // Doesn't work with css modules
              //className={({ isActive }) =>
              //  "nav-links" + (isActive ? " active" : "")
              //}
              //className={({ isActive }) =>
              //  isActive ? `${style.active}` : `${style.navLinks}`
              //}
              // style={({ isActive }) => (isActive ? activeStyle : undefined)}
              end
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <Button>Profile</Button>
    </nav>
  );
};

export default NavBar;
