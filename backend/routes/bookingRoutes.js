const express = require('express');
const router = express.Router();
const { getSupabase, handleSupabaseError } = require('../lib/supabase');
const { toBooking } = require('../lib/serializers');

// Get all bookings (Admin)
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('bookings')
      .select(`
        *,
        user:app_users(id, name, email, role, created_at, updated_at),
        venue:venues(*)
      `)
      .order('created_at', { ascending: false });

    handleSupabaseError(error);
    res.json((data || []).map(toBooking));
  } catch (err) {
    next(err);
  }
});

// Create a booking
router.post('/', async (req, res, next) => {
  try {
    const payload = toBookingInsert(req.body);
    const { data, error } = await getSupabase()
      .from('bookings')
      .insert(payload)
      .select(`
        *,
        user:app_users(id, name, email, role, created_at, updated_at),
        venue:venues(*)
      `)
      .single();

    handleSupabaseError(error);
    res.json(toBooking(data));
  } catch (err) {
    next(err);
  }
});

function toBookingInsert(body) {
  const eventDetails = body.eventDetails || {};
  const dates = body.dates || {};
  const services = body.services || {};

  return {
    user_id: body.userId || body.user_id || body.user?._id || body.user?.id || body.user,
    venue_id: body.venueId || body.venue_id || body.venue?._id || body.venue?.id || body.venue,
    event_name: eventDetails.eventName || body.eventName,
    event_type: eventDetails.eventType || body.eventType,
    expected_guests: eventDetails.expectedGuests ?? body.expectedGuests,
    start_date: dates.startDate || body.startDate,
    end_date: dates.endDate || body.endDate,
    catering: toBoolean(services.catering ?? body.catering),
    av_support: toBoolean(services.avSupport ?? body.avSupport),
    security: toBoolean(services.security ?? body.security),
    total_amount: body.totalAmount ?? body.total_amount,
    status: body.status || 'pending',
  };
}

function toBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return Boolean(value);
}

module.exports = router;
