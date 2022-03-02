import React from "react";
import { useNavigate } from "react-router-dom";

const SportsList = () => {
  let navigate = useNavigate();

  return (
    // Fetch a list of sports
    // Create a CSS grid of buttons like below using map?
    // Make the <button> part into a componenet

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
