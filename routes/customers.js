const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Transfer = require('../models/transfer');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a specific customer
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('transfers', 'sender receiver amount timestamp');
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer); // Respond with only the customer object
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST transfer money
router.post('/transfer', async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;

    const sender = await Customer.findById(senderId);
    const receiver = await Customer.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    const transfer = new Transfer({
      sender: senderId,
      receiver: receiverId,
      senderName: sender.name, // Include the sender name
      receiverName: receiver.name, // Include the receiver name
      amount,
      timestamp: new Date().toLocaleString()
    });

    await sender.save();
    await receiver.save();
    await transfer.save();

    res.json({ message: 'Transfer successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
