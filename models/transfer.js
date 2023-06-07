// models/transfer.js
const mongoose = require('mongoose');
const transferSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const Transfer = mongoose.model('Transfer', transferSchema);
module.exports = Transfer;
