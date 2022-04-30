import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Button from "../button";
import "css/components/NavBar.css";
import { useNavigate } from "react-router";
import Popup from "reactjs-popup";
import ActivityPopup from "../activityPopup";

const NavBar = () => {
  const [, refresh] = useState();
  const [data, setData] = useState([]);

  let navigate = useNavigate();

  const userID = parseInt(sessionStorage.getItem("userID"));
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");
  let headers = new Headers([
    ["Content-Type", "application/json"],
    ["Authorization", `Token ${token}`],
  ]);

  const HandleMembership = (isMember, index) => {
    let activity = data.activities[index];

    if (isMember) {
      activity.members = activity.members.filter((id) => id != userID);
      activity.membersName = activity.membersName.filter(
        (name) => name != username
      );
    } else {
      activity.members.push(userID);
      activity.membersName.push(username);
    }
    let body = { members: activity.members };

    fetch(`/api/activities/${activity.id}/`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        return res.json();
      })
      .then(() => {
        refresh({});
      })
      .catch((error) => {
        console.log(JSON.parse(error.message));
        window.location.reload();
      });
  };

  const HandleDelete = (isOwner, index) => {
    let activity = data.activities[index];

    if (isOwner) {
      fetch(`/api/activities/${activity.id}/`, {
        method: "DELETE",
        headers: headers,
      })
        .then((res) => res.text())
        .then(
          (result) => {
            console.log(result ? JSON.parse(result) : "Success");
            refresh({});
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  function handleClick() {
    navigate("/profile/" + userID);
  }

  function test() {
    fetch(`/api/profile/${userID}/`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }

  return (
    <>
      <nav className="NavBar-Items">
        <h1 className="navbar-logo">Spector</h1>

        <div>
          <Popup
            trigger={<span className="NavBar-UserActivities">{username}</span>}
            // modal
            on={"hover"}
            nested
            onOpen={() => test()}
          >
            {(close) => (
              <ul className="NavBar-Activity-DropDown">
                {data.activities?.map((item, index) => (
                  <li key={index}>
                    <ActivityPopup
                      HandleMembership={HandleMembership}
                      HandleDelete={HandleDelete}
                      Close={close}
                      index={index}
                      {...item}
                    />
                  </li>
                ))}
              </ul>
            )}
          </Popup>
        </div>
        <div className="NavBar-Options">
          <NavLink to="/" className="NavBar-Links" end>
            Sports
          </NavLink>
          <Button onClick={handleClick}> Profile</Button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
