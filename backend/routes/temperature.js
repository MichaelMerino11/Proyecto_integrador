const express = require('express');
const router = express.Router();
const Temperature = require('../models/Temperature');

router.get('/', async (req, res) => {
  try {
    const temperatures = await Temperature.find();
    res.json(temperatures);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const { temperatura, humedad } = req.body;
  try {
    const newTemperature = new Temperature({ temperatura, humedad });
    await newTemperature.save();
    res.status(201).send('Temperature data added');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
