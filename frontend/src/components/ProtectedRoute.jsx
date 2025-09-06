import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If no specific roles are required, allow access
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user's role is in the allowed roles
  if (allowedRoles.includes(user.role)) {
    return children;
  }

  // If user doesn't have access, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;