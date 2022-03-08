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

        <div className="socIndividualBox">
          Details
          ...
        </div>

        <li>
          <ul className="socIndividualBox">
            {data.map((item, index) => (
              <ul key={index}>
                <div className="socActivityBox">
                  <li>{item.name}</li>
                  {/* <li>{item.description}</li> */}
                  {/* <li>{item.sport}</li> */}
                  {/* <li>{item.id}</li> */}
                </div>
              </ul>
            ))}
          </ul>
        </li>

        
        

      </ul>

    </div>
  );
};

export default Sports;
