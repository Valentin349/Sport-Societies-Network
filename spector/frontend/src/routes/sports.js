import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/sports.css";
import ActivityPopup from "../components/common/activityPopup";

const Sports = () => {
  let { sportName } = useParams();
  const [, refresh] = useState();

  const HandleMembership = (isMember, index) => {
    let activity = data[index];
    const token = sessionStorage.getItem("token");
    const userID = parseInt(sessionStorage.getItem("userID"));

    let headers = new Headers([
      ["Content-Type", "application/json"],
      ["Authorization", `Token ${token}`],
    ]);

    if (isMember) {
      activity.members = activity.members.filter((id) => id != userID);
    } else {
      activity.members.push(userID);
    }
    let body = { members: activity.members };

    fetch(`/api/activities/${activity.id}/`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        return res.json();
      })
      .then(() => {
        refresh({});
      })
      .catch((error) => {
        console.log(JSON.parse(error.message));
      });
  };

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
                <ActivityPopup
                  HandleMembership={HandleMembership}
                  index={index}
                  {...item}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sports;
