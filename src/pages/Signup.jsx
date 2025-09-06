import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  PersonAdd as PersonAddIcon,
  LocalShipping as TruckIcon,
  MedicalServices as MedicalIcon,
  VolunteerActivism as VolunteerIcon,
  Business as BusinessIcon,
  Agriculture as AgricultureIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Warehouse as WarehouseIcon,
  DirectionsCar as AmbulanceIcon,
  LocalShipping as LogisticsIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    organization: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleOptions = [
    { value: 'doctor', label: 'Doctor', icon: <MedicalIcon />, color: '#1976d2' },
    { value: 'ambulance_driver', label: 'Ambulance Driver', icon: <AmbulanceIcon />, color: '#f44336' },
    { value: 'hospital_admin', label: 'Hospital Admin', icon: <HospitalIcon />, color: '#1976d2' },
    { value: 'nurse', label: 'Nurse', icon: <MedicalIcon />, color: '#42a5f5' },
    { value: 'relief_volunteer', label: 'Relief Volunteer', icon: <VolunteerIcon />, color: '#4caf50' },
    { value: 'ngo', label: 'NGO', icon: <BusinessIcon />, color: '#ff9800' },
    { value: 'logistics_driver', label: 'Logistics Driver', icon: <LogisticsIcon />, color: '#9c27b0' },
    { value: 'shelter_manager', label: 'Shelter Manager', icon: <HomeIcon />, color: '#607d8b' },
    { value: 'farmer', label: 'Farmer', icon: <AgricultureIcon />, color: '#8bc34a' },
    { value: 'warehouse_manager', label: 'Warehouse Manager', icon: <WarehouseIcon />, color: '#795548' },
    { value: 'housing_authority', label: 'Housing Authority', icon: <HomeIcon />, color: '#3f51b5' },
    { value: 'landlord', label: 'Landlord/Housing Provider', icon: <HomeIcon />, color: '#ff5722' },
    { value: 'normal_user', label: 'Normal User', icon: <PersonIcon />, color: '#9e9e9e' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role) => {
    setFormData({
      ...formData,
      role: role.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    const selectedRole = roleOptions.find(role => role.value === formData.role);
    const userData = {
      ...formData,
      roleName: selectedRole?.label || formData.role
    };

    const result = await signup(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#0a1929',
      py: 4,
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Slide direction="down" in timeout={1000}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{
                  p: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)'
                }}>
                  <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </Box>
            </Slide>
            
            <Typography variant="h3" sx={{
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mb: 2
            }}>
              Join OptiRoute
            </Typography>
            
            <Typography variant="h6" sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400
            }}>
              Create your account and select your role
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Role Selection */}
          <Grid item xs={12} md={6}>
            <Slide direction="left" in timeout={1200}>
              <Paper sx={{
                p: 3,
                background: 'rgba(39, 62, 107, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                height: '100%'
              }}>
                <Typography variant="h5" sx={{
                  color: 'white',
                  mb: 3,
                  textAlign: 'center',
                  fontWeight: 600
                }}>
                  Select Your Role
                </Typography>

                <Grid container spacing={2}>
                  {roleOptions.map((role) => (
                    <Grid item xs={6} sm={4} key={role.value}>
                      <Card
                        sx={{
                          background: formData.role === role.value 
                            ? `linear-gradient(45deg, ${role.color}, ${role.color}80)`
                            : 'rgba(255, 255, 255, 0.05)',
                          border: formData.role === role.value 
                            ? `2px solid ${role.color}`
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${role.color}40`,
                            borderColor: role.color
                          }
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleRoleSelect(role)}
                          sx={{ p: 2, textAlign: 'center' }}
                        >
                          <Box sx={{ color: role.color, mb: 1 }}>
                            {role.icon}
                          </Box>
                          <Typography variant="body2" sx={{
                            color: 'white',
                            fontWeight: formData.role === role.value ? 600 : 400,
                            fontSize: '0.75rem'
                          }}>
                            {role.label}
                          </Typography>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {formData.role && (
                  <Fade in>
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Chip
                        label={`Selected: ${roleOptions.find(r => r.value === formData.role)?.label}`}
                        color="primary"
                        variant="outlined"
                        sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}
                      />
                    </Box>
                  </Fade>
                )}
              </Paper>
            </Slide>
          </Grid>

          {/* Registration Form */}
          <Grid item xs={12} md={6}>
            <Slide direction="right" in timeout={1400}>
              <Paper sx={{
                p: 4,
                background: 'rgba(39, 62, 107, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                height: '100%'
              }}>
                <Typography variant="h5" sx={{
                  color: 'white',
                  mb: 3,
                  textAlign: 'center',
                  fontWeight: 600
                }}>
                  Account Details
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(25, 118, 210, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(25, 118, 210, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(25, 118, 210, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(25, 118, 210, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Organization (Optional)"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(25, 118, 210, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone (Optional)"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(25, 118, 210, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {error && (
                    <Alert severity="error" sx={{ mt: 3, backgroundColor: 'rgba(244, 67, 54, 0.1)', color: '#f44336' }}>
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading || !formData.role}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
                      },
                      '&:disabled': {
                        background: 'rgba(25, 118, 210, 0.3)',
                      }
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                      Already have an account?
                    </Typography>
                    <Link
                      component={RouterLink}
                      to="/login"
                      sx={{
                        color: '#1976d2',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          color: '#42a5f5',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Sign in instead
                    </Link>
                  </Box>
                </form>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Signup;
