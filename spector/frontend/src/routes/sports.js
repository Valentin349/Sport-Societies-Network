import React from "react";
import { useParams } from "react-router-dom";

const Sports = () => {
  let { sportName } = useParams();

  // Api fetch/call to get sport info (events)

  return (
    <main>
      <h2>Welcome to the {sportName} page</h2>
    </main>
  );
};

export default Sports;
