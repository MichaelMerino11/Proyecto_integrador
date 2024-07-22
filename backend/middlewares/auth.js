const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.auth = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token.split(' ')[1], 'secret'); // Cambié esta línea para manejar el prefijo "Bearer"
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports.adminAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token.split(' ')[1], 'secret');
    const user = await User.findById(decoded.userId);
    if (user.role !== 'admin') return res.status(403).send('Access forbidden');
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports.operatorAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('Authorization header:', token);
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'secret');
    console.log('Decoded token:', decoded);
    const user = await User.findById(decoded.userId);
    if (user.role !== 'operator') return res.status(403).send('Access forbidden');
    req.user = { userId: decoded.userId }; 
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(400).send('Invalid token');
  }
};
