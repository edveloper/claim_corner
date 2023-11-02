const express = require('express');
const router = express.Router();
const path = require('path');
const Datastore = require('nedb');

// Create db connection
const db = new Datastore({ filename: path.join(__dirname, '..', 'db', 'nedb.db'), autoload: true });

// Create table for SEO settings if it doesn't exist
// Note: NeDB does not support 'CREATE TABLE IF NOT EXISTS' syntax. You can handle it manually.

// Define a route to fetch SEO settings
router.get('/seoSettings', (req, res) => {
  // Logic to fetch SEO settings from the database
  db.findOne({ type: 'seo_settings' }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(doc);
    }
  });
});

// Define a route to update SEO settings
router.put('/seoSettings', (req, res) => {
  const { title, description } = req.body;
  db.update(
    { type: 'seo_settings' },
    { $set: { title, description } },
    { returnUpdatedDocs: true },
    (err, numAffected, affectedDocs) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.status(200).send('SEO settings updated successfully');
      }
    }
  );
});

module.exports = router;
