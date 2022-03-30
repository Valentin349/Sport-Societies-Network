import React, { useState } from "react";
import "css/home.css";
import useFetch from "../hooks/useFetch";
import ActivityPopup from "../components/common/activityPopup";

const Home = () => {
  const [, refresh] = useState();

  const userID = parseInt(sessionStorage.getItem("userID"));
  const token = sessionStorage.getItem("token");
  let headers = new Headers([
    ["Content-Type", "application/json"],
    ["Authorization", `Token ${token}`],
  ]);

  const HandleMembership = (isMember, index) => {
    let activity = data.activities[index];
    const username = sessionStorage.getItem("username");

    let headers = new Headers([
      ["Content-Type", "application/json"],
      ["Authorization", `Token ${token}`],
    ]);

    if (isMember) {
      activity.members = activity.members.filter((id) => id != userID);
      activity.membersName = activity.membersName.filter(
        (name) => name != username
      );
    } else {
      activity.members.push(userID);
      activity.membersName.push(username);
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
        window.location.reload();
      });
  };

  const HandleDelete = (isOwner, index) => {
    let activity = data.activities[index];

    if (isOwner) {
      fetch(`/api/activities/${activity.id}/`, {
        method: "DELETE",
        headers: headers,
      })
        .then((res) => res.text())
        .then(
          (result) => {
            console.log(result ? JSON.parse(result) : "Success");
            refresh({});
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const { isLoaded, data, message } = useFetch(`/api/profile/${userID}/`);

  if (!isLoaded) {
    return message;
  }

  return (
    <div className="homePageOuter">
      <h2 className="homePageTitle">Home Page</h2>

      <li className="homePageNotificationLayout">
        <ul className="Profile-IndividualBox">
          Joined Activities:
          {data.activities?.map((item, index) => (
            <li key={index}>
              <ActivityPopup
                HandleMembership={HandleMembership}
                HandleDelete={HandleDelete}
                index={index}
                {...item}
              />
            </li>
          ))}
        </ul>
      </li>
    </div>
  );
};

export default Home;
