const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();


// Connect to the database
const db = new sqlite3.Database(path.join(__dirname, 'db', 'claimcorner.db'));

// Create a new blog post
router.post('/posts', (req, res) => {
  const { title, content, image, category } = req.body;
  const date = new Date().toISOString();
  db.run(
    'INSERT INTO blog_posts (title, content, image, category, date) VALUES (?, ?, ?, ?, ?)',
    [title, content, image, category, date],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } else {
        res.status(200).send('Blog post created successfully');
      }
    }
  );
});

// Get all blog posts
router.get('/posts', (req, res) => {
  db.all('SELECT * FROM blog_posts', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(rows);
    }
  });
});

// Get a single blog post
router.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM blog_posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else if (!row) {
      res.status(404).send('Blog post not found');
    } else {
      res.status(200).json(row);
    }
  });
});

// Get the four most recent blog posts
router.get('/recent-posts', (req, res) => {
  db.all('SELECT * FROM blog_posts ORDER BY date DESC LIMIT 4', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(rows);
    }
  });
});

// Update a blog post
router.put('/posts/:id', (req, res) => {
  const { title, content, image, category } = req.body;
  const { id } = req.params;
  const date = new Date().toISOString();
  db.run(
    'UPDATE blog_posts SET title = ?, content = ?, image = ?, category = ?, date = ? WHERE id = ?',
    [title, content, image, category, date, id],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } else {
        res.status(200).send('Blog post updated successfully');
      }
    }
  );
});

// Delete a blog post
router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM blog_posts WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Blog post deleted successfully');
    }
  });
});

module.exports = router;
