const express = require('express');
const router = express.Router();
const MongoClient = require('../utils/dbconnection');

/* GET all events. */
router.get('/', async (req, res) => {
  try {
    // connecting to the mongo cluster online
    await MongoClient.connect();
    // connect to the right db from the cluster
    const db = MongoClient.db('esforms');

    // connect to the right collection
    const eventsCollection = db.collection('events');

    // query the collection based on parameters set above
    const allEvents = eventsCollection.find();
    res.send(allEvents);
  } catch (err) {
    console.log(err);
  } finally {
    await Mongo_Mongo_Client.close();
  }
});

module.exports = router;
