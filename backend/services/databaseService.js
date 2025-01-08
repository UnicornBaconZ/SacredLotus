const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

const getMovieItems = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT Title, ImageUrl, Rating, Description, Genre FROM Movies ORDER BY Rating DESC';
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getSerieItems = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT Title, ImageUrl, Rating, Description, Genre FROM Series ORDER BY Rating DESC';
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getSongs = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT Title, Artist, SongFile, SongImage FROM songs ORDER BY Rating DESC';
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  getMovieItems,
  getSerieItems,
  getSongs
};
