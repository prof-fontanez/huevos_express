// components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Nav from "./Nav"

const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    Huevos Express PR
                </Typography>
                <Box>
                    <Nav />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
