// components/Header.jsx
import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Nav from './Nav';

const Header = ({
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
    handleDrawerTransitionEnd
}) => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        component="img"
                        src="/logo3.png"
                        alt="Huevos Express Logo"
                        sx={{
                            height: 32,
                            width: 32,
                            marginRight: 1,
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: {
                                xs: '1rem',
                                sm: '1.25rem',
                            },
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginRight: 1,
                        }}
                    >
                        Huevos Express PR
                    </Typography>
                    <Box
                        component="img"
                        src="/pr_flag.png"
                        alt="Puerto Rican flag"
                        sx={{
                            height: 32,
                            width: 32,
                        }}
                    />
                </Box>

                {/* Hamburger Menu Button */}
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>

                {/* Drawer Component */}
                <Nav
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    handleDrawerClose={handleDrawerClose}
                    handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
