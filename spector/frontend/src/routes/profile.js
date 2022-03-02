import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  let { username } = useParams();

  return (
    <div>
      <h2>Welcome to the profile page of {username}</h2>
    </div>
  );
};

export default Profile;
