const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant.model');
const Job = require('../models/job.model');

// Update applicant status
router.post('/update-status', async (req, res) => {
  const { userId, jobId, status } = req.body;
  try {
    let applicant = await Applicant.findOne({ userId, jobId });
    if (!applicant) {
      applicant = new Applicant({ userId, jobId, status });
    } else {
      applicant.status = status;
    }
    await applicant.save();

    // Update job model arrays
    const job = await Job.findById(jobId);
    if (status === 'selected') {
      if (!job.selectedApplicants.includes(userId)) job.selectedApplicants.push(userId);
      job.rejectedApplicants = job.rejectedApplicants.filter(id => id.toString() !== userId);
    }
    if (status === 'rejected') {
      if (!job.rejectedApplicants.includes(userId)) job.rejectedApplicants.push(userId);
      job.selectedApplicants = job.selectedApplicants.filter(id => id.toString() !== userId);
    }
    await job.save();

    res.json({ success: true, applicant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get applied jobs for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const applicants = await Applicant.find({ userId: req.params.userId })
      .populate('jobId');
    // Map response to include job info
    const result = applicants.map(app => ({
      job: app.jobId,
      status: app.status
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;