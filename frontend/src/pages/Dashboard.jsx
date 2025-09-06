import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  Paper,
  useTheme,
  Button,
  alpha,
  keyframes,
  Fade,
  Slide,
  Zoom,
  Container,
  CircularProgress,
  Alert,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useAuth } from '../contexts/AuthContext';

// Icons
import {
  LocalHospital as LocalHospitalIcon,
  VolunteerActivism as VolunteerActivismIcon,
  Restaurant as RestaurantIcon,
  Home as HomeIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationOnIcon,
  GpsFixed as GpsFixedIcon,
  MedicalServices as MedicalServicesIcon,
  DirectionsCar as DirectionsCarIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Bed as BedIcon
} from '@mui/icons-material';

// Import shared components
import DashboardCard from '../components/shared/DashboardCard';
import ChartComponent from '../components/shared/ChartComponent';

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.5); }
  50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.8); }
  100% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.5); }
`;

// Styled components
const AnimatedBox = styled(Box)({
  animation: `${floatAnimation} 6s ease-in-out infinite`,
});

const GradientPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha('#0a1929', 0.8)} 0%, ${alpha('#273e6b', 0.8)} 100%)`,
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 8s ease infinite`,
  border: '1px solid rgba(25, 118, 210, 0.3)',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
  borderRadius: 16,
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(25, 118, 210, 0.2), transparent 40%)',
    zIndex: 0
  }
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(39, 62, 107, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(25, 118, 210, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  borderRadius: 16,
  color: 'white'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
  borderRadius: 20,
  boxShadow: '0 3px 15px rgba(25, 118, 210, 0.3)',
  padding: '10px 20px',
  fontWeight: 'bold',
  textTransform: 'none',
  animation: `${glowAnimation} 3s infinite`,
  '&:hover': {
    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
    boxShadow: '0 5px 20px rgba(25, 118, 210, 0.5)',
    transform: 'translateY(-2px)',
    transition: 'all 0.3s ease'
  }
}));

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: null,
    loading: false,
    error: null
  });

  // Role-specific state
  const [doctorDialog, setDoctorDialog] = useState(false);
  const [ambulanceDialog, setAmbulanceDialog] = useState(false);
  const [hospitalAdminDialog, setHospitalAdminDialog] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Doctor state
  const [doctorData, setDoctorData] = useState({
    hospital: '',
    hospitalLocation: '',
    specialization: '',
    isAvailable: false,
    nextAvailableTime: ''
  });

  // Ambulance state
  const [ambulanceData, setAmbulanceData] = useState({
    isSevere: false,
    patientCondition: '',
    voiceInput: ''
  });

  // Hospital Admin state
  const [hospitalAdminData, setHospitalAdminData] = useState({
    bedsAvailable: 0,
    doctorsAvailable: []
  });

  // Geolocation functionality
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by this browser.',
        loading: false
      }));
      return;
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding using a free service (nominatim)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();
          
          setLocation({
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
            address: data.display_name || 'Address not found',
            loading: false,
            error: null
          });
        } catch (error) {
          setLocation({
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
            address: 'Unable to fetch address',
            loading: false,
            error: null
          });
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: errorMessage
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setAmbulanceData(prev => ({ ...prev, voiceInput: transcript }));
        processVoiceInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, []);

  // Process voice input with Gemini API
  const processVoiceInput = async (transcript) => {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAx7eCFzaSrdDjEjEOevX1mCcRpathn7Uo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze this medical emergency description and extract: 1) Severity level (mild/moderate/severe), 2) Patient condition/symptoms. Text: "${transcript}"`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        const analysis = data.candidates[0].content.parts[0].text;
        // Parse the response and update state
        const isSevere = analysis.toLowerCase().includes('severe');
        setAmbulanceData(prev => ({
          ...prev,
          isSevere,
          patientCondition: analysis
        }));
      }
    } catch (error) {
      console.error('Error processing voice input:', error);
    }
  };

  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  // Role-specific handlers
  const handleDoctorSubmit = async () => {
    await updateUserProfile(doctorData);
    setDoctorDialog(false);
  };

  const handleAmbulanceSubmit = async () => {
    await updateUserProfile(ambulanceData);
    setAmbulanceDialog(false);
  };

  const handleHospitalAdminSubmit = async () => {
    await updateUserProfile(hospitalAdminData);
    setHospitalAdminDialog(false);
  };

  // Store location data in Firebase
  const storeLocationData = async (locationData) => {
    if (!user) return;
    
    try {
      await updateUserProfile({
        location: {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          address: locationData.address,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error storing location data:', error);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    // Automatically get location on component mount
    getCurrentLocation();
  }, []);

  // Store location when it's updated
  useEffect(() => {
    if (location.latitude && location.longitude && !location.loading && !location.error) {
      storeLocationData(location);
    }
  }, [location.latitude, location.longitude, location.address]);

  // Sample data for overview chart
  const overviewData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Hospital Resources Optimized',
        data: [65, 72, 78, 85, 82, 90],
        borderColor: '#1976d2',
        backgroundColor: alpha('#1976d2', 0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Disaster Relief Efficiency',
        data: [55, 60, 65, 75, 80, 85],
        borderColor: '#42a5f5',
        backgroundColor: alpha('#42a5f5', 0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Food Waste Reduction',
        data: [40, 45, 55, 65, 70, 75],
        borderColor: '#1976d2',
        backgroundColor: alpha('#1976d2', 0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Shelter Allocation Efficiency',
        data: [50, 55, 60, 70, 75, 85],
        borderColor: '#42a5f5',
        backgroundColor: alpha('#42a5f5', 0.1),
        tension: 0.4,
        fill: true,
      }
    ]
  };

  // Sample data for impact chart
  const impactData = {
    labels: ['Hospital', 'Disaster Relief', 'Hunger & Waste', 'Shelter'],
    datasets: [
      {
        label: 'Impact Score',
        data: [85, 78, 72, 80],
        backgroundColor: [
          '#1976d2',
          '#42a5f5',
          '#1976d2',
          '#42a5f5',
        ],
        borderWidth: 0,
        borderRadius: 6,
        hoverOffset: 12,
      }
    ]
  };

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
          <AnimatedBox sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <AnalyticsIcon sx={{ 
              fontSize: 48, 
              color: '#1976d2', 
              mr: 2,
              filter: 'drop-shadow(0 0 15px rgba(25, 118, 210, 0.6))',
              animation: 'pulse 2s infinite'
            }} />
            <Typography variant="h3" sx={{ 
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em'
            }}>
              OptiRoute Dashboard
            </Typography>
          </AnimatedBox>
        </Fade>

        {/* Compact Location Display */}
        <Fade in={isLoaded} timeout={1000}>
          <Box sx={{ mb: 3 }}>
            <GlassPaper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ 
                    fontSize: 20, 
                    color: '#1976d2', 
                    mr: 1
                  }} />
                  <Typography variant="subtitle1" sx={{ 
                    color: 'white',
                    fontWeight: 600
                  }}>
                    Current Location
                  </Typography>
                </Box>
                
                {location.loading && (
                  <CircularProgress size={20} sx={{ color: '#1976d2' }} />
                )}
                
                {location.error && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<GpsFixedIcon />}
                    onClick={getCurrentLocation}
                    sx={{
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      '&:hover': {
                        borderColor: '#42a5f5',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)'
                      }
                    }}
                  >
                    Retry
                  </Button>
                )}
              </Box>
              
              {location.latitude && location.longitude && !location.loading && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {location.latitude}°, {location.longitude}°
                  </Typography>
                  {location.address && (
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '300px'
                    }}>
                      {location.address}
                    </Typography>
                  )}
                </Box>
              )}
              
              {!location.loading && !location.error && !location.latitude && (
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<GpsFixedIcon />}
                  onClick={getCurrentLocation}
                  sx={{
                    mt: 1,
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                    }
                  }}
                >
                  Get Location
                </Button>
              )}
            </GlassPaper>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Main feature cards */}
          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1000}>
              <Box>
                <DashboardCard 
                  title="Hospital Resource Optimizer" 
                  subtitle="AI-driven hospital resource management"
                  icon={<LocalHospitalIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                  animation={pulseAnimation}
                >
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.6 }}>
                    Optimize bed allocation, patient routing, staff scheduling, and ensure equity
                  </Typography>
                  <StyledButton 
                    fullWidth
                    onClick={() => navigate('/hospital-optimizer')}
                    sx={{ mt: 1 }}
                  >
                    View Module
                  </StyledButton>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1200}>
              <Box>
                <DashboardCard 
                  title="Disaster Relief Optimizer" 
                  subtitle="AI-powered disaster response planning"
                  icon={<VolunteerActivismIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                  animation={pulseAnimation}
                >
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.6 }}>
                    Forecast needs, optimize delivery routes, avoid duplication, and detect community needs
                  </Typography>
                  <StyledButton 
                    fullWidth
                    onClick={() => navigate('/disaster-relief')}
                    sx={{ mt: 1 }}
                  >
                    View Module
                  </StyledButton>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1400}>
              <Box>
                <DashboardCard 
                  title="Hunger & Waste Optimizer" 
                  subtitle="AI-driven food distribution system"
                  icon={<RestaurantIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                  animation={pulseAnimation}
                >
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.6 }}>
                    Forecast demand, match surplus to need, optimize perishables, and maximize impact
                  </Typography>
                  <StyledButton 
                    fullWidth
                    onClick={() => navigate('/hunger-waste')}
                    sx={{ mt: 1 }}
                  >
                    View Module
                  </StyledButton>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Slide direction="up" in={isLoaded} timeout={1600}>
              <Box>
                <DashboardCard 
                  title="Smart Shelter Allocation" 
                  subtitle="AI-powered housing allocation system"
                  icon={<HomeIcon sx={{ fontSize: 28 }} />}
                  gradient="linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(39, 62, 107, 0.8) 100%)"
                  animation={pulseAnimation}
                >
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.6 }}>
                    Forecast demand, dynamically allocate units, prioritize needs, and optimize impact
                  </Typography>
                  <StyledButton 
                    fullWidth
                    onClick={() => navigate('/shelter-allocation')}
                    sx={{ mt: 1 }}
                  >
                    View Module
                  </StyledButton>
                </DashboardCard>
              </Box>
            </Slide>
          </Grid>

          {/* Overview charts */}
          <Grid item xs={12} md={8}>
            <Fade in={isLoaded} timeout={1800}>
              <GlassPaper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ 
                    mr: 1, 
                    color: '#1976d2',
                    fontSize: 28,
                    filter: 'drop-shadow(0 0 8px rgba(25, 118, 210, 0.5))'
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Performance Overview
                  </Typography>
                </Box>
                <ChartComponent 
                  type="line" 
                  data={overviewData} 
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
                          text: 'Efficiency %',
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
              </GlassPaper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade in={isLoaded} timeout={2000}>
              <GlassPaper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AnalyticsIcon sx={{ 
                    mr: 1, 
                    color: '#1976d2',
                    fontSize: 28,
                    filter: 'drop-shadow(0 0 8px rgba(25, 118, 210, 0.5))'
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Impact Distribution
                  </Typography>
                </Box>
                <ChartComponent 
                  type="doughnut" 
                  data={impactData} 
                  options={{
                    responsive: true,
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart'
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: 'white',
                          padding: 15,
                          font: {
                            family: 'Poppins',
                            weight: 500
                          }
                        }
                      }
                    },
                    cutout: '60%'
                  }}
                />
              </GlassPaper>
            </Fade>
          </Grid>

          {/* Platform overview */}
          <Grid item xs={12}>
            <Fade in={isLoaded} timeout={2200}>
              <GradientPaper sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
                <Box position="relative" zIndex={1}>
                  <Typography variant="h5" sx={{ 
                    mb: 3, 
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center'
                  }}>
                    About OptiRoute
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ 
                    opacity: 0.95, 
                    lineHeight: 1.8,
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins'
                  }}>
                    OptiRoute is an advanced AI-powered platform designed to optimize resource allocation across multiple domains. Our platform leverages machine learning algorithms to provide data-driven solutions for hospitals, disaster relief operations, food distribution networks, and housing allocation systems.
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    opacity: 0.95, 
                    lineHeight: 1.8,
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins'
                  }}>
                    Each module in our platform is specifically designed to address unique challenges in resource allocation, helping organizations maximize efficiency, reduce waste, and ensure equitable distribution of critical resources to those who need them most.
                  </Typography>
                </Box>
                
                {/* Animated background elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(120, 192, 224, 0.1) 0%, transparent 70%)',
                    animation: 'float 8s ease-in-out infinite',
                    zIndex: 0,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(57, 67, 183, 0.1) 0%, transparent 70%)',
                    animation: 'float 6s ease-in-out infinite reverse',
                    zIndex: 0,
                  }}
                />
              </GradientPaper>
            </Fade>
          </Grid>
        </Grid>

        {/* Role-specific components */}
        {user?.role === 'doctor' && (
          <Fade in={isLoaded} timeout={2400}>
            <Box sx={{ mt: 4 }}>
              <GlassPaper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MedicalServicesIcon sx={{ 
                    fontSize: 28, 
                    color: '#1976d2', 
                    mr: 1 
                  }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Doctor Profile
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Hospital Name"
                      value={doctorData.hospital}
                      onChange={(e) => setDoctorData(prev => ({ ...prev, hospital: e.target.value }))}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Hospital Location"
                      value={doctorData.hospitalLocation}
                      onChange={(e) => setDoctorData(prev => ({ ...prev, hospitalLocation: e.target.value }))}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Specialization"
                      value={doctorData.specialization}
                      onChange={(e) => setDoctorData(prev => ({ ...prev, specialization: e.target.value }))}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Next Available Time"
                      type="time"
                      value={doctorData.nextAvailableTime}
                      onChange={(e) => setDoctorData(prev => ({ ...prev, nextAvailableTime: e.target.value }))}
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={doctorData.isAvailable}
                          onChange={(e) => setDoctorData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                          color="primary"
                        />
                      }
                      label={
                        <Typography sx={{ color: 'white' }}>
                          Currently Available
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleDoctorSubmit}
                      sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                        }
                      }}
                    >
                      Update Profile
                    </Button>
                  </Grid>
                </Grid>
              </GlassPaper>
            </Box>
          </Fade>
        )}

        {user?.role === 'ambulance_driver' && (
          <Fade in={isLoaded} timeout={2400}>
            <Box sx={{ mt: 4 }}>
              <GlassPaper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsCarIcon sx={{ 
                    fontSize: 28, 
                    color: '#f44336', 
                    mr: 1 
                  }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Emergency Case Details
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={ambulanceData.isSevere}
                          onChange={(e) => setAmbulanceData(prev => ({ ...prev, isSevere: e.target.checked }))}
                          color="error"
                        />
                      }
                      label={
                        <Typography sx={{ color: 'white' }}>
                          Severe Case
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Patient Condition"
                      multiline
                      rows={3}
                      value={ambulanceData.patientCondition}
                      onChange={(e) => setAmbulanceData(prev => ({ ...prev, patientCondition: e.target.value }))}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Voice Input"
                        multiline
                        rows={2}
                        value={ambulanceData.voiceInput}
                        onChange={(e) => setAmbulanceData(prev => ({ ...prev, voiceInput: e.target.value }))}
                      />
                      <IconButton
                        onClick={isRecording ? stopRecording : startRecording}
                        sx={{
                          backgroundColor: isRecording ? '#f44336' : '#1976d2',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: isRecording ? '#d32f2f' : '#1565c0'
                          }
                        }}
                      >
                        {isRecording ? <MicOffIcon /> : <MicIcon />}
                      </IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                      Click the microphone to record patient details
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleAmbulanceSubmit}
                      sx={{
                        background: 'linear-gradient(45deg, #f44336 30%, #ff5722 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)'
                        }
                      }}
                    >
                      Submit Case Details
                    </Button>
                  </Grid>
                </Grid>
              </GlassPaper>
            </Box>
          </Fade>
        )}

        {user?.role === 'hospital_admin' && (
          <Fade in={isLoaded} timeout={2400}>
            <Box sx={{ mt: 4 }}>
              <GlassPaper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AdminPanelSettingsIcon sx={{ 
                    fontSize: 28, 
                    color: '#1976d2', 
                    mr: 1 
                  }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Hospital Resource Management
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Beds Available"
                      type="number"
                      value={hospitalAdminData.bedsAvailable}
                      onChange={(e) => setHospitalAdminData(prev => ({ ...prev, bedsAvailable: parseInt(e.target.value) || 0 }))}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Add Doctor Specialization"
                      placeholder="e.g., Cardiology, Neurology"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setHospitalAdminData(prev => ({
                            ...prev,
                            doctorsAvailable: [...prev.doctorsAvailable, e.target.value.trim()]
                          }));
                          e.target.value = '';
                        }
                      }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: '#42a5f5', mb: 1 }}>
                      Available Doctors by Specialization:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {hospitalAdminData.doctorsAvailable.map((specialization, index) => (
                        <Chip
                          key={index}
                          label={specialization}
                          onDelete={() => {
                            setHospitalAdminData(prev => ({
                              ...prev,
                              doctorsAvailable: prev.doctorsAvailable.filter((_, i) => i !== index)
                            }));
                          }}
                          sx={{
                            backgroundColor: 'rgba(25, 118, 210, 0.2)',
                            color: 'white',
                            '& .MuiChip-deleteIcon': {
                              color: 'rgba(255,255,255,0.7)'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleHospitalAdminSubmit}
                      sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                        }
                      }}
                    >
                      Update Hospital Resources
                    </Button>
                  </Grid>
                </Grid>
              </GlassPaper>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;