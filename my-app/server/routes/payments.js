import express from 'express';
import axios from 'axios';

const router = express.Router();

const IVU_RATE = 0.115;

router.post('/create-checkout', async (req, res) => {
    const { productId, productTitle, price } = req.body;

    if (!productId || !productTitle || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    const ivu = numericPrice * IVU_RATE;
    const total = (numericPrice + ivu).toFixed(2);

    try {
        const response = await axios.post(
            'https://api.sumup.com/v0.1/checkouts',
            {
                checkout_reference: `order-${productId}-${Date.now()}`,
                amount: parseFloat(total),
                currency: 'USD',
                description: productTitle,
                hosted_checkout: {
                    enabled: true,
                },
                redirect_url: `${process.env.CLIENT_URL}/product?payment=success`,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json({
            checkoutId: response.data.id,
            hostedCheckoutUrl: response.data.hosted_checkout_url,
        });

    } catch (error) {
        console.error('SumUp checkout error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create checkout' });
    }
});

export default router;