import express from 'express';
import { getSheetsClient } from '../utils/googleSheetsClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const sheets = await getSheetsClient();

        const spreadsheetId = '1_mHzDxZghiIUDjPw1MIBu9VbZE0qj9nPm7aiUMjCagg';
        const range = 'eventos!A2:C';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values || [];

        const events = rows
            .filter(row => row.length >= 3)
            .map(([date, time, description]) => ({ 
                date, 
                time, 
                description 
            }));

        // Add iOS-safe headers
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.set('Surrogate-Control', 'no-store');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Platform-Fix', 'ios');

        return res.json({ events });

    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ events: [] });
    }
});

export default router;
