const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

// Create job
router.post('/post-job', auth, jobController.createJob);

// Get all jobs (with filters/search)
router.get('/', jobController.getJobs);

// Get job detail
router.get('/:id', jobController.getJobDetail);

// Apply to job
router.post('/:id/apply', auth, jobController.applyJob);

// Save job
router.post('/:id/save', auth, jobController.saveJob);

// Unsave job
router.post('/:id/unsave', auth, jobController.unsaveJob);

module.exports = router;