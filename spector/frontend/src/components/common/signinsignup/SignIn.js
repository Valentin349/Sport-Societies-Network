import React, { useState } from "react";
import "css/components/signIn.css";
import useFetch from "../../../hooks/useFetch";

const SignIn = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginDetails = { username, password };
    let headers = new Headers({ "Content-Type": "application/json" });

    fetch("/api/login/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginDetails),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          sessionStorage.setItem("token", result);
          setIsLoaded(true);
          console.log("Token retrieved");
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  };

  return (
    <div className="SignInLayout">
      <h1 className="SignInTitle">Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label>Enter username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Enter Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default SignIn;
