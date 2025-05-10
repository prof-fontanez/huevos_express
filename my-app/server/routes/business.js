// server/routes/business.js
import express from 'express'; // Use ESM import
const router = express.Router();

// Sample business hours data
const businessHours = [
  { days: 'Lunes a viernes', hours: '4:00 PM - 6:00 PM' },
  { days: 'Fines de semana', hours: '11:00 AM - 1:00 PM' }
];

// Define the /business route
router.get('/', (req, res) => {
  res.json(businessHours);
});

// Default export for ESM
export default router;
