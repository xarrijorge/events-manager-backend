const express = require('express');
const router = express.Router();
const client = require('../utils/dbconnection');
const ObjectID = require('mongodb').ObjectId;

// const events = [
//   { _id: 8752, title: 'Divine Comedy', author: 'Dante', copies: 1 },
//   { _id: 7000, title: 'The Odyssey', author: 'Homer', copies: 10 },
//   { _id: 7020, title: 'Iliad', author: 'Homer', copies: 10 },
//   { _id: 8645, title: 'Eclogues', author: 'Dante', copies: 2 },
//   { _id: 8751, title: 'The Banquet', author: 'Dante', copies: 2 },
// ];

/* GET all events. */
router.get('/', async (req, res) => {
  try {
    // connecting to the mongo cluster online
    await client.connect();
    // connect to the right db from the cluster
    const db = client.db('eventsmanager');
    const dbList = client.db().admin().listDatabases();

    // connect to the right collection
    const eventsCollection = db.collection('events');

    // query the collection based on parameters set above
    const allEvents = await eventsCollection.find({}).toArray();
    res.send(allEvents);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// Getting a single event
router.get('/:id', async (req, res) => {
  try {
    // connecting to the mongo cluster online
    await client.connect();
    // connect to the right db from the cluster
    const db = client.db('eventsmanager');
    // connect to the right collection
    const eventsCollection = db.collection('events');
    const id = ObjectID(`${req.params.id}`);

    const query = { _id: id };
    // query the collection based on parameters set above
    const event = await eventsCollection.findOne(query);

    res.send(event);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// Delete a single event

router.delete('/:id', async (req, res) => {
  try {
    // connecting to the mongo cluster online
    await client.connect();
    // connect to the right db from the cluster
    const db = client.db('eventsmanager');
    // connect to the right collection
    const eventsCollection = db.collection('events');
    const id = ObjectID(`${req.params.id}`);

    const query = { _id: id };
    // query the collection based on parameters set above
    const item = await eventsCollection.findOneAndDelete(query);

    res.send(item);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
