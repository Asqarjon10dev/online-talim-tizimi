// src/components/routes.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "../context/authSlice";

export function ProtectedRoute({ children }) {
  const isAuth = useSelector(selectIsAuthenticated);
  const loc = useLocation();
  return isAuth ? children : <Navigate to="/login" replace state={{ from: loc }} />;
}

export function GuestRoute({ children }) {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? <Navigate to="/" replace /> : children;
}
