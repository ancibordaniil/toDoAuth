import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../app/store";
import React from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) {
    return <div>Загрузка...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
