import React from 'react';
import { Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        component={NavLink}
        to="/"
        sx={({ isActive }) => ({
          color: 'inherit',
          borderBottom: isActive ? '2px solid #FFF' : 'none',
        })}
      >
        Home
      </Button>
      <Button
        component={NavLink}
        to="/gallery"
        sx={({ isActive }) => ({
          color: 'inherit',
          borderBottom: isActive ? '2px solid #FFF' : 'none',
        })}
      >
        Gallery
      </Button>
    </Stack>
  );
};

export default Nav;
