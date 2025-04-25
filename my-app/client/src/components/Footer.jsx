import React from 'react';
import { Box } from '@mui/material';
import SocialMedia from './SocialMedia';
import WebmasterInfo from './WebmasterInfo';
import CommercialLicense from './CommercialLicense';

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
            <CommercialLicense />
            <WebmasterInfo />
        </Box>
    );
};

export default Footer;