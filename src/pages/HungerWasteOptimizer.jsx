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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Import shared components
import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';
import DataTable from '../components/shared/DataTable';

const HungerWasteOptimizer = () => {
  const theme = useTheme();

  // Sample data for food demand forecasting
  const foodDemandData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Predicted Demand (tons)',
        data: [120, 115, 125, 130, 140, 150, 160, 155, 145, 135, 125, 130],
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main + '40',
        fill: true,
      },
      {
        label: 'Actual Consumption (tons)',
        data: [118, 112, 128, 132, 138, 152, 158, 153, 142, 132, null, null],
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main + '40',
        fill: true,
      }
    ]
  };

  // Sample data for distribution matching
  const distributionData = {
    labels: ['Community A', 'Community B', 'Community C', 'Community D', 'Community E'],
    datasets: [
      {
        label: 'Surplus Food Available (tons)',
        data: [15, 8, 12, 5, 10],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Community Need (tons)',
        data: [10, 12, 8, 15, 5],
        backgroundColor: theme.palette.secondary.main,
      }
    ]
  };

  // Sample data for perishables optimization
  const perishablesData = {
    labels: ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Prepared Meals'],
    datasets: [
      {
        label: 'Shelf Life (days)',
        data: [7, 5, 10, 3, 2],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Optimized Delivery Time (days)',
        data: [2, 1, 3, 1, 1],
        backgroundColor: theme.palette.secondary.main,
      }
    ]
  };

  // Sample data for impact maximization table
  const impactColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'scenario', headerName: 'Allocation Scenario', width: 200 },
    { field: 'economicSavings', headerName: 'Economic Savings ($)', width: 180, type: 'number' },
    { field: 'wasteReduction', headerName: 'Waste Reduction (tons)', width: 180, type: 'number' },
    { field: 'peopleServed', headerName: 'People Served', width: 150, type: 'number' },
    { field: 'environmentalImpact', headerName: 'CO₂ Reduction (tons)', width: 180, type: 'number' },
  ];

  const impactRows = [
    { id: 1, scenario: 'Current Distribution', economicSavings: 125000, wasteReduction: 85, peopleServed: 12500, environmentalImpact: 45 },
    { id: 2, scenario: 'Optimized Local First', economicSavings: 180000, wasteReduction: 120, peopleServed: 15000, environmentalImpact: 65 },
    { id: 3, scenario: 'Balanced Regional', economicSavings: 165000, wasteReduction: 110, peopleServed: 16200, environmentalImpact: 58 },
    { id: 4, scenario: 'Maximum Coverage', economicSavings: 155000, wasteReduction: 95, peopleServed: 18000, environmentalImpact: 52 },
    { id: 5, scenario: 'Minimum Waste', economicSavings: 190000, wasteReduction: 135, peopleServed: 14000, environmentalImpact: 72 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        AI Driven Hunger and Waste Optimizer
      </Typography>

      <Grid container spacing={3}>
        {/* Feature cards */}
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Demand Forecasting" 
            subtitle="AI predicts local food needs"
            icon={<AssessmentIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Using historical consumption, population, and seasonal trends
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Smart Distribution" 
            subtitle="ML matches surplus to communities in need"
            icon={<LocalShippingIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Minimizing waste and hunger through optimal matching
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Perishables Optimization" 
            subtitle="AI plans delivery routes and cold storage"
            icon={<AccessTimeIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Preventing spoilage through optimized logistics
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Impact Maximization" 
            subtitle="System simulates allocation scenarios"
            icon={<TrendingUpIcon />}
          >
            <Typography variant="body2" color="text.secondary">
              Reducing economic loss for farmers and environmental impact
            </Typography>
          </DashboardCard>
        </Grid>

        {/* Charts and tables */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Food Demand Forecast</Typography>
              <Tooltip title="AI predicts local food needs using historical consumption, population, and seasonal trends">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="line" 
              data={foodDemandData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Food (tons)'
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
              <Typography variant="h6">Smart Distribution Matching</Typography>
              <Tooltip title="ML matches surplus produce to nearby communities in need">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="bar" 
              data={distributionData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Food (tons)'
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
              <Typography variant="h6">Perishables Optimization</Typography>
              <Tooltip title="AI plans delivery routes and cold storage usage to prevent spoilage">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <ChartComponent 
              type="bar" 
              data={perishablesData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Days'
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
              <Typography variant="h6">Impact Maximization Scenarios</Typography>
              <Tooltip title="The system simulates allocation scenarios to reduce economic loss and environmental impact">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ height: 400 }}>
              <DataTable 
                rows={impactRows} 
                columns={impactColumns} 
                pageSize={5}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HungerWasteOptimizer;