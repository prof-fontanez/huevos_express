// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import productRoutes from './routes/products.js';
import authRouter from './routes/auth.js';
import businessRoute from './routes/business.js';
import announcementsRouter from './routes/announcements.js';
import notifyRouter from './routes/notifications.js';

import Telnyx from 'telnyx';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

console.log('Current NODE_ENV:', process.env.NODE_ENV);
console.log('Loaded env file:', envFile);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Telnyx init
const telnyx = Telnyx(process.env.TELNYX_API_KEY);

// ➤ SMS route with correct Telnyx v2 body
app.post('/send-sms', async (req, res) => {
  const { to, text } = req.body;
  const from = process.env.TELNYX_PHONE_NUMBER;

  if (!to || !text) {
    return res.status(400).json({ error: 'Missing "to" or "text" in request body.' });
  }

  try {
    const response = await telnyx.messages.create({
      from,
      to,
      text,
      media_urls: []  // optional, can be omitted if not used
    });

    res.status(200).json({
      message: 'Message sent successfully!',
      messageId: response.data.id
    });
  } catch (error) {
    console.error('Telnyx Error:', error?.raw?.errors || error);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

// Other routes
app.use('/api/announcements', announcementsRouter);
app.use('/business', businessRoute);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRouter);
app.use('/api/notify-order', notifyRouter);

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
