import React, { useEffect, useState } from 'react';
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

const ProductAdmin = () => {
    const { auth } = useAuth();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedId, setSelectedId] = useState("new");
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        image_url: '',
    });

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    // When selectedId changes, update form
    useEffect(() => {
        if (selectedId === 'new') {
            // Clear form for new product
            setForm({ title: '', description: '', price: '', image_url: '' });
        } else {
            // Find selected product
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

    // Save (Update or Create)
    const handleSave = async () => {
        setSaving(true);

        const payload = {
            title: form.title,
            description: form.description,
            price: form.price, // Ensure it's an integer
            image_url: form.image_url,
        };

        try {
            let res, result;

            if (selectedId !== 'new') {
                // Update existing
                res = await fetch(`/api/products/${selectedId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                result = await res.json();
                if (result.success) {
                    alert(`Product ${selectedId} updated successfully!`);
                } else {
                    alert('Update failed.');
                }
            } else {
                // Create new product
                res = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                result = await res.json();
                if (result.success) {
                    alert('Product created successfully!');
                } else {
                    alert('Creation failed.');
                }
            }

            // Refresh products and reset selection
            await fetchProducts();
            setSelectedId('new');
            setForm({ title: '', description: '', price: '', image_url: '' });
        } catch (error) {
            console.error('Save error:', error);
            alert('An error occurred.');
        } finally {
            setSaving(false);
        }
    };

    if (!auth || !auth.token || !auth.isAdmin) {
        return (
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    ACCESS DENIED: THIS PAGE IS FOR ADMIN USERS ONLY
                </Typography>
            </Grid>
        );
    }

    // Delete product
    const handleDelete = async () => {
        if (!selectedId) return;
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this product? This action cannot be undone.'
        );
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/products/${selectedId}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            if (result.success) {
                alert('Product deleted!');
                await fetchProducts();
                setSelectedId('');
                setForm({ title: '', description: '', price: '', image_url: '' });
            } else {
                alert('Deletion failed.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred.');
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Grid xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Product Administration
                        </Typography>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="product-select-label">Select Product</InputLabel>
                            <Select
                                labelId="product-select-label"
                                id="product-select"
                                value={selectedId}
                                label="Select Product"
                                onChange={(e) => setSelectedId(e.target.value)}
                                displayEmpty
                                renderValue={(selected) => {
                                    if (selected === 'new') {
                                        return <em>-- New Product --</em>;
                                    }
                                    const product = products.find((p) => p.id === selected);
                                    return product ? `ID ${product.id} - ${product.title}` : <em>Select a product</em>;
                                }}
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
                        />                        <TextField
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
                            {saving ? 'Saving...' : selectedId ? 'Save Changes' : 'Create Product'}
                        </Button>

                        {selectedId && (
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
