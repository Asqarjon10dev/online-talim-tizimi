import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireRole({ allow }) {
  const role = useSelector((s) => s.auth.role);
  if (!allow.includes(role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
