import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ route }) => {
  let token = sessionStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return route;
};

export default ProtectedRoute;
