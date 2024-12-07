const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

exports.signup = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already registered' });
    }

    const user = new User({ userName, password });
    await user.save();

    const token = generateToken(user._id);
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        userName: user.userName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    
    res.json({
      token,
      user: {
        id: user._id,
        userName: user.userName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};