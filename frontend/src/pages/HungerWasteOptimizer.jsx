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
  Slide,
  Zoom,
  Container
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Real-time food bank inventory levels
  const foodBankInventoryData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Food In (kg)',
        data: [2500, 3200, 2800, 3500, 4000, 1800, 2200],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        fill: true,
      },
      {
        label: 'Food Out (kg)',
        data: [2200, 2800, 2600, 3000, 3500, 1600, 2000],
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.3)',
        fill: true,
      },
      {
        label: 'Waste (kg)',
        data: [150, 200, 120, 180, 220, 100, 130],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.3)',
        fill: true,
      }
    ]
  };

  // Food bank network distribution
  const foodBankNetworkData = {
    labels: ['Central Food Bank', 'North Branch', 'South Hub', 'East Center', 'West Station'],
    datasets: [
      {
        label: 'Current Inventory (kg)',
        data: [2500, 1800, 2200, 1600, 2000],
        backgroundColor: '#1976d2',
      },
      {
        label: 'Daily Distribution (kg)',
        data: [800, 600, 700, 500, 650],
        backgroundColor: '#42a5f5',
      },
      {
        label: 'Surplus Available (kg)',
        data: [300, 200, 250, 150, 180],
        backgroundColor: '#4caf50',
      }
    ]
  };

  // Food waste reduction by category
  const wasteReductionData = {
    labels: ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Bakery', 'Prepared Meals'],
    datasets: [
      {
        label: 'Waste Before (kg/week)',
        data: [150, 120, 80, 60, 90, 110],
        backgroundColor: '#f44336',
      },
      {
        label: 'Waste After (kg/week)',
        data: [45, 36, 24, 18, 27, 33],
        backgroundColor: '#4caf50',
      }
    ]
  };

  // Food distribution routes and delivery status
  const deliveryRoutesColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'route', headerName: 'Delivery Route', width: 200 },
    { field: 'foodBank', headerName: 'From Food Bank', width: 180 },
    { field: 'destination', headerName: 'Destination', width: 180 },
    { field: 'foodWeight', headerName: 'Food Weight (kg)', width: 150, type: 'number' },
    { field: 'estimatedTime', headerName: 'Est. Delivery Time', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const deliveryRoutesRows = [
    { id: 1, route: 'Route A-1', foodBank: 'Central Food Bank', destination: 'Downtown Shelter', foodWeight: 250, estimatedTime: '45 min', status: 'In Transit' },
    { id: 2, route: 'Route B-2', foodBank: 'North Branch', destination: 'Community Center', foodWeight: 180, estimatedTime: '30 min', status: 'Delivered' },
    { id: 3, route: 'Route C-3', foodBank: 'South Hub', destination: 'Senior Center', foodWeight: 320, estimatedTime: '60 min', status: 'Scheduled' },
    { id: 4, route: 'Route D-4', foodBank: 'East Center', destination: 'Family Shelter', foodWeight: 200, estimatedTime: '35 min', status: 'In Transit' },
    { id: 5, route: 'Route E-5', foodBank: 'West Station', destination: 'School Program', foodWeight: 150, estimatedTime: '25 min', status: 'Delivered' },
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
              AI Driven Hunger and Waste Optimizer
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto'
            }}>
              Smart food distribution and waste reduction system
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Feature cards */}
          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1000}>
              <Box>
                <DashboardCard 
                  title="Demand Forecasting" 
                  subtitle="AI predicts local food needs"
                  icon={<AssessmentIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Using historical consumption, population, and seasonal trends
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1200}>
              <Box>
                <DashboardCard 
                  title="Smart Distribution" 
                  subtitle="ML matches surplus to communities in need"
                  icon={<LocalShippingIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Minimizing waste and hunger through optimal matching
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1400}>
              <Box>
                <DashboardCard 
                  title="Perishables Optimization" 
                  subtitle="AI plans delivery routes and cold storage"
                  icon={<AccessTimeIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Preventing spoilage through optimized logistics
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1600}>
              <Box>
                <DashboardCard 
                  title="Impact Maximization" 
                  subtitle="System simulates allocation scenarios"
                  icon={<TrendingUpIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Reducing economic loss for farmers and environmental impact
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          {/* Charts and tables */}
          <Grid item xs={12} md={6}>
            <Fade in={isLoaded} timeout={1800}>
              <Paper sx={{ 
                p: 3, 
                height: '100%',
                background: 'rgba(39, 62, 107, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Poppins'
                  }}>
                    Food Bank Inventory Flow
                  </Typography>
                  <Tooltip title="Real-time tracking of food inventory, distribution, and waste levels">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="line" 
                  data={foodBankInventoryData} 
                  options={{
                    responsive: true,
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart'
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: 'white',
                          font: {
                            family: 'Poppins',
                            weight: 500
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: 'rgba(255,255,255,0.1)'
                        },
                        ticks: {
                          color: 'white',
                          font: {
                            family: 'Poppins'
                          }
                        }
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255,255,255,0.1)'
                        },
                        ticks: {
                          color: 'white',
                          font: {
                            family: 'Poppins'
                          }
                        },
                        title: {
                          display: true,
                          text: 'Food (tons)',
                          color: 'white',
                          font: {
                            family: 'Poppins',
                            weight: 500
                          }
                        }
                      }
                    }
                  }}
                />
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in={isLoaded} timeout={2000}>
              <Paper sx={{ 
                p: 3, 
                height: '100%',
                background: 'rgba(39, 62, 107, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Poppins'
                  }}>
                    Food Bank Network Status
                  </Typography>
                  <Tooltip title="Current inventory, distribution, and surplus levels across food bank network">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="bar" 
                  data={foodBankNetworkData} 
                  options={{
                    responsive: true,
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart'
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: 'white',
                          font: {
                            family: 'Poppins',
                            weight: 500
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: 'rgba(255,255,255,0.1)'
                        },
                        ticks: {
                          color: 'white',
                          font: {
                            family: 'Poppins'
                          }
                        }
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255,255,255,0.1)'
                        },
                        ticks: {
                          color: 'white',
                          font: {
                            family: 'Poppins'
                          }
                        },
                        title: {
                          display: true,
                          text: 'Food (tons)',
                          color: 'white',
                          font: {
                            family: 'Poppins',
                            weight: 500
                          }
                        }
                      }
                    }
                  }}
                />
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in={isLoaded} timeout={2200}>
              <Paper sx={{ 
                p: 3, 
                height: '100%',
                background: 'rgba(39, 62, 107, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Poppins'
                  }}>
                    Food Waste Reduction Impact
                  </Typography>
                  <Tooltip title="Before and after waste reduction by food category">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="bar" 
                  data={wasteReductionData} 
                  options={{
                    responsive: true,
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart'
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: 'white',
                          font: {
                            family: 'Poppins',
                            weight: 500
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: 'rgba(255,255,255,0.1)'
                        },
                        ticks: {
                          color: 'white',
                          font: {
                            family: 'Poppins'
                          }
                        }
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255,255,255,0.1)'
                        },
                        ticks: {
                          color: 'white',
                          font: {
                            family: 'Poppins'
                          }
                        },
                        title: {
                          display: true,
                          text: 'Days',
                          color: 'white',
                          font: {
                            family: 'Poppins',
                            weight: 500
                          }
                        }
                      }
                    }
                  }}
                />
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in={isLoaded} timeout={2400}>
              <Paper sx={{ 
                p: 3, 
                height: '100%',
                background: 'rgba(39, 62, 107, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Poppins'
                  }}>
                    Food Distribution Routes
                  </Typography>
                  <Tooltip title="Real-time tracking of food delivery routes and distribution status">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ height: 400 }}>
                  <DataTable 
                    rows={deliveryRoutesRows} 
                    columns={deliveryRoutesColumns} 
                    pageSize={5}
                  />
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HungerWasteOptimizer;