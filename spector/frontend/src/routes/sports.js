import React from "react";
import { useParams } from "react-router-dom";

const Sports = () => {
  let { sportName } = useParams();
  console.log(sportName);

  return (
    <main>
      <h2>Welcome to the {sportName} page</h2>
    </main>
  );
};

export default Sports;
