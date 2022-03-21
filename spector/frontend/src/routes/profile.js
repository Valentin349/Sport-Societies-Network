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
    <nav className = "ProfileItems">
      <h2 className="ProfileTittle"> Profile Page</h2>
        <ul className = "ba">

              Name : {data.name}<br/>
              Age : {data.age}<br/>
              Bio : {data.bio}<br/>
               <br/>
              {data.activities?.map((item, index) => (
                <p key={index}>
                  <ActivityPopup {...item} />
                </p>
            ))}
        </ul>


    
    </nav>
  );
};

export default Profile;

