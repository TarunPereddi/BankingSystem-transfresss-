const express = require('express');
const router = express.Router();
const Transfer = require('../models/transfer');

// GET all transfers
router.get('/', async (req, res) => {
  try {
    const transfers = await Transfer.find().populate('sender receiver', 'name email');
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
