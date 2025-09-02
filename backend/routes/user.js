const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Get user by ID
router.get('/:id', userController.getUserById);

// Bulk users by IDs
router.post('/bulk', auth, userController.getUsersBulk);

module.exports = router;