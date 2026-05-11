const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// Get all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create venue (Admin only theoretically, simple version here)
router.post('/', async (req, res) => {
  try {
    const newVenue = new Venue(req.body);
    const venue = await newVenue.save();
    res.json(venue);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
