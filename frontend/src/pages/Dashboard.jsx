import React, { useEffect, useState } from 'react'; // Import React hooks
import { FiEdit2, FiTrash2 } from 'react-icons/fi'; // Icons for edit and delete buttons
import api from '../api/api'; // Axios instance for API calls
import ChargerCard from '../components/ChargerCard'; // Component to display charger details

const Dashboard = () => {
  // States to manage charger list, form inputs, search and filter
  const [chargers, setChargers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    status: 'Active',
    powerOutput: '',
    connectorType: '',
  });
  const [editingId, setEditingId] = useState(null); // To track which charger is being edited

  const token = localStorage.getItem('token'); // Get token from local storage

  // Fetch all chargers from the backend
  const fetchChargers = async () => {
    try {
      const res = await api.get('/chargers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChargers(res.data); // Save response data in state
    } catch (err) {
      console.error('Failed to fetch chargers:', err);
    }
  };

  // Fetch chargers when the component mounts
  useEffect(() => {
    fetchChargers();
  }, []);

  // Update form state when user types in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form data for adding or updating a charger
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert numeric inputs from strings to numbers
    const powerOutputValue = parseFloat(formData.powerOutput);
    const latitudeValue = parseFloat(formData.latitude);
    const longitudeValue = parseFloat(formData.longitude);

    // Validate fields
    if (
      !formData.name.trim() ||
      isNaN(powerOutputValue) ||
      isNaN(latitudeValue) ||
      isNaN(longitudeValue) ||
      !formData.connectorType.trim()
    ) {
      alert('Please fill all required fields correctly.');
      return;
    }

    // Prepare payload for API call
    const payload = {
      name: formData.name.trim(),
      status: formData.status,
      powerOutput: powerOutputValue,
      connectorType: formData.connectorType.trim(),
      location: {
        latitude: latitudeValue,
        longitude: longitudeValue,
      },
    };

    try {
      if (editingId) {
        // Update charger
        await api.put(`/chargers/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null); // Clear editing mode
      } else {
        // Create new charger
        await api.post('/chargers', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Reset form
      setFormData({
        name: '',
        latitude: '',
        longitude: '',
        status: 'Active',
        powerOutput: '',
        connectorType: '',
      });

      fetchChargers(); // Refresh charger list
    } catch (err) {
      console.error('Error submitting charger:', err);
      alert('Failed to create or update charger. Check console for details.');
    }
  };

  // Fill form with selected charger's data for editing
  const handleEdit = (charger) => {
    setFormData({
      name: charger.name,
      latitude: charger.location.latitude.toString(),
      longitude: charger.location.longitude.toString(),
      status: charger.status,
      powerOutput: charger.powerOutput.toString(),
      connectorType: charger.connectorType,
    });
    setEditingId(charger._id); // Set current editing ID
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  // Delete a charger after confirmation
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this charger?')) return;
    try {
      await api.delete(`/chargers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchChargers(); // Refresh list after deletion
    } catch (err) {
      console.error('Error deleting charger:', err);
    }
  };

  // Apply search and filter on chargers list
  const filteredChargers = chargers.filter((charger) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      charger.name.toLowerCase().includes(searchLower) ||
      charger.connectorType.toLowerCase().includes(searchLower) ||
      charger.powerOutput.toString().includes(searchLower) ||
      charger.location.latitude.toString().includes(searchLower) ||
      charger.location.longitude.toString().includes(searchLower);

    const matchesStatus = statusFilter ? charger.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans text-gray-900 min-w-screen bg-gray-900">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gradient bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
        EV Chargers Dashboard
      </h1>

      {/* Charger Form (Add/Edit) */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl p-6 mb-10 max-w-4xl mx-auto border border-[#f7e7ce]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">
          {editingId ? 'Edit' : 'Add'} Charger
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form fields */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-style bg-[#dec8a5] "
            required
            autoComplete="off"
          />
          <input
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            type="number"
            step="any"
            className="input-style bg-[#dec8a5]"
            required
            autoComplete="off"
          />
          <input
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            type="number"
            step="any"
            className="input-style bg-[#dec8a5]"
            required
            autoComplete="off"
          />
          <input
            name="powerOutput"
            value={formData.powerOutput}
            onChange={handleChange}
            placeholder="Power Output (kW)"
            type="number"
            step="any"
            className="input-style bg-[#dec8a5]"
            required
            autoComplete="off"
          />
          <input
            name="connectorType"
            value={formData.connectorType}
            onChange={handleChange}
            placeholder="Connector Type (e.g., Type2, CCS)"
            className="input-style bg-[#dec8a5]"
            required
            autoComplete="off"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-style bg-[#dec8a5]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-6 w-full md:w-auto px-10 py-3 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:brightness-110 transition duration-300 ease-in-out"
        >
          {editingId ? 'Update' : 'Add'} Charger
        </button>
      </form>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by name, connector, power, location..."
          className="input-style w-full sm:w-2/3 bg-[#dec8a5] text-gray-950"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
        <select
          className="input-style w-full sm:w-1/3 bg-[#dec8a5] text-gray-950"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Charger List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {filteredChargers.length ? (
          filteredChargers.map((charger) => (
            <div
              key={charger._id}
              className="backdrop-blur-md rounded-2xl shadow-xl p-6 border bg-[#cbae80] border-black flex flex-col"
            >
              {/* Charger details component */}
              <ChargerCard charger={charger} />
              <div className="mt-6 flex justify-center gap-6">
                {/* Edit button */}
                <button
                  onClick={() => handleEdit(charger)}
                  className="flex items-center gap-2 bg-black text-[#cbae80] px-6 py-2 rounded-full shadow-md hover:bg-[#fbe5c2] hover:text-black hover:scale-105 transform transition duration-300 ease-in-out"
                  aria-label={`Edit ${charger.name}`}
                >
                  <FiEdit2 size={18} />
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(charger._id)}
                  className="flex items-center gap-2 bg-[#dc2626] text-gray-900 px-6 py-2 rounded-full shadow-md hover:bg-[#b91c1c] hover:scale-105 transform transition duration-300 ease-in-out"
                  aria-label={`Delete ${charger.name}`}
                >
                  <FiTrash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          // No chargers found message
          <p className="text-center text-gray-500 col-span-full">No chargers found.</p>
        )}
      </div>

      {/* Custom styling for inputs */}
      <style>
        {`
          .input-style {
            border: 1.8px solid #d1d5db;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 500;
            color: #374151;
            transition: all 0.3s ease;
            box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
          }
          .input-style:focus {
            outline: none;
            border-color: #7c3aed;
            box-shadow: 0 0 6px rgba(124, 58, 237, 0.6);
            background-color: #fafafa;
          }
          .text-gradient {
            background-clip: text
        `}
      </style>
    </div>
  );
};

export default Dashboard;
