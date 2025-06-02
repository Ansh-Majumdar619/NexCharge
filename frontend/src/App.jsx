// Importing necessary components from react-router-dom for routing
import { Routes, Route } from 'react-router-dom';

// Importing page components
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Main App component
function App() {
  return (
    // Container with minimum screen height and light gray background
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar shown on all pages */}
      <Navbar />
      
      {/* Defining routes for different pages */}
      <Routes>
        {/* Route for homepage */}
        <Route path="/" element={<Home />} />

        {/* Route for signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Route for login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for map view page */}
        <Route path="/map" element={<MapView />} />
      </Routes>
    </div>
  );
}

// Exporting the App component as default
export default App;
