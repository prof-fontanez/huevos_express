import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Fade,
    Tooltip,
    IconButton,
    CircularProgress,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://huevos-express.onrender.com';

// Hard-coded fallback products
const mockProducts = [
    {
        id: 'mock-1',
        title: 'Producto A (Mock)',
        description: 'Descripción simulada A',
        price: '$4.99',
        image_url: 'https://via.placeholder.com/150',
        has_tooltip: true,
        tooltip_msg: 'Este es un producto simulado.',
    },
    {
        id: 'mock-2',
        title: 'Producto B (Mock)',
        description: 'Descripción simulada B',
        price: '$5.99',
        image_url: 'https://via.placeholder.com/150',
        has_tooltip: false,
        tooltip_msg: '',
    },
    {
        id: 'mock-3',
        title: 'Producto C (Mock)',
        description: 'Descripción simulada C',
        price: '$6.99',
        image_url: 'https://via.placeholder.com/150',
        has_tooltip: true,
        tooltip_msg: 'Simulación de tooltip para el producto.',
    },
];

const ProductBox = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/products`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products, using fallback:', err.message);
            setProducts(mockProducts);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();

        const interval = setInterval(fetchProducts, 10000); // Poll every 10 seconds
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} justifyContent="center">
                {products.map((product) => (
                    <Grid
                        key={product.id}
                        item={{xs: 12, sm: 6, md: 4, lg: 3}} 
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Card
                            sx={{
                                width: { xs: 280, sm: 300 },
                                height: 300,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: 3,
                                p: 2,
                                textAlign: 'center',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={product.image_url}
                                alt={product.title}
                                sx={{
                                    maxHeight: 160,
                                    width: 'auto',
                                    objectFit: 'contain',
                                    mb: 2,
                                }}
                            />
                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    width: '100%',
                                    p: 0,
                                }}
                            >
                                <Typography variant="h6">{product.title}</Typography>
                                {product.price && (
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        sx={{ mt: 'auto' }}
                                    >
                                        {product.price}
                                    </Typography>
                                )}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    {(product.has_tooltip && product.tooltip_msg) ? (
                                        <Tooltip
                                            title={product.tooltip_msg}
                                            enterTouchDelay={0}
                                            leaveTouchDelay={3000}
                                            disableInteractive
                                            slots={{ transition: Fade }}
                                            slotProps={{
                                                transition: { timeout: 300 },
                                                popper: {
                                                    modifiers: [
                                                        { name: 'preventOverflow', options: { boundary: 'viewport' } },
                                                        { name: 'offset', options: { offset: [0, 8] } },
                                                        { name: 'flip', options: { enabled: true } },
                                                    ],
                                                },
                                            }}
                                        >
                                            <IconButton size="small">
                                                <InfoOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    ) : null}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductBox;
