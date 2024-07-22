const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  temperatura: { type: Number, required: true },
  humedad: { type: Number, required: true }
});

module.exports = mongoose.model('Temperature', TemperatureSchema);
