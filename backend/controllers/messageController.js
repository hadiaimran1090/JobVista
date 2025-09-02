exports.sendMessage = async (req, res) => {
  // Save message to DB or send notification (implement as needed)
  res.json({ success: true, message: req.body.message });
};