import React from "react";
import Popup from "reactjs-popup";
import "css/components/popup.css";
import "css/activityPopup.css";
import "css/components/tooltipPopup.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";

const ActivityPopup = (props) => {
  const userID = parseInt(sessionStorage.getItem("userID"));
  const creationTime = new Date(props.creationTime);
  const startTime = new Date(props.startTime);
  const duration = props.duration.split(":");
  const hrs = parseInt(duration[0]);
  const mins = parseInt(duration[1]);

  const [isMember, setIsMember] = useState(props.members.includes(userID));

  const [isOwner] = useState(
    parseInt(props.owner) == parseInt(userID) || parseInt(userID) == 1
  );

  const HandleDelete = () => {
    props.HandleDelete(isOwner, props.index);
    window.location.reload();
  };

  const HandleMembership = () => {
    props.HandleMembership(isMember, props.index);
    setIsMember((isMember) => !isMember);
  };

  return (
    <Popup
      trigger={
        <button className="activityButton">
          <b>{props.name}</b> <br />{" "}
          {new Date(props.startTime).toLocaleString()} || {props.members.length}{" "}
          / {props.maxMembers}
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
            <p className="title">When? </p>
            {startTime.toLocaleDateString()} {" at "}
            {startTime.toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
              minute: "2-digit",
            })}{" "}
            <br />
            <br />
            <p className="title">Duration: </p>
            {hrs}hr{hrs == 1 ? " " : "s "}
            {mins}min{mins == 1 ? "" : "s"}
            <br />
            <br />
            <p className="title">Description: </p>
            {props.description}
            <br />
            <br />
            <p className="title">Creation Time: </p>
            Created by{" "}
            <Link className="participantLink" to={`/profile/${props.owner}`}>
              {props.ownerName}
            </Link>{" "}
            on {creationTime.toLocaleDateString()} at{" "}
            {creationTime.toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
              minute: "2-digit",
            })}{" "}
            <br />
            <br />
          </div>
          <div className="actions">
            <button
              className={isMember ? "actionButton leaveButton" : "actionButton"}
              onClick={() => HandleMembership()}
              disabled={props.members.length >= props.maxMembers && !isMember}
            >
              {isMember ? "Leave" : "Join"}
            </button>
            {isOwner && (
              <button className="actionButton" onClick={HandleDelete}>
                Delete Activity
              </button>
            )}
            <Popup
              trigger={
                <span className="participantCount">
                  {props.members.length} / {props.maxMembers}
                </span>
              }
              on="hover"
              disabled={props.members.length == 0}
              position="right center"
              className="participant"
            >
              {props.members.map((user, index) => (
                <ul key={index}>
                  <Link className="participantLink" to={`/profile/${user}`}>
                    {props.membersName[index]}
                  </Link>
                </ul>
              ))}
            </Popup>
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
  HandleDelete: PropTypes.func,
  index: PropTypes.number,
};

export default ActivityPopup;
