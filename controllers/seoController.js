const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Create db connection
const db = new sqlite3.Database(path.join(__dirname, 'db', 'claimcorner.db'));

// Create table for SEO settings if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS seo_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL
  )
`);

// Define a route to fetch SEO settings
router.get('/seoSettings', (req, res) => {
  // Logic to fetch SEO settings from the database
  db.get('SELECT * FROM seo_settings', (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(row);
    }
  });
});

// Define a route to update SEO settings
router.put('/seoSettings', (req, res) => {
  const { title, description } = req.body;
  db.run(
    'UPDATE seo_settings SET title = ?, description = ? WHERE id = 1', // Assuming you have a single row in the table
    [title, description],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } else {
        res.status(200).send('SEO settings updated successfully');
      }
    }
  );
});

module.exports = router;
