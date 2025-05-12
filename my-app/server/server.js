// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';

// Load environment variables early
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

console.log('Current NODE_ENV:', process.env.NODE_ENV); // Debugging
console.log('Loaded env file:', envFile);
console.log('PLACE_ID:', process.env.PLACE_ID); // Should now show the value

// Now it's safe to import routes that rely on env variables
import businessRoute from './routes/business.js';
import announcementsRouter from './routes/announcements.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/announcements', announcementsRouter);
app.use('/business', businessRoute);

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
