import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../components/AuthContext';
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
            setForm({ title: '', description: '', price: '', image_url: '' });
        } else {
            const prod = products.find((p) => p.id === selectedId);
            if (prod) {
                setForm({
                    title: prod.title || '',
                    description: prod.description || '',
                    price: prod.price || '',
                    image_url: prod.image_url || '',
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
                setForm({ title: '', description: '', price: '', image_url: '' });
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
                setForm({ title: '', description: '', price: '', image_url: '' });
            } else {
                alert('Delete failed.');
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('Delete error occurred.');
        }
    };

    if (!auth) return null; // wait for auth context
    if (!auth.token || !auth.is_admin) {
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

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="product-select-label">Select Product</InputLabel>
                            <Select
                                labelId="product-select-label"
                                value={selectedId}
                                onChange={(e) => setSelectedId(e.target.value)}
                            >
                                <MenuItem value="new">
                                    <em>-- New Product --</em>
                                </MenuItem>
                                {products.map((product) => (
                                    <MenuItem key={product.id} value={product.id}>
                                        {`ID ${product.id} - ${product.title}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Title"
                            fullWidth
                            margin="normal"
                            value={form.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            value={form.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                        <TextField
                            label="Price"
                            fullWidth
                            margin="normal"
                            value={form.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                        />
                        <TextField
                            label="Image URL"
                            fullWidth
                            margin="normal"
                            value={form.image_url}
                            onChange={(e) => handleInputChange('image_url', e.target.value)}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSave}
                            disabled={saving}
                            sx={{ mt: 2 }}
                        >
                            {saving ? 'Saving...' : selectedId === 'new' ? 'Create Product' : 'Save Changes'}
                        </Button>

                        {selectedId !== 'new' && (
                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={handleDelete}
                                sx={{ mt: 1 }}
                            >
                                Delete Product
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ProductAdmin;
