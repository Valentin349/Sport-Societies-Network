import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/profile.css";
import ActivityPopup from "../components/common/activityPopup";

const Profile = () => {
  let { userID } = useParams();

  const { isLoaded, data, message } = useFetch(`/api/profile/${userID}/`);

  if (!isLoaded) {
    return message;
  }

  return (
    <div className="Profile-Items">
      <h2 className="Profile-Title"> Profile Page</h2>
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
                <ActivityPopup {...item} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
