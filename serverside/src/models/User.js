// src/models/User.js
const mongoose = require('mongoose');  // <-- THIS WAS MISSING

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);