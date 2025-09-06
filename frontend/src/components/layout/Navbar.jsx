import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
  Chip,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          OptiRoute
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="subtitle2" sx={{ mr: 2, color: 'text.secondary' }}>
              Unified Resource Allocation Platform
            </Typography>
            {user && (
              <Chip
                label={user.roleName}
                size="small"
                sx={{
                  backgroundColor: 'rgba(25, 118, 210, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(25, 118, 210, 0.3)',
                  fontWeight: 500
                }}
              />
            )}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Help">
            <IconButton color="inherit" size="large">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              size="large"
              onClick={handleNotificationMenu}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          
          <Menu
            id="notification-menu"
            anchorEl={notificationAnchorEl}
            keepMounted
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
          >
            <MenuItem onClick={handleNotificationClose}>No new notifications</MenuItem>
          </Menu>
          
          <Tooltip title="Settings">
            <IconButton color="inherit" size="large">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Account">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: '#273e6b',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 2,
                mt: 1
              }
            }}
          >
            {user && (
              <>
                <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {user.email}
                  </Typography>
                  <Chip
                    label={user.roleName}
                    size="small"
                    sx={{
                      mt: 1,
                      backgroundColor: 'rgba(25, 118, 210, 0.2)',
                      color: 'white',
                      border: '1px solid rgba(25, 118, 210, 0.3)',
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              </>
            )}
            <MenuItem onClick={handleClose} sx={{ color: 'white' }}>Profile</MenuItem>
            <MenuItem onClick={handleClose} sx={{ color: 'white' }}>My Account</MenuItem>
            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            <MenuItem onClick={handleLogout} sx={{ color: '#f44336' }}>
              <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;