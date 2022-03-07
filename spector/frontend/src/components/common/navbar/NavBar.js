import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import { MenuItems } from "./MenuItems";
import "css/components/NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-Items">
      <h1 className="navbar-logo">Spector</h1> {/*FIXME - where is the logo?*/}
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
