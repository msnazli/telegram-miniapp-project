// scripts/importTranslations.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Translation = require('../models/Translation');
const connectDB = require('../db');

const importTranslations = async () => {
  try {
    await connectDB();

    const localesPath = path.join(__dirname, '../../frontend/public/locales');
    const languages = fs.readdirSync(localesPath);

    const allTranslations = {}; // { key1: { en: "..", fa: ".." } }

    for (const lang of languages) {
      const filePath = path.join(localesPath, lang, 'translation.json');
      if (!fs.existsSync(filePath)) continue;

      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      for (const key in data) {
        if (!allTranslations[key]) allTranslations[key] = {};
        allTranslations[key][lang] = data[key];
      }
    }

    // تبدیل ساختار به مدل جدید
    const documents = Object.entries(allTranslations).map(([key, translations]) => ({ key, translations }));

    await Translation.deleteMany({});
    await Translation.insertMany(documents);

    console.log('✅ Import successful');
    process.exit();
  } catch (err) {
    console.error('❌ Import error:', err);
    process.exit(1);
  }
};

importTranslations();
