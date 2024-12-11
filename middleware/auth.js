const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found.' });
      }

      next();
    } catch (error) {
      console.error('Error decoding token:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  } else {
    console.error('No Authorization header found.');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };