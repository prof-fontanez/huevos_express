import React from 'react';
import { Box } from '@mui/material';
import SocialMedia from './SocialMedia';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                textAlign: 'center',
                py: 3,
                mt: 2,
            }}
        >
            <SocialMedia/>
        </Box>
    );
};

export default Footer;