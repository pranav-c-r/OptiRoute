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
  Slider,
  useTheme,
  Fade,
  Slide,
  Alert
} from '@mui/material';
import {
  LocalShipping as AmbulanceIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  LocalHospital as EmergencyIcon,
  Update as UpdateIcon,
  Navigation as NavigationIcon,
  AccessTime as TimeIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const AmbulanceDriverDashboard = ({ user }) => {
  const theme = useTheme();
  const [driverData, setDriverData] = useState({
    license_number: 'AMB-2024-001',
    vehicle_id: 'AMB-VEH-001',
    current_location_lat: 13.0827,
    current_location_lon: 80.2707,
    availability_status: 'available',
    case_severity: 1,
    estimated_arrival: '',
    patient_count: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [tempData, setTempData] = useState({});
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  useEffect(() => {
    loadDriverData();
    loadNearbyHospitals();
    setIsLoaded(true);
  }, []);

  const loadDriverData = () => {
    // Load saved driver data from localStorage or API
    const savedData = localStorage.getItem(`ambulance_${user?.id}`);
    if (savedData) {
      setDriverData(JSON.parse(savedData));
    }
  };

  const loadNearbyHospitals = async () => {
    // Mock nearby hospitals data
    setNearbyHospitals([
      {
        name: 'Apollo Hospital',
        distance: '2.3 km',
        available_beds: 15,
        emergency_dept: true,
        phone: '+91-44-2829-3333'
      },
      {
        name: 'Fortis Malar Hospital',
        distance: '4.1 km',
        available_beds: 8,
        emergency_dept: true,
        phone: '+91-44-4289-8888'
      },
      {
        name: 'MIOT Hospital',
        distance: '5.7 km',
        available_beds: 12,
        emergency_dept: true,
        phone: '+91-44-2248-7777'
      }
    ]);
  };

  const handleUpdateDriverData = () => {
    setDriverData(tempData);
    localStorage.setItem(`ambulance_${user?.id}`, JSON.stringify(tempData));
    setOpenUpdateDialog(false);
    // Here you would also send to API
  };

  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const updatedData = {
          ...driverData,
          current_location_lat: position.coords.latitude,
          current_location_lon: position.coords.longitude
        };
        setDriverData(updatedData);
        localStorage.setItem(`ambulance_${user?.id}`, JSON.stringify(updatedData));
      });
    }
    setOpenLocationDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'warning';
      case 'off-duty': return 'error';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    if (severity <= 2) return '#4caf50';
    if (severity <= 3) return '#ff9800';
    return '#f44336';
  };

  const getSeverityLabel = (severity) => {
    const labels = {
      1: 'Low Priority',
      2: 'Moderate',
      3: 'High Priority',
      4: 'Critical',
      5: 'Life Threatening'
    };
    return labels[severity] || 'Unknown';
  };

  return (
    <Box sx={{ p: 3, background: '#0a1929', minHeight: '100vh' }}>
      <Fade in={isLoaded} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #f44336, #ff9800)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            Ambulance Driver Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Emergency Response & Patient Transport
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Driver Status Card */}
        <Grid item xs={12} md={6}>
          <Slide direction="up" in={isLoaded} timeout={1000}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(244, 67, 54, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{
                  width: 60,
                  height: 60,
                  mr: 2,
                  background: 'linear-gradient(45deg, #f44336, #ff9800)'
                }}>
                  <AmbulanceIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {user?.name || 'Ambulance Driver'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    License: {driverData.license_number}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Vehicle: {driverData.vehicle_id}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Status
                </Typography>
                <Chip
                  label={driverData.availability_status}
                  color={getStatusColor(driverData.availability_status)}
                  size="medium"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Current Case Severity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={getSeverityLabel(driverData.case_severity)}
                    sx={{
                      backgroundColor: getSeverityColor(driverData.case_severity),
                      color: 'white'
                    }}
                  />
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    Level {driverData.case_severity}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Patients on Board
                </Typography>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  {driverData.patient_count}
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<UpdateIcon />}
                onClick={() => {
                  setTempData(driverData);
                  setOpenUpdateDialog(true);
                }}
                sx={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #f44336, #ff9800)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #d32f2f, #f57c00)'
                  }
                }}
              >
                Update Status
              </Button>
            </Paper>
          </Slide>
        </Grid>

        {/* Location & Navigation Card */}
        <Grid item xs={12} md={6}>
          <Slide direction="up" in={isLoaded} timeout={1200}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(244, 67, 54, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h6" sx={{
                color: 'white',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <LocationIcon />
                Current Location
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Latitude: {driverData.current_location_lat.toFixed(4)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Longitude: {driverData.current_location_lon.toFixed(4)}
                </Typography>
              </Box>

              {driverData.estimated_arrival && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                    Estimated Arrival
                  </Typography>
                  <Chip
                    icon={<TimeIcon />}
                    label={driverData.estimated_arrival}
                    color="info"
                  />
                </Box>
              )}

              <Button
                variant="outlined"
                startIcon={<NavigationIcon />}
                onClick={() => setOpenLocationDialog(true)}
                sx={{
                  width: '100%',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: '#f44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)'
                  }
                }}
              >
                Update Location
              </Button>
            </Paper>
          </Slide>
        </Grid>

        {/* Nearby Hospitals */}
        <Grid item xs={12}>
          <Slide direction="up" in={isLoaded} timeout={1400}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(244, 67, 54, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h6" sx={{
                color: 'white',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <EmergencyIcon />
                Nearby Hospitals
              </Typography>

              <Grid container spacing={2}>
                {nearbyHospitals.map((hospital, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                          {hospital.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                          Distance: {hospital.distance}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                          Available Beds: {hospital.available_beds}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          {hospital.emergency_dept && (
                            <Chip label="Emergency" color="error" size="small" />
                          )}
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<PhoneIcon />}
                          sx={{
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        >
                          {hospital.phone}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Update Status Dialog */}
      <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Ambulance Status</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Availability Status</InputLabel>
                <Select
                  value={tempData.availability_status || ''}
                  onChange={(e) => setTempData(prev => ({ ...prev, availability_status: e.target.value }))}
                  label="Availability Status"
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="busy">Busy - On Call</MenuItem>
                  <MenuItem value="off-duty">Off Duty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography gutterBottom>Case Severity Level</Typography>
              <Slider
                value={tempData.case_severity || 1}
                onChange={(e, value) => setTempData(prev => ({ ...prev, case_severity: value }))}
                min={1}
                max={5}
                step={1}
                marks={[
                  { value: 1, label: 'Low' },
                  { value: 2, label: 'Moderate' },
                  { value: 3, label: 'High' },
                  { value: 4, label: 'Critical' },
                  { value: 5, label: 'Life Threatening' }
                ]}
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Patient Count"
                type="number"
                value={tempData.patient_count || 0}
                onChange={(e) => setTempData(prev => ({ ...prev, patient_count: parseInt(e.target.value) || 0 }))}
                inputProps={{ min: 0, max: 10 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Arrival"
                value={tempData.estimated_arrival || ''}
                onChange={(e) => setTempData(prev => ({ ...prev, estimated_arrival: e.target.value }))}
                placeholder="e.g., 15 minutes"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateDriverData} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Location Update Dialog */}
      <Dialog open={openLocationDialog} onClose={() => setOpenLocationDialog(false)}>
        <DialogTitle>Update Location</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            This will update your current location using GPS.
          </Alert>
          <Typography variant="body2">
            Current location will be automatically detected and updated.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLocationDialog(false)}>Cancel</Button>
          <Button onClick={handleLocationUpdate} variant="contained">Update Location</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AmbulanceDriverDashboard;
