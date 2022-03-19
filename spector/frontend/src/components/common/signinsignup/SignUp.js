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
              res.text().then(text => setSignUpError(JSON.parse(text))); 
            }
            return res.json(); 
          })
          .then((result) => {
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("userID", result.id);
            sessionStorage.setItem("username", username);
            // setIsLoaded(true);
            // setError(null);

            console.log("Token retrieved");
          })
          .then(() => {
            const prevPath = location.state?.from?.pathname || "/";
            navigate(prevPath);
          })
          .catch((error) => {
            console.log(error.message);

            // setIsLoaded(true);
            // setError(error.message);
          });

        };

    return (
        <div className="SignUpLayout">
            <h1 className="SignUpTitle">Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <label>Enter email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <p className="signUpError"> { signUpError.email }</p>

                <label>Enter username</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                <p className="signUpError"> { signUpError.username }</p>
                
                <label>Enter Password</label>
                <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <p className="signUpError"> { signUpError.password }</p>

                <input type="submit" />
                
            </form>

        </div>
    );
};

export default SignUp;