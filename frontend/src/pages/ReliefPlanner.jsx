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
  Paper,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import RouteIcon from '@mui/icons-material/Route';

import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';
import DataTable from '../components/shared/DataTable';

const ReliefPlanner = () => {
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
  const resourceDistributionData = {
    labels: ['Food', 'Water', 'Medicine', 'Shelter', 'Clothing', 'Hygiene'],
    datasets: [
      {
        label: 'Distributed',
        data: [65, 70, 55, 40, 35, 45],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Needed',
        data: [85, 90, 75, 60, 50, 65],
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
      },
    ],
  };

  const coverageMapData = {
    labels: ['North Region', 'South Region', 'East Region', 'West Region', 'Central'],
    datasets: [
      {
        label: 'Coverage %',
        data: [75, 60, 85, 50, 90],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.info.main,
        ],
        borderWidth: 1,
      },
    ],
  };

  const deliveryTrendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Deliveries Completed',
        data: [25, 45, 60, 75],
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        tension: 0.3,
      },
      {
        label: 'People Reached',
        data: [1200, 2500, 3800, 5000],
        borderColor: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        tension: 0.3,
        yAxisID: 'y1',
      },
    ],
  };

  // Sample data for tables
  const locationColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Location Name', width: 180 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'population', headerName: 'Population', type: 'number', width: 120 },
    { field: 'severity', headerName: 'Severity', width: 120 },
    { field: 'priority', headerName: 'Priority', width: 120 },
    { field: 'lastDelivery', headerName: 'Last Delivery', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const locationRows = [
    { id: 1, name: 'Riverside Community', type: 'Urban', population: 5000, severity: 'High', priority: 'Urgent', lastDelivery: '2 days ago', status: 'Needs Supplies' },
    { id: 2, name: 'Hillside Village', type: 'Rural', population: 1200, severity: 'Medium', priority: 'High', lastDelivery: '1 day ago', status: 'Partially Supplied' },
    { id: 3, name: 'Coastal Town', type: 'Coastal', population: 3500, severity: 'Critical', priority: 'Immediate', lastDelivery: '4 days ago', status: 'Critical Shortage' },
    { id: 4, name: 'Mountain Settlement', type: 'Remote', population: 800, severity: 'Medium', priority: 'Medium', lastDelivery: '3 days ago', status: 'Needs Supplies' },
    { id: 5, name: 'Central District', type: 'Urban', population: 8000, severity: 'Low', priority: 'Normal', lastDelivery: 'Today', status: 'Well Supplied' },
  ];

  const truckColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Truck ID', width: 120 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'capacity', headerName: 'Capacity (kg)', type: 'number', width: 120 },
    { field: 'driver', headerName: 'Driver', width: 150 },
    { field: 'currentLoad', headerName: 'Current Load', width: 150 },
    { field: 'route', headerName: 'Assigned Route', width: 180 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const truckRows = [
    { id: 1, name: 'T-101', type: 'Heavy Duty', capacity: 5000, driver: 'John Smith', currentLoad: 'Food, Water', route: 'Northern Route', status: 'En Route' },
    { id: 2, name: 'T-102', type: 'Medium', capacity: 3000, driver: 'Sarah Johnson', currentLoad: 'Medicine, Hygiene', route: 'Eastern Route', status: 'Loading' },
    { id: 3, name: 'T-103', type: 'Light', capacity: 1500, driver: 'Mike Davis', currentLoad: 'Clothing, Blankets', route: 'Western Route', status: 'Returned' },
    { id: 4, name: 'T-104', type: 'Heavy Duty', capacity: 5000, driver: 'Emily Wilson', currentLoad: 'Shelter Kits', route: 'Southern Route', status: 'Maintenance' },
    { id: 5, name: 'T-105', type: 'Medium', capacity: 3000, driver: 'Robert Brown', currentLoad: 'Food, Water, Medicine', route: 'Central Route', status: 'En Route' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalShippingIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Relief Planner
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            size="small"
            sx={{ mr: 1 }}
          >
            Export Report
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
            title="Affected Population"
            subtitle="Total in disaster area"
            icon={<PeopleIcon color="primary" />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h4">18,500</Typography>
              <Chip 
                label="+2,500 since last week" 
                size="small" 
                color="error" 
                variant="outlined" 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              5 major affected regions
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Supply Coverage"
            subtitle="Population reached"
            icon={<InventoryIcon color="secondary" />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h4">68%</Typography>
              <Chip 
                label="+15% this week" 
                size="small" 
                color="success" 
                variant="outlined" 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              12,580 people reached
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Active Trucks"
            subtitle="Currently deployed"
            icon={<LocalShippingIcon sx={{ color: theme.palette.success.main }} />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h4">18</Typography>
              <Chip 
                label="3 in maintenance" 
                size="small" 
                color="warning" 
                variant="outlined" 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              8 routes currently active
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Critical Locations"
            subtitle="Requiring immediate aid"
            icon={<LocationOnIcon sx={{ color: theme.palette.error.main }} />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h4">5</Typography>
              <Chip 
                label="-2 from yesterday" 
                size="small" 
                color="success" 
                variant="outlined" 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ~3,200 people in critical need
            </Typography>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="relief planner tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Dashboard" />
          <Tab label="Location Management" />
          <Tab label="Resource Allocation" />
          <Tab label="Route Planning" />
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
                  title="Resource Distribution vs. Need"
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
                    data={resourceDistributionData} 
                    height={300}
                    options={{
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Percentage (%)',
                          },
                        },
                      },
                    }}
                  />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <DashboardCard
                  title="Regional Coverage Map"
                  subtitle="Aid distribution by region"
                  headerAction={
                    <Tooltip title="Filter">
                      <IconButton size="small">
                        <FilterListIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ChartComponent 
                    type="pie" 
                    data={coverageMapData} 
                    height={300}
                    options={{
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                      },
                    }}
                  />
                </DashboardCard>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <DashboardCard
                  title="Delivery Trends"
                  subtitle="Last 4 weeks"
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
                    data={deliveryTrendsData} 
                    height={300}
                    options={{
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                      scales: {
                        y: {
                          type: 'linear',
                          display: true,
                          position: 'left',
                          title: {
                            display: true,
                            text: 'Deliveries',
                          },
                        },
                        y1: {
                          type: 'linear',
                          display: true,
                          position: 'right',
                          grid: {
                            drawOnChartArea: false,
                          },
                          title: {
                            display: true,
                            text: 'People Reached',
                          },
                        },
                      },
                    }}
                  />
                </DashboardCard>
              </Grid>
            </Grid>

            {/* Route Map Placeholder */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <DashboardCard
                  title="Active Delivery Routes"
                  subtitle="Real-time tracking"
                  headerAction={
                    <Button 
                      variant="text" 
                      size="small"
                      endIcon={<DownloadIcon />}
                    >
                      Export Routes
                    </Button>
                  }
                >
                  <Paper 
                    sx={{ 
                      height: 400, 
                      width: '100%', 
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px dashed ${theme.palette.divider}`,
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <RouteIcon sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        Interactive Map View
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Shows active routes, truck locations, and delivery points
                      </Typography>
                    </Box>
                  </Paper>
                </DashboardCard>
              </Grid>
            </Grid>

            {/* Tables */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DashboardCard
                  title="Priority Locations"
                  subtitle="Areas requiring immediate attention"
                  headerAction={
                    <Tooltip title="Refresh">
                      <IconButton size="small">
                        <RefreshIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <DataTable 
                    rows={locationRows} 
                    columns={locationColumns} 
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
                title="Location Management"
                subtitle="Manage affected areas and priorities"
                headerAction={
                  <Button 
                    variant="contained" 
                    size="small"
                    color="primary"
                  >
                    Add New Location
                  </Button>
                }
              >
                <DataTable 
                  rows={locationRows} 
                  columns={locationColumns} 
                  autoHeight 
                  pageSize={10}
                  showToolbar
                />
              </DashboardCard>
            </Grid>
          </Grid>
        )}

        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard
                title="Truck Fleet Management"
                subtitle="Manage vehicles and assignments"
                headerAction={
                  <Button 
                    variant="contained" 
                    size="small"
                    color="primary"
                  >
                    Add New Truck
                  </Button>
                }
              >
                <DataTable 
                  rows={truckRows} 
                  columns={truckColumns} 
                  autoHeight 
                  pageSize={10}
                  showToolbar
                />
              </DashboardCard>
            </Grid>
          </Grid>
        )}

        {tabValue === 3 && (
          <Typography variant="h6">Route Planning content</Typography>
        )}

        {tabValue === 4 && (
          <Typography variant="h6">Analytics content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ReliefPlanner;