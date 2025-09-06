import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

// Import theme
import theme from './theme';

// Import layout component
import Layout from './components/layout/Layout';

// Import pages
import Dashboard from './pages/Dashboard';
import HospitalResourceOptimizer from './pages/HospitalResourceOptimizer';
import DisasterReliefOptimizer from './pages/DisasterReliefOptimizer';
import HungerWasteOptimizer from './pages/HungerWasteOptimizer';
import SmartShelterAllocation from './pages/SmartShelterAllocation';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hospital-optimizer" element={<HospitalResourceOptimizer />} />
            <Route path="/disaster-relief" element={<DisasterReliefOptimizer />} />
            <Route path="/hunger-waste" element={<HungerWasteOptimizer />} />
            <Route path="/shelter-allocation" element={<SmartShelterAllocation />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
