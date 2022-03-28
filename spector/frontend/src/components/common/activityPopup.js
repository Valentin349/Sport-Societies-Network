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
            <i>{"Location: "}</i> {props.description}
            <br />
            <i>{"Date and time: "}</i> {new Date(props.startTime).toUTCString()}
            <br />
            <i>{"Attendance: "}</i> {props.members} / {props.maxMembers}
            <br />
            <br />
            <i>{"Creation time: "}</i> {props.creationTime}
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
