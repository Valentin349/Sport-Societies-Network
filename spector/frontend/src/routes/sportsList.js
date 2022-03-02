import React from "react";
import { useNavigate } from "react-router-dom";

const SportsList = () => {
  let navigate = useNavigate();

  return (
    // CSS Grid of buttons
    // onClick -> useNavigate to sports/____
    <main>
      <h2>Sports Page</h2>
      <button
        onClick={() => {
          navigate("./hockey");
        }}
      >
        Hockey
      </button>
    </main>
  );
};

export default SportsList;
