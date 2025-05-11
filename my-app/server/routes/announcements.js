import express from 'express';
import { google } from 'googleapis';

const router = express.Router();

// Securely load the credentials
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

router.get('/', async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '1kxJehaZAw28GVp6RqFn_OvbJuPj3Ga_-Q4SYzCZ77lM';
    const range = 'messages!A:A';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const messages = rows.flat().filter(msg => msg && msg.trim());

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');

    res.json({ announcements: messages });
  } catch (error) {
    console.error('Error fetching announcements:', error.message);
    res.status(500).json({ announcements: [] });
  }
});

export default router;
