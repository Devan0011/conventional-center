function toApiId(row) {
  return row ? { ...row, _id: row.id } : row;
}

function toUser(row) {
  if (!row) return null;

  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toVenue(row) {
  if (!row) return null;

  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    capacity: row.capacity,
    description: row.description,
    amenities: row.amenities || [],
    images: row.images || [],
    pricePerDay: row.price_per_day,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRfp(row) {
  if (!row) return null;

  return {
    _id: row.id,
    id: row.id,
    organization: row.organization,
    contactName: row.contact_name,
    email: row.email,
    phone: row.phone,
    eventType: row.event_type,
    attendeeCount: row.attendee_count,
    preferredDates: row.preferred_dates,
    budgetRange: row.budget_range,
    requirements: row.requirements,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toBooking(row) {
  if (!row) return null;

  return {
    _id: row.id,
    id: row.id,
    user: toUser(row.user),
    venue: toVenue(row.venue),
    eventDetails: {
      eventName: row.event_name,
      eventType: row.event_type,
      expectedGuests: row.expected_guests,
    },
    dates: {
      startDate: row.start_date,
      endDate: row.end_date,
    },
    services: {
      catering: row.catering,
      avSupport: row.av_support,
      security: row.security,
    },
    totalAmount: row.total_amount,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

module.exports = {
  toApiId,
  toBooking,
  toRfp,
  toUser,
  toVenue,
};
