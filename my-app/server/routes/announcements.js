import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Securely load the credentials
const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));

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
