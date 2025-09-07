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
  Agriculture as AgricultureIcon,
  LocationOn as LocationIcon,
  TrendingUp as TrendingUpIcon,
  Store as StoreIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Nature as EcoIcon,
  LocalShipping as DeliveryIcon
} from '@mui/icons-material';

const FarmerDashboard = ({ user }) => {
  const theme = useTheme();
  const [farmerData, setFarmerData] = useState({
    farm_name: 'Green Valley Farm',
    location_lat: 13.0827,
    location_lon: 80.2707,
    contact_info: '+91-9876543210',
    organic_certified: false,
    delivery_radius_km: 10.0,
    crops_available: [
      {
        crop_name: 'Tomatoes',
        quantity: 500,
        price_per_kg: 25,
        harvest_date: '2024-01-15',
        quality_grade: 'A',
        organic: false
      },
      {
        crop_name: 'Onions',
        quantity: 300,
        price_per_kg: 20,
        harvest_date: '2024-01-10',
        quality_grade: 'B',
        organic: false
      },
      {
        crop_name: 'Carrots',
        quantity: 150,
        price_per_kg: 30,
        harvest_date: '2024-01-20',
        quality_grade: 'A',
        organic: true
      }
    ]
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [openCropDialog, setOpenCropDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [cropForm, setCropForm] = useState({
    crop_name: '',
    quantity: 0,
    price_per_kg: 0,
    harvest_date: '',
    quality_grade: 'A',
    organic: false
  });
  const [marketPrices, setMarketPrices] = useState({});

  useEffect(() => {
    loadFarmerData();
    loadMarketPrices();
    setIsLoaded(true);
  }, []);

  const loadFarmerData = () => {
    const savedData = localStorage.getItem(`farmer_${user?.id}`);
    if (savedData) {
      setFarmerData(JSON.parse(savedData));
    }
  };

  const loadMarketPrices = () => {
    // Mock market prices
    setMarketPrices({
      'Tomatoes': { current: 28, trend: 'up', change: 3 },
      'Onions': { current: 22, trend: 'down', change: -2 },
      'Carrots': { current: 32, trend: 'up', change: 2 },
      'Potatoes': { current: 18, trend: 'stable', change: 0 },
      'Cabbage': { current: 15, trend: 'up', change: 1 }
    });
  };

  const handleSaveProfile = () => {
    localStorage.setItem(`farmer_${user?.id}`, JSON.stringify(farmerData));
    setOpenProfileDialog(false);
  };

  const handleAddCrop = () => {
    setCropForm({
      crop_name: '',
      quantity: 0,
      price_per_kg: 0,
      harvest_date: '',
      quality_grade: 'A',
      organic: false
    });
    setEditingCrop(null);
    setOpenCropDialog(true);
  };

  const handleEditCrop = (cropIndex) => {
    const crop = farmerData.crops_available[cropIndex];
    setCropForm(crop);
    setEditingCrop(cropIndex);
    setOpenCropDialog(true);
  };

  const handleSaveCrop = () => {
    const updatedCrops = [...farmerData.crops_available];
    if (editingCrop !== null) {
      updatedCrops[editingCrop] = cropForm;
    } else {
      updatedCrops.push(cropForm);
    }
    
    const updatedFarmerData = {
      ...farmerData,
      crops_available: updatedCrops
    };
    
    setFarmerData(updatedFarmerData);
    localStorage.setItem(`farmer_${user?.id}`, JSON.stringify(updatedFarmerData));
    setOpenCropDialog(false);
  };

  const handleDeleteCrop = (cropIndex) => {
    const updatedCrops = farmerData.crops_available.filter((_, index) => index !== cropIndex);
    const updatedFarmerData = {
      ...farmerData,
      crops_available: updatedCrops
    };
    
    setFarmerData(updatedFarmerData);
    localStorage.setItem(`farmer_${user?.id}`, JSON.stringify(updatedFarmerData));
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon sx={{ color: '#4caf50', transform: 'rotate(0deg)' }} />;
      case 'down': return <TrendingUpIcon sx={{ color: '#f44336', transform: 'rotate(180deg)' }} />;
      default: return <TrendingUpIcon sx={{ color: '#ff9800', transform: 'rotate(90deg)' }} />;
    }
  };

  const getQualityColor = (grade) => {
    switch (grade) {
      case 'A': return '#4caf50';
      case 'B': return '#ff9800';
      case 'C': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getTotalValue = () => {
    return farmerData.crops_available.reduce((total, crop) => {
      return total + (crop.quantity * crop.price_per_kg);
    }, 0);
  };

  const getOrganicCount = () => {
    return farmerData.crops_available.filter(crop => crop.organic).length;
  };

  return (
    <Box sx={{ p: 3, background: '#0a1929', minHeight: '100vh' }}>
      <Fade in={isLoaded} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #8bc34a, #4caf50)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            Farmer Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Crop Management & Marketplace
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Farm Profile Card */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1000}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(139, 195, 74, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{
                  width: 60,
                  height: 60,
                  mr: 2,
                  background: 'linear-gradient(45deg, #8bc34a, #4caf50)'
                }}>
                  <AgricultureIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {farmerData.farm_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {user?.name || 'Farm Owner'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Contact
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {farmerData.contact_info}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  Delivery Radius
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {farmerData.delivery_radius_km} km
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={<Switch checked={farmerData.organic_certified} disabled />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EcoIcon sx={{ color: farmerData.organic_certified ? '#4caf50' : '#9e9e9e' }} />
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        Organic Certified
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setOpenProfileDialog(true)}
                sx={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #8bc34a, #4caf50)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #689f38, #388e3c)'
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
                  border: '1px solid rgba(139, 195, 74, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <AgricultureIcon sx={{ fontSize: 30, color: '#8bc34a', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {farmerData.crops_available.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Crop Types
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
                  border: '1px solid rgba(139, 195, 74, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <MoneyIcon sx={{ fontSize: 30, color: '#4caf50', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    ₹{getTotalValue().toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Total Value
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
                  border: '1px solid rgba(139, 195, 74, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <EcoIcon sx={{ fontSize: 30, color: '#66bb6a', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {getOrganicCount()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Organic Items
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
                  border: '1px solid rgba(139, 195, 74, 0.2)',
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <DeliveryIcon sx={{ fontSize: 30, color: '#81c784', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {farmerData.delivery_radius_km}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Delivery KM
                  </Typography>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Grid>

        {/* Current Crops */}
        <Grid item xs={12} md={8}>
          <Slide direction="up" in={isLoaded} timeout={1600}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(139, 195, 74, 0.2)',
              borderRadius: 3
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <StoreIcon />
                  Current Crops
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddCrop}
                  size="small"
                  sx={{
                    background: 'linear-gradient(45deg, #8bc34a, #4caf50)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #689f38, #388e3c)'
                    }
                  }}
                >
                  Add Crop
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Crop</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Quantity (kg)</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Price/kg</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Grade</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Harvest Date</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {farmerData.crops_available.map((crop, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: 'white' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {crop.crop_name}
                            {crop.organic && <EcoIcon sx={{ fontSize: 16, color: '#4caf50' }} />}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>{crop.quantity}</TableCell>
                        <TableCell sx={{ color: 'white' }}>₹{crop.price_per_kg}</TableCell>
                        <TableCell>
                          <Chip
                            label={crop.quality_grade}
                            size="small"
                            sx={{
                              backgroundColor: getQualityColor(crop.quality_grade),
                              color: 'white'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>{crop.harvest_date}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleEditCrop(index)}
                            sx={{ color: 'rgba(255,255,255,0.7)' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteCrop(index)}
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

        {/* Market Prices */}
        <Grid item xs={12} md={4}>
          <Slide direction="up" in={isLoaded} timeout={1800}>
            <Paper sx={{
              p: 3,
              background: 'rgba(39, 62, 107, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(139, 195, 74, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h6" sx={{
                color: 'white',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <TrendingUpIcon />
                Market Prices
              </Typography>

              <List>
                {Object.entries(marketPrices).map(([crop, data]) => (
                  <ListItem key={crop} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{
                        width: 32,
                        height: 32,
                        background: 'rgba(139, 195, 74, 0.2)'
                      }}>
                        {getTrendIcon(data.trend)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {crop}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            ₹{data.current}/kg
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: data.change > 0 ? '#4caf50' : data.change < 0 ? '#f44336' : '#ff9800'
                            }}
                          >
                            ({data.change > 0 ? '+' : ''}{data.change})
                          </Typography>
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

      {/* Add/Edit Crop Dialog */}
      <Dialog open={openCropDialog} onClose={() => setOpenCropDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingCrop !== null ? 'Edit Crop' : 'Add New Crop'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Crop Name"
                value={cropForm.crop_name}
                onChange={(e) => setCropForm(prev => ({ ...prev, crop_name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity (kg)"
                type="number"
                value={cropForm.quantity}
                onChange={(e) => setCropForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price per kg (₹)"
                type="number"
                value={cropForm.price_per_kg}
                onChange={(e) => setCropForm(prev => ({ ...prev, price_per_kg: parseFloat(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Quality Grade</InputLabel>
                <Select
                  value={cropForm.quality_grade}
                  onChange={(e) => setCropForm(prev => ({ ...prev, quality_grade: e.target.value }))}
                  label="Quality Grade"
                >
                  <MenuItem value="A">Grade A (Premium)</MenuItem>
                  <MenuItem value="B">Grade B (Standard)</MenuItem>
                  <MenuItem value="C">Grade C (Basic)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Harvest Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={cropForm.harvest_date}
                onChange={(e) => setCropForm(prev => ({ ...prev, harvest_date: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={cropForm.organic}
                    onChange={(e) => setCropForm(prev => ({ ...prev, organic: e.target.checked }))}
                  />
                }
                label="Organic Crop"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCropDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveCrop} variant="contained">
            {editingCrop !== null ? 'Update' : 'Add'} Crop
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Update Dialog */}
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Farm Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Farm Name"
                value={farmerData.farm_name}
                onChange={(e) => setFarmerData(prev => ({ ...prev, farm_name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Information"
                value={farmerData.contact_info}
                onChange={(e) => setFarmerData(prev => ({ ...prev, contact_info: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Delivery Radius (km)"
                type="number"
                value={farmerData.delivery_radius_km}
                onChange={(e) => setFarmerData(prev => ({ ...prev, delivery_radius_km: parseFloat(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={farmerData.organic_certified}
                    onChange={(e) => setFarmerData(prev => ({ ...prev, organic_certified: e.target.checked }))}
                  />
                }
                label="Organic Certification"
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

export default FarmerDashboard;
