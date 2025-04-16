import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Button
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import UserRating from '../components/UserRating'; // adjust path if needed

// Mock Reviews
const reviews = [
    {
        id: 1,
        user: {
            name: 'Ana Rodríguez',
            avatar: 'https://i.pravatar.cc/150?img=3',
        },
        rating: 5,
        comment: '¡Excelente servicio y entrega súper rápida!',
    },
    {
        id: 2,
        user: {
            name: 'Carlos Méndez',
            avatar: 'https://i.pravatar.cc/150?img=4',
        },
        rating: 4,
        comment: 'Huevos frescos y buena atención al cliente.',
    },
    {
        id: 3,
        user: {
            name: 'María Pérez',
            avatar: 'https://i.pravatar.cc/150?img=5',
        },
        rating: 5,
        comment: 'La mejor calidad, siempre frescos y deliciosos.',
    },
    {
        id: 4,
        user: {
            name: 'Luis Gómez',
            avatar: 'https://i.pravatar.cc/150?img=6',
        },
        rating: 4,
        comment: 'Buen precio y excelente servicio.',
    },
];

const products = [
    {
        id: 1,
        imageUrl: 'https://pavaotogo.com/wp-content/uploads/2020/05/Pavao-Meats-Groceries-30-Egg-Carton.jpg',
        title: 'Cartón de 30 huevos',
        description: 'Precios pueden variar diariamente',
        price: '$20'
    },
    {
        id: 2,
        imageUrl: 'https://www.farmtek.com/media/catalog/product/cache/f9d76ab52b9381a4c660f4521b58327f/1/1/117760b.jpg',
        title: 'Paquete de 18 huevos',
        description: 'Precios pueden variar diariamente',
        price: '$13 (2 x $25)'
    },
    {
        id: 3,
        imageUrl: 'https://pavaotogo.com/wp-content/uploads/2020/05/Pavao-Meats-Groceries-30-Egg-Carton.jpg',
        title: 'Descuento si compra en cantidades',
        description: 'Con entrega a pueblos limítrofes.'
    },
];

const Product = () => {
    const [qrOpen, setQrOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(0);

    const handlePrev = () => {
        setCurrentReview((prev) => Math.max(0, prev - 1)); // Disable going past the first review
    };

    const handleNext = () => {
        setCurrentReview((prev) => Math.min(reviews.length - 3, prev + 1)); // Disable going past the last set of reviews
    };

    const handleQrOpen = () => setQrOpen(true);
    const handleQrClose = () => setQrOpen(false);

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
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={12} justifyContent="center">
                    {products.map((product, index) => (
                        <Grid
                            item
                            key={product.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Card
                                sx={{
                                    width: 300,
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
                                            <Tooltip title="Aplica a compras por caja o más. Contáctenos para más detalles.">
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

            {/* QR Button */}
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant='h6'>Pague Aquí</Typography>
                <Button
                    onClick={handleQrOpen}
                    variant="contained"
                    sx={{
                        p: 0,
                        minWidth: 'unset',
                        width: 'fit-content',
                        height: 'fit-content',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                            backgroundColor: '#8B4513',
                        },
                        borderRadius: 1,
                    }}
                >
                    <Box
                        component="img"
                        src="/ath_movil.png"
                        alt="Pagar con ATH Móvil"
                        sx={{ width: 160, height: 'auto', display: 'block' }}
                    />
                </Button>
            </Box>

            {/* Review Carousel Section */}
            <Box sx={{ width: '100%', mt: 1 }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {/* Prev Button */}
                    <Grid item>
                        <IconButton onClick={handlePrev} color="primary" disabled={currentReview === 0}>
                            <ArrowBackIos />
                        </IconButton>
                    </Grid>

                    {/* Reviews */}
                    <Grid item container spacing={4} xs={12} sm={8} md={6} justifyContent="center">
                        {reviews.slice(currentReview, currentReview + 3).map((review, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <UserRating
                                    user={review.user}
                                    value={review.rating}
                                    comment={review.comment}
                                    readOnly
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Next Button */}
                    <Grid item>
                        <IconButton onClick={handleNext} color="primary" disabled={currentReview === reviews.length - 3}>
                            <ArrowForwardIos />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>

            {/* QR Dialog */}
            <Dialog open={qrOpen} onClose={handleQrClose}>
                <DialogTitle>Pague aquí con ATH Móvil</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 4,
                            flexWrap: 'wrap',
                            p: 2,
                        }}
                    >
                        <Box
                            component="img"
                            src="/qr2.png"
                            alt="Código QR de Luis"
                            sx={{ width: 160, height: 160 }}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Product;
