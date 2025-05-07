import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box
} from '@mui/material';
import EmbeddedReviews from '../components/EmbeddedReviews';
import BusinessHours from '../components/BusinessHours';
import OrderForm from '../components/OrderForm';
import GoogleMapsWidget from '../components/GoogleMapsWidget';
import ProductBox from '../components/ProductBox';
import ProductQrPayment from '../components/ProductQrPayment';

const Product = () => {
    const [, setBusinessHours] = useState([]);

    useEffect(() => {
        fetch('/business')
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched business hours:', data);
                setBusinessHours(data);
            })
            .catch((error) => console.error('Error fetching business hours:', error));
    }, []);

    return (
        <Box
            sx={{
                minHeight: 'calc(78vh - 126px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                px: { xs: 2, md: 4 },
                py: 4,
                gap: 6,
            }}
        >
            {/* Product Grid Section */}
            <ProductBox />

            {/* Order Form */}
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="h6">Órdenes de entrega</Typography>
                <OrderForm />
            </Box>

            {/* QR Payment Section */}
            <Typography variant="h6" sx={{ textAlign: 'center' }}>Pague Aquí</Typography>
            <ProductQrPayment />

            {/* Business Hours Section */}
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <BusinessHours />
            </Box>

            {/* Google Maps Section */}
            <Box sx={{ mt: 1, width: { xs: '100%', md: '50%' } }}>
                <GoogleMapsWidget />
            </Box>

            {/* Review Carousel Section */}
            <Box sx={{ mt: 1, width: '100%' }}>
                <EmbeddedReviews />
            </Box>
        </Box>
    );
};

export default Product;