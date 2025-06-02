const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance to define routes
const auth = require('../middleware/authMiddleware'); // Import authentication middleware to protect certain routes

// Import controller functions that handle charger-related operations
const {
  createCharger,
  getAllChargers,
  updateCharger,
  deleteCharger,
} = require('../controllers/chargerController');

// Define route to get all chargers (publicly accessible, no auth required)
router.get('/', getAllChargers);

// Define route to create a new charger (protected, requires authentication)
router.post('/', auth, createCharger);

// Define route to update an existing charger by ID (protected, requires authentication)
router.put('/:id', auth, updateCharger);

// Define route to delete a charger by ID (protected, requires authentication)
router.delete('/:id', auth, deleteCharger);

// Export the router to be used in main server file
module.exports = router;
