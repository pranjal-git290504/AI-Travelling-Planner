import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ currentUser = null, isLoggingOut = false } = {}) => {
  if (!currentUser && !isLoggingOut) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
