const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.adminAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', authMiddleware.adminAuth, async (req, res) => {
  const { role } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { role });
    res.send('User updated');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', authMiddleware.adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
