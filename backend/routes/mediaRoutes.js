const express = require('express');
const { fetchSerieItems, fetchMovieItems } = require('../controllers/mediaController');

const router = express.Router();

// Define the route for fetching media items
router.get('/movie-items', fetchMovieItems);
router.get('/serie-items', fetchSerieItems);

module.exports = router;
