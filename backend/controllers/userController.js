const User = require('../models/user.model');

exports.getUsersBulk = async (req, res) => {
  try {
    const users = await User.find({ _id: { $in: req.body.ids } });
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};