import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let auth;

if (process.env.NODE_ENV === 'production') {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
  auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
} else {
  const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');
  auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

export const getSheetsClient = async () => {
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
};
