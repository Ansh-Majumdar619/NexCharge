const Charger = require('../models/Charger');

// Create Charger controller function
exports.createCharger = async (req, res) => {
  try {
    // Destructure required fields from request body
    const { name, location, status, connectorType, powerOutput } = req.body;

    // Basic validation to check required fields and correct location format
    if (
      !name ||
      !location ||
      typeof location.latitude !== 'number' ||
      typeof location.longitude !== 'number' ||
      !status ||
      !connectorType ||
      powerOutput === undefined // powerOutput can be 0 but not undefined
    ) {
      // If validation fails, send 400 Bad Request with error message
      return res.status(400).json({ error: 'Missing required fields or invalid location format' });
    }

    // Create new Charger instance with validated data
    const newCharger = new Charger({
      name,
      location,
      status,
      connectorType,
      powerOutput,
    });

    // Save the new charger to the database
    await newCharger.save();
    // Respond with 201 Created and the saved charger object
    res.status(201).json(newCharger);
  } catch (err) {
    // Log error and respond with 500 Internal Server Error if any failure occurs
    console.error('Create Charger Error:', err);
    res.status(500).json({ error: 'Failed to create charger' });
  }
};

// Get All Chargers controller function
exports.getAllChargers = async (req, res) => {
  try {
    // Fetch all chargers from the database
    const chargers = await Charger.find();
    // Respond with JSON array of chargers
    res.json(chargers);
  } catch (err) {
    // Log error and respond with 500 Internal Server Error if failure occurs
    console.error('Get All Chargers Error:', err);
    res.status(500).json({ error: 'Failed to fetch chargers' });
  }
};

// Update Charger controller function
exports.updateCharger = async (req, res) => {
  try {
    const { id } = req.params; // Get charger ID from URL parameters
    const { name, location, status } = req.body; // Get updated fields from request body

    // Basic validation for required fields and location format
    if (!name || !location || !location.latitude || !location.longitude || !status) {
      // Respond with 400 Bad Request if validation fails
      return res.status(400).json({ error: 'Missing required fields or invalid location format' });
    }

    // Find charger by ID and update with new values; return the updated document
    const updated = await Charger.findByIdAndUpdate(
      id,
      { name, location, status },
      { new: true }
    );

    // If charger not found, respond with 404 Not Found
    if (!updated) {
      return res.status(404).json({ error: 'Charger not found' });
    }

    // Respond with updated charger object
    res.json(updated);
  } catch (err) {
    // Log error and respond with 500 Internal Server Error if failure occurs
    console.error('Update Charger Error:', err);
    res.status(500).json({ error: 'Failed to update charger' });
  }
};

// Delete Charger controller function
exports.deleteCharger = async (req, res) => {
  try {
    const { id } = req.params; // Get charger ID from URL parameters
    const deleted = await Charger.findByIdAndDelete(id); // Delete charger by ID

    // If charger not found, respond with 404 Not Found
    if (!deleted) {
      return res.status(404).json({ error: 'Charger not found' });
    }

    // Respond with success message after deletion
    res.json({ message: 'Charger deleted' });
  } catch (err) {
    // Log error and respond with 500 Internal Server Error if failure occurs
    console.error('Delete Charger Error:', err);
    res.status(500).json({ error: 'Failed to delete charger' });
  }
};