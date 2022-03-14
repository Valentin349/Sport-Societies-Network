import React, { useState } from "react";
import Popup from "reactjs-popup";
import "css/addActivityPopup.css";
import DateTimePicker from 'react-datetime-picker'

const AddActivityPopup = () => {
  const [startDate, setStart] = useState(new Date());
  const [endDate, setEnd] = useState(new Date());

  /* TODO - handle null better (disable x button?), datetime-range-picker  */

  const handleStartChange = (date) => {
    if (endDate < date | endDate == null) {
        setEnd(date);
    };
    setStart(date);
  };

  const handleEndChange = (date) => {
    if (startDate > date | startDate == null) {
        setStart(date);
    };
    setEnd(date);
  };

  return (
    <Popup
      trigger={
        <button className="buttonAdd">
          Add a New Event...
        </button>
      }
      modal
    >
      {(close) => (
        <div className="modal">
          <a className="close" onClick={close}>
            &times;
          </a>
          <div className="header">New Event</div>
          <div className="content">
            <form>
              <label className="popupHeader">Title</label>
              <input
                type="text"
                required
                className="titleBox"
              />
              <br></br><br></br>
              <label className="popupHeader">Description</label>
              <textarea className="descBox" required></textarea>
              <br></br>
              <div>
                <label className="popupHeader">Start Time</label>
                <DateTimePicker onChange={handleStartChange} value={startDate} required/>
                <label className="popupHeader">End Time</label>
                <DateTimePicker onChange={handleEndChange} value={endDate} required/>
              </div>
              
          </form>
          </div>
          
          <div className="actions">
            <button className="buttonJoin">Add</button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddActivityPopup;