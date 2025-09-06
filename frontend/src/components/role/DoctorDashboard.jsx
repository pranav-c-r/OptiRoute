import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import {
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  LocalHospital as LocalHospitalIcon,
  Edit as EditIcon
} from '@mui/icons-material';

import { hospitalAPI, handleApiError } from '../../services/api';

const DoctorDashboard = ({ user }) => {
  const theme = useTheme();
  const [doctor, setDoctor] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openAvailabilityDialog, setOpenAvailabilityDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [newAvailability, setNewAvailability] = useState([]);
  const [newStatus, setNewStatus] = useState('available');

  useEffect(() => {
    loadDoctorData();
    setIsLoaded(true);
  }, []);

  const loadDoctorData = async () => {
    try {
      // In a real app, you'd get the doctor ID from the user context
      const doctorId = `DOC_${user?.uid || '001'}`;
      
      // Try to get existing doctor data
      try {
        const doctorData = await hospitalAPI.getDoctor(doctorId);
        setDoctor(doctorData);
      } catch (error) {
        // If doctor doesn't exist, create a default one
        const defaultDoctor = {
          doctor_id: doctorId,
          name: user?.displayName || 'Dr. John Doe',
          specialization: 'General Medicine',
          available_hours: ['09:00-17:00'],
          hospital_id: 'HOSP_001',
          experience_years: 5,
          status: 'available'
        };
        
        await hospitalAPI.createDoctor(defaultDoctor);
        setDoctor(defaultDoctor);
      }

      // Load hospitals and patients
      const [hospitalsData, patientsData] = await Promise.all([
        hospitalAPI.getHospitals(),
        hospitalAPI.getPatients()
      ]);
      
      setHospitals(hospitalsData.hospitals || []);
      setPatients(patientsData.patients || []);
    } catch (error) {
      console.error('Error loading doctor data:', error);
    }
  };

  const updateAvailability = async () => {
    try {
      await hospitalAPI.updateDoctorAvailability(doctor.doctor_id, newAvailability);
      setDoctor(prev => ({ ...prev, available_hours: newAvailability }));
      setOpenAvailabilityDialog(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const updateStatus = async () => {
    try {
      await hospitalAPI.updateDoctorStatus(doctor.doctor_id, newStatus);
      setDoctor(prev => ({ ...prev, status: newStatus }));
      setOpenStatusDialog(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'warning';
      case 'off-duty': return 'error';
      default: return 'default';
    }
  };

  const getSpecializationColor = (specialization) => {
    const colors = {
      'General Medicine': 'primary',
      'Cardiology': 'error',
      'Neurology': 'info',
      'Pediatrics': 'success',
      'Emergency Medicine': 'warning',
      'Surgery': 'secondary'
    };
    return colors[specialization] || 'default';
  };

  if (!doctor) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading doctor profile...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, background: '#0a1929', minHeight: '100vh' }}>
      <Fade in={isLoaded} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ 
            mb: 2,
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            Doctor Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Welcome, {doctor.name}
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Doctor Profile Card */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1000}>
            <Paper sx={{ 
              p: 3, 
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(25, 118, 210, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  width: 80, 
                  height: 80, 
                  mr: 2,
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)'
                }}>
                  <PersonIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {doctor.name}
                  </Typography>
                  <Chip 
                    label={doctor.specialization} 
                    color={getSpecializationColor(doctor.specialization)}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={doctor.status} 
                    color={getStatusColor(doctor.status)}
                    size="small"
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => setOpenStatusDialog(true)}
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Experience
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {doctor.experience_years} years
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Hospital
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {hospitals.find(h => h.hospital_id === doctor.hospital_id)?.name || 'Not assigned'}
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<ScheduleIcon />}
                onClick={() => setOpenAvailabilityDialog(true)}
                sx={{ 
                  width: '100%',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #1976d2)'
                  }
                }}
              >
                Update Availability
              </Button>
            </Paper>
          </Slide>
        </Grid>

        {/* Available Hours */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1200}>
            <Paper sx={{ 
              p: 3, 
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(25, 118, 210, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h6" sx={{ 
                color: 'white', 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <ScheduleIcon />
                Available Hours
              </Typography>
              
              <List>
                {doctor.available_hours.map((hours, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32,
                        background: 'rgba(25, 118, 210, 0.2)'
                      }}>
                        <ScheduleIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={hours}
                      sx={{ 
                        '& .MuiListItemText-primary': { 
                          color: 'white',
                          fontSize: '0.9rem'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Slide>
        </Grid>

        {/* Recent Patients */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1400}>
            <Paper sx={{ 
              p: 3, 
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(25, 118, 210, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h6" sx={{ 
                color: 'white', 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <LocalHospitalIcon />
                Recent Patients
              </Typography>
              
              <List>
                {patients.slice(0, 3).map((patient) => (
                  <ListItem key={patient.patient_id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32,
                        background: 'rgba(244, 67, 54, 0.2)'
                      }}>
                        <PersonIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={`Patient ${patient.patient_id}`}
                      secondary={`Severity: ${patient.severity}`}
                      sx={{ 
                        '& .MuiListItemText-primary': { 
                          color: 'white',
                          fontSize: '0.9rem'
                        },
                        '& .MuiListItemText-secondary': { 
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.8rem'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Availability Dialog */}
      <Dialog open={openAvailabilityDialog} onClose={() => setOpenAvailabilityDialog(false)}>
        <DialogTitle>Update Availability</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Available Hours (e.g., 09:00-17:00, 18:00-22:00)"
            value={newAvailability.join(', ')}
            onChange={(e) => setNewAvailability(e.target.value.split(',').map(h => h.trim()))}
            sx={{ mt: 2 }}
            helperText="Enter hours separated by commas"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAvailabilityDialog(false)}>Cancel</Button>
          <Button onClick={updateAvailability} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Status Dialog */}
      <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)}>
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="busy">Busy</MenuItem>
              <MenuItem value="off-duty">Off Duty</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>Cancel</Button>
          <Button onClick={updateStatus} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorDashboard;