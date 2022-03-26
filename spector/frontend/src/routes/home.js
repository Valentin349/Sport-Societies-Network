import React from "react";
import "css/home.css";
import useFetch from "../hooks/useFetch";
import ActivityPopup from "../components/common/activityPopup";

const Home = () => {
  let userID = sessionStorage.getItem("userID");

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
              <ActivityPopup {...item} />
            </li>
          ))}
        </ul>
      </li>
    </div>
  );
};

export default Home;
