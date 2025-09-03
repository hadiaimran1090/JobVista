const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback.model');

router.post('/', async (req, res) => {
  const { user, comment, rating } = req.body;
  const feedback = new Feedback({ user, comment, rating });
  await feedback.save();
  res.json(feedback);
});

router.get('/', async (req, res) => {
  const feedbacks = await Feedback.find().populate('user');
  res.json(feedbacks);
});

module.exports = router;