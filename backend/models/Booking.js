const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  eventDetails: {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    expectedGuests: { type: Number, required: true }
  },
  dates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  services: {
    catering: { type: Boolean, default: false },
    avSupport: { type: Boolean, default: false },
    security: { type: Boolean, default: false }
  },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
