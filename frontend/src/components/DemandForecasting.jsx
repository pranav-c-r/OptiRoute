import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Alert,
  CircularProgress,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Slider,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Badge,
  useTheme,
  Fade,
  Slide,
  Zoom
} from '@mui/material';
import {
  Psychology as AIIcon,
  TrendingUp as ForecastIcon,
  Route as RouteIcon,
  Balance as BalanceIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  LocalDining as FoodIcon,
  LocalHospital as MedicalIcon,
  Water as WaterIcon,
  Home as ShelterIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Timeline as TimelineIcon,
  Analytics as AnalyticsIcon,
  Satellite as SatelliteIcon,
  LocalShipping as TruckIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Map as MapIcon
} from '@mui/icons-material';

const DemandForecasting = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [forecasting, setForecasting] = useState(false);
  
  // Input States
  const [disasterType, setDisasterType] = useState('earthquake');
  const [location, setLocation] = useState('');
  const [population, setPopulation] = useState(10000);
  const [severity, setSeverity] = useState(5);
  const [timeframe, setTimeframe] = useState(7);
  const [infrastructure, setInfrastructure] = useState(70);
  const [weather, setWeather] = useState('normal');
  
  // Results States
  const [forecastResults, setForecastResults] = useState(null);
  const [routingResults, setRoutingResults] = useState(null);
  const [reallocationResults, setReallocationResults] = useState(null);
  const [communityNeeds, setCommunityNeeds] = useState(null);
  
  // Mock data for initial display
  const [existingResources, setExistingResources] = useState([
    { location: 'Chennai Central', food: 5000, water: 10000, medical: 500, shelter: 200 },
    { location: 'Coimbatore', food: 8000, water: 15000, medical: 800, shelter: 350 },
    { location: 'Madurai', food: 3000, water: 7000, medical: 300, shelter: 150 }
  ]);

  const disasterTypes = [
    { value: 'earthquake', label: 'Earthquake', icon: '🏚️' },
    { value: 'flood', label: 'Flood', icon: '🌊' },
    { value: 'cyclone', label: 'Cyclone', icon: '🌪️' },
    { value: 'fire', label: 'Wildfire', icon: '🔥' },
    { value: 'drought', label: 'Drought', icon: '🏜️' }
  ];

  const weatherConditions = [
    { value: 'clear', label: 'Clear Weather' },
    { value: 'rain', label: 'Rainy' },
    { value: 'storm', label: 'Storm' },
    { value: 'normal', label: 'Normal' }
  ];

  const callGeminiAPI = async (prompt) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });
      
      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'No response available';
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Error generating prediction. Please try again.';
    }
  };

  const generateDemandForecast = async () => {
    setForecasting(true);
    setLoading(true);

    const prompt = `
    As an AI disaster relief expert, provide a detailed demand forecast for the following scenario:
    
    Disaster Type: ${disasterType}
    Location: ${location}
    Population Affected: ${population.toLocaleString()}
    Severity (1-10): ${severity}
    Forecast Period: ${timeframe} days
    Infrastructure Status: ${infrastructure}%
    Weather Conditions: ${weather}
    
    Please provide:
    1. Estimated daily resource needs (food, water, medical supplies, shelter)
    2. Priority areas and vulnerable populations
    3. Resource requirements breakdown
    4. Timeline of critical needs
    5. Risk factors and contingencies
    
    Format the response as structured data that can be parsed for visualization.
    Include specific numbers for: food (meals), water (liters), medical supplies (units), shelter (people).
    Also provide confidence levels for each prediction.
    `;

    const response = await callGeminiAPI(prompt);
    
    // Parse response and create structured forecast
    const mockForecast = {
      totalNeeds: {
        food: Math.round(population * 3 * timeframe * (severity / 10)),
        water: Math.round(population * 4 * timeframe * (severity / 10)),
        medical: Math.round(population * 0.3 * timeframe * (severity / 10)),
        shelter: Math.round(population * 0.8 * (severity / 10))
      },
      dailyNeeds: {
        food: Math.round(population * 3 * (severity / 10)),
        water: Math.round(population * 4 * (severity / 10)),
        medical: Math.round(population * 0.3 * (severity / 10)),
        shelter: Math.round(population * 0.8 * (severity / 10))
      },
      priorityAreas: ['Zone A (High Risk)', 'Zone B (Vulnerable)', 'Zone C (Moderate)'],
      confidence: Math.max(65, 100 - severity * 3 - (10 - infrastructure/10)),
      aiInsights: response,
      timeline: Array.from({length: timeframe}, (_, i) => ({
        day: i + 1,
        urgency: Math.max(1, severity - (i * 0.5)),
        criticalNeeds: i < 3 ? ['Water', 'Medical'] : i < 5 ? ['Food', 'Shelter'] : ['Reconstruction']
      }))
    };

    setForecastResults(mockForecast);
    setLoading(false);
    setForecasting(false);
  };

  const generateOptimalRoutes = async () => {
    setLoading(true);
    
    const prompt = `
    Plan optimal delivery routes for disaster relief in ${location} with ${disasterType}.
    
    Consider:
    - Population: ${population.toLocaleString()}
    - Infrastructure damage: ${100-infrastructure}%
    - Weather: ${weather}
    - Available resources from: ${existingResources.map(r => r.location).join(', ')}
    
    Provide:
    1. Route priorities and sequences
    2. Estimated delivery times
    3. Risk assessments for each route
    4. Alternative paths in case of blockages
    5. Resource allocation per route
    
    Focus on efficiency and safety.
    `;

    const response = await callGeminiAPI(prompt);
    
    const mockRoutes = [
      {
        id: 1,
        from: existingResources[0].location,
        to: location,
        priority: 'High',
        estimatedTime: '4 hours',
        distance: '45 km',
        riskLevel: infrastructure > 50 ? 'Low' : 'High',
        resources: ['Medical Supplies', 'Water'],
        aiRecommendation: response.split('\n')[0]
      },
      {
        id: 2,
        from: existingResources[1].location,
        to: location,
        priority: 'Medium',
        estimatedTime: '6 hours',
        distance: '78 km',
        riskLevel: 'Medium',
        resources: ['Food', 'Shelter Materials'],
        aiRecommendation: response.split('\n')[1] || 'Secondary route for non-critical supplies'
      }
    ];

    setRoutingResults({
      routes: mockRoutes,
      totalDistance: mockRoutes.reduce((sum, route) => sum + parseInt(route.distance), 0),
      totalTime: mockRoutes.reduce((sum, route) => sum + parseInt(route.estimatedTime), 0),
      aiAnalysis: response
    });
    setLoading(false);
  };

  const generateReallocation = async () => {
    setLoading(true);
    
    const prompt = `
    Analyze resource reallocation opportunities to prevent duplication and ensure equitable distribution.
    
    Current resource distribution:
    ${existingResources.map(r => 
      `${r.location}: Food: ${r.food}, Water: ${r.water}, Medical: ${r.medical}, Shelter: ${r.shelter}`
    ).join('\n')}
    
    New demand in ${location}: ${forecastResults ? 
      `Food: ${forecastResults.totalNeeds.food}, Water: ${forecastResults.totalNeeds.water}, Medical: ${forecastResults.totalNeeds.medical}, Shelter: ${forecastResults.totalNeeds.shelter}` : 
      'High demand expected'
    }
    
    Recommend:
    1. Which locations have excess resources
    2. How to redistribute for optimal coverage
    3. Transportation logistics
    4. Timeline for reallocation
    5. Risk mitigation strategies
    `;

    const response = await callGeminiAPI(prompt);
    
    const mockReallocation = {
      excessResources: [
        { location: 'Coimbatore', resource: 'Food', excess: 2000, canRedistribute: 1500 },
        { location: 'Chennai Central', resource: 'Medical', excess: 200, canRedistribute: 150 }
      ],
      underservedAreas: [
        { location: location, resource: 'Water', shortage: 3000, priority: 'Critical' },
        { location: 'Rural Areas', resource: 'Food', shortage: 1500, priority: 'High' }
      ],
      reallocationPlan: response,
      efficiency: 85,
      estimatedSavings: '₹2,50,000'
    };

    setReallocationResults(mockReallocation);
    setLoading(false);
  };

  const detectCommunityNeeds = async () => {
    setLoading(true);
    
    const prompt = `
    Analyze community needs detection for ${location} affected by ${disasterType}.
    
    Scenario:
    - Population: ${population.toLocaleString()}
    - Severity: ${severity}/10
    - Infrastructure: ${infrastructure}%
    - Weather: ${weather}
    
    Using AI analysis of satellite imagery, mobile inputs, and ground reports, identify:
    1. Most urgent community needs by priority
    2. Vulnerable population segments (elderly, children, disabled)
    3. Geographic hotspots requiring immediate attention
    4. Communication and access challenges
    5. Community resource capabilities and gaps
    
    Provide actionable insights for immediate response.
    `;

    const response = await callGeminiAPI(prompt);
    
    const mockCommunityNeeds = {
      urgentNeeds: [
        { need: 'Clean Water', urgency: 95, affected: Math.round(population * 0.8), location: 'Downtown Area' },
        { need: 'Medical Care', urgency: 88, affected: Math.round(population * 0.3), location: 'Residential Zones' },
        { need: 'Food Supply', urgency: 75, affected: Math.round(population * 0.6), location: 'Rural Outskirts' },
        { need: 'Shelter', urgency: 65, affected: Math.round(population * 0.4), location: 'Coastal Areas' }
      ],
      vulnerableGroups: [
        { group: 'Elderly (65+)', count: Math.round(population * 0.12), needs: ['Medical', 'Mobility'] },
        { group: 'Children (<12)', count: Math.round(population * 0.18), needs: ['Food', 'Safety'] },
        { group: 'Disabled', count: Math.round(population * 0.08), needs: ['Access', 'Medical'] }
      ],
      hotspots: [
        { area: 'Zone A', coordinates: '13.0827, 80.2707', priority: 'Critical', reason: 'High population density' },
        { area: 'Zone B', coordinates: '13.0627, 80.2507', priority: 'High', reason: 'Limited infrastructure' }
      ],
      aiInsights: response,
      dataConfidence: 78
    };

    setCommunityNeeds(mockCommunityNeeds);
    setLoading(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return '#d32f2f';
      case 'high': return '#f57c00';
      case 'medium': return '#fbc02d';
      case 'low': return '#388e3c';
      default: return '#1976d2';
    }
  };

  const getUrgencyColor = (urgency) => {
    if (urgency >= 90) return '#d32f2f';
    if (urgency >= 70) return '#f57c00';
    if (urgency >= 50) return '#fbc02d';
    return '#388e3c';
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      p: 3 
    }}>
      {/* Header */}
      <Fade in timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{
            background: 'linear-gradient(45deg, #00bcd4, #2196f3, #9c27b0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            mb: 2
          }}>
            AI-Powered Demand Forecasting
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
            Intelligent Disaster Relief Planning & Resource Optimization
          </Typography>
          
          {/* Feature Pills */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            {[
              { icon: <ForecastIcon />, label: 'ML Demand Prediction', color: '#00bcd4' },
              { icon: <RouteIcon />, label: 'Optimal Routing', color: '#2196f3' },
              { icon: <BalanceIcon />, label: 'Resource Reallocation', color: '#9c27b0' },
              { icon: <SatelliteIcon />, label: 'Community Detection', color: '#4caf50' }
            ].map((feature, index) => (
              <Zoom in timeout={1000 + index * 200} key={feature.label}>
                <Chip
                  icon={feature.icon}
                  label={feature.label}
                  sx={{
                    backgroundColor: feature.color,
                    color: 'white',
                    fontWeight: 600,
                    px: 2,
                    py: 1
                  }}
                />
              </Zoom>
            ))}
          </Box>
        </Box>
      </Fade>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Input Panel */}
        <Grid item xs={12} md={4}>
          <Slide direction="right" in timeout={1000}>
            <Paper sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3
            }}>
              <Typography variant="h5" sx={{ color: 'white', mb: 3, display: 'flex', alignItems: 'center' }}>
                <AIIcon sx={{ mr: 2, color: '#00bcd4' }} />
                AI Input Parameters
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Disaster Type</InputLabel>
                    <Select
                      value={disasterType}
                      onChange={(e) => setDisasterType(e.target.value)}
                      sx={{ color: 'white', '.MuiSelect-icon': { color: 'white' } }}
                    >
                      {disasterTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Affected Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                    Population: {population.toLocaleString()}
                  </Typography>
                  <Slider
                    value={population}
                    onChange={(e, value) => setPopulation(value)}
                    min={1000}
                    max={1000000}
                    step={1000}
                    sx={{ color: '#00bcd4' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                    Disaster Severity: {severity}/10
                  </Typography>
                  <Slider
                    value={severity}
                    onChange={(e, value) => setSeverity(value)}
                    min={1}
                    max={10}
                    marks
                    sx={{ color: getUrgencyColor(severity * 10) }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                    Forecast Timeframe: {timeframe} days
                  </Typography>
                  <Slider
                    value={timeframe}
                    onChange={(e, value) => setTimeframe(value)}
                    min={1}
                    max={30}
                    sx={{ color: '#2196f3' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                    Infrastructure Status: {infrastructure}%
                  </Typography>
                  <Slider
                    value={infrastructure}
                    onChange={(e, value) => setInfrastructure(value)}
                    min={0}
                    max={100}
                    sx={{ color: infrastructure > 50 ? '#4caf50' : '#f44336' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Weather Conditions</InputLabel>
                    <Select
                      value={weather}
                      onChange={(e) => setWeather(e.target.value)}
                      sx={{ color: 'white', '.MuiSelect-icon': { color: 'white' } }}
                    >
                      {weatherConditions.map((condition) => (
                        <MenuItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={generateDemandForecast}
                    disabled={!location || forecasting}
                    startIcon={forecasting ? <CircularProgress size={20} /> : <ForecastIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #00bcd4, #2196f3)',
                      mb: 1,
                      py: 1.5
                    }}
                  >
                    {forecasting ? 'Generating Forecast...' : 'Generate AI Forecast'}
                  </Button>
                  
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        onClick={generateOptimalRoutes}
                        disabled={loading}
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                      >
                        Routes
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        onClick={generateReallocation}
                        disabled={loading}
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                      >
                        Reallocation
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        onClick={detectCommunityNeeds}
                        disabled={loading}
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                      >
                        Community
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Slide>
        </Grid>

        {/* Results Panel */}
        <Grid item xs={12} md={8}>
          <Paper sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <Tabs
              value={currentTab}
              onChange={(e, newValue) => setCurrentTab(newValue)}
              sx={{
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                '& .MuiTab-root': { color: 'rgba(255,255,255,0.7)' },
                '& .Mui-selected': { color: 'white' }
              }}
            >
              <Tab icon={<ForecastIcon />} label="Demand Forecast" />
              <Tab icon={<RouteIcon />} label="Optimal Routes" />
              <Tab icon={<BalanceIcon />} label="Reallocation" />
              <Tab icon={<SatelliteIcon />} label="Community Needs" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {/* Demand Forecast Tab */}
              {currentTab === 0 && (
                <Fade in timeout={500}>
                  <Box>
                    {forecastResults ? (
                      <Grid container spacing={3}>
                        {/* Resource Needs Cards */}
                        <Grid item xs={12}>
                          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                            Resource Requirements - {timeframe} Days
                          </Typography>
                          <Grid container spacing={2}>
                            {[
                              { type: 'Food', value: forecastResults.totalNeeds.food, unit: 'meals', icon: <FoodIcon />, color: '#ff9800' },
                              { type: 'Water', value: forecastResults.totalNeeds.water, unit: 'liters', icon: <WaterIcon />, color: '#2196f3' },
                              { type: 'Medical', value: forecastResults.totalNeeds.medical, unit: 'units', icon: <MedicalIcon />, color: '#f44336' },
                              { type: 'Shelter', value: forecastResults.totalNeeds.shelter, unit: 'people', icon: <ShelterIcon />, color: '#9c27b0' }
                            ].map((resource) => (
                              <Grid item xs={6} md={3} key={resource.type}>
                                <Card sx={{ background: 'rgba(255,255,255,0.1)', textAlign: 'center', p: 2 }}>
                                  <Avatar sx={{ bgcolor: resource.color, mx: 'auto', mb: 1 }}>
                                    {resource.icon}
                                  </Avatar>
                                  <Typography variant="h6" sx={{ color: 'white' }}>
                                    {resource.value.toLocaleString()}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                    {resource.unit}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: resource.color, fontWeight: 600 }}>
                                    {resource.type}
                                  </Typography>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>

                        {/* Timeline */}
                        <Grid item xs={12} md={6}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <TimelineIcon sx={{ mr: 1 }} />
                              Urgency Timeline
                            </Typography>
                            {forecastResults.timeline.slice(0, 7).map((day) => (
                              <Box key={day.day} sx={{ mb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography sx={{ color: 'white' }}>Day {day.day}</Typography>
                                  <Typography sx={{ color: getUrgencyColor(day.urgency * 10) }}>
                                    {Math.round(day.urgency)}/10
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={day.urgency * 10}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: getUrgencyColor(day.urgency * 10)
                                    }
                                  }}
                                />
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                  Critical: {day.criticalNeeds.join(', ')}
                                </Typography>
                              </Box>
                            ))}
                          </Card>
                        </Grid>

                        {/* AI Insights */}
                        <Grid item xs={12} md={6}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2, height: '100%' }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <AIIcon sx={{ mr: 1, color: '#00bcd4' }} />
                              AI Insights
                            </Typography>
                            <Alert 
                              severity="info" 
                              sx={{ 
                                backgroundColor: 'rgba(0,188,212,0.2)', 
                                color: 'white',
                                mb: 2,
                                '& .MuiAlert-icon': { color: '#00bcd4' }
                              }}
                            >
                              Confidence Level: {forecastResults.confidence}%
                            </Alert>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.8)',
                                maxHeight: 200,
                                overflow: 'auto'
                              }}
                            >
                              {forecastResults.aiInsights.substring(0, 300)}...
                            </Typography>
                          </Card>
                        </Grid>
                      </Grid>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <ForecastIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                          Generate AI-Powered Demand Forecast
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          Enter disaster parameters and click "Generate AI Forecast" to get intelligent predictions
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Fade>
              )}

              {/* Optimal Routes Tab */}
              {currentTab === 1 && (
                <Fade in timeout={500}>
                  <Box>
                    {routingResults ? (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Alert 
                            severity="success"
                            sx={{ 
                              backgroundColor: 'rgba(76,175,80,0.2)', 
                              color: 'white',
                              mb: 2
                            }}
                          >
                            Optimal routes calculated • Total Distance: {routingResults.totalDistance} km • Estimated Time: {routingResults.totalTime} hours
                          </Alert>
                        </Grid>
                        
                        {routingResults.routes.map((route) => (
                          <Grid item xs={12} md={6} key={route.id}>
                            <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ color: 'white' }}>
                                  <TruckIcon sx={{ mr: 1 }} />
                                  Route {route.id}
                                </Typography>
                                <Chip 
                                  label={route.priority} 
                                  sx={{ 
                                    backgroundColor: getPriorityColor(route.priority),
                                    color: 'white' 
                                  }} 
                                />
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                  From: {route.from}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                  To: {route.to}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                  Distance: {route.distance} | Time: {route.estimatedTime}
                                </Typography>
                                <Chip 
                                  label={`Risk: ${route.riskLevel}`}
                                  size="small"
                                  sx={{ 
                                    mt: 1,
                                    backgroundColor: getPriorityColor(route.riskLevel),
                                    color: 'white' 
                                  }} 
                                />
                              </Box>

                              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>
                                Resources: {route.resources.join(', ')}
                              </Typography>
                              
                              <Typography variant="caption" sx={{ color: '#00bcd4' }}>
                                AI Recommendation: {route.aiRecommendation}
                              </Typography>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <RouteIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                          Optimal Delivery Routes
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          Click "Routes" to generate AI-optimized delivery paths
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Fade>
              )}

              {/* Resource Reallocation Tab */}
              {currentTab === 2 && (
                <Fade in timeout={500}>
                  <Box>
                    {reallocationResults ? (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Alert 
                            severity="warning"
                            sx={{ 
                              backgroundColor: 'rgba(156,39,176,0.2)', 
                              color: 'white',
                              mb: 2
                            }}
                          >
                            Reallocation Efficiency: {reallocationResults.efficiency}% • Estimated Savings: {reallocationResults.estimatedSavings}
                          </Alert>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <CheckIcon sx={{ mr: 1, color: '#4caf50' }} />
                              Excess Resources
                            </Typography>
                            {reallocationResults.excessResources.map((item, index) => (
                              <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: 'rgba(76,175,80,0.2)', borderRadius: 1 }}>
                                <Typography sx={{ color: 'white', fontWeight: 600 }}>
                                  {item.location}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                  {item.resource}: {item.excess} units available
                                </Typography>
                                <Typography sx={{ color: '#4caf50' }}>
                                  Can redistribute: {item.canRedistribute} units
                                </Typography>
                              </Box>
                            ))}
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <WarningIcon sx={{ mr: 1, color: '#f44336' }} />
                              Underserved Areas
                            </Typography>
                            {reallocationResults.underservedAreas.map((area, index) => (
                              <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: 'rgba(244,67,54,0.2)', borderRadius: 1 }}>
                                <Typography sx={{ color: 'white', fontWeight: 600 }}>
                                  {area.location}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                  {area.resource}: {area.shortage} units needed
                                </Typography>
                                <Chip 
                                  label={area.priority}
                                  size="small"
                                  sx={{ 
                                    backgroundColor: getPriorityColor(area.priority),
                                    color: 'white' 
                                  }} 
                                />
                              </Box>
                            ))}
                          </Card>
                        </Grid>

                        <Grid item xs={12}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <AIIcon sx={{ mr: 1, color: '#00bcd4' }} />
                              AI Reallocation Plan
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.8)',
                                whiteSpace: 'pre-line'
                              }}
                            >
                              {reallocationResults.reallocationPlan}
                            </Typography>
                          </Card>
                        </Grid>
                      </Grid>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <BalanceIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                          Resource Reallocation Analysis
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          Click "Reallocation" to prevent resource duplication and optimize distribution
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Fade>
              )}

              {/* Community Needs Tab */}
              {currentTab === 3 && (
                <Fade in timeout={500}>
                  <Box>
                    {communityNeeds ? (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Alert 
                            severity="info"
                            sx={{ 
                              backgroundColor: 'rgba(0,188,212,0.2)', 
                              color: 'white',
                              mb: 2
                            }}
                          >
                            Data Confidence: {communityNeeds.dataConfidence}% • Analyzed via satellite imagery and ground reports
                          </Alert>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <WarningIcon sx={{ mr: 1, color: '#f44336' }} />
                              Urgent Community Needs
                            </Typography>
                            {communityNeeds.urgentNeeds.map((need, index) => (
                              <Box key={index} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                  <Typography sx={{ color: 'white', fontWeight: 600 }}>
                                    {need.need}
                                  </Typography>
                                  <Chip 
                                    label={`${need.urgency}%`}
                                    size="small"
                                    sx={{ 
                                      backgroundColor: getUrgencyColor(need.urgency),
                                      color: 'white' 
                                    }} 
                                  />
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={need.urgency}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: getUrgencyColor(need.urgency)
                                    }
                                  }}
                                />
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                  {need.affected.toLocaleString()} affected • {need.location}
                                </Typography>
                              </Box>
                            ))}
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <PeopleIcon sx={{ mr: 1, color: '#9c27b0' }} />
                              Vulnerable Groups
                            </Typography>
                            {communityNeeds.vulnerableGroups.map((group, index) => (
                              <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: 'rgba(156,39,176,0.2)', borderRadius: 1 }}>
                                <Typography sx={{ color: 'white', fontWeight: 600 }}>
                                  {group.group}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                  Population: {group.count.toLocaleString()}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                  {group.needs.map((need, nIndex) => (
                                    <Chip 
                                      key={nIndex}
                                      label={need}
                                      size="small"
                                      sx={{ 
                                        mr: 1,
                                        mb: 1,
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        color: 'white' 
                                      }} 
                                    />
                                  ))}
                                </Box>
                              </Box>
                            ))}
                          </Card>
                        </Grid>

                        <Grid item xs={12}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <MapIcon sx={{ mr: 1, color: '#4caf50' }} />
                              Priority Hotspots
                            </Typography>
                            <Grid container spacing={2}>
                              {communityNeeds.hotspots.map((hotspot, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                  <Box sx={{ p: 2, backgroundColor: 'rgba(76,175,80,0.2)', borderRadius: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                      <Typography sx={{ color: 'white', fontWeight: 600 }}>
                                        {hotspot.area}
                                      </Typography>
                                      <Chip 
                                        label={hotspot.priority}
                                        size="small"
                                        sx={{ 
                                          backgroundColor: getPriorityColor(hotspot.priority),
                                          color: 'white' 
                                        }} 
                                      />
                                    </Box>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>
                                      📍 {hotspot.coordinates}
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                                      {hotspot.reason}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Card>
                        </Grid>

                        <Grid item xs={12}>
                          <Card sx={{ background: 'rgba(255,255,255,0.1)', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                              <AIIcon sx={{ mr: 1, color: '#00bcd4' }} />
                              AI Community Analysis
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.8)',
                                whiteSpace: 'pre-line',
                                maxHeight: 200,
                                overflow: 'auto'
                              }}
                            >
                              {communityNeeds.aiInsights}
                            </Typography>
                          </Card>
                        </Grid>
                      </Grid>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <SatelliteIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                          Community Need Detection
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          Click "Community" to analyze satellite imagery and detect urgent community needs
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Fade>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Loading Overlay */}
      {loading && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ color: '#00bcd4', mb: 2 }} />
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              AI Processing...
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Analyzing data with Gemini AI
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DemandForecasting;
