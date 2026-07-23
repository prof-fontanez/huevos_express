import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Divider,
    Button,
    Avatar,
    CircularProgress,
    Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { API_BASE_URL } from '../config';

const IVU_RATE = 0.115;

const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\$?([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
};

const CheckoutDialog = ({ open, onClose, product }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!product) return null;

    const price = parsePrice(product.price);
    const ivu = price * IVU_RATE;
    const total = price + ivu;

    const handlePay = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/payments/create-checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    productTitle: product.title,
                    price: product.price,
                }),
            });

            const data = await res.json();

            if (data.hostedCheckoutUrl) {
                window.location.href = data.hostedCheckoutUrl;
            } else {
                setError('No se pudo iniciar el pago. Intente de nuevo.');
            }
        } catch (err) {
            setError('Error de conexión. Intente de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <ShoppingCartIcon />
                Resumen de Orden
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                {/* Product info */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                    {product.image_url && (
                        <Avatar
                            src={product.image_url}
                            alt={product.title}
                            variant="rounded"
                            sx={{ width: 80, height: 80, objectFit: 'contain' }}
                        />
                    )}
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Price breakdown */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1">Precio</Typography>
                        <Typography variant="body1">${price.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            IVU (11.5%)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ${ivu.toFixed(2)}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" fontWeight="bold">Total</Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            ${total.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handlePay}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Completar Pago'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CheckoutDialog;