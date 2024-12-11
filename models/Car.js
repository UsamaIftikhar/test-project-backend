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
    match: /^[0-9]{10}$/,
  },
  city: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This references the User model
    required: true,
  },
});

module.exports = mongoose.model('Car', CarSchema);
