const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getSupabase, handleSupabaseError } = require('../lib/supabase');
const { toUser } = require('../lib/serializers');

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const supabase = getSupabase();

    const { data: existingUser, error: existingError } = await supabase
      .from('app_users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    handleSupabaseError(existingError);
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: user, error } = await supabase
      .from('app_users')
      .insert({ name, email, password: hashedPassword })
      .select('id, name, email, role, created_at, updated_at')
      .single();

    handleSupabaseError(error);

    const apiUser = toUser(user);
    const token = signToken(apiUser.id, apiUser.role);
    res.json({ token, user: apiUser });
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const supabase = getSupabase();

    const { data: user, error } = await supabase
      .from('app_users')
      .select('id, name, email, password, role, created_at, updated_at')
      .eq('email', email)
      .maybeSingle();

    handleSupabaseError(error);
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const token = signToken(user.id, user.role);
    res.json({ token, user: toUser(user) });
  } catch (err) {
    next(err);
  }
});

function signToken(id, role) {
  return jwt.sign(
    { user: { id, role } },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' },
  );
}

module.exports = router;
