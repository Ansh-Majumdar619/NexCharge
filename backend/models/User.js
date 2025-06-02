const mongoose = require('mongoose'); // Import mongoose library for MongoDB interaction

// Define a schema for User collection with fields: name, email, and password
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name, required field
  email: { type: String, unique: true, required: true }, // User's email, must be unique and required
  password: { type: String, required: true }, // User's password, required field
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Export the User model based on userSchema to be used in other parts of the app
module.exports = mongoose.model('User', userSchema);
