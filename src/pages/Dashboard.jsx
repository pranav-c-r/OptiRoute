import React from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  Paper,
  useTheme,
  Button,
  alpha,
  keyframes
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
  0% { box-shadow: 0 0 5px rgba(120, 192, 224, 0.5); }
  50% { box-shadow: 0 0 20px rgba(120, 192, 224, 0.8); }
  100% { box-shadow: 0 0 5px rgba(120, 192, 224, 0.5); }
`;

// Styled components
const AnimatedBox = styled(Box)({
  animation: `${floatAnimation} 6s ease-in-out infinite`,
});

const GradientPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha('#0E0E52', 0.8)} 0%, ${alpha('#3943B7', 0.8)} 100%)`,
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 8s ease infinite`,
  border: '1px solid rgba(120, 192, 224, 0.3)',
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
    background: 'radial-gradient(circle at top right, rgba(120, 192, 224, 0.2), transparent 40%)',
    zIndex: 0
  }
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(13, 13, 82, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(120, 192, 224, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  borderRadius: 16,
  color: 'white'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #78C0E0 30%, #449DD1 90%)',
  borderRadius: 20,
  boxShadow: '0 3px 15px rgba(120, 192, 224, 0.3)',
  padding: '10px 20px',
  fontWeight: 'bold',
  textTransform: 'none',
  animation: `${glowAnimation} 3s infinite`,
  '&:hover': {
    background: 'linear-gradient(45deg, #449DD1 30%, #78C0E0 90%)',
    boxShadow: '0 5px 20px rgba(120, 192, 224, 0.5)',
    transform: 'translateY(-2px)',
    transition: 'all 0.3s ease'
  }
}));

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Sample data for overview chart
  const overviewData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Hospital Resources Optimized',
        data: [65, 72, 78, 85, 82, 90],
        borderColor: '#78C0E0',
        backgroundColor: alpha('#78C0E0', 0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Disaster Relief Efficiency',
        data: [55, 60, 65, 75, 80, 85],
        borderColor: '#3943B7',
        backgroundColor: alpha('#3943B7', 0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Food Waste Reduction',
        data: [40, 45, 55, 65, 70, 75],
        borderColor: '#449DD1',
        backgroundColor: alpha('#449DD1', 0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Shelter Allocation Efficiency',
        data: [50, 55, 60, 70, 75, 85],
        borderColor: '#0E0E52',
        backgroundColor: alpha('#0E0E52', 0.1),
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
          '#78C0E0',
          '#3943B7',
          '#449DD1',
          '#0E0E52',
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
      background: 'linear-gradient(135deg, #0E0E52 0%, #1A1A6E 100%)',
      minHeight: '100vh'
    }}>
      <AnimatedBox sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4
      }}>
        <AnalyticsIcon sx={{ 
          fontSize: 40, 
          color: '#78C0E0', 
          mr: 2,
          filter: 'drop-shadow(0 0 10px rgba(120, 192, 224, 0.5))'
        }} />
        <Typography variant="h4" sx={{ 
          color: 'white', 
          fontWeight: 'bold',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          OptiRoute Dashboard
        </Typography>
      </AnimatedBox>

      <Grid container spacing={3}>
        {/* Main feature cards */}
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Hospital Resource Optimizer" 
            subtitle="AI-driven hospital resource management"
            icon={<LocalHospitalIcon />}
            gradient="linear-gradient(135deg, #0E0E52 0%, #3943B7 100%)"
            animation={pulseAnimation}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
              Optimize bed allocation, patient routing, staff scheduling, and ensure equity
            </Typography>
            <StyledButton 
              fullWidth
              onClick={() => navigate('/hospital-optimizer')}
            >
              View Module
            </StyledButton>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Disaster Relief Optimizer" 
            subtitle="AI-powered disaster response planning"
            icon={<VolunteerActivismIcon />}
            gradient="linear-gradient(135deg, #3943B7 0%, #449DD1 100%)"
            animation={pulseAnimation}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
              Forecast needs, optimize delivery routes, avoid duplication, and detect community needs
            </Typography>
            <StyledButton 
              fullWidth
              onClick={() => navigate('/disaster-relief')}
            >
              View Module
            </StyledButton>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Hunger & Waste Optimizer" 
            subtitle="AI-driven food distribution system"
            icon={<RestaurantIcon />}
            gradient="linear-gradient(135deg, #449DD1 0%, #78C0E0 100%)"
            animation={pulseAnimation}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
              Forecast demand, match surplus to need, optimize perishables, and maximize impact
            </Typography>
            <StyledButton 
              fullWidth
              onClick={() => navigate('/hunger-waste')}
            >
              View Module
            </StyledButton>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard 
            title="Smart Shelter Allocation" 
            subtitle="AI-powered housing allocation system"
            icon={<HomeIcon />}
            gradient="linear-gradient(135deg, #78C0E0 0%, #0E0E52 100%)"
            animation={pulseAnimation}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
              Forecast demand, dynamically allocate units, prioritize needs, and optimize impact
            </Typography>
            <StyledButton 
              fullWidth
              onClick={() => navigate('/shelter-allocation')}
            >
              View Module
            </StyledButton>
          </DashboardCard>
        </Grid>

        {/* Overview charts */}
        <Grid item xs={12} md={8}>
          <GlassPaper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon sx={{ mr: 1, color: '#78C0E0' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Performance Overview
              </Typography>
            </Box>
            <ChartComponent 
              type="line" 
              data={overviewData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      color: 'white'
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color: 'rgba(255,255,255,0.1)'
                    },
                    ticks: {
                      color: 'white'
                    }
                  },
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                      color: 'rgba(255,255,255,0.1)'
                    },
                    ticks: {
                      color: 'white'
                    },
                    title: {
                      display: true,
                      text: 'Efficiency %',
                      color: 'white'
                    }
                  }
                }
              }}
            />
          </GlassPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <GlassPaper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AnalyticsIcon sx={{ mr: 1, color: '#78C0E0' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Impact Distribution
              </Typography>
            </Box>
            <ChartComponent 
              type="doughnut" 
              data={impactData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'white',
                      padding: 15
                    }
                  }
                },
                cutout: '60%'
              }}
            />
          </GlassPaper>
        </Grid>

        {/* Platform overview */}
        <Grid item xs={12}>
          <GradientPaper sx={{ p: 4 }}>
            <Box position="relative" zIndex={1}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                About OptiRoute
              </Typography>
              <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
                OptiRoute is an advanced AI-powered platform designed to optimize resource allocation across multiple domains. Our platform leverages machine learning algorithms to provide data-driven solutions for hospitals, disaster relief operations, food distribution networks, and housing allocation systems.
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Each module in our platform is specifically designed to address unique challenges in resource allocation, helping organizations maximize efficiency, reduce waste, and ensure equitable distribution of critical resources to those who need them most.
              </Typography>
            </Box>
          </GradientPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;