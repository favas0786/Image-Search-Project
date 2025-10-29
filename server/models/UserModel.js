const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // This will be the unique ID from Google, GitHub, or Facebook
  providerId: {
    type: String,
    required: true,
    unique: true,
  },
  // 'google', 'github', 'facebook'
  provider: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, // Not all providers guarantee an email
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);