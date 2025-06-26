// server.js
import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import productRoutes from './routes/products.js';
import authRouter from './routes/auth.js';
import businessRoute from './routes/business.js';
import announcementsRouter from './routes/announcements.js';
import notifyRouter from './routes/notifications.js';
import Telnyx from 'telnyx';

// ✅ Load environment variables early (only in development)
if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  const envFile = '.env.development';
  dotenv.config({ path: envFile });

  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Loaded env file:', envFile);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Telnyx initialization
const telnyx = Telnyx(process.env.TELNYX_API_KEY);

app.get('/api/test-env', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    TELNYX_API_KEY: process.env.TELNYX_API_KEY ? '✅ loaded' : '❌ missing',
    TELNYX_PHONE_NUMBER: process.env.TELNYX_PHONE_NUMBER ? '✅ loaded' : '❌ missing',
  });
});

// ✅ Optional: SMS test endpoint (used only if needed)
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
      media_urls: [] // Optional
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

// ✅ Register routes
app.use('/api/announcements', announcementsRouter);
app.use('/business', businessRoute);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRouter);
app.use('/api/notify-order', notifyRouter);

// ✅ Simple test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
