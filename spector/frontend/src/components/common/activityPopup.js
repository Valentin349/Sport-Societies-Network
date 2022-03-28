import React from "react";
import Popup from "reactjs-popup";
import "css/activityPopup.css";
import PropTypes from "prop-types";

const ActivityPopup = (props) => {
  //props.dateTime is in the ISO format in UTC (Z)
  //So display the time in the users timezone (toLocale)
  //When posting to the api use ISO

  return (
    <Popup
      trigger={
        <button className="button">
          {/* {props.name} */}
          <b>{props.name}</b> <br /> {new Date(props.startTime).toLocaleString()} || {props.members} / {props.maxMembers}
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
            <button className="button">Join</button>
          </div>
        </div>
      )}
    </Popup>
  );
};

ActivityPopup.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  startTime: PropTypes.string,
  creationTime: PropTypes.string,
  duration: PropTypes.string,
  maxMembers: PropTypes.number,
  owner: PropTypes.number,
  members: PropTypes.array,
};

export default ActivityPopup;
