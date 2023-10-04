const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const verifyBearerToken = (req, res, next) => {
  // Get the token from the "Authorization" header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Bearer token not provided.' });
  }

  // Extract the token from the "Authorization" header
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Bearer token not provided.' });
  }

  // Verify and decode the token
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Bearer token.' });
    }

    // Attach the decoded user information to the request object for further use
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  });
};

module.exports = verifyBearerToken;
