const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email.endsWith('@ups.edu.ec')) {
      return res.status(400).send('El correo electrónico debe ser del dominio ups.edu.ec');
    }

    if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      return res.status(400).send('La contraseña debe tener al menos 6 caracteres, incluyendo letras y números');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Invalid credentials');
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
