const express = require('express');
const multer = require('multer');
const path = require('path');
const Car = require('../models/Car');
const { protect } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', protect, upload.array('photos', 5), async (req, res) => {
  try {
    const { carModel, price, phone, city } = req.body;

    if (!carModel || !price || !phone || !city || !req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'All fields are required, including photos.' });
    }

    const photos = req.files.map((file) => file.path);

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated.' });
    }

    const car = new Car({
      carModel,
      price,
      phone,
      city,
      photos,
      user: userId,
    });

    await car.save();

    res.status(201).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
