const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  bio: { type: String },
  experience: { type: String },
  skills: [{ type: String }],
  profileImage: String,
  role: { type: String, enum: ['jobseeker', 'employer'], required: true },
  resume: String, // Only for jobseeker
  companyName: String // Only for employer
});

module.exports = mongoose.model('User', userSchema);