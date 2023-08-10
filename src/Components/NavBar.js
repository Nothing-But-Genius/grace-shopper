import React from 'react';
import { Stack } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Acme Shopping
          </Typography>
          <Stack
            direction="row"
            spacing={2}
          >
            <Button>
              <NavLink
                to="/login"
                style={{ color: 'white' }}
              >
                Login/Signup
              </NavLink>
            </Button>
            <Button>
              <NavLink
                to="/"
                style={{ color: 'white' }}
              >
                Home
              </NavLink>
            </Button>
            <Button>
              <NavLink
                to="/products"
                style={{ color: 'white' }}
              >
                Products
              </NavLink>
            </Button>
            <Button>
              <NavLink
                to="/cart"
                style={{ color: 'white' }}
              >
                Cart
              </NavLink>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
