import React from "react";
import Popup from "reactjs-popup";
import "css/activityPopup.css";
import PropTypes from "prop-types";
import { useState } from "react";

const ActivityPopup = (props) => {
  const userID = parseInt(sessionStorage.getItem("userID"));

  const [isMember, setIsMember] = useState(props.members.includes(userID));

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

  const HandleMembership = () => {
    props.HandleMembership(isMember, props.index);
    setIsMember((isMember) => !isMember);
  };

  return (
    <Popup
      trigger={
        <button className="button">
          {props.name} || {new Date(props.startTime).toLocaleString()} ||{" "}
          {props.duration}
        </button>
      }
      modal
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
              className={isMember ? "leaveButton" : "button"}
              onClick={() => HandleMembership()}
              disabled={props.members.length >= props.maxMembers && !isMember}
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
  HandleMembership: PropTypes.func,
  index: PropTypes.number,
};

export default ActivityPopup;
