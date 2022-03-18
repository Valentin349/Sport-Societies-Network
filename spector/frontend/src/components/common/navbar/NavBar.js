import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Button from "../button";
import { MenuItems } from "./MenuItems";
import "css/components/NavBar.css";
import { useNavigate } from 'react-router';


const NavBar = () => {

  let navigate = useNavigate();
  let userID = sessionStorage.getItem("userID")// Retrieve userID with this


  function handleClick() {
    navigate('profile/<user id>/')
  }

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
      <Button onClick={handleClick} > Profile</Button>
    </nav>
  );
};

export default NavBar;
