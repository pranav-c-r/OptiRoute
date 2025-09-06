import React from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  Paper,
  useTheme,
  Tooltip,
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BedIcon from '@mui/icons-material/Bed';
import RouteIcon from '@mui/icons-material/Route';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';

// Import shared components
import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';
import DataTable from '../components/shared/DataTable';

const HospitalResourceOptimizer = () => {
  const theme = useTheme();

  // Sample data for bed occupancy chart
  const bedOccupancyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Regular Beds',
        data: [85, 88, 92, 90, 87, 80, 82],
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main + '40',
        fill: true,
      },
      {
        label: 'ICU Beds',
        data: [65, 70, 75, 78, 72, 68, 66],
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main + '40',
        fill: true,
      }
    ]
  };

  // Sample data for patient routing
  const patientRoutingData = {
    labels: ['Hospital A', 'Hospital B', 'Hospital C', 'Hospital D', 'Hospital E'],
    datasets: [
      {
        label: 'Current Wait Time (mins)',
        data: [45, 30, 60, 25, 50],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.error.main,
          theme.palette.success.main,
          theme.palette.warning.main,
        ],
      }
    ]
  };

  // Sample data for staff scheduling
  const staffSchedulingData = {
    labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
    datasets: [
      {
        label: 'Doctors',
        data: [20, 25, 15, 10],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Nurses',
        data: [40, 45, 35, 25],
        backgroundColor: theme.palette.secondary.main,
      }
    ]
  };

  // Sample data for risk alerts table
  const riskAlertsColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'zone', headerName: 'Zone', width: 130 },
    { field: 'riskLevel', headerName: 'Risk Level', width: 130 },
    { field: 'population', headerName: 'Population', width: 130, type: 'number' },
    { field: 'resourceAllocation', headerName: 'Resource Allocation', width: 180, type: 'number' },
    { field: 'status', headerName: 'Status', width: 130 },
  ];

  const riskAlertsRows = [
    { id: 1, zone: 'North District', riskLevel: 'High', population: 25000, resourceAllocation: 15, status: 'Alert' },
    { id: 2, zone: 'South District', riskLevel: 'Medium', population: 18000, resourceAllocation: 25, status: 'Monitor' },
    { id: 3, zone: 'East District', riskLevel: 'Low', population: 22000, resourceAllocation: 30, status: 'Normal' },
    { id: 4, zone: 'West District', riskLevel: 'High', population: 30000, resourceAllocation: 20, status: 'Alert' },
    { id: 5, zone: 'Central District', riskLevel: 'Medium', population: 27000, resourceAllocation: 28, status: 'Monitor' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        AI Driven Hospital Resource Optimizer
      </Typography>

      <Grid container spacing={3}>
        {/* Feature cards */}
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Predictive Bed Availability" 
            subtitle="ML forecasts for bed and ICU occupancy"
            icon={<BedIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Using historical admissions and trends to predict future needs
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Smart Patient Routing" 
            subtitle="AI recommendations for optimal hospital placement"
            icon={<RouteIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Based on location, severity, and current wait times
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Dynamic Staff Scheduling" 
            subtitle="AI balanced workload distribution"
            icon={<PeopleIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Prevents burnout and ensures critical areas are covered
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Risk & Equity Alerts" 
            subtitle="ML flags for high-risk zones"
            icon={<WarningIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Ensures fair resource allocation to underserved populations
            </Typography>
          </DashboardCard>
        </Grid>

        {/* Charts and tables */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Bed & ICU Occupancy Forecast</Typography>
              <Tooltip title="ML forecasts based on historical data and current trends">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="line" 
              data={bedOccupancyData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Occupancy %'
                    }
                  }
                }
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Smart Patient Routing</Typography>
              <Tooltip title="AI recommends optimal hospital based on wait times, location, and severity">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="bar" 
              data={patientRoutingData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Wait Time (minutes)'
                    }
                  }
                }
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Dynamic Staff Scheduling</Typography>
              <Tooltip title="AI balances doctor/nurse workload to prevent burnout">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="bar" 
              data={staffSchedulingData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Staff Count'
                    }
                  }
                }
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Risk & Equity Alerts</Typography>
              <Tooltip title="ML flags high-risk zones and underserved populations">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ height: 400 }}>
              <DataTable 
                rows={riskAlertsRows} 
                columns={riskAlertsColumns} 
                pageSize={5}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalResourceOptimizer;