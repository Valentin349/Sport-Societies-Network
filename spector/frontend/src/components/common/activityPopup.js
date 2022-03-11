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
          {props.name} || {new Date(props.dateTime).toLocaleString()}
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
            {props.dateTime}
            <br />
            {new Date(props.dateTime).toUTCString()}
            <br />
            {new Date(props.dateTime).toDateString()}
            <br />
            {new Date(props.dateTime).toTimeString()}
            <br />
            {new Date(props.dateTime).toLocaleString()}
            <br />
            {new Date(props.dateTime).toLocaleDateString()}
            <br />
            {new Date(props.dateTime).toLocaleTimeString()}
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
  dateTime: PropTypes.string,
};

export default ActivityPopup;
