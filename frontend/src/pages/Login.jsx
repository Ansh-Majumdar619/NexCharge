/* eslint-disable no-unused-vars */
import React, { useState } from 'react'; // Importing React and useState hook
import { useNavigate } from 'react-router-dom'; // Importing hook to programmatically navigate
import { motion } from 'framer-motion'; // Importing motion for animations
import { Eye, EyeOff } from 'lucide-react'; // Icons to toggle password visibility
import axios from '../api/api'; // Axios instance for API calls

const Login = () => {
  // useState to handle form input values
  const [form, setForm] = useState({ email: '', password: '' });

  // useState to toggle visibility of password input
  const [showPassword, setShowPassword] = useState(false);

  // useNavigate hook to navigate to other pages
  const navigate = useNavigate();

  // Function to handle changes in input fields and update state
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Function to handle form submission
  const handleSubmit = async e => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send login request with email and password
      const res = await axios.post('/auth/login', form);

      // Save returned token to local storage
      localStorage.setItem('token', res.data.token);

      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      // Show alert on login failure
      alert('Login failed');
    }
  };

  return (
    // Container with center alignment and background gradient
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-4">

      {/* Animated form container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        transition={{ duration: 0.6, ease: 'easeOut' }} // Animation settings
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-xl w-full max-w-md text-white"
      >
        {/* Form title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">Welcome Back</h2>

        {/* Email input field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Password input field with toggle visibility */}
        <div className="mb-6 relative">
          <label className="block mb-1 text-sm text-gray-300">Password</label>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'} // Toggle between text/password
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-10"
          />
          {/* Eye icon to show/hide password */}
          <span
            className="absolute top-9 right-3 cursor-pointer text-gray-400 hover:text-cyan-400"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Login button with animation */}
        <motion.button
          whileHover={{ scale: 1.03 }} // Scale up on hover
          whileTap={{ scale: 0.97 }} // Scale down on tap
          type="submit"
          className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 cursor-pointer transition-colors duration-200 rounded text-white font-semibold shadow-md"
        >
          Login
        </motion.button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{' '}
          <span
            className="text-cyan-400 hover:underline cursor-pointer"
            onClick={() => navigate('/signup')} // Navigate to signup page
          >
            Sign up
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default Login; // Export the Login component
