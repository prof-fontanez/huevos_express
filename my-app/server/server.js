// server.js
import express from 'express';
import cors from 'cors';
import businessRoute from './routes/business.js'; // Default import
import announcementsRouter from './routes/announcements.js';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/announcements', announcementsRouter);
app.use('/business', businessRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
