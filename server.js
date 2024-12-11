const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Required for handling file paths
const connectDB = require('./config/db'); // Ensure you have a `db.js` file in the `config` folder
const carRoutes = require('./routes/carRoutes'); // Import car routes
const fs = require('fs');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images
app.use('/api/cars', carRoutes); // Use car routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
