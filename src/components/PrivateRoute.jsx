import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

const PrivateRoute = () => {
  const { userInfo, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <Loader />;
  }
  return userInfo ? <Outlet/> : <Navigate to="/login" replace />;
  
};

export default PrivateRoute;
