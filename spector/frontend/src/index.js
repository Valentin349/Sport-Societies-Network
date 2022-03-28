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
import ProtectedRoute from "./ProtectedRoute";
import "./css/components/forms.css"

// react renderer
ReactDOM.render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<SignInSignUp />} />

      <Route path="" element={<ProtectedRoute route={<NavBar />} />}>
        <Route path="/" element={<Home />} />
        <Route path="sports" element={<SportsList />} />
        <Route path="sports/:sportName" element={<Sports />} />
        <Route path="profile/:userID" element={<Profile />} />
      </Route>

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
