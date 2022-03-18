import React, { useState } from "react";
import Popup from "reactjs-popup";
import "css/components/popup.css"
import "css/addActivityPopup.css";
import DateTimePicker from 'react-datetime-picker'

const AddActivityPopup = () => {
  const minParticipants = 1;

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [startDate, setStart] = useState(new Date());
  const [endDate, setEnd] = useState(new Date());
  const [maxNum, setMaxNum] = useState(minParticipants);

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
                onChange={e => setTitle(e.target.value)}
                value={title}
                placeholder="Give your event a name here!"
              />

              <br></br><br></br>
              <label className="popupHeader">Description</label>
              <textarea
                className="descBox"
                required
                onChange={e => setDesc(e.target.value)}
                value={desc}
                placeholder="Add useful information about your event here. For example: Where is it hosted? What do participants need to bring?"
              ></textarea>

              <br></br>
              <div>
                <label className="popupHeader">Start Time</label>
                <DateTimePicker onChange={handleStartChange} value={startDate} required/>
                <label className="popupHeader">End Time</label>
                <DateTimePicker onChange={handleEndChange} value={endDate} required/>
              </div>

              <br></br>
              <label className="popupHeader">Maximum Participants</label>
              <input
                type="number"
                onChange={e => setMaxNum(e.target.value)}
                value={maxNum}
                min={minParticipants.toString()}
                required
              ></input>
              
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