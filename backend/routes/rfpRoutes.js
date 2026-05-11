const express = require('express');
const router = express.Router();
const { getSupabase, handleSupabaseError } = require('../lib/supabase');
const { toRfp } = require('../lib/serializers');

// Get all RFPs (Admin)
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('rfps')
      .select('*')
      .order('created_at', { ascending: false });

    handleSupabaseError(error);
    res.json((data || []).map(toRfp));
  } catch (err) {
    next(err);
  }
});

// Submit an RFP
router.post('/', async (req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('rfps')
      .insert(toRfpInsert(req.body))
      .select('*')
      .single();

    handleSupabaseError(error);
    res.json(toRfp(data));
  } catch (err) {
    next(err);
  }
});

function toRfpInsert(body) {
  return {
    organization: body.organization,
    contact_name: body.contactName || body.contact_name,
    email: body.email,
    phone: body.phone,
    event_type: body.eventType || body.event_type,
    attendee_count: body.attendeeCount ?? body.attendee_count,
    preferred_dates: body.preferredDates || body.preferred_dates,
    budget_range: body.budgetRange || body.budget_range,
    requirements: body.requirements || null,
    status: body.status || 'submitted',
  };
}

module.exports = router;
