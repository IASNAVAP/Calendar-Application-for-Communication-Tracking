const mongoose = require('mongoose');

const CommunicationMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  sequence: Number,
  isMandatory: { type: Boolean, default: false },
});

module.exports = mongoose.model('CommunicationMethod', CommunicationMethodSchema);
