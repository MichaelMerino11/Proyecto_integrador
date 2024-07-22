const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.adminAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findById(decoded.userId);
    if (user.role !== 'admin') return res.status(403).send('Access forbidden');
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports.operatorAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findById(decoded.userId);
    if (user.role !== 'operator') return res.status(403).send('Access forbidden');
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
