import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0a1929'
      }}>
        <CircularProgress size={60} sx={{ color: '#1976d2', mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'white' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0a1929',
        p: 4
      }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
          Access Denied
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
          You don't have permission to access this page.
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', mt: 1 }}>
          Your role: {user.roleName}
        </Typography>
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;
