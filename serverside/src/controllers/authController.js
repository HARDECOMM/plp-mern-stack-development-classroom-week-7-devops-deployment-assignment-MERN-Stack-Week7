const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); // Make sure you have this utility

// ---------- Helper: Log safely ----------
const logInfo = (message, data = null) => {
  if (process.env.NODE_ENV === 'production') {
    if (data) console.log(message, data);
    else console.log(message);
  }
};

// ---------- Helper: Generate JWT ----------
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

//---------Register---------------

exports.register = async (req, res, next) => {
  try {

    console.log("Incoming body:", req.body);

    const { username, email, password, bio } = req.body;

    if (!username || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({
        success: false,
        message: 'All fields required'
      });
    }

    if (password.length < 8) {
      console.log("Password too short:", password.length);
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("User already exists in DB:", email);
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashed,
      bio
    });

    console.log("User created successfully:", user);

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {

    console.log("REGISTER ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};


// ================= LOGIN =================
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    logInfo('Login attempt:', email);

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    logInfo('User logged in successfully:', email);

    res.json({
      token,
      user: { _id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

// ================= GET CURRENT USER =================
exports.getMe = async (req, res, next) => {
  try {
    const user = req.user; // Comes from auth middleware
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio
    });
  } catch (err) {
    next(err);
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Construct reset link
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Send email
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Reset your password using this link: ${resetURL}`
    });

    res.json({ message: 'Password reset link sent to email' });
  } catch (err) {
    next(err);
  }
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token to match DB
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Update password
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    next(err);
  }
};