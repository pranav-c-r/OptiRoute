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
  alpha,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Info as InfoIcon,
  Bed as BedIcon,
  Route as RouteIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';

// Import shared components
import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';
import DataTable from '../components/shared/DataTable';

// Import API service
import { hospitalAPI, handleApiError } from '../services/api';

const HospitalResourceOptimizer = () => {
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API Data States
  const [dashboardStats, setDashboardStats] = useState(null);
  const [occupancyTrends, setOccupancyTrends] = useState(null);
  const [specialtyDistribution, setSpecialtyDistribution] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  
  // Patient Search Dialog
  const [openPatientDialog, setOpenPatientDialog] = useState(false);
  const [patientForm, setPatientForm] = useState({
    patient_lon: 0,
    patient_lat: 0,
    severity: 1
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadData();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Automatically get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPatientForm(prev => ({
          ...prev,
          patient_lat: position.coords.latitude,
          patient_lon: position.coords.longitude
        }));
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Optionally set default values or show a message
      }
    );
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [
        statsData,
        trendsData,
        specialtyData,
        hospitalsData,
        doctorsData,
        patientsData
      ] = await Promise.all([
        hospitalAPI.getDashboardStats(),
        hospitalAPI.getOccupancyTrends(),
        hospitalAPI.getSpecialtyDistribution(),
        hospitalAPI.getHospitals(),
        hospitalAPI.getDoctors(),
        hospitalAPI.getPatients()
      ]);
      
      setDashboardStats(statsData);
      setOccupancyTrends(trendsData);
      setSpecialtyDistribution(specialtyData);
      setHospitals(hospitalsData.hospitals || []);
      setDoctors(doctorsData.doctors || []);
      setPatients(patientsData.patients || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSearch = async () => {
    try {
      setSearching(true);
      const results = await hospitalAPI.findHospital(patientForm);
      console.log('Hospital search results:', results); // Debug log
      setSearchResults(results);
      if (!results || results.length === 0) {
        setError('No recommended hospitals found for the given criteria.');
      } else {
        setError(null);
      }
    } catch (error) {
      handleApiError(error);
      setError('Failed to fetch recommended hospitals.');
    } finally {
      setSearching(false);
    }
  };

  // Process real-time bed occupancy data from API
  const bedOccupancyData = occupancyTrends ? {
    labels: occupancyTrends.hours,
    datasets: [
      {
        label: 'Occupancy %',
        data: occupancyTrends.occupancy_percentages,
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        fill: true,
      }
    ]
  } : {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
    datasets: [
      {
        label: 'General Beds',
        data: [65, 72, 78, 85, 82, 75, 68],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        fill: true,
      }
    ]
  };

  // Process hospitals data from API
  const nearestHospitalsData = hospitals.length > 0 ? {
    labels: hospitals.slice(0, 5).map(h => h.name),
    datasets: [
      {
        label: 'Available Beds',
        data: hospitals.slice(0, 5).map(h => h.available_beds),
        backgroundColor: [
          '#1976d2',
          '#42a5f5',
          '#4caf50',
          '#ff9800',
          '#f44336',
        ],
      }
    ]
  } : {
    labels: ['No Data'],
    datasets: [
      {
        label: 'Available Beds',
        data: [0],
        backgroundColor: ['#666'],
      }
    ]
  };

  // Process staff scheduling data from API
  const staffSchedulingData = specialtyDistribution ? {
    labels: specialtyDistribution.specialties,
    datasets: [
      {
        label: 'Doctors',
        data: specialtyDistribution.counts,
        backgroundColor: '#1976d2',
      }
    ]
  } : {
    labels: ['Emergency', 'ICU', 'Surgery', 'Cardiology', 'Pediatrics'],
    datasets: [
      {
        label: 'Doctors',
        data: [3, 2, 4, 2, 3],
        backgroundColor: '#1976d2',
      }
    ]
  };

  // Hospital details table data
  const hospitalDetailsColumns = [
    { field: 'hospital_id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Hospital Name', width: 200 },
    { field: 'available_beds', headerName: 'Available Beds', width: 130, type: 'number' },
    { field: 'total_beds', headerName: 'Total Beds', width: 100, type: 'number' },
    { field: 'available_icu_beds', headerName: 'ICU Beds', width: 100, type: 'number' },
    { field: 'occupancy_rate', headerName: 'Occupancy %', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const hospitalDetailsRows = hospitals.map((hospital, index) => {
    const occupancyRate = ((hospital.total_beds - hospital.available_beds) / hospital.total_beds * 100).toFixed(1);
    return {
      id: hospital.hospital_id,
      hospital_id: hospital.hospital_id,
      name: hospital.name,
      available_beds: hospital.available_beds,
      total_beds: hospital.total_beds,
      available_icu_beds: hospital.available_icu_beds,
      occupancy_rate: `${occupancyRate}%`,
      status: occupancyRate > 90 ? 'Full' : occupancyRate > 70 ? 'Limited' : 'Available'
    };
  });

  // Emergency alerts and critical cases
  const emergencyAlertsColumns = [
    { field: 'patient_id', headerName: 'Patient ID', width: 100 },
    { field: 'severity', headerName: 'Severity', width: 100 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'priority', headerName: 'Priority', width: 100 },
    { field: 'created_at', headerName: 'Created', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const emergencyAlertsRows = patients.map((patient, index) => {
    const priority = patient.severity >= 4 ? 'Critical' : patient.severity >= 3 ? 'High' : 'Medium';
    return {
      id: patient.patient_id,
      patient_id: patient.patient_id,
      severity: patient.severity,
      location: `${patient.patient_lat.toFixed(4)}, ${patient.patient_lon.toFixed(4)}`,
      priority: priority,
      created_at: new Date(patient.created_at).toLocaleString(),
      status: patient.status
    };
  });

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
              mx: 'auto',
              mb: 3
            }}>
              Advanced machine learning algorithms for optimal hospital resource management
            </Typography>
            
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => setOpenPatientDialog(true)}
                sx={{ 
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #1976d2)'
                  }
                }}
              >
                Find Hospital for Patient
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={loadData}
                sx={{ 
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Refresh Data
              </Button>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}>
                {error}
              </Alert>
            )}

            {/* Loading Indicator */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <CircularProgress sx={{ color: '#1976d2' }} />
              </Box>
            )}
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
                    Real-time Bed Occupancy (24h)
                  </Typography>
                  <Tooltip title="Live occupancy data updated every 15 minutes">
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
                    Nearest Hospitals - Available Beds
                  </Typography>
                  <Tooltip title="Real-time bed availability at nearby hospitals">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ChartComponent 
                  type="bar" 
                  data={nearestHospitalsData} 
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
                    Staff by Department
                  </Typography>
                  <Tooltip title="Current staffing levels across hospital departments">
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
                    Emergency Cases & Critical Alerts
                  </Typography>
                  <Tooltip title="Real-time emergency cases and critical patient alerts">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ height: 400 }}>
                  <DataTable 
                    rows={emergencyAlertsRows} 
                    columns={emergencyAlertsColumns} 
                    pageSize={5}
                  />
                </Box>
              </Paper>
            </Fade>
          </Grid>

          {/* Hospital Details Table */}
          <Grid item xs={12}>
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
                    Hospital Network Details
                  </Typography>
                  <Tooltip title="Complete hospital network information with real-time status">
                    <IconButton size="small" sx={{ color: 'rgba(25, 118, 210, 0.7)' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ height: 400 }}>
                  <DataTable 
                    rows={hospitalDetailsRows} 
                    columns={hospitalDetailsColumns} 
                    pageSize={5}
                  />
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Patient Search Dialog */}
      <Dialog open={openPatientDialog} onClose={() => setOpenPatientDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Find Hospital for Patient</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Severity Level"
                type="number"
                value={isNaN(patientForm.severity) ? '' : String(patientForm.severity)}
                onChange={(e) => setPatientForm(prev => ({ ...prev, severity: parseInt(e.target.value) }))
                }
                helperText="1-5 scale (1=low, 5=critical)"
                inputProps={{ min: 1, max: 5 }}
              />
            </Grid>
          </Grid>

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Recommended Hospitals:
              </Typography>
              {searchResults.map((hospital, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
                  <Typography variant="h6" sx={{ color: 'primary.main' }}>
                    {hospital.hospital_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Distance: {hospital.distance_km} km | 
                    Available Beds: {hospital.predicted_beds_available} | 
                    Suitability Score: {hospital.suitability_score !== undefined && !isNaN(hospital.suitability_score) ? (hospital.suitability_score * 100).toFixed(1) : ''}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Location: {hospital.hospital_latitude !== undefined && !isNaN(hospital.hospital_latitude) ? hospital.hospital_latitude.toFixed(4) : ''}, {hospital.hospital_longitude !== undefined && !isNaN(hospital.hospital_longitude) ? hospital.hospital_longitude.toFixed(4) : ''}
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {error ? error : 'No recommended hospitals found.'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPatientDialog(false)}>Cancel</Button>
          <Button 
            onClick={handlePatientSearch} 
            variant="contained"
            disabled={searching}
            startIcon={searching ? <CircularProgress size={20} /> : <SearchIcon />}
          >
            {searching ? 'Searching...' : 'Find Hospital'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HospitalResourceOptimizer;