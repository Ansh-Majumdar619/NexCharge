const mongoose = require('mongoose'); // Import mongoose library for MongoDB interaction

// Define a schema for Charger collection with fields describing an EV charger
const chargerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the charger, required field
  location: { // Geographical location of the charger
    latitude: { type: Number, required: true }, // Latitude coordinate, required
    longitude: { type: Number, required: true }, // Longitude coordinate, required
  },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, // Charger status, either Active or Inactive; default is Active
  powerOutput: { type: Number, required: true }, // Power output in kilowatts (kW), required
  connectorType: { type: String, required: true }, // Type of connector the charger supports, required
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User who created this charger entry
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Export the Charger model based on chargerSchema for use in other parts of the application
module.exports = mongoose.model('Charger', chargerSchema);
