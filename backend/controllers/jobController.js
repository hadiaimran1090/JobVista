const Job = require('../models/job.model');
const Company = require('../models/company.model'); // Import Company model
const Applicant = require('../models/applicant.model');
const User = require('../models/user.model');


// Create job
exports.createJob = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) return res.status(404).json({ error: 'Company not found' });
    const job = new Job({
      ...req.body,
      employer_id: req.user.id,
      company_id: company._id,
      company_name: company.name
    });
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
    const jobs = await Job.find(query).populate('company_id'); // <-- Add populate here
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get job detail
exports.getJobDetail = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('company_id');
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

    // Add this block for Applicant model entry
    let applicant = await Applicant.findOne({ userId: req.user.id, jobId: job._id });
    if (!applicant) {
      applicant = new Applicant({ userId: req.user.id, jobId: job._id, status: 'pending' });
      await applicant.save();
    }

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

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Find jobs by employer and populate applicants and selectedApplicants
exports.findJobsByEmployer = async (req, res) => {
  try {
    const jobs = await Job.find({ employer_id: req.query.employer });
    let applicantIds = [];
    let selectedIds = [];
    jobs.forEach(job => {
      applicantIds.push(...(job.applicants || []));
      selectedIds.push(...(job.selectedApplicants || []));
    });

    applicantIds = [...new Set(applicantIds.map(id => id.toString()))];
    selectedIds = [...new Set(selectedIds.map(id => id.toString()))];

    const applicantsInfo = await User.find({ _id: { $in: applicantIds } });
    const selectedInfo = await User.find({ _id: { $in: selectedIds } });

    const jobsWithDetails = jobs.map(job => ({
      ...job.toObject(),
      applicants: (job.applicants || []).map(id => {
        const user = applicantsInfo.find(u => u._id.toString() === id.toString());
        return user ? user : null;
      }).filter(Boolean),
      selectedApplicants: (job.selectedApplicants || []).map(id => {
        const user = selectedInfo.find(u => u._id.toString() === id.toString());
        return user ? user : null;
      }).filter(Boolean)
    }));
    res.json(jobsWithDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};