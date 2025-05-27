const TelegramBot = require('node-telegram-bot-api');
const User = require('../models/User');
const config = require('../config'); // شامل TOKEN و adminList

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || `user${msg.from.id}`;
  const telegramId = msg.from.id;

  // بررسی اگر کاربر قبلاً ثبت شده باشد
  let user = await User.findOne({ telegramId });
  if (!user) {
    const role = config.adminTelegramIds.includes(telegramId) ? 'admin' : 'viewer';

    user = new User({ username, telegramId, role });
    await user.save();
    bot.sendMessage(chatId, `🎉 خوش آمدی ${username}!\nنقش شما: ${role}`);
  } else {
    bot.sendMessage(chatId, `✅ قبلاً ثبت‌نام شده‌اید\nنقش شما: ${user.role}`);
  }
});

module.exports = bot;
