import React, { useEffect, useState } from "react";

const useFetch = (url, method = "GET", body = null) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  // headers.append("Authorization", `Token ${token}`)
  let username = "admin";
  let password = "password";
  headers.set("Authorization", "Basic " + btoa(username + ":" + password));

  // let token = sessionStorage.getItem("token");
  // let headers = new Headers([
  //   ["Content-Type", "application/json"],
  //   ["Authorization", `Token ${token}`]
  // ])

  useEffect(() => {
    fetch(url, { method: method, body: body, headers: headers })
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
  }, []);

  let message = "";
  if (error) {
    message = <div>Error: {error.message}</div>;
  }

  return { isLoaded, data, message };
};

export default useFetch;
