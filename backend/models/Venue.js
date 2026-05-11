const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  description: { type: String, required: true },
  amenities: [{ type: String }],
  images: [{ type: String }], // URL from Supabase Storage
  pricePerDay: { type: Number, required: true },
  status: { type: String, enum: ['available', 'maintenance'], default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('Venue', venueSchema);
