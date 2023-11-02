const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const blogRouter = require('./controllers/blogController');
const authRouter = require('./controllers/authController');
const seoRouter = require('./controllers/seoController');
const fs = require('fs');

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// Check file path and permissions
const dbPath = path.resolve(__dirname, 'db', 'nedb.db');
console.log('Absolute Path to Database:', dbPath);

fs.access(dbPath, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error('Error accessing database file:', err);
    return;
  }
  console.log('Database file is accessible with read and write permissions.');
});

// Create db
const db = new Datastore({ filename: dbPath, autoload: true });

// Mount the routers
app.use('/posts', blogRouter);
app.use('/auth', authRouter);
app.use('/seo', seoRouter);

// Endpoint for fetching analytics data
app.get('/analytics', (req, res) => {
  // Logic to fetch and process analytics data from the database
  db.find({ type: 'analyticsData' }, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(docs);
    }
  });
});

// Endpoint for fetching subscriber data
app.get('/subscribers', (req, res) => {
  // Logic to fetch and process subscriber data from the database
  db.find({ type: 'subscribers' }, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(docs);
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
