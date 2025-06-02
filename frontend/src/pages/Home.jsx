import React, { useEffect, useState } from 'react';
// Axios instance for API requests
import axios from '../api/api';
// Icon imports
import { FaChargingStation } from 'react-icons/fa';
import { MdLocationOn, MdFlashOn } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPlug } from 'react-icons/bs'; // Connector icon
import { Link } from 'react-router-dom';
// Framer Motion for animation
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Home = () => {
  // State to store all chargers
  const [chargers, setChargers] = useState([]);
  // State to store filtered chargers
  const [filteredChargers, setFilteredChargers] = useState([]);
  // State to store last updated timestamp
  const [lastUpdated, setLastUpdated] = useState(null);

  // State to manage filter values
  const [filters, setFilters] = useState({
    status: '',
    name: '',
    powerOutput: '',
    connectorType: '',
  });

  // Fetch all chargers when component mounts
  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const res = await axios.get('/chargers');
        setChargers(res.data); // Save fetched chargers
        setFilteredChargers(res.data); // Initially, all chargers are shown
        setLastUpdated(new Date().toLocaleString()); // Set update time
      } catch (error) {
        console.error('Failed to fetch chargers', error);
      }
    };

    fetchChargers();
  }, []);

  // Apply filters whenever filters or chargers change
  useEffect(() => {
    const { status, name, powerOutput, connectorType } = filters;
    const filtered = chargers.filter((charger) => {
      return (
        (!status || charger.status.toLowerCase() === status.toLowerCase()) &&
        (!name || charger.name.toLowerCase().includes(name.toLowerCase())) &&
        (!powerOutput || charger.powerOutput?.toString() === powerOutput) &&
        (!connectorType || charger.connectorType?.toLowerCase() === connectorType.toLowerCase())
      );
    });
    setFilteredChargers(filtered);
  }, [filters, chargers]);

  // Handle filter input changes
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Framer Motion animation variants for filters
  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
    }),
  };

  // Array describing the filter inputs
  const filtersArray = [
    { type: 'input', name: 'name', placeholder: 'Search by name' },
    { type: 'select', name: 'status', options: ['', 'Active', 'Inactive'] },
    { type: 'select', name: 'powerOutput', options: ['', '50', '100', '150'], labels: ['All Power Outputs', '50 kW', '100 kW', '150 kW'] },
    { type: 'select', name: 'connectorType', options: ['', 'Type1', 'Type2', 'CCS', 'CHAdeMO'] }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400 flex items-center gap-2">
          <FaChargingStation /> Charging Stations
        </h1>
      </div>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {filtersArray.map((filter, i) => (
          <motion.div
            key={filter.name}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={filterVariants}
            className="w-full"
          >
            {filter.type === 'input' ? (
              // Input filter (e.g., name)
              <input
                type="text"
                name={filter.name}
                placeholder={filter.placeholder}
                value={filters[filter.name]}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            ) : (
              // Select filter (status, power output, connector)
              <select
                name={filter.name}
                value={filters[filter.name]}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              >
                {(filter.labels || filter.options).map((option, idx) => (
                  <option key={idx} value={filter.options[idx]}>
                    {filter.labels ? option : option === '' ? `All ${filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}` : option}
                  </option>
                ))}
              </select>
            )}
          </motion.div>
        ))}
      </div>

      {/* Last updated timestamp */}
      {lastUpdated && (
        <p className="text-sm text-gray-400 mb-4">
          Last updated: {lastUpdated}
        </p>
      )}

      {/* Login/signup call to action */}
      <p className="text-center text-xl sm:text-2xl font-bold text-blue-400 mb-8 animate-pulse transition-all duration-1000 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]">
        🚀 To get more features,{' '}
        <Link
          to="/login"
          className="text-amber-200 underline underline-offset-4 hover:text-amber-100 transition-colors"
        >
          login
        </Link>{' '}
        or{' '}
        <Link
          to="/signup"
          className="text-amber-200 underline underline-offset-4 hover:text-amber-100 transition-colors"
        >
          signup
        </Link>{' '}
        now!
      </p>

      {/* Display filtered charger cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredChargers.length > 0 ? (
          filteredChargers.map((charger) => (
            <div
              key={charger._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transform hover:-translate-y-1"
            >
              {/* Charger name */}
              <h2 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
                <AiOutlineSearch className="text-blue-400" /> {charger.name}
              </h2>

              {/* Status badge */}
              <p className="text-gray-300 mb-2">
                <span className="font-medium text-yellow-400">Status:</span>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${charger.status === 'Active'
                    ? 'bg-green-700 text-green-100'
                    : 'bg-red-700 text-red-100'
                    }`}
                >
                  {charger.status}
                </span>
              </p>

              {/* Location info */}
              <p className="text-orange-400 flex items-center gap-2 mb-1">
                <MdLocationOn className="text-pink-400" />
                Lat: {charger.location?.latitude}, Lng: {charger.location?.longitude}
              </p>

              {/* Power Output info */}
              {charger.powerOutput && (
                <p className="text-green-300 flex items-center gap-2 mb-1">
                  <MdFlashOn className="text-yellow-400" />
                  Power Output: {charger.powerOutput} kW
                </p>
              )}

              {/* Connector Type info */}
              {charger.connectorType && (
                <p className="text-purple-300 flex items-center gap-2">
                  <BsPlug className="text-emerald-400" />
                  Connector: {charger.connectorType}
                </p>
              )}
            </div>
          ))
        ) : (
          // Message when no chargers match filters
          <p className="col-span-full text-center text-gray-400">
            No charging stations match the filter criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
