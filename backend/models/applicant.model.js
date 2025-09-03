const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['selected', 'rejected', 'pending'], default: 'pending' } // <-- default: 'pending'
});

module.exports = mongoose.model('Applicant', applicantSchema);