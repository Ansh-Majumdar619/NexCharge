const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance to define routes
const { register, login } = require('../controllers/authController'); // Import register and login controller functions

// Route for user registration; calls register controller on POST requests
router.post('/register', register);

// Route for user login; calls login controller on POST requests
router.post('/login', login);

// Export the router to be used in main server file
module.exports = router;
