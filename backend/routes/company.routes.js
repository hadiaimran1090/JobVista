const express = require('express');
const router = express.Router();
const Company = require('../models/company.model');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer();

// Get company by userId
router.get('/me', async (req, res) => {
  try {
    const userId = req.query.userId;
    const company = await Company.findOne({ userId });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update company profile
router.put('/update', upload.none(), async (req, res) => {
  try {
    const { userId, name, email, about, logo } = req.body;
    const company = await Company.findOne({ userId });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.name = name;
    company.email = email;
    company.about = about;
    company.logo = logo;

    await company.save();
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logo upload route (Cloudinary)
router.post('/upload-logo', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error });
        }
        res.json({ secure_url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new company profile
router.post('/create', async (req, res) => {
  try {
    const { userId, name, email, about, logo } = req.body;
    // Check if company already exists for user
    const existing = await Company.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'Company already exists for this user.' });
    }
    const company = new Company({ userId, name, email, about, logo });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;