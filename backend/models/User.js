const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: String,
  role: { type: String, enum: ['admin', 'viewer'], default: 'viewer' }
});

// رمزگذاری فقط در صورت وجود رمز (در صورت نیاز)
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: String,
  role: { type: String, enum: ['admin', 'viewer'], default: 'viewer' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
