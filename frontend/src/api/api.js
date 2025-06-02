// Importing axios for making HTTP requests
import axios from 'axios';

// Creating an axios instance with a default base URL and headers
const instance = axios.create({
  baseURL: 'https://nexcharge-backend.onrender.com', // Base URL for all API requests
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

// Add token to headers if exists
// This interceptor runs before each request is sent
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header if it exists
  }
  return config; // Return the modified config
});

// Exporting the configured axios instance
export default instance;
