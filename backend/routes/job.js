const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');
const Applicant = require('../models/applicant.model'); 
const Job = require('../models/job.model');
const User = require('../models/user.model');


// Create job
router.post('/post-job', auth, jobController.createJob);

// Get all jobs (with filters/search)
// router.get('/', jobController.getJobs); 
// Get job detail
router.get('/:id', jobController.getJobDetail);

// Apply to job
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;

    // Check if already applied
    let applicant = await Applicant.findOne({ userId, jobId });
    if (!applicant) {
      applicant = new Applicant({ userId, jobId, status: 'pending' });
      await applicant.save();
    }

    // Update job applicants array
    await Job.findByIdAndUpdate(jobId, { $addToSet: { applicants: userId } }); // <-- Ye line zaroori hai

    res.json({ success: true, applicant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save job
router.post('/:id/save', auth, jobController.saveJob);

// Unsave job
router.post('/:id/unsave', auth, jobController.unsaveJob);

// Update job
router.put('/:id', auth, jobController.updateJob);

// Delete job
router.delete('/:id', auth, jobController.deleteJob);

// Employer jobs (dashboard)
// router.get('/employer', jobController.findJobsByEmployer); //
  router.get('/', (req, res, next) => {
  if (req.query.employer) {
    return jobController.findJobsByEmployer(req, res, next);
  }
  return jobController.getJobs(req, res, next);
});
module.exports = router;
