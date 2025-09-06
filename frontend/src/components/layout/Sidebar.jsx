import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

const drawerWidth = 240;

const Sidebar = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const mainMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Hospital Resource Optimizer', icon: <LocalHospitalIcon />, path: '/hospital-optimizer' },
    { text: 'Disaster Relief Optimizer', icon: <VolunteerActivismIcon />, path: '/disaster-relief' },
    { text: 'Hunger & Waste Optimizer', icon: <RestaurantIcon />, path: '/hunger-waste' },
    { text: 'Smart Shelter Allocation', icon: <HomeIcon />, path: '/shelter-allocation' },
  ];
  
  const secondaryMenuItems = [
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Help & Support', icon: <HelpIcon />, path: '/help' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const drawer = (
    <>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
      }}>
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          minHeight: 64,
        }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            AllocAI Hub
          </Typography>
        </Box>
        
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    borderRight: `3px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.18)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
                  minWidth: 40 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: location.pathname === item.path ? 'medium' : 'normal',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider />
        
        <List>
          {secondaryMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
                  minWidth: 40 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: location.pathname === item.path ? 'medium' : 'normal',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            OptiRoute v1.0.0
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        /* Desktop drawer */
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;