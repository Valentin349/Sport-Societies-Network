import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Sports = () => {
  let { sportName } = useParams();

  const { isLoaded, data, message } = useFetch(
    `/api/activities/?sport=${sportName}`
  );

  if (!isLoaded) {
    return message;
  }

  return (
    <main>
      <h2>Welcome to the {sportName} page</h2>
      <ul>
        {data.map((item, index) => (
          <ul key={index}>
            <li>{item.name}</li>
            <li>{item.description}</li>
            <li>{item.sport}</li>
            <li>{item.id}</li>
          </ul>
        ))}
      </ul>
    </main>
  );
};

export default Sports;
