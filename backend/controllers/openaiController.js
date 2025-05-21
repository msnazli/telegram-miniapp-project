// controllers/openaiController.js
const OpenAIApi= require('openai');

const openai = new openai({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateText = async (req, res) => {
  try {
    const { title, description, keywords, features, styles } = req.body;

    const prompt = `نام هایی با عنوان "${title}" که درباره "${description}" انتخاب کن. با سبک‌های ${styles.join('،')} و ویژگی‌های ${features.join('،')}. کلمات کلیدی: ${keywords.join(', ')}`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'شما یک نویسنده هوشمند هستید.' },
        { role: 'user', content: prompt },
      ],
    });

    const aiText = completion.data.choices[0].message.content;
    res.json({ success: true, generatedText: aiText });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'خطا در تولید متن' });
  }
};

module.exports = { generateText };
