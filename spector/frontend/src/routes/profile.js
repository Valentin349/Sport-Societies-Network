import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/profile.css";
import ActivityPopup from "../components/common/activityPopup";

const Profile = () => {
  let { userID } = useParams();
  const { isLoaded, data, message } = useFetch(`/api/profile/${userID}/`);

  const [, refresh] = useState();

  const token = sessionStorage.getItem("token");
  let headers = new Headers([
    ["Content-Type", "application/json"],
    ["Authorization", `Token ${token}`],
  ]);

  const HandleMembership = (isMember, index) => {
    let activity = data.activities[index];
    const userID = parseInt(sessionStorage.getItem("userID"));
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

  if (!isLoaded) {
    return message;
  }

  return (
    <div className="Profile-Items">
      <h2 className="Profile-Title">{data.name}</h2>
      <ul className="Profile-PageLayout">
        <li>
          <ul className="Profile-IndividualBox">
            <li>Name : {data.name}</li>
            <li>Age : {data.age}</li>
            <li>Bio : {data.bio}</li>
          </ul>
        </li>

        <li>
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
      </ul>
    </div>
  );
};

export default Profile;
