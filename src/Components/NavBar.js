import React from "react";
import { Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ShoppingCart } from "phosphor-react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { auth } = useSelector((state) => state);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Palestra Attire
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button>
              <NavLink to="/login" style={{ color: "white" }}>
                Login/Signup
              </NavLink>
            </Button>
            {auth.isAdmin === true ? (
              <Button>
                <NavLink to="/admin" style={{ color: "white" }}>
                  Admin Page
                </NavLink>
              </Button>
            ) : null}
            <Button>
              <NavLink to="/" style={{ color: "white" }}>
                Home
              </NavLink>
            </Button>
            <Button>
              <NavLink to="/products" style={{ color: "white" }}>
                Products
              </NavLink>
            </Button>
            <Button>
              <NavLink to="/cart" style={{ color: "white" }}>
                <ShoppingCart size="28" />
              </NavLink>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
