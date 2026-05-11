const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { isSupabaseConfigured } = require('./lib/supabase');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// Import Routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const venueRoutes = require('./routes/venueRoutes');
const rfpRoutes = require('./routes/rfpRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/rfps', rfpRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'Aether Grand Backend is running!',
    database: isSupabaseConfigured ? 'supabase' : 'supabase_not_configured',
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    msg: err.message || 'Server error',
    details: err.details || undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(isSupabaseConfigured ? 'Supabase configured' : 'Supabase env vars missing');
});
