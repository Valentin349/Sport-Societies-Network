import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/fonts.css";
import NavBar from "./components/common/navbar/NavBar";
import SignInSignUp from "./routes/signInSignUp";
import Home from "./routes/home";
import SportsList from "./routes/sportsList";
import Sports from "./routes/sports";
import Profile from "./routes/profile";

// react renderer
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignInSignUp />} />
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="sports" element={<><NavBar /><SportsList /></>} />
      <Route path="sports/:sportName" element={<><NavBar /><Sports /></>} />
      <Route path="profile/:username" element={<><NavBar /><Profile /></>} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There&apos;s nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("app")
);
