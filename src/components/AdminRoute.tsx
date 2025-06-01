import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AdminRoute: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;