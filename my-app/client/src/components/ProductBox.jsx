import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Fade,
    Tooltip,
    IconButton
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const products = [
    {
        id: 1,
        imageUrl: 'carton30.jpg',
        title: 'Cartón de 30 huevos',
        description: 'Precios pueden variar diariamente',
        price: '$18'
    },
    {
        id: 2,
        imageUrl: '18x2.jpg',
        title: 'Paquete de 18 huevos',
        description: 'Precios pueden variar diariamente',
        price: '$13 (2 x $25)'
    },
    {
        id: 3,
        imageUrl: 'cartones.jpg',
        title: 'Descuento si compra en cantidades',
        description: 'Con entrega a pueblos limítrofes.'
    },
];

const ProductBox = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} justifyContent="center">
                {products.map((product, index) => (
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
                                image={product.imageUrl}
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
                                    {index === products.length - 1 && (
                                        <Tooltip
                                            title="Aplica a compras por caja o más. Contáctenos para más detalles."
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
                                    )}
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