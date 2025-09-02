const Job = require('../models/job.model');

exports.createJob = async (req, res) => {
  try {
    // Change _id to id
    const job = new Job({ ...req.body, employer_id: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};