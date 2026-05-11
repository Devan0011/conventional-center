const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isSupabaseConfigured = isConfiguredValue(supabaseUrl) && isConfiguredValue(supabaseKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

function isConfiguredValue(value) {
  return Boolean(value && !String(value).startsWith('your_') && !String(value).includes('your-project'));
}

function getSupabase() {
  if (!supabase) {
    const error = new Error('Supabase is not configured.');
    error.statusCode = 503;
    throw error;
  }

  return supabase;
}

function handleSupabaseError(error, fallbackMessage = 'Database request failed') {
  if (!error) return;

  const wrapped = new Error(error.message || fallbackMessage);
  wrapped.statusCode = 500;
  wrapped.details = error.details || error.hint || null;
  throw wrapped;
}

module.exports = {
  getSupabase,
  handleSupabaseError,
  isSupabaseConfigured,
};
