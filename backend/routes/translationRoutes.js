const express = require('express');
const router = express.Router();
const Translation = require('../models/Translation');

// گرفتن تمام ترجمه‌ها
router.get('/languages', async (req, res) => {
  try {
    const translations = await Translation.find();
    const languages = translations.map((t) => t.language);
    res.json([...new Set(languages)]);
  } catch (err) {
    console.error('Error fetching languages:', err);
    res.status(500).json({ error: 'Failed to get languages' });
  }
});

// افزودن یا ویرایش کلید
// POST /api/translations
router.post('/', async (req, res) => {
  const { language } = req.body;

  if (!language) return res.status(400).json({ error: 'Language code is required' });

  try {
    const exists = await Translation.findOne({ language });
    if (exists) return res.status(409).json({ error: 'Language already exists' });

    const newTranslation = new Translation({ language, values: {} });
    await newTranslation.save();

    res.status(201).json({ message: 'Language added successfully', language });
  } catch (err) {
    console.error('Error adding language:', err);
    res.status(500).json({ error: 'Failed to add language' });
  }
});


// حذف ترجمه
router.delete('/:key', async (req, res) => {
  await Translation.deleteOne({ key: req.params.key });
  res.sendStatus(204);
});

module.exports = router;
