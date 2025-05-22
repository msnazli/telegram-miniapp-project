const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  translations: {
    fa: { type: String, default: '' },
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
  },
});

module.exports = mongoose.model('Translation', translationSchema);
