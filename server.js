const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const blogController = require('./controllers/blogController');
const authController = require('./controllers/authController');
const seoController = require('./controllers/seoController');

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// Create db
const db = new sqlite3.Database(path.join(__dirname, 'db', 'claimcorner.db'), (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the claimcorner database.');
});

// Endpoint for fetching analytics data
app.get('/analytics', (req, res) => {
  // Logic to fetch and process analytics data from the database
  db.all('SELECT * FROM analyticsData', (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.json(rows);
  });
});

// Endpoint for fetching subscriber data
app.get('/subscribers', (req, res) => {
  // Logic to fetch and process subscriber data from the database
  db.all('SELECT * FROM subscribers', (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.json(rows);
  });
});

// Endpoint for fetching all blog posts
app.get('/posts', blogController.getPosts);

// Endpoint for editing a specific blog post
app.put('/posts/:id', blogController.updatePost);

// Endpoint for deleting a specific blog post
app.delete('/posts/:id', blogController.deletePost);

// Endpoint for creating a new account
app.post('/register', authController.register);

// Endpoint for handling SEO settings
app.get('/seo-settings', seoController.getSEOSettings);

// Endpoint for handling subscription requests
app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }

  db.run('INSERT INTO subscribers(email) VALUES(?)', [email], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
    // Subscriber added successfully
    return res.status(200).send('Subscription successful');
  });
});

// Endpoint for retrieveing 4 recent posts to be shown on homepage
app.get('/recent-posts', blogController.getRecentPosts);

// Create table for blog posts
db.run(`CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    category TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

// Create table for subscriber emails
db.run(`CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL
)`);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the root URL
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes for blog posts
app.post('/posts', blogController.createPost);
app.get('/posts', blogController.getPosts);
app.get('/posts/:id', blogController.getPost);
app.put('/posts/:id', blogController.updatePost);
app.delete('/posts/:id', blogController.deletePost);

// Routes for authentication
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
