const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../utils/dbconnection');
const router = require('express').Router();

// Sign Up Controller
router.post('/signup', async (req, res) => {
  const { username, name, contact, password } = req.body;
  try {
    await client.connect();
    const userSCollection = client.db('eventsmanager').collection('users');

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

const authenticate = async (req, res, next) => {
  const authHeader = await req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "You're not authenticated" });
  }
  jwt.verify(token, process.env.SECRET, (err, user));
};

// Login Controller
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    await client.connect();
    const userSCollection = client.db('eventsmanager').collection('users');
    const user = await userSCollection.findOne({ username });

    const passwordCorrect =
      user !== null ? await bcrypt.compare(password, user.passwordHash) : null;

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: 'invalid username or password' });
    }
    const accessToken = jwt.sign(user, process.env.SECRET);
    res.send(accessToken);
  } catch (err) {
    console.log(err);
  }
});

// Logout Controller

module.exports = router;
