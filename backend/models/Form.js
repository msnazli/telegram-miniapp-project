const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  topic: String,
  description: String,
  keywords: [String],
  features: [String],
  styles: [String],
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Form', formSchema);
