const Job = require('../models/job.model');
const User = require('../models/user.model');

exports.getApplicantsForEmployer = async (req, res) => {
  const employerId = req.query.employer;

  try {
    // Find all jobs posted by this employer
    const jobs = await Job.find({ employer_id: employerId });
    // Collect all applicants from these jobs
    const applicantIds = jobs.reduce((acc, job) => {
      if (Array.isArray(job.applicants)) {
        acc.push(...job.applicants);
      }
      return acc;
    }, []);
    // Remove duplicates
    const uniqueApplicantIds = [...new Set(applicantIds.map(id => id.toString()))];
    // Get applicant user details
    const applicants = await User.find({ _id: { $in: uniqueApplicantIds }, role: 'jobseeker' });

    return res.json(applicants);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};