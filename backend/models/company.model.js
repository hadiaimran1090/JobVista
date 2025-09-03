const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  logo: { type: String },
  about: { type: String },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Company', CompanySchema);