const express = require('express');
const router = express.Router();
const { generateText } = require('../controllers/openaiController');

router.post('/submit', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.json({ success: true, message: 'Form saved' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving form' });
  }
});

module.exports = router;
