import React, { useState } from "react";
import "css/components/signIn.css";
import useFetch from "../../../hooks/useFetch";

const SignIn = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        // put req /api/login autenticate it with true/false 
        const loginDetails = {username, password};
        setIsLoaded(true);

        // let headers = new Headers();
        // headers.append("Content-Type", "application/json");

        // fetch('/api/login/', {
        //     method: "POST", 
        //     headers: headers,
        //     body: JSON.stringify(loginDetails)
        // }).then((res) => res.json())
        // .then(
        //   (result) => {
        //     setIsLoaded(true);
        //     setData(result);
        //   },
        //   (error) => {
        //     setIsLoaded(true);
        //     setError(error);
        //   }
        // );
        // if(!error){
        //     console.log("works");
        // }

        useFetch('/api/login/', "POST", JSON.stringify(loginDetails));
        
            
    
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