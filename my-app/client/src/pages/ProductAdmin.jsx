import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material';
import { API_BASE_URL } from '../config';
import ProductSelector from '../components/ProductSelector';
import ProductForm from '../components/ProductForm';
import ProductFormActions from '../components/ProductFormActions';

const ProductAdmin = () => {
    const { auth } = useAuth();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedId, setSelectedId] = useState('new');
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        image_url: '',
        has_tooltip: false,
        tooltip_msg: '',
    });

    const getAuthHeaders = useCallback(() => ({
        'Content-Type': 'application/json',
        ...(auth?.token && { Authorization: `Bearer ${auth.token}` }),
    }), [auth?.token]);

    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/products`, {
                headers: getAuthHeaders(),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error('Error loading products:', err);
            alert('Failed to load products.');
        } finally {
            setLoading(false);
        }
    }, [getAuthHeaders]);

    useEffect(() => {
        if (auth?.token) {
            fetchProducts();
        }
    }, [auth?.token, fetchProducts]);

    useEffect(() => {
        if (selectedId === 'new') {
            setForm({ title: '', description: '', price: '', image_url: '', has_tooltip: false, tooltip_msg: '' });
        } else {
            const prod = products.find((p) => p.id === selectedId);
            if (prod) {
                setForm({
                    title: prod.title || '',
                    description: prod.description || '',
                    price: prod.price || '',
                    image_url: prod.image_url || '',
                    has_tooltip: prod.has_tooltip || false,
                    tooltip_msg: prod.tooltip_msg || '',
                });
            }
        }
    }, [selectedId, products]);

    const handleInputChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        const payload = {
            title: form.title,
            description: form.description,
            price: form.price,
            image_url: form.image_url,
            has_tooltip: form.has_tooltip,
            tooltip_msg: form.tooltip_msg,
        };

        try {
            const url = selectedId === 'new'
                ? `${API_BASE_URL}/api/products`
                : `${API_BASE_URL}/api/products/${selectedId}`;
            const method = selectedId === 'new' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.success) {
                alert(selectedId === 'new' ? 'Product created!' : 'Product updated!');
                await fetchProducts();
                setSelectedId('new');
                setForm({ title: '', description: '', price: '', image_url: '', has_tooltip: false, tooltip_msg: '' });
            } else {
                alert('Save failed.');
            }
        } catch (err) {
            console.error('Save error:', err);
            alert('Save error occurred.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (selectedId === 'new') return;
        const confirmDelete = window.confirm('Delete this product?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/products/${selectedId}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });
            const result = await res.json();
            if (result.success) {
                alert('Product deleted!');
                await fetchProducts();
                setSelectedId('new');
                setForm({ title: '', description: '', price: '', image_url: '', has_tooltip: false, tooltip_msg: '' });
            } else {
                alert('Delete failed.');
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('Delete error occurred.');
        }
    };

    if (!auth) return null;
    if (!auth?.token || !auth?.isAdmin) {
        return (
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    ACCESS DENIED: THIS PAGE IS FOR ADMIN USERS ONLY
                </Typography>
            </Grid>
        );
    }

    if (loading) return <CircularProgress />;

    return (
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Product Administration
                        </Typography>

                        <ProductSelector
                            products={products}
                            selectedId={selectedId}
                            onChange={setSelectedId}
                        />

                        <ProductForm
                            form={form}
                            onChange={handleInputChange}
                        />

                        <ProductFormActions
                            selectedId={selectedId}
                            saving={saving}
                            onSave={handleSave}
                            onDelete={handleDelete}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ProductAdmin;