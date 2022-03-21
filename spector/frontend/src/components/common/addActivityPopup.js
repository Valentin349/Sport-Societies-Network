import React, { useState } from "react";
import Popup from "reactjs-popup";
import "css/components/popup.css"
import "css/addActivityPopup.css";
import DateTimePicker from 'react-datetime-picker'
import DurationPicker from 'react-duration-picker'

const AddActivityPopup = (name) => {
  const minParticipants = 1;

  const sportName = name.sportName;

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [startDate, setStart] = useState(new Date());
  const [maxNum, setMaxNum] = useState(minParticipants);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const [doAutoJoin, setAutoJoin] = useState(false);

  const handleDurationChange = duration => {
    setHours(duration.hours);
    setMins(duration.minutes);
    setSec(duration.seconds)
  };

  const handleStartChange = (date) => {
    setStart(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      let token = sessionStorage.getItem("token");
      let headers = new Headers([
        ["Content-Type", "application/json"],
        ["Authorization", `Token ${token}`],
      ]);

      let messageString = []
      if (doAutoJoin) {
        messageString.push(sessionStorage.userID);
      }

      let duration = String(hours).padStart(2, "0") + ":" + String(mins).padStart(2, "0") + ":" + String(sec).padStart(2, "0")
      // TODO add member if selected!
      const jsonOut = {"members":messageString,
                       "name":title,
                       "description":desc,
                       "startTime":startDate.toISOString(),
                       "duration":duration,
                       "maxMembers":maxNum,
                       "sport":sportName};    // probably pass as argument
  
      

      console.log(JSON.stringify(jsonOut));

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
              <label>Title</label>
              <div className="centerRow">
                <input
                  type="text"
                  required
                  className="titleBox"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  placeholder="Give your event a name here!"
                />
              </div>

              <br></br><br></br>
              <label>Description</label>
              <div className="centerRow">
              <textarea
                className="descBox"
                required
                onChange={e => setDesc(e.target.value)}
                value={desc}
                placeholder="Add useful information about your event here. For example: Where is it hosted? What do participants need to bring?"
              ></textarea>
              </div>

              <br></br>
              <label>Start Time</label>
              <div className="centerRow">
                <DateTimePicker className="center" onChange={handleStartChange} value={startDate} required/>
              </div>

              <br></br>
              <label>Duration</label>
              <div className="centerRow">
                <DurationPicker onChange={handleDurationChange} initialDuration={{hours:0, minutes:5, seconds:0}} maxHours={24} required></DurationPicker>
              </div>

              <br></br>
              <label>Maximum Participants</label>
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
                  onChange={e => setAutoJoin(e.target.value)}
                ></input>
                <p>Join as Participant</p>
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