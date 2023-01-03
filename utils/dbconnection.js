const DB_URI = process.env.MONGODB_URI;
const MongoCluster = require('mongodb').MongoClient;

const MongoClient = new MongoCluster(DB_URI);

module.exports = MongoClient;
