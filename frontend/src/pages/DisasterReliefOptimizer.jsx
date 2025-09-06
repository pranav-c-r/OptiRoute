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
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoopIcon from '@mui/icons-material/Loop';
import CellTowerIcon from '@mui/icons-material/CellTower';

// Import shared components
import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';
import DataTable from '../components/shared/DataTable';

const DisasterReliefOptimizer = () => {
  const theme = useTheme();

  // Sample data for demand forecasting chart
  const demandForecastData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Food (kg)',
        data: [2500, 3200, 2800, 2600, 2400, 2200, 2000],
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main + '40',
        fill: true,
      },
      {
        label: 'Water (liters)',
        data: [5000, 6500, 6000, 5500, 5000, 4500, 4000],
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main + '40',
        fill: true,
      },
      {
        label: 'Medical Kits',
        data: [500, 650, 600, 550, 500, 450, 400],
        borderColor: theme.palette.error.main,
        backgroundColor: theme.palette.error.main + '40',
        fill: true,
      }
    ]
  };

  // Sample data for delivery routing
  const deliveryRoutingData = {
    labels: ['Route A', 'Route B', 'Route C', 'Route D', 'Route E'],
    datasets: [
      {
        label: 'Time (hours)',
        data: [2.5, 3.2, 1.8, 4.1, 2.7],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Fuel Efficiency (km/l)',
        data: [8.5, 7.2, 9.8, 6.5, 8.1],
        backgroundColor: theme.palette.secondary.main,
      }
    ]
  };

  // Sample data for resource allocation
  const resourceAllocationData = {
    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
    datasets: [
      {
        label: 'Current Allocation',
        data: [30, 25, 15, 20, 10],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Recommended Allocation',
        data: [20, 20, 25, 15, 20],
        backgroundColor: theme.palette.secondary.main,
      }
    ]
  };

  // Sample data for community needs table
  const communityNeedsColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'community', headerName: 'Community', width: 150 },
    { field: 'population', headerName: 'Population', width: 120, type: 'number' },
    { field: 'foodNeeded', headerName: 'Food Needed (kg)', width: 150, type: 'number' },
    { field: 'waterNeeded', headerName: 'Water Needed (L)', width: 150, type: 'number' },
    { field: 'medicalNeeded', headerName: 'Medical Kits', width: 120, type: 'number' },
    { field: 'priority', headerName: 'Priority', width: 120 },
  ];

  const communityNeedsRows = [
    { id: 1, community: 'Riverside', population: 1200, foodNeeded: 600, waterNeeded: 2400, medicalNeeded: 60, priority: 'High' },
    { id: 2, community: 'Hillside', population: 850, foodNeeded: 425, waterNeeded: 1700, medicalNeeded: 42, priority: 'Medium' },
    { id: 3, community: 'Downtown', population: 2000, foodNeeded: 1000, waterNeeded: 4000, medicalNeeded: 100, priority: 'Critical' },
    { id: 4, community: 'Eastside', population: 750, foodNeeded: 375, waterNeeded: 1500, medicalNeeded: 38, priority: 'Medium' },
    { id: 5, community: 'Westend', population: 1500, foodNeeded: 750, waterNeeded: 3000, medicalNeeded: 75, priority: 'High' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        AI Powered Disaster Relief Optimizer
      </Typography>

      <Grid container spacing={3}>
        {/* Feature cards */}
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Demand Forecasting" 
            subtitle="ML predicts shelter needs"
            icon={<AssessmentIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Using historical and population data to predict food, water, and medical kit needs
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Optimal Delivery Routing" 
            subtitle="AI finds fastest, fuel-efficient paths"
            icon={<LocalShippingIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Optimized routes for trucks and volunteers
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Duplication Avoidance" 
            subtitle="ML reallocates excess resources"
            icon={<LoopIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Identifies and redirects excess resources to underserved areas
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Community Need Detection" 
            subtitle="AI uses mobile inputs or satellite data"
            icon={<CellTowerIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Identifies urgent needs in affected communities
            </Typography>
          </DashboardCard>
        </Grid>

        {/* Charts and tables */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Shelter Needs Forecast</Typography>
              <Tooltip title="ML predictions based on historical and population data">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="line" 
              data={demandForecastData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Quantity Needed'
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
              <Typography variant="h6">Optimal Delivery Routing</Typography>
              <Tooltip title="AI finds fastest, most fuel-efficient paths for trucks and volunteers">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="bar" 
              data={deliveryRoutingData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Value'
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
              <Typography variant="h6">Resource Reallocation</Typography>
              <Tooltip title="ML reallocates excess resources to underserved areas">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="bar" 
              data={resourceAllocationData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Resource Units'
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
              <Typography variant="h6">Community Needs Detection</Typography>
              <Tooltip title="AI uses mobile inputs or satellite data to identify urgent needs">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ height: 400 }}>
              <DataTable 
                rows={communityNeedsRows} 
                columns={communityNeedsColumns} 
                pageSize={5}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisasterReliefOptimizer;