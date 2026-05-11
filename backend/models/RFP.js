const mongoose = require('mongoose');

const rfpSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { type: String, required: true },
  attendeeCount: { type: Number, required: true },
  preferredDates: { type: String, required: true },
  budgetRange: { type: String, required: true },
  requirements: { type: String },
  status: { type: String, enum: ['submitted', 'reviewing', 'proposal_sent', 'accepted', 'rejected'], default: 'submitted' },
}, { timestamps: true });

module.exports = mongoose.model('RFP', rfpSchema);
