import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isRouteAccessible, redirectTo = "/signin" }) => {
  return isRouteAccessible ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default ProtectedRoute;
