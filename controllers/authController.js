const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');

// Temporary storage for authorized users
let authorizedUsers = {
  admin: {
    password: '$2b$10$H6K9BQ2sPYWwHKpsU4LgE.fJYubJz5w1fGmbu1Jdgyg5z7G26F1y2' // Example hashed password for 'admin@123'
  }
  // Add more authorized users as needed
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = authorizedUsers[username];
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Invalid credentials');
  }
  req.session.user = user;
  res.redirect('/dashboard'); // Replace with the actual dashboard route
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Create new user route
app.post('/createUser', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  authorizedUsers[username] = { password: hashedPassword };
  res.status(200).send('User created successfully');
});

module.exports = app;
