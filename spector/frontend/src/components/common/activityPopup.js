import React from "react";
import Popup from "reactjs-popup";
import "css/activityPopup.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ActivityPopup = (props) => {
  //props.dateTime is in the ISO format in UTC (Z)
  //So display the time in the users timezone (toLocale)
  //When posting to the api use ISO

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
            <button className="button">Join</button>
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
