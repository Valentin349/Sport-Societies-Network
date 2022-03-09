import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../button";
import { MenuItems } from "./MenuItems";
import "css/components/NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-Items">
      <h1 className="navbar-logo">Spector</h1>
      <ul className="NavBar-Menu">
        {MenuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.url} className={item.cName} end>
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
