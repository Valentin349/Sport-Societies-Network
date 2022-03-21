import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/profile.css";




const Profile = () => {

  let { userID } = useParams();
  const { isLoaded, data, message } = useFetch(`/api/profile/?id=${userID}`);
  
  if (!isLoaded) {
    return message;
  }

  return (
    <nav className = "ProfileItems">
      <h2 className="ProfileTittle"> Profile Page</h2>
        <ul className = "ba">
          hello
          {data.map((item, index) => (
            <li key={index}>
              Name : {item.username}<br/>
            </li>
          ))}
        </ul>


    
    </nav>
  );
};

export default Profile;
