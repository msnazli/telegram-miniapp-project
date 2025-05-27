const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const BOT_TOKEN = process.env.BOT_TOKEN;
const OWNER_TELEGRAM_ID = process.env.OWNER_TELEGRAM_ID;

function isTelegramLoginValid(data, botToken) {
  const { hash, ...rest } = data;
  const sorted = Object.keys(rest).sort().map(key => `${key}=${rest[key]}`).join('\n');
  const secret = crypto.createHash('sha256').update(botToken).digest();
  const hmac = crypto.createHmac('sha256', secret).update(sorted).digest('hex');
  return hmac === hash;
}

router.post('/telegram-login', async (req, res) => {
  const data = req.body;

  if (!isTelegramLoginValid(data, BOT_TOKEN)) {
    return res.status(403).json({ error: 'داده تلگرام معتبر نیست' });
  }

  try {
    let user = await User.findOne({ telegramId: data.id });

    if (!user) {
      if (data.id.toString() !== OWNER_TELEGRAM_ID) {
        return res.status(403).json({ error: 'فقط مدیر اصلی مجاز است' });
      }

      user = new User({
        telegramId: data.id,
        username: data.username,
        role: 'admin',
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, telegramId: user.telegramId, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطا در ورود' });
  }
});

module.exports = router;
