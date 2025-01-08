const { getSongs } = require('../services/databaseService');

const fetchSongs = async (req, res) => {
  try {
    const items = await getSongs();
    res.json(items);
  } catch (error) {
    console.error('Error fetching media items:', error.message);
    res.status(500).json({ error: 'Failed to fetch media items' });
  }
};


module.exports = {
    fetchSongs
};
