const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
const port = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
  res.send('Welcome to the event management platform built on redis');
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});