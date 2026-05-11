const express = require('express');
const router = express.Router();
const { getSupabase, handleSupabaseError } = require('../lib/supabase');
const { toVenue } = require('../lib/serializers');

// Get all venues
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('venues')
      .select('*')
      .order('created_at', { ascending: false });

    handleSupabaseError(error);
    res.json((data || []).map(toVenue));
  } catch (err) {
    next(err);
  }
});

// Create venue (Admin only theoretically, simple version here)
router.post('/', async (req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('venues')
      .insert(toVenueInsert(req.body))
      .select('*')
      .single();

    handleSupabaseError(error);
    res.json(toVenue(data));
  } catch (err) {
    next(err);
  }
});

function toVenueInsert(body) {
  return {
    name: body.name,
    capacity: body.capacity,
    description: body.description,
    amenities: body.amenities || [],
    images: body.images || [],
    price_per_day: body.pricePerDay ?? body.price_per_day,
    status: body.status || 'available',
  };
}

module.exports = router;
