// components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Nav from './Nav';

const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        component="img"
                        src="/logo2.png"
                        alt="Huevos Express Logo"
                        sx={{ height: 60, width: 60 }}
                    />
                    <Typography variant="h6" noWrap>
                        Huevos Express PR
                    </Typography>
                    <Box
                        component="img"
                        src="/pr_flag.png"
                        alt="Puerto Rican flag"
                        sx={{ height: 32, width: 32 }}
                    />
                </Box>
                <Box>
                    <Nav />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
