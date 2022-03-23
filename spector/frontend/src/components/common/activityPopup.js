import React from "react";
import Popup from "reactjs-popup";
import "css/activityPopup.css";
import PropTypes from "prop-types";
import { useState } from "react";

const ActivityPopup = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  const userID = parseInt(sessionStorage.getItem("userID"));
  const [isMember, setIsMember] = useState(() =>
    props.members.includes(userID)
  );

  const [isOwner, setIsOwner] = useState(
    () => parseInt(props.owner) == parseInt(userID) || parseInt(userID) == 1
  );

  const HandleDelete = () => {
    const token = sessionStorage.getItem("token");

    let headers = new Headers([
      ["Content-Type", "application/json"],
      ["Authorization", `Token ${token}`],
    ]);

    if (isOwner) {
      fetch(`/api/activities/${props.id}/`, {
        method: "DELETE",
        headers: headers,
      })
        .then((res) => res.text())
        .then(
          (result) => {
            console.log(result ? JSON.parse(result) : "Success");
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };
  const HandleClick = () => {
    const token = sessionStorage.getItem("token");

    let headers = new Headers([
      ["Content-Type", "application/json"],
      ["Authorization", `Token ${token}`],
    ]);

    let body;
    if (isMember) {
      body = { members: props.members.filter((id) => id != userID) };
    } else {
      props.members.push(userID);
      body = { members: props.members };
    }

    fetch(`/api/activities/${props.id}/`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
          setIsMember((isMember) => !isMember);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );

    // Changing a state variable of sports.js to reload the component
    // Means don't need to toggle isMember because setIsMember will be run on reload
    props.reloadActivities({});
  };

  return (
    <Popup
      trigger={
        <button className="button">
          {/* {props.name} */}
          {props.name} || {new Date(props.startTime).toLocaleString()} ||{" "}
          {props.duration}
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <a className="close" onClick={close}>
            &times;
          </a>
          <div className="header">{props.name}</div>
          <div className="content">
            {props.description}
            <br />
            {props.startTime}
            <br />
            {new Date(props.startTime).toUTCString()}
            <br />
            {new Date(props.startTime).toDateString()}
            <br />
            {new Date(props.startTime).toTimeString()}
            <br />
            {new Date(props.startTime).toLocaleString()}
            <br />
            {new Date(props.startTime).toLocaleDateString()}
            <br />
            {new Date(props.startTime).toLocaleTimeString()}
            <br />
            <br />
            {props.creationTime}
          </div>
          <div className="actions">
            <button
              className={isMember ? "buttonJoined" : "button"}
              onClick={HandleClick}
            >
              {isMember ? "Leave" : "Join"}
            </button>
            <button
              className={isOwner ? "button" : "deleteButtonNotOwner"}
              onClick={HandleDelete}
            >
              Delete Activity
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

ActivityPopup.propTypes = {
  id: PropTypes.number,
  members: PropTypes.array,
  membersName: PropTypes.array,
  owner: PropTypes.number,
  ownerName: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  startTime: PropTypes.string,
  creationTime: PropTypes.string,
  duration: PropTypes.string,
  maxMembers: PropTypes.number,
  sport: PropTypes.string,
  reloadActivities: PropTypes.func,
};

export default ActivityPopup;
