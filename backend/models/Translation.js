const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  translations: { type: Map, of: String } // کلیدها: fa, en, fr, etc.
});

module.exports = mongoose.model('Translation', translationSchema);