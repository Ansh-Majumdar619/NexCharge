const bcrypt = require('bcryptjs'); // For hashing passwords securely
const jwt = require('jsonwebtoken'); // For generating JSON Web Tokens
const User = require('../models/User'); // User model

// Register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body; // Extract user details from request body
  try {
    // Check if a user with the given email already exists
    let user = await User.findOne({ email });
    if (user) 
      return res.status(400).json({ message: 'User already exists' }); // If exists, respond with error

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance with hashed password
    user = new User({ name, email, password: hashedPassword });
    await user.save(); // Save user to database

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login existing user
exports.login = async (req, res) => {
  const { email, password } = req.body; // Extract login credentials from request body
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ message: 'Invalid credentials' }); // If user not found, send error

    // Compare submitted password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(400).json({ message: 'Invalid credentials' }); // If password mismatch, send error

    // Generate JWT token valid for 1 day with user ID as payload
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with token and user info (excluding password)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server Error' });
  }
};
