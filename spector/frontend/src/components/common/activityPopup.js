import React from "react";
import Popup from "reactjs-popup";
import "css/activityPopup.css";
import PropTypes from "prop-types";

const ActivityPopup = (props) => (
  <Popup trigger={<button className="button">{props.name}</button>} modal>
    {(close) => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header">{props.name}</div>
        <div className="content">{props.description}</div>
        <div className="actions">
          <button className="button">Join</button>
        </div>
      </div>
    )}
  </Popup>
);

ActivityPopup.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
};

export default ActivityPopup;
