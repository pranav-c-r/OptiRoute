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
  Switch,
  FormControlLabel,
  useTheme,
  Fade,
  Slide,
  Alert
} from '@mui/material';
import {
  VolunteerActivism as VolunteerIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  WorkOutline as WorkIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const ReliefVolunteerDashboard = ({ user }) => {
  const theme = useTheme();
  const [volunteerData, setVolunteerData] = useState({
    name: user?.name || 'Relief Volunteer',
    contact_phone: '+1-555-0789',
    contact_email: 'volunteer@relief.org',
    current_location: 'Downtown Relief Center',
    location_lat: 40.7128,
    location_lon: -74.0060,
    availability_status: 'available',
    skills: ['First Aid', 'Logistics', 'Communication', 'Food Service'],
    emergency_contact: '+1-555-0111',
    hours_served: 156,
    current_assignments: [
      {
        id: 'ASG001',
        title: 'Food Distribution - Central Park',
        location: 'Central Park Relief Site',
        date: '2024-01-15',
        time: '09:00-17:00',
        coordinator: 'Jane Smith',
        status: 'active'
      },
      {
        id: 'ASG002',
        title: 'Medical Support - Hospital Auxiliary',
        location: 'City General Hospital',
        date: '2024-01-18',
        time: '14:00-22:00',
        coordinator: 'Dr. Johnson',
        status: 'scheduled'
      }
    ],
    recent_activities: [
      {
        activity: 'Disaster Relief Training',
        date: '2024-01-10',
        hours: 8,
        type: 'training'
      },
      {
        activity: 'Emergency Food Distribution',
        date: '2024-01-08',
        hours: 6,
        type: 'service'
      },
      {
        activity: 'Community Outreach',
        date: '2024-01-05',
        hours: 4,
        type: 'outreach'
      },
      {
        activity: 'Medical Aid Support',
        date: '2024-01-03',
        hours: 10,
        type: 'medical'
      }
    ]
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);

  useEffect(() => {
    loadVolunteerData();
    setIsLoaded(true);
  }, []);

  const loadVolunteerData = () => {
    const savedData = localStorage.getItem(`relief_volunteer_${user?.id}`);
    if (savedData) {
      setVolunteerData(JSON.parse(savedData));
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem(`relief_volunteer_${user?.id}`, JSON.stringify(volunteerData));
    setOpenProfileDialog(false);
  };

  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const updatedData = {
          ...volunteerData,
          location_lat: position.coords.latitude,
          location_lon: position.coords.longitude,
          current_location: `GPS Location: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        };
        setVolunteerData(updatedData);
        localStorage.setItem(`relief_volunteer_${user?.id}`, JSON.stringify(updatedData));
      });
    }
    setOpenLocationDialog(false);
  };

  const handleAvailabilityChange = (newStatus) => {
    const updatedData = {
      ...volunteerData,
      availability_status: newStatus
    };
    setVolunteerData(updatedData);
    localStorage.setItem(`relief_volunteer_${user?.id}`, JSON.stringify(updatedData));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'warning';
      case 'unavailable': return 'error';
      case 'active': return 'info';
      case 'scheduled': return 'warning';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'training': return '#2196f3';
      case 'service': return '#4caf50';
      case 'outreach': return '#ff9800';
      case 'medical': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'training': return <ScheduleIcon />;
      case 'service': return <WorkIcon />;
      case 'outreach': return <GroupIcon />;
      case 'medical': return <PersonIcon />;
      default: return <AssignmentIcon />;
    }
  };

  return (
    <Box sx={{ p: 3, background: '#0a1929', minHeight: '100vh' }}>
      <Fade in={isLoaded} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            Relief Volunteer Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Emergency Response & Community Service
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Volunteer Profile Card */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1000}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(233, 30, 99, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{
                  width: 60,
                  height: 60,
                  mr: 2,
                  background: 'linear-gradient(45deg, #e91e63, #9c27b0)'
                }}>
                  <VolunteerIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {volunteerData.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Relief Volunteer
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Availability Status
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={volunteerData.availability_status}
                    onChange={(e) => handleAvailabilityChange(e.target.value)}
                    sx={{ color: 'white' }}
                  >
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="busy">Busy</MenuItem>
                    <MenuItem value="unavailable">Unavailable</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 16 }} />
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {volunteerData.contact_phone}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 16 }} />
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {volunteerData.contact_email}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon sx={{ fontSize: 16 }} />
                  Current Location
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
                  {volunteerData.current_location}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setOpenLocationDialog(true)}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    '&:hover': {
                      borderColor: '#e91e63',
                      backgroundColor: 'rgba(233, 30, 99, 0.1)'
                    }
                  }}
                >
                  Update Location
                </Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {volunteerData.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(233, 30, 99, 0.2)',
                        color: 'white'
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setOpenProfileDialog(true)}
                sx={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #c2185b, #7b1fa2)'
                  }
                }}
              >
                Update Profile
              </Button>
            </Paper>
          </Slide>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Slide direction="up" in={isLoaded} timeout={1200}>
                <Paper sx={{
                  p: 2,
                  background: 'rgba(39, 62, 107, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(233, 30, 99, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <Chip
                    label={volunteerData.availability_status}
                    color={getStatusColor(volunteerData.availability_status)}
                    sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Current Status
                  </Typography>
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Slide direction="up" in={isLoaded} timeout={1300}>
                <Paper sx={{
                  p: 2,
                  background: 'rgba(39, 62, 107, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(233, 30, 99, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <TimeIcon sx={{ fontSize: 30, color: '#e91e63', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {volunteerData.hours_served}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Hours Served
                  </Typography>
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Slide direction="up" in={isLoaded} timeout={1400}>
                <Paper sx={{
                  p: 2,
                  background: 'rgba(39, 62, 107, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(233, 30, 99, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <AssignmentIcon sx={{ fontSize: 30, color: '#9c27b0', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {volunteerData.current_assignments.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Active Assignments
                  </Typography>
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Slide direction="up" in={isLoaded} timeout={1500}>
                <Paper sx={{
                  p: 2,
                  background: 'rgba(39, 62, 107, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(233, 30, 99, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <GroupIcon sx={{ fontSize: 30, color: '#4caf50', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {volunteerData.skills.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Skill Areas
                  </Typography>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Grid>

        {/* Current Assignments */}
        <Grid item xs={12} md={8}>
          <Slide direction="up" in={isLoaded} timeout={1600}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(233, 30, 99, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h6" sx={{
                color: 'white',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <AssignmentIcon />
                Current Assignments
              </Typography>

              {volunteerData.current_assignments.map((assignment) => (
                <Card key={assignment.id} sx={{
                  mb: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                          {assignment.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, mr: 1 }} />
                          {assignment.location}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          <TimeIcon sx={{ fontSize: 16, mr: 1 }} />
                          {assignment.date} | {assignment.time}
                        </Typography>
                      </Box>
                      <Chip
                        label={assignment.status}
                        color={getStatusColor(assignment.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Coordinator: {assignment.coordinator}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Slide>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1800}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(233, 30, 99, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h6" sx={{
                color: 'white',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <WorkIcon />
                Recent Activities
              </Typography>

              <List>
                {volunteerData.recent_activities.map((activity, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: getActivityTypeColor(activity.type)
                      }}>
                        {getActivityIcon(activity.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {activity.activity}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {activity.date} | {activity.hours}h
                          </Typography>
                          <br />
                          <Chip
                            label={activity.type}
                            size="small"
                            sx={{
                              backgroundColor: getActivityTypeColor(activity.type),
                              color: 'white',
                              fontSize: '0.7rem'
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Profile Update Dialog */}
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Volunteer Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={volunteerData.name}
                onChange={(e) => setVolunteerData(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={volunteerData.contact_phone}
                onChange={(e) => setVolunteerData(prev => ({ ...prev, contact_phone: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={volunteerData.contact_email}
                onChange={(e) => setVolunteerData(prev => ({ ...prev, contact_email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact"
                value={volunteerData.emergency_contact}
                onChange={(e) => setVolunteerData(prev => ({ ...prev, emergency_contact: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma separated)"
                value={volunteerData.skills.join(', ')}
                onChange={(e) => setVolunteerData(prev => ({ ...prev, skills: e.target.value.split(',').map(skill => skill.trim()) }))}
                helperText="Enter skills separated by commas"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProfileDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained">Update Profile</Button>
        </DialogActions>
      </Dialog>

      {/* Location Update Dialog */}
      <Dialog open={openLocationDialog} onClose={() => setOpenLocationDialog(false)}>
        <DialogTitle>Update Current Location</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            This will update your current location using GPS coordinates.
          </Alert>
          <Typography variant="body2">
            Your current location will be automatically detected and updated to help coordinate relief efforts effectively.
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

export default ReliefVolunteerDashboard;
