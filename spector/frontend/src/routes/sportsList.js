import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SportsListMenuItems } from "./SportsListMenuItems";
import "css/sportsList.css";

const SportsList = () => {
  let navigate = useNavigate();

  return (
    // Fetch a list of sports
    // Create a CSS grid of buttons like below using map?
    // Make the <button> part into a componenet

    <nav className="SportsListItems">
      <h2 className="titlesfs">Sports Page</h2>

      <ul className="sportslist-menu">
        {SportsListMenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.url} className={item.cName}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SportsList;
