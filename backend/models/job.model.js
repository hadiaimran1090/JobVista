const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  requirements: { type: String }, // You can use JSON if needed
  details: { type: String },
  location: { type: String },
  job_type: { type: String, enum: ['full-time', 'part-time', 'remote', 'internship', 'contract'], required: true },
  status: { type: String, enum: ['active', 'closed', 'draft'], default: 'draft' },
  salary_min: { type: Number },
  salary_max: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  company_name: { type: String, required: true }
});

module.exports = mongoose.model('Job', jobSchema);