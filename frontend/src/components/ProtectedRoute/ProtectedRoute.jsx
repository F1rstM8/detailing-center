import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // 1. Если вообще не авторизован — кидаем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Если роли не совпадают с разрешенными — кидаем на главную
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // 3. Если всё ок — пропускаем к контенту (Outlet рендерит дочерние роуты)
  return <Outlet />;
};

export default ProtectedRoute;