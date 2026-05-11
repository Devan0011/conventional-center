const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings (Admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', ['name', 'email']).populate('venue', ['name']);
    res.json(bookings);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create a booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
