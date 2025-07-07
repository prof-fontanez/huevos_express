import express from 'express';
import { getSheetsClient } from '../utils/googleSheetsClient.js'; // shared auth logic

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const sheets = await getSheetsClient();

        const spreadsheetId = '1_mHzDxZghiIUDjPw1MIBu9VbZE0qj9nPm7aiUMjCagg';
        const range = 'eventos!A:C';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values || [];

        // Remove header row, map rows to event objects
        const events = rows.slice(1).map(([date, time, description]) => ({
            date,
            time,
            description,
        }));

        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.set('Surrogate-Control', 'no-store');

        res.json({ events });
    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ events: [] });
    }
});

export default router;
