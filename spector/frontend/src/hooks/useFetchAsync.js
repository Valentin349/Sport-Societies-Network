import React, { useEffect, useState } from "react";

const useFetch = (url, method = "GET", body = null) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  let token = sessionStorage.getItem("token");
  let headers = new Headers([
    ["Content-Type", "application/json"],
    ["Authorization", `Token ${token}`],
  ]);

  useEffect(async () => {
    try {
      const response = await fetch(url, {
        method: method,
        body: body,
        headers: headers,
      });
      const data = await response.json();
      setData(data);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
      setIsLoaded(true);
    }
  }, []);

  let message = "";
  if (error) {
    message = <div>Error: {error.message}</div>;
  }

  return { isLoaded, data, message };
};

export default useFetch;
