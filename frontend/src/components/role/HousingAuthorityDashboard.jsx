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
  Alert
} from '@mui/material';
import {
  Business as AuthorityIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Apartment as ApartmentIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

const HousingAuthorityDashboard = ({ user }) => {
  const theme = useTheme();
  const [authorityData, setAuthorityData] = useState({
    authority_name: 'City Housing Authority',
    region: 'Downtown District',
    contact_email: 'housing@city.gov',
    contact_phone: '+1-555-0123',
    office_address: '123 Municipal Building, Downtown',
    total_units: 2500,
    available_units: 45,
    housing_projects: [
      {
        project_name: 'Riverside Commons',
        location: '456 River St',
        total_units: 120,
        available_units: 8,
        unit_types: ['1BR', '2BR', '3BR'],
        rent_range: '$800-1200',
        status: 'active'
      },
      {
        project_name: 'Oak Hill Apartments',
        location: '789 Oak Hill Rd',
        total_units: 200,
        available_units: 15,
        unit_types: ['2BR', '3BR', '4BR'],
        rent_range: '$900-1500',
        status: 'active'
      },
      {
        project_name: 'Sunset Village',
        location: '321 Sunset Ave',
        total_units: 85,
        available_units: 3,
        unit_types: ['1BR', '2BR'],
        rent_range: '$750-1000',
        status: 'active'
      },
      {
        project_name: 'Pine Grove Development',
        location: '654 Pine Grove Way',
        total_units: 150,
        available_units: 19,
        unit_types: ['2BR', '3BR'],
        rent_range: '$850-1300',
        status: 'maintenance'
      }
    ]
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    project_name: '',
    location: '',
    total_units: 0,
    available_units: 0,
    unit_types: [],
    rent_range: '',
    status: 'active'
  });

  useEffect(() => {
    loadAuthorityData();
    setIsLoaded(true);
  }, []);

  const loadAuthorityData = () => {
    const savedData = localStorage.getItem(`housing_authority_${user?.id}`);
    if (savedData) {
      setAuthorityData(JSON.parse(savedData));
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem(`housing_authority_${user?.id}`, JSON.stringify(authorityData));
    setOpenProfileDialog(false);
  };

  const handleAddProject = () => {
    setProjectForm({
      project_name: '',
      location: '',
      total_units: 0,
      available_units: 0,
      unit_types: [],
      rent_range: '',
      status: 'active'
    });
    setEditingProject(null);
    setOpenProjectDialog(true);
  };

  const handleEditProject = (projectIndex) => {
    const project = authorityData.housing_projects[projectIndex];
    setProjectForm(project);
    setEditingProject(projectIndex);
    setOpenProjectDialog(true);
  };

  const handleSaveProject = () => {
    const updatedProjects = [...authorityData.housing_projects];
    if (editingProject !== null) {
      updatedProjects[editingProject] = projectForm;
    } else {
      updatedProjects.push(projectForm);
    }
    
    const updatedAuthorityData = {
      ...authorityData,
      housing_projects: updatedProjects,
      total_units: updatedProjects.reduce((total, project) => total + project.total_units, 0),
      available_units: updatedProjects.reduce((total, project) => total + project.available_units, 0)
    };
    
    setAuthorityData(updatedAuthorityData);
    localStorage.setItem(`housing_authority_${user?.id}`, JSON.stringify(updatedAuthorityData));
    setOpenProjectDialog(false);
  };

  const handleDeleteProject = (projectIndex) => {
    const updatedProjects = authorityData.housing_projects.filter((_, index) => index !== projectIndex);
    const updatedAuthorityData = {
      ...authorityData,
      housing_projects: updatedProjects,
      total_units: updatedProjects.reduce((total, project) => total + project.total_units, 0),
      available_units: updatedProjects.reduce((total, project) => total + project.available_units, 0)
    };
    
    setAuthorityData(updatedAuthorityData);
    localStorage.setItem(`housing_authority_${user?.id}`, JSON.stringify(updatedAuthorityData));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const getOccupancyRate = () => {
    if (authorityData.total_units === 0) return 0;
    return ((authorityData.total_units - authorityData.available_units) / authorityData.total_units * 100).toFixed(1);
  };

  return (
    <Box sx={{ p: 3, background: '#0a1929', minHeight: '100vh' }}>
      <Fade in={isLoaded} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            Housing Authority Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Public Housing Management & Administration
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Authority Profile Card */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1000}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(63, 81, 181, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{
                  width: 60,
                  height: 60,
                  mr: 2,
                  background: 'linear-gradient(45deg, #3f51b5, #2196f3)'
                }}>
                  <AuthorityIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {authorityData.authority_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {authorityData.region}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 16 }} />
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {authorityData.contact_email}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 16 }} />
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {authorityData.contact_phone}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon sx={{ fontSize: 16 }} />
                  Office Address
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {authorityData.office_address}
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setOpenProfileDialog(true)}
                sx={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #303f9f, #1976d2)'
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
                  border: '1px solid rgba(63, 81, 181, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <ApartmentIcon sx={{ fontSize: 30, color: '#3f51b5', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {authorityData.housing_projects.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Projects
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
                  border: '1px solid rgba(63, 81, 181, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <HomeIcon sx={{ fontSize: 30, color: '#2196f3', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {authorityData.total_units}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Total Units
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
                  border: '1px solid rgba(63, 81, 181, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <PeopleIcon sx={{ fontSize: 30, color: '#4caf50', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {authorityData.available_units}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Available Units
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
                  border: '1px solid rgba(63, 81, 181, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <MoneyIcon sx={{ fontSize: 30, color: '#ff9800', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {getOccupancyRate()}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Occupancy Rate
                  </Typography>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Grid>

        {/* Housing Projects */}
        <Grid item xs={12}>
          <Slide direction="up" in={isLoaded} timeout={1600}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(63, 81, 181, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <ApartmentIcon />
                  Housing Projects
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddProject}
                  size="small"
                  sx={{
                    background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #303f9f, #1976d2)'
                    }
                  }}
                >
                  Add Project
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Project Name</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Location</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Units</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Available</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Rent Range</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {authorityData.housing_projects.map((project, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: 'white' }}>{project.project_name}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{project.location}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{project.total_units}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{project.available_units}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{project.rent_range}</TableCell>
                        <TableCell>
                          <Chip
                            label={project.status}
                            color={getStatusColor(project.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleEditProject(index)}
                            sx={{ color: 'rgba(255,255,255,0.7)' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteProject(index)}
                            sx={{ color: 'rgba(244, 67, 54, 0.7)' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
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

      {/* Add/Edit Project Dialog */}
      <Dialog open={openProjectDialog} onClose={() => setOpenProjectDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProject !== null ? 'Edit Housing Project' : 'Add New Housing Project'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Name"
                value={projectForm.project_name}
                onChange={(e) => setProjectForm(prev => ({ ...prev, project_name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={projectForm.location}
                onChange={(e) => setProjectForm(prev => ({ ...prev, location: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Units"
                type="number"
                value={projectForm.total_units}
                onChange={(e) => setProjectForm(prev => ({ ...prev, total_units: parseInt(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Available Units"
                type="number"
                value={projectForm.available_units}
                onChange={(e) => setProjectForm(prev => ({ ...prev, available_units: parseInt(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rent Range"
                value={projectForm.rent_range}
                onChange={(e) => setProjectForm(prev => ({ ...prev, rent_range: e.target.value }))}
                placeholder="e.g., $800-1200"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={projectForm.status}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, status: e.target.value }))}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="maintenance">Under Maintenance</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProjectDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveProject} variant="contained">
            {editingProject !== null ? 'Update' : 'Add'} Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Update Dialog */}
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Authority Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Authority Name"
                value={authorityData.authority_name}
                onChange={(e) => setAuthorityData(prev => ({ ...prev, authority_name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Region"
                value={authorityData.region}
                onChange={(e) => setAuthorityData(prev => ({ ...prev, region: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={authorityData.contact_email}
                onChange={(e) => setAuthorityData(prev => ({ ...prev, contact_email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={authorityData.contact_phone}
                onChange={(e) => setAuthorityData(prev => ({ ...prev, contact_phone: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Office Address"
                multiline
                rows={2}
                value={authorityData.office_address}
                onChange={(e) => setAuthorityData(prev => ({ ...prev, office_address: e.target.value }))}
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

export default HousingAuthorityDashboard;
