const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const authController = require('../controllers/authController');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'jobvista',
    resource_type: file.fieldname === 'resume' ? 'raw' : 'image',
    public_id: Date.now() + '-' + file.originalname,
  }),
});
const upload = multer({ storage });

// ✅ Signup route
router.post(
  '/signup',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
  authController.signup
);

// ✅ Login route
router.post('/login', authController.login);

// ✅ Profile update route
router.put(
  '/update/:id',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        bio: req.body.bio,
        experience: req.body.experience,
        skills: req.body.skills ? req.body.skills.split(',') : [],
      };

      // Handle file uploads
      if (req.files['profileImage']) {
        updateData.profileImage = req.files['profileImage'][0].path; // Cloudinary URL
      }
      if (req.files['resume']) {
        updateData.resume = req.files['resume'][0].path; // Cloudinary URL
      }

      const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
      });
      res.json({ user: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Update failed' });
    }
  }
);

// Bulk user retrieval route
router.post('/users/bulk', auth, userController.getUsersBulk);

module.exports = router;
