import { Navigate } from "react-router-dom";
import isAuthenticated from "../Utils/isAuthenticated";
import React from "react";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
