const express = require('express');
const router = express.Router();
const Translation = require('../models/Translation');
const fs = require('fs');
const path = require('path');

// دریافت همه زبان‌ها
router.get('/languages', async (req, res) => {
  try {
    const langs = await Translation.find({}, 'language');
    res.json(langs.map(l => l.language));
  } catch (err) {
    res.status(500).json({ error: 'خطا در دریافت زبان‌ها' });
  }
});

// دریافت ترجمه‌ها برای یک زبان
router.get('/:lang', async (req, res) => {
  try {
    const { lang } = req.params;
    const translation = await Translation.findOne({ language: lang });
    if (!translation) return res.status(404).json({ error: 'زبان یافت نشد' });
    res.json({ language: lang, values: translation.values });
  } catch (err) {
    res.status(500).json({ error: 'خطا در دریافت ترجمه‌ها' });
  }
});

// افزودن زبان جدید (با مقدار خالی)
router.post('/', async (req, res) => {
  try {
    const { language } = req.body;
    if (!language) return res.status(400).json({ error: 'کد زبان الزامی است' });

    const exists = await Translation.findOne({ language });
    if (exists) return res.status(400).json({ error: 'زبان قبلاً وجود دارد' });

    const newTranslation = new Translation({ language, values: {} });
    await newTranslation.save();
    res.json({ message: 'زبان اضافه شد' });
  } catch (err) {
    res.status(500).json({ error: 'خطا در افزودن زبان' });
  }
});

// ذخیره ترجمه‌ها (ویرایش)
router.post('/:lang', async (req, res) => {
  try {
    const { lang } = req.params;
    const values = req.body;  // انتظار آبجکت چندسطحی
    await Translation.updateOne({ language: lang }, { values }, { upsert: true });
    res.json({ message: 'ترجمه‌ها ذخیره شد' });
  } catch (err) {
    res.status(500).json({ error: 'خطا در ذخیره ترجمه‌ها' });
  }
});

// اکسپورت ترجمه به فایل JSON
router.get('/export/:lang', async (req, res) => {
  try {
    const { lang } = req.params;
    const translation = await Translation.findOne({ language: lang });
    if (!translation) return res.status(404).json({ error: 'زبان یافت نشد' });

    const dir = path.join(__dirname, '..', 'public', 'translations');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const filePath = path.join(dir, `${lang}.json`);
    fs.writeFileSync(filePath, JSON.stringify(translation.values, null, 2), 'utf8');

    res.json({ message: `فایل ترجمه ${lang} صادر شد`, path: `/translations/${lang}.json` });
  } catch (err) {
    res.status(500).json({ error: 'خطا در اکسپورت ترجمه' });
  }
});

module.exports = router;
