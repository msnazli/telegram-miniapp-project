// scripts/exportTranslations.js

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Translation = require('../models/Translation');
require('dotenv').config();

const EXPORT_DIR = path.join(__dirname, '../miniapp-client/public/translation');

async function exportTranslations() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    const translations = await Translation.find({});

    if (!fs.existsSync(EXPORT_DIR)) {
      fs.mkdirSync(EXPORT_DIR, { recursive: true });
    }

    translations.forEach(({ key, ...langs }) => {
      Object.keys(langs._doc).forEach((lang) => {
        if (lang === 'key' || lang === '_id' || lang === '__v') return;

        const langFilePath = path.join(EXPORT_DIR, `${lang}.json`);

        let fileContent = {};
        if (fs.existsSync(langFilePath)) {
          try {
            fileContent = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
          } catch (err) {
            console.warn(`⚠️ Could not read or parse ${lang}.json. Creating new.`);
          }
        }

        fileContent[key] = langs[lang];
        fs.writeFileSync(langFilePath, JSON.stringify(fileContent, null, 2));
      });
    });

    console.log('✅ Export completed!');
    process.exit();
  } catch (err) {
    console.error('❌ Export error:', err);
    process.exit(1);
  }
}

exportTranslations();