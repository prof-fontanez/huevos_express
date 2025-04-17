// components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Nav from './Nav';

const Header = () => {
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
                            // display: { xs: 'none', sm: 'block' },
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
                            // display: { xs: 'none', sm: 'block' },
                        }}
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
