const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.adminAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware.adminAuth, async (req, res) => {
  const { role } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { role });
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware.adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', authMiddleware.auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/password', authMiddleware.operatorAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Obtener el usuario desde el ID en la solicitud
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = req.body.password; // Actualiza la contraseña
    await user.save();
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
