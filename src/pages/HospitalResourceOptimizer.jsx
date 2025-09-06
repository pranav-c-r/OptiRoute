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
  Container,
  alpha
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sample data for bed occupancy chart
  const bedOccupancyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Regular Beds',
        data: [85, 88, 92, 90, 87, 80, 82],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        fill: true,
      },
      {
        label: 'ICU Beds',
        data: [65, 70, 75, 78, 72, 68, 66],
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.3)',
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
              AI Driven Hospital Resource Optimizer
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto'
            }}>
              Advanced machine learning algorithms for optimal hospital resource management
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Feature cards */}
          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1000}>
              <Box>
                <DashboardCard 
                  title="Predictive Bed Availability" 
                  subtitle="ML forecasts for bed and ICU occupancy"
                  icon={<BedIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Using historical admissions and trends to predict future needs
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1200}>
              <Box>
                <DashboardCard 
                  title="Smart Patient Routing" 
                  subtitle="AI recommendations for optimal hospital placement"
                  icon={<RouteIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Based on location, severity, and current wait times
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1400}>
              <Box>
                <DashboardCard 
                  title="Dynamic Staff Scheduling" 
                  subtitle="AI balanced workload distribution"
                  icon={<PeopleIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Prevents burnout and ensures critical areas are covered
                  </Typography>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1600}>
              <Box>
                <DashboardCard 
                  title="Risk & Equity Alerts" 
                  subtitle="ML flags for high-risk zones"
                  icon={<WarningIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    lineHeight: 1.6,
                    fontFamily: 'Poppins'
                  }}>
                    Ensures fair resource allocation to underserved populations
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
                    Bed & ICU Occupancy Forecast
                  </Typography>
                  <Tooltip title="ML forecasts based on historical data and current trends">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="line" 
                  data={bedOccupancyData} 
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
                        max: 100,
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
                          text: 'Occupancy %',
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
                    Smart Patient Routing
                  </Typography>
                  <Tooltip title="AI recommends optimal hospital based on wait times, location, and severity">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="bar" 
                  data={patientRoutingData} 
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
                          text: 'Wait Time (minutes)',
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
                    Dynamic Staff Scheduling
                  </Typography>
                  <Tooltip title="AI balances doctor/nurse workload to prevent burnout">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="bar" 
                  data={staffSchedulingData} 
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
                          text: 'Staff Count',
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
                    Risk & Equity Alerts
                  </Typography>
                  <Tooltip title="ML flags high-risk zones and underserved populations">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
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
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HospitalResourceOptimizer;