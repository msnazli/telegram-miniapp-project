const express = require('express');
const router = express.Router();
const Translation = require('../models/Translation');

// گرفتن تمام ترجمه‌ها
router.get('/', async (req, res) => {
  const translations = await Translation.find();
  res.json(translations);
});

// افزودن یا ویرایش کلید
router.post('/', async (req, res) => {
  const { key, fa, en } = req.body;
  const updated = await Translation.findOneAndUpdate(
    { key },
    { $set: { fa, en } },
    { new: true, upsert: true }
  );
  res.json(updated);
});

// حذف ترجمه
router.delete('/:key', async (req, res) => {
  await Translation.deleteOne({ key: req.params.key });
  res.sendStatus(204);
});

module.exports = router;
