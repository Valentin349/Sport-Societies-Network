import React, { useDebugValue } from "react";
import Popup from "reactjs-popup";
import "css/components/popup.css"
import "css/activityPopup.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ActivityPopup = (props) => {
  //props.dateTime is in the ISO format in UTC (Z)
  //So display the time in the users timezone (toLocale)
  //When posting to the api use ISO
  const [isActive, setActive] = useState("false");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  const checkMember = () => {
    let userId = sessionStorage.getItem("userID");
    console.log(userId);
    console.log(props.members);
    if (props.members.includes(parseInt(userId))) {
      setActive(false);
    }
  };

  const JoinEvent = () => {
    setActive(!isActive);

    let userId = sessionStorage.getItem("userID");
    let token = sessionStorage.getItem("token");
    let headers = new Headers([
      ["Content-Type", "application/json"],
      ["Authorization", `Token ${token}`],
    ]);
    var body;
    //get will get the members field to check for membership before writing to it
    fetch(`/api/activities/${props.id}/`, {
      method: "GET",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
          console.log(result.members);
          let newMember = result.members;
          if (result.members.includes(parseInt(userId))) {
            newMember = newMember.filter((item) => item != parseInt(userId));
          } else {
            newMember.push(userId);
          }

          body = {
            members: newMember,
          };
          console.log(body);
          fetch(`/api/activities/${props.id}/`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: headers,
          })
            .then((res) => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setData(result);
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
            );
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  return (
    <Popup
      trigger={
        <button className="button">
          {/* {props.name} */}
          {props.name} || {new Date(props.startTime).toLocaleString()} ||{" "}
          {props.duration}
        </button>
      }
      onOpen={checkMember}
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
              className={isActive ? "button" : "buttonJoined"}
              onClick={JoinEvent}
              onLoad={checkMember}
            >
              {isActive ? "Join" : "Leave"}
            </button>
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
  id: PropTypes.number,
};

export default ActivityPopup;
