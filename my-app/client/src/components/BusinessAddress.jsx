import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';

const BusinessAddress = () => {

    const [businessName, setBusinessName] = useState('');
    const [formattedAddress, setFormattedAddress] = useState('');
    const [error, setError] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetch(`${API_BASE_URL}/business`)
            .then((response) => response.json())
            .then((data) => {
                if (data.businessAddress) {
                    setFormattedAddress(data.businessAddress);
                    setBusinessName(data.businessName);
                } else {
                    setError('Business address not available');
                }
            })
            .catch((error) => {
                console.error('Error fetching business address:', error);
                setError('Failed to fetch business address');
            });
    }, [API_BASE_URL]);

    return (
        <Box sx={{ mb: 4 }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems="center"
                justifyContent="center"
            >
                <Stack alignItems="center">
                    <Typography variant="body2" fontWeight={'bold'}>{businessName}</Typography>
                    {formattedAddress && (() => {
                        const parts = formattedAddress.split(', ');
                        if (parts.length < 4) return <Typography variant="body2">{formattedAddress}</Typography>;

                        const townAndZip = parts[2]; // "Toa Baja 00949"
                        const lastPart = parts[3];   // "Puerto Rico"

                        // Use regex or split intelligently
                        const zipMatch = townAndZip.match(/(.+)\s(\d{5})/);
                        const town = zipMatch?.[1] || '';
                        const zip = zipMatch?.[2] || '';

                        return (
                            <>
                                <Typography variant="body2">
                                    {parts[0]}, {parts[1]}
                                </Typography>
                                <Typography variant="body2">
                                    {town}, {lastPart} {zip}
                                </Typography>
                            </>
                        );
                    })()}
                </Stack>
            </Stack>
        </Box>
    );
}

export default BusinessAddress;