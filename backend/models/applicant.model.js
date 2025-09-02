const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['selected', 'rejected'], default: 'rejected' }
});

module.exports = mongoose.model('Applicant', applicantSchema);