// Importing React and necessary icons from react-icons
import React from 'react';
import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaPlug, FaBolt } from 'react-icons/fa';

// Functional component that accepts a single `charger` object as a prop
const ChargerCard = ({ charger }) => {
  // Destructuring data from the charger object
  const { name, location, status, powerOutput, connectorType } = charger;
  const { latitude, longitude } = location;

  // Determine if charger is active
  const isActive = status === 'Active';

  // Conditionally select status icon based on active status
  const statusIcon = isActive ? (
    <FaCheckCircle className="text-green-500 inline-block ml-1" /> // Green check icon for active
  ) : (
    <FaTimesCircle className="text-red-500 inline-block ml-1" /> // Red cross icon for inactive
  );

  return (
    // Card container with styling
    <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl w-full max-w-md mx-auto mb-6 p-6 border border-gray-200 transition hover:shadow-2xl duration-300 font-[Urbanist]">
      {/* Charger name */}
      <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{name}</h2>

      {/* Charger details section */}
      <div className="space-y-2">
        {/* Power output information */}
        <p className="text-gray-700 flex items-center gap-2">
          <FaBolt className="text-yellow-400 text-lg" />
          <span className="text-sm font-medium">Power Output:</span>
          <span className="font-semibold text-base">{powerOutput} kW</span>
        </p>

        {/* Connector type information */}
        <p className="text-gray-700 flex items-center gap-2">
          <FaPlug className="text-blue-500 text-lg" />
          <span className="text-sm font-medium">Connector Type:</span>
          <span className="font-semibold text-base">{connectorType}</span>
        </p>

        {/* Google Maps link to the charger location */}
        <p className="text-gray-700 flex items-center gap-2">
          <FaMapMarkerAlt className="text-pink-600" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} // Direct Google Maps link
            target="_blank"
            rel="noopener noreferrer" // Prevents tab-nabbing vulnerability
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            View on Google Maps
          </a>
        </p>
      </div>

      {/* Embedded Google Map */}
      <iframe
        title="map"
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`} // Embedded map URL
        width="100%"
        height="200"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy" // Improves performance
        className="rounded-xl mt-4"
      ></iframe>

      {/* Status display section with icon */}
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="text-gray-600 font-medium">Status:</span>
        <span
          className={`font-bold ${
            isActive ? 'text-green-600' : 'text-red-600' // Conditional styling based on status
          }`}
        >
          {status}
        </span>
        {statusIcon} {/* Display corresponding status icon */}
      </div>
    </div>
  );
};

export default ChargerCard; // Exporting the component
