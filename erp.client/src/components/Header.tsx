import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Field System
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Main</Button>
          <Button color="inherit" component={RouterLink} to="/analytics">Analytics</Button>
          <Button color="inherit" component={RouterLink} to="/field">Field</Button>
          <Button color="inherit" component={RouterLink} to="/harvest">Harvest</Button>
          <Button color="inherit" component={RouterLink} to="/plant">Plant</Button>
          <Button color="inherit" component={RouterLink} to="/plot">Plot</Button>
          <Button color="inherit" component={RouterLink} to="/pot">Pot</Button>
          <Button color="inherit" component={RouterLink} to="/soiltype">Soil Type</Button>
          <Button color="inherit" component={RouterLink} to="/watering">Watering</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
