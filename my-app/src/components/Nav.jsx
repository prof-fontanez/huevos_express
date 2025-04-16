import React from 'react';
import { Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2 }}
      sx={{
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Button
        component={NavLink}
        to="/"
        sx={({ isActive }) => ({
          color: 'inherit',
          borderBottom: isActive ? '2px solid #FFF' : 'none',
          width: { xs: '100%', sm: 'auto' },
          textAlign: 'center',
        })}
      >
        Mi historia
      </Button>
      <Button
        component={NavLink}
        to="/product"
        sx={({ isActive }) => ({
          color: 'inherit',
          borderBottom: isActive ? '2px solid #FFF' : 'none',
          width: { xs: '100%', sm: 'auto' },
          textAlign: 'center',
        })}
      >
        Producto
      </Button>
    </Stack>
  );
};

export default Nav;
