import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "css/profile.css";
import ActivityPopup from "../components/common/activityPopup";



const Profile = () => {

  let { userID } = useParams();
  const { isLoaded, data, message } = useFetch(`/api/profile/?id=2`);
  
  if (!isLoaded) {
    return message;
  }

  return (
    <nav className = "ProfileItems">
      <h2 className="ProfileTittle"> Profile Page</h2>
        <ul className = "ba">
          {data.map((item, index) => (
            <li key={index}>
              Name : {item.name}<br/>
              Age : {item.age}<br/>
              Bio : {item.bio}<br/>
            </li>
          ))}
          {data.map((item, index) => (
              <li key={index}>
                <ActivityPopup {...item} />
              </li>
            ))}

        </ul>


    
    </nav>
  );
};

export default Profile;
