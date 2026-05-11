const express = require('express');
const router = express.Router();
const RFP = require('../models/RFP');

// Get all RFPs (Admin)
router.get('/', async (req, res) => {
  try {
    const rfps = await RFP.find();
    res.json(rfps);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Submit an RFP
router.post('/', async (req, res) => {
  try {
    const newRFP = new RFP(req.body);
    const rfp = await newRFP.save();
    res.json(rfp);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
