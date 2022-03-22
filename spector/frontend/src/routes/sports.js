import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/sports.css";
import ActivityPopup from "../components/common/activityPopup";

const Sports = () => {
  const [, reloadActivities] = useState(null);

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
        {/* Detail box */}
        <div className="socIndividualBox">Details ...</div>

        {/* Activities box */}
        <li>
          <ul className="socIndividualBox">
            Events...
            {data.map((item, index) => (
              <li key={index}>
                <ActivityPopup reloadActivities={reloadActivities} {...item} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sports;
