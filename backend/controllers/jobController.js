const Job = require('../models/job.model');

// Create job
exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, employer_id: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get jobs with filters/search
exports.getJobs = async (req, res) => {
  try {
    const { search, job_type, location, salary_min, salary_max } = req.query;
    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (job_type) query.job_type = job_type;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (salary_min) query.salary_min = { $gte: Number(salary_min) };
    if (salary_max) query.salary_max = { $lte: Number(salary_max) };
    const jobs = await Job.find(query).sort({ created_at: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get job detail
exports.getJobDetail = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    res.status(404).json({ error: 'Job not found' });
  }
};

// Apply to job
exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job.applicants) job.applicants = [];
    if (!job.applicants.includes(req.user.id)) job.applicants.push(req.user.id);
    await job.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Save job
exports.saveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job.savedBy) job.savedBy = [];
    if (!job.savedBy.includes(req.user.id)) job.savedBy.push(req.user.id);
    await job.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Unsave job
exports.unsaveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job.savedBy) job.savedBy = [];
    job.savedBy = job.savedBy.filter(uid => String(uid) !== String(req.user.id));
    await job.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};