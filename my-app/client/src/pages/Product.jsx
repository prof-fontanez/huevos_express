import {
    Alert,
    Typography,
    Box
} from '@mui/material';
import EmbeddedReviews from '../components/EmbeddedReviews';
import BusinessHours from '../components/BusinessHours';
import OrderForm from '../components/OrderForm';
import GoogleMapsWidget from '../components/GoogleMapsWidget';
import ProductBox from '../components/ProductBox';
import ProductQrPayment from '../components/ProductQrPayment';
import { useBusiness } from '../context/BusinessContext';

const Product = () => {
    const { error } = useBusiness();

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
            <ProductBox />

            {/* Order Form */}
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="h6">Órdenes de entrega</Typography>
                <OrderForm />
            </Box>

            {/* QR Payment Section */}
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>Pague Aquí</Typography>
                <ProductQrPayment />
            </Box>

            {/* Business section - show once if error, otherwise show all */}
            {error ? (
                <Alert severity="warning" sx={{ width: { xs: '100%', sm: '60%' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ alignSelf: 'stretch', width: '100%' }}>
                        La información del negocio no está disponible en este momento.
                    </Typography>
                </Alert>
            ) : (
                <>
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <BusinessHours />
                    </Box>
                    <Box sx={{ mt: 1, width: { xs: '100%', md: '50%' } }}>
                        <GoogleMapsWidget />
                    </Box>
                    <Box sx={{ mt: 1, width: '100%' }}>
                        <EmbeddedReviews />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Product;
