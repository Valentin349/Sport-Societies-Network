import React from "react";
import Popup from "reactjs-popup";
import "css/components/popup.css"
import "css/activityPopup.css";
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
        <button className="button">
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
            <Popup
              trigger={<button className="button"> 3/4 </button>}
              on="hover"
            >
              <div>
                {props.members.map((user, index) => (
                  <ul key={index}>
                    <Link to={`/profile/${user}`}>{user}</Link>
                  </ul>
                ))}
              </div>
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
