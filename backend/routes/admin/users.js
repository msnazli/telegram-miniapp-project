const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const authMiddleware = require('../../middlewares/auth');

// دریافت لیست کاربران
router.get('/', authMiddleware.ensureAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// تغییر نقش کاربر
router.post('/set-role', authMiddleware.ensureAdmin, async (req, res) => {
  const { telegramId, role } = req.body;
  if (!['admin', 'viewer'].includes(role)) return res.status(400).json({ error: 'نقش نامعتبر' });

  const user = await User.findOneAndUpdate({ telegramId }, { role }, { new: true });
  if (!user) return res.status(404).json({ error: 'کاربر یافت نشد' });

  res.json({ message: 'نقش بروزرسانی شد', user });
});

module.exports = router;
