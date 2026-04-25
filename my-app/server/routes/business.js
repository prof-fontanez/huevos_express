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

const convertTo12h = (timeStr) => {
  if (!timeStr || timeStr === 'Cerrado') return timeStr;
  return timeStr.replace(/(\d{1,2}):(\d{2})/g, (match, hours, minutes) => {
    const h = parseInt(hours);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${period}`;
  });
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
          fields: 'name,formatted_address,opening_hours,geometry,reviews,rating,user_ratings_total',
          language: 'es',  // return content in Spanish
        },
      }
    );

    const result = response.data.result;

    if (result?.opening_hours?.weekday_text) {
      const translated = result.opening_hours.weekday_text.map((line) => {
        const [englishDay, hours] = line.split(': ');
        const spanishDay = daysOfWeekMap[englishDay] || englishDay;
        return { days: spanishDay, hours: convertTo12h(hours) };
      });

      res.json({
        message: `Business hours for ${result.name}`,
        businessName: result.name,
        businessAddress: result.formatted_address,
        businessHours: translated,
        coordinates: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng
        },
        reviews: result.reviews || [],
        rating: result.rating || null,
        totalReviews: result.user_ratings_total || 0

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