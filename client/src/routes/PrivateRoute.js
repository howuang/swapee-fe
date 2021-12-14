import React from "react";
import {  Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();
  if (!isAuthenticated) {
    return  <Navigate to="/signup" state={{from: location}}/>;
  }
  return children
};

export default PrivateRoute;
