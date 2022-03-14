import React, { useState } from "react";
import Button from "../components/common/Button";
import SignIn from "../components/common/signinsignup/SignIn";
import SignUp from "../components/common/signinsignup/SignUp";
import "css/signInSignUp.css";

const SignInSignUp = () => {
  const [signin, setSignin] = useState(true);
  
  const SignInclickHandler = () => {
            
  };


  return (
    <div className="signInSignUpPage">
        {!signin ? <SignIn /> : <SignUp />}
        <Button onClick={() => setSignin(s => !s)}>Sign In/Sign Up</Button>
    </div>
  );
};

export default SignInSignUp;
