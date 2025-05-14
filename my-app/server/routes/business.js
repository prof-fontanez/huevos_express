import express from 'express';
import axios from 'axios';

const router = express.Router();

const daysOfWeekMap = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};

router.get('/', async (req, res) => {
  const PLACE_ID = process.env.PLACE_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!PLACE_ID || !API_KEY) {
    return res.status(500).json({ error: 'Missing PLACE_ID or GOOGLE_API_KEY in environment' });
  }

  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: PLACE_ID,
          key: API_KEY,
          fields: 'name,formatted_address,opening_hours',
        },
      }
    );

    const result = response.data.result;

    if (result?.opening_hours?.weekday_text) {
      const translated = result.opening_hours.weekday_text.map((line) => {
        const [englishDay, hours] = line.split(': ');
        const spanishDay = daysOfWeekMap[englishDay] || englishDay;
        return { days: spanishDay, hours };
      });

      res.json({
        message: `Business hours for ${result.name}`,
        businessName: result.name,
        businessAddress: result.formatted_address,
        businessHours: translated,
      });
    } else {
      res.status(404).json({ error: 'Business hours not available' });
    }
  } catch (error) {
    console.error('Error fetching business hours:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch business hours' });
  }
});

export default router;