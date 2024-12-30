const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  linkedinProfile: String,
  emails: [String],
  phoneNumbers: [String],
  comments: String,
  communicationPeriodicity: { type: String, default: '2 weeks' },
  lastCommunications: [
    {
      type: { type: String },
      date: Date,
      notes: String,
    },
  ],
});

module.exports = mongoose.model('Company', CompanySchema);
