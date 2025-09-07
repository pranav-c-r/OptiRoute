import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

// Import theme
import theme from './theme';

// Import authentication context
import { AuthProvider } from './contexts/AuthContext';

// Import layout component
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import HospitalResourceOptimizer from './pages/HospitalResourceOptimizer';
import DisasterReliefOptimizer from './pages/DisasterReliefOptimizer';
import HungerWasteOptimizer from './pages/HungerWasteOptimizer';
import SmartShelterAllocation from './pages/SmartShelterAllocation';

// Import role-specific components
import DoctorDashboard from './components/role/DoctorDashboard';
import HospitalAdminDashboard from './components/role/HospitalAdminDashboard';
import DemandForecasting from './components/DemandForecasting';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Navigate to="/dashboard" replace />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/hospital-optimizer" element={
              <ProtectedRoute>
                <Layout>
                  <HospitalResourceOptimizer />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/disaster-relief" element={
              <ProtectedRoute>
                <Layout>
                  <DisasterReliefOptimizer />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/hunger-waste" element={
              <ProtectedRoute>
                <Layout>
                  <HungerWasteOptimizer />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/shelter-allocation" element={
              <ProtectedRoute>
                <Layout>
                  <SmartShelterAllocation />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Role-specific routes */}
            <Route path="/doctor-dashboard" element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <Layout>
                  <DoctorDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/hospital-admin" element={
              <ProtectedRoute allowedRoles={["hospital_admin"]}>
                <Layout>
                  <HospitalAdminDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/demand-forecasting" element={
              <ProtectedRoute>
                <Layout>
                  <DemandForecasting />
                </Layout>
              </ProtectedRoute>
            } />
            
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
