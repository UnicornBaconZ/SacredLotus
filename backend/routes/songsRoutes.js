const express = require('express');
const { fetchSongs } = require('../controllers/songsController');

const router = express.Router();

// Define the route for fetching media items
router.get('/songs', fetchSongs);

module.exports = router;
