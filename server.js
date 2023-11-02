const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const blogRouter = require('./controllers/blogController');
const authRouter = require('./controllers/authController');
const seoRouter = require('./controllers/seoController');
const fs = require('fs');

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// Check file path and permissions
const dbPath = path.resolve(__dirname, 'db', 'claimcorner.db');
console.log('Absolute Path to Database:', dbPath);

fs.access(dbPath, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error('Error accessing database file:', err);
    return;
  }
  console.log('Database file is accessible with read and write permissions.');
});

// Create db
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the claimcorner database.');

    // Create tables if they don't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image TEXT,
        category TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL
      )
    `);
  }
});

// Mount the routers
app.use('/posts', blogRouter);
app.use('/auth', authRouter);
app.use('/seo', seoRouter);

// Endpoint for fetching analytics data
app.get('/analytics', (req, res) => {
  // Logic to fetch and process analytics data from the database
  db.all('SELECT * FROM analyticsData', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      res.json(rows);
    }
  });
});

// Endpoint for fetching subscriber data
app.get('/subscribers', (req, res) => {
  // Logic to fetch and process subscriber data from the database
  db.all('SELECT * FROM subscribers', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      res.json(rows);
    }
  });
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the seoController router for SEO routes
app.use('/', seoRouter);

// Define a route for the root URL
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
