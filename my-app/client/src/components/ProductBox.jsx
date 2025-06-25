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
    Alert,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// ✅ Mock fallback products
const fallbackProducts = [
    {
        id: 'mock1',
        title: 'Cartón de 30 huevos',
        description: 'Precios pueden variar diariamente',
        price: '$18',
        image_url: 'carton30.jpg',
        has_tooltip: false,
        tooltip_msg: '',
        isMock: true,
    },
    {
        id: 'mock2',
        title: 'Paquete de 18 huevos',
        description: 'Precios pueden variar diariamente',
        price: '$13 (2 x $25)',
        image_url: '18x2.jpg',
        has_tooltip: false,
        tooltip_msg: '',
        isMock: true,
    },
    {
        id: 'mock3',
        title: 'Descuento si compra en cantidades',
        description: 'Con entrega a pueblos limítrofes.',
        price: '',
        image_url: 'cartones.jpg',
        has_tooltip: true,
        tooltip_msg: 'Aplica a compras tres platos o más. Contáctenos para más detalles.',
        isMock: true,
    },
];

const ProductBox = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (!res.ok) {
                throw new Error(`Status ${res.status}`);
            }
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products, using fallback data:', err.message);
            setProducts(fallbackProducts);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();

        const interval = setInterval(fetchProducts, 10000); // Poll every 10 seconds
        return () => clearInterval(interval);
    }, []);

    const isFallback = products.length && products[0]?.isMock === true;

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            {isFallback && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    Lista de productos alterna debido a problemas con la base de datos. Verifíque precios.
                </Alert>
            )}
            <Grid container spacing={2} justifyContent="center">
                {Array.isArray(products) &&
                    products.map((product) => (
                        <Grid
                            key={product.id}
                            item xs={12} sm={6} md={4} lg={3}
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
                                        {product.has_tooltip && product.tooltip_msg ? (
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
