

import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();
const users = []; 


router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});


router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }


  req.session.user = { username: user.username };

  res.json({ message: 'User signed in successfully' });
});


router.post('/signout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to sign out' });
    }
    res.json({ message: 'User signed out successfully' });
  });
});

export default router;
