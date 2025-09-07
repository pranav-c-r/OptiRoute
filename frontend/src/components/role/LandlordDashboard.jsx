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
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  AttachMoney as MoneyIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Apartment as ApartmentIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const LandlordDashboard = ({ user }) => {
  const theme = useTheme();
  const [landlordData, setLandlordData] = useState({
    name: user?.name || 'Property Owner',
    contact_email: 'landlord@example.com',
    contact_phone: '+1-555-0456',
    business_address: '789 Main Street, Suite 100',
    total_properties: 8,
    total_units: 45,
    occupied_units: 38,
    properties: [
      {
        property_name: 'Sunset Apartments',
        address: '123 Sunset Boulevard',
        unit_count: 12,
        available_units: 2,
        rent_range: '$1200-1800',
        property_type: 'apartment',
        amenities: ['parking', 'laundry', 'gym'],
        status: 'active'
      },
      {
        property_name: 'Oak Street Condos',
        address: '456 Oak Street',
        unit_count: 8,
        available_units: 1,
        rent_range: '$1500-2200',
        property_type: 'condo',
        amenities: ['parking', 'pool', 'balcony'],
        status: 'active'
      },
      {
        property_name: 'Downtown Studio Complex',
        address: '789 Downtown Ave',
        unit_count: 15,
        available_units: 3,
        rent_range: '$900-1300',
        property_type: 'studio',
        amenities: ['parking', 'laundry'],
        status: 'active'
      },
      {
        property_name: 'Riverside Townhouses',
        address: '321 River View Drive',
        unit_count: 10,
        available_units: 1,
        rent_range: '$1800-2500',
        property_type: 'townhouse',
        amenities: ['parking', 'garden', 'garage'],
        status: 'maintenance'
      }
    ],
    recent_inquiries: [
      {
        property: 'Sunset Apartments',
        inquirer: 'John Smith',
        contact: 'john@email.com',
        date: '2024-01-15',
        status: 'pending'
      },
      {
        property: 'Oak Street Condos',
        inquirer: 'Sarah Johnson',
        contact: 'sarah@email.com',
        date: '2024-01-14',
        status: 'scheduled'
      },
      {
        property: 'Downtown Studio Complex',
        inquirer: 'Mike Davis',
        contact: 'mike@email.com',
        date: '2024-01-13',
        status: 'completed'
      }
    ]
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [openPropertyDialog, setOpenPropertyDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propertyForm, setPropertyForm] = useState({
    property_name: '',
    address: '',
    unit_count: 0,
    available_units: 0,
    rent_range: '',
    property_type: 'apartment',
    amenities: [],
    status: 'active'
  });

  useEffect(() => {
    loadLandlordData();
    setIsLoaded(true);
  }, []);

  const loadLandlordData = () => {
    const savedData = localStorage.getItem(`landlord_${user?.id}`);
    if (savedData) {
      setLandlordData(JSON.parse(savedData));
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem(`landlord_${user?.id}`, JSON.stringify(landlordData));
    setOpenProfileDialog(false);
  };

  const handleAddProperty = () => {
    setPropertyForm({
      property_name: '',
      address: '',
      unit_count: 0,
      available_units: 0,
      rent_range: '',
      property_type: 'apartment',
      amenities: [],
      status: 'active'
    });
    setEditingProperty(null);
    setOpenPropertyDialog(true);
  };

  const handleEditProperty = (propertyIndex) => {
    const property = landlordData.properties[propertyIndex];
    setPropertyForm(property);
    setEditingProperty(propertyIndex);
    setOpenPropertyDialog(true);
  };

  const handleSaveProperty = () => {
    const updatedProperties = [...landlordData.properties];
    if (editingProperty !== null) {
      updatedProperties[editingProperty] = propertyForm;
    } else {
      updatedProperties.push(propertyForm);
    }
    
    const updatedLandlordData = {
      ...landlordData,
      properties: updatedProperties,
      total_properties: updatedProperties.length,
      total_units: updatedProperties.reduce((total, property) => total + property.unit_count, 0),
      occupied_units: updatedProperties.reduce((total, property) => total + (property.unit_count - property.available_units), 0)
    };
    
    setLandlordData(updatedLandlordData);
    localStorage.setItem(`landlord_${user?.id}`, JSON.stringify(updatedLandlordData));
    setOpenPropertyDialog(false);
  };

  const handleDeleteProperty = (propertyIndex) => {
    const updatedProperties = landlordData.properties.filter((_, index) => index !== propertyIndex);
    const updatedLandlordData = {
      ...landlordData,
      properties: updatedProperties,
      total_properties: updatedProperties.length,
      total_units: updatedProperties.reduce((total, property) => total + property.unit_count, 0),
      occupied_units: updatedProperties.reduce((total, property) => total + (property.unit_count - property.available_units), 0)
    };
    
    setLandlordData(updatedLandlordData);
    localStorage.setItem(`landlord_${user?.id}`, JSON.stringify(updatedLandlordData));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'closed': return 'error';
      case 'pending': return 'warning';
      case 'scheduled': return 'info';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getOccupancyRate = () => {
    if (landlordData.total_units === 0) return 0;
    return (landlordData.occupied_units / landlordData.total_units * 100).toFixed(1);
  };

  const getAvailableUnits = () => {
    return landlordData.total_units - landlordData.occupied_units;
  };

  const getTotalRentalIncome = () => {
    // Mock calculation - in real app would be based on actual rent data
    return landlordData.occupied_units * 1500; // Average rent estimation
  };

  return (
    <Box sx={{ p: 3, background: '#0a1929', minHeight: '100vh' }}>
      <Fade in={isLoaded} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #ff9800, #f57c00)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            Landlord Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Property Management & Rental Operations
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Landlord Profile Card */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1000}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{
                  width: 60,
                  height: 60,
                  mr: 2,
                  background: 'linear-gradient(45deg, #ff9800, #f57c00)'
                }}>
                  <PersonIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {landlordData.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Property Owner
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
                  {landlordData.contact_email}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 16 }} />
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {landlordData.contact_phone}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon sx={{ fontSize: 16 }} />
                  Business Address
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {landlordData.business_address}
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setOpenProfileDialog(true)}
                sx={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #ff9800, #f57c00)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #f57c00, #e65100)'
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
                  border: '1px solid rgba(255, 152, 0, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <ApartmentIcon sx={{ fontSize: 30, color: '#ff9800', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {landlordData.total_properties}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Properties
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
                  border: '1px solid rgba(255, 152, 0, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <HomeIcon sx={{ fontSize: 30, color: '#f57c00', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {landlordData.total_units}
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
                  border: '1px solid rgba(255, 152, 0, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <CheckIcon sx={{ fontSize: 30, color: '#4caf50', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {getAvailableUnits()}
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
                  border: '1px solid rgba(255, 152, 0, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <MoneyIcon sx={{ fontSize: 30, color: '#4caf50', mb: 1 }} />
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

        {/* Properties */}
        <Grid item xs={12} md={8}>
          <Slide direction="up" in={isLoaded} timeout={1600}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
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
                  My Properties
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddProperty}
                  size="small"
                  sx={{
                    background: 'linear-gradient(45deg, #ff9800, #f57c00)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f57c00, #e65100)'
                    }
                  }}
                >
                  Add Property
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Property Name</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Address</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Units</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Available</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Rent Range</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {landlordData.properties.map((property, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: 'white' }}>{property.property_name}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{property.address}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{property.unit_count}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{property.available_units}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{property.rent_range}</TableCell>
                        <TableCell>
                          <Chip
                            label={property.status}
                            color={getStatusColor(property.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleEditProperty(index)}
                            sx={{ color: 'rgba(255,255,255,0.7)' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteProperty(index)}
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

        {/* Recent Inquiries */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1800}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h6" sx={{
                color: 'white',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <EmailIcon />
                Recent Inquiries
              </Typography>

              <List>
                {landlordData.recent_inquiries.map((inquiry, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{
                        width: 32,
                        height: 32,
                        background: 'rgba(255, 152, 0, 0.2)'
                      }}>
                        <PersonIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {inquiry.inquirer}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {inquiry.property} - {inquiry.date}
                          </Typography>
                          <br />
                          <Chip
                            label={inquiry.status}
                            color={getStatusColor(inquiry.status)}
                            size="small"
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

      {/* Add/Edit Property Dialog */}
      <Dialog open={openPropertyDialog} onClose={() => setOpenPropertyDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProperty !== null ? 'Edit Property' : 'Add New Property'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Property Name"
                value={propertyForm.property_name}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, property_name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                value={propertyForm.address}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, address: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Count"
                type="number"
                value={propertyForm.unit_count}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, unit_count: parseInt(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Available Units"
                type="number"
                value={propertyForm.available_units}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, available_units: parseInt(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rent Range"
                value={propertyForm.rent_range}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, rent_range: e.target.value }))}
                placeholder="e.g., $1200-1800"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={propertyForm.property_type}
                  onChange={(e) => setPropertyForm(prev => ({ ...prev, property_type: e.target.value }))}
                  label="Property Type"
                >
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="condo">Condo</MenuItem>
                  <MenuItem value="townhouse">Townhouse</MenuItem>
                  <MenuItem value="studio">Studio</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={propertyForm.status}
                  onChange={(e) => setPropertyForm(prev => ({ ...prev, status: e.target.value }))}
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
          <Button onClick={() => setOpenPropertyDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveProperty} variant="contained">
            {editingProperty !== null ? 'Update' : 'Add'} Property
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Update Dialog */}
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Landlord Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={landlordData.name}
                onChange={(e) => setLandlordData(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={landlordData.contact_email}
                onChange={(e) => setLandlordData(prev => ({ ...prev, contact_email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={landlordData.contact_phone}
                onChange={(e) => setLandlordData(prev => ({ ...prev, contact_phone: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business Address"
                multiline
                rows={2}
                value={landlordData.business_address}
                onChange={(e) => setLandlordData(prev => ({ ...prev, business_address: e.target.value }))}
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

export default LandlordDashboard;
