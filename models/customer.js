const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  transfers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transfer',
    },
  ],
});

customerSchema.set('createIndexes', true); // Enable createIndexes option

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
