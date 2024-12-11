const express = require('express');
const multer = require('multer');
const path = require('path');
const Car = require('../models/Car');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in an "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /api/cars - Add new car
router.post('/', upload.array('photos', 5), async (req, res) => {
  try {
    const { carModel, price, phone, city } = req.body;
    const photos = req.files.map((file) => file.path); // Save file paths

    const car = new Car({ carModel, price, phone, city, photos });
    await car.save();

    res.status(201).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
