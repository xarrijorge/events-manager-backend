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

    // connect to the right collection
    const eventsCollection = client.db('eventsmanager').collection('events');

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
    // connect to the right collection
    const eventsCollection = client.db('eventsmanager').collection('events');
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
    // connect to the right collection
    const eventsCollection = client.db('eventsmanager').collection('events');
    const id = ObjectID(`${req.params.id}`);

    // query the collection based on parameters set above
    const item = await eventsCollection.findOneAndDelete({ _id: id });

    res.send(item);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await client.connect();
    const eventsCollection = client.db('eventsmamager').collection('events');
    const id = ObjectID(`${req.params.id}`);

    const item = await eventsCollection.findOneAndReplace(
      { _id: id },
      req.body
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

router.post('/', async (req, res) => {
  try {
    await client.connect();

    const eventsCollection = client.db('eventsmanager').collection('events');

    const body = req.body;

    const item = await eventsCollection.insertOne({
      title: body.title,
      organizer: body.organizer,
      date: body.date,
    });

    res.send(item);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
