const express = require('express'); // Import Express framework for server creation
const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file
const cors = require('cors'); // Import CORS middleware to enable Cross-Origin Resource Sharing
const connectDB = require('./config/db'); // Import database connection function
const authRoutes = require('./routes/authRoutes'); // Import authentication route handlers
const chargerRoutes = require('./routes/chargerRoutes'); // Import charger-related route handlers

dotenv.config(); // Load environment variables from .env file
connectDB(); // Establish connection to the database

const app = express(); // Initialize Express app instance
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse incoming JSON request bodies

// Register route handlers with their respective base paths
app.use('/api/auth', authRoutes); // Routes for authentication (signup, login, etc.)
app.use('/api/chargers', chargerRoutes); // Routes for charger-related API endpoints

// Define the port the server will listen on, fallback to 5000 if not set in environment
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log message when server is up and running
});

// Add this in your main server file
app.get('/', (req, res) => {
  res.send('🚀 NexCharge API is running successfully!');
});
