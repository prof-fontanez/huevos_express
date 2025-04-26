import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Historia', path: '/' },
  { label: 'Producto', path: '/product' },
  { label: 'Héroes', path: '/heroes'},
  // Add more links as needed
];

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>

      {/* Floating Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {navLinks.map((link) => (
          <MenuItem
            key={link.path}
            component={NavLink}
            to={link.path}
            onClick={handleClose}
            sx={{
              '&.active': {
                fontWeight: 'bold',
                textDecoration: 'underline',
                color: 'text.primary',
              },
              color: 'text.secondary',
              fontFamily: 'Roboto, Arial, sans-serif'
            }}
          >
              {link.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Nav;