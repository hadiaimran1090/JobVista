const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth'); // Assuming you have auth middleware

router.post('/post-job', auth, jobController.createJob);

module.exports = router;