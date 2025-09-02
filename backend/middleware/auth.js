const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Yeh file ke start mein hi rahegi

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token from header:', token); // Yeh token extract hone ke baad likhein

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains user info
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};