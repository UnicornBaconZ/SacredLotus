const { getMovieItems, getSerieItems } = require('../services/databaseService');

const fetchMovieItems = async (req, res) => {
  try {
    const items = await getMovieItems();
    res.json(items);
  } catch (error) {
    console.error('Error fetching media items:', error.message);
    res.status(500).json({ error: 'Failed to fetch media items' });
  }
};

const fetchSerieItems = async (req, res) => {
  try {
    const items = await getSerieItems();
    res.json(items);
  } catch (error) {
    console.error('Error fetching media items:', error.message);
    res.status(500).json({ error: 'Failed to fetch media items' });
  }
};

module.exports = {
    fetchMovieItems,
    fetchSerieItems
};
