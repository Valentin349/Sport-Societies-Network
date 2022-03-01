import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import { MenuItems } from "./MenuItems";
// import "./NavBar.css";

const NavBar = () => {
  let activeStyle = {
    borderRadius: "4px",
    backgroundColor: "#2003ad",
  };

  return (
    <nav className="NavBarItems">
      <h1 className="navbar-logo">Spector</h1>
      <ul className="nav-menu">
        {MenuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.url}
              className={item.cName}
              //className={({ isActive }) =>
              //  "nav-links" + (isActive ? " active" : "")
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
