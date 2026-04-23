import React, { useEffect, useState, useCallback } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Fade,
    Tooltip,
    IconButton,
    CircularProgress,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://huevos-express.onrender.com';

const mockProducts = [
    {
        id: 'mock-1',
        title: 'Producto A (Mock)',
        description: 'Descripción simulada A',
        price: '$4.99',
        image_url: 'https://www.pexels.com/photo/white-and-brown-eggs-in-close-up-photography-7965917/',
        has_tooltip: true,
        tooltip_msg: 'Este es un producto simulado.',
    },
    {
        id: 'mock-2',
        title: 'Producto B (Mock)',
        description: 'Descripción simulada B',
        price: '$5.99',
        image_url: 'https://www.pexels.com/photo/white-and-brown-eggs-in-close-up-photography-7965917/',
        has_tooltip: false,
        tooltip_msg: '',
    },
    {
        id: 'mock-3',
        title: 'Producto C (Mock)',
        description: 'Descripción simulada C',
        price: '$6.99',
        image_url: 'https://www.pexels.com/photo/white-and-brown-eggs-in-close-up-photography-7965917/',
        has_tooltip: true,
        tooltip_msg: 'Simulación de tooltip para el producto.',
    },
];

const CAROUSEL_DURATION = 5000;

const ProductBox = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const visibleCount = isMd ? 3 : isSm ? 2 : 1;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [visible, setVisible] = useState(true);

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
        const interval = setInterval(fetchProducts, 10000);
        return () => clearInterval(interval);
    }, []);

    const maxIndex = Math.max(0, products.length - visibleCount);

    const goTo = useCallback((index) => {
        setVisible(false);
        setTimeout(() => {
            setCurrentIndex(index);
            setVisible(true);
        }, 300);
    }, []);

    const handlePrev = () => {
        goTo(currentIndex === 0 ? maxIndex : currentIndex - 1);
    };

    const handleNext = useCallback(() => {
        goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, [currentIndex, maxIndex, goTo]);

    useEffect(() => {
        if (paused || products.length === 0 || products.length <= visibleCount) return;
        const interval = setInterval(handleNext, CAROUSEL_DURATION);
        return () => clearInterval(interval);
    }, [paused, handleNext, products.length, visibleCount]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    const visibleProducts = products.slice(currentIndex, currentIndex + visibleCount);

    return (
        <Box sx={{ width: '100%' }}>

            {/* Carousel controls - only show if there are more products than visible */}
            {products.length > visibleCount && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <IconButton onClick={handlePrev}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton onClick={() => setPaused((p) => !p)}>
                        {paused ? <PlayArrowIcon /> : <PauseIcon />}
                    </IconButton>
                    <IconButton onClick={handleNext}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            )}

            {/* Slide indicator - only show if there are more products than visible */}
            {products.length > visibleCount && (
                <Typography variant="body2" sx={{ textAlign: 'center', mb: 2, color: 'text.secondary' }}>
                    {currentIndex + 1} – {Math.min(currentIndex + visibleCount, products.length)} / {products.length}
                </Typography>
            )}

            {/* Cards */}
            <Box
                sx={{
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 300ms ease-in-out',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                {visibleProducts.map((product) => (
                    <Card
                        key={product.id}
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
                                <Typography variant="h6" color="primary" sx={{ mt: 'auto' }}>
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
                ))}
            </Box>
        </Box>
    );
};

export default ProductBox;