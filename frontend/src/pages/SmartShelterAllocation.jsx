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

  // Real-time housing availability by district
  const housingAvailabilityData = {
    labels: ['Downtown', 'Northside', 'Southside', 'Eastside', 'Westside', 'Central'],
    datasets: [
      {
        label: 'Available Units',
        data: [45, 38, 52, 28, 41, 35],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        fill: true,
      },
      {
        label: 'Occupied Units',
        data: [180, 165, 195, 120, 155, 140],
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.3)',
        fill: true,
      },
      {
        label: 'Under Maintenance',
        data: [12, 8, 15, 6, 10, 9],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.3)',
        fill: true,
      }
    ]
  };

  // Housing waiting list by priority
  const waitingListData = {
    labels: ['Emergency', 'High Priority', 'Medium Priority', 'Low Priority', 'General'],
    datasets: [
      {
        label: 'Current Wait List',
        data: [25, 45, 80, 120, 200],
        backgroundColor: '#1976d2',
      },
      {
        label: 'Average Wait Time (days)',
        data: [5, 15, 45, 90, 180],
        backgroundColor: '#42a5f5',
      }
    ]
  };

  // Housing unit types distribution
  const unitTypesData = {
    labels: ['Studio', '1BR', '2BR', '3BR', '4BR+', 'Accessible'],
    datasets: [
      {
        label: 'Available Units',
        data: [15, 45, 60, 25, 10, 20],
        backgroundColor: [
          '#1976d2',
          '#42a5f5',
          '#1976d2',
          '#42a5f5',
          '#1976d2',
          '#4caf50',
        ],
        hoverOffset: 4
      }
    ]
  };

  // Housing applications and assignments
  const housingApplicationsColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'applicantName', headerName: 'Applicant Name', width: 180 },
    { field: 'familySize', headerName: 'Family Size', width: 120, type: 'number' },
    { field: 'priorityLevel', headerName: 'Priority Level', width: 130 },
    { field: 'waitTime', headerName: 'Wait Time (days)', width: 150, type: 'number' },
    { field: 'assignedUnit', headerName: 'Assigned Unit', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const housingApplicationsRows = [
    { id: 1, applicantName: 'John Smith', familySize: 3, priorityLevel: 'High', waitTime: 15, assignedUnit: '2BR-205', status: 'Assigned' },
    { id: 2, applicantName: 'Maria Garcia', familySize: 2, priorityLevel: 'Medium', waitTime: 45, assignedUnit: '1BR-108', status: 'Assigned' },
    { id: 3, applicantName: 'Robert Johnson', familySize: 4, priorityLevel: 'High', waitTime: 8, assignedUnit: '3BR-312', status: 'Assigned' },
    { id: 4, applicantName: 'Sarah Wilson', familySize: 1, priorityLevel: 'Low', waitTime: 90, assignedUnit: 'Studio-45', status: 'Waiting' },
    { id: 5, applicantName: 'Michael Brown', familySize: 2, priorityLevel: 'Emergency', waitTime: 2, assignedUnit: '1BR-89', status: 'Assigned' },
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
                <Typography variant="h6">Housing Availability by District</Typography>
                <Tooltip title="Real-time housing availability, occupancy, and maintenance status by district">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <ChartComponent 
                type="line" 
                data={housingAvailabilityData} 
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
                <Typography variant="h6">Housing Wait List by Priority</Typography>
                <Tooltip title="Current wait list numbers and average wait times by priority level">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <ChartComponent 
                type="bar" 
                data={waitingListData} 
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
                <Typography variant="h6">Available Unit Types</Typography>
                <Tooltip title="Current distribution of available housing unit types">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <ChartComponent 
                type="pie" 
                data={unitTypesData} 
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
                <Typography variant="h6">Housing Applications & Assignments</Typography>
                <Tooltip title="Current housing applications, assignments, and wait times">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ height: 400 }}>
                <DataTable 
                  rows={housingApplicationsRows} 
                  columns={housingApplicationsColumns} 
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
