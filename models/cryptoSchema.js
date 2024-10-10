const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number,
    required: true
  },
  change: {
    type: Number,
    required: true
  },
  fetchedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('cryptoDB', cryptoSchema);
