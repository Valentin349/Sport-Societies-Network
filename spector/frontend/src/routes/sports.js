import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/sports.css";
import ActivityPopup from "../components/common/activityPopup";

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
        <div className="socIndividualBox">Details ...</div>

        <li>
          <ul className="socIndividualBox">
            {data.map((item, index) => (
              <ul key={index}>
                <ActivityPopup {...item} />
              </ul>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sports;
