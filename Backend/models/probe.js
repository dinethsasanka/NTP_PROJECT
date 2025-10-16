const mongoose = require('mongoose');

const ProbeSchema = new mongoose.Schema({
  mac: { type: String, required: true, index: true }, // hashed/anonymized if needed
  rssi: { type: Number, required: true },
  timestamp: { type: Date, required: true, index: true },
  zone: { type: String, default: 'default' }
}, { timestamps: true });

module.exports = mongoose.model('Probe', ProbeSchema);
