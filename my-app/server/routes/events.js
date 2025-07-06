import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let auth;

if (process.env.NODE_ENV === 'production') {
    // Use credentials from environment variable in production
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
} else {
    // Use local credentials file in development
    const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');
    auth = new google.auth.GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
}

router.get('/', async (req, res) => {
    try {
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

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
