import React from "react";
import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
  isAccessible: boolean;
  children: React.ReactNode;
  redirectPath: string;
}

const ProtectedRoute = ({
  isAccessible,
  redirectPath = '/login',
  children,
}: PrivateRouteProps) => {
  if (!isAccessible) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;