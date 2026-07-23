import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from '@mui/material';
import { API_BASE_URL } from '../config';

const ProductPayment = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/products/products-with-price`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Failed to fetch products:', err))
            .finally(() => setLoading(false));
    }, []);

    const handlePayment = () => {
        // Placeholder — SumUp integration will go here
        alert(`Procesando pago para: ${selectedProduct.title} - ${selectedProduct.price}`);
    };

    if (loading) return <CircularProgress size={24} />;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: { xs: '100%', sm: '60%', md: '40%' },
            }}
        >
            <FormControl fullWidth>
                <InputLabel id="product-payment-label">Seleccione un producto</InputLabel>
                <Select
                    labelId="product-payment-label"
                    value={selectedProduct}
                    label="Seleccione un producto"
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    sx={{ minWidth: 250 }}
                >
                    {products.map((product) => (
                        <MenuItem key={product.id} value={product}>
                            {product.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                fullWidth
                disabled={!selectedProduct}
                onClick={handlePayment}
            >
                Pagar
            </Button>
        </Box>
    );
};

export default ProductPayment;