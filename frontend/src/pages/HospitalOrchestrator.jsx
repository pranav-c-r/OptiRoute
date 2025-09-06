import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
  Chip,
  useTheme,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AmbulanceIcon from '@mui/icons-material/MedicalServices'; // Using MedicalServices as a substitute for Ambulance
import PeopleIcon from '@mui/icons-material/People';

import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';
import DataTable from '../components/shared/DataTable';

const HospitalOrchestrator = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Helper function for alpha color
  function alpha(color, opacity) {
    return theme.palette.mode === 'light'
      ? `rgba(${hexToRgb(color)}, ${opacity})`
      : `rgba(${hexToRgb(color)}, ${opacity})`;
  }

  // Helper function to convert hex to rgb
  function hexToRgb(hex) {
    // Remove the hash if it exists
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }

  // Sample data for charts
  const bedOccupancyData = {
    labels: ['General', 'ICU', 'Emergency', 'Pediatric', 'Maternity', 'Surgery'],
    datasets: [
      {
        label: 'Occupied',
        data: [75, 85, 60, 45, 55, 70],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Available',
        data: [25, 15, 40, 55, 45, 30],
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
      },
    ],
  };

  const patientFlowData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Admissions',
        data: [30, 25, 35, 40, 45, 20, 15],
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        tension: 0.3,
      },
      {
        label: 'Discharges',
        data: [20, 30, 25, 35, 40, 25, 10],
        borderColor: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        tension: 0.3,
      },
      {
        label: 'Transfers',
        data: [10, 15, 12, 18, 20, 15, 8],
        borderColor: theme.palette.success.main,
        backgroundColor: alpha(theme.palette.success.main, 0.1),
        tension: 0.3,
      },
    ],
  };

  // Sample data for tables
  const patientColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Patient Name', width: 180 },
    { field: 'age', headerName: 'Age', type: 'number', width: 60 },
    { field: 'condition', headerName: 'Condition', width: 150 },
    { field: 'priority', headerName: 'Priority', width: 100 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 180 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const patientRows = [
    { id: 1, name: 'John Smith', age: 45, condition: 'Cardiac', priority: 'High', assignedTo: 'Dr. Johnson', location: 'ICU-3', status: 'Critical' },
    { id: 2, name: 'Mary Johnson', age: 32, condition: 'Respiratory', priority: 'Medium', assignedTo: 'Dr. Williams', location: 'Ward-2B', status: 'Stable' },
    { id: 3, name: 'Robert Davis', age: 67, condition: 'Post-Surgery', priority: 'Medium', assignedTo: 'Dr. Brown', location: 'Recovery-5', status: 'Improving' },
    { id: 4, name: 'Sarah Wilson', age: 28, condition: 'Trauma', priority: 'High', assignedTo: 'Dr. Miller', location: 'ER-1', status: 'Critical' },
    { id: 5, name: 'Michael Lee', age: 52, condition: 'Pneumonia', priority: 'Medium', assignedTo: 'Dr. Davis', location: 'Ward-3A', status: 'Stable' },
  ];

  const hospitalColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Hospital Name', width: 200 },
    { field: 'totalBeds', headerName: 'Total Beds', type: 'number', width: 100 },
    { field: 'availableBeds', headerName: 'Available', type: 'number', width: 100 },
    { field: 'occupancyRate', headerName: 'Occupancy', type: 'number', width: 100 },
    { field: 'icuAvailable', headerName: 'ICU Available', type: 'number', width: 120 },
    { field: 'doctors', headerName: 'Doctors On Duty', type: 'number', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const hospitalRows = [
    { id: 1, name: 'Central Hospital', totalBeds: 500, availableBeds: 125, occupancyRate: 75, icuAvailable: 8, doctors: 45, status: 'Normal' },
    { id: 2, name: 'Memorial Medical Center', totalBeds: 350, availableBeds: 42, occupancyRate: 88, icuAvailable: 2, doctors: 30, status: 'High Capacity' },
    { id: 3, name: 'University Hospital', totalBeds: 600, availableBeds: 180, occupancyRate: 70, icuAvailable: 12, doctors: 60, status: 'Normal' },
    { id: 4, name: 'Community Health Center', totalBeds: 200, availableBeds: 15, occupancyRate: 93, icuAvailable: 0, doctors: 18, status: 'Critical' },
    { id: 5, name: 'Children\'s Hospital', totalBeds: 300, availableBeds: 75, occupancyRate: 75, icuAvailable: 6, doctors: 35, status: 'Normal' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalHospitalIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Hospital Orchestrator
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            size="small"
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button 
            variant="contained" 
            startIcon={<RefreshIcon />}
            size="small"
          >
            Refresh Data
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Patients"
            subtitle="Current hospital network"
            icon={<PeopleIcon color="primary" />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h4">1,248</Typography>
              <Chip 
                label="+12% this week" 
                size="small" 
                color="success" 
                variant="outlined" 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              85 new admissions today
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Available Beds"
            subtitle="Across all hospitals"
            icon={<AirlineSeatFlatIcon color="secondary" />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h4">437</Typography>
              <Chip 
                label="Critical in 2 hospitals" 
                size="small" 
                color="error" 
                variant="outlined" 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              28 ICU beds available
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Doctors On Duty"
            subtitle="Current shift"
            icon={<MedicalServicesIcon sx={{ color: theme.palette.success.main }} />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h4">188</Typography>
              <Chip 
                label="Fully staffed" 
                size="small" 
                color="success" 
                variant="outlined" 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              42 specialists available
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Ambulances"
            subtitle="Emergency response"
            icon={<AmbulanceIcon sx={{ color: theme.palette.info.main }} />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h4">32</Typography>
              <Chip 
                label="5 dispatched" 
                size="small" 
                color="info" 
                variant="outlined" 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Avg response time: 8.5 min
            </Typography>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="hospital orchestrator tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Dashboard" />
          <Tab label="Patient Allocation" />
          <Tab label="Hospital Status" />
          <Tab label="Staff Scheduling" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && (
          <>
            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <DashboardCard
                  title="Bed Occupancy by Department"
                  subtitle="Current status"
                  headerAction={
                    <Tooltip title="Filter">
                      <IconButton size="small">
                        <FilterListIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ChartComponent 
                    type="bar" 
                    data={bedOccupancyData} 
                    height={300}
                    options={{
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                      scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true,
                          max: 100,
                        },
                      },
                    }}
                  />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <DashboardCard
                  title="Patient Flow Analysis"
                  subtitle="Last 7 days"
                  headerAction={
                    <Tooltip title="Filter">
                      <IconButton size="small">
                        <FilterListIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ChartComponent 
                    type="line" 
                    data={patientFlowData} 
                    height={300}
                  />
                </DashboardCard>
              </Grid>
            </Grid>

            {/* Tables */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DashboardCard
                  title="Hospital Network Status"
                  subtitle="Real-time capacity and resource allocation"
                  headerAction={
                    <Tooltip title="Refresh">
                      <IconButton size="small">
                        <RefreshIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <DataTable 
                    rows={hospitalRows} 
                    columns={hospitalColumns} 
                    autoHeight 
                    pageSize={5}
                    showToolbar
                  />
                </DashboardCard>
              </Grid>
            </Grid>
          </>
        )}

        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard
                title="Patient Allocation"
                subtitle="Current patient assignments and transfers"
                headerAction={
                  <Tooltip title="Refresh">
                    <IconButton size="small">
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
              >
                <DataTable 
                  rows={patientRows} 
                  columns={patientColumns} 
                  autoHeight 
                  pageSize={10}
                  showToolbar
                />
              </DashboardCard>
            </Grid>
          </Grid>
        )}

        {tabValue === 2 && (
          <Typography variant="h6">Hospital Status content</Typography>
        )}

        {tabValue === 3 && (
          <Typography variant="h6">Staff Scheduling content</Typography>
        )}

        {tabValue === 4 && (
          <Typography variant="h6">Analytics content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default HospitalOrchestrator;