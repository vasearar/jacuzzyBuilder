import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./simpleAuth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!isLoggedIn()) {
    return <Navigate to="/configurator-login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
