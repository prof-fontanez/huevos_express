// server/routes/products.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// ✅ GET /api/products — Fetch all products (including tooltip fields)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error.message, error.stack);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

router.get('/test-connection', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        res.json({ success: true, result: rows[0].result });
    } catch (error) {
        console.error('Database connection test failed:', error);
        res.status(500).json({ success: false, message: 'DB connection error', error: error.message });
    }
});

// PUT /api/products/:id — Update a product (including tooltip fields)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    let {
        title,
        description,
        price,
        image_url,
        has_tooltip,
        tooltip_msg
    } = req.body;

    // Defensive coding: default to null or fallback types
    if (title === undefined || description === undefined || price === undefined) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Ensure optional fields have safe values
    image_url = image_url ?? null;
    has_tooltip = typeof has_tooltip === 'boolean' ? has_tooltip : false;
    tooltip_msg = tooltip_msg ?? null;

    try {
        const [result] = await db.execute(
            `UPDATE products SET title = ?, description = ?, price = ?, image_url = ?, has_tooltip = ?, tooltip_msg = ? WHERE id = ?`,
            [title, description, price, image_url, has_tooltip, tooltip_msg, id]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

// POST /api/products — Create a new product (including tooltip fields)
router.post('/', async (req, res) => {
    const { title, description, price, image_url, has_tooltip, tooltip_msg } = req.body;

    if (!title || !description || !price) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const [result] = await db.execute(
            `INSERT INTO products (title, description, price, image_url, has_tooltip, tooltip_msg) VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, price, image_url, has_tooltip || false, tooltip_msg || null]
        );
        res.status(201).json({ success: true, insertId: result.insertId });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

// DELETE /api/products/:id — Remove a product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute(
            'DELETE FROM products WHERE id = ?',
            [id]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

export default router;
