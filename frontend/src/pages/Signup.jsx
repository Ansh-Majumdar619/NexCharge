/* eslint-disable no-unused-vars */
import React, { useState } from 'react'; // React import along with useState hook
import { useNavigate } from 'react-router-dom'; // Hook to navigate programmatically
import { Eye, EyeOff } from 'lucide-react'; // Icons to toggle password visibility
import { motion } from 'framer-motion'; // For animation effects
import toast, { Toaster } from 'react-hot-toast'; // For toast notifications
import axios from '../api/api'; // Custom axios instance for API calls

const Signup = () => {
  // State to manage form fields
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to store and show error messages
  const [error, setError] = useState('');

  // Hook to navigate to other routes
  const navigate = useNavigate();

  // Handle input change and update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // Update specific field
    setError(''); // Clear any existing error
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload
    const { name, email, password } = form;

    // If any field is empty, show an error
    if (!name || !email || !password) {
      return setError('Please fill all fields');
    }

    try {
      // Send POST request to register user
      await axios.post('/auth/register', form);
      toast.success('Signup successful! Redirecting...'); // Show success toast

      // Navigate to homepage after delay
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      // Handle registration failure
      setError('Signup failed. Try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      {/* Toast notification container */}
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Animated form using framer-motion */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-xl w-full max-w-md text-white"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">Create Account</h2>

        {/* Show error if exists */}
        {error && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-600/80 text-white text-sm p-2 mb-4 rounded text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Name input field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-300">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Email input field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Password input field with toggle icon */}
        <div className="mb-6 relative">
          <label className="block mb-1 text-sm text-gray-300">Password</label>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'} // Toggle visibility
            placeholder="Create a password(min 3 characters)"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 pr-10 rounded bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {/* Eye icon to toggle password */}
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-9 right-3 text-gray-400 hover:text-cyan-400 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 cursor-pointer transition-colors duration-200 rounded text-white font-semibold shadow-md"
        >
          Sign Up
        </button>

        {/* Navigation to login page */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{' '}
          <span
            className="text-cyan-400 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;
