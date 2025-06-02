const jwt = require('jsonwebtoken'); // Import jsonwebtoken library for token verification

// Middleware function to protect routes by verifying JWT token
const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header ("Bearer <token>")
  const token = req.header('Authorization')?.split(" ")[1];
  
  // If token is missing, return 401 Unauthorized response
  if (!token) return res.status(401).json({ message: 'Access Denied. No Token.' });

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token payload (usually user info) to request object
    next(); // Call next middleware or route handler
  } catch (err) {
    // If token verification fails, return 400 Bad Request with error message
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware; // Export the middleware for use in routes
