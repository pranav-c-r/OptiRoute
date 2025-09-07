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
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  LocalHospital as LocalHospitalIcon,
  Bed as BedIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Update as UpdateIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { hospitalAPI, handleApiError } from '../../services/api';

const HospitalAdminDashboard = ({ user }) => {
  const theme = useTheme();
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openHospitalDialog, setOpenHospitalDialog] = useState(false);
  const [openDoctorDialog, setOpenDoctorDialog] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Form states
  const [hospitalForm, setHospitalForm] = useState({
    hospital_id: '',
    name: '',
    total_beds: 0,
    icu_beds: 0,
    available_beds: 0,
    available_icu_beds: 0,
    latitude: 0,
    longitude: 0,
    specialties: [],
    admin_id: user?.uid || 'admin_001'
  });

  const [doctorForm, setDoctorForm] = useState({
    doctor_id: '',
    name: '',
    specialization: '',
    available_hours: ['09:00-17:00'],
    hospital_id: '',
    experience_years: 0
  });

  useEffect(() => {
    loadData();
    setIsLoaded(true);
  }, []);

  const loadData = async () => {
    try {
      const [hospitalsData, doctorsData, patientsData, statsData] = await Promise.all([
        hospitalAPI.getHospitals(),
        hospitalAPI.getDoctors(),
        hospitalAPI.getPatients(),
        hospitalAPI.getDashboardStats()
      ]);
      
      setHospitals(hospitalsData.hospitals || []);
      setDoctors(doctorsData.doctors || []);
      setPatients(patientsData.patients || []);
      setDashboardStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCreateHospital = async () => {
    try {
      await hospitalAPI.createHospital(hospitalForm);
      setOpenHospitalDialog(false);
      resetHospitalForm();
      loadData();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdateHospital = async () => {
    try {
      await hospitalAPI.updateHospital(editingHospital.hospital_id, {
        available_beds: hospitalForm.available_beds,
        available_icu_beds: hospitalForm.available_icu_beds,
        current_occupancy: hospitalForm.total_beds - hospitalForm.available_beds
      });
      setOpenHospitalDialog(false);
      setEditingHospital(null);
      resetHospitalForm();
      loadData();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCreateDoctor = async () => {
    try {
      await hospitalAPI.createDoctor(doctorForm);
      setOpenDoctorDialog(false);
      resetDoctorForm();
      loadData();
    } catch (error) {
      handleApiError(error);
    }
  };

  const resetHospitalForm = () => {
    setHospitalForm({
      hospital_id: '',
      name: '',
      total_beds: 0,
      icu_beds: 0,
      available_beds: 0,
      available_icu_beds: 0,
      latitude: 0,
      longitude: 0,
      specialties: [],
      admin_id: user?.uid || 'admin_001'
    });
  };

  const resetDoctorForm = () => {
    setDoctorForm({
      doctor_id: '',
      name: '',
      specialization: '',
      available_hours: ['09:00-17:00'],
      hospital_id: '',
      experience_years: 0
    });
  };

  const openEditHospital = (hospital) => {
    setEditingHospital(hospital);
    setHospitalForm({
      ...hospital,
      specialties: hospital.specialties || []
    });
    setOpenHospitalDialog(true);
  };

  const getOccupancyColor = (occupancyRate) => {
    if (occupancyRate >= 90) return 'error';
    if (occupancyRate >= 70) return 'warning';
    return 'success';
  };

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
            Hospital Admin Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Manage hospitals, doctors, and resources
          </Typography>
        </Box>
      </Fade>

      {/* Dashboard Stats */}
      {dashboardStats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Slide direction="up" in={isLoaded} timeout={1000}>
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(39, 62, 107, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                textAlign: 'center'
              }}>
                <LocalHospitalIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  {dashboardStats.total_hospitals}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Total Hospitals
                </Typography>
              </Paper>
            </Slide>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Slide direction="up" in={isLoaded} timeout={1200}>
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(39, 62, 107, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                textAlign: 'center'
              }}>
                <BedIcon sx={{ fontSize: 40, color: '#42a5f5', mb: 1 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  {dashboardStats.available_beds}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Available Beds
                </Typography>
              </Paper>
            </Slide>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Slide direction="up" in={isLoaded} timeout={1400}>
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(39, 62, 107, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                textAlign: 'center'
              }}>
                <PeopleIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  {dashboardStats.available_doctors}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Available Doctors
                </Typography>
              </Paper>
            </Slide>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Slide direction="up" in={isLoaded} timeout={1600}>
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(39, 62, 107, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 3,
                textAlign: 'center'
              }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  {dashboardStats.occupancy_rate}%
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Occupancy Rate
                </Typography>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      )}

      {/* Action Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenHospitalDialog(true)}
          sx={{ 
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0, #1976d2)'
            }
          }}
        >
          Add Hospital
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDoctorDialog(true)}
          sx={{ 
            background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
            '&:hover': {
              background: 'linear-gradient(45deg, #388e3c, #4caf50)'
            }
          }}
        >
          Add Doctor
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Hospitals Table */}
        <Grid item xs={12} md={6}>
          <Slide direction="up" in={isLoaded} timeout={1800}>
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
                Hospitals
              </Typography>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Beds</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Occupancy</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hospitals.map((hospital) => {
                      const occupancyRate = ((hospital.total_beds - hospital.available_beds) / hospital.total_beds * 100).toFixed(1);
                      return (
                        <TableRow key={hospital.hospital_id}>
                          <TableCell sx={{ color: 'white' }}>{hospital.name}</TableCell>
                          <TableCell sx={{ color: 'white' }}>
                            {hospital.available_beds}/{hospital.total_beds}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={`${occupancyRate}%`}
                              color={getOccupancyColor(occupancyRate)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              onClick={() => openEditHospital(hospital)}
                              sx={{ color: 'rgba(255,255,255,0.7)' }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Slide>
        </Grid>

        {/* Doctors Table */}
        <Grid item xs={12} md={6}>
          <Slide direction="up" in={isLoaded} timeout={2000}>
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
                <PersonIcon />
                Doctors
              </Typography>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Specialty</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doctors.map((doctor) => (
                      <TableRow key={doctor.doctor_id}>
                        <TableCell sx={{ color: 'white' }}>{doctor.name}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{doctor.specialization}</TableCell>
                        <TableCell>
                          <Chip 
                            label={doctor.status}
                            color={doctor.status === 'available' ? 'success' : doctor.status === 'busy' ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Hospital Dialog */}
      <Dialog open={openHospitalDialog} onClose={() => setOpenHospitalDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingHospital ? 'Update Hospital' : 'Add New Hospital'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hospital ID"
                value={hospitalForm.hospital_id}
                onChange={(e) => setHospitalForm(prev => ({ ...prev, hospital_id: e.target.value }))}
                disabled={!!editingHospital}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hospital Name"
                value={hospitalForm.name}
                onChange={(e) => setHospitalForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Beds"
                type="number"
                value={hospitalForm.total_beds}
                onChange={(e) => setHospitalForm(prev => ({ ...prev, total_beds: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ICU Beds"
                type="number"
                value={hospitalForm.icu_beds}
                onChange={(e) => setHospitalForm(prev => ({ ...prev, icu_beds: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Available Beds"
                type="number"
                value={hospitalForm.available_beds}
                onChange={(e) => setHospitalForm(prev => ({ ...prev, available_beds: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Available ICU Beds"
                type="number"
                value={hospitalForm.available_icu_beds}
                onChange={(e) => setHospitalForm(prev => ({ ...prev, available_icu_beds: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Latitude"
                type="number"
                value={hospitalForm.latitude}
                onChange={(e) => setHospitalForm(prev => ({ ...prev, latitude: parseFloat(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitude"
                type="number"
                value={hospitalForm.longitude}
                onChange={(e) => setHospitalForm(prev => ({ ...prev, longitude: parseFloat(e.target.value) }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHospitalDialog(false)}>Cancel</Button>
          <Button 
            onClick={editingHospital ? handleUpdateHospital : handleCreateHospital} 
            variant="contained"
          >
            {editingHospital ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Doctor Dialog */}
      <Dialog open={openDoctorDialog} onClose={() => setOpenDoctorDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor ID"
                value={doctorForm.doctor_id}
                onChange={(e) => setDoctorForm(prev => ({ ...prev, doctor_id: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor Name"
                value={doctorForm.name}
                onChange={(e) => setDoctorForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Specialization</InputLabel>
                <Select
                  value={doctorForm.specialization}
                  onChange={(e) => setDoctorForm(prev => ({ ...prev, specialization: e.target.value }))}
                  label="Specialization"
                >
                  <MenuItem value="General Medicine">General Medicine</MenuItem>
                  <MenuItem value="Cardiology">Cardiology</MenuItem>
                  <MenuItem value="Neurology">Neurology</MenuItem>
                  <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                  <MenuItem value="Emergency Medicine">Emergency Medicine</MenuItem>
                  <MenuItem value="Surgery">Surgery</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Hospital</InputLabel>
                <Select
                  value={doctorForm.hospital_id}
                  onChange={(e) => setDoctorForm(prev => ({ ...prev, hospital_id: e.target.value }))}
                  label="Hospital"
                >
                  {hospitals.map((hospital) => (
                    <MenuItem key={hospital.hospital_id} value={hospital.hospital_id}>
                      {hospital.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience (Years)"
                type="number"
                value={doctorForm.experience_years}
                onChange={(e) => setDoctorForm(prev => ({ ...prev, experience_years: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Available Hours"
                value={doctorForm.available_hours.join(', ')}
                onChange={(e) => setDoctorForm(prev => ({ ...prev, available_hours: e.target.value.split(',').map(h => h.trim()) }))}
                helperText="Enter hours separated by commas (e.g., 09:00-17:00, 18:00-22:00)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDoctorDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateDoctor} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HospitalAdminDashboard;
