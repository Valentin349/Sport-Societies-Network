import React, { useState } from "react";
import "css/components/signUp.css";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Email: ${email} name: ${username} password: ${password}`)
    }

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

export default SignUp;