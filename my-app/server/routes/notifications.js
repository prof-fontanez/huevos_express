// routes/notifications.js
import express from 'express';
import Telnyx from 'telnyx';

const router = express.Router();
const telnyx = Telnyx(process.env.TELNYX_API_KEY);

router.post('/', async (req, res) => {
  const { customerName } = req.body;
  const recipients = ['+17879221754', '+19392859002'];

  const results = [];

  for (const to of recipients) {
    try {
      const response = await telnyx.messages.create({
        from: process.env.TELNYX_PHONE_NUMBER,
        to,
        text: `Nueva orden de ${customerName}. Verifica el correo electrónico.`,
      });

      results.push({
        to,
        status: 'success',
        messageId: response.data.id,
      });
    } catch (error) {
      console.error(`SMS sending error to ${to}:`, error?.raw?.errors || error.message);
      results.push({
        to,
        status: 'error',
        error: error?.raw?.errors || error.message,
      });
    }
  }

  res.json({ results });
});

export default router;
