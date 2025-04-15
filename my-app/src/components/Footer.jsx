import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                textAlign: 'center',
                py: 3,
                mt: 5,
            }}
        >
            <Typography variant="body1">
                Web designer: Hector Fontanez
            </Typography>
            <Typography variant="body1">
                Contact info:{' '}
                <a
                    href="mailto:hector.fontanez@sbcglobal.net"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                    hector.fontanez@sbcglobal.net
                </a>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
                &copy; 2025 All rights reserved
            </Typography>
        </Box>
    );
};

export default Footer;