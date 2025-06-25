import React from 'react';
import { Drawer, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';

const navLinks = [
  { label: 'Historia', path: '/' },
  { label: 'Producto', path: '/product' },
  { label: 'Héroes', path: '/heroes' },
  { label: 'Administración', path: '/admin/products' },
];

const drawerWidth = 240;

const Nav = ({
  mobileOpen,
  handleDrawerToggle,
  handleDrawerClose,
  handleDrawerTransitionEnd
}) => {
  const theme = useTheme();
  return (
    <Drawer
      anchor='right'
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          backgroundColor: alpha(theme.palette.background.paper, 0.4),
          backdropFilter: 'blur(5px)', // optional: gives a frosted glass effect
            },
      }}
      slotProps={{
        root: {
          keepMounted: true,
        },
      }}
    >
      {navLinks.map((link) => (
        <MenuItem
          key={link.path}
          component={NavLink}
          to={link.path}
          onClick={handleDrawerToggle}
          sx={{
            '&.active': {
              fontWeight: 'bold',
              textDecoration: 'underline',
            },
            color: 'black',
            fontFamily: 'Roboto, Arial, sans-serif'
          }}
        >
          {link.label}
        </MenuItem>
      ))}
    </Drawer>
  );
};

export default Nav;
