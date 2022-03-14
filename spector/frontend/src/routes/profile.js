import React from "react";
//import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/profile.css";




const Profile = () => {

  const { isLoaded, data, message } = useFetch("/api/profile/");
  
  //let { username } = useParams();

  if (!isLoaded) {
    return message;
  }

  return (
    <nav className = "ProfileItems">
      <h2 className="ProfileTittle"> Profile Page</h2>
        <ul class = "ba">
          {data.map((item, index) => (
            <li key={index}>
                Name : {item.name}<br/>
                Bio : {item.bio}<br/>
                Age : {item.age}<br/>
                
            </li>
          ))}
        </ul>


    
    </nav>
  );
};

export default Profile;
