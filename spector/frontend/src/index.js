import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Sports from "./routes/sports";

// react renderer
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sports" element={<Sports />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("app")
);
