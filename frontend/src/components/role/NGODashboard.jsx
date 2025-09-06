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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Fade,
  Slide,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  VolunteerActivism as VolunteerIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  LocationOn as LocationIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalHospital as EmergencyIcon,
  School as EducationIcon,
  Restaurant as FoodIcon,
  LocalHospital as HealthIcon,
  Home as ShelterIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const NGODashboard = ({ user }) => {
  const theme = useTheme();
  const [ngoData, setNgoData] = useState({
    organization_name: 'Hope Foundation',
    registration_number: 'NGO-2024-001',
    focus_areas: ['disaster_relief', 'hunger', 'education'],
    location_lat: 13.0827,
    location_lon: 80.2707,
    volunteer_count: 25,
    contact_info: '+91-9876543210',
    operating_hours: ['09:00-18:00'],
    resources_available: [
      {
        resource_type: 'Food Supplies',
        quantity: 500,
        unit: 'meal packets',
        status: 'available',
        location: 'Main Warehouse'
      },
      {
        resource_type: 'Medical Supplies',
        quantity: 100,
        unit: 'first aid kits',
        status: 'available',
        location: 'Medical Storage'
      },
      {
        resource_type: 'Blankets',
        quantity: 200,
        unit: 'pieces',
        status: 'low',
        location: 'Relief Center'
      }
    ]
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [openResourceDialog, setOpenResourceDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [resourceForm, setResourceForm] = useState({
    resource_type: '',
    quantity: 0,
    unit: '',
    status: 'available',
    location: ''
  });
  const [activeOperations, setActiveOperations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    loadNGOData();
    loadActiveOperations();
    loadVolunteers();
    setIsLoaded(true);
  }, []);

  const loadNGOData = () => {
    const savedData = localStorage.getItem(`ngo_${user?.id}`);
    if (savedData) {
      setNgoData(JSON.parse(savedData));
    }
  };

  const loadActiveOperations = () => {
    // Mock active operations
    setActiveOperations([
      {
        id: 'OP001',
        name: 'Flood Relief - Chennai South',
        type: 'disaster_relief',
        status: 'active',
        volunteers_assigned: 8,
        resources_allocated: ['Food Supplies', 'Blankets'],
        progress: 65,
        started_date: '2024-01-10'
      },
      {
        id: 'OP002',
        name: 'Education Drive - Rural Areas',
        type: 'education',
        status: 'active',
        volunteers_assigned: 5,
        resources_allocated: ['School Supplies'],
        progress: 40,
        started_date: '2024-01-15'
      }
    ]);
  };

  const loadVolunteers = () => {
    // Mock volunteer data
    setVolunteers([
      { id: 1, name: 'Rajesh Kumar', status: 'active', hours: 120 },
      { id: 2, name: 'Priya Sharma', status: 'active', hours: 95 },
      { id: 3, name: 'Amit Patel', status: 'busy', hours: 150 },
      { id: 4, name: 'Sneha Reddy', status: 'active', hours: 80 },
      { id: 5, name: 'Vikram Singh', status: 'inactive', hours: 200 }
    ]);
  };

  const handleSaveProfile = () => {
    localStorage.setItem(`ngo_${user?.id}`, JSON.stringify(ngoData));
    setOpenProfileDialog(false);
  };

  const handleAddResource = () => {
    setResourceForm({
      resource_type: '',
      quantity: 0,
      unit: '',
      status: 'available',
      location: ''
    });
    setEditingResource(null);
    setOpenResourceDialog(true);
  };

  const handleEditResource = (resourceIndex) => {
    const resource = ngoData.resources_available[resourceIndex];
    setResourceForm(resource);
    setEditingResource(resourceIndex);
    setOpenResourceDialog(true);
  };

  const handleSaveResource = () => {
    const updatedResources = [...ngoData.resources_available];
    if (editingResource !== null) {
      updatedResources[editingResource] = resourceForm;
    } else {
      updatedResources.push(resourceForm);
    }
    
    const updatedNGOData = {
      ...ngoData,
      resources_available: updatedResources
    };
    
    setNgoData(updatedNGOData);
    localStorage.setItem(`ngo_${user?.id}`, JSON.stringify(updatedNGOData));
    setOpenResourceDialog(false);
  };

  const handleDeleteResource = (resourceIndex) => {
    const updatedResources = ngoData.resources_available.filter((_, index) => index !== resourceIndex);
    const updatedNGOData = {
      ...ngoData,
      resources_available: updatedResources
    };
    
    setNgoData(updatedNGOData);
    localStorage.setItem(`ngo_${user?.id}`, JSON.stringify(updatedNGOData));
  };

  const getFocusAreaIcon = (area) => {
    switch (area) {
      case 'disaster_relief': return <EmergencyIcon />;
      case 'education': return <EducationIcon />;
      case 'hunger': return <FoodIcon />;
      case 'health': return <HealthIcon />;
      case 'shelter': return <ShelterIcon />;
      default: return <VolunteerIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'low': return 'warning';
      case 'out_of_stock': return 'error';
      case 'active': return 'success';
      case 'busy': return 'warning';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  const getOperationTypeColor = (type) => {
    switch (type) {
      case 'disaster_relief': return '#f44336';
      case 'education': return '#2196f3';
      case 'hunger': return '#ff9800';
      case 'health': return '#4caf50';
      default: return '#9c27b0';
    }
  };

  const getTotalResourceValue = () => {
    return ngoData.resources_available.length;
  };

  const getActiveVolunteers = () => {
    return volunteers.filter(vol => vol.status === 'active').length;
  };

  return (
    <Box sx={{ p: 3, background: '#0a1929', minHeight: '100vh' }}>
      <Fade in={isLoaded} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            NGO Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Community Service & Relief Operations
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* NGO Profile Card */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1000}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(156, 39, 176, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{
                  width: 60,
                  height: 60,
                  mr: 2,
                  background: 'linear-gradient(45deg, #9c27b0, #e91e63)'
                }}>
                  <VolunteerIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {ngoData.organization_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Reg: {ngoData.registration_number}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Focus Areas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {ngoData.focus_areas.map((area, index) => (
                    <Chip
                      key={index}
                      icon={getFocusAreaIcon(area)}
                      label={area.replace('_', ' ').toUpperCase()}
                      size="small"
                      sx={{ 
                        backgroundColor: getOperationTypeColor(area),
                        color: 'white'
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Contact
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {ngoData.contact_info}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Operating Hours
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {ngoData.operating_hours.join(', ')}
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setOpenProfileDialog(true)}
                sx={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #7b1fa2, #c2185b)'
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
                  border: '1px solid rgba(156, 39, 176, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <PeopleIcon sx={{ fontSize: 30, color: '#9c27b0', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {getActiveVolunteers()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Active Volunteers
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
                  border: '1px solid rgba(156, 39, 176, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <InventoryIcon sx={{ fontSize: 30, color: '#e91e63', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {getTotalResourceValue()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Resource Types
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
                  border: '1px solid rgba(156, 39, 176, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <EmergencyIcon sx={{ fontSize: 30, color: '#f44336', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {activeOperations.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Active Operations
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
                  border: '1px solid rgba(156, 39, 176, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <LocationIcon sx={{ fontSize: 30, color: '#ff9800', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {ngoData.focus_areas.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Focus Areas
                  </Typography>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Grid>

        {/* Active Operations */}
        <Grid item xs={12} md={8}>
          <Slide direction="up" in={isLoaded} timeout={1600}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(156, 39, 176, 0.2)',
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
                Active Operations
              </Typography>

              {activeOperations.map((operation) => (
                <Card key={operation.id} sx={{
                  mb: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                          {operation.name}
                        </Typography>
                        <Chip
                          label={operation.type.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{
                            backgroundColor: getOperationTypeColor(operation.type),
                            color: 'white'
                          }}
                        />
                      </Box>
                      <Chip
                        label={operation.status}
                        color={getStatusColor(operation.status)}
                        size="small"
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                        Progress: {operation.progress}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={operation.progress}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(255,255,255,0.1)'
                        }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Volunteers: {operation.volunteers_assigned}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Started: {operation.started_date}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                        Resources Allocated:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {operation.resources_allocated.map((resource, index) => (
                          <Chip
                            key={index}
                            label={resource}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Slide>
        </Grid>

        {/* Resources */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1800}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(156, 39, 176, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <InventoryIcon />
                  Resources
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleAddResource}
                  sx={{ color: 'white' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <List>
                {ngoData.resources_available.map((resource, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{
                        width: 32,
                        height: 32,
                        background: 'rgba(156, 39, 176, 0.2)'
                      }}>
                        <InventoryIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {resource.resource_type}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {resource.quantity} {resource.unit}
                          </Typography>
                          <br />
                          <Chip
                            label={resource.status}
                            color={getStatusColor(resource.status)}
                            size="small"
                          />
                        </Box>
                      }
                    />
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEditResource(index)}
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteResource(index)}
                        sx={{ color: 'rgba(244, 67, 54, 0.7)' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Add/Edit Resource Dialog */}
      <Dialog open={openResourceDialog} onClose={() => setOpenResourceDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingResource !== null ? 'Edit Resource' : 'Add New Resource'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resource Type"
                value={resourceForm.resource_type}
                onChange={(e) => setResourceForm(prev => ({ ...prev, resource_type: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={resourceForm.quantity}
                onChange={(e) => setResourceForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit"
                value={resourceForm.unit}
                onChange={(e) => setResourceForm(prev => ({ ...prev, unit: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={resourceForm.status}
                  onChange={(e) => setResourceForm(prev => ({ ...prev, status: e.target.value }))}
                  label="Status"
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="low">Low Stock</MenuItem>
                  <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={resourceForm.location}
                onChange={(e) => setResourceForm(prev => ({ ...prev, location: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResourceDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveResource} variant="contained">
            {editingResource !== null ? 'Update' : 'Add'} Resource
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Update Dialog */}
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update NGO Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization Name"
                value={ngoData.organization_name}
                onChange={(e) => setNgoData(prev => ({ ...prev, organization_name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Registration Number"
                value={ngoData.registration_number}
                onChange={(e) => setNgoData(prev => ({ ...prev, registration_number: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Information"
                value={ngoData.contact_info}
                onChange={(e) => setNgoData(prev => ({ ...prev, contact_info: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Volunteer Count"
                type="number"
                value={ngoData.volunteer_count}
                onChange={(e) => setNgoData(prev => ({ ...prev, volunteer_count: parseInt(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Operating Hours"
                value={ngoData.operating_hours.join(', ')}
                onChange={(e) => setNgoData(prev => ({ ...prev, operating_hours: e.target.value.split(',').map(h => h.trim()) }))}
                helperText="Enter hours separated by commas"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProfileDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained">Update Profile</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NGODashboard;
