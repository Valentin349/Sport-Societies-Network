import React from "react";
import { Link } from "react-router-dom";
import "css/sportsList.css";
import useFetch from "../hooks/useFetch";

const SportsList = () => {
  const { isLoaded, data, message } = useFetch("/api/sports/");

  if (!isLoaded) {
    return message;
  }

  return (
    <nav className="SportsListItems">
      <h2 className="titlesfs">Sports Page</h2>

      <ul className="sportslist-menu">
        {data.map((item, index) => (
          <li key={index}>
            <Link to={`sports/${item.name}`} className="sportslist-links">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SportsList;
