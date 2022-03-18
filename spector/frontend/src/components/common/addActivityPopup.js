import React, { useState } from "react";
import Popup from "reactjs-popup";
import "css/components/popup.css"
import "css/addActivityPopup.css";
import DateTimePicker from 'react-datetime-picker'
import DurationPicker from 'react-duration-picker'

const AddActivityPopup = () => {
  const minParticipants = 1;

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [startDate, setStart] = useState(new Date());
  const [endDate, setEnd] = useState(new Date());
  const [maxNum, setMaxNum] = useState(minParticipants);

  /* TODO - handle null better (disable x button?), datetime-range-picker  */

  const onChange = duration => {
    const { hours, minutes, seconds } = duration;
    setState({ hours, minutes, seconds });
  };

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

  const handleSubmit = (event) => {
      event.preventDefault();
      let owner = "admin" //sessionStorage.username
      let username = "admin"; // TODO change to useFetch
      let password = "password";

      const jsonOut = {"members":[],
                       "owner":{"username":{owner}},  
                       "name":title,
                       "description":desc,
                       "startTime":startDate.toISOString(),
                       "duration":"00:00:01",
                       "maxMembers":maxNum,
                       "sport":"Football"};    // probably pass as argument

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.set("Authorization", "Basic " + btoa(username + ":" + password));
  
      fetch("/api/activities/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(jsonOut),
      })
        .then((res) => {
          if (!res.ok) {
            console.log(res.json());
          }
          
        })
        .then((result) => {
          console.log("Activity posted");
          console.log(result)
        })
        .catch((error) => {
          console.log(error.message);
        });
  }

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
            <form onSubmit={handleSubmit} id="activityForm">
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

              <br></br>
              <label className="popupHeader">Maximum Participants</label>
              <input
                type="number"
                onChange={e => setMaxNum(e.target.value)}
                value={maxNum}
                min={minParticipants.toString()}
                required
              ></input>

              <br></br>
              <input
                type="checkbox"
                value="yes"
                name="joinAsMember"
                id="joinAsMember"
              ></input>
              <label htmlFor="joinAsMember">Join as Participant</label>
          </form>
          </div>
          
          <div className="actions">
            <button type="submit" className="buttonJoin" form="activityForm">Add</button>
          </div>

          
        </div>
      )}
    </Popup>
  );
};

/* TODO extract to common?
AddActivityPopup.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  startTime: PropTypes.string,
  creationTime: PropTypes.string,
  duration: PropTypes.string,
  maxMembers: PropTypes.number,
  owner: PropTypes.number,
  members: PropTypes.array,
};  */

export default AddActivityPopup;