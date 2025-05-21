const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // در فایل .env ذخیره کنید
});
const openai = new OpenAIApi(configuration);

const generateText = async (req, res) => {
  try {
    const { title, description, keywords, features, styles } = req.body;

    const prompt = `یک متن بنویس با عنوان "${title}" که درباره "${description}" باشه. با سبک‌های ${styles.join('،')} و ویژگی‌های ${features.join('،')}. کلمات کلیدی: ${keywords.join(', ')}`;

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
    console.error(error);
    res.status(500).json({ success: false, message: 'خطا در تولید متن' });
  }
};
