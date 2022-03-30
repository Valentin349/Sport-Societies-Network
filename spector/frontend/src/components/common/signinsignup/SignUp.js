import React, { useState } from "react";
import "css/components/signUp.css";
import { useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginDetails = { email, username, password };
    let headers = new Headers({ "Content-Type": "application/json" });

    fetch("/api/register/", {
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

        let headers = new Headers([
          ["Content-Type", "application/json"],
          ["Authorization", `Token ${result.token}`],
        ]);

        const jsonOut = {
          owner: result.id,
          name: username,
          bio: "bio",
          age: 18,
        };

        fetch("/api/profile/", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(jsonOut),
        });
      })
      .then(() => {
        const prevPath = location.state?.from?.pathname || "/";
        navigate(prevPath);
      })
      .catch((error) => {
        setSignUpError(JSON.parse(error.message));
      });
  };

  return (
    <div className="SignUpLayout">
      <h1 className="SignUpTitle">Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label>Enter email</label>
        <div className="centerRow">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p className="signUpError"> {signUpError.email}</p>

        <label>Enter username</label>
        <div className="centerRow">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <p className="signUpError"> {signUpError.username}</p>

        <label>Enter Password</label>
        <div className="centerRow">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="signUpError"> {signUpError.password}</p>

        <div className="centerRow">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
