const bcrypt = require('bcrypt');
const client = require('../utils/dbconnection');
const router = require('express').Router();

// Sign Up Controller
router.post('/signup', async (req, res) => {
  const { username, name, contact, password } = req.body;
  try {
    await client.connect();
    const db = client.db('eventsmanager');
    const userSCollection = db.collection('users');

    const existingUser = await userSCollection.findOne({ username });
    if (existingUser !== null) {
      return res
        .status(400)
        .json({ error: 'username already exist.', user: existingUser });
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = {
      username,
      name,
      contact,
      passwordHash,
    };

    const action = await userSCollection.insertOne(user);
    res.send(action);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// Login Controller
router.get('/', (req, res) => {
  res.send('Testing User route');
});

// Logout Controller

module.exports = router;
