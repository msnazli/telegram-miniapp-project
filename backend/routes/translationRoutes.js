const express = require('express');
const router = express.Router();
const Translation = require('../models/Translation');

// دریافت همه ترجمه‌ها
router.get('/', async (req, res) => {
  try {
    const translations = await Translation.find({});
    res.json({ success: true, translations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// دریافت ترجمه‌ها برای زبان خاص (فرانت‌اند)
router.get('/:lng', async (req, res) => {
  const lang = req.params.lng;
  try {
    const translations = await Translation.find({});
    const result = {};
    translations.forEach(t => {
      result[t.key] = t.translations[lang] || t.translations['en'] || t.key;
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// افزودن یا بروزرسانی ترجمه
router.post('/', async (req, res) => {
  const { key, translations } = req.body;
  try {
    const updated = await Translation.findOneAndUpdate(
      { key },
      { translations },
      { upsert: true, new: true }
    );
    res.json({ success: true, translation: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// حذف ترجمه
router.delete('/:key', async (req, res) => {
  try {
    await Translation.findOneAndDelete({ key: req.params.key });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
