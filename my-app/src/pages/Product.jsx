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
import EmbeddedReviews from '../components/EmbeddedReviews';

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
                            key={product.id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            sx={{ display: 'flex', justifyContent: 'center' }}                        >
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
            <Box sx={{ mt: 4, width: '100%' }}>
                <EmbeddedReviews />
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
