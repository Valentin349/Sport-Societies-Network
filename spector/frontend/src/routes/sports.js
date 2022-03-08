import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/sports.css";

const Sports = () => {
  let { sportName } = useParams();

  const { isLoaded, data, message } = useFetch(
    `/api/activities/?sport=${sportName}`
  );

  if (!isLoaded) {
    return message;
  }

  return (
    <div className="SportPageItems">
      <h2 className="socSportPageTitle">Welcome to the {sportName} page</h2>
      
      <ul className="socPageLayout">

        <li>
          <ul className="socIndividualBox">
            {data.map((item, index) => (
              <ul key={index}>
                <li>{item.name}</li>
                <li>{item.description}</li>
                <li>{item.sport}</li>
                <li>{item.id}</li>
              </ul>
            ))}
          </ul>
        </li>

        <div className="socIndividualBox">
          Activities
          <li className="socActivityBox">
            Activity 1
          </li>

          <li className="socActivityBox">
            Activity 2
          </li>
        </div>
        

      </ul>

    </div>
  );
};

export default Sports;
