const express = require('express');
const router = express.Router();
const Message = require('../models/message.model');
const User = require('../models/user.model');
const auth = require('../middleware/auth');
const { getApplicantsForEmployer } = require('../controllers/messageController');

// Get applicants who messaged this employer
router.get('/applicants', auth, getApplicantsForEmployer);

// Get employers who messaged this jobseeker
router.get('/employers', auth, async (req, res) => {
  const jobseekerId = req.query.jobseeker;
  const employerIds = await Message.find({ receiver: jobseekerId })
    .distinct('sender');
  const employers = await User.find({ _id: { $in: employerIds }, role: 'employer' });
  res.json(employers);
});

// Get chat between two users
router.get('/chat', auth, async (req, res) => {
  const { user1, user2 } = req.query;
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ createdAt: 1 });
  res.json(messages);
});

// Send message
router.post('/send', auth, async (req, res) => {
  const { sender, receiver, text } = req.body;
  const message = await Message.create({ sender, receiver, text });
  res.json(message);
});

module.exports = router;