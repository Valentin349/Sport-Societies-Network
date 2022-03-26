import React, { useState } from "react";
import "css/components/signIn.css";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginDetails = { username, password };
    let headers = new Headers({ "Content-Type": "application/json" });

    fetch("/api/login/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginDetails),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }

        return res.json();
      })
      .then((result) => {
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("userID", result.id);
        sessionStorage.setItem("username", username);
      })
      .then(() => {
        const prevPath = location.state?.from?.pathname || "/";
        navigate(prevPath);
      })
      .catch((error) => {
        setSignInError(JSON.parse(error.message));
      });
  };

  return (
    <div className="SignInLayout">
      <h1 className="SignInTitle">Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label>Enter username</label>
        <div className="centerRow">
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>

        <br></br>
        <label>Enter Password</label>
        <div className="centerRow">
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>

        <p className="signInError">{signInError.non_field_errors}</p>

        <div className="centerRow">
        <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
