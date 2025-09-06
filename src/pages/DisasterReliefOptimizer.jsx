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
import LoopIcon from '@mui/icons-material/Loop';
import CellTowerIcon from '@mui/icons-material/CellTower';

// Import shared components
import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';
import DataTable from '../components/shared/DataTable';

const DisasterReliefOptimizer = () => {
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sample data for demand forecasting chart
  const demandForecastData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Food (kg)',
        data: [2500, 3200, 2800, 2600, 2400, 2200, 2000],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        fill: true,
      },
      {
        label: 'Water (liters)',
        data: [5000, 6500, 6000, 5500, 5000, 4500, 4000],
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.3)',
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
              AI Powered Disaster Relief Optimizer
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto'
            }}>
              Intelligent disaster response planning and resource allocation
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
                  subtitle="ML predicts shelter needs"
                  icon={<AssessmentIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Using historical and population data to predict food, water, and medical kit needs
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1200}>
              <Box>
                <DashboardCard 
                  title="Optimal Delivery Routing" 
                  subtitle="AI finds fastest, fuel-efficient paths"
                  icon={<LocalShippingIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Optimized routes for trucks and volunteers
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1400}>
              <Box>
                <DashboardCard 
                  title="Duplication Avoidance" 
                  subtitle="ML reallocates excess resources"
                  icon={<LoopIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Identifies and redirects excess resources to underserved areas
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1600}>
              <Box>
                <DashboardCard 
                  title="Community Need Detection" 
                  subtitle="AI uses mobile inputs or satellite data"
                  icon={<CellTowerIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Identifies urgent needs in affected communities
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
                    Shelter Needs Forecast
                  </Typography>
                  <Tooltip title="ML predictions based on historical and population data">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="line" 
                  data={demandForecastData} 
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
                          text: 'Quantity Needed',
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
                    Optimal Delivery Routing
                  </Typography>
                  <Tooltip title="AI finds fastest, most fuel-efficient paths for trucks and volunteers">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="bar" 
                  data={deliveryRoutingData} 
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
                          text: 'Value',
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
                    Resource Reallocation
                  </Typography>
                  <Tooltip title="ML reallocates excess resources to underserved areas">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="bar" 
                  data={resourceAllocationData} 
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
                          text: 'Resource Units',
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
                    Community Needs Detection
                  </Typography>
                  <Tooltip title="AI uses mobile inputs or satellite data to identify urgent needs">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
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
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DisasterReliefOptimizer;