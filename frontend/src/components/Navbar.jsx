// Importing necessary modules and components
import { Link, useNavigate } from 'react-router-dom'; // For navigation and linking
import { useEffect, useState } from 'react'; // React hooks
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { Menu, X } from 'lucide-react'; // Icons for hamburger menu

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if user is logged in
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tracks if mobile menu is open
  const navigate = useNavigate(); // Navigation hook from React Router

  useEffect(() => {
    // Check if token exists in local storage to set login status
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Converts token to boolean
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsLoggedIn(false); // Update login status
    setIsMenuOpen(false); // Close mobile menu if open
    navigate('/'); // Redirect to home page
  };

  // Links shown based on login status
  const navLinks = (
    <>
      {isLoggedIn ? (
        // Links for logged-in users
        <>
          <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:text-blue-400">Dashboard</Link>
          <Link to="/map" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:text-blue-400">Map View</Link>
          <button onClick={handleLogout} className="block py-2 px-4 text-left hover:text-red-500">Logout</button>
        </>
      ) : (
        // Links for non-logged-in users
        <>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:text-blue-400">Login</Link>
          <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:text-blue-400">Signup</Link>
        </>
      )}
    </>
  );

  return (
    // Navbar container
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg px-6 py-4 text-red-500 relative z-50">
      <div className="flex items-center justify-between">
        {/* Brand / Logo */}
        <motion.div
          className="text-2xl font-bold text-purple-400"
          whileHover={{ scale: 1.05 }} // Animation on hover
        >
          NexCharge ⚡
        </motion.div>

        {/* Desktop navigation links (visible on medium+ screens) */}
        <div className="hidden md:flex space-x-6 items-center text-white">
          {navLinks}
        </div>

        {/* Mobile hamburger menu toggle (visible on small screens) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(prev => !prev)}>
            {/* Toggle between menu and close icons */}
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Animated mobile dropdown menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} // Starting animation
            animate={{ height: 'auto', opacity: 1 }} // Animate to visible
            exit={{ height: 0, opacity: 0 }} // Animate on exit
            transition={{ duration: 0.3 }} // Animation duration
            className="md:hidden mt-4 bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
