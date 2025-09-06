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
  useTheme,
  Fade,
  Slide,
  Divider
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Login as LoginIcon,
  Google as GoogleIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.username);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');

    const result = await signInWithGoogle();
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setGoogleLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#0a1929',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
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
                  <HospitalIcon sx={{ fontSize: 40, color: 'white' }} />
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
              OptiRoute
            </Typography>
            
            <Typography variant="h6" sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400
            }}>
              Sign in to your account
            </Typography>
          </Box>
        </Fade>

        <Slide direction="up" in timeout={1200}>
          <Paper sx={{
            p: 4,
            background: 'rgba(39, 62, 107, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(25, 118, 210, 0.2)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                sx={{
                  mb: 3,
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

              {error && (
                <Alert severity="error" sx={{ mb: 3, backgroundColor: 'rgba(244, 67, 54, 0.1)', color: '#f44336' }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || googleLoading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                sx={{
                  mb: 2,
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
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mx: 2 }}>
                  OR
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
              </Box>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                disabled={loading || googleLoading}
                startIcon={googleLoading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{
                  mb: 3,
                  py: 1.5,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  },
                  '&:disabled': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                {googleLoading ? 'Signing In...' : 'Continue with Google'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                  Don't have an account?
                </Typography>
                <Link
                  component={RouterLink}
                  to="/signup"
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
                  Create an account
                </Link>
              </Box>
            </form>
          </Paper>
        </Slide>

        {/* Demo credentials info */}
        <Fade in timeout={1500}>
          <Paper sx={{
            mt: 3,
            p: 2,
            background: 'rgba(39, 62, 107, 0.6)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(25, 118, 210, 0.1)',
            borderRadius: 2
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', mb: 1 }}>
              Demo Usernames:
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', fontSize: '0.8rem' }}>
              admin / doctor / ambulance / volunteer / normal
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', fontSize: '0.8rem' }}>
              Or use Google Sign-in
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
