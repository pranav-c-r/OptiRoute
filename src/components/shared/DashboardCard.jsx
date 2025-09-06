import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box, IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const DashboardCard = ({ 
  title, 
  subtitle, 
  children, 
  icon, 
  tooltipText,
  headerAction,
  sx = {}
}) => {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        ...sx
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon && (
              <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                {icon}
              </Box>
            )}
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            {tooltipText && (
              <Tooltip title={tooltipText} arrow placement="top">
                <IconButton size="small" sx={{ ml: 0.5 }}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
        subheader={subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        action={headerAction}
        sx={{ 
          pb: 0,
          '& .MuiCardHeader-action': { m: 0 }
        }}
      />
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;