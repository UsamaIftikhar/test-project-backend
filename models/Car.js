const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Ensure 10-digit phone number
  },
  city: {
    type: String,
    required: true,
  },
  photos: {
    type: [String], // Array of image URLs
    required: true,
  },
});

module.exports = mongoose.model('Car', CarSchema);