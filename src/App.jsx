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
import HospitalOrchestrator from './pages/HospitalOrchestrator';
import ReliefPlanner from './pages/ReliefPlanner';

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
              <ProtectedRoute allowedRoles={['doctor', 'nurse', 'hospital_admin', 'ambulance_driver']}>
                <Layout>
                  <HospitalResourceOptimizer />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/disaster-relief" element={
              <ProtectedRoute allowedRoles={['relief_volunteer', 'ngo', 'logistics_driver', 'hospital_admin']}>
                <Layout>
                  <DisasterReliefOptimizer />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/hunger-waste" element={
              <ProtectedRoute allowedRoles={['farmer', 'warehouse_manager', 'ngo', 'logistics_driver', 'relief_volunteer']}>
                <Layout>
                  <HungerWasteOptimizer />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/shelter-allocation" element={
              <ProtectedRoute allowedRoles={['shelter_manager', 'housing_authority', 'landlord', 'ngo', 'relief_volunteer']}>
                <Layout>
                  <SmartShelterAllocation />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/hospital-orchestrator" element={
              <ProtectedRoute allowedRoles={['hospital_admin', 'doctor', 'nurse']}>
                <Layout>
                  <HospitalOrchestrator />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/relief-planner" element={
              <ProtectedRoute allowedRoles={['ngo', 'relief_volunteer', 'logistics_driver', 'hospital_admin']}>
                <Layout>
                  <ReliefPlanner />
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
