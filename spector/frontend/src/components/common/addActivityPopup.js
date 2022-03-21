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
  const [maxNum, setMaxNum] = useState(minParticipants);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);

  const handleDurationChange = duration => {
    console.log(duration);
    setHours(duration.hours);
    setMins(duration.minutes);
    setSec(duration.seconds)
  };

  const handleStartChange = (date) => {
    setStart(date);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      let owner = "admin" //sessionStorage.username
      
      let username = "admin"; // TODO change to useFetch
      let password = "password";

      let duration = String(hours).padStart(2, "0") + ":" + String(mins).padStart(2, "0") + ":" + String(sec).padStart(2, "0")

      const jsonOut = {"members":[],
                       "owner":{"username":owner},  
                       "name":title,
                       "description":desc,
                       "startTime":startDate.toISOString(),
                       "duration":duration,
                       "maxMembers":maxNum,
                       "sport":"Football"};    // probably pass as argument

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.set("Authorization", "Basic " + btoa(username + ":" + password));
  
      console.log(jsonOut)

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
              <label className="popupHeader">Start Time</label>
              <div className="centerRow">
                <DateTimePicker className="center" onChange={handleStartChange} value={startDate} required/>
              </div>

              <br></br>
              <label className="popupHeader">Duration</label>
              <div className="centerRow">
                <DurationPicker onChange={handleDurationChange} initialDuration={{hours:0, minutes:5, seconds:0}} maxHours={24} required></DurationPicker>
              </div>

              <br></br>
              <label className="popupHeader">Maximum Participants</label>
              <div className="centerRow">
                <input
                  className="maxMemberInput"
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
              </div>
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

export default AddActivityPopup;