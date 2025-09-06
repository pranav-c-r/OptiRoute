import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  Paper,
  useTheme,
  Tooltip,
  IconButton,
  Fade,
  Container
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Import shared components
import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';
import DataTable from '../components/shared/DataTable';

const SmartShelterAllocation = () => {
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sample data for housing demand forecast
  const housingDemandData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1 Next', 'Q2 Next'],
    datasets: [
      {
        label: 'Predicted Housing Demand',
        data: [250, 280, 310, 330, 350, 370],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        fill: true,
      },
      {
        label: 'Available Units',
        data: [220, 240, 260, 290, 310, 330],
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.3)',
        fill: true,
      }
    ]
  };

  // Sample data for dynamic allocation
  const dynamicAllocationData = {
    labels: ['1BR Units', '2BR Units', '3BR Units', '4BR Units', 'Accessible Units'],
    datasets: [
      {
        label: 'Current Allocation',
        data: [40, 30, 20, 10, 15],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Optimized Allocation',
        data: [35, 35, 25, 5, 15],
        backgroundColor: theme.palette.secondary.main,
      }
    ]
  };

  // Sample data for prioritization
  const prioritizationData = {
    labels: ['Vulnerability', 'Family Size', 'Wait Time', 'Proximity to Services', 'Special Needs'],
    datasets: [
      {
        label: 'Weight in Prioritization Algorithm',
        data: [0.35, 0.25, 0.15, 0.15, 0.10],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.error.main,
          theme.palette.success.main,
          theme.palette.warning.main,
        ],
        hoverOffset: 4
      }
    ]
  };

  // Sample data for impact optimization table
  const impactColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'scenario', headerName: 'Allocation Scenario', width: 200 },
    { field: 'occupancyRate', headerName: 'Occupancy Rate (%)', width: 150, type: 'number' },
    { field: 'waitingTime', headerName: 'Avg. Wait Time (days)', width: 180, type: 'number' },
    { field: 'satisfactionScore', headerName: 'Community Satisfaction', width: 180, type: 'number' },
    { field: 'costEfficiency', headerName: 'Cost Efficiency Score', width: 180, type: 'number' },
  ];

  const impactRows = [
    { id: 1, scenario: 'Current Allocation', occupancyRate: 82, waitingTime: 45, satisfactionScore: 7.2, costEfficiency: 6.8 },
    { id: 2, scenario: 'Vulnerability First', occupancyRate: 88, waitingTime: 38, satisfactionScore: 7.8, costEfficiency: 7.2 },
    { id: 3, scenario: 'Balanced Approach', occupancyRate: 92, waitingTime: 32, satisfactionScore: 8.5, costEfficiency: 8.1 },
    { id: 4, scenario: 'Maximum Occupancy', occupancyRate: 96, waitingTime: 35, satisfactionScore: 7.9, costEfficiency: 8.7 },
    { id: 5, scenario: 'Minimum Wait Time', occupancyRate: 90, waitingTime: 25, satisfactionScore: 8.2, costEfficiency: 7.5 },
  ];

  return (
    <Box sx={{ 
      p: 3,
      background: '#0a1929',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(66, 165, 245, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(25, 118, 210, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={isLoaded} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ 
              mb: 2,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}>
              Smart Shelter Allocation System
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto'
            }}>
              AI-powered housing allocation and management system
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Feature cards */}
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard 
              title="Demand Forecasting" 
              subtitle="AI predicts future housing needs"
              icon={<AssessmentIcon />}
            >
              <Typography variant="body2" color="text.secondary">
                Using migration, population, and income trends
              </Typography>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard 
              title="Dynamic Allocation" 
              subtitle="ML reallocates units as needs change"
              icon={<AutorenewIcon />}
            >
              <Typography variant="body2" color="text.secondary">
                Adapts as families' needs or occupancy patterns change
              </Typography>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard 
              title="Needs-Based Prioritization" 
              subtitle="AI ranks applicants by multiple factors"
              icon={<PriorityHighIcon />}
            >
              <Typography variant="body2" color="text.secondary">
                Considers vulnerability, family size, and proximity to essentials
              </Typography>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard 
              title="Impact Optimization" 
              subtitle="System simulates allocation scenarios"
              icon={<TrendingUpIcon />}
            >
              <Typography variant="body2" color="text.secondary">
                Maximizes occupancy, cuts waiting times, and improves satisfaction
              </Typography>
            </DashboardCard>
          </Grid>

          {/* Charts and tables */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', minHeight: '280px', backgroundColor: '#273e6b', color: '#ffffff' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Housing Demand Forecast</Typography>
                <Tooltip title="AI predicts future housing needs using migration, population, and income trends">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <ChartComponent 
                type="line" 
                data={housingDemandData} 
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Housing Units'
                      }
                    }
                  }
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', minHeight: '280px', backgroundColor: '#273e6b', color: '#ffffff' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Dynamic Unit Allocation</Typography>
                <Tooltip title="ML reallocates units as families' needs or occupancy change">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <ChartComponent 
                type="bar" 
                data={dynamicAllocationData} 
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Units'
                      }
                    }
                  }
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', minHeight: '280px', backgroundColor: '#273e6b', color: '#ffffff' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Needs-Based Prioritization</Typography>
                <Tooltip title="AI ranks applicants by vulnerability, family size, and proximity to essentials">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <ChartComponent 
                type="pie" 
                data={prioritizationData} 
                options={{
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          return `${label}: ${(value * 100).toFixed(0)}%`;
                        }
                      }
                    }
                  }
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', minHeight: '280px', backgroundColor: '#273e6b', color: '#ffffff' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Impact Optimization Scenarios</Typography>
                <Tooltip title="The system simulates scenarios to maximize occupancy, cut waiting times, and improve community satisfaction">
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
      </Container> {/* ✅ Properly closed Container */}
    </Box>
  );
};

export default SmartShelterAllocation;
