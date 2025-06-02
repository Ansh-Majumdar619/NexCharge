import React, { useEffect, useState } from 'react';
// Importing custom Axios instance
import axios from '../api/api';
// Leaflet components for map rendering
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Leaflet library
import L from 'leaflet';
// Importing charging station icon
import { FaChargingStation } from 'react-icons/fa';

// Fix Leaflet's default icon path (necessary for correct marker icon display)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapView = () => {
  // State to store the list of EV chargers
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    // Fetch chargers data from backend API
    const fetchChargers = async () => {
      try {
        const res = await axios.get('/chargers');
        setChargers(res.data); // Store data in state
      } catch (err) {
        console.error('Error fetching chargers:', err); // Log any error
      }
    };

    fetchChargers(); // Call function on component mount
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-[Urbanist]">
      {/* Header section */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400 flex items-center justify-center gap-3">
          <FaChargingStation className="text-blue-500 animate-pulse" />
          EV Charger Map View
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Locate electric vehicle charging stations across regions
        </p>
      </div>

      {/* Map container with styling */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-700 ring-1 ring-blue-900/20">
        <MapContainer
          center={[20.5937, 78.9629]} // Centered at coordinates of India
          zoom={5} // Initial zoom level
          scrollWheelZoom={true} // Enable zooming with scroll wheel
          className="w-full h-[600px] z-0"
        >
          {/* Map tiles from OpenStreetMap */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* Rendering markers for each charger with valid coordinates */}
          {chargers
            .filter((c) => c.location?.latitude && c.location?.longitude)
            .map((charger) => (
              <Marker
                key={charger._id}
                position={[charger.location.latitude, charger.location.longitude]} // Marker position
              >
                {/* Info popup on marker click */}
                <Popup>
                  <div className="text-sm font-medium space-y-1">
                    <p className="text-base font-bold text-blue-600">{charger.name}</p>
                    <p>
                      Status:{' '}
                      <span className={charger.status === 'Active' ? 'text-green-600' : 'text-red-500'}>
                        {charger.status}
                      </span>
                    </p>
                    {/* Conditionally show power output and connector type if available */}
                    {charger.powerOutput && <p>Power: {charger.powerOutput} kW</p>}
                    {charger.connectorType && <p>Connector: {charger.connectorType}</p>}
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView; // Exporting the component
