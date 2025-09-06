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
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

// Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: null,
    loading: false,
    error: null
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

  useEffect(() => {
    setIsLoaded(true);
    // Automatically get location on component mount
    getCurrentLocation();
  }, []);

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

        {/* Location Display Card */}
        <Fade in={isLoaded} timeout={1000}>
          <Box sx={{ mb: 4 }}>
            <GlassPaper sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ 
                  fontSize: 32, 
                  color: '#1976d2', 
                  mr: 1,
                  filter: 'drop-shadow(0 0 10px rgba(25, 118, 210, 0.6))'
                }} />
                <Typography variant="h5" sx={{ 
                  color: 'white',
                  fontWeight: 600
                }}>
                  Live Location
                </Typography>
              </Box>
              
              {location.loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                  <CircularProgress size={24} sx={{ color: '#1976d2', mr: 2 }} />
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Getting your location...
                  </Typography>
                </Box>
              )}
              
              {location.error && (
                <Box sx={{ mb: 2 }}>
                  <Alert severity="error" sx={{ 
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    color: '#ff6b6b',
                    border: '1px solid rgba(211, 47, 47, 0.3)',
                    '& .MuiAlert-icon': { color: '#ff6b6b' }
                  }}>
                    {location.error}
                  </Alert>
                  <Button
                    variant="outlined"
                    startIcon={<GpsFixedIcon />}
                    onClick={getCurrentLocation}
                    sx={{
                      mt: 2,
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      '&:hover': {
                        borderColor: '#42a5f5',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)'
                      }
                    }}
                  >
                    Retry Location
                  </Button>
                </Box>
              )}
              
              {location.latitude && location.longitude && !location.loading && (
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: 2,
                      border: '1px solid rgba(25, 118, 210, 0.3)'
                    }}>
                      <Typography variant="subtitle2" sx={{ color: '#42a5f5', mb: 1 }}>
                        Latitude
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white', fontFamily: 'monospace' }}>
                        {location.latitude}°
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: 2,
                      border: '1px solid rgba(25, 118, 210, 0.3)'
                    }}>
                      <Typography variant="subtitle2" sx={{ color: '#42a5f5', mb: 1 }}>
                        Longitude
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white', fontFamily: 'monospace' }}>
                        {location.longitude}°
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: 2,
                      border: '1px solid rgba(25, 118, 210, 0.3)'
                    }}>
                      <Typography variant="subtitle2" sx={{ color: '#42a5f5', mb: 1 }}>
                        Accuracy
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        GPS-Level
                      </Typography>
                    </Box>
                  </Grid>
                  {location.address && (
                    <Grid item xs={12}>
                      <Box sx={{ 
                        p: 2, 
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        borderRadius: 2,
                        border: '1px solid rgba(25, 118, 210, 0.3)'
                      }}>
                        <Typography variant="subtitle2" sx={{ color: '#42a5f5', mb: 1 }}>
                          Address
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.5 }}>
                          {location.address}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
              
              {!location.loading && !location.error && !location.latitude && (
                <Button
                  variant="contained"
                  startIcon={<GpsFixedIcon />}
                  onClick={getCurrentLocation}
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                    }
                  }}
                >
                  Get My Location
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
      </Container>
    </Box>
  );
};

export default Dashboard;