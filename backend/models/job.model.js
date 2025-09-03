const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // <-- Add this line!
  title: { type: String, required: true },
  requirements: { type: String },
  details: { type: String },
  location: { type: String },
  job_type: { type: String, enum: ['full-time', 'part-time', 'remote', 'internship', 'contract'], required: true },
  status: { type: String, enum: ['active', 'closed'], default: 'closed' },
  salary_min: { type: Number },
  salary_max: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  company_name: { type: String, required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  selectedApplicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  rejectedApplicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Job', jobSchema);