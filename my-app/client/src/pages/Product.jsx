import React, { useState, useEffect } from 'react';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    useMediaQuery,
    useTheme
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmbeddedReviews from '../components/EmbeddedReviews';
import BusinessHours from '../components/BusinessHours';
import OrderForm from '../components/OrderForm';
import GoogleMapsWidget from '../components/GoogleMapsWidget';

const products = [
    {
        id: 1,
        imageUrl: 'carton30.jpg',
        title: 'Cartón de 30 huevos',
        description: 'Precios pueden variar diariamente',
        price: '$20'
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

const Product = () => {
    const [qrOpen, setQrOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const handleQrOpen = () => setQrOpen(true);
    const handleQrClose = () => setQrOpen(false);
    const handleInfoOpen = () => setInfoOpen(true);
    const handleInfoClose = () => setInfoOpen(false);

    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={12} justifyContent="center">
                    {products.map((product, index) => (
                        <Grid
                            key={product.id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            sx={{ display: 'flex', justifyContent: 'center' }}
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
                                            isMobile ? (
                                                <>
                                                    <IconButton size="small" onClick={handleInfoOpen}>
                                                        <InfoOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                    <Dialog open={infoOpen} onClose={handleInfoClose}>
                                                        <DialogTitle>Información</DialogTitle>
                                                        <DialogContent>
                                                            Aplica a compras por caja o más. Contáctenos para más detalles.
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleInfoClose}>Cerrar</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </>
                                            ) : (
                                                <Tooltip
                                                    title="Aplica a compras por caja o más. Contáctenos para más detalles."
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
                                                </Tooltip>)
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

            {/* Order Form */}
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant='h6'>Ordenes por caja</Typography>
                <OrderForm />
            </Box>

            {/* Business Hours Section */}
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <BusinessHours />
            </Box>
            {/* Review Carousel Section */}
            <Box sx={{ mt: 1, width: '100%' }}>
                <EmbeddedReviews />
            </Box>

            <Box sx={{ mt: 1, width: '50%'}}>
                <GoogleMapsWidget />
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
