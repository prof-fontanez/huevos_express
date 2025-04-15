import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

// Sample product data for demonstration
const products = [
    {
        id: 1,
        imageUrl: 'https://pavaotogo.com/wp-content/uploads/2020/05/Pavao-Meats-Groceries-30-Egg-Carton.jpg',
        title: 'Cartón de 30 huevos',
        price: '$20.00'
    },
    {
        id: 2,
        imageUrl: 'https://www.farmtek.com/media/catalog/product/cache/f9d76ab52b9381a4c660f4521b58327f/1/1/117760b.jpg',
        title: 'Paquete de 18 huevos',
        price: '$30.00'
    },
    {
        id: 3,
        imageUrl: 'https://pavaotogo.com/wp-content/uploads/2020/05/Pavao-Meats-Groceries-30-Egg-Carton.jpg',
        title: 'Descuento si compra en cantidades',
        price: '$40.00'
    },
    // Add more products as needed
];

const Gallery = () => {
    return (
        <Grid container spacing={2} sx={{ padding: 2, justifyContent: 'center' }}>
            {products.map((product) => (
                <Grid
                    item
                    xs={12} sm={6} md={4} lg={3}
                    key={product.id}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                    }}
                >
                    <Card
                        sx={{
                            width: 300,
                            height: 400,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: 3,
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.imageUrl}
                            alt={product.title}
                        />
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                textAlign: 'center',
                            }}
                        >
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
                                <Typography variant="h6">
                                    {product.title}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 1 }}
                            >
                                {product.price}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Gallery;