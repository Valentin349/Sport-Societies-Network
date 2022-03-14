import React, { useState } from "react";
import "css/components/signIn.css";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${username} and password is: ${password}`)
    }

    return (
        <div className="SignInLayout">
            <h1 className="SignInTitle">Sign In</h1>

            <form onSubmit={handleSubmit}>
                <label>Enter username</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                
                <label>Enter Password</label>
                <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                <input type="submit" />
            </form>

        </div>
    );
};

export default SignIn;