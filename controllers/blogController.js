const express = require('express');
const path = require('path');
const Datastore = require('nedb');
const router = express.Router();

// Connect to the database
const db = new Datastore({ filename: path.join(__dirname, '..', 'db', 'nedb.db'), autoload: true });

// Create a new blog post
router.post('/posts', (req, res) => {
  const { title, content, image, category } = req.body;
  const date = new Date().toISOString();
  db.insert({ title, content, image, category, date, type: 'blog_posts' }, (err, newDoc) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Blog post created successfully');
    }
  });
});

// Get all blog posts
router.get('/posts', (req, res) => {
  db.find({ type: 'blog_posts' }, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get a single blog post
router.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findOne({ _id: id, type: 'blog_posts' }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else if (!doc) {
      res.status(404).send('Blog post not found');
    } else {
      res.status(200).json(doc);
    }
  });
});

// Add other routes as needed

module.exports = router;
