import React from "react";
import "css/home.css";

const Home = () => {
  return (
    <div className="homePageOuter">
      <h2 className="homePageTitle">Home Page</h2>

      <li className="homePageNotificationLayout">
        <ul className="homepageNotification">Notification1</ul>
        <ul className="homepageNotification">Notification2</ul>
      </li>

    </div>
  );
};

export default Home;
