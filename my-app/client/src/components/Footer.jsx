import React from 'react';
import { Box, Typography } from '@mui/material';
import SocialMedia from './SocialMedia';
import WebmasterInfo from './WebmasterInfo';
import CommercialLicense from './CommercialLicense';
import BusinessAddress from './BusinessAddress';
import dayjs from 'dayjs';

const Footer = () => {
    const currentYear = new Date().getFullYear();

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
            <BusinessAddress />
            <SocialMedia />
            <CommercialLicense />
            <WebmasterInfo />
            <Typography variant="body2" align="center" sx={{ p: 2, textAlign: 'center' }}>
                © 2025 - {currentYear} Huevos Express PR. Derechos Reservados.
            </Typography>
            <Typography variant="caption" textAlign="center" >
                Última actualización: {dayjs().format('D [de] MMMM [de] YYYY[,] h:mm A')}
            </Typography>

        </Box>
    );
};

export default Footer;