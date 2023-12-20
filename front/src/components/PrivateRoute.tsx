import LoginContext from "contexts/LoginContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom"

interface PrivateRouteProps {
  children: React.ReactNode;
  redirect: string;
}

export default function ProtectedRoute({ redirect, children }: PrivateRouteProps) {
  const {isLoggedIn} = React.useContext(LoginContext);
 if (!isLoggedIn) {
  return <Navigate to={redirect} />
 }
 return children ? children : <Outlet />
}