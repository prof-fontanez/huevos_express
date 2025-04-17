// server.js
const express = require('express');
const app = express();
const PORT = 5000;

// Import the business route
const businessRoute = require('./routes/business');

// Use the /business route
app.use('/business', businessRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
