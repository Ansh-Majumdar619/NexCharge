const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction

// Async function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected'); // Log success message on successful connection
  } catch (error) {
    console.error(error.message); // Log any connection errors
    process.exit(1); // Exit process with failure code if connection fails
  }
};

module.exports = connectDB; // Export the connectDB function for use in other files
