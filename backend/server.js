const express = require('express');
const cors = require('cors');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the media routes
app.use('/api', mediaRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});