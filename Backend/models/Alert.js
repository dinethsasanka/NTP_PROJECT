const mongoose = require('mongoose');
const AlertSchema = new mongoose.Schema({
  zone: { type: String, default: 'default' },
  level: { type: String, required: true }, // e.g., info/warning/critical
  message: { type: String },
  count: { type: Number },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Alert', AlertSchema);
