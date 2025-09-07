import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box, IconButton, Tooltip, alpha } from '@mui/material';
import { InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Animation keyframes
const shimmerAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const DashboardCard = ({ 
  title, 
  subtitle, 
  children, 
  icon, 
  tooltipText,
  headerAction,
  gradient,
  animation,
  sx = {}
}) => {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3,
        background: gradient || 'rgba(39, 62, 107, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(25, 118, 210, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '280px', // Uniform height
        animation: animation ? `${animation} 2s ease-in-out infinite` : 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(25, 118, 210, 0.1) 50%, transparent 70%)',
          backgroundSize: '200px 100%',
          animation: `${shimmerAnimation} 3s infinite`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 60px rgba(25, 118, 210, 0.2)',
          borderColor: 'rgba(25, 118, 210, 0.4)',
          '&::before': {
            opacity: 1,
          },
        },
        ...sx
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            {icon && (
              <Box sx={{ 
                mr: 2, 
                display: 'flex', 
                alignItems: 'center',
                p: 1,
                borderRadius: 2,
                background: 'rgba(25, 118, 210, 0.1)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.2)',
                  transform: 'scale(1.1)',
                }
              }}>
                {icon}
              </Box>
            )}
            <Typography 
              variant="h6" 
              component="div"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {title}
            </Typography>
            {tooltipText && (
              <Tooltip title={tooltipText} arrow placement="top">
                <IconButton 
                  size="small" 
                  sx={{ 
                    ml: 1,
                    color: 'rgba(25, 118, 210, 0.7)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#1976d2',
                      transform: 'scale(1.2)',
                    }
                  }}
                >
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
        subheader={subtitle && (
          <Typography 
            variant="body2" 
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              mt: 0.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
        action={headerAction}
        sx={{ 
          pb: 0,
          position: 'relative',
          zIndex: 1,
          '& .MuiCardHeader-action': { m: 0 }
        }}
      />
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          pt: 2,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </CardContent>
      
      {/* Animated border effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 3,
          padding: '1px',
          background: 'linear-gradient(45deg, #1976d2, #42a5f5, #1976d2)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 3s ease infinite',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '1px',
            left: '1px',
            right: '1px',
            bottom: '1px',
            background: 'inherit',
            borderRadius: 'inherit',
            zIndex: -1,
          }
        }}
      />
    </Card>
  );
};

export default DashboardCard;