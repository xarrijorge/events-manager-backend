const DB_URI = process.env.MONGODB_URI;
const { MongoClient } = require('mongodb');

let client = new MongoClient(DB_URI);

module.exports = client;
