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

  // If allowedRoles is specified and user role is not allowed, show access denied with current role
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          color: '#f44336',
          fontFamily: 'Poppins',
          fontSize: '1.5rem',
          fontWeight: 600,
        }}
      >
        Access Denied
        <br />
        <span
          style={{
            fontSize: '1rem',
            color: '#888',
            marginTop: 8,
          }}
        >
          You do not have permission to view this page.
          <br />
          <span
            style={{
              color: '#1976d2',
              fontWeight: 500,
            }}
          >
            Current Role: {user.role}
          </span>
        </span>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;